"use client";

import React from "react";
import { motion } from "framer-motion";
import { Users2, Calendar, Radio, ArrowRight, MessageSquare, Globe, Heart } from "lucide-react";

interface CommunityStat {
  value: string;
  label: string;
}

interface CommunityActivity {
  type: "webinar" | "masterclass" | "hackathon";
  title: string;
  host: string;
  date: string;
  time: string;
  badge: string;
}

const stats: CommunityStat[] = [
  { value: "48", label: "Active Regional Chapters" },
  { value: "24k+", label: "Discussion Board Threads" },
  { value: "1,200+", label: "Verified Peer Mentors" },
  { value: "350+", label: "Monthly Live Webinars" },
];

const activities: CommunityActivity[] = [
  {
    type: "masterclass",
    title: "Sovereign Mesh Network Architectures in East Africa",
    host: "Jean-Pierre Diallo",
    date: "June 28, 2026",
    time: "15:00 UTC",
    badge: "Masterclass",
  },
  {
    type: "webinar",
    title: "Venture Deal Structuring & Board Room Tactics",
    host: "Tunde Folawiyo",
    date: "July 02, 2026",
    time: "14:00 UTC",
    badge: "Live Webinar",
  },
  {
    type: "hackathon",
    title: "Sovereign AI Translation Sprint",
    host: "GIIN Labs Division",
    date: "July 15-17, 2026",
    time: "48 Hour Sprint",
    badge: "Hackathon",
  },
];

export function LearningCommunity() {
  return (
    <section className="py-24 bg-[#050816] text-white relative px-6 border-t border-white/5">
      <div className="max-w-7xl mx-auto">
        
        {/* Main Header split layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-end mb-16">
          <div className="lg:col-span-7 text-left space-y-4">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#2563EB] block">
              Collaborative Network
            </span>
            <h2 className="text-3xl md:text-5xl font-black font-space-grotesk tracking-tight leading-tight">
              Join Our Global <br />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#2563EB] to-[#7C3AED]">
                Learning Community
              </span>
            </h2>
            <p className="text-[#A1A1AA] text-sm md:text-base font-sans font-light leading-relaxed max-w-xl">
              Learning is not a solo journey. GIIN connects you with regional discussion circles, expert mentorship networks, and active communities of practice.
            </p>
          </div>

          {/* Interactive grid statistics */}
          <div className="lg:col-span-5 grid grid-cols-2 gap-4">
            {stats.map((s, idx) => (
              <div key={idx} className="p-5 rounded-2xl bg-white/5 border border-white/10 text-left">
                <div className="text-2xl font-black font-space-grotesk text-[#2563EB]">
                  {s.value}
                </div>
                <div className="text-[10px] uppercase font-bold text-[#A1A1AA] mt-1 font-sans">
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Live Events & Boards Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left panel: Discussion Group descriptions */}
          <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-6 text-left">
            <div className="p-6 rounded-3xl border border-white/5 bg-[#0A0A12]/90 space-y-4">
              <div className="p-3 rounded-xl bg-[#2563EB]/15 text-[#2563EB] border border-[#2563EB]/25 inline-flex">
                <MessageSquare className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold font-space-grotesk">Discussion Circles</h3>
              <p className="text-xs text-[#A1A1AA] font-sans font-light leading-relaxed">
                Connect with peers taking your exact course. Share coding blocks, challenge questions, and debug layouts together in real-time forums.
              </p>
            </div>

            <div className="p-6 rounded-3xl border border-white/5 bg-[#0A0A12]/90 space-y-4">
              <div className="p-3 rounded-xl bg-[#7C3AED]/15 text-[#7C3AED] border border-[#7C3AED]/25 inline-flex">
                <Globe className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold font-space-grotesk">Regional Chapters</h3>
              <p className="text-xs text-[#A1A1AA] font-sans font-light leading-relaxed">
                Unlock physical sandbox gatherings, mesh network building sessions, and developer workshops organized by chapter leads across Africa.
              </p>
            </div>

            <div className="p-6 rounded-3xl border border-white/5 bg-[#0A0A12]/90 space-y-4">
              <div className="p-3 rounded-xl bg-[#4F46E5]/15 text-[#4F46E5] border border-[#4F46E5]/25 inline-flex">
                <Users2 className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold font-space-grotesk">Peer Review</h3>
              <p className="text-xs text-[#A1A1AA] font-sans font-light leading-relaxed">
                Vetted graduates review submitted project modules, validating execution quality before certificates get cryptographically signed.
              </p>
            </div>

            <div className="p-6 rounded-3xl border border-white/5 bg-[#0A0A12]/90 space-y-4">
              <div className="p-3 rounded-xl bg-[#2563EB]/15 text-[#2563EB] border border-[#2563EB]/25 inline-flex">
                <Heart className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold font-space-grotesk">Mentorship Link</h3>
              <p className="text-xs text-[#A1A1AA] font-sans font-light leading-relaxed">
                Top graduates secure direct weekly check-ins with senior network designers, principal investigators, and regional startup mentors.
              </p>
            </div>
          </div>

          {/* Right panel: Upcoming masterclasses list */}
          <div className="lg:col-span-6 p-8 rounded-3xl border border-white/5 bg-[#0A0A12]/90 text-left space-y-6">
            <div className="flex items-center gap-2 text-xs font-bold text-white uppercase tracking-wider font-space-grotesk">
              <Radio className="w-4 h-4 text-red-500 animate-pulse" />
              Upcoming Live Network Sessions
            </div>

            <div className="space-y-4">
              {activities.map((act, idx) => (
                <div key={idx} className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-3 hover:border-[#2563EB]/20 transition-all duration-300">
                  <div className="flex justify-between items-start">
                    <span className="text-[9px] uppercase font-bold tracking-wider text-[#2563EB] bg-[#2563EB]/10 px-2.5 py-0.5 rounded border border-[#2563EB]/15 font-sans">
                      {act.badge}
                    </span>
                    <span className="text-[10px] text-[#A1A1AA] font-sans">
                      {act.date}
                    </span>
                  </div>

                  <h4 className="text-sm font-bold font-space-grotesk text-white">
                    {act.title}
                  </h4>

                  <div className="flex justify-between items-center pt-2 border-t border-white/5 text-[10px] text-[#A1A1AA] font-sans">
                    <div>
                      Host: <span className="font-semibold text-white/90">{act.host}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-[#7C3AED]" />
                      <span>{act.time}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <button className="w-full py-4.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl text-xs font-bold transition-all active:scale-95 cursor-pointer flex items-center justify-center gap-1.5">
              <span>View Full Event Calendar</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#A1A1AA]" />
            </button>
          </div>

        </div>
      </div>
    </section>
  );
}
