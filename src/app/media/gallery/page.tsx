import { LightboxGallery } from "@/components/organisms/media/LightboxGallery";
import { FooterSection } from "@/components/organisms/home/FooterSection";

export default function MediaGalleryPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between bg-black">
      <div className="w-full pt-20">
        <LightboxGallery />
      </div>
      <FooterSection />
    </main>
  );
}
