"use client";

import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Sparkles, BookOpen, UserCheck, Mail, ArrowRight, ShieldCheck, Cpu, Terminal, RefreshCw, BarChart2 } from "lucide-react";
import { Article, ARTICLES, CONTRIBUTORS } from "@/data/articles";
import { ArticleCard } from "./ArticleCard";
import Link from "next/link";

export function ArticlesHub() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [readingTimeFilter, setReadingTimeFilter] = useState("All");
  const [subscriptionEmail, setSubscriptionEmail] = useState("");
  const [subscribedStatus, setSubscribedStatus] = useState<"idle" | "loading" | "success">("idle");

  const categories = ["All", "Technology", "Leadership Development", "Cyber Defense", "Business Transformation"];

  // Find Featured and Trending
  const featuredArticle = useMemo(() => ARTICLES.find((a) => a.featured) || ARTICLES[0], []);
  const trendingArticles = useMemo(() => ARTICLES.filter((a) => a.trending && a.id !== featuredArticle.id), [featuredArticle]);

  // Filtered Articles List
  const filteredArticles = useMemo(() => {
    return ARTICLES.filter((article) => {
      // Category Match
      const matchesCategory = selectedCategory === "All" || article.category === selectedCategory;

      // Text Search Match
      const matchesSearch =
        searchQuery.trim() === "" ||
        article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        article.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
        article.author.name.toLowerCase().includes(searchQuery.toLowerCase());

      // Reading Time Match
      let matchesReadingTime = true;
      if (readingTimeFilter !== "All") {
        const timeNum = parseInt(article.readingTime);
        if (readingTimeFilter === "short") matchesReadingTime = timeNum < 7;
        else if (readingTimeFilter === "medium") matchesReadingTime = timeNum >= 7 && timeNum <= 9;
        else if (readingTimeFilter === "long") matchesReadingTime = timeNum > 9;
      }

      return matchesCategory && matchesSearch && matchesReadingTime;
    });
  }, [searchQuery, selectedCategory, readingTimeFilter]);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!subscriptionEmail) return;
    setSubscribedStatus("loading");
    setTimeout(() => {
      setSubscribedStatus("success");
      setSubscriptionEmail("");
    }, 1200);
  };

  const getCategoryIcon = (cat: string) => {
    switch (cat) {
      case "Technology": return Cpu;
      case "Leadership Development": return UserCheck;
      case "Cyber Defense": return ShieldCheck;
      case "Business Transformation": return RefreshCw;
      default: return BookOpen;
    }
  };

  return (
    <div className="w-full bg-[#03010b] text-slate-100 min-h-screen relative overflow-x-hidden pb-24">
      {/* Background spotlights */}
      <div className="absolute top-0 left-1/4 -translate-x-1/2 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[140px] pointer-events-none z-0" />
      <div className="absolute top-1/3 right-1/4 translate-x-1/2 w-[500px] h-[500px] bg-indigo-500/5 rounded-full blur-[120px] pointer-events-none z-0" />

      {/* Main Container */}
      <div className="container mx-auto px-6 max-w-7xl relative z-10 pt-16">
        
        {/* Editorial Header */}
        <div className="text-left max-w-3xl mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/15 border border-primary/20 text-primary-foreground text-[10px] font-bold uppercase tracking-[0.25em] mb-6">
            <Sparkles className="w-3.5 h-3.5 text-accent animate-pulse" />
            Intellectual Capital Hub
          </div>
          <h1 className="text-4xl md:text-6xl font-black text-foreground tracking-tighter font-heading mb-6 leading-none">
            The GIIN <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">Thought Leadership</span> Portal
          </h1>
          <p className="text-muted-foreground text-lg font-light leading-relaxed">
            Access the sovereign knowledge, critical security briefs, research insights, and technological blueprints shaping continental growth.
          </p>
        </div>

        {/* 1. Discover Pillar: Featured Article & Trending Insights */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-20">
          {/* Featured Editorial Cover */}
          <div className="lg:col-span-8">
            <h2 className="text-xs font-bold tracking-[0.3em] uppercase text-muted-foreground mb-4">FEATURED INSIGHT</h2>
            <div className="group relative rounded-[2.5rem] border border-border/10 bg-[#0e0c1b]/20 backdrop-blur-xl overflow-hidden hover:border-primary/30 transition-all duration-500 flex flex-col h-full shadow-2xl">
              {featuredArticle.imageUrl && (
                <div className="relative w-full h-[360px] overflow-hidden">
                  <img
                    src={featuredArticle.imageUrl}
                    alt={featuredArticle.title}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.02]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#03010b] via-transparent to-transparent opacity-80" />
                  <span className="absolute top-6 left-6 inline-flex items-center px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest bg-primary text-white backdrop-blur-md">
                    {featuredArticle.category}
                  </span>
                </div>
              )}
              <div className="p-8 md:p-10 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-2xl md:text-4xl font-extrabold tracking-tight font-heading text-foreground mb-4 leading-tight group-hover:text-primary transition-colors">
                    <Link href={`/blog/${featuredArticle.id}`}>
                      {featuredArticle.title}
                    </Link>
                  </h3>
                  <p className="text-muted-foreground leading-relaxed text-base font-light mb-8 max-w-2xl">
                    {featuredArticle.excerpt}
                  </p>
                </div>

                <div className="pt-6 border-t border-border/10 flex flex-wrap items-center justify-between gap-6">
                  <div className="flex items-center gap-3">
                    <img
                      src={featuredArticle.author.avatar}
                      alt={featuredArticle.author.name}
                      className="w-10 h-10 rounded-full object-cover border border-border/20"
                    />
                    <div className="flex flex-col">
                      <span className="text-sm font-semibold text-foreground/90">{featuredArticle.author.name}</span>
                      <span className="text-xs text-muted-foreground">{featuredArticle.author.title}, {featuredArticle.author.organization}</span>
                    </div>
                  </div>
                  <Link
                    href={`/blog/${featuredArticle.id}`}
                    className="inline-flex items-center gap-2 text-sm font-bold bg-primary text-white px-6 py-3.5 rounded-xl hover:bg-primary/90 transition-all shadow-xl"
                  >
                    Read Flagship Article
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Trending Insights Panel */}
          <div className="lg:col-span-4 flex flex-col justify-between">
            <div>
              <h2 className="text-xs font-bold tracking-[0.3em] uppercase text-muted-foreground mb-4">TRENDING INSIGHTS</h2>
              <div className="flex flex-col gap-4">
                {trendingArticles.map((article, idx) => (
                  <div
                    key={article.id}
                    className="group p-5 rounded-2xl border border-border/10 bg-[#0e0c1b]/10 hover:bg-[#0e0c1b]/30 hover:border-primary/20 transition-all duration-300 flex items-start gap-4"
                  >
                    <span className="text-2xl font-black text-primary/30 group-hover:text-primary transition-colors font-heading pt-1">
                      {String(idx + 1).padStart(2, "0")}
                    </span>
                    <div className="flex flex-col min-w-0">
                      <span className="text-[9px] font-bold uppercase tracking-widest text-primary/90 mb-1">{article.category}</span>
                      <h4 className="text-sm font-bold text-foreground/95 group-hover:text-foreground transition-colors leading-tight mb-2">
                        <Link href={`/blog/${article.id}`}>
                          {article.title}
                        </Link>
                      </h4>
                      <div className="flex items-center gap-2 text-[9px] text-muted-foreground">
                        <span>{article.author.name}</span>
                        <span>•</span>
                        <span>{article.readingTime}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Micro strategic quote */}
            <div className="p-6 rounded-2xl border border-border/10 bg-gradient-to-br from-primary/5 to-transparent mt-6">
              <span className="text-[9px] font-bold text-accent tracking-[0.2em] uppercase mb-2 block">GIIN Philosophy</span>
              <p className="text-xs italic text-muted-foreground/95 leading-relaxed font-light">
                &ldquo;We don't merely share information. We share ideas that help shape the future of African self-sufficiency and enterprise architectures.&rdquo;
              </p>
            </div>
          </div>
        </div>

        {/* 2. Explore Pillar: Domain Mesh Categories */}
        <div className="mb-20">
          <h2 className="text-xs font-bold tracking-[0.3em] uppercase text-muted-foreground mb-6">EXPLORE INTELLECTUAL DOMAINS</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.filter(c => c !== "All").map((cat) => {
              const CatIcon = getCategoryIcon(cat);
              const count = ARTICLES.filter(a => a.category === cat).length;
              return (
                <div
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`group p-6 rounded-3xl border transition-all duration-300 cursor-pointer flex items-center justify-between ${
                    selectedCategory === cat
                      ? "bg-primary/20 border-primary text-white shadow-xl shadow-primary/10"
                      : "border-border/10 bg-[#0e0c1b]/15 hover:border-primary/20 hover:bg-[#0e0c1b]/35"
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div className={`p-3 rounded-xl border transition-all ${
                      selectedCategory === cat
                        ? "bg-primary border-primary-foreground/20 text-white"
                        : "bg-muted/50 border-border/10 text-muted-foreground group-hover:text-primary group-hover:border-primary/20"
                    }`}>
                      <CatIcon className="w-5 h-5" />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-xs font-bold leading-tight tracking-tight text-foreground/90">{cat}</span>
                      <span className="text-[10px] text-muted-foreground mt-0.5">{count} Published Assets</span>
                    </div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-muted-foreground opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                </div>
              );
            })}
          </div>
        </div>

        {/* 3. Learn & Search Console */}
        <div className="border-t border-border/10 pt-16 mb-12">
          <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-6 mb-8">
            <div>
              <h2 className="text-2xl font-bold tracking-tight text-foreground font-heading mb-1">Knowledge Discovery Base</h2>
              <p className="text-xs text-muted-foreground">Filter strategic insights by keyword, dynamic domain categories, or reading duration.</p>
            </div>

            {/* Filter controls */}
            <div className="flex flex-wrap gap-4 items-center">
              {/* Search input */}
              <div className="relative min-w-[240px] flex-1 lg:flex-none">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search articles, authors..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 text-xs rounded-xl bg-card border border-border/10 focus:outline-none focus:border-primary/30 transition-colors"
                />
              </div>

              {/* Reading time filter */}
              <select
                value={readingTimeFilter}
                onChange={(e) => setReadingTimeFilter(e.target.value)}
                className="px-3.5 py-2 text-xs rounded-xl bg-card border border-border/10 text-muted-foreground focus:outline-none focus:border-primary/30 transition-colors"
              >
                <option value="All">All Reading Times</option>
                <option value="short">Quick Reads (&lt; 7m)</option>
                <option value="medium">Standard Reads (7m - 9m)</option>
                <option value="long">Deep Dives (&gt; 9m)</option>
              </select>
            </div>
          </div>

          {/* Category Tabs */}
          <div className="flex flex-wrap gap-2 border-b border-border/5 pb-6">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold border transition-all duration-300 ${
                  selectedCategory === cat
                    ? "bg-primary/10 border-primary text-primary-foreground"
                    : "border-transparent text-muted-foreground hover:text-foreground hover:bg-muted/30"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* 4. Article Grid */}
        <div className="relative mb-20 min-h-[300px]">
          <AnimatePresence mode="popLayout">
            {filteredArticles.length > 0 ? (
              <motion.div
                layout
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              >
                {filteredArticles.map((article) => (
                  <ArticleCard key={article.id} article={article} />
                ))}
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col items-center justify-center py-20 text-center border border-dashed border-border/10 rounded-[2rem]"
              >
                <BookOpen className="w-12 h-12 text-muted-foreground/30 mb-4" />
                <h3 className="text-lg font-bold text-foreground mb-1">No Knowledge Assets Found</h3>
                <p className="text-xs text-muted-foreground max-w-sm">
                  We couldn't find any articles matching &ldquo;{searchQuery}&rdquo; in category &ldquo;{selectedCategory}&rdquo;. Try widening your search filters.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* 5. Contributor Spotlight */}
        <div className="border-t border-border/10 pt-16 mb-20">
          <h2 className="text-xs font-bold tracking-[0.3em] uppercase text-muted-foreground mb-8 text-center">INTELLECTUAL CONTRIBUTORS</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {Object.values(CONTRIBUTORS).map((author, idx) => (
              <div
                key={idx}
                className="p-6 rounded-3xl border border-border/10 bg-[#0e0c1b]/10 flex flex-col items-center text-center group hover:border-primary/20 hover:bg-[#0e0c1b]/30 transition-all duration-300"
              >
                <img
                  src={author.avatar}
                  alt={author.name}
                  className="w-16 h-16 rounded-full object-cover border border-border/20 mb-4 group-hover:scale-105 transition-transform"
                />
                <h4 className="text-sm font-bold text-foreground mb-0.5">{author.name}</h4>
                <span className="text-[10px] font-semibold text-primary mb-3">{author.title}</span>
                <p className="text-[11px] text-muted-foreground leading-normal font-light line-clamp-3">
                  {author.bio}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* 6. Dispatch Hub: Premium Newsletter */}
        <div className="relative rounded-[2.5rem] border border-border/10 bg-gradient-to-br from-[#0e0c1b]/45 to-transparent p-10 md:p-16 overflow-hidden flex flex-col items-center text-center shadow-2xl">
          {/* Radial light spotlight */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-primary/10 rounded-full blur-[100px] pointer-events-none z-0" />
          
          <div className="relative z-10 max-w-xl flex flex-col items-center">
            <div className="w-12 h-12 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary-foreground mb-6 shadow-md">
              <Mail className="w-5 h-5 text-accent animate-pulse" />
            </div>
            
            <h2 className="text-2xl md:text-4xl font-extrabold tracking-tight font-heading text-foreground mb-4">
              Subscribe to the <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">GIIN Dispatch</span>
            </h2>
            <p className="text-sm text-muted-foreground font-light leading-relaxed mb-8">
              Receive premium, curated executive summaries, cybersecurity intelligence alerts, and advanced technological analysis notes, delivered bi-weekly.
            </p>

            <form onSubmit={handleSubscribe} className="w-full flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                placeholder="Enter institutional email..."
                value={subscriptionEmail}
                onChange={(e) => setSubscriptionEmail(e.target.value)}
                disabled={subscribedStatus === "success"}
                className="flex-1 px-5 py-3.5 text-xs rounded-xl bg-card border border-border/10 focus:outline-none focus:border-primary/30 disabled:opacity-50 text-foreground transition-all"
                required
              />
              <button
                type="submit"
                disabled={subscribedStatus !== "idle"}
                className="group relative px-6 py-3.5 bg-primary text-white font-bold text-xs uppercase tracking-widest rounded-xl overflow-hidden shadow-xl disabled:opacity-50 transition-all hover:scale-[1.02]"
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  {subscribedStatus === "idle" && "Subscribe"}
                  {subscribedStatus === "loading" && "Processing..."}
                  {subscribedStatus === "success" && "Subscribed!"}
                </span>
              </button>
            </form>

            {subscribedStatus === "success" && (
              <motion.span
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-xs text-primary mt-4 font-semibold"
              >
                Subscription confirmed. Welcome to the intelligence network.
              </motion.span>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
