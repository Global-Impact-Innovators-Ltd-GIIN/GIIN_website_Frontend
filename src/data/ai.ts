export interface AIPersona {
  id: string;
  name: string;
  role: string;
  description: string;
  icon: string;
  color: string;
}

export interface ChatSession {
  id: string;
  title: string;
  date: string;
  personaId: string;
}

export const aiPersonas: AIPersona[] = [
  { id: "giin-core", name: "GIIN Core", role: "General Assistant", description: "Your primary interface for navigating the GIIN ecosystem.", icon: "🧠", color: "from-primary/20 to-primary/40" },
  { id: "proposal-gen", name: "ProposalGen", role: "Sales Architect", description: "Rapidly generate highly technical enterprise proposals.", icon: "📄", color: "from-amber-500/20 to-amber-900/40" },
  { id: "leadership-adv", name: "Executive Advisor", role: "Leadership Consultant", description: "Strategic guidance for C-level executives.", icon: "♟️", color: "from-blue-500/20 to-blue-900/40" },
  { id: "innovation-bot", name: "Innova", role: "Innovation Assistant", description: "Brainstorming and product ideation.", icon: "💡", color: "from-purple-500/20 to-purple-900/40" },
  { id: "course-rec", name: "Academy Guide", role: "Learning Advisor", description: "Personalized course and skill recommendations.", icon: "🎓", color: "from-emerald-500/20 to-emerald-900/40" }
];

export const chatHistory: ChatSession[] = [
  { id: "c1", title: "Cybersecurity RFP Draft", date: "Today", personaId: "proposal-gen" },
  { id: "c2", title: "Q3 Board Strategy", date: "Yesterday", personaId: "leadership-adv" },
  { id: "c3", title: "Quantum Computing Ideation", date: "Previous 7 Days", personaId: "innovation-bot" },
  { id: "c4", title: "Recommend Cloud Certs", date: "Previous 7 Days", personaId: "course-rec" }
];
