import React from "react";
import type { Metadata } from "next";
import CorePrinciplesContainer from "@/components/core-principles/CorePrinciplesContainer";

// SEO Metadata for the constitutional blueprint
export const metadata: Metadata = {
  title: "Core Principles | GIIN Ecosystem",
  description:
    "The constitutional blueprint of the Global Impact Innovation Network. Explore the values, leadership expectations, culture standards, and commitments guiding global innovation.",
  openGraph: {
    title: "Core Principles | GIIN Ecosystem",
    description:
      "The constitutional blueprint of the Global Impact Innovation Network. Explore our core values, leadership standards, and decision-making framework.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Core Principles | GIIN Ecosystem",
    description:
      "The constitutional blueprint of the Global Impact Innovation Network. Explore our core values, leadership standards, and decision-making framework.",
  },
};

export default function CorePrinciplesPage() {
  return <CorePrinciplesContainer />;
}
