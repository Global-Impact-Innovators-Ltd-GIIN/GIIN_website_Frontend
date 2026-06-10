"use client";

import { motion } from "framer-motion";
import { Logo } from "@/components/ui/logo";

const FacebookIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" /></svg>
);

const TwitterIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" /></svg>
);

const InstagramIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" x2="17.51" y1="6.5" y2="6.5" /></svg>
);

const LinkedinIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" /><rect width="4" height="12" x="2" y="9" /><circle cx="4" cy="4" r="2" /></svg>
);

export function FooterSection() {
  return (
    <footer className="w-full bg-section-gradient border-t border-border/10 pt-32 pb-16 transition-colors duration-500">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-24">
          <div className="lg:col-span-2">
            <div className="mb-6">
              <Logo size="md" />
            </div>
            <p className="text-muted-foreground max-w-sm mb-8 font-light leading-relaxed">
              Leading Innovation. Transforming Nations. We are an ecosystem dedicated to equipping the next generation of African pioneers.
            </p>
            <div className="flex items-center space-x-4">
              {/* Social icons */}
              <a href="#" className="w-10 h-10 rounded-full border border-border/50 flex items-center justify-center text-foreground hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all duration-300">
                <TwitterIcon />
              </a>
              <a href="#" className="w-10 h-10 rounded-full border border-border/50 flex items-center justify-center text-foreground hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all duration-300">
                <LinkedinIcon />
              </a>
              <a href="#" className="w-10 h-10 rounded-full border border-border/50 flex items-center justify-center text-foreground hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all duration-300">
                <FacebookIcon />
              </a>
              <a href="#" className="w-10 h-10 rounded-full border border-border/50 flex items-center justify-center text-foreground hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all duration-300">
                <InstagramIcon />
              </a>
            </div>
          </div>

          <div>
            <h3 className="font-bold text-foreground mb-6 uppercase tracking-[0.2em] text-xs">Divisions</h3>
            <ul className="space-y-4">
              {["Leadership Institute", "Technology Company", "Multimedia Studio", "Innovation Lab", "Research Academy"].map((link, i) => (
                <li key={i}><a href="#" className="text-muted-foreground hover:text-primary transition-colors text-sm">{link}</a></li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-foreground mb-6 uppercase tracking-[0.2em] text-xs">Platform</h3>
            <ul className="space-y-4">
              {["Courses", "Podcasts", "Events", "News & Insights", "Careers"].map((link, i) => (
                <li key={i}><a href="#" className="text-muted-foreground hover:text-primary transition-colors text-sm">{link}</a></li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-foreground mb-6 uppercase tracking-[0.2em] text-xs">Legal</h3>
            <ul className="space-y-4">
              {["Privacy Policy", "Terms of Service", "Cookie Policy", "Accessibility"].map((link, i) => (
                <li key={i}><a href="#" className="text-muted-foreground hover:text-primary transition-colors text-sm">{link}</a></li>
              ))}
            </ul>
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between border-t border-border/10 pt-8 text-xs text-muted-foreground font-medium uppercase tracking-widest">
          <p>&copy; {new Date().getFullYear()} Global Impact Innovators Ltd. All rights reserved.</p>
          <div className="flex items-center space-x-2 mt-4 md:mt-0">
            <span className="text-primary italic">Built for the Global Sovereign Future.</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
