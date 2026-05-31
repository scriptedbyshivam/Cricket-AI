import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    if (!body.match_id || !Array.isArray(body.player_ids) || !body.user_session) {
      return NextResponse.json({ error: "match_id, player_ids, and user_session are required" }, { status: 400 });
    }
    if (!supabase) return NextResponse.json({ error: "Supabase is not configured" }, { status: 503 });
    const { error } = await supabase.from("fantasy_teams").insert({
      match_id: body.match_id,
      player_ids: body.player_ids,
      user_session: body.user_session
    });
    if (error) throw error;
    return NextResponse.json({ ok: true });
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : "Save failed" }, { status: 500 });
  }
}
