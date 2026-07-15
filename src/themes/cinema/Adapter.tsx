'use client';
import React, { useEffect, useState } from 'react';
import { usePortfolio } from '@/core/PortfolioContext';
import CinemaHero from './components/CinemaHero';
import CinemaTimeline from './components/CinemaTimeline';
import CinemaSkills from './components/CinemaSkills';
import CinemaProjects from './components/CinemaProjects';
import CinemaContact from './components/CinemaContact';
import Head from 'next/head';

export default function CinemaAdapter() {
  const { personal, experience, education, skills, projects, certifications, socials, isLoading } = usePortfolio();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (isLoading || !mounted) return null;

  return (
    <>
      <div className="min-h-screen bg-[#0a0508] text-white selection:bg-[#b31b1b] selection:text-white font-sans overflow-x-hidden">
         
         <div className="animate-in fade-in duration-1000">
             <CinemaHero personal={personal} />
         </div>

         <div className="animate-in fade-in duration-1000 delay-300">
             <CinemaTimeline experience={experience} education={education} />
         </div>

         <div className="animate-in fade-in duration-1000 delay-500">
             <CinemaSkills skills={skills} certifications={certifications} />
         </div>

         <div className="animate-in fade-in duration-1000 delay-700">
             <CinemaProjects projects={projects} />
         </div>

         <div className="animate-in fade-in duration-1000 delay-1000">
             <CinemaContact personal={personal} socials={socials} />
         </div>

      </div>
    </>
  );
}
