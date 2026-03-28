# Analisis gratuito (Qubelia Labs)

Autodiagnóstico de 5-8 min con scoring determinista, informe en pantalla y PDF opcional por email.

## Flujo

- UI: `src/app/labs/analisis-gratis/page.tsx` + `AuditWizard.tsx`
- Lógica: `src/lib/labs/audit.ts`
- API: `POST /api/labs/analisis-gratis/submit`
- PDF: `@react-pdf/renderer`

## Qué guarda ahora

1. Inserta el informe completo en `free_audit_submissions`
2. Si el usuario deja email/datos de contacto, crea o actualiza un lead en `leads` para que aparezca en la intranet
3. Envía el PDF por email si `LABS_AUDIT_EMAIL_ENABLED=true`

## Variables de entorno

- `SUPABASE_URL`
- `SUPABASE_SERVICE_ROLE_KEY`
- `LABS_AUDIT_EMAIL_ENABLED`
- `LABS_AUDIT_EMAIL_FROM`
- `RESEND_API_KEY`

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

create policy "no_public_select" on public.free_audit_submissions
  for select
  using (false);
```

## Requisito CRM

La tabla `leads` debe existir en el mismo proyecto Supabase. El submit del análisis gratuito la usa para reflejar el contacto dentro de la intranet con fuente `analisis-gratis`.
