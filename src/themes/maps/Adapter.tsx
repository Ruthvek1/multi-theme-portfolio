'use client';

import React, { useEffect, useState } from 'react';
import { usePortfolio } from '@/core/PortfolioContext';

import MapsHeader from './components/MapsHeader';
import LocationHero from './components/LocationHero';
import PlacesTimeline from './components/PlacesTimeline';
import DestinationsGrid from './components/DestinationsGrid';
import AmenitiesList from './components/AmenitiesList';
import StreetViewDrop from './components/StreetViewDrop';
import LocalGuideBadges from './components/LocalGuideBadges';

export default function MapsAdapter() {
  const { personal, skills, projects, experience, education, socials, certifications } = usePortfolio();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted || !personal) return null;

  return (
    <div className="min-h-screen bg-[#f3f4f6] font-sans selection:bg-blue-200 selection:text-blue-900">
       <MapsHeader name={personal.name} />

       <div className="flex flex-col lg:flex-row w-full max-w-[1920px] mx-auto min-h-[calc(100vh-57px)]">
          {/* Left / Main Content Area (Scrollable) */}
          <div className="flex-1 overflow-y-auto">
             <LocationHero personal={personal} socials={socials} />
             
             <div className="p-4 md:p-8 max-w-5xl mx-auto space-y-8 pb-20">
                <StreetViewDrop />
                <DestinationsGrid projects={projects} />
                <AmenitiesList skills={skills} />
             </div>
          </div>

          {/* Right Sidebar (Scrollable Timeline) */}
          <div className="w-full lg:w-[450px] xl:w-[500px] bg-white border-l border-gray-200 shadow-xl overflow-y-auto z-20 hidden lg:block">
             <div className="flex flex-col gap-8 p-0">
               <PlacesTimeline experience={experience} education={education} />
               <div className="px-6 pb-8">
                 <LocalGuideBadges certifications={certifications || []} />
               </div>
             </div>
          </div>
          
          {/* Mobile version of Timeline (stacked at bottom) */}
          <div className="w-full bg-white border-t border-gray-200 lg:hidden p-4 space-y-8 pb-12">
             <PlacesTimeline experience={experience} education={education} />
             <LocalGuideBadges certifications={certifications || []} />
          </div>
       </div>
    </div>
  );
}
