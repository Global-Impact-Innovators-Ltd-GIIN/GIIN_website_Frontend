'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Calendar, DollarSign, Bookmark, ArrowUpRight } from 'lucide-react';
import { Job } from '@/interfaces/careers';

interface JobCardProps {
  job: Job;
  isSaved: boolean;
  onToggleSave: () => void;
  onApply: () => void;
  onViewDetails: () => void;
}

export function JobCard({ job, isSaved, onToggleSave, onApply, onViewDetails }: JobCardProps) {
  const getDeptColor = (dept: string) => {
    switch (dept) {
      case 'Technology':
        return 'text-purple-400 border-purple-500/20 bg-purple-950/20';
      case 'Leadership':
        return 'text-blue-400 border-blue-500/20 bg-blue-950/20';
      case 'Consulting':
        return 'text-pink-400 border-pink-500/20 bg-pink-950/20';
      case 'Media':
        return 'text-amber-400 border-amber-500/20 bg-amber-950/20';
      case 'Education':
        return 'text-emerald-400 border-emerald-500/20 bg-emerald-950/20';
      default:
        return 'text-slate-400 border-slate-500/20 bg-slate-950/20';
    }
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] as const }}
      className="p-6 md:p-8 rounded-3xl border border-slate-800 bg-slate-900/10 hover:border-slate-700/60 hover:bg-slate-900/30 backdrop-blur-md transition-all duration-300 relative group flex flex-col justify-between text-left h-full text-white shadow-xl hover:shadow-purple-500/5"
    >
      <div className="space-y-6">
        {/* Header Bar */}
        <div className="flex items-start justify-between gap-4">
          <div className="space-y-2">
            <span
              className={`inline-block px-3 py-1 rounded-full border text-xs font-semibold tracking-wider uppercase ${getDeptColor(
                job.department
              )}`}
            >
              {job.department}
            </span>
            <h3
              onClick={onViewDetails}
              className="text-xl md:text-2xl font-bold font-heading group-hover:text-purple-300 transition-colors duration-300 leading-tight cursor-pointer flex items-center gap-1"
            >
              {job.title}
              <ArrowUpRight size={18} className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-purple-400" />
            </h3>
          </div>

          {/* Save Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              onToggleSave();
            }}
            className={`h-10 w-10 rounded-xl border flex items-center justify-center cursor-pointer transition-all duration-300 ${
              isSaved
                ? 'border-purple-500 bg-purple-950/30 text-purple-400 shadow-md shadow-purple-500/10'
                : 'border-slate-800 bg-slate-950/40 text-slate-400 hover:border-slate-700 hover:text-white'
            }`}
            aria-label={isSaved ? 'Unsave Job' : 'Save Job'}
          >
            <Bookmark size={18} fill={isSaved ? 'currentColor' : 'none'} />
          </button>
        </div>

        {/* Text descriptions */}
        <p className="text-gray-400 text-xs md:text-sm leading-relaxed line-clamp-3">
          {job.description}
        </p>

        {/* Specifications Pills */}
        <div className="grid grid-cols-2 gap-4 text-xs text-gray-500">
          <div className="flex items-center gap-2">
            <MapPin size={14} className="text-purple-400" />
            <span className="truncate">{job.location}</span>
          </div>
          <div className="flex items-center gap-2">
            <Calendar size={14} className="text-blue-400" />
            <span>{job.type}</span>
          </div>
          {job.salaryRange && (
            <div className="flex items-center gap-2 col-span-2">
              <DollarSign size={14} className="text-emerald-400" />
              <span>{job.salaryRange}</span>
            </div>
          )}
        </div>

        {/* Skill tags */}
        <div className="flex flex-wrap gap-2 pt-2">
          {job.skills.map((skill, index) => (
            <span
              key={index}
              className="px-2.5 py-1 rounded-md border border-white/5 bg-white/5 text-[10px] md:text-xs font-semibold text-slate-400"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>

      {/* Trigger Actions */}
      <div className="pt-6 border-t border-slate-800/80 mt-6 flex items-center gap-4">
        <button
          onClick={onApply}
          className="flex-1 py-3 rounded-xl bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-400 hover:to-blue-400 text-black font-semibold text-sm transition-all duration-300 shadow-md cursor-pointer flex items-center justify-center"
        >
          Quick Apply
        </button>
        <button
          onClick={onViewDetails}
          className="px-4 py-3 rounded-xl border border-slate-800 bg-slate-950/40 text-slate-300 hover:text-white hover:border-slate-700 font-semibold text-sm transition-all duration-300 cursor-pointer flex items-center justify-center"
        >
          Details
        </button>
      </div>
    </motion.div>
  );
}
