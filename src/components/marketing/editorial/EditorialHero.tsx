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
 * Server Component. Hero editorial de servicio: blanco, tipografía grande,
 * datos en fila dividida por líneas finas. Reveal vía CSS (animate-fade-up).
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
    <section className="bg-white pt-28 pb-16 sm:pt-32 sm:pb-20">
      <Container>
        <Breadcrumbs items={breadcrumbs} />

        <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-start lg:gap-16">
          <div className="max-w-3xl">
            <p className="section-tag animate-fade-up">{eyebrow}</p>

            <h1 className="text-h1 mt-6 animate-fade-up delay-100">{title}</h1>

            <p className="mt-6 max-w-2xl text-lg sm:text-xl leading-relaxed text-[#3D4046] animate-fade-up delay-200">
              {subtitle}
            </p>

            <div className="mt-8 border-l-2 border-brand-600 pl-5 animate-fade-up delay-300">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#63666D]">
                Lo que también te diremos
              </p>
              <p className="mt-2 text-[15px] leading-relaxed text-[#3D4046]">
                {honestyLine}
              </p>
            </div>

            <dl className="mt-10 grid grid-cols-2 gap-x-8 gap-y-6 border-t border-[#E4E6EA] pt-6 sm:grid-cols-4 animate-fade-up delay-400">
              {metaPills.map((p) => (
                <div key={p.label}>
                  <dt className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#63666D]">
                    {p.label}
                  </dt>
                  <dd className="mt-1.5 text-base font-semibold tracking-tight text-[#101014]">
                    {p.value}
                  </dd>
                </div>
              ))}
            </dl>

            <div className="mt-10 flex flex-wrap gap-3 animate-fade-up delay-500">
              <Button as="a" href="/#contacto" variant="primary">
                Diagnóstico gratuito
              </Button>
              <Button as="a" href="/servicios" variant="ghost">
                Ver todos los servicios
              </Button>
            </div>
          </div>

          <div className="lg:sticky lg:top-28 lg:self-start">
            <HeroSignature slug={slug} />
          </div>
        </div>
      </Container>
    </section>
  );
}
