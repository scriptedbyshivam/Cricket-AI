"use client";

import * as TooltipPrimitive from "@radix-ui/react-tooltip";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

export const TooltipProvider = TooltipPrimitive.Provider;
export const Tooltip = TooltipPrimitive.Root;
export const TooltipTrigger = TooltipPrimitive.Trigger;

export function TooltipContent({ className, sideOffset = 8, ...props }: TooltipPrimitive.TooltipContentProps) {
  return (
    <TooltipPrimitive.Portal>
      <AnimatePresence>
        <TooltipPrimitive.Content asChild sideOffset={sideOffset} {...props}>
          <motion.div
            initial={{ opacity: 0, y: 6, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 6, scale: 0.96 }}
            className={cn("z-50 max-w-xs rounded-md border border-pink-300/30 bg-gray-950 px-3 py-2 text-xs text-gray-100 shadow-2xl", className)}
          >
            {props.children}
          </motion.div>
        </TooltipPrimitive.Content>
      </AnimatePresence>
    </TooltipPrimitive.Portal>
  );
}
