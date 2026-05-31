"use client";

import { useEffect, useMemo, useState } from "react";
import type React from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from "recharts";
import { Activity, Radio, ShieldCheck, TrendingUp } from "lucide-react";
import { Card } from "@/components/ui/card";
import { buildMilestones, currentMomentum } from "@/lib/predictions";
import type { Match, Player } from "@/lib/types";

export function Dashboard({ initialMatch, players }: { initialMatch: Match; players: Player[] }) {
  const [match, setMatch] = useState(initialMatch);
  const [summary, setSummary] = useState("Reading the latest pressure swing");

  useEffect(() => {
    let cancelled = false;
    async function loadSummary() {
      const previous = match.momentum_per_over[match.current_overs - 2] ?? 50;
      const current = currentMomentum(match);
      const res = await fetch("/api/llm/summary", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ match_id: match.id, over_number: match.current_overs, momentum_change: current - previous })
      });
      const json = await res.json();
      if (!cancelled) setSummary(json.text ?? "Momentum holds steady now");
    }
    loadSummary().catch(() => setSummary("Momentum holds steady now"));
    return () => {
      cancelled = true;
    };
  }, [match.id, match.current_overs, match.momentum_per_over]);

  useEffect(() => {
    const id = window.setInterval(async () => {
      try {
        const res = await fetch(`/api/match-data/${match.id}`);
        if (res.ok) setMatch(await res.json());
      } catch {
        // Keep the current rendered state if polling fails.
      }
    }, 30000);
    return () => window.clearInterval(id);
  }, [match.id]);

  const winData = match.win_probability.map((value, index) => ({ over: index + 1, probability: value }));
  const runData = match.runs_per_over.team1.map((team1, index) => ({ over: index + 1, [match.team1]: team1, [match.team2]: match.runs_per_over.team2[index] ?? 0 }));
  const milestones = useMemo(() => buildMilestones(match, players), [match, players]);
  const momentum = currentMomentum(match);

  return (
    <main className="mx-auto max-w-7xl px-4 py-8 sm:py-10">
      <section className="mb-6 grid gap-5 lg:grid-cols-[1.35fr_0.65fr] lg:items-end">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-lime-300/20 bg-lime-300/10 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-lime-100">
            <motion.span
              className="h-2.5 w-2.5 rounded-full bg-lime-300"
              animate={{ scale: [1, 1.45, 1], opacity: [0.7, 1, 0.7] }}
              transition={{ repeat: Infinity, duration: 1.2 }}
            />
            Live intelligence
          </div>
          <h1 className="mt-4 max-w-4xl text-4xl font-semibold leading-tight text-gray-50 md:text-6xl">{match.title}</h1>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-gray-400">
            Real-time match control, over-by-over pressure, and fantasy impact signals without heavy AI calls.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <HeroMetric label="Win lean" value={`${match.win_probability.at(-1)}%`} tone="lime" />
          <HeroMetric label="Momentum" value={`${momentum}`} tone="cyan" />
        </div>
      </section>

      <MilestoneTicker items={milestones} />

      <section className="mt-5 grid gap-4 lg:grid-cols-[1.55fr_0.95fr]">
        <Card className="p-5">
          <PanelTitle icon={<Activity className="h-5 w-5 text-cyan-200" />} title="Win Probability" caption="Modelled locally by over state" />
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={winData}>
                <defs>
                  <linearGradient id="winLine" x1="0" x2="1">
                    <stop offset="0%" stopColor="#22d3ee" />
                    <stop offset="100%" stopColor="#a3e635" />
                  </linearGradient>
                </defs>
                <CartesianGrid stroke="#1f2937" strokeDasharray="3 6" />
                <XAxis dataKey="over" stroke="#9ca3af" />
                <YAxis domain={[0, 100]} stroke="#9ca3af" />
                <Tooltip contentStyle={{ background: "rgba(3,7,18,0.96)", border: "1px solid rgba(34,211,238,0.22)", borderRadius: 8 }} />
                <Line type="monotone" dataKey="probability" stroke="url(#winLine)" strokeWidth={3} dot={false} animationDuration={900} isAnimationActive />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card className="p-5">
          <PanelTitle icon={<ShieldCheck className="h-5 w-5 text-lime-200" />} title="Scorecard" caption={`${match.team1} innings`} />
          <div className="rounded-lg border border-white/10 bg-gray-950/52 p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]">
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-400">{match.team1} batting</span>
              <span className="rounded-full bg-cyan-300/10 px-2.5 py-1 text-xs font-semibold text-cyan-100">{match.team2} fielding</span>
            </div>
            <div className="metric-value mt-3 text-5xl font-semibold text-white">{match.current_score}/{match.current_wickets}</div>
            <div className="mt-3 h-2 overflow-hidden rounded-full bg-white/10">
              <div className="h-full rounded-full bg-gradient-to-r from-cyan-300 to-lime-300" style={{ width: `${Math.min(100, (match.current_overs / match.overs) * 100)}%` }} />
            </div>
            <div className="mt-2 flex justify-between text-xs text-gray-400">
              <span>{match.current_overs}.0 overs</span>
              <span>{match.overs} max</span>
            </div>
          </div>
          <KeyMoment summary={summary} over={match.current_overs} />
        </Card>
      </section>

      <section className="mt-4 grid gap-4 lg:grid-cols-2">
        <Card className="p-5">
          <PanelTitle icon={<TrendingUp className="h-5 w-5 text-pink-200" />} title="Momentum Heat Map" caption="Blue favors batting, pink favors fielding" />
          <div className="grid gap-2" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(28px, 1fr))" }}>
            {match.momentum_per_over.map((value, index) => (
              <motion.div
                key={`${index}-${value}`}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.015 }}
                title={`Over ${index + 1}: ${value}`}
                className="h-9 rounded-md border border-white/5 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]"
                style={{ background: value >= 50 ? `rgba(34,211,238,${0.25 + value / 150})` : `rgba(244,114,182,${0.35 + (50 - value) / 90})` }}
              />
            ))}
          </div>
        </Card>

        <Card className="p-5">
          <PanelTitle title="Runs Per Over" caption={`${match.team1} vs ${match.team2}`} />
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={runData}>
                <CartesianGrid stroke="#1f2937" strokeDasharray="3 6" />
                <XAxis dataKey="over" stroke="#9ca3af" />
                <YAxis stroke="#9ca3af" />
                <Tooltip contentStyle={{ background: "rgba(3,7,18,0.96)", border: "1px solid rgba(34,211,238,0.22)", borderRadius: 8 }} />
                <Bar dataKey={match.team1} fill="#22d3ee" radius={[4, 4, 0, 0]} isAnimationActive />
                <Bar dataKey={match.team2} fill="#f472b6" radius={[4, 4, 0, 0]} isAnimationActive />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </section>

      <MomentumWave score={momentum} />
    </main>
  );
}

function HeroMetric({ label, value, tone }: { label: string; value: string; tone: "cyan" | "lime" }) {
  const color = tone === "cyan" ? "text-cyan-100 bg-cyan-300/10 border-cyan-300/20" : "text-lime-100 bg-lime-300/10 border-lime-300/20";
  return (
    <Card className={`p-4 ${color}`}>
      <div className="eyebrow">{label}</div>
      <div className="metric-value mt-2 text-3xl font-semibold">{value}</div>
    </Card>
  );
}

function PanelTitle({ icon, title, caption }: { icon?: React.ReactNode; title: string; caption: string }) {
  return (
    <div className="mb-4 flex items-start justify-between gap-3">
      <div>
        <h2 className="flex items-center gap-2 text-base font-semibold text-gray-50">{icon}{title}</h2>
        <p className="mt-1 text-xs text-gray-500">{caption}</p>
      </div>
    </div>
  );
}

function MilestoneTicker({ items }: { items: string[] }) {
  return (
    <motion.div drag="x" dragConstraints={{ left: -420, right: 0 }} className="scrollbar-hide flex cursor-grab gap-3 overflow-hidden rounded-lg border border-white/10 bg-white/[0.035] p-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]">
      {[...items, ...items].map((item, index) => (
        <motion.div
          key={`${item}-${index}`}
          animate={{ x: ["0%", "-12%"] }}
          transition={{ repeat: Infinity, duration: 18, ease: "linear" }}
          className="min-w-max rounded-md border border-lime-300/15 bg-gray-950/60 px-4 py-2 text-sm font-medium text-gray-200"
        >
          {item}
        </motion.div>
      ))}
    </motion.div>
  );
}

function KeyMoment({ summary, over }: { summary: string; over: number }) {
  return (
    <div className="mt-4 rounded-lg border border-pink-300/20 bg-pink-300/[0.055] p-4">
      <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.12em] text-pink-200"><Radio className="h-4 w-4" /> Key Moment, over {over}</div>
      <AnimatePresence mode="wait">
        <motion.p key={summary} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} className="mt-2 text-xl font-semibold text-gray-50">
          {summary}
        </motion.p>
      </AnimatePresence>
    </div>
  );
}

function MomentumWave({ score }: { score: number }) {
  const amplitude = 10 + score / 4;
  const speed = Math.max(1.5, 5 - score / 28);
  const d = `M 0 70 C 90 ${70 - amplitude}, 170 ${70 + amplitude}, 260 70 S 430 ${70 - amplitude}, 520 70 S 690 ${70 + amplitude}, 780 70`;
  return (
    <Card className="mt-4 overflow-hidden p-5">
      <PanelTitle title="Momentum Wave" caption={`Current pressure score ${score}/100`} />
      <svg viewBox="0 0 780 140" className="h-40 w-full">
        <motion.path
          d={d}
          fill="none"
          stroke="url(#waveGradient)"
          strokeWidth="8"
          strokeLinecap="round"
          animate={{ pathLength: [0.25, 1, 0.25], opacity: [0.7, 1, 0.7] }}
          transition={{ repeat: Infinity, duration: speed, ease: "easeInOut" }}
        />
        <defs>
          <linearGradient id="waveGradient" x1="0" x2="1">
            <stop stopColor="#22d3ee" />
            <stop offset="0.5" stopColor="#a3e635" />
            <stop offset="1" stopColor="#f472b6" />
          </linearGradient>
        </defs>
      </svg>
    </Card>
  );
}
