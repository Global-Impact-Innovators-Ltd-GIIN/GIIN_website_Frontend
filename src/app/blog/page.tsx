import { ArticlesHub } from "@/components/organisms/blog/ArticlesHub";
import { FooterSection } from "@/components/organisms/home/FooterSection";

export default function BlogPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between bg-[#03010b]">
      <div className="w-full pt-20">
        <ArticlesHub />
      </div>
      <FooterSection />
    </main>
  );
}
