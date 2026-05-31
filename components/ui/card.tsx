"use client";

import { motion, type HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";

export function Card({ className, ...props }: HTMLMotionProps<"div">) {
  return (
    <motion.div
      whileHover={{ y: -2, boxShadow: "0 24px 80px rgba(0,0,0,0.36), 0 0 0 1px rgba(34,211,238,0.18)" }}
      transition={{ type: "spring", stiffness: 260, damping: 26 }}
      className={cn("panel", className)}
      {...props}
    />
  );
}
