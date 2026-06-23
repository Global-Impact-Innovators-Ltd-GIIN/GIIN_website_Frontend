"use client";

import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, SlidersHorizontal, BookOpen, Clock, Award, CheckCircle2, ChevronRight, Play, BookMarked } from "lucide-react";

export interface Course {
  id: string;
  title: string;
  instructor: string;
  category: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  durationWeeks: number;
  durationLabel: string;
  certification: boolean;
  learningPath: "Future Leaders" | "Tech Professional" | "Innovation Leader" | "Entrepreneur" | "None";
  skills: string[];
  desc: string;
  gradient: string;
}

const initialCourses: Course[] = [
  {
    id: "lead-101",
    title: "Foundations of Civic Leadership",
    instructor: "Dr. Kofi Mensah",
    category: "leadership",
    difficulty: "Beginner",
    durationWeeks: 4,
    durationLabel: "4 Weeks (12 hrs)",
    certification: true,
    learningPath: "Future Leaders",
    skills: ["Governance", "Civic Ethics", "Strategic Communication"],
    desc: "Understand governance parameters, team communications, and basic social ethics crucial for early leadership pathways.",
    gradient: "from-[#2563EB]/40 to-[#4F46E5]/10",
  },
  {
    id: "lead-201",
    title: "Organizational Orchestration & Scaling",
    instructor: "Amina Jalloh",
    category: "leadership",
    difficulty: "Intermediate",
    durationWeeks: 6,
    durationLabel: "6 Weeks (18 hrs)",
    certification: true,
    learningPath: "Future Leaders",
    skills: ["Policy Systems", "Operations", "Crisis Control"],
    desc: "Deeper analysis into designing institutional policy, group workflows, budget control, and managing operational failures.",
    gradient: "from-[#4F46E5]/40 to-[#7C3AED]/10",
  },
  {
    id: "tech-101",
    title: "Linux Command Line & Sovereign Networks",
    instructor: "Jean-Pierre Diallo",
    category: "technology",
    difficulty: "Beginner",
    durationWeeks: 6,
    durationLabel: "6 Weeks (20 hrs)",
    certification: false,
    learningPath: "Tech Professional",
    skills: ["Linux Shell", "SSH Keys", "Web Servers", "DNS Configuration"],
    desc: "Master system command shells, local client-server links, secure SSH configurations, and sovereign network nodes.",
    gradient: "from-[#7C3AED]/40 to-[#2563EB]/10",
  },
  {
    id: "tech-202",
    title: "Distributed Applications & Microservices",
    instructor: "Ezenwa Okafor",
    category: "technology",
    difficulty: "Intermediate",
    durationWeeks: 8,
    durationLabel: "8 Weeks (24 hrs)",
    certification: true,
    learningPath: "Tech Professional",
    skills: ["Docker", "Kubernetes", "gRPC", "Next.js App Routing"],
    desc: "Structure scalable multi-service systems. Deploy containers, route APIs, and compile production-level Next.js environments.",
    gradient: "from-[#2563EB]/40 to-[#7C3AED]/10",
  },
  {
    id: "innov-101",
    title: "Design Thinking & Sandbox Ideation",
    instructor: "Sarah Osei",
    category: "innovation",
    difficulty: "Beginner",
    durationWeeks: 4,
    durationLabel: "4 Weeks (10 hrs)",
    certification: true,
    learningPath: "Innovation Leader",
    skills: ["User Mapping", "Visual Prototypes", "Ecosystem Sandboxes"],
    desc: "A hands-on approach to mapping user requirements, creating quick visual prototypes, and formulating product pathways.",
    gradient: "from-[#4F46E5]/40 to-[#2563EB]/10",
  },
  {
    id: "innov-303",
    title: "IP Strategy & Scale Architectures",
    instructor: "Sarah Osei",
    category: "innovation",
    difficulty: "Advanced",
    durationWeeks: 6,
    durationLabel: "6 Weeks (16 hrs)",
    certification: true,
    learningPath: "Innovation Leader",
    skills: ["Patent Drafting", "Licensing Models", "Market Access"],
    desc: "Formulate corporate IP structures, draft functional patent documents, and design strategies to enter global trade regions.",
    gradient: "from-[#7C3AED]/40 to-[#4F46E5]/10",
  },
  {
    id: "ent-101",
    title: "Ecosystem Assessment & MVP Launch",
    instructor: "Tunde Folawiyo",
    category: "entrepreneurship",
    difficulty: "Beginner",
    durationWeeks: 4,
    durationLabel: "4 Weeks (12 hrs)",
    certification: true,
    learningPath: "Entrepreneur",
    skills: ["MVP Testing", "Customer Interviews", "Unit Economics"],
    desc: "Validate user needs, construct clean business model canvases, measure basic unit margins, and launch mock applications.",
    gradient: "from-[#2563EB]/40 to-[#4F46E5]/10",
  },
  {
    id: "ent-302",
    title: "Institutional Scaling & Venture Financing",
    instructor: "Tunde Folawiyo",
    category: "entrepreneurship",
    difficulty: "Advanced",
    durationWeeks: 10,
    durationLabel: "10 Weeks (30 hrs)",
    certification: true,
    learningPath: "Entrepreneur",
    skills: ["Venture Capital", "Corporate Governance", "Board Structuring"],
    desc: "Deep study in securing institutional Series capital, structuring stakeholder boards, and setting up international expansion plans.",
    gradient: "from-[#7C3AED]/40 to-[#2563EB]/10",
  },
  {
    id: "cons-201",
    title: "Strategic Diagnostics & Consulting Excellence",
    instructor: "Amina Jalloh",
    category: "consulting",
    difficulty: "Advanced",
    durationWeeks: 8,
    durationLabel: "8 Weeks (24 hrs)",
    certification: true,
    learningPath: "None",
    skills: ["Diagnostic Frameworks", "Financial Modeling", "Pitch Structuring"],
    desc: "Learn to diagnose corporate bottlenecks, build clean economic models, and deliver pitch reports to executive boards.",
    gradient: "from-[#4F46E5]/40 to-[#7C3AED]/10",
  },
];

interface CourseCatalogProps {
  onEnrollClick: (course: Course) => void;
}

export function CourseCatalog({ onEnrollClick }: CourseCatalogProps) {
  const [courses, setCourses] = useState<Course[]>(initialCourses);
  const [enrollments, setEnrollments] = useState<Record<string, "Not Enrolled" | "In Progress" | "Completed">>({
    "lead-101": "In Progress",
    "tech-101": "Completed",
  });

  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedDifficulty, setSelectedDifficulty] = useState("all");
  const [selectedDuration, setSelectedDuration] = useState("all");
  const [selectedInstructor, setSelectedInstructor] = useState("all");
  const [selectedCert, setSelectedCert] = useState("all");
  const [selectedPath, setSelectedPath] = useState("all");
  const [showFilters, setShowFilters] = useState(false);

  // Extract unique instructors for filters
  const instructorsList = useMemo(() => {
    return Array.from(new Set(initialCourses.map((c) => c.instructor)));
  }, []);

  // Filtering Logic
  const filteredCourses = useMemo(() => {
    return courses.filter((c) => {
      const matchesSearch =
        c.title.toLowerCase().includes(search.toLowerCase()) ||
        c.instructor.toLowerCase().includes(search.toLowerCase()) ||
        c.desc.toLowerCase().includes(search.toLowerCase()) ||
        c.skills.some((s) => s.toLowerCase().includes(search.toLowerCase()));

      const matchesCategory = selectedCategory === "all" || c.category === selectedCategory;
      const matchesDifficulty = selectedDifficulty === "all" || c.difficulty === selectedDifficulty;
      const matchesInstructor = selectedInstructor === "all" || c.instructor === selectedInstructor;
      const matchesPath = selectedPath === "all" || c.learningPath === selectedPath;

      const matchesCert =
        selectedCert === "all" ||
        (selectedCert === "yes" && c.certification) ||
        (selectedCert === "no" && !c.certification);

      let matchesDuration = true;
      if (selectedDuration !== "all") {
        if (selectedDuration === "short") matchesDuration = c.durationWeeks < 6;
        else if (selectedDuration === "medium") matchesDuration = c.durationWeeks >= 6 && c.durationWeeks <= 8;
        else if (selectedDuration === "long") matchesDuration = c.durationWeeks > 8;
      }

      return matchesSearch && matchesCategory && matchesDifficulty && matchesInstructor && matchesCert && matchesPath && matchesDuration;
    });
  }, [courses, search, selectedCategory, selectedDifficulty, selectedDuration, selectedInstructor, selectedCert, selectedPath]);

  const handleLocalEnroll = (courseId: string) => {
    setEnrollments((prev) => {
      const current = prev[courseId] || "Not Enrolled";
      let nextStatus: "In Progress" | "Completed" | "Not Enrolled" = "In Progress";
      if (current === "In Progress") {
        nextStatus = "Completed";
      } else if (current === "Completed") {
        nextStatus = "Not Enrolled";
      }
      return {
        ...prev,
        [courseId]: nextStatus,
      };
    });

    const courseObj = courses.find((c) => c.id === courseId);
    if (courseObj) {
      onEnrollClick(courseObj);
    }
  };

  const clearFilters = () => {
    setSearch("");
    setSelectedCategory("all");
    setSelectedDifficulty("all");
    setSelectedDuration("all");
    setSelectedInstructor("all");
    setSelectedCert("all");
    setSelectedPath("all");
  };

  return (
    <section id="catalog" className="py-24 bg-[#050816] text-white relative px-6 border-t border-white/5">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="text-left">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#2563EB] mb-2 block font-sans">
              Marketplace & Catalog
            </span>
            <h2 className="text-3xl md:text-5xl font-black font-space-grotesk tracking-tight leading-tight">
              GIIN Course Catalog
            </h2>
          </div>
          <div className="flex items-center gap-3">
            <div className="relative flex-1 md:w-80">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#A1A1AA]" />
              <input
                type="text"
                placeholder="Search title, instructor, skill..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full h-11 pl-10 pr-4 rounded-xl bg-white/5 border border-white/10 text-white placeholder-[#A1A1AA] focus:border-[#2563EB] focus:ring-1 focus:ring-[#2563EB] outline-none transition-all text-sm font-sans"
              />
            </div>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`flex items-center gap-2 h-11 px-4 rounded-xl border text-sm font-bold transition-all cursor-pointer ${
                showFilters || selectedCategory !== "all" || selectedDifficulty !== "all" || selectedDuration !== "all" || selectedInstructor !== "all" || selectedCert !== "all" || selectedPath !== "all"
                  ? "border-[#2563EB] bg-[#2563EB]/10 text-white"
                  : "border-white/10 bg-white/5 text-[#A1A1AA] hover:text-white"
              }`}
            >
              <SlidersHorizontal className="w-4 h-4" />
              <span className="hidden sm:inline">Filters</span>
            </button>
          </div>
        </div>

        {/* Filters Section Panel */}
        <AnimatePresence>
          {showFilters && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="p-6 rounded-2xl border border-white/5 bg-[#0A0A12]/95 mb-12 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 relative z-30 shadow-xl"
            >
              {/* Category */}
              <div className="space-y-2 text-left">
                <label className="text-xs font-bold text-[#A1A1AA] uppercase tracking-wider font-space-grotesk">Category</label>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full h-10 px-3 rounded-lg bg-white/5 border border-white/10 text-xs text-white focus:border-[#2563EB] outline-none font-sans"
                >
                  <option value="all">All Categories</option>
                  <option value="leadership">Leadership</option>
                  <option value="technology">Technology</option>
                  <option value="innovation">Innovation</option>
                  <option value="entrepreneurship">Entrepreneurship</option>
                  <option value="consulting">Consulting</option>
                </select>
              </div>

              {/* Difficulty */}
              <div className="space-y-2 text-left">
                <label className="text-xs font-bold text-[#A1A1AA] uppercase tracking-wider font-space-grotesk">Difficulty</label>
                <select
                  value={selectedDifficulty}
                  onChange={(e) => setSelectedDifficulty(e.target.value)}
                  className="w-full h-10 px-3 rounded-lg bg-white/5 border border-white/10 text-xs text-white focus:border-[#2563EB] outline-none font-sans"
                >
                  <option value="all">All Levels</option>
                  <option value="Beginner">Beginner</option>
                  <option value="Intermediate">Intermediate</option>
                  <option value="Advanced">Advanced</option>
                </select>
              </div>

              {/* Duration */}
              <div className="space-y-2 text-left">
                <label className="text-xs font-bold text-[#A1A1AA] uppercase tracking-wider font-space-grotesk">Duration</label>
                <select
                  value={selectedDuration}
                  onChange={(e) => setSelectedDuration(e.target.value)}
                  className="w-full h-10 px-3 rounded-lg bg-white/5 border border-white/10 text-xs text-white focus:border-[#2563EB] outline-none font-sans"
                >
                  <option value="all">Any Duration</option>
                  <option value="short">Short (&lt; 6 wks)</option>
                  <option value="medium">Medium (6-8 wks)</option>
                  <option value="long">Long (&gt; 8 wks)</option>
                </select>
              </div>

              {/* Instructor */}
              <div className="space-y-2 text-left">
                <label className="text-xs font-bold text-[#A1A1AA] uppercase tracking-wider font-space-grotesk">Instructor</label>
                <select
                  value={selectedInstructor}
                  onChange={(e) => setSelectedInstructor(e.target.value)}
                  className="w-full h-10 px-3 rounded-lg bg-white/5 border border-white/10 text-xs text-white focus:border-[#2563EB] outline-none font-sans"
                >
                  <option value="all">All Instructors</option>
                  {instructorsList.map((inst) => (
                    <option key={inst} value={inst}>
                      {inst}
                    </option>
                  ))}
                </select>
              </div>

              {/* Certification */}
              <div className="space-y-2 text-left">
                <label className="text-xs font-bold text-[#A1A1AA] uppercase tracking-wider font-space-grotesk">Certification</label>
                <select
                  value={selectedCert}
                  onChange={(e) => setSelectedCert(e.target.value)}
                  className="w-full h-10 px-3 rounded-lg bg-white/5 border border-white/10 text-xs text-white focus:border-[#2563EB] outline-none font-sans"
                >
                  <option value="all">All Types</option>
                  <option value="yes">With Certificate</option>
                  <option value="no">Self-Paced Only</option>
                </select>
              </div>

              {/* Learning Path */}
              <div className="space-y-2 text-left">
                <label className="text-xs font-bold text-[#A1A1AA] uppercase tracking-wider font-space-grotesk">Learning Path</label>
                <select
                  value={selectedPath}
                  onChange={(e) => setSelectedPath(e.target.value)}
                  className="w-full h-10 px-3 rounded-lg bg-white/5 border border-white/10 text-xs text-white focus:border-[#2563EB] outline-none font-sans"
                >
                  <option value="all">All Paths</option>
                  <option value="Future Leaders">Future Leaders</option>
                  <option value="Tech Professional">Tech Professional</option>
                  <option value="Innovation Leader">Innovation Leader</option>
                  <option value="Entrepreneur">Entrepreneur</option>
                </select>
              </div>

              <div className="col-span-2 md:col-span-3 lg:col-span-6 flex justify-end">
                <button
                  onClick={clearFilters}
                  className="text-xs font-bold text-[#2563EB] hover:underline cursor-pointer"
                >
                  Clear All Filters
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Courses Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredCourses.length > 0 ? (
              filteredCourses.map((course, idx) => {
                const enrollmentStatus = enrollments[course.id] || "Not Enrolled";

                return (
                  <motion.div
                    key={course.id}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.3 }}
                    className="group relative rounded-3xl border border-white/5 bg-[#0A0A12]/95 p-6 hover:border-[#2563EB]/35 transition-all duration-300 flex flex-col justify-between overflow-hidden min-h-[420px]"
                  >
                    {/* Visual Card Gradient Header representing Course Image */}
                    <div className={`absolute top-0 left-0 right-0 h-32 bg-gradient-to-br ${course.gradient} opacity-20 -z-10 group-hover:opacity-40 transition-opacity duration-300`} />

                    <div>
                      {/* Top labels */}
                      <div className="flex justify-between items-start mb-6">
                        <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-white/5 border border-white/10 text-[#A1A1AA] font-sans">
                          {course.category}
                        </span>
                        
                        {/* Enrollment Status Indicator badge */}
                        <div className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold font-sans ${
                          enrollmentStatus === "Completed"
                            ? "bg-green-500/10 text-green-400 border border-green-500/20"
                            : enrollmentStatus === "In Progress"
                            ? "bg-[#2563EB]/15 text-[#2563EB] border border-[#2563EB]/25"
                            : "bg-white/5 text-[#A1A1AA] border border-white/10"
                        }`}>
                          <BookMarked className="w-3 h-3" />
                          {enrollmentStatus}
                        </div>
                      </div>

                      <h3 className="text-lg font-bold font-space-grotesk text-white group-hover:text-[#2563EB] transition-colors leading-tight mb-2 text-left">
                        {course.title}
                      </h3>
                      
                      <div className="text-xs text-[#A1A1AA] text-left mb-4 font-sans font-light">
                        Instructor: <span className="font-semibold text-white/95">{course.instructor}</span>
                      </div>

                      <p className="text-xs text-[#A1A1AA] font-sans font-light leading-relaxed mb-6 text-left line-clamp-3">
                        {course.desc}
                      </p>

                      <div className="flex flex-wrap gap-1.5 mb-6 justify-start">
                        {course.skills.map((skill, sIdx) => (
                          <span key={sIdx} className="text-[9px] font-sans bg-white/5 px-2 py-0.5 rounded text-white/70">
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="border-t border-white/5 pt-4">
                      <div className="flex justify-between items-center text-xs text-[#A1A1AA] font-sans mb-4">
                        <div className="flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5 text-[#2563EB]" />
                          <span>{course.durationLabel}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          {course.certification && <Award className="w-3.5 h-3.5 text-[#7C3AED]" />}
                          <span>{course.difficulty}</span>
                        </div>
                      </div>

                      <button
                        onClick={() => handleLocalEnroll(course.id)}
                        className={`w-full py-3.5 rounded-xl text-xs font-bold font-sans transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-95 ${
                          enrollmentStatus === "Completed"
                            ? "bg-green-500/10 hover:bg-green-500/20 text-green-400 border border-green-500/20"
                            : enrollmentStatus === "In Progress"
                            ? "bg-white/5 border border-white/10 hover:bg-[#2563EB]/15 text-[#2563EB]"
                            : "bg-[#2563EB] text-white hover:bg-[#2563EB]/95"
                        }`}
                      >
                        {enrollmentStatus === "Completed" ? (
                          <>
                            <CheckCircle2 className="w-4 h-4" />
                            <span>Course Completed (Reset)</span>
                          </>
                        ) : enrollmentStatus === "In Progress" ? (
                          <>
                            <Play className="w-3.5 h-3.5 fill-current" />
                            <span>Resume Lessons</span>
                          </>
                        ) : (
                          <>
                            <span>Enroll in Course</span>
                            <ChevronRight className="w-3.5 h-3.5" />
                          </>
                        )}
                      </button>
                    </div>
                  </motion.div>
                );
              })
            ) : (
              <div className="col-span-1 md:col-span-2 lg:col-span-3 text-center py-20 border border-dashed border-white/5 rounded-3xl bg-[#0A0A12]/40">
                <BookOpen className="w-12 h-12 text-[#A1A1AA] mx-auto mb-4 opacity-50" />
                <h3 className="text-lg font-bold font-space-grotesk text-white">No courses match your query</h3>
                <p className="text-xs text-[#A1A1AA] font-sans font-light mt-1 max-w-sm mx-auto">
                  Try checking other keywords or clear all filter checkboxes above.
                </p>
                <button
                  onClick={clearFilters}
                  className="mt-6 px-5 py-2.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-xs font-bold cursor-pointer"
                >
                  Clear Filters
                </button>
              </div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
