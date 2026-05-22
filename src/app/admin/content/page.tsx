import { AdminDataTable } from "@/components/organisms/admin/AdminDataTable";
import { adminContentData } from "@/data/admin";

export default function AdminContentPage() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-end mb-4">
        <div>
          <h1 className="text-2xl font-bold uppercase tracking-widest text-white">Content CMS</h1>
          <p className="text-sm text-zinc-500">Manage blog posts, research papers, and leadership articles</p>
        </div>
      </div>

      <AdminDataTable 
        title="Content Repository" 
        columns={["Post ID", "Title", "Type", "Author", "Status", "Views"]}
        data={adminContentData}
      />
    </div>
  );
}
