import { AdminMetricsGrid } from "@/components/organisms/admin/AdminMetricsGrid";
import { adminSecurityMetrics } from "@/data/admin";

export default function AdminSecurityPage() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-end mb-4">
        <div>
          <h1 className="text-2xl font-bold uppercase tracking-widest text-white">Cybersecurity Command</h1>
          <p className="text-sm text-zinc-500">Live threat monitoring and system integrity</p>
        </div>
      </div>

      <AdminMetricsGrid metrics={adminSecurityMetrics} />

      <div className="bg-[#111] border border-zinc-800 rounded-lg p-6 h-96 flex items-center justify-center relative overflow-hidden">
        {/* Mock Threat Map Visual */}
        <div className="absolute inset-0 opacity-20 bg-[url('https://upload.wikimedia.org/wikipedia/commons/8/80/World_map_-_low_resolution.svg')] bg-no-repeat bg-center bg-contain" />
        <div className="absolute top-1/3 left-1/4 w-3 h-3 bg-red-500 rounded-full animate-ping" />
        <div className="absolute top-1/2 left-2/3 w-3 h-3 bg-red-500 rounded-full animate-ping" />
        <div className="z-10 text-center">
          <h3 className="text-red-500 font-bold uppercase tracking-widest text-xl mb-2">Live Threat Map</h3>
          <p className="text-zinc-500 text-sm">Monitoring global connection attempts...</p>
        </div>
      </div>
    </div>
  );
}
