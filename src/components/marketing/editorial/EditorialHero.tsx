import Container from "@/components/common/Container";
import Breadcrumbs, { type BreadcrumbItem } from "@/components/marketing/Breadcrumbs";
import Button from "@/components/common/Button";
import HeroSignature from "./HeroSignature";
import type { ServiceSlug } from "@/content/services";

type Props = {
  slug: ServiceSlug;
  breadcrumbs: BreadcrumbItem[];
  eyebrow: string;
  title: string;
  subtitle: string;
  honestyLine: string;
  metaPills: { label: string; value: string }[];
};

/**
 * Server Component. Reveal vía CSS (animate-fade-up + delay-*).
 */
export default function EditorialHero({
  slug,
  breadcrumbs,
  eyebrow,
  title,
  subtitle,
  honestyLine,
  metaPills,
}: Props) {
  return (
    <section className="relative overflow-hidden pt-28 pb-20 sm:pt-32 sm:pb-24">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 75% 30%, rgba(65,105,225,0.10), transparent 60%)",
        }}
      />

      <Container className="relative">
        <Breadcrumbs items={breadcrumbs} />

        <div className="grid gap-12 lg:grid-cols-[1fr_auto] lg:items-start lg:gap-16">
          <div className="max-w-3xl">
            <div className="animate-fade-up">
              <span className="section-tag mb-6">
                <span className="h-1.5 w-1.5 rounded-full bg-blue-400 animate-breathe" aria-hidden />
                {eyebrow}
              </span>
            </div>

            <h1
              className="font-bold animate-fade-up delay-100"
              style={{
                color: "var(--text-primary)",
                fontSize: "clamp(2rem, 5.5vw, 4rem)",
                lineHeight: 1.05,
                letterSpacing: "-0.035em",
              }}
            >
              {title}
            </h1>

            <p
              className="mt-6 text-lg sm:text-xl leading-relaxed max-w-2xl animate-fade-up delay-200"
              style={{ color: "var(--text-secondary)" }}
            >
              {subtitle}
            </p>

            <div
              className="mt-7 pl-4 border-l-2 animate-fade-up delay-300"
              style={{ borderColor: "rgba(91,141,239,0.35)" }}
            >
              <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-blue-400 mb-1.5">
                Lo que también te diremos
              </p>
              <p
                className="text-[15px] leading-relaxed italic"
                style={{ color: "var(--text-muted)" }}
              >
                {honestyLine}
              </p>
            </div>

            <div className="mt-8 flex flex-wrap gap-x-6 gap-y-3 animate-fade-up delay-400">
              {metaPills.map((p) => (
                <div key={p.label} className="flex flex-col">
                  <span
                    className="font-mono text-[10px] uppercase tracking-[0.18em]"
                    style={{ color: "var(--text-muted)" }}
                  >
                    {p.label}
                  </span>
                  <span
                    className="font-bold text-base sm:text-lg mt-0.5"
                    style={{ color: "var(--accent-light)" }}
                  >
                    {p.value}
                  </span>
                </div>
              ))}
            </div>

            <div className="mt-10 flex flex-wrap gap-3 animate-fade-up delay-500">
              <Button as="a" href="/#contacto" variant="shine">
                Diagnóstico gratuito
              </Button>
              <Button as="a" href="/servicios" variant="ghost">
                Ver todos los servicios
              </Button>
            </div>
          </div>

          <div className="lg:sticky lg:top-28 lg:self-start animate-fade-up delay-200">
            <HeroSignature slug={slug} />
          </div>
        </div>
      </Container>
    </section>
  );
}
