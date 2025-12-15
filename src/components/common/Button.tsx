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
  "group inline-flex items-center justify-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold tracking-tight transition-all duration-200 will-change-transform active:translate-y-0";

const sizes: Record<Sizes, string> = {
  sm: "px-3 py-1.5 text-sm",
  md: "px-4 py-2 text-sm",
  lg: "px-5 py-3 text-base",
};

const variants: Record<Variants, string> = {
  primary:
    "text-white bg-brand-700 bg-[linear-gradient(115deg,#0e1d4a,#1c3994,#4168e1,#6389ff)] bg-[length:200%_100%] hover:bg-[position:100%_0] border border-brand-900/60 shadow-[0_18px_54px_-18px_rgba(14,29,74,0.7)] hover:-translate-y-0.5 hover:shadow-[0_22px_64px_-20px_rgba(65,104,225,0.7)] focus-visible:ring-2 focus-visible:ring-brand-300 focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-bg-card,white)]",
  ghost: cn(
    "text-[color:var(--color-text)]",
    "bg-[color:var(--color-bg-card)] border border-[color:var(--color-border)]",
    "shadow-[0_12px_34px_-18px_rgba(14,29,74,0.25)] hover:-translate-y-0.5 hover:shadow-[0_18px_46px_-18px_rgba(65,104,225,0.35)]",
    "hover:bg-[color:var(--color-bg-muted)] focus-visible:ring-2 focus-visible:ring-brand-300 focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-bg-card,white)]"
  ),
  shine: cn(
    "relative text-white",
    "bg-brand-700 bg-[linear-gradient(120deg,#0e1d4a,#1c3994,#4168e1,#6389ff)] bg-[length:200%_100%] hover:bg-[position:100%_0]",
    "border border-brand-900/80 shadow-[0_18px_52px_-18px_rgba(14,29,74,0.55)] hover:shadow-[0_24px_62px_-20px_rgba(65,104,225,0.5)] hover:-translate-y-0.5",
    "hover:-translate-y-0.5 focus-visible:ring-2 focus-visible:ring-brand-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-bg-card,white)]"
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
