'use client';
import React, { useEffect, useState } from 'react';
import { usePortfolio } from '@/core/PortfolioContext';
import HotelHero from './components/HotelHero';
import HotelTimeline from './components/HotelTimeline';
import HotelAmenities from './components/HotelAmenities';
import HotelSuites from './components/HotelSuites';
import RoomService from './components/RoomService';

export default function HotelAdapter() {
  const { personal, experience, education, skills, projects, certifications, socials, isLoading } = usePortfolio();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (isLoading || !mounted) return null;

  return (
    <div className="min-h-screen bg-[#0a0f1c] text-white selection:bg-[#d4af37] selection:text-[#0f172a] font-sans">
       
       <div className="animate-in fade-in slide-in-from-bottom-8 duration-[1500ms] ease-out fill-mode-both">
           <HotelHero personal={personal} />
       </div>

       <div className="animate-in fade-in slide-in-from-bottom-8 duration-[1500ms] delay-300 ease-out fill-mode-both">
           <HotelTimeline experience={experience} education={education} />
       </div>

       <div className="animate-in fade-in slide-in-from-bottom-8 duration-[1500ms] delay-500 ease-out fill-mode-both">
           <HotelAmenities skills={skills} certifications={certifications} />
       </div>

       <div className="animate-in fade-in slide-in-from-bottom-8 duration-[1500ms] delay-700 ease-out fill-mode-both">
           <HotelSuites projects={projects} />
       </div>

       <div className="animate-in fade-in slide-in-from-bottom-8 duration-[1500ms] delay-1000 ease-out fill-mode-both">
           <RoomService personal={personal} socials={socials} />
       </div>

    </div>
  );
}
