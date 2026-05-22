"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

interface Props {
  courseId: string;
}

export function ImmersivePlayer({ courseId }: Props) {
  const [activeTab, setActiveTab] = useState<"syllabus" | "tutor">("syllabus");
  const [chatMessages, setChatMessages] = useState<{role: "user"|"ai", text: string}[]>([
    { role: "ai", text: "Hello! I am your AI Tutor for this course. Do you have any questions about the current module?" }
  ]);
  const [input, setInput] = useState("");

  const handleChat = (e: React.FormEvent) => {
    e.preventDefault();
    if(!input.trim()) return;
    
    setChatMessages(prev => [...prev, { role: "user", text: input }]);
    setInput("");

    // Simulate AI response
    setTimeout(() => {
      setChatMessages(prev => [...prev, { role: "ai", text: "That is an excellent question! In the context of Enterprise Architecture, it means building highly decoupled microservices. Shall I explain further?" }]);
    }, 1000);
  };

  return (
    <div className="flex flex-col lg:flex-row min-h-screen w-full bg-black">
      
      {/* Main Video Area */}
      <div className="flex-1 flex flex-col relative border-r border-white/10">
        {/* Top bar */}
        <div className="h-16 border-b border-white/10 flex items-center px-6 justify-between bg-black z-10">
          <Link href="/academy/dashboard" className="text-sm font-medium text-white/50 hover:text-white transition-colors">
            &larr; Back to Dashboard
          </Link>
          <div className="text-sm font-bold text-white">Module 1: Introduction</div>
          <button className="text-sm font-medium bg-primary text-white px-4 py-1.5 rounded-full hover:bg-primary/80 transition-colors">
            Mark Complete
          </button>
        </div>

        {/* Video Player Mock */}
        <div className="w-full aspect-video bg-zinc-900 flex items-center justify-center relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('/noise.png')] opacity-10 mix-blend-overlay" />
          {/* Placeholder for iframe (YouTube/Vimeo) */}
          <div className="w-20 h-20 bg-white/10 rounded-full flex items-center justify-center backdrop-blur-md cursor-pointer hover:bg-white/20 transition-all hover:scale-110">
            <svg className="w-8 h-8 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>
        </div>

        {/* Course Info below video */}
        <div className="p-8 max-w-4xl">
          <h1 className="text-3xl font-bold text-white mb-4">Understanding the Ecosystem</h1>
          <p className="text-muted-foreground text-lg leading-relaxed mb-8">
            In this module, we will explore the foundational principles of modern enterprise architecture and how leadership methodologies intersect with technological implementation.
          </p>
          
          <div className="flex gap-4">
            <button className="px-6 py-3 rounded-xl bg-white/5 border border-white/10 text-white font-medium hover:bg-white/10 transition-colors">
              Download Resources (PDF)
            </button>
            <button className="px-6 py-3 rounded-xl bg-white/5 border border-white/10 text-white font-medium hover:bg-white/10 transition-colors">
              Take Module Quiz
            </button>
          </div>
        </div>
      </div>

      {/* Right Sidebar (Syllabus & AI Tutor) */}
      <div className="w-full lg:w-96 bg-[#050510] flex flex-col h-[calc(100vh-4rem)] lg:h-screen sticky top-0">
        
        {/* Tabs */}
        <div className="flex border-b border-white/10">
          <button 
            onClick={() => setActiveTab("syllabus")}
            className={`flex-1 py-4 text-sm font-bold uppercase tracking-widest transition-colors border-b-2 ${activeTab === "syllabus" ? "border-primary text-primary" : "border-transparent text-white/50 hover:text-white"}`}
          >
            Syllabus
          </button>
          <button 
            onClick={() => setActiveTab("tutor")}
            className={`flex-1 py-4 text-sm font-bold uppercase tracking-widest transition-colors border-b-2 ${activeTab === "tutor" ? "border-primary text-primary" : "border-transparent text-white/50 hover:text-white"}`}
          >
            AI Tutor
          </button>
        </div>

        {/* Tab Content */}
        <div className="flex-1 overflow-y-auto relative">
          <AnimatePresence mode="wait">
            
            {activeTab === "syllabus" && (
              <motion.div 
                key="syllabus"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="p-6 space-y-4"
              >
                {[1, 2, 3, 4, 5].map((mod) => (
                  <div key={mod} className={`p-4 rounded-xl border ${mod === 1 ? 'bg-primary/10 border-primary/30' : 'bg-white/5 border-white/10'} cursor-pointer hover:border-white/30 transition-colors`}>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-xs font-bold text-white/50">Module {mod}</span>
                      <span className="text-xs text-white/40">12:45</span>
                    </div>
                    <h4 className={`text-sm font-bold ${mod === 1 ? 'text-primary' : 'text-white'}`}>
                      {mod === 1 ? "Understanding the Ecosystem" : `Advanced Principles Part ${mod - 1}`}
                    </h4>
                  </div>
                ))}
              </motion.div>
            )}

            {activeTab === "tutor" && (
              <motion.div 
                key="tutor"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="flex flex-col h-full absolute inset-0"
              >
                {/* Chat Messages */}
                <div className="flex-1 overflow-y-auto p-6 space-y-4">
                  {chatMessages.map((msg, i) => (
                    <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                      <div className={`max-w-[85%] p-4 rounded-2xl text-sm ${msg.role === "user" ? "bg-primary text-white rounded-br-none" : "bg-white/10 text-white rounded-bl-none border border-white/10"}`}>
                        {msg.text}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Input Area */}
                <div className="p-4 border-t border-white/10 bg-[#050510]">
                  <form onSubmit={handleChat} className="flex gap-2">
                    <input 
                      type="text" 
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      placeholder="Ask the AI Tutor..." 
                      className="flex-1 bg-black border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-primary transition-colors"
                    />
                    <button type="submit" className="bg-primary text-white w-12 h-12 rounded-xl flex items-center justify-center hover:bg-primary/80 transition-colors">
                      &uarr;
                    </button>
                  </form>
                </div>
              </motion.div>
            )}

          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
