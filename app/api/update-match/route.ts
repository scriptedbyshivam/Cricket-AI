import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import type { Match } from "@/lib/types";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as Match;
    const required = ["id", "title", "team1", "team2", "overs", "current_score", "current_wickets", "current_overs"];
    const missing = required.filter((key) => body[key as keyof Match] === undefined);
    if (missing.length) return NextResponse.json({ error: `Missing fields: ${missing.join(", ")}` }, { status: 400 });
    if (!supabase) return NextResponse.json({ ok: true, stored: "memoryless-fallback" });

    const { error } = await supabase.from("matches").upsert(body);
    if (error) throw error;
    return NextResponse.json({ ok: true });
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : "Update failed" }, { status: 500 });
  }
}
