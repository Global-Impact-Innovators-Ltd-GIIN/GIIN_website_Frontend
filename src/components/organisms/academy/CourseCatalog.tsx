"use client";

import { motion } from "framer-motion";
import { coursesData } from "@/data/academy";
import Link from "next/link";

export function CourseCatalog() {
  return (
    <div className="p-8 md:p-12 w-full max-w-7xl mx-auto space-y-12">
      <div className="text-center max-w-3xl mx-auto mb-16">
        <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-6">Course Catalog</h1>
        <p className="text-xl text-muted-foreground">Discover cutting-edge programs in Leadership, Technology, and Cybersecurity designed for enterprise excellence.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {coursesData.map((course, i) => (
          <motion.div
            key={course.id}
            className="group relative flex flex-col rounded-3xl border border-white/10 bg-white/5 overflow-hidden hover:border-primary/50 transition-all"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            <div className={`h-48 w-full bg-gradient-to-br ${course.thumbnail} relative`}>
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/10 transition-colors" />
              <div className="absolute bottom-4 left-4 flex gap-2">
                {course.tags.map(tag => (
                  <span key={tag} className="bg-black/60 backdrop-blur-md rounded-full px-3 py-1 text-xs font-bold text-white uppercase tracking-wider">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            <div className="p-8 flex-1 flex flex-col">
              <h3 className="text-2xl font-bold text-white mb-3 leading-tight group-hover:text-primary transition-colors">{course.title}</h3>
              <p className="text-muted-foreground mb-6">Instructor: <span className="text-white/80">{course.instructor}</span></p>
              
              <div className="mt-auto flex items-center justify-between">
                <span className="text-sm font-medium text-white/50">{course.totalModules} Modules</span>
                <Link href={`/academy/courses/${course.id}`} className="text-primary font-bold hover:text-white transition-colors flex items-center gap-2">
                  View Details <span aria-hidden="true">&rarr;</span>
                </Link>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
