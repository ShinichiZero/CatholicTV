import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

// In production, this would connect to a database or S3 storage
// to list recordings managed by the FFmpeg DVR service.
export async function GET() {
  return NextResponse.json({ recordings: [] });
}
