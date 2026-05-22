import React from "react";
import { Shield, BookOpen, Users, GraduationCap } from "lucide-react";

export default function LeadershipAdminDashboard() {
  return (
    <div className="p-8 w-full max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Leadership Institute</h1>
          <p className="text-slate-400 text-sm">Central command for Academy Programs, Certifications, and AI Analytics.</p>
        </div>
        <button className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg font-medium shadow-sm transition-colors">
          Create New Program
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        {[
          { label: "Active Programs", value: "24", icon: BookOpen },
          { label: "Enrolled Leaders", value: "1,204", icon: Users },
          { label: "Pending Certificates", value: "89", icon: GraduationCap },
          { label: "AI Interactions", value: "12.4k", icon: Shield },
        ].map((stat, i) => (
          <div key={i} className="bg-[#111115] border border-slate-800 rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <stat.icon className="w-5 h-5 text-indigo-400" />
            </div>
            <div className="text-3xl font-bold text-white mb-1">{stat.value}</div>
            <div className="text-sm text-slate-400">{stat.label}</div>
          </div>
        ))}
      </div>

      <div className="bg-[#111115] border border-slate-800 rounded-xl overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-800 bg-[#16161a]">
          <h2 className="font-semibold text-white">Recent Program Enrollments</h2>
        </div>
        <div className="p-6 overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="text-slate-400 text-sm border-b border-slate-800">
                <th className="pb-3 font-medium">Participant</th>
                <th className="pb-3 font-medium">Program</th>
                <th className="pb-3 font-medium">Status</th>
                <th className="pb-3 font-medium">Date</th>
              </tr>
            </thead>
            <tbody>
              {/* Production: Render Prisma Enrollment records here */}
              <tr className="border-b border-slate-800/50">
                <td className="py-4 text-white">Nkechi Amadi</td>
                <td className="py-4 text-slate-300">Executive Tech Leadership</td>
                <td className="py-4"><span className="px-2 py-1 bg-green-500/10 text-green-400 text-xs rounded-full border border-green-500/20">Active</span></td>
                <td className="py-4 text-slate-400 text-sm">Today, 09:41 AM</td>
              </tr>
              <tr>
                <td className="py-4 text-white">Kofi Mensah</td>
                <td className="py-4 text-slate-300">Strategic AI implementation</td>
                <td className="py-4"><span className="px-2 py-1 bg-indigo-500/10 text-indigo-400 text-xs rounded-full border border-indigo-500/20">Pending Verify</span></td>
                <td className="py-4 text-slate-400 text-sm">Yesterday, 14:30 PM</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
