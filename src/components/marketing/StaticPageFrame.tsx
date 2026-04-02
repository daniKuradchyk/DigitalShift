import type { ReactNode } from "react";
import Container from "@/components/common/Container";
import Breadcrumbs, { type BreadcrumbItem } from "@/components/marketing/Breadcrumbs";
import Footer from "@/components/sections/Footer";
import Header from "@/components/sections/Header";

type Props = {
  breadcrumbs: BreadcrumbItem[];
  eyebrow: string;
  title: string;
  description: string;
  children: ReactNode;
  aside?: ReactNode;
};

export default function StaticPageFrame({ breadcrumbs, eyebrow, title, description, children, aside }: Props) {
  return (
    <>
      <Header />
      <main id="contenido">
        <section className="pb-12 pt-16 sm:pb-16 sm:pt-20">
          <Container>
            <Breadcrumbs items={breadcrumbs} />

            <div className="surface-shell relative overflow-hidden rounded-[2rem] p-6 sm:p-8 lg:p-10">
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(167,139,250,0.08),transparent_30%),radial-gradient(circle_at_bottom_right,rgba(192,132,252,0.06),transparent_34%)]"
              />

              <div className={`relative grid gap-8 ${aside ? "lg:grid-cols-[1fr_320px] lg:items-end" : ""}`}>
                <div className="max-w-4xl">
                  <div className="section-tag mb-5">
                    <span className="h-1.5 w-1.5 rounded-full bg-violet-400" aria-hidden />
                    {eyebrow}
                  </div>
                  <h1 className="text-4xl font-black tracking-[-0.03em] sm:text-5xl" style={{ color: "var(--text-primary)" }}>
                    {title}
                  </h1>
                  <p className="mt-5 max-w-3xl text-lg leading-relaxed" style={{ color: "var(--text-muted)" }}>
                    {description}
                  </p>
                </div>

                {aside ? <div className="surface-panel rounded-3xl p-6">{aside}</div> : null}
              </div>
            </div>
          </Container>
        </section>

        <section className="pb-20">
          <Container>{children}</Container>
        </section>
      </main>
      <Footer />
    </>
  );
}
