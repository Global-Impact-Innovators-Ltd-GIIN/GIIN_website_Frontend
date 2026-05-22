import { notFound } from "next/navigation";
import { divisionsData } from "@/data/divisions";
import { DivisionHero } from "@/components/organisms/divisions/DivisionHero";
import { DivisionServices } from "@/components/organisms/divisions/DivisionServices";
import { DivisionStatsAndShowcase } from "@/components/organisms/divisions/DivisionStatsAndShowcase";
import { ConsultationForm } from "@/components/organisms/divisions/ConsultationForm";
import { FooterSection } from "@/components/organisms/home/FooterSection";

interface PageProps {
  params: Promise<{ slug: string }>;
}

// Generate static params for SSG (optional but highly recommended for performance)
export async function generateStaticParams() {
  return Object.keys(divisionsData).map((slug) => ({
    slug,
  }));
}

export default async function DivisionPage({ params }: PageProps) {
  const { slug } = await params;
  const data = divisionsData[slug];

  if (!data) {
    notFound();
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between bg-black">
      {/* 1. Hero Section */}
      <DivisionHero data={data} />
      
      {/* 2. Services Section */}
      <DivisionServices data={data} />

      {/* 3. Statistics, Case Studies & Testimonials */}
      <DivisionStatsAndShowcase data={data} />

      {/* 4. Consultation & Lead Gen */}
      <ConsultationForm data={data} />

      {/* Reusing Global Footer */}
      <FooterSection />
    </main>
  );
}
