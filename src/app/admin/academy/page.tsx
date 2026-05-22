export default function AdminAcademyPage() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-end mb-4">
        <div>
          <h1 className="text-2xl font-bold uppercase tracking-widest text-white">Academy LMS Command</h1>
          <p className="text-sm text-zinc-500">Manage course enrollments and student tracking</p>
        </div>
      </div>
      <div className="bg-[#111] border border-zinc-800 rounded-lg p-16 text-center text-zinc-500">
        Academy Dashboard Module loaded. Waiting for external database connection...
      </div>
    </div>
  );
}
