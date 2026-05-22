import { LiveStreamHero } from "@/components/organisms/media/LiveStreamHero";
import { CinematicGrid } from "@/components/organisms/media/CinematicGrid";
import { GlobalAudioPlayer } from "@/components/organisms/media/GlobalAudioPlayer";
import { FooterSection } from "@/components/organisms/home/FooterSection";

export default function MediaHubPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between bg-black relative">
      <div className="w-full">
        {/* Live Stream Keynote Player */}
        <LiveStreamHero />
        
        {/* Netflix-style horizontal scroll */}
        <CinematicGrid />
      </div>
      
      {/* Global persistent audio player mockup */}
      <GlobalAudioPlayer />

      <FooterSection />
    </main>
  );
}
