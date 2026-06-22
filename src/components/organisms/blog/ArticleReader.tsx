"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion, useScroll, useSpring } from "framer-motion";
import { BookOpen, Clock, Calendar, ArrowLeft, Share2, Copy, Check, Sparkles } from "lucide-react";
import { Article, ARTICLES } from "@/data/articles";
import { ArticleCard } from "./ArticleCard";

const Linkedin = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const Twitter = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
  </svg>
);

interface ArticleReaderProps {
  article: Article;
}

export function ArticleReader({ article }: ArticleReaderProps) {
  const { id, title, excerpt, date, category, tags, readingTime, author, imageUrl, content } = article;
  const [copied, setCopied] = useState(false);

  // Dynamic Scroll Progress Bar
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const handleCopyLink = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  // Find related articles (same category or general)
  const relatedArticles = ARTICLES.filter((a) => a.id !== id).slice(0, 3);

  return (
    <div className="w-full bg-[#03010b] text-slate-200 min-h-screen pb-24 relative">
      {/* Scroll Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary to-accent origin-[0%] z-50"
        style={{ scaleX }}
      />

      {/* Decorative background glows */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[500px] bg-gradient-to-b from-primary/5 via-indigo-950/5 to-transparent blur-3xl pointer-events-none -z-10" />

      <div className="container mx-auto px-6 max-w-4xl pt-12 relative z-10">
        
        {/* Back Button */}
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-muted-foreground hover:text-primary transition-colors mb-12 group"
        >
          <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-0.5" />
          Back to Articles Hub
        </Link>

        {/* Editorial Header */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <span className="inline-flex items-center px-3.5 py-1.5 rounded-full text-[9px] font-bold uppercase tracking-widest bg-primary/10 border border-primary/25 text-primary-foreground">
              {category}
            </span>
            <span className="text-[10px] text-muted-foreground tracking-wider uppercase font-semibold">
              GIIN Article Asset
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl md:text-6xl font-black tracking-tighter font-heading text-foreground mb-6 leading-[1.05]">
            {title}
          </h1>

          <p className="text-lg md:text-xl font-light leading-relaxed text-muted-foreground/90 mb-8 border-l-2 border-primary/30 pl-6">
            {excerpt}
          </p>

          {/* Author and Date Meta Area */}
          <div className="flex flex-wrap items-center justify-between gap-6 py-6 border-y border-border/10">
            <div className="flex items-center gap-4">
              <img
                src={author.avatar}
                alt={author.name}
                className="w-12 h-12 rounded-full object-cover border border-border/20"
              />
              <div className="flex flex-col">
                <span className="text-sm font-bold text-foreground/90">{author.name}</span>
                <span className="text-xs text-muted-foreground">{author.title}, {author.organization}</span>
              </div>
            </div>

            <div className="flex items-center gap-6 text-xs text-muted-foreground font-medium">
              <span className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4" />
                {date}
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="w-4 h-4" />
                {readingTime}
              </span>
            </div>
          </div>
        </div>

        {/* Article Cover Image */}
        {imageUrl && (
          <div className="w-full h-[400px] rounded-3xl overflow-hidden border border-border/15 mb-16 relative">
            <img src={imageUrl} alt={title} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
          </div>
        )}

        {/* Layout: Main Reading Space & Sticky Shares */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-20">
          
          {/* Left Column: Sticky Share Actions */}
          <div className="lg:col-span-1 lg:sticky lg:top-24 flex lg:flex-col gap-4 justify-center items-center">
            <span className="text-[9px] uppercase tracking-widest text-muted-foreground hidden lg:block mb-1">Share</span>
            <button
              onClick={handleCopyLink}
              className="w-10 h-10 rounded-xl border border-border/15 bg-card flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/20 transition-all shadow-md focus:outline-none"
              title="Copy Link"
            >
              {copied ? <Check className="w-4 h-4 text-accent" /> : <Copy className="w-4 h-4" />}
            </button>
            <a
              href={`https://www.linkedin.com/sharing/share-offsite/?url=${typeof window !== "undefined" ? encodeURIComponent(window.location.href) : ""}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-xl border border-border/15 bg-card flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/20 transition-all shadow-md"
              title="Share on LinkedIn"
            >
              <Linkedin className="w-4 h-4" />
            </a>
            <a
              href={`https://twitter.com/intent/tweet?url=${typeof window !== "undefined" ? encodeURIComponent(window.location.href) : ""}&text=${encodeURIComponent(title)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-xl border border-border/15 bg-card flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/20 transition-all shadow-md"
              title="Share on Twitter"
            >
              <Twitter className="w-4 h-4" />
            </a>
          </div>

          {/* Center Column: Core Content */}
          <div className="lg:col-span-8 flex flex-col gap-6">
            <article className="prose prose-invert max-w-none text-muted-foreground font-light leading-relaxed text-base space-y-6">
              {content.map((sec, idx) => {
                if (sec.type === "paragraph") {
                  return (
                    <p key={idx} className="leading-relaxed">
                      {sec.text}
                    </p>
                  );
                } else if (sec.type === "heading") {
                  return (
                    <h2 key={idx} className="text-xl md:text-2xl font-black text-foreground tracking-tight font-heading mt-8 mb-4">
                      {sec.text}
                    </h2>
                  );
                } else if (sec.type === "quote") {
                  return (
                    <div
                      key={idx}
                      className="my-8 p-6 rounded-2xl border-l-4 border-accent bg-[#0e0c1b]/35 border-border/5"
                    >
                      <p className="text-base md:text-lg italic text-foreground font-medium leading-relaxed mb-2">
                        &ldquo;{sec.text}&rdquo;
                      </p>
                      <span className="text-[10px] uppercase font-bold tracking-widest text-primary">— Contributed Analysis</span>
                    </div>
                  );
                } else if (sec.type === "list" && sec.items) {
                  return (
                    <ul key={idx} className="list-disc pl-6 space-y-3 my-4">
                      {sec.items.map((item, itemIdx) => (
                        <li key={itemIdx} className="leading-relaxed text-sm font-light">
                          {item}
                        </li>
                      ))}
                    </ul>
                  );
                }
                return null;
              })}
            </article>

            {/* Tags area */}
            <div className="flex flex-wrap gap-2 mt-8 pt-6 border-t border-border/10">
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 rounded-lg text-[10px] font-semibold bg-muted/40 border border-border/10 text-muted-foreground hover:border-primary/20 transition-colors"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>

          {/* Right Column: Author Focus Details */}
          <div className="lg:col-span-3 p-6 rounded-3xl border border-border/10 bg-gradient-to-br from-[#0e0c1b]/25 to-transparent">
            <span className="text-[9px] font-bold text-accent tracking-[0.2em] uppercase mb-4 block">Contributor Bio</span>
            <img src={author.avatar} alt={author.name} className="w-14 h-14 rounded-full object-cover border border-border/20 mb-4" />
            <h4 className="text-sm font-bold text-foreground mb-0.5 leading-tight">{author.name}</h4>
            <span className="text-[10px] text-primary font-semibold mb-3 block">{author.title}</span>
            <p className="text-[11px] text-muted-foreground leading-normal font-light mb-4">
              {author.bio}
            </p>
            <div className="text-[10px] font-bold tracking-widest text-foreground uppercase border-t border-border/10 pt-4 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-accent animate-pulse" />
              Verified Expert
            </div>
          </div>

        </div>

        {/* Dynamic footer sign-off */}
        <div className="p-8 rounded-[2rem] border border-border/10 bg-gradient-to-r from-primary/10 via-transparent to-transparent flex flex-col md:flex-row items-center justify-between gap-6 mb-20">
          <div className="max-w-xl text-center md:text-left">
            <h4 className="text-base font-bold text-foreground mb-1 leading-tight">Interested in contributing to the portal?</h4>
            <p className="text-xs text-muted-foreground font-light leading-relaxed">
              We seek research briefs, architecture reviews, and systemic perspectives from institutional engineers, cybersecurity analysts, and system stewards.
            </p>
          </div>
          <Link href="/contact" className="px-5 py-3 text-xs font-bold uppercase tracking-widest bg-foreground text-background rounded-xl hover:scale-[1.02] active:scale-95 transition-all shadow-md shrink-0">
            Submit Proposal
          </Link>
        </div>

        {/* 7. Related Articles Block */}
        <div className="border-t border-border/10 pt-16">
          <h3 className="text-xl font-bold tracking-tight text-foreground font-heading mb-8">Related Intellectual Capital</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {relatedArticles.map((relArt) => (
              <ArticleCard key={relArt.id} article={relArt} />
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
