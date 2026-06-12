"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Quote, Sparkles } from "lucide-react";

export function Chapter4TheMission() {
  return (
    <section id="mission" className="py-24 bg-background relative z-10">
      {/* Background radial highlights */}
      <div className="absolute top-1/2 left-1/3 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[130px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-accent/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary-foreground/90 text-[10px] font-bold uppercase tracking-[0.2em] mb-6">
            <Sparkles className="w-3.5 h-3.5 text-accent" />
            Chapter 4: The Mission
          </div>
          <h2 className="text-3xl md:text-5xl font-black text-foreground tracking-tighter font-heading mb-4">
            The Desk of the Founder
          </h2>
          <p className="text-muted-foreground text-lg font-light leading-relaxed">
            Our purpose stated in a direct message regarding sovereignty, ecosystem building, and continental acceleration.
          </p>
        </div>

        {/* Premium Document Layout */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto p-8 md:p-16 rounded-[2.5rem] border border-border/10 bg-card/25 backdrop-blur-2xl shadow-2xl relative"
        >
          {/* Watermark quote icon */}
          <div className="absolute top-10 right-10 opacity-[0.02] text-foreground pointer-events-none">
            <Quote className="w-48 h-48" />
          </div>

          {/* Document Header Info */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 border-b border-border/10 pb-8 mb-10 font-heading">
            <div className="flex items-center gap-4">
              <div className="relative w-16 h-16 rounded-full overflow-hidden border border-border/20">
                <Image
                  src="https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=256&auto=format&fit=crop"
                  alt="Dr. Emmanuel K. Mensah"
                  fill
                  className="object-cover grayscale"
                />
              </div>
              <div>
                <p className="text-sm font-bold text-foreground">From the Desk of the Founder</p>
                <p className="text-xs text-muted-foreground">Ecosystem Strategic Office</p>
              </div>
            </div>
            <div className="text-left sm:text-right">
              <p className="text-xs font-bold text-accent uppercase tracking-wider">DATE OF ENTRY</p>
              <p className="text-sm text-foreground">June 12, 2026</p>
            </div>
          </div>

          {/* Letter Body Text */}
          <div className="space-y-6 text-foreground/90 font-light leading-relaxed text-base md:text-lg">
            <p className="font-bold text-foreground font-heading">
              To the Builders, Dreamers, and Partners of the African Digital Age,
            </p>
            
            <p>
              When we first conceptualized the GIIN Ecosystem, we were confronted with a glaring reality: Africa is a continent of immense talent and resourcefulness, yet its digital future is being constructed on borrowed foundations. We rely on foreign software suites, outsourced cloud storage, and external investment terms that often dilute our local autonomy. 
            </p>

            <p>
              This is not simply a business problem; it is a question of sovereignty. We cannot claim technological sovereignty if we do not own the code, the nodes, and the platforms that power our economies.
            </p>

            <p>
              GIIN was founded to disrupt this dynamic. We are constructing an integrated ecosystem spanning high-grade technical education, decentralized network architectures, sovereign capital financing, and authentic cultural media platforms. We believe that by building the primary layers ourselves, we create a network effect that standard models cannot duplicate.
            </p>

            <p>
              This journey is not easy. It requires discipline, absolute commitment to excellence, and leadership that looks beyond the immediate horizon. It demands that we write code that lasts, establish trust that is absolute, and make commitments we stand by.
            </p>

            <p>
              The future of Africa is not something we wait for. It is something we build with our own hands, line by line, connection by connection. We invite you to join us—not just as users, but as active participants in this sovereign movement.
            </p>
          </div>

          {/* Document Sign-off stamp */}
          <div className="mt-12 pt-8 border-t border-border/10 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
            <div className="space-y-2">
              <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest block">
                AUTHENTICATED SIGNATURE
              </span>
              <svg
                className="w-40 h-16 text-accent fill-none stroke-current stroke-[1.5]"
                viewBox="0 0 150 50"
                aria-hidden="true"
              >
                <path d="M10 25 C20 15, 30 5, 40 25 C50 45, 60 35, 70 20 C80 5, 90 15, 100 30 C110 45, 120 40, 130 30 C140 20, 145 25, 150 25 M30 20 L50 35 M90 22 L110 32" />
              </svg>
              <div className="font-heading">
                <p className="text-md font-bold text-foreground">Dr. Emmanuel K. Mensah</p>
                <p className="text-xs text-muted-foreground">Founder & Executive Director, GIIN</p>
              </div>
            </div>

            <div className="p-4 rounded-xl border border-primary/20 bg-primary/5 text-center flex flex-col gap-1 min-w-[200px]">
              <span className="text-[9px] font-bold text-primary-foreground tracking-widest uppercase">
                System Verification
              </span>
              <span className="text-[10px] text-accent font-bold">
                SECURE SIGNATURE VERIFIED
              </span>
              <span className="text-[8px] text-muted-foreground font-mono">
                HASH: GIIN_FNDR_MSG_2026_06_12
              </span>
            </div>
          </div>

        </motion.div>
      </div>
    </section>
  );
}
