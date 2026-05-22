"use client";

import { motion } from "framer-motion";
import { ServiceData } from "@/data/services";

interface Props {
  data: ServiceData;
}

export function ServicePricing({ data }: Props) {
  return (
    <section className="w-full bg-[#050510] py-24">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="font-heading text-4xl font-bold md:text-5xl text-white mb-4">Pricing Structures</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">Enterprise-grade solutions tailored to your scale. All tiers include dedicated account management.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {data.pricing.map((tier, index) => (
            <motion.div
              key={index}
              className={`relative flex flex-col rounded-3xl border p-8 ${index === 1 ? 'border-primary bg-primary/5 shadow-[0_0_30px_rgba(79,70,229,0.2)]' : 'border-white/10 bg-white/5'} backdrop-blur-md`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              {index === 1 && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary text-white text-xs font-bold uppercase tracking-widest py-1 px-4 rounded-full">
                  Most Popular
                </div>
              )}
              <h3 className="text-2xl font-bold text-white mb-2">{tier.name}</h3>
              <p className="text-sm text-muted-foreground mb-6 h-10">{tier.description}</p>
              <div className="mb-8">
                <span className="text-4xl font-extrabold text-white">{tier.price}</span>
              </div>
              <ul className="space-y-4 mb-8 flex-1">
                {tier.features.map((feature, i) => (
                  <li key={i} className="flex items-center text-sm text-white/80">
                    <svg className="w-5 h-5 text-primary mr-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>
              <button className={`w-full py-3 rounded-xl font-bold transition-colors ${index === 1 ? 'bg-primary text-white hover:bg-primary/80' : 'bg-white/10 text-white hover:bg-white/20'}`}>
                Book Consultation
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
