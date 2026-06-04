import { Job, Department, RecruitmentStage } from '../interfaces/careers';
import { JobDepartment } from '../types/careers';

export const MOCK_DEPARTMENTS: Department[] = [
  {
    id: 'dept-tech',
    name: 'Technology',
    description: 'Engineering the ecosystem of tomorrow. We build enterprise-grade, future-proof software, dynamic AI architectures, and resilient security systems that power global impact.',
    icon: 'Cpu',
    featuredRolesCount: 4,
  },
  {
    id: 'dept-lead',
    name: 'Leadership',
    description: 'Empowering future changemakers. We foster growth, build strategic partnerships, manage high-impact programs, and design scalable frameworks for community change.',
    icon: 'Compass',
    featuredRolesCount: 2,
  },
  {
    id: 'dept-consult',
    name: 'Consulting',
    description: 'Architecting transformational strategies. We partner with industries, governments, and NGOs to drive innovation strategies, business models, and project excellence.',
    icon: 'Network',
    featuredRolesCount: 2,
  },
  {
    id: 'dept-media',
    name: 'Media',
    description: 'Amplifying stories that matter. We design beautiful visual interfaces, produce cinematic multimedia content, and create educational resources that inspire millions.',
    icon: 'Tv',
    featuredRolesCount: 1,
  },
  {
    id: 'dept-edu',
    name: 'Education',
    description: 'Igniting curiosity and expertise. We build industry-ready curriculums, organize expert training programs, and lead scientific research in modern innovation.',
    icon: 'BookOpen',
    featuredRolesCount: 1,
  },
];

export const MOCK_JOBS: Job[] = [
  {
    id: 'job-001',
    title: 'Senior AI Research Engineer',
    department: 'Technology',
    type: 'Full-time',
    location: 'Geneva, Switzerland / Remote Friendly',
    experienceLevel: 'Senior',
    postingDate: '2026-05-20',
    salaryRange: '$140,000 - $185,000',
    description: 'Join the GIIN core intelligence cell. You will lead the research and deployment of highly secure, scalable LLM frameworks, agentic workflows, and customized machine learning architectures designed to solve socio-economic challenges in emerging regions.',
    responsibilities: [
      'Architect and orchestrate secure multimodality models and customized agent nodes.',
      'Collaborate with global researchers to design and deploy AI solutions for digital education and micro-credits.',
      'Optimize AI model pipelines for resource-constrained client environments.',
      'Lead a group of 3 junior engineers and researchers to maintain standard model registries.',
    ],
    requirements: [
      'Master’s or PhD in Computer Science, Mathematics, or a highly quantitative field.',
      '4+ years of professional experience training, fine-tuning, and deploying deep learning structures.',
      'Deep fluency with PyTorch, HuggingFace, Next.js, and serverless vector architectures.',
      'Demonstrated passion for creating social impact through digital innovation.',
    ],
    skills: ['PyTorch', 'Vector Databases', 'Agentic Workflows', 'TypeScript', 'Next.js'],
    isActive: true,
    isFeatured: true,
  },
  {
    id: 'job-002',
    title: 'Full Stack UI Architect (Next.js & Tailwind)',
    department: 'Technology',
    type: 'Full-time',
    location: 'Singapore / Hybrid',
    experienceLevel: 'Senior',
    postingDate: '2026-05-28',
    salaryRange: '$120,000 - $160,000',
    description: 'We are seeking an interface virtuoso who eats glassmorphic styling, framer-motion micro-animations, and Next.js App Router for breakfast. You will be responsible for defining the user interface standards for our global web portals.',
    responsibilities: [
      'Create stunning, interactive, and responsive web components using React, Next.js, and Tailwind CSS.',
      'Implement state-of-the-art animations that provide instant visual response and premium look-and-feel.',
      'Ensure 100% keyboard navigability, full WCAG 2.2 accessibility compliance, and semantic structure.',
      'Optimize performance scores to achieve straight-A 100s in Lighthouse reports.',
    ],
    requirements: [
      '5+ years in high-end frontend roles with an outstanding portfolio displaying extreme design details.',
      'Mastery of Framer Motion, GSAP, CSS variables, and modern responsive layouts.',
      'Deep knowledge of React Server Components, hydration states, and Next.js performance optimizations.',
      'Expert level with Tailwind, Tailwind V4 utility custom configurations, and component design patterns.',
    ],
    skills: ['React', 'Next.js', 'TailwindCSS', 'Framer Motion', 'TypeScript', 'Accessibility'],
    isActive: true,
    isFeatured: true,
  },
  {
    id: 'job-003',
    title: 'Global Leadership Program Manager',
    department: 'Leadership',
    type: 'Full-time',
    location: 'London, UK / Hybrid',
    experienceLevel: 'Lead',
    postingDate: '2026-05-15',
    salaryRange: '£95,000 - £125,000',
    description: 'Drive the next generation of change. You will orchestrate our flagship Leadership Accelerator, mapping curriculum milestones, coordinating with strategic corporate partners, and guiding hundreds of future innovators globally.',
    responsibilities: [
      'Direct, manage, and scale GIIN’s regional leadership academy tracks.',
      'Establish partnerships with top-tier universities, innovation centers, and investment funds.',
      'Analyze educational delivery metrics and implement data-driven improvements.',
      'Design mentor-matching modules and coordinate global cohort summits.',
    ],
    requirements: [
      'Bachelor’s or MBA in Business Administration, Education, Leadership Development, or similar.',
      '6+ years of experience leading complex, international educational or accelerator operations.',
      'Strong public speaking, stakeholder engagement, and project execution skills.',
      'Experience working with multi-cultural cohorts and scaling mentorship programs.',
    ],
    skills: ['Program Design', 'Public Relations', 'Mentorship Systems', 'Strategic Growth'],
    isActive: true,
    isFeatured: true,
  },
  {
    id: 'job-004',
    title: 'Innovation & Growth Strategist',
    department: 'Consulting',
    type: 'Full-time',
    location: 'New York, US / Remote',
    experienceLevel: 'Senior',
    postingDate: '2026-05-25',
    salaryRange: '$130,000 - $170,000',
    description: 'Work with the world’s leading organizations to co-create sustainable ventures, design new business structures, and launch disruptive technologies that enhance community resilience and equity.',
    responsibilities: [
      'Advise executive corporate leaders on integrating social impact with their core digital transformation.',
      'Lead design-thinking sprints, market studies, and economic feasibility evaluations.',
      'Synthesize complex operational data into clean, actionable, high-level policy roadmaps.',
      'Build long-term consulting pipelines with global foundations, startups, and impact funds.',
    ],
    requirements: [
      '5+ years at a top-tier advisory firm (e.g. McKinsey, BCG, Deloitte, or boutique impact firms).',
      'Demonstrated expertise in sustainable venture design and corporate strategy.',
      'Superb writing skills, analytical rigor, and highly persuasive presentation capability.',
      'Comfort navigating ambiguous problems and orchestrating cross-functional teams.',
    ],
    skills: ['Strategy Consulting', 'Design Thinking', 'Financial Modeling', 'Social Impact'],
    isActive: true,
    isFeatured: false,
  },
  {
    id: 'job-005',
    title: 'Lead Cybersecurity Analyst',
    department: 'Technology',
    type: 'Full-time',
    location: 'Berlin, Germany / Hybrid',
    experienceLevel: 'Senior',
    postingDate: '2026-05-10',
    salaryRange: '€110,000 - €140,000',
    description: 'Protect the infrastructure of social impact. You will architect robust threat models, conduct deep-penetration audits, and establish absolute zero-trust guardrails across our web, data, and edge intelligence layers.',
    responsibilities: [
      'Oversee the global threat profile for GIIN’s collaborative educational and financial platforms.',
      'Configure automated CI/CD security assessments and perform periodic penetration reviews.',
      'Design crisis-recovery policies and train technology cells on safe deployment methods.',
      'Audit external service hooks and maintain strict data compliance across active databases.',
    ],
    requirements: [
      'CISSP, CEH, or equivalent industry certifications.',
      '5+ years as a security engineer, threat analyst, or devsecops lead.',
      'Profound understanding of identity protocols, cryptography structures, and serverless edge security.',
      'Fluency in security auditing scripts, network diagnostics, and cloud architectures.',
    ],
    skills: ['Penetration Testing', 'Identity Protocols', 'Cloud Security', 'DevSecOps'],
    isActive: true,
    isFeatured: false,
  },
  {
    id: 'job-006',
    title: 'Multimedia Content Producer & Storyteller',
    department: 'Media',
    type: 'Contract',
    location: 'Cape Town, South Africa / Hybrid',
    experienceLevel: 'Mid-level',
    postingDate: '2026-05-18',
    salaryRange: '$80,000 - $105,000',
    description: 'We are seeking an outstanding media storyteller who can craft emotional narratives about innovation and impact. You will script, shoot, and direct cinematic media assets, podcast channels, and social features highlighting GIIN’s work globally.',
    responsibilities: [
      'Shoot, edit, and deliver cinematic-grade videos documenting GIIN initiatives in local communities.',
      'Script and produce regular podcast episodes with top change catalysts, leaders, and technologists.',
      'Design clean motion graphics and visual layouts for print and digital channels.',
      'Co-manage the editorial calendar to align with seasonal recruitment and funding milestones.',
    ],
    requirements: [
      '3+ years of professional video production, editing, and creative storytelling experience.',
      'Portfolio displaying cinematic quality, strong narrative skills, and excellent pacing.',
      'Expert level with Premiere, After Effects, DaVinci Resolve, and Adobe Creative Suite.',
      'Strong empathy, interviewing skills, and readiness to travel internationally.',
    ],
    skills: ['Video Production', 'Sound Design', 'Motion Graphics', 'Storytelling', 'Podcasting'],
    isActive: true,
    isFeatured: false,
  },
  {
    id: 'job-007',
    title: 'Curriculum Development Specialist',
    department: 'Education',
    type: 'Full-time',
    location: 'Remote (APAC/EMEA timezone)',
    experienceLevel: 'Mid-level',
    postingDate: '2026-05-22',
    salaryRange: '$90,000 - $115,000',
    description: 'Shape how the next generation learns. You will design, build, and adapt interactive course structures, learning modules, and evaluations in digital innovation, business ethics, and tech leadership.',
    responsibilities: [
      'Co-create curriculum roadmaps for our Academy courses, ensuring direct industry relevance.',
      'Develop educational content including guides, projects, interactive exercises, and exams.',
      'Analyze learner feedback metrics to continually optimize curriculum engagement.',
      'Collaborate with subject matter experts to translate advanced ideas into clear, digestible files.',
    ],
    requirements: [
      'Degree in Education, Curriculum Design, Instructional Design, or related fields.',
      '3+ years of experience authoring technical or leadership learning paths.',
      'Strong understanding of cognitive theories, remote pedagogy, and gamified education.',
      'Impeccable written and verbal English communication.',
    ],
    skills: ['Instructional Design', 'E-learning Systems', 'Technical Writing', 'Data Analysis'],
    isActive: true,
    isFeatured: false,
  },
  {
    id: 'job-008',
    title: 'Executive Director of Impact Ecosystems',
    department: 'Leadership',
    type: 'Full-time',
    location: 'Paris, France / Hybrid',
    experienceLevel: 'Executive',
    postingDate: '2026-05-30',
    salaryRange: '€160,000 - €210,000',
    description: 'Join the GIIN executive leadership team. You will drive our global footprint, defining strategic partnership matrices with national authorities, global institutions, and multilateral development funds.',
    responsibilities: [
      'Develop and execute GIIN’s overall international ecosystem growth roadmap.',
      'Represent GIIN at major summits, speaking to ministers, corporate leaders, and tech founders.',
      'Lead and mentor a high-achieving team of 15 regional directors and strategic specialists.',
      'Establish financial frameworks and oversee allocation of budgets for multi-million-euro projects.',
    ],
    requirements: [
      '10+ years in international relations, senior venture building, or leadership in major NGOs/agencies.',
      'Extensive experience managing complex global stakeholder boards.',
      'Fluent in multiple languages (English and French highly preferred).',
      'Unwavering dedication to systemic global equity, innovation, and educational growth.',
    ],
    skills: ['Executive Leadership', 'Diplomatic Relations', 'Fiscal Strategy', 'Ecosystem Scaling'],
    isActive: true,
    isFeatured: true,
  }
];

export const MOCK_RECRUITMENT_PROCESS: RecruitmentStage[] = [
  {
    id: 'stage-1',
    name: 'Application Submission',
    description: 'Submit your profile, portfolio, and express why GIIN is the dream destination for your career. Our automated filters check basic alignment, but human eyes review every application.',
    estimatedDuration: '1 - 2 weeks',
    requirements: ['Complete Application Form', 'Valid Resume Upload', 'Clear answers outlining key achievements'],
    status: 'completed',
  },
  {
    id: 'stage-2',
    name: 'Initial Screening',
    description: 'A 30-minute interactive conversation with our talent acquisition curators to evaluate cultural resonance, discuss your growth journey, and align on mutual aspirations.',
    estimatedDuration: '30 minutes',
    requirements: ['Excellent communication', 'Clear view of professional goals', 'Interest in social impact and innovation'],
    status: 'current',
  },
  {
    id: 'stage-3',
    name: 'Technical Assessment',
    description: 'Showcase your skills through a real-world, take-home project or task designed to simulate actual GIIN challenges—whether developing a code snippet, designing a curriculum, or formulating a strategy.',
    estimatedDuration: '4 - 7 days to submit',
    requirements: ['High craftsmanship', 'Clean design/architecture', 'Thorough documentation and presentation'],
    status: 'upcoming',
  },
  {
    id: 'stage-4',
    name: 'Panel Interview',
    description: 'An interactive, deep-dive session with your future peers and leads. We dissect your technical assessment, conduct a live problem-solving exercise, and review standard scenarios.',
    estimatedDuration: '60 - 90 minutes',
    requirements: ['Deep technical understanding', 'Collaborative mindset', 'Ability to articulate complex solutions simply'],
    status: 'upcoming',
  },
  {
    id: 'stage-5',
    name: 'Executive Alignment',
    description: 'A final conversation with a GIIN director to review your holistic goals, discuss future leadership trajectories, and align on long-term systemic impact.',
    estimatedDuration: '45 minutes',
    requirements: ['Strategic vision', 'Commitment to collective success', 'Passion for transformative growth'],
    status: 'upcoming',
  },
  {
    id: 'stage-6',
    name: 'Offer',
    description: 'We present a premium, competitive offer complete with comprehensive benefits, equity in global initiatives, and professional growth opportunities tailored to your role.',
    estimatedDuration: '1 - 2 days to review',
    requirements: ['Mutual signature', 'Background documentation verification'],
    status: 'upcoming',
  },
  {
    id: 'stage-7',
    name: 'Onboarding',
    description: 'Welcome to the future. You are assigned a dedicated partner, receive a premium setup, meet the international team, and begin your first impactful sprint within GIIN.',
    estimatedDuration: 'First 30 days',
    requirements: ['Immersion program completion', 'Meeting with regional heads', 'First high-impact goal setup'],
    status: 'upcoming',
  }
];

export const MOCK_TESTIMONIALS = [
  {
    id: 't-1',
    name: 'Elena Rostova',
    role: 'Lead Architect, Tech Hub',
    quote: 'At GIIN, I did not just step into a job; I stepped into a global mission. We built a micro-educational portal that now trains thousands of children across East Africa. Every line of code I write directly shapes a human life. The design autonomy, support, and technical standards here are phenomenal.',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=200',
    yearsWithGIIN: '4 Years',
    promotions: 'Software Engineer → Senior Developer → Lead Architect',
  },
  {
    id: 't-2',
    name: 'Marcus Vance',
    role: 'Principal Strategist, Consulting',
    quote: 'GIIN bridges the speed of a high-growth tech startup with the world-changing purpose of global foundations. I advise corporate leaders on green business integration during the day and run design-thinking sprints with grassroots innovators at night. There is no other organization offering this level of diversity and impact.',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200',
    yearsWithGIIN: '3 Years',
    promotions: 'Associate Strategist → Senior Advisor → Principal Strategist',
  },
  {
    id: 't-3',
    name: 'Dr. Aisha Mwangi',
    role: 'Head of Global Academy',
    quote: 'Leadership is not taught; it is nurtured. We set out to build an academy that would challenge status-quo education. In three years, we have scaled our training modules to 20+ countries. The resources, mentorship, and high-performance culture at GIIN are what made this possible.',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=200',
    yearsWithGIIN: '5 Years',
    promotions: 'Senior Trainer → Director of Studies → Head of Global Academy',
  }
];

export const MOCK_FAQS = [
  {
    question: 'Can I work fully remotely at GIIN?',
    answer: 'Yes! GIIN operates on a hybrid-first, distributed paradigm. Many of our roles (like consulting and software engineering) support 100% remote working with access to regional hot-desking offices in Geneva, Singapore, London, and New York. Certain roles may require occasionally traveling to lead local summits.',
  },
  {
    question: 'What is the average duration of the recruitment process?',
    answer: 'We respect your time. From the moment you submit your application, we target a full pipeline completion within 3 to 4 weeks. Technical assessments take up to a week, and scheduling panel interviews is coordinated via highly flexible calendar hooks.',
  },
  {
    question: 'Do you offer internships or opportunities for students?',
    answer: 'Absolutely! Our GIIN Fellows program is tailored specifically for students and recent graduates looking to apply their tech, research, or design skills to actual impact initiatives. We run summer cohorts and 6-month specialized internships that frequently lead to full-time career placements.',
  },
  {
    question: 'How do you support continuous learning and growth?',
    answer: 'Every team member at GIIN receives an annual personal development stipend of $3,500 for training, certifications, and conferences. We also host weekly internal Knowledge Exchanges, match you with a senior leadership mentor, and offer accelerated paths to executive positions.',
  },
  {
    question: 'What does a take-home assessment look like?',
    answer: 'We construct practical challenges rather than brainteasers. For technical roles, it might be creating a responsive, interactive frontend component or auditing an API service. For leadership or consulting, it might involve reviewing a mock program strategy and preparing a brief slide-deck. We compensate candidates for advanced, high-effort assessments.',
  }
];

export const MOCK_BENEFITS = [
  {
    category: 'Health & Resilience',
    items: [
      { icon: 'Heart', title: 'Holistic Medical Cover', description: 'Gold-tier global health, dental, and vision insurance for you and your dependents.' },
      { icon: 'Sparkles', title: 'Wellbeing Stipends', description: 'Monthly allowance for gym memberships, therapy, mindfulness apps, or massage treatments.' }
    ]
  },
  {
    category: 'Professional Elevation',
    items: [
      { icon: 'BookOpen', title: 'Learning Allowance', description: 'An annual budget of $3,500 to pursue courses, attend conferences, and purchase reference books.' },
      { icon: 'Compass', title: 'Direct Mentorship', description: 'Weekly 1-on-1 career design sessions with senior advisors, technologists, and executive board members.' }
    ]
  },
  {
    category: 'Workplace Agility',
    items: [
      { icon: 'Globe', title: 'Hybrid & Remote Flexibility', description: 'Choose your hours and choose your desk. High-end hardware setup provided anywhere in the world.' },
      { icon: 'Calendar', title: 'Sabbatical Program', description: 'After 3 years of service, receive 4 weeks of fully paid sabbatical to recharge, travel, or volunteer.' }
    ]
  },
  {
    category: 'Financial Resonance',
    items: [
      { icon: 'TrendingUp', title: 'Impact Bonuses', description: 'Performance recognition plans tied to both individual growth metrics and collective social program success.' },
      { icon: 'Award', title: 'Retirement Scaling', description: 'Generous matching contributions up to 6% in local retirement plans and pension programs.' }
    ]
  }
];

export const MOCK_CAREER_PATHS = {
  Technology: [
    { title: 'Associate Developer', time: '1-2 Years', focus: 'Writing semantic code, shipping UI pages, and understanding API hooks under lead mentorship.' },
    { title: 'Senior Software Engineer', time: '2-4 Years', focus: 'Leading features, reviewing architectures, building complex animations, and mentoring associates.' },
    { title: 'UI Architect / Team Lead', time: '4-6 Years', focus: 'Guiding global frontend systems, designing reusable packages, and leading cross-functional tech cells.' },
    { title: 'Principal Engineer / Director', time: '6+ Years', focus: 'Shaping organizational tech roadmaps, managing high-performance structures, and directing core research cells.' }
  ],
  Leadership: [
    { title: 'Program Officer', time: '1-2 Years', focus: 'Coordinating student groups, preparing learning tools, and managing academy cohort spreadsheets.' },
    { title: 'Leadership Facilitator', time: '2-4 Years', focus: 'Hosting training tracks, curating strategic resources, and driving student outcome reviews.' },
    { title: 'Program Director / Manager', time: '4-6 Years', focus: 'Directing regional academies, securing partnership networks, and budgeting cohort programs.' },
    { title: 'Head of Global Academy', time: '6+ Years', focus: 'Directing the global academy expansion strategies, representing GIIN at summits, and steering regional heads.' }
  ],
  Consulting: [
    { title: 'Junior Consultant', time: '1-2 Years', focus: 'Gathering field research data, mapping startup indices, and producing high-level reports.' },
    { title: 'Innovation Advisor', time: '2-4 Years', focus: 'Leading client advisory streams, managing digital transformation sprints, and co-creating business models.' },
    { title: 'Principal Strategist', time: '4-6 Years', focus: 'Fostering relationships with impact funds, leading multi-million budgets, and reviewing advisory packages.' },
    { title: 'Partner / Managing Director', time: '6+ Years', focus: 'Steering the consulting wing, securing global mandates, and defining organizational strategic visions.' }
  ],
  Media: [
    { title: 'Creative Designer', time: '1-2 Years', focus: 'Designing layouts, social cards, editing short videos, and updating digital assets.' },
    { title: 'Multimedia Producer', time: '2-4 Years', focus: 'Directing cinematic shoots, scripting podcasts, planning narrative stories, and managing contractors.' },
    { title: 'Creative Director', time: '4+ Years', focus: 'Establishing global brand style, overseeing the media grid, and leading narrative strategy campaigns.' }
  ],
  Education: [
    { title: 'Research Associate', time: '1-2 Years', focus: 'Reviewing educational indices, gathering course feedback, and updating documentations.' },
    { title: 'Curriculum Specialist', time: '2-4 Years', focus: 'Drafting course syllabi, designing interactive tasks, and establishing evaluation metrics.' },
    { title: 'Director of Studies / Training', time: '4+ Years', focus: 'Establishing teaching standards, validating course materials, and expanding expert panels.' }
  ]
};

export const SUCCESS_METRICS = [
  { value: 500, suffix: '+', label: 'Professionals Trained', icon: 'Award' },
  { value: 100, suffix: '+', label: 'Innovation Projects Launched', icon: 'Zap' },
  { value: 20, suffix: '+', label: 'Countries Reached', icon: 'Globe' },
  { value: 50, suffix: '+', label: 'Strategic Partnerships Established', icon: 'Handshake' },
  { value: 15, suffix: 'k+', label: 'Systemic Lives Impacted', icon: 'Heart' },
];
