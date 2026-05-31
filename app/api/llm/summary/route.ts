import { NextResponse } from "next/server";
import { getCached, setCached } from "@/lib/llm-cache";
import { openai } from "@/lib/openai";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const matchId = String(body.match_id ?? "");
    const over = Number(body.over_number);
    const momentumChange = Number(body.momentum_change ?? 0);
    if (!matchId || !Number.isFinite(over)) {
      return NextResponse.json({ error: "match_id and over_number are required" }, { status: 400 });
    }
    const key = `summary:${matchId}:${over}:${Math.round(momentumChange)}`;
    const cached = getCached(key);
    if (cached) return NextResponse.json({ text: cached, cached: true });

    let text = fallbackSummary(momentumChange);
    if (openai) {
      const response = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        temperature: 0.3,
        max_tokens: 18,
        messages: [
          { role: "system", content: "You write terse cricket match captions. Return only 5-8 words." },
          { role: "user", content: `Write 5-8 words describing this momentum shift. Momentum change: ${momentumChange}.` }
        ]
      });
      text = response.choices[0]?.message?.content?.trim() || text;
    }
    setCached(key, text);
    return NextResponse.json({ text, cached: false });
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : "Summary failed" }, { status: 500 });
  }
}

function fallbackSummary(change: number) {
  if (change > 12) return "Batting side grabs clear control";
  if (change > 4) return "Pressure shifts toward batting side";
  if (change < -12) return "Bowlers force a sharp swing";
  if (change < -4) return "Fielding side claws momentum back";
  return "Momentum stays finely balanced";
}
