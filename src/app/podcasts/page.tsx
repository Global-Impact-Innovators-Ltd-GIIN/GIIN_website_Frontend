import { MediaGrid } from "@/components/organisms/leadership/MediaGrid";
import { podcastData } from "@/data/leadership";
import { FooterSection } from "@/components/organisms/home/FooterSection";

export default function PodcastsPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between bg-black">
      <div className="w-full pt-20">
        <MediaGrid 
          title="GIIN Podcasts" 
          description="Listen to deep-dive conversations with industry titans on innovation, technology, and global leadership."
          items={podcastData}
        />
      </div>
      <FooterSection />
    </main>
  );
}
