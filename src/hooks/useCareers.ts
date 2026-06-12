'use client';

import { useState, useEffect, useCallback } from 'react';
import { Job, Application } from '../interfaces/careers';
import { JobService, ApplicationService, TalentNetworkService } from '../services/careers';
import { JobDepartment, EmploymentType, ExperienceLevel } from '../types/careers';

// Analytics tracking helper to fulfill Phase 17
export const trackCareersEvent = (eventName: string, properties?: Record<string, any>) => {
  console.log(`[GIIN Analytics] Event: ${eventName}`, properties);
  if (typeof window !== 'undefined') {
    // If standard analytics (GA, PostHog, Mixpanel) were configured, dispatch:
    // (window as any).gtag?.('event', eventName, properties);
    // (window as any).posthog?.capture(eventName, properties);
  }
};

export const useCareers = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Filter States
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedDept, setSelectedDept] = useState<JobDepartment | 'All'>('All');
  const [selectedType, setSelectedType] = useState<EmploymentType | 'All'>('All');
  const [selectedLevel, setSelectedLevel] = useState<ExperienceLevel | 'All'>('All');

  // Bookmarks
  const [savedJobIds, setSavedJobIds] = useState<string[]>([]);
  
  // Applications
  const [applications, setApplications] = useState<Application[]>([]);

  // Fetch all jobs initially or when filters execute
  const loadJobs = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await JobService.searchAndFilterJobs({
        query: searchQuery,
        department: selectedDept,
        type: selectedType,
        experienceLevel: selectedLevel,
      });
      setJobs(data);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch job opportunities');
    } finally {
      setLoading(false);
    }
  }, [searchQuery, selectedDept, selectedType, selectedLevel]);

  // Handle search changes with logging
  const handleSearchChange = (val: string) => {
    setSearchQuery(val);
    if (val.trim()) {
      trackCareersEvent('Search Usage', { query: val });
    }
  };

  // Handle filter changes with logging
  const handleFilterChange = (
    type: 'department' | 'type' | 'level',
    value: string
  ) => {
    if (type === 'department') {
      setSelectedDept(value as JobDepartment | 'All');
      trackCareersEvent('Filter Usage', { type: 'department', value });
    } else if (type === 'type') {
      setSelectedType(value as EmploymentType | 'All');
      trackCareersEvent('Filter Usage', { type: 'employment_type', value });
    } else if (type === 'level') {
      setSelectedLevel(value as ExperienceLevel | 'All');
      trackCareersEvent('Filter Usage', { type: 'experience_level', value });
    }
  };

  // Clear all filters
  const clearFilters = () => {
    setSearchQuery('');
    setSelectedDept('All');
    setSelectedType('All');
    setSelectedLevel('All');
    trackCareersEvent('Filter Usage', { action: 'clear_all' });
  };

  // Load saved jobs and active application lists
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const saved = JSON.parse(localStorage.getItem('giin_saved_jobs') || '[]');
      setSavedJobIds(saved);
      
      ApplicationService.getSubmittedApplications().then(data => {
        setApplications(data);
      });
    }
  }, []);

  // Update jobs when filters update
  useEffect(() => {
    loadJobs();
  }, [loadJobs]);

  // Toggle Saved Job
  const toggleSaveJob = (jobId: string) => {
    let nextSaved: string[] = [];
    if (savedJobIds.includes(jobId)) {
      nextSaved = savedJobIds.filter(id => id !== jobId);
      trackCareersEvent('Job Unsaved', { jobId });
    } else {
      nextSaved = [...savedJobIds, jobId];
      trackCareersEvent('Job Saved', { jobId });
    }
    setSavedJobIds(nextSaved);
    if (typeof window !== 'undefined') {
      localStorage.setItem('giin_saved_jobs', JSON.stringify(nextSaved));
    }
  };

  // Track Job Views (Phase 17)
  const trackJobView = (job: Job) => {
    trackCareersEvent('Job Views', {
      jobId: job.id,
      jobTitle: job.title,
      department: job.department,
    });
  };

  // Reload submitted list after form fills
  const refreshApplications = async () => {
    const data = await ApplicationService.getSubmittedApplications();
    setApplications(data);
  };

  return {
    jobs,
    loading,
    error,
    searchQuery,
    selectedDept,
    selectedType,
    selectedLevel,
    savedJobIds,
    applications,
    handleSearchChange,
    handleFilterChange,
    clearFilters,
    toggleSaveJob,
    trackJobView,
    refreshApplications,
  };
};
