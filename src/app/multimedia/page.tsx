"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  Film, Podcast, Palette, HardDrive,
  Play, ArrowRight, Zap, Globe, Heart,
  Camera, Music
} from "lucide-react";
import Image from "next/image";

export default function MultimediaPage() {
  return (
    <main className="min-h-screen bg-background text-foreground pt-32 transition-colors duration-500 overflow-x-hidden">
      {/* HERO - The Creative Pulse */}
      <section className="container mx-auto px-6 mb-40">
        <div className="max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-[10px] font-bold uppercase tracking-[0.2em] mb-8">
              <Film className="w-3 h-3" />
              Media Division
            </div>
            <h1 className="text-5xl md:text-8xl font-black text-foreground mb-8 tracking-tighter font-outfit leading-[0.9] text-balance">
              The <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">Creative Narrative</span>.
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground font-light leading-relaxed max-w-2xl text-balance">
              Cinema-grade storytelling and decentralized content distribution. We are shaping the visual and auditory pulse of Africa's digital culture.
            </p>
          </motion.div>
        </div>
      </section>

      {/* CREATIVE DEPARTMENTS */}
      <section className="container mx-auto px-6 mb-40">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {[
            {
              title: "Multimedia Studio",
              tag: "Production",
              desc: "Cinema-grade digital media, high-fidelity brand representations, and immersive visual experiences designed to tell the GIIN story to the world.",
              icon: Camera,
              color: "text-primary",
              image: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?q=80&w=800&auto=format&fit=crop"
            },
            {
              title: "Podcast Center",
              tag: "Audio",
              desc: "Exploring deep tech, policy, and human impact stories through high-production podcasts recorded within our continental network labs.",
              icon: Podcast,
              color: "text-accent",
              image: "https://images.unsplash.com/photo-1590602847861-f357a9332bbc?q=80&w=800&auto=format&fit=crop"
            },
            {
              title: "Creative Lab",
              tag: "Incubation",
              desc: "Incubating digital artists, product designers, and visual creators to craft the UI/UX and aesthetic standards of our sovereign systems.",
              icon: Palette,
              color: "text-accent",
              image: "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=800&auto=format&fit=crop"
            },
            {
              title: "Content Systems",
              tag: "Technology",
              desc: "Decentralized content distribution systems, media feeds, and immutable archiving modules for preserving African cultural data.",
              icon: HardDrive,
              color: "text-primary",
              image: "https://images.unsplash.com/photo-1516110833967-0b5716ca1387?q=80&w=800&auto=format&fit=crop"
            }
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="group relative h-[400px] rounded-[3rem] overflow-hidden border border-border/10 shadow-sm hover:shadow-2xl transition-all duration-700"
            >
              <Image src={item.image} alt={item.title} fill className="object-cover group-hover:scale-110 transition-transform duration-1000" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

              <div className="absolute inset-0 p-10 flex flex-col justify-end text-white">
                <div className={`w-12 h-12 rounded-xl bg-white/10 backdrop-blur-md flex items-center justify-center mb-6 ${item.color}`}>
                  <item.icon className="w-6 h-6" />
                </div>
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="text-3xl font-black tracking-tighter">{item.title}</h3>
                  <span className="text-[10px] font-bold uppercase tracking-widest bg-white/10 px-2 py-1 rounded">{item.tag}</span>
                </div>
                <p className="text-sm text-gray-300 font-light leading-relaxed max-w-sm group-hover:text-white transition-colors">{item.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* RECENT HIGHLIGHTS */}
      <section className="py-40 bg-card border-y border-border/10">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mb-24">
            <h2 className="text-4xl md:text-7xl font-black text-foreground mb-8 tracking-tighter">Latest <span className="text-primary italic">Releases</span>.</h2>
            <p className="text-xl text-muted-foreground font-light">Cinema-grade productions from across the continent.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map((_, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -10 }}
                className="group cursor-pointer"
              >
                <div className="relative aspect-video rounded-[2rem] overflow-hidden mb-6 border border-border/10 shadow-lg">
                  <Image src={`https://images.unsplash.com/photo-1485846234645-a62644f84728?q=80&w=400&auto=format&fit=crop&sig=${i}`} alt="Play" fill className="object-cover" />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-all flex items-center justify-center">
                    <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-xl border border-white/30 flex items-center justify-center scale-90 group-hover:scale-100 transition-all">
                      <Play className="w-6 h-6 text-white fill-white" />
                    </div>
                  </div>
                </div>
                <h4 className="text-xl font-black text-foreground mb-1 tracking-tight group-hover:text-primary transition-colors">Project Sovereign Vision</h4>
                <p className="text-sm text-muted-foreground font-light">Short Documentary • 12 mins</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="container mx-auto px-6 py-40 text-center">
        <div className="max-w-4xl mx-auto rounded-[4rem] border border-border/10 p-20 relative overflow-hidden bg-card shadow-sm">
          <div className="absolute top-0 left-0 w-40 h-40 bg-primary/10 blur-[80px] rounded-full" />
          <div className="relative z-10">
            <h2 className="text-4xl md:text-6xl font-black text-foreground mb-8 tracking-tighter">Shape the <span className="text-accent underline decoration-accent/20 decoration-8 underline-offset-8">Culture</span>.</h2>
            <p className="text-lg text-muted-foreground font-light mb-10 max-w-2xl mx-auto">Are you a filmmaker, digital artist, or audio engineer? Collaborate with the GIIN Creative Labs and tell the African story.</p>
            <button className="px-12 py-5 rounded-2xl bg-foreground text-background font-black text-sm uppercase tracking-widest hover:scale-105 transition-transform flex items-center gap-4 mx-auto">
              Join Creative Hub <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}

// Helper to handle class merging
function cn(...inputs: any[]) {
  return inputs.filter(Boolean).join(" ");
}
