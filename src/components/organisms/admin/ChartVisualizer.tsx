"use client";

import { motion } from "framer-motion";

export function ChartVisualizer({ title, type }: { title: string, type: 'bar' | 'line' }) {
  const dataPoints = [45, 60, 30, 80, 55, 90, 40, 75, 65, 85, 50, 70];

  return (
    <div className="bg-[#111] border border-zinc-800 rounded-lg p-6 w-full h-64 flex flex-col">
      <h3 className="text-zinc-400 font-bold tracking-widest text-xs uppercase mb-4">{title}</h3>
      <div className="flex-1 flex items-end justify-between gap-2">
        {dataPoints.map((val, i) => (
          <div key={i} className="relative w-full h-full flex items-end justify-center group">
            {type === 'bar' ? (
              <motion.div 
                className="w-full bg-red-500/50 hover:bg-red-500 rounded-t-sm transition-colors"
                initial={{ height: 0 }}
                animate={{ height: `${val}%` }}
                transition={{ duration: 1, delay: i * 0.05 }}
              />
            ) : (
              <motion.div 
                className="w-2 rounded-full bg-primary/50 group-hover:bg-primary transition-colors"
                initial={{ height: 0 }}
                animate={{ height: `${val}%` }}
                transition={{ duration: 1, delay: i * 0.05 }}
              />
            )}
            <span className="absolute -top-6 opacity-0 group-hover:opacity-100 text-[10px] text-white transition-opacity bg-black px-1 rounded">
              {val}k
            </span>
          </div>
        ))}
      </div>
      <div className="flex justify-between mt-4 border-t border-zinc-800 pt-2 text-[10px] text-zinc-600 uppercase">
        <span>Jan</span><span>Mar</span><span>Jun</span><span>Sep</span><span>Dec</span>
      </div>
    </div>
  );
}
