export function GraphEdge({
  from,
  to,
  label,
}: {
  from: string;
  to: string;
  label?: string;
}) {
  return (
    <div className="flex items-center gap-2 text-xs text-slate-400">
      <span>{from}</span>
      {label ? <span className="text-cyan-300">{label}</span> : null}
      <span>{to}</span>
    </div>
  );
}
