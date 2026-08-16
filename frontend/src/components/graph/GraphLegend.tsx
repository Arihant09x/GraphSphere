const legend = [
  { key: "developer", label: "Developer", color: "bg-cyan-400" },
  { key: "project", label: "Project", color: "bg-indigo-400" },
  { key: "technology", label: "Technology", color: "bg-emerald-400" },
];

export function GraphLegend() {
  return (
    <div className="rounded-xl border border-white/10 bg-slate-950/80 p-3 backdrop-blur-md">
      <p className="mb-2 text-[10px] font-bold uppercase tracking-widest text-slate-500">
        Legend
      </p>
      <div className="space-y-2">
        {legend.map((item) => (
          <div
            key={item.key}
            className="flex items-center gap-2 text-xs text-slate-300"
          >
            <span className={`h-2.5 w-2.5 rounded-full ${item.color}`} />
            <span>{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
