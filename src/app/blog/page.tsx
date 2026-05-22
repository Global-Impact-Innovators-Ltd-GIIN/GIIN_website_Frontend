import { ArticleList } from "@/components/organisms/leadership/ArticleList";
import { blogData } from "@/data/leadership";
import { FooterSection } from "@/components/organisms/home/FooterSection";

export default function BlogPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between bg-black">
      <div className="w-full pt-20">
        <ArticleList 
          title="Leadership Blog" 
          description="Insights, strategies, and thought leadership from GIIN executives and industry pioneers."
          items={blogData}
        />
      </div>
      <FooterSection />
    </main>
  );
}
