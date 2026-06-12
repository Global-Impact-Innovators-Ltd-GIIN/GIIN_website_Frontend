import type { Metadata } from "next";
import AboutClient from "./AboutClient";

export const metadata: Metadata = {
  title: "About Us | GIIN | Global Impact Innovators",
  description: "Discover Global Impact Innovators Ltd (GIIN). Building Africa's future through leadership development, sovereign technology solutions, research, education, and multimedia systems.",
  keywords: [
    "GIIN",
    "About GIIN",
    "Global Impact Innovators",
    "Africa Technology",
    "African Leadership",
    "Business Consulting Africa",
    "Sovereign Tech"
  ],
  openGraph: {
    title: "About Us | GIIN | Global Impact Innovators",
    description: "Discover Global Impact Innovators Ltd (GIIN). Building Africa's future through leadership development, sovereign technology solutions, research, education, and multimedia systems.",
    url: "https://giin.org/about",
    type: "website",
    siteName: "Global Impact Innovators Network",
  }
};

export default function Page() {
  return <AboutClient />;
}
