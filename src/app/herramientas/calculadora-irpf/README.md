# Feedback calculadora IRPF

Feature: formulario de feedback publico para reportar errores de calculo o datos en la calculadora IRPF.

## API
- `POST /api/labs/irpf-feedback`
- Valida con Zod y guarda en Supabase usando service role.

## Variables de entorno
- `SUPABASE_URL`
- `SUPABASE_SERVICE_ROLE_KEY`

## SQL (Supabase)
```sql
create table if not exists public.irpf_feedback (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz default now(),
  category text not null,
  step text,
  details text not null,
  name text,
  email text,
  consent boolean default false,
  page text,
  source text default 'labs',
  user_agent text
);

alter table public.irpf_feedback enable row level security;

create policy "no_public_select" on public.irpf_feedback
  for select
  using (false);
```
