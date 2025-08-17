import React from "react";
import { cn } from "@/lib/utils";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  as?: "button" | "a";
  href?: string;
  variant?: "primary" | "ghost" | "shine";
  size?: "sm" | "md" | "lg";
};

const base =
  "group inline-flex items-center justify-center rounded-xl px-4 py-2 text-sm font-medium transition will-change-transform active:scale-[.98]";

const sizes = {
  sm: "px-3 py-1.5 text-sm",
  md: "px-4 py-2 text-sm",
  lg: "px-5 py-3 text-base",
};

const variants = {
  primary:
    "bg-slate-900 text-white hover:bg-slate-800 focus-visible:ring-2 focus-visible:ring-slate-900 focus-visible:ring-offset-2 shadow-sm",
  ghost:
    "bg-transparent text-slate-900 border border-slate-300 hover:bg-slate-50 focus-visible:ring-2 focus-visible:ring-slate-900 focus-visible:ring-offset-2",
  shine:
    cn(
      "relative text-white",
      "bg-gradient-to-r from-brand-600 via-emerald-600 to-brand-600 bg-[length:200%_100%] hover:bg-[position:100%_0]",
      "shadow-glow focus-visible:ring-2 focus-visible:ring-brand-600 focus-visible:ring-offset-2"
    ),
};

export default function Button({ as = "button", href, variant = "primary", size = "md", className, children, ...props }: ButtonProps) {
  const classes = cn(base, sizes[size], variants[variant], className);
  if (as === "a" && href) {
    return (
      <a href={href} className={classes} {...(props as any)}>
        {children}
      </a>
    );
  }
  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
}
