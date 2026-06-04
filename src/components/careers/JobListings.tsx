'use client';

import React, { useState, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { X, Check, Eye, Trash, ArrowUpRight } from 'lucide-react';
import { useCareers } from '@/hooks/useCareers';
import { JobFilters } from './JobFilters';
import { JobCard } from './JobCard';
import { Job } from '@/interfaces/careers';

interface JobListingsProps {
  onApplyClick: (job: Job) => void;
}

export function JobListings({ onApplyClick }: JobListingsProps) {
  const {
    jobs,
    loading,
    error,
    searchQuery,
    selectedDept,
    selectedType,
    selectedLevel,
    savedJobIds,
    handleSearchChange,
    handleFilterChange,
    clearFilters,
    toggleSaveJob,
    trackJobView,
  } = useCareers();

  // Active Job Detail modal
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  
  // Job Board DOM reference
  const jobBoardRef = useRef<HTMLDivElement>(null);

  // Pagination states
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 6;

  const totalPages = Math.ceil(jobs.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedJobs = jobs.slice(startIndex, startIndex + itemsPerPage);

  const handleOpenDetails = (job: Job) => {
    trackJobView(job);
    setSelectedJob(job);
  };

  const handleCloseDetails = () => {
    setSelectedJob(null);
  };

  const handleQuickApply = (job: Job) => {
    setSelectedJob(null);
    onApplyClick(job);
  };

  // Saved Jobs tracking bar inside UI
  const savedJobsList = jobs.filter(j => savedJobIds.includes(j.id));

  // Dynamic related recommendations based on viewed department
  const getRelatedJobs = (active: Job) => {
    return jobs.filter(j => j.id !== active.id && j.department === active.department).slice(0, 2);
  };

  return (
    <div ref={jobBoardRef} className="py-24 px-4 md:px-8 bg-[#04040a] overflow-hidden text-white scroll-mt-12">
      <div className="max-w-6xl w-full mx-auto space-y-12">
        {/* Header Title */}
        <div className="text-left space-y-4">
          <div className="inline-block px-3 py-1 rounded-full border border-purple-500/20 bg-purple-950/20 text-xs md:text-sm font-semibold uppercase tracking-wider text-purple-400">
            Open Opportunity Engine
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold font-heading tracking-tight leading-tight">
            Find Your Next{' '}
            <span className="bg-gradient-to-r from-purple-400 via-blue-400 to-teal-400 bg-clip-text text-transparent">
              Impact Chapter
            </span>
          </h2>
          <p className="text-gray-400 text-base md:text-lg max-w-3xl leading-relaxed">
            Search open roles across our technological, strategic consulting, leadership growth, media, and education cells. Save jobs to apply later or quick-apply instantly.
          </p>
        </div>

        {/* Filter Layout */}
        <JobFilters
          searchQuery={searchQuery}
          onSearchChange={(val) => { handleSearchChange(val); setCurrentPage(1); }}
          selectedDept={selectedDept}
          onDeptChange={(val) => { handleFilterChange('department', val); setCurrentPage(1); }}
          selectedType={selectedType}
          onTypeChange={(val) => { handleFilterChange('type', val); setCurrentPage(1); }}
          selectedLevel={selectedLevel}
          onLevelChange={(val) => { handleFilterChange('level', val); setCurrentPage(1); }}
          onClear={clearFilters}
          jobsCount={jobs.length}
        />

        {/* Saved Jobs tracking bar */}
        {savedJobsList.length > 0 && (
          <div className="p-5 rounded-2xl border border-dashed border-purple-500/30 bg-purple-950/5 text-left flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="space-y-1">
              <h4 className="text-sm font-bold text-purple-300 flex items-center gap-2">
                Saved Positions ({savedJobsList.length})
              </h4>
              <p className="text-xs text-gray-500">
                You bookmarked these roles. You can click on any to complete your application.
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              {savedJobsList.map(j => (
                <div key={j.id} className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border border-slate-800 bg-slate-950/60 text-xs">
                  <span className="font-semibold text-slate-300 truncate max-w-[120px]">{j.title}</span>
                  <button onClick={() => handleOpenDetails(j)} className="text-purple-400 hover:text-white cursor-pointer" title="View details">
                    <Eye size={12} />
                  </button>
                  <button onClick={() => toggleSaveJob(j.id)} className="text-red-400 hover:text-white cursor-pointer" title="Remove bookmark">
                    <Trash size={12} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Job Grid display */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-24 space-y-4">
            <div className="h-10 w-10 rounded-full border-t-2 border-r-2 border-purple-500 animate-spin" />
            <p className="text-slate-400 text-sm animate-pulse font-semibold uppercase tracking-widest">
              Connecting ATS Database...
            </p>
          </div>
        ) : error ? (
          <div className="p-8 rounded-3xl border border-red-500/30 bg-red-950/10 text-center space-y-4">
            <p className="text-red-400 text-sm font-semibold">{error}</p>
            <button onClick={clearFilters} className="px-6 py-2.5 bg-red-500 text-black font-bold rounded-xl cursor-pointer">
              Retry Connection
            </button>
          </div>
        ) : jobs.length === 0 ? (
          <div className="py-20 rounded-3xl border border-slate-800/80 bg-slate-900/10 text-center space-y-4">
            <h3 className="text-xl font-bold font-heading text-slate-300">No Positions Found</h3>
            <p className="text-slate-400 max-w-md mx-auto text-sm">
              We couldn’t find any open positions matching your filter configurations. Try adjusting search strings or removing drop-down filters.
            </p>
            <button onClick={clearFilters} className="px-5 py-2.5 rounded-xl border border-slate-700 bg-slate-850 hover:bg-slate-800 text-white font-semibold text-sm cursor-pointer">
              Clear All Filters
            </button>
          </div>
        ) : (
          <div className="space-y-12">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 items-stretch">
              <AnimatePresence mode="popLayout">
                {paginatedJobs.map((job) => (
                  <div key={job.id} className="h-full">
                    <JobCard
                      job={job}
                      isSaved={savedJobIds.includes(job.id)}
                      onToggleSave={() => toggleSaveJob(job.id)}
                      onApply={() => handleQuickApply(job)}
                      onViewDetails={() => handleOpenDetails(job)}
                    />
                  </div>
                ))}
              </AnimatePresence>
            </div>

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-3 pt-6">
                <button
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  className="px-4 py-2.5 rounded-xl border border-slate-800 bg-slate-950 text-xs font-bold text-slate-300 hover:text-white disabled:opacity-40 disabled:pointer-events-none transition-all duration-300 cursor-pointer"
                >
                  Previous
                </button>
                {[...Array(totalPages)].map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentPage(i + 1)}
                    className={`h-10 w-10 rounded-xl text-xs font-bold transition-all duration-300 cursor-pointer ${
                      currentPage === i + 1
                        ? 'bg-gradient-to-tr from-purple-500 to-blue-500 text-black shadow-md'
                        : 'border border-slate-800 bg-slate-950 text-slate-400 hover:text-white'
                    }`}
                  >
                    {i + 1}
                  </button>
                ))}
                <button
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  className="px-4 py-2.5 rounded-xl border border-slate-800 bg-slate-950 text-xs font-bold text-slate-300 hover:text-white disabled:opacity-40 disabled:pointer-events-none transition-all duration-300 cursor-pointer"
                >
                  Next
                </button>
              </div>
            )}
          </div>
        )}

        {/* Detailed Job Modal drawer */}
        <AnimatePresence>
          {selectedJob && (
            <div className="fixed inset-0 z-50 flex items-center justify-end bg-black/80 backdrop-blur-sm p-4">
              {/* Dismiss Area */}
              <div className="absolute inset-0 cursor-default" onClick={handleCloseDetails} />

              <motion.div
                initial={{ x: '100%', opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: '100%', opacity: 0 }}
                transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                className="relative z-10 w-full max-w-xl h-[92vh] rounded-3xl border border-slate-800 bg-[#06060c] text-white p-6 md:p-10 shadow-2xl flex flex-col justify-between overflow-y-auto text-left"
              >
                <div className="space-y-8">
                  {/* Close button */}
                  <div className="flex items-center justify-between">
                    <span className="text-xs uppercase tracking-widest text-slate-500 font-bold">Role Blueprint</span>
                    <button
                      onClick={handleCloseDetails}
                      className="h-9 w-9 rounded-full border border-slate-800 hover:border-white text-slate-400 hover:text-white flex items-center justify-center cursor-pointer transition-colors duration-300"
                    >
                      <X size={18} />
                    </button>
                  </div>

                  {/* Header Title */}
                  <div className="space-y-3">
                    <span className="inline-block px-3 py-1 rounded-full border border-purple-500/20 bg-purple-950/20 text-xs font-bold uppercase tracking-wider text-purple-400">
                      {selectedJob.department}
                    </span>
                    <h3 className="text-2xl md:text-3xl font-extrabold font-heading leading-tight">
                      {selectedJob.title}
                    </h3>
                    <div className="flex flex-wrap gap-4 text-xs text-slate-400 pt-1">
                      <span>Location: <span className="text-white font-medium">{selectedJob.location}</span></span>
                      <span>Type: <span className="text-white font-medium">{selectedJob.type}</span></span>
                      {selectedJob.salaryRange && (
                        <span>Range: <span className="text-white font-medium">{selectedJob.salaryRange}</span></span>
                      )}
                    </div>
                  </div>

                  {/* Main descriptions */}
                  <div className="space-y-4 border-t border-slate-900/60 pt-6">
                    <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest">Introduction</h4>
                    <p className="text-gray-300 text-sm md:text-base leading-relaxed">
                      {selectedJob.description}
                    </p>
                  </div>

                  {/* Responsibilities list */}
                  <div className="space-y-4">
                    <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest">Scope of Ownership</h4>
                    <ul className="space-y-2.5">
                      {selectedJob.responsibilities.map((resp, idx) => (
                        <li key={idx} className="flex gap-3 text-sm text-gray-300 leading-relaxed">
                          <Check size={16} className="text-purple-400 mt-1 shrink-0" />
                          <span>{resp}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Requirements list */}
                  <div className="space-y-4">
                    <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest">Requirements & Fluency</h4>
                    <ul className="space-y-2.5">
                      {selectedJob.requirements.map((req, idx) => (
                        <li key={idx} className="flex gap-3 text-sm text-gray-300 leading-relaxed">
                          <Check size={16} className="text-blue-400 mt-1 shrink-0" />
                          <span>{req}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Recommendations cell */}
                  {getRelatedJobs(selectedJob).length > 0 && (
                    <div className="space-y-4 border-t border-slate-900/60 pt-6">
                      <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest">Related Recommendations</h4>
                      <div className="grid grid-cols-1 gap-3">
                        {getRelatedJobs(selectedJob).map(rj => (
                          <div
                            key={rj.id}
                            onClick={() => handleOpenDetails(rj)}
                            className="p-4 rounded-xl border border-slate-800 hover:border-slate-700 bg-slate-950/40 hover:bg-slate-950 transition-all duration-300 flex items-center justify-between cursor-pointer group"
                          >
                            <div className="text-left space-y-1">
                              <p className="text-xs font-bold text-slate-200 group-hover:text-purple-300 transition-colors duration-300">{rj.title}</p>
                              <p className="text-[10px] text-slate-500 uppercase tracking-wider">{rj.location} • {rj.type}</p>
                            </div>
                            <ArrowUpRight size={14} className="text-slate-500 group-hover:text-white transition-colors duration-300" />
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Sticky Apply Button */}
                <div className="pt-6 border-t border-slate-900/60 mt-8 flex items-center gap-4">
                  <button
                    onClick={() => handleQuickApply(selectedJob)}
                    className="flex-1 py-4 rounded-xl bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-400 hover:to-blue-400 text-black font-semibold text-sm transition-all duration-300 shadow-md cursor-pointer flex items-center justify-center"
                  >
                    Quick Apply Today
                  </button>
                  <button
                    onClick={() => toggleSaveJob(selectedJob.id)}
                    className="px-5 py-4 rounded-xl border border-slate-800 bg-slate-950 text-slate-400 hover:text-white font-semibold text-sm cursor-pointer transition-colors duration-300"
                  >
                    {savedJobIds.includes(selectedJob.id) ? 'Saved' : 'Save Position'}
                  </button>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
