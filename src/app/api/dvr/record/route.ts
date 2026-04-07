import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

// Allowed channel IDs to prevent SSRF
const ALLOWED_CHANNEL_IDS = [
  "tv2000",
  "telepace",
  "telepadrepio",
  "vaticannews",
  "ewtn",
  "trbc",
  "catholictv",
  "shalomworld",
  "radiomaria",
];

// Maximum channel ID length after sanitization - channel IDs are short alphanumeric strings
const MAX_CHANNEL_ID_LENGTH = 50;

function sanitizeChannelId(id: unknown): string | null {
  if (typeof id !== "string") return null;
  const cleaned = id.replace(/[^a-z0-9-]/gi, "").substring(0, MAX_CHANNEL_ID_LENGTH);
  return ALLOWED_CHANNEL_IDS.includes(cleaned) ? cleaned : null;
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const channelId = sanitizeChannelId(body?.channelId);
    const duration = Math.min(
      Math.max(parseInt(String(body?.duration ?? "3600"), 10), 60),
      14400
    );

    if (!channelId) {
      return NextResponse.json({ error: "Invalid channel ID" }, { status: 400 });
    }

    // In production, this would spawn an FFmpeg process to record the stream.
    // Example: ffmpeg -i <stream_url> -c copy -t <duration> output.ts
    // Then upload to S3-compatible storage.
    const recordingId = `rec_${channelId}_${Date.now()}`;

    return NextResponse.json({
      success: true,
      recordingId,
      message: "Recording started (DVR service integration required for production)",
      channelId,
      duration,
    });
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }
}
