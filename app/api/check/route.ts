import { NextResponse } from "next/server";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const { url } = (await request.json()) as { url?: string };

  if (!url) {
    return NextResponse.json(
      {
        status: "down",
        latencyMs: 0,
        code: null,
        checkedAt: new Date().toLocaleString("pt-BR"),
      },
      { status: 400 },
    );
  }

  const startedAt = Date.now();
  const timeoutMs = Number(process.env.MONITOR_TIMEOUT_MS ?? 4000);

  try {
    const response = await fetch(url, {
      cache: "no-store",
      signal: AbortSignal.timeout(timeoutMs),
    });
    const latencyMs = Date.now() - startedAt;
    const status = response.ok ? (latencyMs > 500 ? "degraded" : "operational") : "down";

    return NextResponse.json({
      status,
      latencyMs,
      code: response.status,
      checkedAt: new Date().toLocaleString("pt-BR"),
    });
  } catch {
    return NextResponse.json({
      status: "down",
      latencyMs: 0,
      code: null,
      checkedAt: new Date().toLocaleString("pt-BR"),
    });
  }
}
