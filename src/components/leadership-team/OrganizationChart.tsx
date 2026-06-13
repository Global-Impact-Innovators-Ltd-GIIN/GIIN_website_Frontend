'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, ChevronRight, User, Users, Shield, Zap, Target } from 'lucide-react';

interface StructureNode {
    id: string;
    role: string;
    name: string;
    icon: React.ComponentType<{ className?: string }>;
    children?: StructureNode[];
}

const structure: StructureNode = {
    id: "founder",
    role: "Founder / Chairperson",
    name: "Dr. Mensah Q. Suku Jr",
    icon: Shield,
    children: [
        {
            id: "md",
            role: "Managing Director",
            name: "Aisha Kamara",
            icon: Target,
            children: [
                {
                    id: "exec",
                    role: "Executive Leadership",
                    name: "Core Strategic Team",
                    icon: Users,
                    children: [
                        {
                            id: "dept-leads",
                            role: "Department Leads",
                            name: "Division Heads",
                            icon: Zap,
                            children: [
                                {
                                    id: "ops",
                                    role: "Operational Teams",
                                    name: "Implementation Units",
                                    icon: User
                                }
                            ]
                        }
                    ]
                }
            ]
        }
    ]
};

const OrgNode = ({ node, level = 0 }: { node: StructureNode; level?: number }) => {
    const [isOpen, setIsOpen] = useState(true);
    const hasChildren = node.children && node.children.length > 0;

    return (
        <div className="flex flex-col items-center">
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className={`relative z-10 w-64 p-4 rounded-xl border-2 transition-all cursor-pointer bg-card ${level === 0 ? 'border-primary shadow-[0_0_20px_rgba(127,76,165,0.3)]' : 'border-primary/20 hover:border-primary/60'
                    }`}
                onClick={() => setIsOpen(!isOpen)}
            >
                <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg ${level === 0 ? 'bg-primary text-white' : 'bg-primary/10 text-primary'}`}>
                        <node.icon className="w-5 h-5" />
                    </div>
                    <div className="flex-1 min-w-0">
                        <p className="text-xs font-semibold text-primary uppercase tracking-wider truncate">{node.role}</p>
                        <p className="font-bold truncate">{node.name}</p>
                    </div>
                    {hasChildren && (
                        <div className="text-muted-foreground">
                            {isOpen ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
                        </div>
                    )}
                </div>
            </motion.div>

            {hasChildren && isOpen && (
                <div className="relative pt-8 flex flex-col items-center">
                    {/* Vertical Line */}
                    <div className="absolute top-0 w-0.5 h-8 bg-gradient-to-b from-primary/60 to-primary/20" />
                    <div className="flex gap-8">
                        {node.children?.map((child) => (
                            <OrgNode key={child.id} node={child} level={level + 1} />
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default function OrganizationChart() {
    return (
        <section className="py-24 bg-background/50 backdrop-blur-sm relative overflow-hidden border-y border-primary/5">
            <div className="container mx-auto px-4 overflow-x-auto pb-8">
                <div className="text-center mb-20">
                    <h2 className="text-4xl font-bold mb-4">Organizational Leadership Structure</h2>
                    <p className="text-muted-foreground">The governance and reporting framework driving GIIN forward.</p>
                </div>

                <div className="min-w-[800px] flex justify-center">
                    <OrgNode node={structure} />
                </div>
            </div>
        </section>
    );
}
