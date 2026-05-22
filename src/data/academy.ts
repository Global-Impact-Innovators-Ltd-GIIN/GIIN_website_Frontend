export interface Course {
  id: string;
  title: string;
  instructor: string;
  thumbnail: string;
  progress: number;
  totalModules: number;
  completedModules: number;
  status: "in-progress" | "completed" | "not-started";
  category: string;
  tags: string[];
}

export interface UserStats {
  name: string;
  role: string;
  points: number;
  rank: string;
  badges: { name: string; icon: string }[];
}

export const mockUser: UserStats = {
  name: "Jane Doe",
  role: "Senior Executive",
  points: 12450,
  rank: "Visionary Leader",
  badges: [
    { name: "Fast Learner", icon: "⚡" },
    { name: "Top 10%", icon: "🏆" },
    { name: "Cyber Expert", icon: "🛡️" }
  ]
};

export const coursesData: Course[] = [
  {
    id: "lead-101",
    title: "Executive Agile Transformation",
    instructor: "Dr. Sarah O.",
    thumbnail: "from-amber-500/20 to-amber-900/40",
    progress: 75,
    totalModules: 12,
    completedModules: 9,
    status: "in-progress",
    category: "Leadership",
    tags: ["Agile", "Management"]
  },
  {
    id: "ai-201",
    title: "Implementing RAG Architectures",
    instructor: "James T.",
    thumbnail: "from-blue-500/20 to-blue-900/40",
    progress: 100,
    totalModules: 8,
    completedModules: 8,
    status: "completed",
    category: "Technology",
    tags: ["AI", "Architecture"]
  },
  {
    id: "cyb-301",
    title: "Zero-Trust Security Models",
    instructor: "Elena M.",
    thumbnail: "from-red-500/20 to-red-900/40",
    progress: 0,
    totalModules: 15,
    completedModules: 0,
    status: "not-started",
    category: "Cybersecurity",
    tags: ["Security", "Compliance"]
  }
];
