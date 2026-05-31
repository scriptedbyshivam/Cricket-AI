import { NextResponse } from "next/server";
import { getCached, setCached } from "@/lib/llm-cache";
import { openai } from "@/lib/openai";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const playerName = String(body.player_name ?? "");
    const recent = String(body.recent_stats_summary ?? "");
    if (!playerName || !recent) {
      return NextResponse.json({ error: "player_name and recent_stats_summary are required" }, { status: 400 });
    }
    const key = `fantasy:${playerName}:${recent}`;
    const cached = getCached(key);
    if (cached) return NextResponse.json({ text: cached, cached: true });

    let text = `${playerName} projects well because recent form, role security, and matchup value align today.`;
    if (openai) {
      const response = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        temperature: 0.35,
        max_tokens: 35,
        messages: [
          { role: "system", content: "You write one-sentence cricket fantasy reasoning. Return one sentence only." },
          { role: "user", content: `Why is ${playerName} a good fantasy pick today? One sentence. Recent stats: ${recent}` }
        ]
      });
      text = response.choices[0]?.message?.content?.trim() || text;
    }
    setCached(key, text);
    return NextResponse.json({ text, cached: false });
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : "Justification failed" }, { status: 500 });
  }
}
