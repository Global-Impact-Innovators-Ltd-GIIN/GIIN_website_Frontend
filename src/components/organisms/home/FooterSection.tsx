"use client";

import { motion } from "framer-motion";
import { Logo } from "@/components/ui/logo";

export function FooterSection() {
  return (
    <footer className="w-full bg-black border-t border-white/10 pt-32 pb-16">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-24">
          <div className="lg:col-span-2">
            <div className="mb-6">
              <Logo size="md" />
            </div>
            <p className="text-muted-foreground max-w-sm mb-8">
              Leading Innovation. Transforming Nations. We are an ecosystem dedicated to equipping the next generation of African pioneers.
            </p>
            <div className="flex items-center space-x-4">
              {/* Social icons placeholders */}
              {["X", "In", "Yt", "Ig"].map((social, i) => (
                <a key={i} href="#" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white hover:bg-primary hover:border-primary transition-colors">
                  {social}
                </a>
              ))}
            </div>
          </div>
          
          <div>
            <h3 className="font-bold text-white mb-6 uppercase tracking-widest text-sm">Divisions</h3>
            <ul className="space-y-4">
              {["Leadership Institute", "Technology Company", "Multimedia Studio", "Innovation Lab", "Research Academy"].map((link, i) => (
                <li key={i}><a href="#" className="text-muted-foreground hover:text-primary transition-colors">{link}</a></li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-white mb-6 uppercase tracking-widest text-sm">Platform</h3>
            <ul className="space-y-4">
              {["Courses", "Podcasts", "Events", "News & Insights", "Careers"].map((link, i) => (
                <li key={i}><a href="#" className="text-muted-foreground hover:text-primary transition-colors">{link}</a></li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-white mb-6 uppercase tracking-widest text-sm">Legal</h3>
            <ul className="space-y-4">
              {["Privacy Policy", "Terms of Service", "Cookie Policy", "Accessibility"].map((link, i) => (
                <li key={i}><a href="#" className="text-muted-foreground hover:text-primary transition-colors">{link}</a></li>
              ))}
            </ul>
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between border-t border-white/10 pt-8 text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Global Impact Innovators Ltd. All rights reserved.</p>
          <div className="flex items-center space-x-2 mt-4 md:mt-0">
            <span>Built for the Future.</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
