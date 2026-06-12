'use client';

import React from 'react';
import { Search, RotateCcw } from 'lucide-react';
import { JobDepartment, EmploymentType, ExperienceLevel } from '@/types/careers';

interface JobFiltersProps {
  searchQuery: string;
  onSearchChange: (val: string) => void;
  selectedDept: JobDepartment | 'All';
  onDeptChange: (val: JobDepartment | 'All') => void;
  selectedType: EmploymentType | 'All';
  onTypeChange: (val: EmploymentType | 'All') => void;
  selectedLevel: ExperienceLevel | 'All';
  onLevelChange: (val: ExperienceLevel | 'All') => void;
  onClear: () => void;
  jobsCount: number;
}

const DEPARTMENTS: (JobDepartment | 'All')[] = ['All', 'Technology', 'Leadership', 'Consulting', 'Media', 'Education'];
const TYPES: (EmploymentType | 'All')[] = ['All', 'Full-time', 'Part-time', 'Contract', 'Internship'];
const LEVELS: (ExperienceLevel | 'All')[] = ['All', 'Entry-level', 'Mid-level', 'Senior', 'Lead', 'Executive'];

export function JobFilters({
  searchQuery,
  onSearchChange,
  selectedDept,
  onDeptChange,
  selectedType,
  onTypeChange,
  selectedLevel,
  onLevelChange,
  onClear,
  jobsCount,
}: JobFiltersProps) {
  const hasActiveFilters =
    searchQuery.trim() !== '' ||
    selectedDept !== 'All' ||
    selectedType !== 'All' ||
    selectedLevel !== 'All';

  return (
    <div className="p-6 md:p-8 rounded-3xl border border-slate-800 bg-slate-900/30 backdrop-blur-xl space-y-6 text-white text-left shadow-2xl">
      <div className="flex flex-col md:flex-row gap-6 items-end">
        {/* Search Input Box */}
        <div className="flex-1 w-full space-y-2">
          <label htmlFor="search-jobs" className="text-xs font-semibold text-slate-400 uppercase tracking-widest">
            Search Opportunities
          </label>
          <div className="relative w-full">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 h-5 h-5 pointer-events-none" />
            <input
              id="search-jobs"
              type="text"
              placeholder="Search by job title, core stack, keyword..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full pl-12 pr-4 py-3.5 rounded-xl border border-slate-800 focus:border-purple-500/60 bg-slate-950/60 text-white placeholder-slate-500 outline-none transition-all duration-300 shadow-inner"
            />
          </div>
        </div>

        {/* Clear Filters Button */}
        {hasActiveFilters && (
          <button
            onClick={onClear}
            className="w-full md:w-auto px-5 py-3.5 rounded-xl border border-dashed border-red-500/30 hover:border-red-500/60 bg-red-950/10 hover:bg-red-950/20 text-red-400 text-sm font-semibold flex items-center justify-center gap-2 transition-all duration-300 cursor-pointer"
          >
            <RotateCcw size={16} />
            Reset Filters
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {/* Department Selector */}
        <div className="space-y-2">
          <label htmlFor="filter-dept" className="text-xs font-semibold text-slate-400 uppercase tracking-widest">
            Department
          </label>
          <select
            id="filter-dept"
            value={selectedDept}
            onChange={(e) => onDeptChange(e.target.value as JobDepartment | 'All')}
            className="w-full px-4 py-3.5 rounded-xl border border-slate-800 bg-slate-950/60 text-white outline-none cursor-pointer focus:border-purple-500/60 transition-all duration-300"
          >
            {DEPARTMENTS.map((dept) => (
              <option key={dept} value={dept} className="bg-slate-950">
                {dept}
              </option>
            ))}
          </select>
        </div>

        {/* Employment Type Selector */}
        <div className="space-y-2">
          <label htmlFor="filter-type" className="text-xs font-semibold text-slate-400 uppercase tracking-widest">
            Employment Type
          </label>
          <select
            id="filter-type"
            value={selectedType}
            onChange={(e) => onTypeChange(e.target.value as EmploymentType | 'All')}
            className="w-full px-4 py-3.5 rounded-xl border border-slate-800 bg-slate-950/60 text-white outline-none cursor-pointer focus:border-purple-500/60 transition-all duration-300"
          >
            {TYPES.map((type) => (
              <option key={type} value={type} className="bg-slate-950">
                {type}
              </option>
            ))}
          </select>
        </div>

        {/* Experience Level Selector */}
        <div className="space-y-2">
          <label htmlFor="filter-level" className="text-xs font-semibold text-slate-400 uppercase tracking-widest">
            Experience Level
          </label>
          <select
            id="filter-level"
            value={selectedLevel}
            onChange={(e) => onLevelChange(e.target.value as ExperienceLevel | 'All')}
            className="w-full px-4 py-3.5 rounded-xl border border-slate-800 bg-slate-950/60 text-white outline-none cursor-pointer focus:border-purple-500/60 transition-all duration-300"
          >
            {LEVELS.map((lvl) => (
              <option key={lvl} value={lvl} className="bg-slate-950">
                {lvl}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Statistics Match Overlay */}
      <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs md:text-sm text-slate-400">
        <span>
          Showing <span className="text-purple-400 font-bold">{jobsCount}</span> open roles matching filters
        </span>
        {hasActiveFilters && (
          <span className="text-slate-500 italic">
            Filters are actively applied
          </span>
        )}
      </div>
    </div>
  );
}
