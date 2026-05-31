"use client";

import { useMemo, useState } from "react";
import { Reorder, motion } from "framer-motion";
import { HelpCircle, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { generateFantasyTeam } from "@/lib/predictions";
import type { FantasyPick, Match, Player } from "@/lib/types";

export function FantasyView({ match, players }: { match: Match; players: Player[] }) {
  const initialTeam = useMemo(() => generateFantasyTeam(players, match), [players, match]);
  const [team, setTeam] = useState<FantasyPick[]>(initialTeam);
  const [reasons, setReasons] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<string | null>(null);

  async function why(player: FantasyPick) {
    if (reasons[player.id]) return;
    setReasons((current) => ({ ...current, [player.id]: "Thinking..." }));
    try {
      const recent = `${player.last_5_scores.join(", ")} runs, ${player.predictedPoints} predicted points`;
      const res = await fetch("/api/llm/fantasy-justify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ player_name: player.name, recent_stats_summary: recent })
      });
      const json = await res.json();
      setReasons((current) => ({ ...current, [player.id]: json.text ?? "Strong recent form and role value today." }));
    } catch {
      setReasons((current) => ({ ...current, [player.id]: "Strong recent form and role value today." }));
    }
  }

  async function saveTeam() {
    setStatus(null);
    const payload = { match_id: match.id, player_ids: team.map((player) => player.id), user_session: getSessionId() };
    try {
      const res = await fetch("/api/fantasy-team", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      if (!res.ok) throw new Error("Supabase save failed");
      setStatus("Team saved to Supabase.");
    } catch {
      localStorage.setItem("cricketiq_fantasy_team", JSON.stringify(payload));
      setStatus("Team saved locally.");
    }
  }

  return (
    <TooltipProvider>
      <main className="mx-auto max-w-5xl px-4 py-8 sm:py-10">
        <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <div>
            <div className="eyebrow">Optimized XI</div>
            <h1 className="mt-3 text-4xl font-semibold leading-tight text-gray-50 md:text-5xl">Fantasy Team Picker</h1>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-gray-400">{match.title} picks ranked by form, matchup, venue tempo, and role value.</p>
          </div>
          <Button onClick={saveTeam}><Save className="h-4 w-4" /> Save Team</Button>
        </div>
        {status && <p className="mt-4 rounded-md border border-cyan-300/20 bg-cyan-300/10 px-3 py-2 text-sm text-cyan-100">{status}</p>}

        <Reorder.Group axis="y" values={team} onReorder={setTeam} className="mt-6 space-y-3">
          {team.map((player, index) => (
            <Reorder.Item key={player.id} value={player}>
              <Card className="p-4">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex items-center gap-4">
                    <motion.div layout className="metric-value flex h-11 w-11 items-center justify-center rounded-md border border-cyan-300/25 bg-cyan-300/10 font-semibold text-cyan-100 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]">
                      {index + 1}
                    </motion.div>
                    <div>
                      <h2 className="font-semibold text-gray-50">{player.name}</h2>
                      <p className="mt-1 text-sm text-gray-400">{player.role}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="metric-value rounded-md border border-lime-300/20 bg-lime-300/10 px-3 py-2 text-sm font-semibold text-lime-100">{player.predictedPoints} pts</span>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button onClick={() => why(player)} className="h-9 px-3"><HelpCircle className="h-4 w-4" /> Why?</Button>
                      </TooltipTrigger>
                      <TooltipContent>{reasons[player.id] ?? "Click Why? for one-sentence reasoning."}</TooltipContent>
                    </Tooltip>
                  </div>
                </div>
              </Card>
            </Reorder.Item>
          ))}
        </Reorder.Group>
      </main>
    </TooltipProvider>
  );
}

function getSessionId() {
  const key = "cricketiq_session";
  const existing = localStorage.getItem(key);
  if (existing) return existing;
  const id = crypto.randomUUID();
  localStorage.setItem(key, id);
  return id;
}
