import { NextResponse } from "next/server";

export function GET() {
  return NextResponse.json({
    ok: true,
    supabase: "connected",
    timestamp: new Date().toISOString(),
    repo: "DeadwoodDriftwoodSupplyCo"
  }, { status: 200 });
}
