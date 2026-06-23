"use client";

import React from "react";
import { LearningHero } from "@/components/learning-center/LearningHero";
import { FeaturedPrograms } from "@/components/learning-center/FeaturedPrograms";
import { LearningCategories } from "@/components/learning-center/LearningCategories";
import { LearningPaths } from "@/components/learning-center/LearningPaths";
import { CourseCatalog, Course } from "@/components/learning-center/CourseCatalog";
import { LearningFeatures } from "@/components/learning-center/LearningFeatures";
import { CertificationsSection } from "@/components/learning-center/CertificationsSection";
import { InstructorsSection } from "@/components/learning-center/InstructorsSection";
import { SuccessStories } from "@/components/learning-center/SuccessStories";
import { DashboardPreview } from "@/components/learning-center/DashboardPreview";
import { LearningCommunity } from "@/components/learning-center/LearningCommunity";
import { EnrollmentHub } from "@/components/learning-center/EnrollmentHub";
import { ImpactMetrics } from "@/components/learning-center/ImpactMetrics";
import { LearningCTA } from "@/components/learning-center/LearningCTA";
import { FooterSection } from "@/components/organisms/home/FooterSection";

export default function LearningCenterPage() {
  
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleEnrollClick = (course: Course) => {
    // When user triggers enroll on a course card, scroll down to the enrollment form automatically
    scrollToSection("enrollment-hub");
  };

  return (
    <main className="min-h-screen bg-[#050816] text-white flex flex-col justify-start select-none relative font-sans overflow-x-hidden">
      
      {/* 1. Hero Section */}
      <LearningHero
        onExplorePaths={() => scrollToSection("learning-paths")}
        onStartLearning={() => scrollToSection("course-catalog")}
      />

      {/* 2. Flagship Programs */}
      <div id="featured-programs" className="w-full">
        <FeaturedPrograms onSelectProgram={(programId) => scrollToSection("course-catalog")} />
      </div>

      {/* 3. Learning Categories */}
      <div id="categories" className="w-full">
        <LearningCategories onSelectCategory={(catId) => scrollToSection("course-catalog")} />
      </div>

      {/* 4. Learning Paths (Flagship Interactive Timeline Roadmap) */}
      <div id="learning-paths" className="w-full">
        <LearningPaths />
      </div>

      {/* 5. Course Catalog (Functional state search + filters + enrollment hooks) */}
      <div id="course-catalog" className="w-full">
        <CourseCatalog onEnrollClick={handleEnrollClick} />
      </div>

      {/* 6. Learning Experience Features */}
      <div id="learning-features" className="w-full">
        <LearningFeatures />
      </div>

      {/* 7. Certifications & Badges (Verification Portal widget) */}
      <div id="certifications" className="w-full">
        <CertificationsSection />
      </div>

      {/* 8. Instructors Section */}
      <div id="instructors" className="w-full">
        <InstructorsSection />
      </div>

      {/* 9. Success Stories (Student testimonial slider) */}
      <div id="testimonials" className="w-full">
        <SuccessStories />
      </div>

      {/* 10. Dashboard Preview (Mock LMS SaaS console layout) */}
      <div id="dashboard-preview" className="w-full">
        <DashboardPreview />
      </div>

      {/* 11. Learning Community (Events calendar, chapters logs) */}
      <div id="learning-community" className="w-full">
        <LearningCommunity />
      </div>

      {/* 12. Enrollment Hub (Validated account admission form) */}
      <div id="enrollment-hub" className="w-full">
        <EnrollmentHub />
      </div>

      {/* 13. Impact Metrics (Dynamic Counter stats) */}
      <div id="impact-metrics" className="w-full">
        <ImpactMetrics />
      </div>

      {/* 14. Final Call To Action */}
      <div id="learning-cta" className="w-full">
        <LearningCTA
          onExploreCourses={() => scrollToSection("course-catalog")}
          onJoinCommunity={() => scrollToSection("learning-community")}
          onStartToday={() => scrollToSection("enrollment-hub")}
        />
      </div>

      {/* Main footer layout section from the theme organisms */}
      <FooterSection />

    </main>
  );
}
