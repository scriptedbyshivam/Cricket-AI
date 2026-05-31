"use client";

import { useMemo, useState } from "react";
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  PolarAngleAxis,
  PolarGrid,
  PolarRadiusAxis,
  Radar,
  RadarChart,
  ResponsiveContainer,
  Tooltip
} from "recharts";
import { Card } from "@/components/ui/card";
import { Combobox } from "@/components/ui/combobox";
import { normalisePlayer } from "@/lib/predictions";
import type { Player } from "@/lib/types";

export function CompareView({ players }: { players: Player[] }) {
  const [leftId, setLeftId] = useState(players[0]?.id ?? "");
  const [rightId, setRightId] = useState(players[8]?.id ?? players[1]?.id ?? "");
  const left = players.find((player) => player.id === leftId) ?? players[0];
  const right = players.find((player) => player.id === rightId) ?? players[1] ?? players[0];

  const options = players.map((player) => ({ value: player.id, label: player.name }));
  const lineData = [0, 1, 2, 3, 4].map((index) => ({
    match: `M${index + 1}`,
    [left.name]: left.last_5_scores[index] ?? 0,
    [right.name]: right.last_5_scores[index] ?? 0
  }));
  const radarData = useMemo(() => {
    const a = normalisePlayer(left);
    const b = normalisePlayer(right);
    return [
      { axis: "Attack", [left.name]: a.attack, [right.name]: b.attack },
      { axis: "Defence", [left.name]: a.defence, [right.name]: b.defence },
      { axis: "Consistency", [left.name]: a.consistency, [right.name]: b.consistency },
      { axis: "Strike Rate", [left.name]: a.strikeRate, [right.name]: b.strikeRate },
      { axis: "Economy", [left.name]: a.economy, [right.name]: b.economy }
    ];
  }, [left, right]);

  return (
    <main className="mx-auto max-w-7xl px-4 py-8 sm:py-10">
      <section className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <div className="eyebrow">Player lab</div>
          <h1 className="mt-3 text-4xl font-semibold leading-tight text-gray-50 md:text-5xl">Player Comparison</h1>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-gray-400">
            Compare form, scoring profile, bowling control, and normalized impact values side by side.
          </p>
        </div>
        <div className="grid w-full gap-3 md:grid-cols-2 lg:w-[38rem]">
          <Combobox options={options} value={leftId} onChange={setLeftId} placeholder="Select player one" />
          <Combobox options={options} value={rightId} onChange={setRightId} placeholder="Select player two" />
        </div>
      </section>

      <Card className="mt-6 overflow-hidden p-0">
        <table className="w-full text-sm">
          <thead className="border-b border-white/10 bg-white/[0.045] text-xs uppercase tracking-[0.12em] text-gray-400">
            <tr>
              <th className="p-4 text-left">Stat</th>
              <th className="p-4 text-left text-cyan-100">{left.name}</th>
              <th className="p-4 text-left text-pink-100">{right.name}</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/10">
            {[
              ["Role", left.role, right.role],
              ["Batting Avg", left.batting_avg, right.batting_avg],
              ["Batting SR", left.batting_sr, right.batting_sr],
              ["Bowling Avg", left.bowling_avg || "-", right.bowling_avg || "-"],
              ["Economy", left.bowling_economy || "-", right.bowling_economy || "-"]
            ].map((row) => (
              <tr key={row[0]} className="transition hover:bg-white/[0.025]">
                <td className="p-4 font-medium text-gray-400">{row[0]}</td>
                <td className="metric-value p-4 text-gray-100">{row[1]}</td>
                <td className="metric-value p-4 text-gray-100">{row[2]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>

      <section className="mt-4 grid gap-4 lg:grid-cols-2">
        <Card className="p-5">
          <div className="mb-4">
            <h2 className="text-base font-semibold text-gray-50">Last 5 Matches</h2>
            <p className="mt-1 text-xs text-gray-500">Recent scoring trend</p>
          </div>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={lineData}>
                <CartesianGrid stroke="#1f2937" strokeDasharray="3 6" />
                <Tooltip contentStyle={{ background: "rgba(3,7,18,0.96)", border: "1px solid rgba(34,211,238,0.22)", borderRadius: 8 }} />
                <Legend />
                <Line dataKey={left.name} stroke="#22d3ee" strokeWidth={3} animationDuration={900} />
                <Line dataKey={right.name} stroke="#f472b6" strokeWidth={3} animationDuration={900} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card className="p-5">
          <div className="mb-4">
            <h2 className="text-base font-semibold text-gray-50">Impact Radar</h2>
            <p className="mt-1 text-xs text-gray-500">Normalized profile across five axes</p>
          </div>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={radarData}>
                <PolarGrid stroke="#374151" />
                <PolarAngleAxis dataKey="axis" tick={{ fill: "#d1d5db", fontSize: 12 }} />
                <PolarRadiusAxis angle={90} domain={[0, 100]} tick={{ fill: "#9ca3af", fontSize: 10 }} />
                <Radar name={left.name} dataKey={left.name} stroke="#22d3ee" fill="#22d3ee" fillOpacity={0.22} isAnimationActive />
                <Radar name={right.name} dataKey={right.name} stroke="#f472b6" fill="#f472b6" fillOpacity={0.2} isAnimationActive />
                <Legend />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </section>
    </main>
  );
}
