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
        <section className="border-b border-[#E4E6EA] bg-white pb-14 pt-14 sm:pb-16 sm:pt-20">
          <Container>
            <Breadcrumbs items={breadcrumbs} />

            <div className={`grid gap-10 ${aside ? "lg:grid-cols-[1fr_340px] lg:items-start" : ""}`}>
              <div className="max-w-3xl">
                <p className="section-tag">{eyebrow}</p>

                <h1 className="mt-8 text-h1 text-[#101014]">{title}</h1>

                <p className="mt-6 max-w-2xl text-lg leading-relaxed text-[#3D4046]">
                  {description}
                </p>
              </div>

              {aside ? (
                <div className="rounded-[4px] border border-[#E4E6EA] bg-white p-6">{aside}</div>
              ) : null}
            </div>
          </Container>
        </section>

        <section className="bg-white py-16 sm:py-20">
          <Container>{children}</Container>
        </section>
      </main>
      <Footer />
    </>
  );
}
