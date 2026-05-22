export function AdminMetricsGrid({ metrics }: { metrics: {label: string, value: string, trend: string, color: string}[] }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      {metrics.map((metric, i) => (
        <div key={i} className="bg-[#111] border border-zinc-800 p-4 rounded-lg flex flex-col justify-between">
          <span className="text-xs text-zinc-500 uppercase tracking-widest font-bold mb-2">{metric.label}</span>
          <div className="flex items-end justify-between">
            <span className={`text-2xl font-bold ${metric.color}`}>{metric.value}</span>
            <span className="text-xs text-zinc-400 bg-zinc-900 px-2 py-1 rounded">{metric.trend}</span>
          </div>
        </div>
      ))}
    </div>
  );
}
