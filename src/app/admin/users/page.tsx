import { AdminDataTable } from "@/components/organisms/admin/AdminDataTable";
import { adminUserData } from "@/data/admin";

export default function AdminUsersPage() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-end mb-4">
        <div>
          <h1 className="text-2xl font-bold uppercase tracking-widest text-white">Users & Roles</h1>
          <p className="text-sm text-zinc-500">Manage internal staff permissions and enterprise client accounts</p>
        </div>
      </div>

      <AdminDataTable 
        title="Active Staff Directory" 
        columns={["User ID", "Name", "Role", "Department", "Last Active", "Status"]}
        data={adminUserData}
      />
    </div>
  );
}
