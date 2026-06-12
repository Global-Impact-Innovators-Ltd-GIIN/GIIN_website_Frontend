import { Job, Application, TalentNetworkMember, RecruitmentStage, Department } from '../interfaces/careers';
import { MOCK_JOBS, MOCK_RECRUITMENT_PROCESS, MOCK_DEPARTMENTS } from '../data/mockCareersData';
import { JobDepartment, EmploymentType, ExperienceLevel } from '../types/careers';

export class JobService {
  static async getDepartments(): Promise<Department[]> {
    return new Promise((resolve) => {
      setTimeout(() => resolve(MOCK_DEPARTMENTS), 200);
    });
  }

  static async getJobs(): Promise<Job[]> {
    return new Promise((resolve) => {
      setTimeout(() => resolve(MOCK_JOBS.filter(job => job.isActive)), 300);
    });
  }

  static async getJobById(id: string): Promise<Job | null> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const job = MOCK_JOBS.find(j => j.id === id && j.isActive) || null;
        resolve(job);
      }, 150);
    });
  }

  static async searchAndFilterJobs(params: {
    query?: string;
    department?: JobDepartment | 'All';
    type?: EmploymentType | 'All';
    experienceLevel?: ExperienceLevel | 'All';
  }): Promise<Job[]> {
    return new Promise((resolve) => {
      setTimeout(() => {
        let results = MOCK_JOBS.filter(job => job.isActive);

        if (params.query) {
          const q = params.query.toLowerCase().trim();
          results = results.filter(
            job =>
              job.title.toLowerCase().includes(q) ||
              job.description.toLowerCase().includes(q) ||
              job.skills.some(skill => skill.toLowerCase().includes(q))
          );
        }

        if (params.department && params.department !== 'All') {
          results = results.filter(job => job.department === params.department);
        }

        if (params.type && params.type !== 'All') {
          results = results.filter(job => job.type === params.type);
        }

        if (params.experienceLevel && params.experienceLevel !== 'All') {
          results = results.filter(job => job.experienceLevel === params.experienceLevel);
        }

        resolve(results);
      }, 250);
    });
  }
}

export class ApplicationService {
  static async submitApplication(application: Omit<Application, 'id' | 'appliedAt' | 'status'>): Promise<Application> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        try {
          const newApp: Application = {
            ...application,
            id: `app-${Math.random().toString(36).substr(2, 9)}`,
            appliedAt: new Date().toISOString(),
            status: 'Application Submission'
          };

          // Save to local storage for return visitor experience tracking
          if (typeof window !== 'undefined') {
            const currentApps = JSON.parse(localStorage.getItem('giin_applications') || '[]');
            currentApps.push(newApp);
            localStorage.setItem('giin_applications', JSON.stringify(currentApps));
          }

          resolve(newApp);
        } catch (error) {
          reject(new Error('Failed to submit application. Please try again.'));
        }
      }, 800);
    });
  }

  static async getSubmittedApplications(): Promise<Application[]> {
    return new Promise((resolve) => {
      if (typeof window === 'undefined') {
        resolve([]);
        return;
      }
      const apps = JSON.parse(localStorage.getItem('giin_applications') || '[]');
      resolve(apps);
    });
  }
}

export class TalentNetworkService {
  static async joinTalentNetwork(member: Omit<TalentNetworkMember, 'id' | 'joinedAt'>): Promise<TalentNetworkMember> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        try {
          const newMember: TalentNetworkMember = {
            ...member,
            id: `member-${Math.random().toString(36).substr(2, 9)}`,
            joinedAt: new Date().toISOString()
          };

          if (typeof window !== 'undefined') {
            const currentMembers = JSON.parse(localStorage.getItem('giin_talent_network') || '[]');
            currentMembers.push(newMember);
            localStorage.setItem('giin_talent_network', JSON.stringify(currentMembers));
          }

          resolve(newMember);
        } catch (error) {
          reject(new Error('Failed to join talent network. Please verify input fields.'));
        }
      }, 700);
    });
  }

  static async isJoined(): Promise<boolean> {
    if (typeof window === 'undefined') return false;
    const current = localStorage.getItem('giin_talent_network');
    return current !== null;
  }
}

export class RecruitmentService {
  static async getStages(): Promise<RecruitmentStage[]> {
    return new Promise((resolve) => {
      resolve(MOCK_RECRUITMENT_PROCESS);
    });
  }
}
