"use client";

import dynamic from "next/dynamic";

const InteractiveBackground = dynamic(
  () => import("@/components/common/InteractiveBackground"),
  { ssr: false }
);

export default function LazyBackground() {
  return <InteractiveBackground />;
}
