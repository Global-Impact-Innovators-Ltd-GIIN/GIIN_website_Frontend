"use client";

import { motion } from "framer-motion";
import { mockTasks } from "@/data/portal";

export function ProjectKanban() {
  const columns = [
    { id: "todo", title: "To Do", color: "bg-white/10" },
    { id: "in_progress", title: "In Progress", color: "bg-primary/20" },
    { id: "review", title: "In Review", color: "bg-amber-500/20" },
    { id: "done", title: "Completed", color: "bg-emerald-500/20" }
  ];

  return (
    <div className="w-full h-full min-h-[600px]">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Project Tracking</h1>
        <p className="text-white/50">Monitor milestones and engineering deliverables.</p>
      </div>

      <div className="flex gap-6 overflow-x-auto pb-8 h-[calc(100vh-250px)]">
        {columns.map((col) => {
          const columnTasks = mockTasks.filter(t => t.status === col.id);
          
          return (
            <div key={col.id} className="w-80 shrink-0 bg-[#111116] border border-white/10 rounded-3xl flex flex-col overflow-hidden">
              <div className={`p-4 border-b border-white/10 ${col.color} flex items-center justify-between`}>
                <h3 className="font-bold text-white">{col.title}</h3>
                <span className="bg-black/50 text-white text-xs font-bold px-2 py-1 rounded-md">{columnTasks.length}</span>
              </div>
              
              <div className="p-4 flex-1 overflow-y-auto space-y-4">
                {columnTasks.map((task, i) => (
                  <motion.div 
                    key={task.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="bg-white/5 border border-white/10 p-4 rounded-2xl cursor-grab hover:border-primary/50 transition-colors"
                  >
                    <h4 className="text-sm font-bold text-white mb-3 leading-snug">{task.title}</h4>
                    <div className="flex items-center justify-between text-xs font-medium">
                      <span className="text-white/40">{task.id}</span>
                      <span className={`px-2 py-1 rounded-md ${
                        new Date(task.dueDate) < new Date() ? 'bg-red-500/20 text-red-400' : 'bg-white/10 text-white/70'
                      }`}>
                        {task.dueDate}
                      </span>
                    </div>
                  </motion.div>
                ))}
                
                {columnTasks.length === 0 && (
                  <div className="text-center p-8 text-white/30 text-sm font-medium border-2 border-dashed border-white/5 rounded-2xl">
                    No tasks
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
