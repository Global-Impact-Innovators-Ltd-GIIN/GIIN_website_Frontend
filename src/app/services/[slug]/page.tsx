import { notFound } from "next/navigation";
import { servicesData } from "@/data/services";
import { ServiceHero } from "@/components/organisms/services/ServiceHero";
import { ServicePricing } from "@/components/organisms/services/ServicePricing";
import { ProjectEstimator } from "@/components/organisms/services/ProjectEstimator";
import { ConsultationForm } from "@/components/organisms/divisions/ConsultationForm";
import { FooterSection } from "@/components/organisms/home/FooterSection";

interface PageProps {
  params: Promise<{ slug: string }>;
}

// Generate static params for SSG
export async function generateStaticParams() {
  return Object.keys(servicesData).map((slug) => ({
    slug,
  }));
}

export default async function ServicePage({ params }: PageProps) {
  const { slug } = await params;
  const data = servicesData[slug];

  if (!data) {
    notFound();
  }

  // We reuse the ConsultationForm from divisions, but we'll mock a division data object for it to work
  const consultationData = {
    slug: data.slug,
    name: data.title,
    themeColor: "from-primary/20 to-transparent",
    hero: { title: "", subtitle: "", description: "" },
    services: [], caseStudies: [], portfolio: [], statistics: [], testimonials: [], resources: []
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between bg-black">
      {/* 1. Hero */}
      <ServiceHero data={data} />
      
      {/* 2. Interactive Estimator */}
      <ProjectEstimator data={data} />

      {/* 3. Pricing */}
      <ServicePricing data={data} />

      {/* 4. Consultation Form (Reused) */}
      <ConsultationForm data={consultationData} />

      {/* 5. Footer */}
      <FooterSection />
    </main>
  );
}
