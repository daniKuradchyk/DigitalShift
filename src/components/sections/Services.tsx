import Link from "next/link";
import Container from "@/components/common/Container";
import ServiceVisual from "@/components/marketing/ServiceVisual";
import { serviceOrder, services, type ServiceSlug } from "@/content/services";

/* ═══════════════════════════════════════════════════════════════════
   SERVICE ROW — fila editorial, un solo acento corporativo
   ═══════════════════════════════════════════════════════════════════ */
function ServiceRow({ slug, index, total }: { slug: string; index: number; total: number }) {
  const s = services[slug as keyof typeof services];
  const indexNum = String(index + 1).padStart(2, "0");

  return (
    <div
      className="group relative animate-fade-up"
      style={{ animationDelay: `${index * 80}ms` }}
    >
      <Link href={s.href} className="block relative py-10 sm:py-14 lg:py-16">
        <div className="relative grid grid-cols-12 gap-6 sm:gap-8 lg:gap-12">
          {/* Numeración */}
          <div className="col-span-12 sm:col-span-2 lg:col-span-1 order-1">
            <span className="text-2xl sm:text-3xl font-light tabular-nums leading-none tracking-tight text-[#9DA0A6]">
              {indexNum}
            </span>
          </div>

          {/* Bloque principal */}
          <div className="col-span-12 sm:col-span-10 lg:col-span-7 order-2">
            <span className="mb-2 sm:mb-3 inline-block text-xs font-semibold uppercase tracking-[0.14em] text-[#63666D]">
              {s.eyebrow}
            </span>

            <h3 className="mb-3 sm:mb-4 text-[#101014] transition-colors duration-200 group-hover:text-brand-600 text-2xl sm:text-3xl font-semibold tracking-tight leading-tight">
              {s.shortTitle}
            </h3>

            <p className="mb-5 sm:mb-6 max-w-2xl text-[15px] sm:text-base leading-relaxed text-[#3D4046]">
              {s.cardSummary}
            </p>

            {/* Stack tags */}
            <ul className="mb-6 sm:mb-7 flex flex-wrap gap-x-2.5 gap-y-2">
              {s.homeStack.map((tag) => (
                <li
                  key={tag}
                  className="border border-[#E4E6EA] bg-white px-2.5 py-1 text-xs text-[#3D4046]"
                >
                  {tag}
                </li>
              ))}
            </ul>

            {/* CTA tipográfico */}
            <span className="inline-flex items-center gap-2 text-sm font-medium text-[#101014]">
              <span className="border-b border-[#C9CCD3] transition-colors duration-200 group-hover:border-brand-600 group-hover:text-brand-600">
                Explorar este servicio
              </span>
              <svg
                className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1"
                fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
                aria-hidden
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </span>
          </div>

          {/* Panel visual + encaje a la derecha */}
          <div className="order-3 col-span-12 lg:col-span-4 lg:border-l lg:border-[#E4E6EA] lg:pl-8">
            <ServiceVisual
              slug={slug as ServiceSlug}
              accentRgb="44,75,196"
              className="mb-6 aspect-[8/5]"
            />

            <div className="mb-5">
              <div className="mb-2.5 flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-brand-600">
                <span className="inline-block h-px w-3 bg-brand-600" />
                Cuándo sí encaja
              </div>
              <ul className="space-y-1.5">
                {s.homeFitYes.map((item) => (
                  <li key={item} className="flex gap-2 text-[13px] sm:text-sm leading-snug text-[#3D4046]">
                    <span aria-hidden className="text-brand-600">·</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <div className="mb-2.5 flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#63666D]">
                <span className="inline-block h-px w-3 bg-[#C9CCD3]" />
                Cuándo no
              </div>
              <ul className="space-y-1.5">
                {s.homeFitNo.map((item) => (
                  <li key={item} className="flex gap-2 text-[13px] sm:text-sm leading-snug text-[#63666D]">
                    <span aria-hidden>·</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </Link>

      {index < total - 1 && <div className="h-px bg-[#E4E6EA]" />}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   SECTION HEADER
   ═══════════════════════════════════════════════════════════════════ */
function SectionHeader() {
  return (
    <div className="mb-12 grid grid-cols-12 gap-6 sm:mb-16 sm:gap-8 lg:mb-20 lg:gap-12">
      <div className="col-span-12 lg:col-span-7">
        <div className="animate-fade-up">
          <p className="section-tag mb-5 sm:mb-6">Servicios</p>
        </div>

        <h2 id="services-title" className="text-h2 animate-fade-up delay-100">
          Cuatro formas de resolver lo que el SaaS no resuelve.
        </h2>
      </div>

      <div className="col-span-12 lg:col-span-5 lg:pt-2 animate-fade-up delay-200">
        <p className="text-[15px] sm:text-base lg:text-lg leading-relaxed text-[#3D4046]">
          Software, web, automatización y sistemas internos a medida.
          Cada uno con su propio encaje — y honestidad para decirte cuándo
          <em className="not-italic font-semibold text-[#101014]"> no es lo que necesitas</em>.
        </p>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   "NONE OF THESE FIT" — cierre honesto
   ═══════════════════════════════════════════════════════════════════ */
function HonestClose() {
  return (
    <div className="mt-12 grid grid-cols-12 gap-6 border-t border-[#E4E6EA] pt-12 sm:mt-16 sm:gap-8 lg:mt-20 animate-fade-up delay-300">
      <div className="col-span-12 sm:col-span-2 lg:col-span-1">
        <span className="text-2xl sm:text-3xl font-light leading-none text-[#9DA0A6]">—</span>
      </div>
      <div className="col-span-12 sm:col-span-10 lg:col-span-11">
        <span className="mb-3 inline-block text-xs font-semibold uppercase tracking-[0.14em] text-[#63666D]">
          Si no encajas
        </span>
        <p className="max-w-3xl text-base sm:text-lg lg:text-xl leading-relaxed text-[#3D4046]">
          Si tu caso no entra limpio en ninguno de los cuatro,
          <span className="text-[#101014]"> también te lo decimos</span>. A veces lo
          correcto es un SaaS, un freelance, o no hacer nada todavía. La conversación
          inicial es gratuita y honesta — sin presión comercial.
        </p>
        <Link
          href="/#contacto"
          className="group mt-5 inline-flex items-center gap-2 text-sm font-medium text-[#101014] transition-colors hover:text-brand-600"
        >
          <span className="border-b border-[#C9CCD3] transition-colors group-hover:border-brand-600">
            Cuéntanos qué problema tienes
          </span>
          <svg className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden>
            <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </Link>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   MAIN SERVICES SECTION
   ═══════════════════════════════════════════════════════════════════ */
export default function Services() {
  return (
    <section
      id="servicios"
      aria-labelledby="services-title"
      className="scroll-mt-24 bg-white py-16 sm:py-20 md:py-28"
    >
      <Container>
        <SectionHeader />

        <div className="relative">
          {serviceOrder.map((slug, i) => (
            <ServiceRow key={slug} slug={slug} index={i} total={serviceOrder.length} />
          ))}
        </div>

        <HonestClose />
      </Container>
    </section>
  );
}
