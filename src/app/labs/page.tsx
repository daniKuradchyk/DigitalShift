import Container from "@/components/common/Container";
import labs from "@/content/labs.json";

export const revalidate = 86400;

export default function LabsPage() {
  return (
    <main className="py-12 sm:py-16">
      <Container>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Qubelia Labs · Productos gratuitos</h1>
        <p className="mt-3 text-slate-700 max-w-2xl">
          Herramientas y plantillas útiles para pymes y emprendedores. Gratis, sin registro. Si quieres adaptar cualquiera a tu empresa, <a className="underline" href="#contacto">contáctanos</a>.
        </p>

        <ul className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {labs.map((t) => (
            <li key={t.slug} className="rounded-2xl border border-slate-200 p-6 shadow-card bg-white">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold">{t.title}</h2>
                <span className="rounded-full bg-emerald-50 text-emerald-700 text-xs px-2 py-1 border border-emerald-200">
                  {t.status}
                </span>
              </div>
              <p className="mt-2 text-slate-700">{t.desc}</p>
              <div className="mt-4 flex gap-2 flex-wrap">
                {t.tags?.map((tag) => (
                  <span key={tag} className="text-xs rounded-full border border-slate-200 px-2 py-0.5 text-slate-600">
                    #{tag}
                  </span>
                ))}
              </div>
              <div className="mt-5 flex gap-3">
                <a
                  className="inline-flex items-center rounded-xl bg-slate-900 px-4 py-2 text-white hover:bg-slate-800"
                  href={`/labs/${t.slug}`}
                >
                  {t.cta}
                </a>
                <a className="text-sm text-slate-700 hover:text-slate-900" href="#contacto">
                  Quiero adaptar esto a mi empresa
                </a>
              </div>
            </li>
          ))}
        </ul>
      </Container>
    </main>
  );
}
