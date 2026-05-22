import { MentorDirectory } from "@/components/organisms/leadership/MentorDirectory";
import { FooterSection } from "@/components/organisms/home/FooterSection";

export default function CommunityPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between bg-black">
      <div className="w-full pt-20">
        <MentorDirectory />
      </div>
      <FooterSection />
    </main>
  );
}
