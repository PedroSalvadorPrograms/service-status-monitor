# Monitor de Status de Servicos

Painel de status para verificar disponibilidade de endpoints, historico de resposta e prioridade de incidentes.

## Stack

- Next.js
- TypeScript
- Supabase
- CSS
- GitHub Actions

## Entregas do MVP

- Checagem manual via API route
- Dashboard de status operacional
- Cards de latencia e SLA
- Workflow de CI pronto para GitHub

## Rodar localmente

```bash
npm install
cp .env.example .env.local
npm run dev
```

Se voce nao preencher as chaves do Supabase, o app sobe com dados de demonstracao.

## Variaveis de ambiente

```env
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
MONITOR_TIMEOUT_MS=4000
```

## Schema base

```sql
create table if not exists services (
  id text primary key,
  name text not null,
  url text not null,
  owner text not null,
  sla_target text not null,
  current_status text not null check (current_status in ('operational', 'degraded', 'down')),
  latency_ms integer not null default 0,
  checked_at timestamptz not null default now()
);
```

