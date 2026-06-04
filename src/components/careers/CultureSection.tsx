'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Users, Zap, Heart, Award, ShieldAlert, Sparkles, MessageSquare } from 'lucide-react';
import { trackCareersEvent } from '@/hooks/useCareers';

interface CultureItem {
  id: string;
  icon: React.ElementType;
  title: string;
  subtitle: string;
  quote: string;
  quoteAuthor: string;
  quoteRole: string;
  story: string;
  image: string;
  color: string;
}

const CULTURE_ITEMS: CultureItem[] = [
  {
    id: 'collab',
    icon: Users,
    title: 'Team Collaboration',
    subtitle: 'Cross-functional alignment over silos.',
    quote: "We don't work in isolation. Our developers, strategists, and designers share coffee and code daily. It leads to incredibly clean architectures and faster learning loops.",
    quoteAuthor: 'Sarah Jenkins',
    quoteRole: 'Senior Business Partner',
    story: 'At GIIN, collaboration is a practical mechanism rather than a slogan. We coordinate digital sprints where engineers work hand-in-hand with field managers. This ensures our technologies address genuine user pain points from day one. You are surrounded by supportive, highly competent peers who motivate you to ship beautiful work.',
    image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=600',
    color: 'from-purple-500/10 to-blue-500/10 border-purple-500/30 text-purple-400',
  },
  {
    id: 'innovate',
    icon: Zap,
    title: 'Innovation Mindset',
    subtitle: 'Calculated risks and autonomous building.',
    quote: 'Failing fast is highly encouraged here. We get budget to try experimental tools. If it works, we scale it. If it fails, we review and share the learnings.',
    quoteAuthor: 'Alex Chen',
    quoteRole: 'Lead Technologist',
    story: 'We operate under a zero-gatekeeping framework. If you have an idea for a more resilient AI model or an intuitive learning path, you are empowered to draft a plan, assemble a micro-team, and launch a pilot. We back your ambition with actual engineering support, cloud infrastructure budget, and mentorship.',
    image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&q=80&w=600',
    color: 'from-blue-500/10 to-cyan-500/10 border-blue-500/30 text-blue-400',
  },
  {
    id: 'diversity',
    icon: Heart,
    title: 'Diversity & Inclusion',
    subtitle: 'Global perspectives driving regional impact.',
    quote: 'Our team spans 20+ countries. This diversity of background is why our designs resonate so deeply. We build solutions that adapt to actual lives.',
    quoteAuthor: 'Fatima Al-Sayed',
    quoteRole: 'Director, MEA Partnerships',
    story: 'True equity starts with representation. GIIN connects specialists from all continents, offering fully remote setups, global sabbaticals, and inclusive forums. We champion diverse life structures, respect diverse religious and family commitments, and ensure everyone has an equal microphone on the executive board.',
    image: 'https://images.unsplash.com/photo-1531535934027-667f6db8751f?auto=format&fit=crop&q=80&w=600',
    color: 'from-pink-500/10 to-purple-500/10 border-pink-500/30 text-pink-400',
  },
  {
    id: 'learning',
    icon: Award,
    title: 'Continuous Learning',
    subtitle: 'Never stop expanding your horizon.',
    quote: 'My personal learning budget allowed me to get a certification in advanced cryptography from Stanford. GIIN invested in my intellectual development.',
    quoteAuthor: 'Hiroshi Sato',
    quoteRole: 'Infrastructure Security Engineer',
    story: 'Your professional growth is mapped directly onto our roadmap. We provide a $3,500 annual budget for courses, certifications, and conferences. Combined with weekly cross-disciplinary tech exchanges, deep-dive strategic reviews, and direct executive mentorship, you are guaranteed to level-up at an accelerated rate.',
    image: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=600',
    color: 'from-amber-500/10 to-orange-500/10 border-amber-500/30 text-amber-400',
  },
  {
    id: 'impact',
    icon: Sparkles,
    title: 'Community Impact',
    subtitle: 'Writing code and strategy that heals.',
    quote: 'Seeing our microfinance registry onboarding its first 1,000 farmers in local districts was more satisfying than any corporate bonus I have ever received.',
    quoteAuthor: 'Elena Rostova',
    quoteRole: 'Lead Architect',
    story: 'We measure success in human outcomes, not just server uptimes. Whether deploying local offline-first databases for regional clinics, training tomorrow’s founders through our Accelerator, or writing public research papers on sustainable finance, you will know that your daily efforts contribute directly to an equitable planet.',
    image: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&q=80&w=600',
    color: 'from-emerald-500/10 to-teal-500/10 border-emerald-500/30 text-emerald-400',
  },
];

export function CultureSection() {
  const [activeTab, setActiveTab] = useState<string>('collab');

  const current = CULTURE_ITEMS.find((item) => item.id === activeTab) || CULTURE_ITEMS[0];

  const handleTabClick = (id: string) => {
    trackCareersEvent('Culture Tab Clicked', { tab: id });
    setActiveTab(id);
  };

  return (
    <section className="relative py-24 px-4 md:px-8 bg-[#020205] overflow-hidden text-white border-t border-slate-900/60">
      {/* Soft floating glow circle */}
      <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-blue-900/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-6xl w-full mx-auto relative z-10 space-y-16">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-block px-3 py-1 rounded-full border border-blue-500/20 bg-blue-950/20 text-xs md:text-sm font-semibold uppercase tracking-wider text-blue-400">
            Life At GIIN
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold font-heading leading-tight">
            We Build{' '}
            <span className="bg-gradient-to-r from-blue-400 to-teal-400 bg-clip-text text-transparent">
              Ecosystems & Leaders
            </span>
          </h2>
          <p className="text-gray-400 text-base md:text-lg leading-relaxed">
            Emotional connection is what keeps us motivated. Explore the key core topics that compose our unique collective culture.
          </p>
        </div>

        {/* Culture Navigation Tabs */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {CULTURE_ITEMS.map((item) => {
            const Icon = item.icon as any;
            const isActive = item.id === activeTab;
            return (
              <button
                key={item.id}
                onClick={() => handleTabClick(item.id)}
                className={`p-5 rounded-2xl border text-center transition-all duration-300 backdrop-blur-md cursor-pointer flex flex-col items-center justify-center gap-3 ${
                  isActive
                    ? 'border-purple-500 bg-purple-950/20 shadow-lg shadow-purple-500/10'
                    : 'border-slate-800 bg-slate-900/30 hover:border-slate-700 hover:bg-slate-900/50'
                }`}
              >
                <div
                  className={`h-10 w-10 rounded-xl flex items-center justify-center transition-transform duration-300 ${
                    isActive
                      ? 'bg-purple-500 text-white scale-110'
                      : 'bg-white/5 text-slate-400 group-hover:scale-105'
                  }`}
                >
                  <Icon size={20} />
                </div>
                <span
                  className={`text-xs md:text-sm font-semibold tracking-wide ${
                    isActive ? 'text-white' : 'text-slate-400'
                  }`}
                >
                  {item.title}
                </span>
              </button>
            );
          })}
        </div>

        {/* Spotlighting Story Container */}
        <div className="rounded-3xl border border-slate-800/80 bg-slate-900/20 backdrop-blur-xl overflow-hidden shadow-2xl p-6 md:p-12 min-h-[420px] relative">
          {/* Inner ambient gradients */}
          <div className="absolute top-0 right-0 w-72 h-72 bg-gradient-to-tr from-purple-500/5 to-blue-500/5 rounded-full blur-3xl pointer-events-none" />
          
          <AnimatePresence mode="wait">
            <motion.div
              key={current.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.4 }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 items-center"
            >
              {/* Left Column: Text Stories */}
              <div className="lg:col-span-7 space-y-6 text-left">
                <div className="space-y-2">
                  <h3 className="text-2xl md:text-3xl font-bold font-heading">{current.title}</h3>
                  <p className="text-purple-400 text-sm font-semibold tracking-wide uppercase">
                    {current.subtitle}
                  </p>
                </div>

                <p className="text-gray-300 text-sm md:text-base leading-relaxed">
                  {current.story}
                </p>

                {/* Team quote spotlights */}
                <div className="p-5 rounded-2xl border border-white/5 bg-slate-950/60 relative">
                  <div className="absolute -top-3 -left-2 text-6xl text-purple-500/20 font-serif leading-none pointer-events-none">“</div>
                  <p className="text-gray-300 text-xs md:text-sm italic leading-relaxed relative z-10">
                    {current.quote}
                  </p>
                  <div className="mt-3 flex items-center gap-3">
                    <div className="h-1.5 w-1.5 rounded-full bg-purple-500" />
                    <span className="text-xs font-semibold text-slate-200">
                      {current.quoteAuthor}
                    </span>
                    <span className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">
                      {current.quoteRole}
                    </span>
                  </div>
                </div>
              </div>

              {/* Right Column: High Quality Imagery Presentation Placeholder */}
              <div className="lg:col-span-5 relative w-full aspect-video md:aspect-[4/3] rounded-2xl overflow-hidden border border-white/10 bg-slate-950 shadow-inner group">
                <img
                  src={current.image}
                  alt={current.title}
                  className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-80"
                  loading="lazy"
                />
                
                {/* Overlay visual framework */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent pointer-events-none" />
                
                <div className="absolute bottom-4 left-4 right-4 flex items-center gap-3">
                  <div className="h-8 w-8 rounded-full bg-slate-950/80 backdrop-blur-md flex items-center justify-center border border-white/10 text-purple-400">
                    <MessageSquare size={14} />
                  </div>
                  <p className="text-xs font-semibold text-slate-200 uppercase tracking-wider">
                    Ecosystem Showcase — {current.title}
                  </p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
