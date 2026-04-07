import { NextResponse } from "next/server";
import { CHANNELS } from "@/data/channels";

export const dynamic = "force-dynamic";

export async function GET() {
  return NextResponse.json(
    { channels: CHANNELS },
    {
      headers: {
        "Cache-Control": "public, s-maxage=60, stale-while-revalidate=300",
      },
    }
  );
}
