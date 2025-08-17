import type { Metadata } from "next";
import Link from "next/link";
import Container from "@/components/common/Container";
import { postsMeta } from "@/lib/posts";
import { articleJsonLd, breadcrumbJsonLd } from "@/lib/jsonld";
import { canonical, titleTemplate } from "@/lib/seo";

export function generateStaticParams() {
  return postsMeta.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const meta = postsMeta.find((p) => p.slug === params.slug)!;
  const path = `/blog/${meta.slug}`;
  return {
    title: titleTemplate(meta.title),
    description: meta.description,
    alternates: { canonical: canonical(path) },
    openGraph: { title: meta.title, description: meta.description, url: path },
  };
}

export default function PostPage({ params }: { params: { slug: string } }) {
  const meta = postsMeta.find((p) => p.slug === params.slug)!;
  const path = `/blog/${meta.slug}`;

  const crumbs = breadcrumbJsonLd([
    { name: "Inicio", url: canonical("/") },
    { name: "Blog", url: canonical("/blog") },
    { name: meta.title, url: canonical(path) },
  ]);

  const article = articleJsonLd({
    headline: meta.title,
    description: meta.description,
    authorName: meta.author.name,
    url: canonical(path),
    datePublished: meta.date,
  });

  return (
    <main className="py-12 sm:py-16">
      <Container>
        <article className="prose prose-slate max-w-3xl">
          <header>
            <h1 className="!mb-2">{meta.h1}</h1>
            <p className="!mt-0 text-sm text-slate-600">
              {new Date(meta.date).toLocaleDateString("es-ES", { day: "2-digit", month: "long", year: "numeric" })}
              {" · "}<span>Por {meta.author.name}</span>
            </p>
          </header>

          {meta.slug === "presupuesto-diseno-web-sevilla" && <ArticleA2 />}
          {meta.slug === "checklist-landing-conversion" && <ArticleC2 />}
          {meta.slug === "seo-onpage-negocios-locales" && <ArticleD2 />}

          <hr />
          <nav aria-label="Artículos relacionados" className="not-prose mt-6">
            <p className="text-sm font-semibold text-slate-900">También te puede interesar</p>
            <ul className="mt-2 list-disc pl-5 text-slate-700">
              <li><Link className="underline hover:no-underline" href="/servicios/web-corporativa">Servicio: Web corporativa</Link></li>
              <li><Link className="underline hover:no-underline" href="/servicios/landing-pages">Servicio: Landing pages</Link></li>
              <li><Link className="underline hover:no-underline" href="/area/sevilla">Agencia de digitalización en Sevilla</Link></li>
            </ul>
          </nav>
        </article>
      </Container>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(crumbs) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(article) }} />
    </main>
  );
}
function ArticleA2() {
  return (
    <section>
      <p>
        El coste de una web en Sevilla depende del alcance, la complejidad y la calidad del contenido. Aquí tienes una guía honesta para
        que compares opciones sin pagar de más ni de menos.
      </p>
      <h2>Rangos orientativos en Sevilla (2025)</h2>
      <ul>
        <li><strong>One‑page / Landing sencilla:</strong> 800–1.500 €</li>
        <li><strong>Web corporativa básica (5–8 páginas):</strong> 1.500–3.000 €</li>
        <li><strong>Web corporativa avanzada (10+ páginas / blog):</strong> 3.000–6.000 €</li>
        <li><strong>Casos complejos / multidioma / integraciones:</strong> 6.000 € en adelante</li>
      </ul>
      <p className="text-sm text-slate-600">Nota: rangos orientativos para contexto local; el precio final depende del alcance cerrado.</p>
      <h2>Factores que mueven el precio</h2>
      <ul>
        <li>Arquitectura y número de páginas / plantillas</li>
        <li>Calidad del copy y necesidad de redacción completa</li>
        <li>Diseño a medida vs. componentes estándar</li>
        <li>SEO técnico y contenidos optimizados</li>
        <li>Integraciones (CRM, formularios avanzados, multidioma)</li>
        <li>Ilustración/fotografía y creación de assets</li>
      </ul>
      <h2>Qué debe incluir un buen presupuesto</h2>
      <ul>
        <li>Alcance por hitos (qué se entrega y cuándo)</li>
        <li>SEO on-page mínimo viable (Title, Meta, H1‑H3, enlazado interno)</li>
        <li>Accesibilidad (WCAG AA) y rendimiento (Core Web Vitals)</li>
        <li>Analítica (eventos GA4) y propiedad de cuentas/código</li>
        <li>Soporte de arranque y formación breve</li>
      </ul>
      <h2>Cómo ahorrar sin bajar la calidad</h2>
      <ul>
        <li>Comienza con un <strong>mínimo viable</strong> y amplía por fases</li>
        <li>Prioriza páginas de valor (servicios, casos, contacto)</li>
        <li>Usa una <strong>biblioteca de componentes</strong> reutilizables</li>
        <li>Centraliza la toma de decisiones para evitar retrabajo</li>
      </ul>
      <p>
        ¿Tienes un presupuesto en mente? En DigitalShift trabajamos por hitos con precio cerrado y resultados medibles.
      </p>
    </section>
  );
}

function ArticleC2() {
  return (
    <section>
      <p>
        Antes de lanzar una landing, repasa esta lista priorizada. Te ayudará a eliminar fricción y aumentar la conversión desde el día uno.
      </p>
      <h2>Checklist de 15 puntos</h2>
      <ol>
        <li><strong>Propuesta de valor clara en el H1</strong> (qué, para quién y resultado).</li>
        <li><strong>Subtítulo</strong> que elimine la principal duda.</li>
        <li><strong>Bullets</strong> con beneficios, no características.</li>
        <li><strong>CTA primario visible</strong> arriba y persistente.</li>
        <li><strong>Prueba social</strong> (reseñas, logos, casos).</li>
        <li><strong>Objeciones</strong> con respuestas breves (FAQ corta).</li>
        <li><strong>Formulario corto</strong> (3–5 campos máximo).</li>
        <li><strong>Estados de error</strong> claros y accesibles.</li>
        <li><strong>Rendimiento</strong> (LCP optimizado, imágenes next/image).</li>
        <li><strong>Arquitectura</strong> que conduzca al CTA sin distracciones.</li>
        <li><strong>Tracking GA4</strong> (clic CTA, scroll 75%, envío).</li>
        <li><strong>SEO on-page</strong> (Title/Meta, H1‑H3, alt descriptivos).</li>
        <li><strong>Enlazado interno</strong> a servicios relacionados.</li>
        <li><strong>Versión móvil</strong> revisada de verdad (pulgares y espaciado).</li>
        <li><strong>Mensaje final</strong> que refuerce valor y reduzca riesgo.</li>
      </ol>
      <p>Aplica estos puntos y mide. La mejora compuesta viene de pequeñas victorias continuas.</p>
    </section>
  );
}

function ArticleD2() {
  return (
    <section>
      <p>
        El SEO local empieza en tu propia página. Con estas prácticas on‑page prepararás el terreno para posicionar mejor en tu ciudad.
      </p>
      <h2>Title y Meta que invitan al clic</h2>
      <ul>
        <li>Incluye ciudad y servicio (p. ej., «Diseño web en Sevilla»).</li>
        <li>Promesa específica y sin humo (evita vagas generalidades).</li>
      </ul>
      <h2>Jerarquía H1‑H3 y copy claro</h2>
      <ul>
        <li>Un solo H1. H2 por bloque. H3 para detalles.</li>
        <li>Lenguaje natural con sinónimos; evita keyword stuffing.</li>
      </ul>
      <h2>Enlazado interno</h2>
      <ul>
        <li>Desde Home a servicio y a la landing local (Sevilla).</li>
        <li>De cada artículo a su pilar y a contacto.</li>
      </ul>
      <h2>Datos estructurados y NAP</h2>
      <ul>
        <li>`LocalBusiness` en la landing local con NAP consistente.</li>
        <li>`Service`, `FAQPage` y `BreadcrumbList` en servicios.</li>
      </ul>
      <h2>Rendimiento y accesibilidad</h2>
      <ul>
        <li>Optimiza LCP con `next/image` y fuentes con `display=swap`.</li>
        <li>Contraste y foco visible; formularios con labels.</li>
      </ul>
      <h2>Tareas en Search Console</h2>
      <ul>
        <li>Envía sitemap y revisa cobertura.</li>
        <li>Analiza CTR por consultas locales y ajusta Titles/Metas.</li>
      </ul>
      <p>
        Refuerza con un perfil de Google Business bien trabajado y reseñas auténticas.
      </p>
    </section>
  );
}
