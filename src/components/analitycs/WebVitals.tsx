"use client";
import { onCLS, onFID, onLCP, onINP, onTTFB, onFCP } from "web-vitals";
import { useEffect } from "react";
export default function WebVitals() {
  useEffect(() => {
    onCLS(console.log);
    onFID(console.log);
    onLCP(console.log);
    onINP?.(console.log);
    onTTFB(console.log);
    onFCP(console.log);
  }, []);
  return null;
}