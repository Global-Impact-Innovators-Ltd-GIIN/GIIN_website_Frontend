export interface Contributor {
  name: string;
  title: string;
  organization: string;
  avatar: string;
  bio: string;
}

export interface ArticleContentSection {
  type: "paragraph" | "quote" | "heading" | "list";
  text?: string;
  items?: string[];
}

export interface Article {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  category: string;
  tags: string[];
  readingTime: string;
  author: Contributor;
  featured?: boolean;
  trending?: boolean;
  content: ArticleContentSection[];
  imageUrl?: string;
}

export const CONTRIBUTORS: Record<string, Contributor> = {
  mensah: {
    name: "Dr. Emmanuel K. Mensah",
    title: "Ecosystem Steward & Founder",
    organization: "GIIN Global",
    avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=200&auto=format&fit=crop",
    bio: "Dr. Mensah directs global technology directives, focusing on systems architecture and tech-sovereignty across Africa. Formerly lead architect at major tech conglomerates."
  },
  jenkins: {
    name: "Sarah Jenkins",
    title: "Dean of Leadership Academy",
    organization: "GIIN Academy",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=200&auto=format&fit=crop",
    bio: "Sarah designs high-integrity training frameworks for system-thinkers. Former executive strategist at Harvard Center for System-level Policy."
  },
  diallo: {
    name: "Marcus Diallo",
    title: "Chief Information Security Officer",
    organization: "GIIN Cyber Defense",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=200&auto=format&fit=crop",
    bio: "Marcus specializes in post-quantum cryptography, critical infrastructure threat assessments, and national-scale digital firewalls."
  },
  kovac: {
    name: "Alice Kovac",
    title: "Lead Venture Strategist",
    organization: "GIIN Capital Access",
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=200&auto=format&fit=crop",
    bio: "Alice orchestrates micro-credit deployments and seed-funding channels. Her research focuses on ClimaTech and off-grid innovations."
  }
};

export const ARTICLES: Article[] = [
  {
    id: "art-sovereign-tech",
    title: "Sovereign Tech: Rebuilding Africa's Digital Stacking Layers",
    excerpt: "Why owning the database layer, network routing protocols, and server infrastructure is a non-negotiable prerequisite for continental autonomy.",
    date: "June 22, 2026",
    category: "Technology",
    tags: ["Sovereignty", "Infrastructure", "Systems Architecture"],
    readingTime: "8 min read",
    author: CONTRIBUTORS.mensah,
    featured: true,
    imageUrl: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=800&auto=format&fit=crop",
    content: [
      {
        type: "paragraph",
        text: "For decades, digital expansion across the global south has relied heavily on imported technical systems. While this accelerated initial connectivity, it introduced a structural vulnerability: the lack of control over key hardware layers and base protocols. If we do not own the database systems and server nodes, our core communications remain borrowable commodities."
      },
      {
        type: "heading",
        text: "The Illusion of Progress Without Ownership"
      },
      {
        type: "paragraph",
        text: "Software systems operate within stacks. From localized mobile applications at the top layer down to fiber-optic routing protocols and silicon nodes at the baseline, each level represents a point of control. When startups build critical public utilities on proprietary, non-sovereign clouds, they establish a digital dependency that threatens economic resiliency."
      },
      {
        type: "quote",
        text: "Sovereignty is not about digital isolation; it is about architectural symmetry. If you do not have the power to host and route your own data, you have a temporary lease on your digital economy."
      },
      {
        type: "heading",
        text: "A Framework for Tech-Autonomy"
      },
      {
        type: "paragraph",
        text: "GIIN's Technology Division has finalized a blueprint outlining the key pillars of national-scale sovereign technical deployment:"
      },
      {
        type: "list",
        items: [
          "Distributed Bare-Metal Node Deployments: Running localized mesh databases in autonomous, hardened regions.",
          "Open Cryptographic Protocols: Eliminating external backdoors through community-audited zero-knowledge verification frameworks.",
          "Indigenous Language Models: Training lightweight, high-performance neural engines optimized for localized trade and governance contexts."
        ]
      },
      {
        type: "paragraph",
        text: "By establishing this architecture, we ensure that digital expansion is built upon solid, secure, and self-sufficient groundwork that cannot be compromised by geopolitical changes."
      }
    ]
  },
  {
    id: "art-systems-leadership",
    title: "Leadership Under Turbulence: Systems Thinking for 2030",
    excerpt: "Traditional executive frameworks produce isolated strategies. We propose a cognitive approach to navigating systemic, interconnected crises.",
    date: "June 18, 2026",
    category: "Leadership Development",
    tags: ["Systems Thinking", "Governance", "Strategic Management"],
    readingTime: "6 min read",
    author: CONTRIBUTORS.jenkins,
    trending: true,
    imageUrl: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?q=80&w=800&auto=format&fit=crop",
    content: [
      {
        type: "paragraph",
        text: "Modern leadership is suffering from a fundamental mismatch: our tools are designed for linear, isolated problems, but the challenges we face are non-linear, interconnected systems. When executives implement strategies to optimize single departments, they frequently create unforeseen problems elsewhere in their organizations."
      },
      {
        type: "heading",
        text: "De-fragmenting Executive Cognitive Models"
      },
      {
        type: "paragraph",
        text: "Systems thinking is the practice of analyzing components in relation to the whole system. Rather than looking for immediate cause-and-effect patterns, leaders must learn to identify complex feedback loops, delays, and cumulative effects. Without this system-wide view, interventions are merely superficial."
      },
      {
        type: "quote",
        text: "Isolated decisions create downstream system errors. True leadership requires mapping the entire ecosystem before acting."
      },
      {
        type: "heading",
        text: "Implementing Systems Thinking in Daily Operations"
      },
      {
        type: "paragraph",
        text: "To transitions organizations toward systemic management models, we teach the following three-phase transition framework:"
      },
      {
        type: "list",
        items: [
          "Boundary Mapping: Identify not just internal stakeholders, but external resource flows, labor markets, and secondary social impacts.",
          "Delay Calibration: Recognize that system interventions do not show immediate results, and avoid over-correcting prematurely.",
          "Leverage Point Optimization: Locate small modifications that trigger systemic, self-reinforcing positive changes."
        ]
      }
    ]
  },
  {
    id: "art-post-quantum",
    title: "Post-Quantum Cryptography in National Defense Infrastructure",
    excerpt: "An analysis of threat models and implementation steps for transitioning high-integrity public networks to quantum-resistant encryption.",
    date: "June 14, 2026",
    category: "Cyber Defense",
    tags: ["Cryptography", "Security", "Quantum Resistant"],
    readingTime: "10 min read",
    author: CONTRIBUTORS.diallo,
    trending: true,
    imageUrl: "https://images.unsplash.com/photo-1639322537228-f710d846310a?q=80&w=800&auto=format&fit=crop",
    content: [
      {
        type: "paragraph",
        text: "The timeline for the emergence of cryptographically relevant quantum computers (CRQCs) is shrinking. Current RSA and ECC algorithms, which protect almost all national commerce, communication, and database architectures, will become completely insecure once Shor's algorithm runs on sufficiently large systems."
      },
      {
        type: "heading",
        text: "The Harvest Now, Decrypt Later (HNDL) Threat"
      },
      {
        type: "paragraph",
        text: "A major threat is occurring now: threat groups are intercepting and archiving encrypted enterprise and military communications. While they cannot read this data today, they will decrypt it the moment quantum systems are online. This makes quantum-resistant migration an immediate priority."
      },
      {
        type: "quote",
        text: "Waiting for quantum systems to arrive before upgrading encryption is an active capitulation of your data. The threat is happening today."
      },
      {
        type: "heading",
        text: "The Migration Stacking Path"
      },
      {
        type: "paragraph",
        text: "GIIN Cyber Defense has outlined a multi-layered transition roadmap for post-quantum algorithms (PQC):"
      },
      {
        type: "list",
        items: [
          "Lattice-based Signature Schemes: Deploying ML-DSA for standard secure handshake configurations.",
          "Hybrid Key Encapsulation: Combining classical ECDH with ML-KEM to establish dual-barrier encryption pathways.",
          "Hardware Security Modules: Retrofitting physical cryptographic chips to support high-entropy random number generators."
        ]
      }
    ]
  },
  {
    id: "art-climatech-capital",
    title: "Accelerating ClimaTech Startups: Capital Infrastructure",
    excerpt: "Evaluating the capital allocation mechanisms needed to scale off-grid energy storage and smart-grid networks in emerging markets.",
    date: "June 10, 2026",
    category: "Business Transformation",
    tags: ["ClimaTech", "Venture Capital", "Capital Access"],
    readingTime: "7 min read",
    author: CONTRIBUTORS.kovac,
    imageUrl: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?q=80&w=800&auto=format&fit=crop",
    content: [
      {
        type: "paragraph",
        text: "ClimaTech deployment in emerging markets is heavily limited by funding. While software startups require minimal hardware capital, climate projects (such as micro-grids, smart storage, and bio-generation nodes) require substantial physical setup budgets."
      },
      {
        type: "heading",
        text: "The Shortcomings of Traditional Venture Models"
      },
      {
        type: "paragraph",
        text: "Typical venture capital demands quick scaling cycles and 10x returns within rigid timelines. This is mismatching for infrastructure-heavy ventures. We must pioneer blended financing models, combining impact grants with flexible equity lines to support capital-intensive growth phases."
      },
      {
        type: "quote",
        text: "If we treat hard technology scaling with soft software capital structures, we will systematically starve crucial infrastructure innovations."
      }
    ]
  }
];
