import React from 'react';
import ResearchHero from "@/components/research/ResearchHero";
import FeaturedResearch from "@/components/research/FeaturedResearch";
import ResearchCategories from "@/components/research/ResearchCategories";
import ResearchLibrary from "@/components/research/ResearchLibrary";
import SearchDiscovery from "@/components/research/SearchDiscovery";
import ResearchImpactDashboard from "@/components/research/ResearchImpactDashboard";
import ResearchAreas from "@/components/research/ResearchAreas";
import ContributorsSection from "@/components/research/ContributorsSection";
import WhitePapersSection from "@/components/research/WhitePapersSection";
import CollaborationHub from "@/components/research/CollaborationHub";
import ResearchNewsletter from "@/components/research/ResearchNewsletter";
import ResearchCTA from "@/components/research/ResearchCTA";

export const metadata = {
    title: "Research & Knowledge Repository | GIIN",
    description: "Explore evidence-based insights, innovation studies, leadership research, strategic reports, and knowledge resources designed to shape the future of organizations, communities, and nations.",
};

export default function ResearchPlatformPage() {
    return (
        <div className="bg-[#050816] min-h-screen text-white pt-24 font-inter">
            <ResearchHero />
            <FeaturedResearch />
            <ResearchCategories />
            <SearchDiscovery />
            <ResearchLibrary />
            <ResearchImpactDashboard />
            <ResearchAreas />
            <WhitePapersSection />
            <ContributorsSection />
            <CollaborationHub />
            <ResearchNewsletter />
            <ResearchCTA />
        </div>
    );
}
