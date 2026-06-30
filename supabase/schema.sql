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
