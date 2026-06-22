"use client";

import React, { use } from "react";
import { ARTICLES } from "@/data/articles";
import { ArticleReader } from "@/components/organisms/blog/ArticleReader";
import { FooterSection } from "@/components/organisms/home/FooterSection";
import Link from "next/link";
import { BookOpen, ArrowLeft } from "lucide-react";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function ArticlePage({ params }: PageProps) {
  const resolvedParams = use(params);
  const article = ARTICLES.find((a) => a.id === resolvedParams.id);

  if (!article) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center bg-[#03010b] text-slate-200 text-center p-6">
        <BookOpen className="w-16 h-16 text-primary mb-6" />
        <h1 className="text-3xl font-black font-heading mb-4">Article Not Found</h1>
        <p className="text-sm text-muted-foreground max-w-sm mb-8">
          The requested thought leadership asset does not exist or has been archived.
        </p>
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest bg-primary text-white px-6 py-3.5 rounded-xl hover:bg-primary/90 transition-all"
        >
          <ArrowLeft className="w-4 h-4" />
          Return to Hub
        </Link>
      </main>
    );
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between bg-[#03010b]">
      <div className="w-full pt-20">
        <ArticleReader article={article} />
      </div>
      <FooterSection />
    </main>
  );
}
