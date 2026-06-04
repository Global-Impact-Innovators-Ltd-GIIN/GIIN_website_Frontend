import { JobDepartment, EmploymentType, ExperienceLevel, RecruitmentStageName } from '../types/careers';

export interface Job {
  id: string;
  title: string;
  department: JobDepartment;
  type: EmploymentType;
  location: string;
  experienceLevel: ExperienceLevel;
  postingDate: string;
  description: string;
  responsibilities: string[];
  requirements: string[];
  skills: string[];
  salaryRange?: string;
  isActive: boolean;
  isFeatured: boolean;
}

export interface Department {
  id: string;
  name: JobDepartment;
  description: string;
  icon: string;
  featuredRolesCount: number;
}

export interface Candidate {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  linkedinUrl?: string;
  portfolioUrl?: string;
  experienceLevel: ExperienceLevel;
  skills: string[];
}

export interface Application {
  id: string;
  jobId: string;
  jobTitle: string;
  candidate: Candidate;
  resumeUrl?: string;
  coverLetterUrl?: string;
  customAnswers: {
    whyJoin: string;
    achievements: string;
    skillsSummary: string;
  };
  status: RecruitmentStageName;
  appliedAt: string;
}

export interface TalentNetworkMember {
  id: string;
  fullName: string;
  email: string;
  areaOfInterest: JobDepartment;
  linkedinUrl?: string;
  resumeUrl?: string;
  joinedAt: string;
}

export interface RecruitmentStage {
  id: string;
  name: RecruitmentStageName;
  description: string;
  estimatedDuration: string;
  requirements: string[];
  status: 'upcoming' | 'current' | 'completed';
}
