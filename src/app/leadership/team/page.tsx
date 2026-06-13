import React from 'react';
import LeadershipHero from '@/components/leadership-team/LeadershipHero';
import ExecutiveLeadership from '@/components/leadership-team/ExecutiveLeadership';
import ExpertiseSection from '@/components/leadership-team/ExpertiseSection';
import OrganizationChart from '@/components/leadership-team/OrganizationChart';
import LeadershipPhilosophy from '@/components/leadership-team/LeadershipPhilosophy';
import AchievementsSection from '@/components/leadership-team/AchievementsSection';
import DepartmentLeads from '@/components/leadership-team/DepartmentLeads';
import AdvisoryBoard from '@/components/leadership-team/AdvisoryBoard';
import LeadershipCulture from '@/components/leadership-team/LeadershipCulture';
import LeadershipContact from '@/components/leadership-team/LeadershipContact';
import LeadershipCTA from '@/components/leadership-team/LeadershipCTA';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Leadership Team | Global Impact Innovators Ltd (GIIN)',
    description: 'Meet the visionary leaders, innovators, and strategists building the GIIN Ecosystem and driving transformational impact across Africa.',
};

export default function LeadershipTeamPage() {
    return (
        <main className="min-h-screen bg-background text-foreground scroll-smooth">
            <LeadershipHero />

            <div id="executive-leadership">
                <ExecutiveLeadership />
            </div>

            <div id="expertise">
                <ExpertiseSection />
            </div>

            <div id="structure">
                <OrganizationChart />
            </div>

            <div id="philosophy">
                <LeadershipPhilosophy />
            </div>

            <div id="achievements">
                <AchievementsSection />
            </div>

            <div id="departments">
                <DepartmentLeads />
            </div>

            <div id="advisory">
                <AdvisoryBoard />
            </div>

            <div id="culture">
                <LeadershipCulture />
            </div>

            <div id="contact">
                <LeadershipContact />
            </div>

            <div id="cta">
                <LeadershipCTA />
            </div>
        </main>
    );
}
