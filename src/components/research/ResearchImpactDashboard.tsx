"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Globe, BookOpen, Download, Building2, Users2, LineChart } from "lucide-react";

const metrics = [
    { id: 1, label: "Publications Released", value: 1245, icon: BookOpen },
    { id: 2, label: "Projects Completed", value: 432, icon: LineChart },
    { id: 3, label: "Countries Impacted", value: 45, icon: Globe },
    { id: 4, label: "Global Downloads", value: 852000, icon: Download, isK: true },
    { id: 5, label: "Collaborations", value: 128, icon: Building2 },
    { id: 6, label: "Institutions Engaged", value: 310, icon: Users2 }
];

const Counter = ({ value, isK = false }: { value: number; isK?: boolean }) => {
    const [count, setCount] = useState(0);

    useEffect(() => {
        let start = 0;
        const duration = 2000;
        const increment = value / (duration / 16); // 60fps

        const timer = setInterval(() => {
            start += increment;
            if (start >= value) {
                setCount(value);
                clearInterval(timer);
            } else {
                setCount(Math.ceil(start));
            }
        }, 16);

        return () => clearInterval(timer);
    }, [value]);

    return (
        <span className="font-bold font-[Space Grotesk] text-4xl lg:text-5xl bg-clip-text text-transparent bg-gradient-to-r from-white to-zinc-400">
            {isK ? `${(count / 1000).toFixed(1)}k+` : `${count}+`}
        </span>
    );
};

export default function ResearchImpactDashboard() {
    return (
        <section className="py-24 bg-[#0A0E27] relative border-y border-white/5 overflow-hidden">
            {/* Background Graphic */}
            <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
                <div className="absolute top-0 right-0 w-96 h-96 bg-[#2563EB] rounded-full blur-[150px]" />
                <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#7C3AED] rounded-full blur-[150px]" />
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-3xl md:text-5xl font-bold text-white mb-6 font-[Space Grotesk]"
                    >
                        Research Global Impact
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-zinc-400 text-lg"
                    >
                        Demonstrating our commitment to creating evidence-based knowledge that drives substantial transformational outcomes worldwide.
                    </motion.p>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 gap-8 md:gap-12 text-center">
                    {metrics.map((metric, index) => (
                        <motion.div
                            key={metric.id}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="flex flex-col items-center p-6"
                        >
                            <div className="w-14 h-14 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center mb-6 text-[#2563EB] shadow-inner shadow-white/5">
                                <metric.icon className="w-6 h-6" />
                            </div>
                            <Counter value={metric.value} isK={metric.isK} />
                            <p className="text-sm md:text-base text-zinc-500 font-medium uppercase tracking-wider mt-3">
                                {metric.label}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
