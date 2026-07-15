'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';

// Using arbitrary types since importing directly would create a circular/static dependency 
// that might hinder dynamic updates from the CMS.
export type PersonalData = {
  name: string;
  title: string;
  bio: string;
  location: string;
  email: string;
  phone: string;
  resumeUrl: string;
  avatarUrl: string;
};

export type ProjectData = {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  thumbnailUrl: string;
  videoUrl?: string;
  technologies: string[];
  githubUrl?: string;
  liveUrl?: string;
  year: string;
  featured: boolean;
  themeSpecific?: Record<string, any>;
};

export type ExperienceData = {
  id: string;
  company: string;
  role: string;
  startDate: string;
  endDate: string;
  description: string;
  logoUrl?: string;
};

export type SkillData = {
  category: string;
  items: string[];
};

export type SocialsData = {
  github?: string;
  linkedin?: string;
  instagram?: string;
};

export type CertificationData = {
  id: string;
  name: string;
  issuer: string;
  date: string;
  url?: string;
  fileUrl?: string;
};

export type EducationData = {
  id: string;
  institution: string;
  degree: string;
  startDate: string;
  endDate: string;
  description: string;
};

export interface PortfolioState {
  personal: PersonalData | null;
  projects: ProjectData[];
  experience: ExperienceData[];
  skills: SkillData[];
  certifications: CertificationData[];
  education: EducationData[];
  socials: SocialsData | null;
  isLoading: boolean;
  refreshData: () => Promise<void>;
}

const PortfolioContext = createContext<PortfolioState>({
  personal: null,
  projects: [],
  experience: [],
  skills: [],
  certifications: [],
  education: [],
  socials: null,
  isLoading: true,
  refreshData: async () => {},
});

export const PortfolioProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, setState] = useState<Omit<PortfolioState, 'refreshData'>>({
    personal: null,
    projects: [],
    experience: [],
    skills: [],
    certifications: [],
    education: [],
    socials: null,
    isLoading: true,
  });

  const fetchData = async () => {
    setState(prev => ({ ...prev, isLoading: true }));
    try {
      const [personal, projects, experience, skills, certifications, education, socials] = await Promise.all([
        fetch('/api/data?type=personal').then(r => r.json()),
        fetch('/api/data?type=projects').then(r => r.json()),
        fetch('/api/data?type=experience').then(r => r.json()),
        fetch('/api/data?type=skills').then(r => r.json()),
        fetch('/api/data?type=certifications').then(r => r.json()),
        fetch('/api/data?type=education').then(r => r.json()),
        fetch('/api/data?type=socials').then(r => r.json()),
      ]);

      setState({
        personal,
        projects,
        experience,
        skills,
        certifications,
        education,
        socials,
        isLoading: false,
      });
    } catch (error) {
      console.error("Failed to fetch portfolio data via API", error);
      setState(prev => ({ ...prev, isLoading: false }));
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <PortfolioContext.Provider value={{ ...state, refreshData: fetchData }}>
      {children}
    </PortfolioContext.Provider>
  );
};

export const usePortfolio = () => useContext(PortfolioContext);
