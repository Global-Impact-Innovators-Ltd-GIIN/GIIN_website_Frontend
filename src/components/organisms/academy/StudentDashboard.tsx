"use client";

import { motion } from "framer-motion";
import { mockUser, coursesData } from "@/data/academy";
import Link from "next/link";

export function StudentDashboard() {
  const inProgressCourses = coursesData.filter(c => c.status === "in-progress");
  const completedCourses = coursesData.filter(c => c.status === "completed");

  return (
    <div className="p-8 md:p-12 w-full max-w-7xl mx-auto space-y-12">
      {/* Welcome & Stats Row */}
      <div className="flex flex-col md:flex-row gap-8 items-start justify-between">
        <motion.div 
          className="flex-1"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-4xl font-bold text-white mb-2">Welcome back, {mockUser.name}</h1>
          <p className="text-muted-foreground text-lg">Your journey to becoming a {mockUser.rank} continues.</p>
        </motion.div>
        
        <motion.div 
          className="flex gap-4"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
        >
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 text-center min-w-[150px]">
            <div className="text-3xl font-extrabold text-primary mb-1">{mockUser.points}</div>
            <div className="text-xs uppercase tracking-widest text-white/50 font-bold">XP Points</div>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 text-center min-w-[150px]">
            <div className="text-3xl font-extrabold text-white mb-1">{completedCourses.length}</div>
            <div className="text-xs uppercase tracking-widest text-white/50 font-bold">Certificates</div>
          </div>
        </motion.div>
      </div>

      {/* Badges */}
      <div>
        <h2 className="text-xl font-bold text-white mb-6">Recent Badges</h2>
        <div className="flex gap-4 overflow-x-auto pb-4">
          {mockUser.badges.map((badge, i) => (
            <motion.div 
              key={i}
              className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-full px-6 py-3 whitespace-nowrap"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 + i * 0.1 }}
            >
              <span className="text-2xl">{badge.icon}</span>
              <span className="font-semibold text-white/90">{badge.name}</span>
            </motion.div>
          ))}
        </div>
      </div>

      {/* In Progress Courses */}
      <div>
        <h2 className="text-xl font-bold text-white mb-6">Continue Learning</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {inProgressCourses.map((course, i) => (
            <motion.div
              key={course.id}
              className="group relative flex flex-col rounded-3xl border border-white/10 bg-white/5 overflow-hidden"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + i * 0.1 }}
            >
              <div className={`h-32 w-full bg-gradient-to-br ${course.thumbnail} relative`}>
                <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors" />
                <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-md rounded-full px-3 py-1 text-xs font-bold text-white uppercase tracking-wider">
                  {course.category}
                </div>
              </div>
              <div className="p-6 flex-1 flex flex-col">
                <h3 className="text-xl font-bold text-white mb-2 leading-tight">{course.title}</h3>
                <p className="text-sm text-muted-foreground mb-6">Instructor: {course.instructor}</p>
                
                <div className="mt-auto space-y-2">
                  <div className="flex justify-between text-sm font-medium">
                    <span className="text-white/70">{course.completedModules} / {course.totalModules} Modules</span>
                    <span className="text-primary">{course.progress}%</span>
                  </div>
                  <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                    <div className="h-full bg-primary" style={{ width: `${course.progress}%` }} />
                  </div>
                </div>

                <Link href={`/academy/learn/${course.id}`} className="mt-6 w-full block text-center bg-white/10 hover:bg-white/20 text-white font-semibold py-3 rounded-xl transition-colors">
                  Resume Course
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
