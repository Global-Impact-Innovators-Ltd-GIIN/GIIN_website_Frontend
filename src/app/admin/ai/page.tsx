import { ChartVisualizer } from "@/components/organisms/admin/ChartVisualizer";

export default function AdminAIPage() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-end mb-4">
        <div>
          <h1 className="text-2xl font-bold uppercase tracking-widest text-white">AI Neural Command</h1>
          <p className="text-sm text-zinc-500">Monitor multi-agent ecosystem and token consumption</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <ChartVisualizer title="Daily Token Consumption" type="bar" />
        <ChartVisualizer title="Agent Request Latency (ms)" type="line" />
      </div>
    </div>
  );
}
