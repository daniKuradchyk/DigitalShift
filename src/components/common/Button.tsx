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
type AnchorButtonProps = Omit<AnchorButton, "variant" | "size" | "className" | "children" | "as">;
type NativeButtonProps = Omit<NativeButton, "variant" | "size" | "className" | "children" | "as">;

const base =
  "group inline-flex items-center justify-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold tracking-tight transition-all duration-200 will-change-transform active:translate-y-0 disabled:opacity-50 disabled:pointer-events-none";

const sizes: Record<Sizes, string> = {
  sm: "px-3.5 py-1.5 text-xs",
  md: "px-5 py-2.5 text-sm",
  lg: "px-6 py-3 text-base",
};

const variants: Record<Variants, string> = {
  primary: cn(
    "text-white",
    "bg-[linear-gradient(135deg,#0284C7_0%,#0EA5E9_50%,#38BDF8_100%)] bg-[length:200%_100%]",
    "hover:bg-[position:100%_0]",
    "border border-sky-400/30",
    "shadow-[0_0_20px_rgba(56,189,248,0.20),0_8px_32px_-8px_rgba(14,165,233,0.40)]",
    "hover:shadow-[0_0_35px_rgba(56,189,248,0.35),0_12px_40px_-8px_rgba(14,165,233,0.55)]",
    "hover:-translate-y-0.5",
    "focus-visible:ring-2 focus-visible:ring-sky-400/50 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
  ),
  ghost: cn(
    "text-slate-300",
    "bg-slate-800/50 border border-slate-700/60",
    "backdrop-blur-sm",
    "shadow-sm",
    "hover:-translate-y-0.5 hover:bg-slate-800/80 hover:border-sky-500/20 hover:text-sky-300",
    "hover:shadow-[0_0_20px_rgba(56,189,248,0.08)]",
    "focus-visible:ring-2 focus-visible:ring-sky-400/50 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
  ),
  shine: cn(
    "relative text-white overflow-hidden",
    "bg-[linear-gradient(135deg,#0369A1_0%,#0EA5E9_35%,#22D3EE_65%,#818CF8_100%)] bg-[length:250%_100%]",
    "hover:bg-[position:100%_0]",
    "border border-sky-500/30",
    "shadow-[0_0_24px_rgba(56,189,248,0.22),0_8px_32px_-8px_rgba(14,165,233,0.45)]",
    "hover:shadow-[0_0_40px_rgba(56,189,248,0.40),0_12px_44px_-8px_rgba(14,165,233,0.60)]",
    "hover:-translate-y-0.5",
    "focus-visible:ring-2 focus-visible:ring-sky-400/50 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
  ),
};

export default function Button(props: ButtonProps) {
  const { variant = "primary", size = "md", className, children, ...rest } = props;
  const classes = cn(base, sizes[size], variants[variant], className);

  if (props.as === "a") {
    const { href, ...anchorProps } = rest as AnchorButtonProps & { href: string };
    return (
      <a href={href} className={classes} {...anchorProps}>
        {children}
      </a>
    );
  }

  const buttonProps = rest as NativeButtonProps;
  return (
    <button className={classes} {...buttonProps}>
      {children}
    </button>
  );
}
