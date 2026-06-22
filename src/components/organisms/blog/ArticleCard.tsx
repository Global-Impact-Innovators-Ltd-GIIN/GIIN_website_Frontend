"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { BookOpen, Clock, Calendar, ArrowRight } from "lucide-react";
import { Article } from "@/data/articles";

interface ArticleCardProps {
  article: Article;
}

export function ArticleCard({ article }: ArticleCardProps) {
  const { id, title, excerpt, date, category, tags, readingTime, author, imageUrl } = article;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5 }}
      className="group relative flex flex-col h-full rounded-[2rem] border border-border/15 bg-[#0e0c1b]/30 backdrop-blur-xl overflow-hidden hover:border-primary/40 hover:shadow-2xl hover:shadow-primary/5 transition-all duration-500"
    >
      {/* Background Subtle Glow on Hover */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

      {/* Image Container with Zoom effect */}
      {imageUrl && (
        <div className="relative w-full h-48 overflow-hidden">
          <img
            src={imageUrl}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#06040d] via-transparent to-transparent opacity-60" />
          <span className="absolute top-4 left-4 inline-flex items-center px-3 py-1 rounded-full text-[9px] font-bold uppercase tracking-widest bg-background/80 border border-primary/20 text-primary-foreground backdrop-blur-md">
            {category}
          </span>
        </div>
      )}

      {/* Content wrapper */}
      <div className="flex flex-col flex-1 p-8">
        {!imageUrl && (
          <span className="inline-flex w-fit items-center px-3 py-1 rounded-full text-[9px] font-bold uppercase tracking-widest bg-primary/10 border border-primary/25 text-primary-foreground mb-4">
            {category}
          </span>
        )}

        {/* Title */}
        <h3 className="text-xl font-bold tracking-tight text-foreground font-heading mb-3 group-hover:text-primary transition-colors duration-300 leading-snug">
          <Link href={`/blog/${id}`} className="hover:underline focus:outline-none">
            {title}
          </Link>
        </h3>

        {/* Excerpt */}
        <p className="text-muted-foreground text-sm font-light leading-relaxed mb-6 line-clamp-3">
          {excerpt}
        </p>

        {/* Meta data: Date & Reading Time */}
        <div className="flex items-center gap-4 text-[10px] text-muted-foreground font-medium mb-6">
          <span className="flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5" />
            {date}
          </span>
          <span className="w-1 h-1 rounded-full bg-border" />
          <span className="flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5" />
            {readingTime}
          </span>
        </div>

        {/* Author Bio Area */}
        <div className="mt-auto pt-6 border-t border-border/10 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 min-w-0">
            <img
              src={author.avatar}
              alt={author.name}
              className="w-9 h-9 rounded-full object-cover border border-border/20"
            />
            <div className="flex flex-col min-w-0">
              <span className="text-xs font-semibold text-foreground/90 truncate">{author.name}</span>
              <span className="text-[10px] text-muted-foreground truncate">{author.title}, {author.organization}</span>
            </div>
          </div>

          <Link
            href={`/blog/${id}`}
            className="inline-flex w-8 h-8 rounded-lg items-center justify-center bg-primary/10 border border-primary/20 text-foreground group-hover:bg-primary group-hover:text-white transition-all duration-300"
            aria-label="Read Article"
          >
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
