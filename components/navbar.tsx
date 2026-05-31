"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BarChart3 } from "lucide-react";
import { cn } from "@/lib/utils";

const links = [
  { href: "/", label: "Dashboard" },
  { href: "/compare", label: "Compare" },
  { href: "/fantasy", label: "Fantasy" }
];

export function Navbar() {
  const pathname = usePathname();
  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-gray-950/80 backdrop-blur-xl">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3.5">
        <Link href="/" className="flex items-center gap-3 text-lg font-bold tracking-wide text-gray-50">
          <span className="flex h-9 w-9 items-center justify-center rounded-md border border-cyan-300/25 bg-cyan-300/10 shadow-[0_0_28px_rgba(34,211,238,0.12)]">
            <BarChart3 className="h-5 w-5 text-cyan-200" />
          </span>
          CricketIQ
        </Link>
        <div className="flex items-center gap-1 rounded-lg border border-white/10 bg-white/[0.04] p-1 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "rounded-md px-3 py-2 text-sm font-medium transition",
                pathname === link.href ? "bg-cyan-300/14 text-cyan-50 shadow-sm" : "text-gray-400 hover:bg-white/[0.04] hover:text-gray-100"
              )}
            >
              {link.label}
            </Link>
          ))}
        </div>
      </nav>
    </header>
  );
}
