"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { getServices, type ServiceSlug } from "@/content/services";

const EASE = [0.16, 1, 0.3, 1] as const;

type Variant = "home" | "hub" | "related";

type Props = {
  variant?: Variant;
  slugs?: ServiceSlug[];
};

const SERVICE_IMAGES: Record<string, string> = {
  "software-a-medida": "/images/svc-software.png",
  "web-a-medida": "/images/svc-web.png",
  "automatizacion-integraciones": "/images/svc-automation.png",
  "crm-intranet-a-medida": "/images/svc-crm.png",
};

export default function ServiceCards({ variant = "hub", slugs }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const selected = getServices().filter((service) => (slugs ? slugs.includes(service.slug) : true));
  const isRelated = variant === "related";

  return (
    <div
      ref={ref}
      className={`grid gap-5 ${isRelated ? "md:grid-cols-3" : "sm:grid-cols-2"}`}
    >
      {selected.map((service, i) => {
        const summary = variant === "home" ? service.homeSummary : service.cardSummary;
        const image = SERVICE_IMAGES[service.slug];

        return (
          <motion.div
            key={service.slug}
            initial={{ opacity: 0, y: 24, filter: "blur(4px)" }}
            animate={inView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
            transition={{ duration: 0.6, delay: i * 0.12, ease: EASE }}
          >
            <Link
              href={service.href}
              className="group relative flex flex-col overflow-hidden rounded-2xl border border-white/[0.06] bg-white/[0.02] transition-all hover:border-blue-400/25 hover:bg-white/[0.04]"
            >
              {/* Accent line top */}
              <div
                className="h-px transition-opacity duration-300 group-hover:opacity-100 opacity-0"
                style={{ background: "linear-gradient(90deg, transparent, rgba(65,105,225,0.50), transparent)" }}
              />

              {/* Image area */}
              {image && !isRelated && (
                <div className="relative overflow-hidden">
                  <div className="relative flex items-center justify-center py-8 px-6">
                    <div
                      aria-hidden
                      className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                      style={{ background: "radial-gradient(circle, rgba(65,105,225,0.12), transparent 70%)" }}
                    />
                    <Image
                      src={image}
                      alt=""
                      width={200}
                      height={200}
                      className="relative w-32 h-32 object-contain transition-transform duration-500 group-hover:scale-110 drop-shadow-[0_12px_40px_rgba(65,105,225,0.20)]"
                    />
                  </div>
                  {/* Fade to content */}
                  <div className="absolute inset-x-0 bottom-0 h-8 bg-gradient-to-t from-[rgba(6,11,26,0.8)] to-transparent" />
                </div>
              )}

              {/* Content */}
              <div className="flex flex-1 flex-col p-6 pt-4">
                <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-blue-400">
                  {service.eyebrow}
                </p>
                <h3
                  className="mt-2 text-lg font-bold tracking-tight transition-colors group-hover:text-blue-300"
                  style={{ color: "var(--text-primary)" }}
                >
                  {service.shortTitle}
                </h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>
                  {summary}
                </p>

                {/* CTA */}
                <div className="mt-5 flex items-center gap-2 text-sm font-medium text-blue-400 transition-colors group-hover:text-blue-300">
                  <span>Ver servicio</span>
                  <span className="transition-transform group-hover:translate-x-1">&rarr;</span>
                </div>
              </div>
            </Link>
          </motion.div>
        );
      })}
    </div>
  );
}
