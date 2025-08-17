import React from "react";
export default function Logo({ className = "h-7 w-7 text-slate-900" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" role="img" aria-label="Logotipo de DigitalShift" xmlns="http://www.w3.org/2000/svg">
      <rect x="2" y="2" width="20" height="20" rx="4" fill="currentColor" opacity="0.1" />
      <path d="M6 14l4-4 4 4 4-4" stroke="currentColor" strokeWidth="2" fill="none" />
    </svg>
  );
}