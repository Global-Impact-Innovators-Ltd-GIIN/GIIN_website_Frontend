import React from "react";
import { PrismaClient } from "@prisma/client";
import { cookies } from "next/headers";
import { JWTService } from "@/lib/security/jwt";
import { redirect } from "next/navigation";
import { BookOpen, GraduationCap, PlayCircle, Award } from "lucide-react";

const prisma = new PrismaClient();

export default async function StudentDashboard() {
  const cookieStore = await cookies();
  const token = cookieStore.get("next-auth.session-token");
  
  if (!token) redirect("/auth/login");

  const payload = await JWTService.verify(token.value);
  if (!payload || !payload.email) redirect("/auth/login");

  const user = await prisma.user.findUnique({
    where: { email: payload.email as string },
    include: { enrollments: { include: { course: true } } }
  });

  if (!user) redirect("/auth/login");

  const enrollments = user.enrollments;

  return (
    <div className="min-h-screen bg-[#020205] text-slate-200 pt-24 px-6 pb-12">
      <div className="max-w-7xl mx-auto">
        <header className="mb-12 border-b border-white/10 pb-8">
          <h1 className="text-3xl font-bold text-white font-heading">Student Portal</h1>
          <p className="text-slate-400 mt-2">Access your courses, track academic progress, and view certifications.</p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <GraduationCap className="w-5 h-5 text-violet-400" /> Active Enrollments
            </h2>
            {enrollments.length === 0 ? (
              <div className="p-8 border border-white/5 bg-white/5 rounded-2xl text-center backdrop-blur-xl">
                <p className="text-slate-400">You are not enrolled in any courses.</p>
                <button className="mt-4 px-6 py-2 bg-violet-600 hover:bg-violet-500 text-white font-bold rounded-lg transition-colors">
                  Browse Catalog
                </button>
              </div>
            ) : (
              <div className="grid gap-4">
                {enrollments.map(enrollment => (
                  <div key={enrollment.id} className="p-6 border border-white/10 bg-black/40 rounded-2xl backdrop-blur-xl transition-all hover:border-violet-500/30">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-xl font-bold text-white">{enrollment.course.title}</h3>
                        <p className="text-sm text-slate-400 mt-1">{enrollment.course.description}</p>
                      </div>
                    </div>
                    <div className="mt-4">
                      <div className="flex justify-between text-xs text-slate-400 mb-2">
                        <span>Progress</span>
                        <span>{enrollment.progress}%</span>
                      </div>
                      <div className="w-full bg-white/10 rounded-full h-1.5">
                        <div className="bg-violet-500 h-1.5 rounded-full" style={{ width: `${enrollment.progress}%` }}></div>
                      </div>
                    </div>
                    <div className="mt-6 flex justify-end">
                      <button className="px-4 py-2 bg-violet-600 hover:bg-violet-500 text-white text-xs font-bold rounded-lg transition-colors flex items-center gap-2">
                        <PlayCircle className="w-4 h-4" /> Continue Learning
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="space-y-8">
            <div className="p-6 rounded-2xl bg-gradient-to-br from-violet-900/40 to-black border border-violet-500/20">
              <h3 className="font-bold text-white mb-4 flex items-center gap-2"><Award className="w-5 h-5 text-violet-400" /> Blockchain Credentials</h3>
              <p className="text-sm text-slate-300 mb-4">View your completed certifications minted natively on the GIIN ledger.</p>
              <button className="w-full py-2 bg-white/10 hover:bg-white/20 text-white font-bold rounded-lg transition-colors border border-white/10">
                View Certificates
              </button>
            </div>
            
            <div className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl">
              <h3 className="font-bold text-white mb-4 flex items-center gap-2"><BookOpen className="w-5 h-5 text-blue-400" /> Recommended Reading</h3>
              <ul className="space-y-3">
                <li className="text-sm border-b border-white/10 pb-2">
                  <a href="#" className="text-blue-400 hover:underline">The Future of AI in African Agriculture</a>
                  <span className="block text-xs text-slate-500 mt-1">GIIN Research Paper • 2026</span>
                </li>
                <li className="text-sm">
                  <a href="#" className="text-blue-400 hover:underline">Blockchain Scaling Solutions</a>
                  <span className="block text-xs text-slate-500 mt-1">GIIN White Paper • 2026</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
