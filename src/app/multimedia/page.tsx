"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, Camera, Video, Mic, Palette, PlaySquare, Radio, Film, Layers, UploadCloud } from "lucide-react";
import { motion } from "framer-motion";

export default function MultimediaEcosystemPage() {
  return (
    <main className="min-h-screen bg-[#020205] text-slate-200 overflow-hidden pt-24">
      {/* Background aesthetics */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('/noise.png')] opacity-10 mix-blend-overlay" />
        <div className="absolute top-1/3 -left-32 w-[600px] h-[600px] bg-rose-600/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 -right-32 w-[600px] h-[600px] bg-amber-600/10 rounded-full blur-[120px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-20">
        {/* Hero Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-4xl mx-auto mb-32"
        >
          <div className="inline-flex items-center justify-center px-4 py-1.5 rounded-full border border-rose-500/30 bg-rose-500/10 text-rose-400 text-sm font-medium mb-6">
            Ecosystem Division 3
          </div>
          <h1 className="text-5xl md:text-7xl font-bold font-heading tracking-tight mb-8 bg-clip-text text-transparent bg-gradient-to-br from-white to-rose-200">
            Stories Shape Nations
          </h1>
          <p className="text-xl text-slate-400 mb-10 max-w-2xl mx-auto">
            GIIN Multimedia Studios crafts high-fidelity narratives, documentaries, and creative assets to shift global paradigms about Africa.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link href="/multimedia/dashboards/client" className="px-8 py-4 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-medium flex items-center gap-2 transition-all shadow-[0_0_30px_-5px_rgba(225,29,72,0.5)]">
              Client Booking Portal <ArrowRight className="w-4 h-4" />
            </Link>
            <Link href="/multimedia/dashboards/creator" className="px-8 py-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 text-white font-medium transition-all">
              Creator Dashboard
            </Link>
          </div>
        </motion.div>

        {/* Core Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-32">
            {[
              { icon: <Camera />, title: "Photography", desc: "Corporate, architectural, and campaign photography." },
              { icon: <Video />, title: "Videography", desc: "High-end commercials and promotional videos." },
              { icon: <Mic />, title: "Podcast Production", desc: "Full-stack audio recording and syndication." },
              { icon: <Radio />, title: "Audio Engineering", desc: "Mixing, mastering, and sound design." },
              { icon: <Layers />, title: "Motion Graphics", desc: "2D/3D animation and visual effects." },
              { icon: <Palette />, title: "Branding", desc: "Corporate identity and visual language systems." },
              { icon: <Film />, title: "Documentaries", desc: "Long-form storytelling capturing African innovation." },
              { icon: <PlaySquare />, title: "Live Streaming", desc: "Multi-camera broadcasting for global events." },
              { icon: <UploadCloud />, title: "Content Creation", desc: "Social media and digital asset pipelines." }
            ].map((item, i) => (
              <motion.div 
                key={i} 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="group p-8 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-rose-500/30 transition-all backdrop-blur-xl"
              >
                <div className="w-12 h-12 rounded-xl bg-rose-500/10 flex items-center justify-center text-rose-400 mb-6 group-hover:scale-110 transition-transform">
                  {item.icon}
                </div>
                <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
                <p className="text-sm text-slate-400">{item.desc}</p>
              </motion.div>
            ))}
        </div>

        {/* Systems Showcase */}
        <div className="border border-white/10 rounded-3xl overflow-hidden bg-black/40 backdrop-blur-xl">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            <div className="p-12 lg:p-20 flex flex-col justify-center border-b lg:border-b-0 lg:border-r border-white/10">
              <h2 className="text-3xl font-bold text-white mb-4">Client Review System</h2>
              <p className="text-slate-400 mb-8">A streamlined portal for booking media services, reviewing assets, and approving final cuts with frame-accurate feedback.</p>
              <ul className="space-y-4 mb-8">
                <li className="flex items-center gap-3 text-sm text-slate-300">
                  <div className="w-1.5 h-1.5 rounded-full bg-rose-500" /> Media Booking Engine
                </li>
                <li className="flex items-center gap-3 text-sm text-slate-300">
                  <div className="w-1.5 h-1.5 rounded-full bg-rose-500" /> Frame-Accurate Asset Review
                </li>
                <li className="flex items-center gap-3 text-sm text-slate-300">
                  <div className="w-1.5 h-1.5 rounded-full bg-rose-500" /> Content Approval Pipeline
                </li>
              </ul>
              <Link href="/multimedia/dashboards/client" className="inline-flex w-max items-center gap-2 text-rose-400 font-medium hover:underline">
                Access Client Portal <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            
            <div className="p-12 lg:p-20 flex flex-col justify-center">
              <h2 className="text-3xl font-bold text-white mb-4">Creator Workflow</h2>
              <p className="text-slate-400 mb-8">The central hub for GIIN creatives. Upload massive files, manage asset versions, and generate AI thumbnails instantly.</p>
              <ul className="space-y-4 mb-8">
                <li className="flex items-center gap-3 text-sm text-slate-300">
                  <div className="w-1.5 h-1.5 rounded-full bg-amber-400" /> Centralized Upload Center
                </li>
                <li className="flex items-center gap-3 text-sm text-slate-300">
                  <div className="w-1.5 h-1.5 rounded-full bg-amber-400" /> Automated Version Control
                </li>
                <li className="flex items-center gap-3 text-sm text-slate-300">
                  <div className="w-1.5 h-1.5 rounded-full bg-amber-400" /> AI Thumbnail Generator
                </li>
              </ul>
              <Link href="/multimedia/dashboards/creator" className="inline-flex w-max items-center gap-2 text-amber-400 font-medium hover:underline">
                Enter Creator Workspace <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>

      </div>
    </main>
  );
}
