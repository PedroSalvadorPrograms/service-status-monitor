export type Service = {
  id: string;
  name: string;
  url: string;
  owner: string;
  slaTarget: string;
  currentStatus: "operational" | "degraded" | "down";
  latencyMs: number;
  checkedAt: string;
};

export const fallbackServices: Service[] = [
  {
    id: "svc-auth",
    name: "Portal de autenticacao",
    url: "https://example.com",
    owner: "Plataforma",
    slaTarget: "99.9%",
    currentStatus: "operational",
    latencyMs: 180,
    checkedAt: "Hoje, 09:20",
  },
  {
    id: "svc-camera",
    name: "API de monitoramento",
    url: "https://example.org",
    owner: "IoT",
    slaTarget: "99.5%",
    currentStatus: "degraded",
    latencyMs: 680,
    checkedAt: "Hoje, 09:18",
  },
  {
    id: "svc-remote",
    name: "Acesso remoto",
    url: "https://example.net",
    owner: "Redes",
    slaTarget: "99.0%",
    currentStatus: "down",
    latencyMs: 0,
    checkedAt: "Hoje, 09:11",
  },
];
