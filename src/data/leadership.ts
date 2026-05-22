export interface ContentItem {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  category: string;
  author?: string;
  thumbnail?: string;
  duration?: string; // For podcasts/media
  location?: string; // For events
}

export interface Mentor {
  id: string;
  name: string;
  title: string;
  company: string;
  expertise: string[];
  availability: string;
}

export const blogData: ContentItem[] = [
  { id: "b1", title: "The Future of AI in Enterprise Architecture", excerpt: "How LLMs are reshaping microservices.", date: "May 12, 2026", category: "Thought Leadership", author: "Dr. Sarah O." },
  { id: "b2", title: "Leading Through Digital Disruption", excerpt: "Strategies for executives navigating the AI wave.", date: "May 10, 2026", category: "Leadership", author: "James T." },
  { id: "b3", title: "Zero-Trust: The New Perimeter", excerpt: "Why perimeter security is dead and what comes next.", date: "May 05, 2026", category: "Cybersecurity", author: "Elena M." }
];

export const podcastData: ContentItem[] = [
  { id: "p1", title: "GIIN Voices: The CEO's Dilemma", excerpt: "Balancing quarterly profits with decade-long R&D.", date: "May 15, 2026", category: "Podcast", duration: "45:00", thumbnail: "bg-blue-900" },
  { id: "p2", title: "Innovation Labs: Inside Quantum Computing", excerpt: "A deep dive with GIIN's lead researchers.", date: "May 08, 2026", category: "Podcast", duration: "1:12:00", thumbnail: "bg-purple-900" },
  { id: "p3", title: "Cyber Threats in 2027", excerpt: "What the dark web is planning next.", date: "May 01, 2026", category: "Podcast", duration: "55:30", thumbnail: "bg-red-900" }
];

export const eventsData: ContentItem[] = [
  { id: "e1", title: "Global Innovation Summit 2026", excerpt: "The premier gathering of tech executives in Africa.", date: "August 15-18, 2026", category: "Summit", location: "Kigali, Rwanda" },
  { id: "e2", title: "AI Security Masterclass", excerpt: "Securing language models against prompt injection.", date: "June 10, 2026", category: "Webinar", location: "Virtual" },
  { id: "e3", title: "GIIN Hackathon: FinTech Future", excerpt: "Build the next payment rail. $50k prize pool.", date: "July 20-22, 2026", category: "Competition", location: "Lagos, Nigeria" }
];

export const researchData: ContentItem[] = [
  { id: "r1", title: "State of Cloud Adoption in Emerging Markets", excerpt: "A 50-page deep dive into infrastructure growth.", date: "April 2026", category: "Whitepaper" },
  { id: "r2", title: "Quantum Cryptography Frameworks", excerpt: "Preparing legacy systems for post-quantum reality.", date: "March 2026", category: "Publication" }
];

export const mentorsData: Mentor[] = [
  { id: "m1", name: "David Chen", title: "Former CTO", company: "Global FinTech", expertise: ["Scaling Engineering", "M&A"], availability: "Accepting Mentees" },
  { id: "m2", name: "Aisha Diallo", title: "Managing Partner", company: "Venture Capital Partners", expertise: ["Fundraising", "Go-To-Market"], availability: "Waitlist" },
  { id: "m3", name: "Marcus Johnson", title: "CISO", company: "Enterprise Cyber Solutions", expertise: ["Zero-Trust", "Compliance"], availability: "Accepting Mentees" }
];
