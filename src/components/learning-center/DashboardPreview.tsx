"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { 
  LayoutDashboard, 
  BookOpen, 
  Award, 
  TrendingUp, 
  Bell, 
  CheckCircle2, 
  Clock, 
  ArrowRight,
  Flame,
  Bookmark,
  Users,
  ChevronRight
} from "lucide-react";

export function DashboardPreview() {
  const [activeTab, setActiveTab] = useState<"overview" | "courses" | "certificates">("overview");

  return (
    <section className="py-24 bg-[#050816] text-white relative px-6 border-t border-white/5 overflow-hidden">
      {/* Visual background elements */}
      <div className="absolute top-1/2 left-1/4 w-[400px] h-[400px] bg-[#2563EB]/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#2563EB]">
            SaaS Learning Management System (LMS)
          </span>
          <h2 className="text-3xl md:text-5xl font-black font-space-grotesk tracking-tight">
            Learning{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#2563EB] to-[#7C3AED]">
              Dashboard Preview
            </span>
          </h2>
          <p className="text-[#A1A1AA] text-sm md:text-base font-sans font-light max-w-xl mx-auto leading-relaxed">
            Take a look inside the upcoming GIIN LMS. Track milestones, download certifications, submit projects, and network with peers.
          </p>
        </div>

        {/* Dashboard Frame Mockup */}
        <div className="rounded-3xl border border-white/10 bg-[#0A0A12]/95 shadow-2xl overflow-hidden relative">
          
          {/* Top Bar of SaaS mock */}
          <div className="border-b border-white/10 bg-white/5 px-6 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-white/5 border border-white/10">
                <LayoutDashboard className="w-5 h-5 text-[#2563EB]" />
              </div>
              <div className="text-left">
                <div className="text-sm font-bold font-space-grotesk">GIIN Command Learning Center</div>
                <div className="text-[10px] text-[#A1A1AA] font-sans">Ecosystem Console v2.0</div>
              </div>
            </div>

            {/* Quick Profile stats */}
            <div className="flex items-center gap-6 text-left text-xs font-sans">
              <div className="flex items-center gap-2">
                <Flame className="w-4 h-4 text-[#F59E0B]" />
                <div>
                  <span className="text-[#A1A1AA] block text-[9px]">DAILY STREAK</span>
                  <span className="font-bold text-white">8 Days Active</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Award className="w-4 h-4 text-[#7C3AED]" />
                <div>
                  <span className="text-[#A1A1AA] block text-[9px]">CREDITS EARNED</span>
                  <span className="font-bold text-white">45 Credits</span>
                </div>
              </div>
            </div>
          </div>

          {/* Main Dashboard Layout Area */}
          <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[500px]">
            
            {/* Sidebar navigation mock */}
            <div className="lg:col-span-3 border-r border-white/10 p-6 space-y-6 text-left bg-white/2">
              <div className="space-y-1.5">
                <button
                  onClick={() => setActiveTab("overview")}
                  className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    activeTab === "overview"
                      ? "bg-[#2563EB] text-white"
                      : "text-[#A1A1AA] hover:text-white hover:bg-white/5"
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <TrendingUp className="w-4 h-4" />
                    Overview Metrics
                  </span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>

                <button
                  onClick={() => setActiveTab("courses")}
                  className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    activeTab === "courses"
                      ? "bg-[#2563EB] text-white"
                      : "text-[#A1A1AA] hover:text-white hover:bg-white/5"
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <BookOpen className="w-4 h-4" />
                    Active Courses
                  </span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>

                <button
                  onClick={() => setActiveTab("certificates")}
                  className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    activeTab === "certificates"
                      ? "bg-[#2563EB] text-white"
                      : "text-[#A1A1AA] hover:text-white hover:bg-white/5"
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <Award className="w-4 h-4" />
                    My Certificates
                  </span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Learning Goals widget */}
              <div className="pt-6 border-t border-white/5 space-y-4">
                <div className="text-[10px] uppercase font-bold text-[#A1A1AA] tracking-wider font-space-grotesk">
                  Current Learning Goal
                </div>
                <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-3">
                  <div className="flex justify-between text-xs">
                    <span className="font-semibold text-white">Become Systems Architect</span>
                    <span className="text-[#2563EB] font-bold">65%</span>
                  </div>
                  <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-[#2563EB] to-[#7C3AED]" style={{ width: "65%" }} />
                  </div>
                  <div className="text-[10px] text-[#A1A1AA] font-sans">
                    2 courses remaining to complete target profile credentials.
                  </div>
                </div>
              </div>
            </div>

            {/* Main Content Area */}
            <div className="lg:col-span-9 p-8 text-left bg-gradient-to-br from-transparent to-white/2">
              {activeTab === "overview" && (
                <div className="space-y-8">
                  {/* Grid widgets */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="p-5 rounded-2xl bg-white/5 border border-white/10 space-y-3">
                      <div className="flex justify-between items-center">
                        <Clock className="w-5 h-5 text-[#2563EB]" />
                        <span className="text-[10px] text-green-400 bg-green-500/10 px-2 py-0.5 rounded border border-green-500/25">+12% vs last wk</span>
                      </div>
                      <div>
                        <span className="text-xs text-[#A1A1AA] block font-sans">STUDY TIME THIS WEEK</span>
                        <span className="text-2xl font-black font-space-grotesk text-white">8.5 Hours</span>
                      </div>
                    </div>

                    <div className="p-5 rounded-2xl bg-white/5 border border-white/10 space-y-3">
                      <div className="flex justify-between items-center">
                        <Award className="w-5 h-5 text-[#7C3AED]" />
                        <span className="text-[10px] text-[#7C3AED] bg-[#7C3AED]/10 px-2 py-0.5 rounded border border-[#7C3AED]/25">Top 5% Learner</span>
                      </div>
                      <div>
                        <span className="text-xs text-[#A1A1AA] block font-sans">CREDENTIALS CLAIMED</span>
                        <span className="text-2xl font-black font-space-grotesk text-white">3 Verified</span>
                      </div>
                    </div>

                    <div className="p-5 rounded-2xl bg-white/5 border border-white/10 space-y-3">
                      <div className="flex justify-between items-center">
                        <Flame className="w-5 h-5 text-[#F59E0B]" />
                        <span className="text-[10px] text-[#F59E0B] bg-[#F59E0B]/10 px-2 py-0.5 rounded border border-[#F59E0B]/25">Streak Target</span>
                      </div>
                      <div>
                        <span className="text-xs text-[#A1A1AA] block font-sans">WEEKLY STREAK GOAL</span>
                        <span className="text-2xl font-black font-space-grotesk text-white">5 / 7 Days</span>
                      </div>
                    </div>
                  </div>

                  {/* Activity Widgets */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Peer Notifications */}
                    <div className="space-y-4">
                      <div className="text-xs font-bold text-white uppercase tracking-wider font-space-grotesk flex items-center gap-1.5">
                        <Bell className="w-4 h-4 text-[#2563EB]" />
                        Discussion & Community Activity
                      </div>
                      
                      <div className="space-y-3">
                        <div className="p-4 rounded-xl bg-white/5 border border-white/10 flex gap-3 text-xs font-sans">
                          <div className="p-2 rounded bg-white/5 border border-white/10 h-fit text-[#2563EB]">
                            <Users className="w-4 h-4" />
                          </div>
                          <div>
                            <span className="font-bold text-white block">Dr. Kofi Mensah</span>
                            <span className="text-[#A1A1AA] block mt-0.5 font-light">Replied to your question regarding civic governance parameters in Africa.</span>
                            <span className="text-[10px] text-white/40 mt-1 block">2 hours ago</span>
                          </div>
                        </div>

                        <div className="p-4 rounded-xl bg-white/5 border border-white/10 flex gap-3 text-xs font-sans">
                          <div className="p-2 rounded bg-white/5 border border-white/10 h-fit text-[#7C3AED]">
                            <Award className="w-4 h-4" />
                          </div>
                          <div>
                            <span className="font-bold text-white block">System Protocol</span>
                            <span className="text-[#A1A1AA] block mt-0.5 font-light">Your capstone distributed server setup passed core unit regression tests.</span>
                            <span className="text-[10px] text-white/40 mt-1 block">1 day ago</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Progress details */}
                    <div className="space-y-4">
                      <div className="text-xs font-bold text-white uppercase tracking-wider font-space-grotesk flex items-center gap-1.5">
                        <Bookmark className="w-4 h-4 text-[#7C3AED]" />
                        Milestones Roadmap
                      </div>

                      <div className="p-6 rounded-2xl bg-white/5 border border-white/10 space-y-6 text-xs font-sans">
                        <div className="flex justify-between items-center">
                          <div className="flex gap-2.5 items-center">
                            <CheckCircle2 className="w-4.5 h-4.5 text-green-400 shrink-0" />
                            <div>
                              <span className="font-semibold text-white block">Core Logic Sandbox</span>
                              <span className="text-[10px] text-[#A1A1AA] block">Finished on June 18</span>
                            </div>
                          </div>
                          <span className="text-[10px] font-bold text-green-400 px-2 py-0.5 rounded bg-green-500/10">PASSED</span>
                        </div>

                        <div className="flex justify-between items-center">
                          <div className="flex gap-2.5 items-center">
                            <CheckCircle2 className="w-4.5 h-4.5 text-[#2563EB] shrink-0" />
                            <div>
                              <span className="font-semibold text-white block">Node Infrastructure Build</span>
                              <span className="text-[10px] text-[#A1A1AA] block">Active milestone check</span>
                            </div>
                          </div>
                          <span className="text-[10px] font-bold text-[#2563EB] px-2 py-0.5 rounded bg-[#2563EB]/10">IN REVIEW</span>
                        </div>

                        <div className="flex justify-between items-center">
                          <div className="flex gap-2.5 items-center">
                            <Clock className="w-4.5 h-4.5 text-white/20 shrink-0" />
                            <div>
                              <span className="font-semibold text-white/40 block">Decentralized Security Vault</span>
                              <span className="text-[10px] text-[#A1A1AA]/40 block">Locks until Phase 3</span>
                            </div>
                          </div>
                          <span className="text-[10px] font-bold text-white/20 px-2 py-0.5 rounded bg-white/5">LOCKED</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "courses" && (
                <div className="space-y-6">
                  <h3 className="text-lg font-bold font-space-grotesk text-white mb-4">Active Study Programs</h3>
                  
                  <div className="p-6 rounded-2xl bg-white/5 border border-white/10 grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                    <div className="md:col-span-8 text-left space-y-2">
                      <span className="text-[9px] uppercase font-bold tracking-wider text-[#2563EB] bg-[#2563EB]/5 px-2 py-0.5 rounded border border-[#2563EB]/15">TECHNOLOGY PATH</span>
                      <h4 className="text-base font-bold font-space-grotesk text-white">Distributed Applications & Microservices</h4>
                      <p className="text-xs text-[#A1A1AA] font-sans font-light">Next Lesson: Orchestrating ingress rules with Kubernetes routing proxies.</p>
                      <div className="flex gap-4 items-center pt-2">
                        <div className="w-40 h-1.5 bg-white/5 rounded-full overflow-hidden">
                          <div className="h-full bg-[#2563EB]" style={{ width: "45%" }} />
                        </div>
                        <span className="text-xs text-white/80 font-sans">45% Complete</span>
                      </div>
                    </div>
                    <div className="md:col-span-4 flex justify-end">
                      <button className="px-5 py-3 bg-[#2563EB] hover:bg-[#2563EB]/90 text-white rounded-xl text-xs font-bold font-sans transition-all active:scale-95 cursor-pointer flex items-center gap-1.5">
                        <span>Resume Lessons</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  <div className="p-6 rounded-2xl bg-white/5 border border-white/10 grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                    <div className="md:col-span-8 text-left space-y-2">
                      <span className="text-[9px] uppercase font-bold tracking-wider text-[#7C3AED] bg-[#7C3AED]/5 px-2 py-0.5 rounded border border-[#7C3AED]/15">LEADERSHIP PATH</span>
                      <h4 className="text-base font-bold font-space-grotesk text-white">Organizational Orchestration & Scaling</h4>
                      <p className="text-xs text-[#A1A1AA] font-sans font-light">Next Lesson: Diagnostics diagnostic grids for African regional trade parameters.</p>
                      <div className="flex gap-4 items-center pt-2">
                        <div className="w-40 h-1.5 bg-white/5 rounded-full overflow-hidden">
                          <div className="h-full bg-[#7C3AED]" style={{ width: "80%" }} />
                        </div>
                        <span className="text-xs text-white/80 font-sans">80% Complete</span>
                      </div>
                    </div>
                    <div className="md:col-span-4 flex justify-end">
                      <button className="px-5 py-3 bg-[#7C3AED] hover:bg-[#7C3AED]/90 text-white rounded-xl text-xs font-bold font-sans transition-all active:scale-95 cursor-pointer flex items-center gap-1.5">
                        <span>Resume Lessons</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "certificates" && (
                <div className="space-y-6">
                  <h3 className="text-lg font-bold font-space-grotesk text-white mb-4">Vetted Digital Credentials</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="p-6 rounded-2xl bg-white/5 border border-white/10 text-left space-y-4">
                      <div className="flex justify-between items-start">
                        <div className="p-2.5 rounded-xl bg-white/5 border border-white/10 text-white">
                          <Award className="w-5 h-5 text-green-400" />
                        </div>
                        <span className="text-[9px] uppercase font-bold text-green-400 bg-green-500/10 px-2 py-0.5 rounded border border-green-500/25">VETTED</span>
                      </div>
                      <div>
                        <h4 className="text-sm font-bold font-space-grotesk text-white">Linux Command Line & Sovereign Networks</h4>
                        <span className="text-[10px] text-[#A1A1AA] block mt-0.5">ID: GIIN-CERT-9921 • Issued June 12</span>
                      </div>
                      <button className="text-xs text-[#2563EB] hover:underline font-bold font-sans cursor-pointer flex items-center gap-1">
                        <span>Download Certificate PDF</span>
                        <ArrowRight className="w-3 h-3" />
                      </button>
                    </div>

                    <div className="p-6 rounded-2xl bg-white/5 border border-white/10 text-left space-y-4">
                      <div className="flex justify-between items-start">
                        <div className="p-2.5 rounded-xl bg-white/5 border border-white/10 text-white">
                          <Award className="w-5 h-5 text-green-400" />
                        </div>
                        <span className="text-[9px] uppercase font-bold text-green-400 bg-green-500/10 px-2 py-0.5 rounded border border-green-500/25">VETTED</span>
                      </div>
                      <div>
                        <h4 className="text-sm font-bold font-space-grotesk text-white">Foundations of Civic Leadership</h4>
                        <span className="text-[10px] text-[#A1A1AA] block mt-0.5">ID: GIIN-CERT-8843 • Issued May 28</span>
                      </div>
                      <button className="text-xs text-[#2563EB] hover:underline font-bold font-sans cursor-pointer flex items-center gap-1">
                        <span>Download Certificate PDF</span>
                        <ArrowRight className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
