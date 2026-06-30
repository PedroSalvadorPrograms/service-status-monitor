"use client";

import { useState, useTransition } from "react";

import type { Service } from "@/lib/demo-data";

type CheckResult = {
  status: "operational" | "degraded" | "down";
  latencyMs: number;
  code: number | null;
  checkedAt: string;
};

export function StatusChecker({ services }: { services: Service[] }) {
  const [results, setResults] = useState<Record<string, CheckResult>>({});
  const [pendingId, startTransition] = useTransition();

  function getBadge(status: CheckResult["status"] | Service["currentStatus"]) {
    if (status === "operational") return "badge badge-ok";
    if (status === "degraded") return "badge badge-warning";
    return "badge badge-danger";
  }

  function runCheck(service: Service) {
    startTransition(async () => {
      const response = await fetch("/api/check", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ url: service.url }),
      });

      const result = (await response.json()) as CheckResult;
      setResults((current) => ({
        ...current,
        [service.id]: result,
      }));
    });
  }

  return (
    <article className="panel">
      <div className="panel-header">
        <div>
          <p className="eyebrow">Checagem manual</p>
          <h2>Status dos endpoints</h2>
        </div>
      </div>
      <div className="stack compact">
        {services.map((service) => {
          const result = results[service.id];
          const effectiveStatus = result?.status ?? service.currentStatus;
          const effectiveLatency = result?.latencyMs ?? service.latencyMs;
          const effectiveCheckedAt = result?.checkedAt ?? service.checkedAt;

          return (
            <div className="list-card" key={service.id}>
              <div className="row-between">
                <strong>{service.name}</strong>
                <span className={getBadge(effectiveStatus)}>{effectiveStatus}</span>
              </div>
              <p>{service.url}</p>
              <p className="muted">{service.owner} | SLA {service.slaTarget}</p>
              <p className="muted">Latencia: {effectiveLatency} ms | Ultima checagem: {effectiveCheckedAt}</p>
              <div className="row-actions">
                <button className="primary-button" onClick={() => runCheck(service)} type="button">
                  {pendingId ? "Checando..." : "Rodar check"}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </article>
  );
}
