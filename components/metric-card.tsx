type MetricCardProps = {
  label: string;
  value: string;
  helper: string;
  tone?: "default" | "warning" | "danger" | "success";
};

export function MetricCard({ label, value, helper, tone = "default" }: MetricCardProps) {
  return (
    <article className="metric-card" data-tone={tone}>
      <strong>{label}</strong>
      <span>{value}</span>
      <p>{helper}</p>
    </article>
  );
}
