import Container from "@/components/common/Container";
import { homeStats } from "@/content/proof";

/**
 * Banda de métricas bajo el hero. Server Component — reveal por CSS.
 */
export default function StatsBand() {
  return (
    <section aria-label="Datos operativos de Qubelia" className="border-y border-[#E4E6EA] bg-[#F5F6F8]">
      <Container>
        <div className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-[#E4E6EA]">
          {homeStats.map((stat, i) => (
            <div
              key={stat.label}
              className="px-5 sm:px-8 py-8 sm:py-10 animate-fade-up first:pl-0"
              style={{ animationDelay: `${i * 80}ms` }}
            >
              <div className="text-3xl sm:text-4xl font-semibold tracking-tight text-[#101014]">
                {stat.value}
              </div>
              <div className="mt-2 text-sm font-medium text-[#101014]">{stat.label}</div>
              <div className="mt-1 text-xs leading-relaxed text-[#63666D]">{stat.detail}</div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
