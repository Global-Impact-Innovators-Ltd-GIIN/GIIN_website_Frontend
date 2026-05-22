"use client";

import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { aiPersonas } from "@/data/ai";

interface Props {
  personaId: string;
}

export function AIChatInterface({ personaId }: Props) {
  const persona = aiPersonas.find(p => p.id === personaId) || aiPersonas[0];
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const endOfMessagesRef = useRef<HTMLDivElement>(null);
  
  const [messages, setMessages] = useState<{role: "user" | "ai", text: string}[]>([
    { role: "ai", text: `I am ${persona.name}, your ${persona.role}. How can I assist you with your enterprise objectives today?` }
  ]);

  useEffect(() => {
    endOfMessagesRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    setMessages(prev => [...prev, { role: "user", text: input }]);
    setInput("");
    setIsTyping(true);

    // Simulate AI thinking and streaming response
    setTimeout(() => {
      setIsTyping(false);
      setMessages(prev => [...prev, { role: "ai", text: `Based on your request, I recommend utilizing a highly decoupled architecture. Would you like me to generate a full technical proposal for this approach?` }]);
    }, 1500);
  };

  return (
    <div className="flex flex-col h-full bg-black">
      
      {/* Top Bar */}
      <div className="h-16 border-b border-white/10 flex items-center px-6 gap-4 bg-black/50 backdrop-blur-md sticky top-0 z-10 shrink-0">
        <div className="text-2xl">{persona.icon}</div>
        <div>
          <h2 className="text-sm font-bold text-white leading-tight">{persona.name}</h2>
          <p className="text-xs text-primary font-medium">{persona.role}</p>
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 overflow-y-auto p-6 md:p-12">
        <div className="max-w-4xl mx-auto space-y-8">
          {messages.map((msg, i) => (
            <motion.div 
              key={i} 
              className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"} gap-4`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              {msg.role === "ai" && (
                <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center shrink-0 text-sm border border-white/20 shadow-[0_0_15px_rgba(255,255,255,0.1)]">
                  {persona.icon}
                </div>
              )}
              
              <div className={`max-w-[85%] md:max-w-[75%] p-4 md:p-6 text-sm md:text-base leading-relaxed ${
                msg.role === "user" 
                  ? "bg-white text-black rounded-2xl rounded-tr-sm font-medium" 
                  : "bg-transparent text-white/90"
              }`}>
                {msg.text}
              </div>
            </motion.div>
          ))}

          {isTyping && (
            <motion.div 
              className="flex justify-start gap-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center shrink-0 text-sm border border-white/20">
                {persona.icon}
              </div>
              <div className="flex gap-1 items-center px-4">
                <div className="w-2 h-2 rounded-full bg-white/40 animate-bounce" style={{ animationDelay: "0ms" }} />
                <div className="w-2 h-2 rounded-full bg-white/40 animate-bounce" style={{ animationDelay: "150ms" }} />
                <div className="w-2 h-2 rounded-full bg-white/40 animate-bounce" style={{ animationDelay: "300ms" }} />
              </div>
            </motion.div>
          )}
          <div ref={endOfMessagesRef} />
        </div>
      </div>

      {/* Input Area */}
      <div className="p-4 md:p-8 shrink-0 bg-gradient-to-t from-black via-black to-transparent pt-12">
        <div className="max-w-4xl mx-auto relative">
          <form onSubmit={handleSend} className="relative flex items-end bg-[#111116] border border-white/10 rounded-2xl p-2 shadow-2xl focus-within:border-primary/50 transition-colors">
            <textarea 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={`Message ${persona.name}...`}
              className="w-full bg-transparent text-white placeholder:text-white/30 resize-none max-h-32 min-h-[44px] px-4 py-3 focus:outline-none scrollbar-hide text-sm md:text-base"
              rows={1}
              onKeyDown={(e) => {
                if(e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSend(e);
                }
              }}
            />
            <button 
              type="submit" 
              disabled={!input.trim() || isTyping}
              className="m-2 w-10 h-10 rounded-xl bg-white text-black flex items-center justify-center shrink-0 disabled:opacity-50 disabled:bg-white/20 disabled:text-white hover:bg-gray-200 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
              </svg>
            </button>
          </form>
          <div className="text-center mt-3 text-[10px] text-white/40">
            AI responses may be inaccurate. Verify critical enterprise information.
          </div>
        </div>
      </div>
    </div>
  );
}
