"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export type ButtonProps = {
  variant?: "default" | "outline" | "ghost" | "brand1" | "brand2" | "brand3" | "brand4";
  isLoading?: boolean;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  function Button(
    { className, variant = "brand1", isLoading = false, disabled, children, ...props },
    ref
  ) {
    const base = "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none h-10 px-4 py-2";
    const variants: Record<string, string> = {
      default: "bg-foreground text-background hover:opacity-90",
      brand1: "bg-[#37353E] text-white hover:opacity-90",
      brand2: "bg-[#44444E] text-white hover:opacity-90",
      brand3: "bg-[#715A5A] text-white hover:opacity-90",
      brand4: "bg-[#D3DAD9] text-[#1a1a1a] hover:opacity-90",
      outline:
        "border border-black/10 dark:border-white/20 bg-transparent hover:bg-black/5 dark:hover:bg-white/10",
      ghost: "bg-transparent hover:bg-black/5 dark:hover:bg-white/10",
    };
    return (
      <button
        ref={ref}
        className={cn(base, variants[variant] ?? variants.default, className)}
        disabled={isLoading || disabled}
        {...props}
      >
        {isLoading ? "Loading…" : children}
      </button>
    );
  }
);

export default Button;


