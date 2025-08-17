import React from "react";
import { cn } from "@/lib/utils";

type Variants = "primary" | "ghost" | "shine";
type Sizes = "sm" | "md" | "lg";

type Common = {
  variant?: Variants;
  size?: Sizes;
  className?: string;
  children: React.ReactNode;
};

type AnchorButton = Common &
  React.AnchorHTMLAttributes<HTMLAnchorElement> & {
    as: "a";
    href: string;
  };

type NativeButton = Common &
  React.ButtonHTMLAttributes<HTMLButtonElement> & {
    as?: "button";
    href?: undefined;
  };

type ButtonProps = AnchorButton | NativeButton;

const base =
  "group inline-flex items-center justify-center rounded-xl px-4 py-2 text-sm font-medium transition will-change-transform active:scale-[.98]";

const sizes: Record<Sizes, string> = {
  sm: "px-3 py-1.5 text-sm",
  md: "px-4 py-2 text-sm",
  lg: "px-5 py-3 text-base",
};

const variants: Record<Variants, string> = {
  primary:
    "bg-slate-900 text-white hover:bg-slate-800 focus-visible:ring-2 focus-visible:ring-slate-900 focus-visible:ring-offset-2 shadow-sm",
  ghost:
    "bg-transparent text-slate-900 border border-slate-300 hover:bg-slate-50 focus-visible:ring-2 focus-visible:ring-slate-900 focus-visible:ring-offset-2",
  shine: cn(
    "relative text-white",
    "bg-gradient-to-r from-brand-600 via-emerald-600 to-brand-600 bg-[length:200%_100%] hover:bg-[position:100%_0]",
    "shadow-glow focus-visible:ring-2 focus-visible:ring-brand-600 focus-visible:ring-offset-2"
  ),
};

export default function Button(props: ButtonProps) {
  const { variant = "primary", size = "md", className, children } = props;
  const classes = cn(base, sizes[size], variants[variant], className);

  if (props.as === "a") {
    const { href, ...anchorProps } = props;
    return (
      <a href={href} className={classes} {...anchorProps}>
        {children}
      </a>
    );
  }

  const { as: _as, ...buttonProps } = props;
  return (
    <button className={classes} {...buttonProps}>
      {children}
    </button>
  );
}
