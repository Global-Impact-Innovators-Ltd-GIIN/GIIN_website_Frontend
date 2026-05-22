import { ChartVisualizer } from "@/components/organisms/admin/ChartVisualizer";

export default function AdminFinancePage() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-end mb-4">
        <div>
          <h1 className="text-2xl font-bold uppercase tracking-widest text-white">Finance & Invoicing</h1>
          <p className="text-sm text-zinc-500">Enterprise billing and global revenue tracking</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <ChartVisualizer title="Q2 Revenue Projection" type="line" />
        <ChartVisualizer title="Outstanding Invoices" type="bar" />
      </div>
    </div>
  );
}
