"use client";

import { useMemo, useState } from "react";
import * as Popover from "@radix-ui/react-popover";
import { Check, ChevronsUpDown, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export type ComboOption = { value: string; label: string };

export function Combobox({
  options,
  value,
  onChange,
  placeholder
}: {
  options: ComboOption[];
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
}) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const selected = options.find((option) => option.value === value);
  const filtered = useMemo(
    () => options.filter((option) => option.label.toLowerCase().includes(query.toLowerCase())),
    [options, query]
  );

  return (
    <Popover.Root open={open} onOpenChange={setOpen}>
      <Popover.Trigger asChild>
        <Button className="w-full justify-between bg-gray-900/80 text-gray-100">
          {selected?.label ?? placeholder}
          <ChevronsUpDown className="h-4 w-4 text-cyan-200" />
        </Button>
      </Popover.Trigger>
      <Popover.Portal>
        <Popover.Content className="z-50 mt-2 w-72 rounded-lg border border-cyan-300/20 bg-gray-950 p-2 shadow-2xl">
          <div className="flex items-center gap-2 rounded-md border border-gray-700 bg-gray-900 px-2">
            <Search className="h-4 w-4 text-gray-400" />
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              className="h-9 w-full bg-transparent text-sm outline-none"
              placeholder="Search players"
            />
          </div>
          <div className="mt-2 max-h-64 overflow-auto">
            {filtered.map((option) => (
              <button
                key={option.value}
                onClick={() => {
                  onChange(option.value);
                  setOpen(false);
                }}
                className="flex w-full items-center justify-between rounded-md px-2 py-2 text-left text-sm text-gray-200 hover:bg-cyan-400/10"
              >
                {option.label}
                <Check className={cn("h-4 w-4 text-lime-300", value === option.value ? "opacity-100" : "opacity-0")} />
              </button>
            ))}
          </div>
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
}
