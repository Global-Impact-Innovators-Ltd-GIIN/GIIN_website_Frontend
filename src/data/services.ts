export interface PricingTier {
  name: string;
  price: string;
  description: string;
  features: string[];
}

export interface EstimatorOption {
  id: string;
  label: string;
  options: { label: string; value: number }[];
}

export interface ServiceData {
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  pricing: PricingTier[];
  estimatorSteps: EstimatorOption[];
}

export const servicesData: Record<string, ServiceData> = {
  "software-engineering": {
    slug: "software-engineering",
    title: "Software Engineering",
    subtitle: "Custom enterprise software solutions.",
    description: "End-to-end custom software development from architecture design to deployment and scaling.",
    pricing: [
      { name: "Growth", price: "Custom", description: "For scaling startups.", features: ["Dedicated Team", "Agile Sprints", "Cloud Architecture"] },
      { name: "Enterprise", price: "Custom", description: "For massive scale.", features: ["Microservices", "24/7 SLA", "Dedicated DevOps"] },
      { name: "Strategic Partner", price: "Custom", description: "Joint ventures.", features: ["Equity Models", "CTO as a Service", "IP Co-creation"] }
    ],
    estimatorSteps: [
      { id: "scale", label: "Expected User Base", options: [{label: "< 10k", value: 1}, {label: "10k - 100k", value: 2}, {label: "1M+", value: 4}] },
      { id: "platform", label: "Target Platforms", options: [{label: "Web Only", value: 1}, {label: "Web + Mobile", value: 2}, {label: "Omnichannel", value: 3}] }
    ]
  },
  "ai-development": {
    slug: "ai-development",
    title: "AI Development",
    subtitle: "Intelligence at scale.",
    description: "Custom Large Language Models, RAG architectures, and predictive analytics for the enterprise.",
    pricing: [
      { name: "Pilot", price: "Custom", description: "Proof of concept.", features: ["Data Audit", "Base Model Fine-tuning", "Internal Tooling"] },
      { name: "Production", price: "Custom", description: "Live AI integration.", features: ["RAG Pipeline", "API Gateway", "Analytics Dashboard"] },
      { name: "Autonomous", price: "Custom", description: "AI Agents.", features: ["Multi-Agent Systems", "Auto-scaling", "Continuous Learning"] }
    ],
    estimatorSteps: [
      { id: "data", label: "Data Volume", options: [{label: "Gigabytes", value: 1}, {label: "Terabytes", value: 3}, {label: "Petabytes", value: 5}] },
      { id: "type", label: "AI Model Type", options: [{label: "Predictive/ML", value: 2}, {label: "Generative AI/LLM", value: 4}, {label: "Computer Vision", value: 3}] }
    ]
  },
  "web-applications": {
    slug: "web-applications",
    title: "Web Applications",
    subtitle: "Next-generation web platforms.",
    description: "High-performance, SEO-optimized web applications utilizing React, Next.js, and modern serverless infrastructure.",
    pricing: [
      { name: "Essential", price: "Custom", description: "Corporate platforms.", features: ["CMS Integration", "SEO Optimized", "Responsive Design"] },
      { name: "Advanced", price: "Custom", description: "E-commerce & SaaS.", features: ["Payment Gateways", "User Dashboards", "Complex State"] },
      { name: "Enterprise", price: "Custom", description: "Global scale web apps.", features: ["Multi-tenant Architecture", "Global CDN", "Edge Computing"] }
    ],
    estimatorSteps: [
      { id: "complexity", label: "App Complexity", options: [{label: "Informational", value: 1}, {label: "Transactional/SaaS", value: 3}, {label: "Enterprise Platform", value: 5}] },
      { id: "cms", label: "Content Management", options: [{label: "Headless CMS", value: 1}, {label: "Custom Admin Panel", value: 2}] }
    ]
  },
  "mobile-applications": {
    slug: "mobile-applications",
    title: "Mobile Applications",
    subtitle: "Native and cross-platform mobile experiences.",
    description: "Beautifully designed iOS and Android applications built for user engagement and retention.",
    pricing: [
      { name: "MVP", price: "Custom", description: "Market validation.", features: ["Cross-platform (React Native)", "Core Features", "App Store Launch"] },
      { name: "Pro", price: "Custom", description: "Full-featured apps.", features: ["Native Integrations", "Push Notifications", "In-App Purchases"] },
      { name: "Enterprise", price: "Custom", description: "Mission-critical mobile.", features: ["Offline Mode", "IoT Connectivity", "Biometric Security"] }
    ],
    estimatorSteps: [
      { id: "os", label: "Operating System", options: [{label: "iOS Only", value: 1}, {label: "Android Only", value: 1}, {label: "Both (Cross-platform)", value: 1.5}, {label: "Both (Native)", value: 2.5}] },
      { id: "features", label: "Key Features", options: [{label: "Standard UI", value: 1}, {label: "Hardware Access (Camera/GPS)", value: 2}, {label: "Real-time Sync", value: 3}] }
    ]
  },
  "network-architecture": {
    slug: "network-architecture",
    title: "Network Architecture",
    subtitle: "Robust digital highways.",
    description: "Designing and deploying enterprise-grade networks, SD-WAN, and fiber-optic backbones.",
    pricing: [
      { name: "Campus", price: "Custom", description: "Single location.", features: ["Wi-Fi 6E", "Core Routing", "VLAN Segmentation"] },
      { name: "Regional", price: "Custom", description: "Multi-branch.", features: ["SD-WAN", "Failover Links", "Centralized Controller"] },
      { name: "National", price: "Custom", description: "ISP grade.", features: ["BGP Peering", "Dark Fiber", "Datacenter Uplinks"] }
    ],
    estimatorSteps: [
      { id: "sites", label: "Number of Sites", options: [{label: "1-5", value: 1}, {label: "6-20", value: 2}, {label: "20+", value: 4}] },
      { id: "bandwidth", label: "Uplink Requirements", options: [{label: "1Gbps", value: 1}, {label: "10Gbps", value: 2}, {label: "100Gbps+", value: 5}] }
    ]
  },
  "cybersecurity": {
    slug: "cybersecurity",
    title: "Cybersecurity",
    subtitle: "Zero-trust defense systems.",
    description: "Proactive threat hunting, penetration testing, and compliance auditing for critical infrastructure.",
    pricing: [
      { name: "Audit", price: "Custom", description: "Vulnerability assessment.", features: ["Penetration Testing", "Code Review", "Risk Report"] },
      { name: "Shield", price: "Custom", description: "Active defense.", features: ["WAF Configuration", "Endpoint Protection", "Zero-Trust Rollout"] },
      { name: "SOC", price: "Custom", description: "24/7 Monitoring.", features: ["Dedicated Analysts", "Incident Response", "Threat Intel"] }
    ],
    estimatorSteps: [
      { id: "assets", label: "Digital Assets", options: [{label: "< 10 Servers/Apps", value: 1}, {label: "10-100", value: 2}, {label: "100+", value: 4}] },
      { id: "compliance", label: "Compliance Target", options: [{label: "Standard Security", value: 1}, {label: "ISO 27001", value: 2}, {label: "PCI-DSS / HIPAA", value: 3}] }
    ]
  },
  "leadership-training": {
    slug: "leadership-training",
    title: "Leadership Training",
    subtitle: "Forging visionary executives.",
    description: "Immersive programs designed to equip leaders with strategic foresight and operational excellence.",
    pricing: [
      { name: "Workshop", price: "Custom", description: "Short-term impact.", features: ["2-Day Intensive", "Framework Materials", "Team Assessment"] },
      { name: "Cohort", price: "Custom", description: "Quarterly program.", features: ["12-Week Curriculum", "1-on-1 Coaching", "Capstone Project"] },
      { name: "Retained", price: "Custom", description: "Ongoing advisory.", features: ["Executive Coaching", "Board Advisory", "Strategy Retreats"] }
    ],
    estimatorSteps: [
      { id: "attendees", label: "Number of Leaders", options: [{label: "1-5 (Exec Team)", value: 1}, {label: "10-50 (Middle Mgmt)", value: 2}, {label: "100+ (Org Wide)", value: 4}] },
      { id: "duration", label: "Engagement Length", options: [{label: "One-off Event", value: 1}, {label: "3 Months", value: 2}, {label: "Annual Program", value: 4}] }
    ]
  },
  "consulting": {
    slug: "consulting",
    title: "Business Consulting",
    subtitle: "Data-driven strategy.",
    description: "Management consulting focused on digital transformation, market entry, and operational efficiency.",
    pricing: [
      { name: "Strategy", price: "Custom", description: "Market analysis.", features: ["Market Research", "Competitor Analysis", "Entry Playbook"] },
      { name: "Transformation", price: "Custom", description: "Process overhaul.", features: ["Lean Audit", "Digital Roadmap", "Change Management"] },
      { name: "M&A Advisory", price: "Custom", description: "Deal structuring.", features: ["Due Diligence", "Valuation Models", "Post-Merger Integration"] }
    ],
    estimatorSteps: [
      { id: "scope", label: "Consulting Scope", options: [{label: "Specific Department", value: 1}, {label: "Company Wide", value: 3}, {label: "Multi-National", value: 5}] },
      { id: "focus", label: "Primary Focus", options: [{label: "Growth/Expansion", value: 2}, {label: "Efficiency/Cost", value: 2}, {label: "Digital Transformation", value: 3}] }
    ]
  },
  "multimedia": {
    slug: "multimedia",
    title: "Multimedia Studios",
    subtitle: "Cinematic storytelling.",
    description: "High-end film production, documentaries, and digital media to amplify brand narratives.",
    pricing: [
      { name: "Digital", price: "Custom", description: "Social & Web.", features: ["Short-form Video", "Motion Graphics", "Podcast Editing"] },
      { name: "Commercial", price: "Custom", description: "Broadcast quality.", features: ["Full Production Crew", "VFX & Grading", "Original Score"] },
      { name: "Documentary", price: "Custom", description: "Long-form impact.", features: ["Multi-location Shoot", "Narrative Arc", "Global Syndication"] }
    ],
    estimatorSteps: [
      { id: "format", label: "Media Format", options: [{label: "Audio/Podcast", value: 1}, {label: "Promo/Commercial", value: 3}, {label: "Documentary/Film", value: 6}] },
      { id: "production", label: "Production Scale", options: [{label: "Studio Only", value: 1}, {label: "On-Location (Local)", value: 2}, {label: "Multi-Country", value: 5}] }
    ]
  },
  "employee-development": {
    slug: "employee-development",
    title: "Employee Development",
    subtitle: "Upskilling the workforce.",
    description: "Technical and soft-skills training programs to future-proof your human capital.",
    pricing: [
      { name: "Access", price: "Custom", description: "Digital library.", features: ["LMS Access", "Pre-recorded Modules", "Standard Certificates"] },
      { name: "Bootcamp", price: "Custom", description: "Live training.", features: ["Instructor-Led", "Hands-on Labs", "Project Reviews"] },
      { name: "Academy", price: "Custom", description: "Custom curriculum.", features: ["Role-specific Paths", "Internal Mentorship", "Performance Tracking"] }
    ],
    estimatorSteps: [
      { id: "staff", label: "Number of Employees", options: [{label: "10-50", value: 1}, {label: "50-200", value: 2}, {label: "200+", value: 4}] },
      { id: "topic", label: "Core Topics", options: [{label: "Soft Skills/Management", value: 1}, {label: "Technical (Coding/Data)", value: 2}, {label: "Specialized (AI/Cyber)", value: 3}] }
    ]
  }
};
