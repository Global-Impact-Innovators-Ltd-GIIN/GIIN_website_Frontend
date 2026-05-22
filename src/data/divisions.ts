export interface DivisionData {
  slug: string;
  name: string;
  themeColor: string;
  hero: {
    title: string;
    subtitle: string;
    description: string;
  };
  services: { title: string; description: string }[];
  caseStudies: { title: string; client: string; impact: string }[];
  portfolio: { title: string; category: string }[];
  statistics: { value: string; label: string }[];
  testimonials: { quote: string; author: string; role: string }[];
  resources: { title: string; type: string; link: string }[];
}

export const divisionsData: Record<string, DivisionData> = {
  "leadership-institute": {
    slug: "leadership-institute",
    name: "GIIN Leadership Institute",
    themeColor: "from-amber-500/20 to-transparent", // Gold theme
    hero: {
      title: "Forging Visionary Leaders",
      subtitle: "Empowering the next generation of African pioneers.",
      description: "Our Leadership Institute equips executives, entrepreneurs, and policymakers with the strategic frameworks required to drive national transformation.",
    },
    services: [
      { title: "Executive Education", description: "Immersive programs for C-level executives." },
      { title: "Policy Fellowships", description: "Bridging the gap between innovation and governance." },
      { title: "Youth Leadership Incubator", description: "Accelerating the trajectory of young talent." },
      { title: "Corporate Governance", description: "Building resilient and ethical enterprise boards." },
    ],
    caseStudies: [
      { title: "Transforming Public Sector Leadership", client: "Gov of Rwanda", impact: "Trained 500+ senior officials" },
      { title: "Corporate Turnaround", client: "Pan-African Bank", impact: "Re-structured executive board" },
    ],
    portfolio: [
      { title: "2025 Leadership Cohort", category: "Program" },
      { title: "Women in Tech Leadership", category: "Initiative" },
    ],
    statistics: [
      { value: "50,000+", label: "Leaders Trained" },
      { value: "45", label: "Nations Represented" },
      { value: "150+", label: "Faculty Experts" },
    ],
    testimonials: [
      { quote: "The most transformative leadership program on the continent.", author: "Dr. Sarah O.", role: "CEO, TechCorp" },
    ],
    resources: [
      { title: "2026 Leadership Prospectus", type: "PDF", link: "#" },
      { title: "The Agile Executive Guide", type: "Whitepaper", link: "#" },
    ],
  },
  "technologies": {
    slug: "technologies",
    name: "GIIN Technologies",
    themeColor: "from-blue-600/20 to-transparent", // Deep Blue theme
    hero: {
      title: "Scalable Enterprise Software",
      subtitle: "Building the digital infrastructure of tomorrow.",
      description: "We engineer high-performance software, AI systems, and cloud architectures that power the most ambitious enterprises across the globe.",
    },
    services: [
      { title: "Custom Software Engineering", description: "Full-stack development of enterprise web and mobile apps." },
      { title: "AI & Machine Learning", description: "Implementing RAG architectures and predictive models." },
      { title: "Cloud Native Architecture", description: "Kubernetes and serverless deployments on AWS/Azure." },
      { title: "API Integrations", description: "Seamless ecosystem connectivity via GraphQL and REST." },
    ],
    caseStudies: [
      { title: "Fintech Core Banking Migration", client: "FinBank Africa", impact: "Zero downtime migration for 2M users" },
      { title: "AI Supply Chain Optimization", client: "AgriTech Logistics", impact: "Reduced waste by 34%" },
    ],
    portfolio: [
      { title: "GIIN Internal ERP", category: "Enterprise App" },
      { title: "HealthTech Patient Portal", category: "Mobile App" },
    ],
    statistics: [
      { value: "200+", label: "Projects Delivered" },
      { value: "99.99%", label: "Uptime SLA" },
      { value: "50M+", label: "API Calls Daily" },
    ],
    testimonials: [
      { quote: "GIIN Technologies delivered our product 2 months ahead of schedule with flawless architecture.", author: "James T.", role: "CTO" },
    ],
    resources: [
      { title: "State of African Tech 2026", type: "Report", link: "#" },
      { title: "Cloud Migration Checklist", type: "Toolkit", link: "#" },
    ],
  },
  "cyber-defense": {
    slug: "cyber-defense",
    name: "GIIN Cyber Defense",
    themeColor: "from-red-600/20 to-transparent", // Crimson theme
    hero: {
      title: "Uncompromising Security",
      subtitle: "Protecting critical infrastructure from advanced threats.",
      description: "Enterprise-grade cybersecurity services including penetration testing, zero-trust architecture, and 24/7 proactive threat hunting.",
    },
    services: [
      { title: "Penetration Testing", description: "Deep vulnerability assessments of web, mobile, and APIs." },
      { title: "Zero-Trust Architecture", description: "Implementation of identity-first security models." },
      { title: "Incident Response", description: "Rapid containment and forensics for security breaches." },
      { title: "Compliance Auditing", description: "ISO 27001, GDPR, and NDPR readiness assessments." },
    ],
    caseStudies: [
      { title: "Securing National Grid", client: "Energy Corp", impact: "Thwarted 50+ APT attacks" },
      { title: "Fintech Compliance", client: "PayStream", impact: "Achieved PCI-DSS in 30 days" },
    ],
    portfolio: [
      { title: "Zero-Trust Implementation", category: "Architecture" },
      { title: "Red Team Assessment", category: "Audit" },
    ],
    statistics: [
      { value: "0", label: "Breaches Post-Implementation" },
      { value: "24/7", label: "SOC Monitoring" },
      { value: "5,000+", label: "Vulnerabilities Patched" },
    ],
    testimonials: [
      { quote: "Our data has never been more secure. The GIIN Cyber team is elite.", author: "Elena M.", role: "CISO" },
    ],
    resources: [
      { title: "2026 Threat Landscape", type: "Report", link: "#" },
      { title: "Incident Response Playbook", type: "Template", link: "#" },
    ],
  },
  "networking": {
    slug: "networking",
    name: "GIIN Networking Solutions",
    themeColor: "from-cyan-500/20 to-transparent", // Cyan theme
    hero: {
      title: "Connecting the Continent",
      subtitle: "High-bandwidth, low-latency infrastructure.",
      description: "Designing, deploying, and managing robust ISP networks, enterprise WANs, and fiber-optic infrastructures for the modern digital economy.",
    },
    services: [
      { title: "Enterprise SD-WAN", description: "Software-defined networking for multi-branch organizations." },
      { title: "Fiber Infrastructure", description: "Last-mile and backbone fiber-optic deployments." },
      { title: "Datacenter Solutions", description: "High-density rack network design and cooling." },
      { title: "5G & Wireless", description: "Private 5G networks for campus and industrial use." },
    ],
    caseStudies: [
      { title: "Campus-Wide Wi-Fi 6E", client: "National University", impact: "Connected 30,000 students" },
      { title: "Inter-city Fiber Link", client: "Telecom Ltd", impact: "Deployed 500km of backbone" },
    ],
    portfolio: [
      { title: "Lagos Tech Hub Network", category: "Infrastructure" },
      { title: "Financial District SD-WAN", category: "Enterprise WAN" },
    ],
    statistics: [
      { value: "10,000km+", label: "Fiber Deployed" },
      { value: "99.999%", label: "Network Reliability" },
      { value: "100+", label: "Datacenters Connected" },
    ],
    testimonials: [
      { quote: "GIIN Networking dramatically reduced our latency and boosted productivity.", author: "Ahmed K.", role: "VP Infrastructure" },
    ],
    resources: [
      { title: "SD-WAN Buyer's Guide", type: "PDF", link: "#" },
      { title: "Fiber Optic Spec Sheet", type: "Document", link: "#" },
    ],
  },
  "multimedia": {
    slug: "multimedia",
    name: "GIIN Multimedia Studios",
    themeColor: "from-fuchsia-500/20 to-transparent", // Fuchsia theme
    hero: {
      title: "Cinematic Storytelling",
      subtitle: "Crafting narratives that shift global paradigms.",
      description: "A world-class production house dedicated to high-end film, documentaries, podcasts, and digital media that amplify African innovation.",
    },
    services: [
      { title: "Documentary Production", description: "Award-winning visual storytelling of impact." },
      { title: "Podcast Network", description: "End-to-end audio production and syndication." },
      { title: "Corporate Branding", description: "High-end commercials and brand identity kits." },
      { title: "3D Animation & VFX", description: "Immersive visual effects and motion graphics." },
    ],
    caseStudies: [
      { title: "The Leapfrog Documentary", client: "Global Network", impact: "5M+ Views" },
      { title: "Tech Innovators Podcast", client: "Spotify Partner", impact: "Top 10 Tech Podcast in Africa" },
    ],
    portfolio: [
      { title: "Future of Africa (Film)", category: "Documentary" },
      { title: "FinBank Rebrand", category: "Commercial" },
    ],
    statistics: [
      { value: "50M+", label: "Content Impressions" },
      { value: "12", label: "Industry Awards" },
      { value: "500+", label: "Hours of Content" },
    ],
    testimonials: [
      { quote: "The visual quality and storytelling capability of GIIN Multimedia is unmatched.", author: "David W.", role: "Marketing Director" },
    ],
    resources: [
      { title: "Video Production Toolkit", type: "Guide", link: "#" },
      { title: "Podcast Launch Checklist", type: "PDF", link: "#" },
    ],
  },
  "business-consulting": {
    slug: "business-consulting",
    name: "GIIN Business Consulting",
    themeColor: "from-emerald-500/20 to-transparent", // Emerald theme
    hero: {
      title: "Strategic Enterprise Growth",
      subtitle: "Navigating complexity. Delivering results.",
      description: "We provide management consulting, digital transformation strategy, and financial advisory services for organizations looking to scale across Africa.",
    },
    services: [
      { title: "Digital Transformation", description: "Modernizing legacy systems and processes." },
      { title: "Market Entry Strategy", description: "Data-driven expansion plans for new territories." },
      { title: "Financial Advisory", description: "Capital raising and M&A consulting." },
      { title: "Operations Optimization", description: "Lean methodologies and supply chain efficiency." },
    ],
    caseStudies: [
      { title: "Pan-African Expansion", client: "RetailGiant", impact: "Successfully entered 3 new markets" },
      { title: "Digital Transformation", client: "Legacy Insure", impact: "Increased operational efficiency by 40%" },
    ],
    portfolio: [
      { title: "Market Analysis 2025", category: "Research" },
      { title: "M&A Deal Structuring", category: "Advisory" },
    ],
    statistics: [
      { value: "$1B+", label: "Deals Advised" },
      { value: "50+", label: "Market Entries" },
      { value: "300%", label: "Average Client ROI" },
    ],
    testimonials: [
      { quote: "GIIN Consulting provided the exact roadmap we needed to scale our operations globally.", author: "Grace L.", role: "COO" },
    ],
    resources: [
      { title: "Africa Market Entry Guide", type: "Whitepaper", link: "#" },
      { title: "Digital Transformation ROI Calculator", type: "Tool", link: "#" },
    ],
  },
};
