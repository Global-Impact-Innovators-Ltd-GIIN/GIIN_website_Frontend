export interface NavLink {
  label: string;
  href: string;
  description?: string;
  iconName?: string;
  ctaText?: string;
  badge?: string;
}

export interface MegaMenuSection {
  title: string;
  items: NavLink[];
}

export interface NavItem {
  label: string;
  href?: string;
  type: "dropdown" | "megamenu" | "link";
  items?: NavLink[] | MegaMenuSection[];
}

export const navigationConfig: NavItem[] = [
  {
    label: "Home",
    type: "dropdown",
    items: [
      {
        label: "Overview",
        href: "/",
        description: "An integrated view of GIIN's global mission, architecture, and technology layer.",
        iconName: "Compass",
      },
      {
        label: "Vision",
        href: "/#vision",
        description: "Our long-term blueprint for technological and economic sovereignty in Africa.",
        iconName: "Eye",
      },
      {
        label: "Mission",
        href: "/#mission",
        description: "Unifying talent, capital, and software solutions to scale impactful innovations.",
        iconName: "Target",
      },
      {
        label: "GIIN Story",
        href: "/about",
        description: "How we started and our journey towards forming a connected continental network.",
        iconName: "BookOpen",
      },
      {
        label: "Featured Innovations",
        href: "/innovation",
        description: "Highlighting our bleeding-edge research breakthroughs and deployed products.",
        iconName: "Sparkles",
      },
      {
        label: "Global Impact Journey",
        href: "/journey",
        description: "Real-time metrics, milestones, and reports of our community-led transformations.",
        iconName: "Globe",
      },
    ] as NavLink[],
  },
  {
    label: "Ecosystem",
    type: "megamenu",
    items: [
      {
        title: "Innovation Platforms",
        items: [
          {
            label: "GIIN Labs",
            href: "/innovation",
            description: "Future-focused sandbox environment for engineering high-impact, bleeding-edge tech concepts.",
            iconName: "Atom",
            ctaText: "Explore Labs",
          },
          {
            label: "Startup Incubator",
            href: "/innovation",
            description: "Accelerating early-stage African ventures with infrastructure, capital, and mentorship.",
            iconName: "Rocket",
            ctaText: "Apply Now",
          },
          {
            label: "Digital Products",
            href: "/technology",
            description: "Suite of sovereign digital tools built by our technology division for public utility.",
            iconName: "Cpu",
            ctaText: "View Products",
          },
          {
            label: "Research Hub",
            href: "/research",
            description: "A centralized depository of our scientific papers, reports, and national blueprints.",
            iconName: "Database",
            ctaText: "Read Papers",
          },
          {
            label: "AI Systems",
            href: "/ai",
            description: "Autonomous models designed for resource mapping, localized translation, and strategy.",
            iconName: "BrainCircuit",
            ctaText: "Launch AI",
            badge: "Active",
          },
          {
            label: "Capital Access",
            href: "/loan",
            description: "Sovereign innovation loans and capital solutions for high-impact African startups.",
            iconName: "Wallet",
            ctaText: "Get Funding",
            badge: "New",
          },
        ],
      },
      {
        title: "Leadership Ecosystem",
        items: [
          {
            label: "Leadership Academy",
            href: "/academy",
            description: "Structured curriculum designed for training next-generation public and private sector leaders.",
            iconName: "GraduationCap",
            ctaText: "View Courses",
          },
          {
            label: "Mentorship Hub",
            href: "/leadership",
            description: "Connecting rising stars with verified industry leaders across engineering, media, and business.",
            iconName: "UserCheck",
            ctaText: "Find Mentor",
          },
          {
            label: "Executive Programs",
            href: "/leadership",
            description: "Intensive accelerators targeting C-suite executives steering large-scale operations.",
            iconName: "Briefcase",
            ctaText: "Request Brochure",
          },
          {
            label: "Youth Leadership",
            href: "/academy",
            description: "Micro-grants and bootcamps targeting high school and university students across Africa.",
            iconName: "Users",
            ctaText: "Learn More",
          },
        ],
      },
      {
        title: "Technology Division",
        items: [
          {
            label: "Software Solutions",
            href: "/technology",
            description: "Enterprise application engineering, system integrations, and multi-tenant architectures.",
            iconName: "Terminal",
            ctaText: "See Services",
          },
          {
            label: "Network Systems",
            href: "/technology",
            description: "Designing decentralized mesh networks, node structures, and secure server infrastructures.",
            iconName: "Network",
            ctaText: "Inspect Architecture",
          },
          {
            label: "AI Development",
            href: "/ai",
            description: "Fine-tuning models, building custom datasets, and developing robust neural systems.",
            iconName: "Cpu",
            ctaText: "Read Specs",
          },
          {
            label: "Security Systems",
            href: "/cyber",
            description: "State-of-the-art security, threat detection, audit layers, and sovereign cryptographic firewalls.",
            iconName: "ShieldAlert",
            ctaText: "Audit System",
            badge: "Secure",
          },
        ],
      },
      {
        title: "Media Division",
        items: [
          {
            label: "Multimedia Studio",
            href: "/multimedia",
            description: "Cinema-grade digital media, storytelling, and high-fidelity brand representations.",
            iconName: "Film",
            ctaText: "Watch Showreel",
          },
          {
            label: "Podcast Center",
            href: "/podcasts",
            description: "Podcasts exploring deep tech, policy, and stories from our continental network.",
            iconName: "Podcast",
            ctaText: "Listen Now",
          },
          {
            label: "Creative Lab",
            href: "/studio",
            description: "Incubating digital artists, product designers, and visual creators to shape digital culture.",
            iconName: "Palette",
            ctaText: "Explore Projects",
          },
          {
            label: "Content Systems",
            href: "/media",
            description: "Decentralized content distribution systems, media feeds, and archiving modules.",
            iconName: "HardDrive",
            ctaText: "Access Archive",
          },
        ],
      },
      {
        title: "Community & Impact",
        items: [
          {
            label: "Events",
            href: "/events",
            description: "Summits, developer hackathons, and global partner workshops hosted within the network.",
            iconName: "CalendarRange",
            ctaText: "Register Now",
            badge: "Upcoming",
          },
          {
            label: "Partnerships",
            href: "/community",
            description: "Collaborate with governments, multinational organizations, and local tech hubs.",
            iconName: "Handshake",
            ctaText: "Become Partner",
          },
          {
            label: "Volunteer Network",
            href: "/community",
            description: "Contribute engineering hours, mentorship, or operational support to open projects.",
            iconName: "Users2",
            ctaText: "Join Network",
          },
          {
            label: "Global Communities",
            href: "/community",
            description: "Connect with GIIN chapters worldwide, coordinating localized transformation directives.",
            iconName: "Globe2",
            ctaText: "Find Chapter",
          },
        ],
      },
    ] as MegaMenuSection[],
  },
  {
    label: "Capital",
    type: "dropdown",
    items: [
      {
        label: "Loan Service",
        href: "/loan",
        description: "Access sovereign innovation funding for high-impact African startups and creators.",
        iconName: "Wallet",
        ctaText: "Get Funding",
      },
      {
        label: "Investment Portal",
        href: "/innovation/dashboards/investor",
        description: "Strategic investment opportunities within the GIIN ecosystem of vetted startups.",
        iconName: "TrendingUp",
        ctaText: "Explore Portfolio",
      },
      {
        label: "Grant Opportunities",
        href: "/research",
        description: "R&D grants for scientific breakthroughs and continental development blueprints.",
        iconName: "Landmark",
      },
    ],
  },
  {
    label: "Solutions",
    type: "dropdown",
    items: [
      {
        label: "Enterprise Systems",
        href: "/services",
        description: "Scalable databases, microservice systems, and custom tools built for large organizations.",
        iconName: "Layers",
      },
      {
        label: "Business Consulting",
        href: "/services",
        description: "Advising startups and corporations on technology adaptation, processes, and systems design.",
        iconName: "LineChart",
      },
      {
        label: "Training Programs",
        href: "/academy",
        description: "Transform your team's skillset in modern software architectures, data engineering, and agile operations.",
        iconName: "GraduationCap",
      },
      {
        label: "Digital Transformation",
        href: "/cyber",
        description: "Modernizing legacy structures into resilient cloud architectures with zero down-time migration.",
        iconName: "RefreshCw",
      },
      {
        label: "Innovation Strategy",
        href: "/innovation",
        description: "Defining long-term roadmaps to incorporate emerging artificial intelligence and system security.",
        iconName: "Lightbulb",
      },
    ] as NavLink[],
  },
  {
    label: "Resources",
    type: "dropdown",
    items: [
      {
        label: "Articles",
        href: "/blog",
        description: "Thought-leadership write-ups, engineering articles, and announcements from our staff.",
        iconName: "FileText",
      },
      {
        label: "Research",
        href: "/research",
        description: "Peer-reviewed studies, whitepapers, and socioeconomic data regarding digital platforms.",
        iconName: "Database",
      },
      {
        label: "Learning Center",
        href: "/academy",
        description: "Self-paced study modules, exercises, and tutorials for engineers and systems designers.",
        iconName: "BookOpen",
      },
      {
        label: "Templates",
        href: "/blog",
        description: "Downloadable design systems, code Boilerplates, and regulatory paperwork templates.",
        iconName: "Layers",
      },
      {
        label: "Documentation",
        href: "/research",
        description: "API specifications, deployment steps, and system architecture manuals for developers.",
        iconName: "Binary",
      },
    ] as NavLink[],
  },
  {
    label: "Leadership",
    type: "dropdown",
    items: [
      {
        label: "Founder Message",
        href: "/leadership#founder",
        description: "A note on the core drive behind creating GIIN, from the desk of the Founder.",
        iconName: "MessageSquare",
      },
      {
        label: "Leadership Team",
        href: "/leadership#team",
        description: "Meet the directors, tech leads, and creative designers driving the network forward.",
        iconName: "Users",
      },
      {
        label: "Core Principles",
        href: "/leadership#principles",
        description: "The set of non-negotiable guidelines ensuring sovereign development and high standards.",
        iconName: "ShieldAlert",
      },
      {
        label: "Impact Stories",
        href: "/leadership#stories",
        description: "Case studies exploring the lives and startups impacted by our infrastructure deployment.",
        iconName: "Heart",
      },
    ] as NavLink[],
  },
  {
    label: "Company",
    type: "dropdown",
    items: [
      {
        label: "About Us",
        href: "/about",
        description: "A summary of GIIN's organizational model, legal parameters, and continental locations.",
        iconName: "Info",
      },
      {
        label: "Careers",
        href: "/careers",
        description: "Join our fully distributed team of developers, researchers, and multimedia specialists.",
        iconName: "Briefcase",
      },
      {
        label: "Partners",
        href: "/community",
        description: "See the agencies, funds, and developers cooperating to expand the network scope.",
        iconName: "Handshake",
      },
      {
        label: "Contact",
        href: "/contact",
        description: "Get in touch with local offices, file security feedback, or make developer inquiries.",
        iconName: "Mail",
      },
    ] as NavLink[],
  },
];
