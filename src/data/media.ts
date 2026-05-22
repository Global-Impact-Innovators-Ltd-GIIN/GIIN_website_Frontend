export interface VideoAsset {
  id: string;
  title: string;
  description: string;
  duration: string;
  thumbnail: string;
  category: "Documentary" | "Series" | "Highlight";
  isNew?: boolean;
}

export interface LiveStream {
  title: string;
  viewers: number;
  status: "live" | "offline";
  speaker: string;
}

export interface StudioStats {
  totalViews: string;
  activeStreams: number;
  storageUsed: string;
  recentUploads: VideoAsset[];
}

export const liveStreamData: LiveStream = {
  title: "Global Summit 2026: Keynote Address",
  viewers: 14502,
  status: "live",
  speaker: "CEO, GIIN"
};

export const documentariesData: VideoAsset[] = [
  { id: "doc1", title: "The African Tech Renaissance", description: "How local startups are redefining global markets.", duration: "1:45:00", thumbnail: "bg-blue-900", category: "Documentary", isNew: true },
  { id: "doc2", title: "Zero-Trust: A Hacker's Perspective", description: "Inside the minds of the world's top red teams.", duration: "55:20", thumbnail: "bg-red-900", category: "Documentary" },
  { id: "doc3", title: "Building the Smart City", description: "Urban innovation powered by IoT and AI.", duration: "1:12:00", thumbnail: "bg-emerald-900", category: "Documentary" },
  { id: "doc4", title: "The Quantum Leap", description: "Preparing for post-quantum encryption.", duration: "45:00", thumbnail: "bg-purple-900", category: "Documentary" }
];

export const studioStatsData: StudioStats = {
  totalViews: "2.4M",
  activeStreams: 1,
  storageUsed: "45.2 TB",
  recentUploads: [
    { id: "up1", title: "Podcast Ep. 42 Final Mix", description: "", duration: "45:00", thumbnail: "bg-zinc-800", category: "Highlight" },
    { id: "up2", title: "Q3 Townhall Raw Footage", description: "", duration: "2:15:00", thumbnail: "bg-zinc-800", category: "Series" }
  ]
};

export const galleryData = [
  "bg-amber-500/20", "bg-blue-500/20", "bg-purple-500/20", "bg-red-500/20",
  "bg-emerald-500/20", "bg-pink-500/20", "bg-indigo-500/20", "bg-teal-500/20"
];
