"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export default function IngestPage() {
  const [payload, setPayload] = useState("");
  const [status, setStatus] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function submit() {
    setLoading(true);
    setStatus(null);
    try {
      const parsed = JSON.parse(payload);
      const res = await fetch("/api/update-match", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parsed)
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error ?? "Update failed");
      setStatus("Match data saved.");
    } catch (error) {
      setStatus(error instanceof Error ? error.message : "Invalid payload");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="mx-auto max-w-4xl px-4 py-10">
      <motion.div initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }}>
        <Card className="p-5">
          <h1 className="text-2xl font-semibold">Ingest Match JSON</h1>
          <textarea
            value={payload}
            onChange={(event) => setPayload(event.target.value)}
            className="mt-4 min-h-80 w-full rounded-md border border-cyan-400/20 bg-gray-950/80 p-4 text-sm text-gray-100 outline-none focus:border-cyan-300"
            spellCheck={false}
            placeholder='{"title":"IND vs AUS","team1":"IND","team2":"AUS","overs":50,...}'
          />
          <div className="mt-4 flex items-center gap-3">
            <Button onClick={submit} disabled={loading}>{loading ? "Saving..." : "Submit"}</Button>
            {status && <p className="text-sm text-gray-300">{status}</p>}
          </div>
        </Card>
      </motion.div>
    </main>
  );
}
