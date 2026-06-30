import { AppShell } from "@/components/app-shell";
import { MetricCard } from "@/components/metric-card";
import { StatusChecker } from "@/components/status-checker";
import { fallbackServices, type Service } from "@/lib/demo-data";
import { getSupabaseClient } from "@/lib/supabase";

async function loadServices(): Promise<Service[]> {
  const supabase = getSupabaseClient();

  if (!supabase) {
    return fallbackServices;
  }

  const { data, error } = await supabase
    .from("services")
    .select("id, name, url, owner, sla_target, current_status, latency_ms, checked_at")
    .order("checked_at", { ascending: false })
    .limit(6);

  if (error || !data || data.length === 0) {
    return fallbackServices;
  }

  return data.map((service) => ({
    id: service.id,
    name: service.name,
    url: service.url,
    owner: service.owner,
    slaTarget: service.sla_target,
    currentStatus: service.current_status,
    latencyMs: service.latency_ms,
    checkedAt: new Date(service.checked_at).toLocaleString("pt-BR", {
      dateStyle: "short",
      timeStyle: "short",
    }),
  })) as Service[];
}

export default async function Page() {
  const services = await loadServices();
  const operational = services.filter((service) => service.currentStatus === "operational").length;
  const degraded = services.filter((service) => service.currentStatus === "degraded").length;
  const down = services.filter((service) => service.currentStatus === "down").length;
  const avgLatency = Math.round(
    services.reduce((total, service) => total + service.latencyMs, 0) / services.length,
  );

  return (
    <AppShell
      project="Status Monitor"
      title="Observabilidade sem dashboard exagerado"
      subtitle="Uma base simples para validar endpoints, latencia e status operacional."
      badge="MVP para monitoramento"
      navigation={[
        { label: "Servicos", hint: "Endpoints monitorados" },
        { label: "Checks", hint: "Verificacao manual via API route" },
        { label: "SLA", hint: "Risco e responsavel" },
      ]}
    >
      <section className="metrics">
        <MetricCard label="Operacionais" value={String(operational)} helper="Sem alerta no momento" tone="success" />
        <MetricCard label="Degradados" value={String(degraded)} helper="Latencia acima do ideal" tone="warning" />
        <MetricCard label="Fora do ar" value={String(down)} helper="Prioridade imediata" tone="danger" />
        <MetricCard label="Latencia media" value={avgLatency + " ms"} helper="Referencia atual" />
      </section>

      <section className="grid grid-2">
        <StatusChecker services={services} />

        <article className="panel">
          <div className="panel-header">
            <div>
              <p className="eyebrow">Incidentes</p>
              <h2>Como apresentar esse projeto</h2>
            </div>
          </div>
          <ul className="list">
            <li>
              <strong>Monitoramento simples</strong>
              <span>Mostra que voce pensa em confiabilidade e nao so em CRUD.</span>
            </li>
            <li>
              <strong>API route util</strong>
              <span>O projeto tem uma checagem real no backend para nao depender de CORS no browser.</span>
            </li>
            <li>
              <strong>Pronto para evoluir</strong>
              <span>Da para encaixar cron, logs ou notificacoes depois sem refazer a base.</span>
            </li>
          </ul>
        </article>
      </section>
    </AppShell>
  );
}
