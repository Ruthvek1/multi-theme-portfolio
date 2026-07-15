'use client';
import React, { useEffect, useState } from 'react';
import { usePortfolio } from '@/core/PortfolioContext';
import CarnivalHero from './components/CarnivalHero';
import CarnivalTimeline from './components/CarnivalTimeline';
import CarnivalSkills from './components/CarnivalSkills';
import CarnivalProjects from './components/CarnivalProjects';
import CarnivalContact from './components/CarnivalContact';
import Head from 'next/head';

export default function CarnivalAdapter() {
  const { personal, experience, education, skills, certifications, projects, socials, isLoading } = usePortfolio();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (isLoading || !mounted || !personal) return null;

  return (
    <div className="bg-[#1f2937] min-h-screen font-sans selection:bg-yellow-400 selection:text-red-900 overflow-x-hidden">
      <Head>
        <title>{personal.name} - Theme Park</title>
        <meta name="description" content={personal.bio} />
      </Head>

      <main className="w-full flex flex-col items-center">
         <CarnivalHero personal={personal} />
         <CarnivalTimeline experience={experience} education={education} />
         <CarnivalSkills skills={skills} certifications={certifications} />
         <CarnivalProjects projects={projects} />
         <CarnivalContact personal={personal} socials={socials} />
      </main>
    </div>
  );
}
