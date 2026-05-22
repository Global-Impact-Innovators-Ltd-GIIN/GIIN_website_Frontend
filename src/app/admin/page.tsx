import { AdminMetricsGrid } from "@/components/organisms/admin/AdminMetricsGrid";
import { ChartVisualizer } from "@/components/organisms/admin/ChartVisualizer";
import { adminGlobalMetrics } from "@/data/admin";

export default function SuperAdminPage() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-end mb-4">
        <div>
          <h1 className="text-2xl font-bold uppercase tracking-widest text-white">Global Command Center</h1>
          <p className="text-sm text-zinc-500">Super Admin Overview</p>
        </div>
      </div>

      <AdminMetricsGrid metrics={adminGlobalMetrics} />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <ChartVisualizer title="Platform Traffic (YTD)" type="line" />
        <ChartVisualizer title="Revenue Growth" type="bar" />
      </div>
    </div>
  );
}
