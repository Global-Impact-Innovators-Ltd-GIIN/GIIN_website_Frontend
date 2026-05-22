export function AdminDataTable({ 
  title, 
  columns, 
  data 
}: { 
  title: string, 
  columns: string[], 
  data: Record<string, unknown>[]
}) {
  return (
    <div className="bg-[#111] border border-zinc-800 rounded-lg overflow-hidden">
      <div className="p-4 border-b border-zinc-800 flex justify-between items-center bg-[#151515]">
        <h2 className="text-white font-bold text-sm tracking-widest uppercase">{title}</h2>
        <div className="flex gap-2">
          <button className="text-xs bg-zinc-800 hover:bg-zinc-700 text-white px-3 py-1 rounded transition-colors">Filter</button>
          <button className="text-xs bg-red-600 hover:bg-red-500 text-white px-3 py-1 rounded transition-colors">Export CSV</button>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse text-sm">
          <thead>
            <tr className="border-b border-zinc-800 bg-[#0a0a0a]">
              {columns.map((col, i) => (
                <th key={i} className="p-3 text-zinc-500 font-bold tracking-wider">{col}</th>
              ))}
              <th className="p-3 text-right text-zinc-500 font-bold tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody>
            {data.map((row, i) => (
              <tr key={i} className="border-b border-zinc-800/50 hover:bg-zinc-900/50 transition-colors">
                {columns.map((col, j) => {
                  const key = Object.keys(row)[j];
                  const value = String(row[key] ?? "");
                  return (
                    <td key={j} className="p-3 text-zinc-300">
                      {value}
                    </td>
                  );
                })}
                <td className="p-3 text-right">
                  <button className="text-zinc-500 hover:text-white transition-colors">Edit</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
