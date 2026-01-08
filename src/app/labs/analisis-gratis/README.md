# Analisis gratuito (Qubelia Labs)

Feature: autodiagnostico en 5-8 min con scoring deterministico, informe en pantalla y PDF descargable.

## Flujo
- UI: `src/app/labs/analisis-gratis/page.tsx` + `AuditWizard.tsx`.
- Logica de scoring: `src/lib/labs/audit.ts`.
- API: `POST /api/labs/analisis-gratis/submit` (valida, calcula, guarda, envia email si aplica).
- PDF: generado con `@react-pdf/renderer`, sin necesidad de email.

## Variables de entorno
- `SUPABASE_URL`
- `SUPABASE_SERVICE_ROLE_KEY`
- `LABS_AUDIT_EMAIL_ENABLED` (true/false)
- `LABS_AUDIT_EMAIL_FROM` (opcional, fallback a `CONTACT_FROM`)
- `RESEND_API_KEY` (solo si envias email)

## SQL (Supabase)
```sql
create table if not exists public.free_audit_submissions (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz default now(),
  vertical text not null,
  goal text not null,
  answers jsonb not null,
  scores jsonb not null,
  report jsonb not null,
  company_name text,
  contact_name text,
  email text,
  website text,
  phone text,
  consent boolean default false,
  source text default 'labs',
  user_agent text
);

alter table public.free_audit_submissions enable row level security;

-- Bloquea lectura publica (service role bypass).
create policy "no_public_select" on public.free_audit_submissions
  for select
  using (false);
```

## Email (opcional)
Activa `LABS_AUDIT_EMAIL_ENABLED=true` y configura `RESEND_API_KEY` + `LABS_AUDIT_EMAIL_FROM`.
Si el usuario deja email y acepta privacidad, se envia el PDF adjunto.
