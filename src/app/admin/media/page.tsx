export default function AdminMediaPage() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-end mb-4">
        <div>
          <h1 className="text-2xl font-bold uppercase tracking-widest text-white">Media Studio Admin</h1>
          <p className="text-sm text-zinc-500">Manage live streams, video assets, and global CDN</p>
        </div>
      </div>
      <div className="bg-[#111] border border-zinc-800 rounded-lg p-16 text-center text-zinc-500">
        Media Studio Dashboard Module loaded. Connecting to streaming server...
      </div>
    </div>
  );
}
