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
  "group inline-flex items-center justify-center gap-2 rounded-[2px] px-6 py-3 text-sm font-medium tracking-tight transition-colors duration-150 disabled:opacity-50 disabled:pointer-events-none";

const sizes: Record<Sizes, string> = {
  sm: "px-4 py-2 text-xs",
  md: "px-6 py-3 text-sm",
  lg: "px-7 py-3.5 text-[15px]",
};

const variants: Record<Variants, string> = {
  // Sólido tinta: la acción principal del sitio
  primary: cn(
    "text-white bg-[#101014]",
    "hover:bg-brand-600",
    "focus-visible:ring-2 focus-visible:ring-brand-600/60 focus-visible:ring-offset-2 focus-visible:ring-offset-white"
  ),
  // Contorno fino: acción secundaria
  ghost: cn(
    "text-[#101014] bg-transparent",
    "border border-[#C9CCD3]",
    "hover:border-[#101014]",
    "focus-visible:ring-2 focus-visible:ring-brand-600/60 focus-visible:ring-offset-2 focus-visible:ring-offset-white"
  ),
  // Azul corporativo: CTA destacado
  shine: cn(
    "text-white bg-brand-600",
    "hover:bg-brand-700",
    "focus-visible:ring-2 focus-visible:ring-brand-600/60 focus-visible:ring-offset-2 focus-visible:ring-offset-white"
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
