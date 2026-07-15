'use client';
import React, { useState, useEffect } from 'react';
import { usePortfolio } from '@/core/PortfolioContext';
import { Plane, Clock, CloudSun, MapPin } from 'lucide-react';
import BoardingPass from './components/BoardingPass';
import DeparturesBoard from './components/DeparturesBoard';
import FlightRoute from './components/FlightRoute';
import PassportStamps from './components/PassportStamps';
import Runway from './components/Runway';

export default function AirportAdapter() {
  const { personal, skills, projects, experience, education, socials, certifications } = usePortfolio();
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  if (!personal) return null;

  return (
    <div className="min-h-screen bg-[#F4F7F6] text-slate-800 font-sans selection:bg-blue-600 selection:text-white">
      
      {/* Airport Signage Header */}
      <div className="sticky top-0 z-50 bg-[#1A2530] text-white px-6 py-4 flex flex-col md:flex-row md:items-center justify-between shadow-lg border-b-4 border-yellow-400">
         <div className="flex items-center gap-4">
            <Plane className="w-8 h-8 text-yellow-400" />
            <h1 className="text-2xl font-bold tracking-widest uppercase">INTL Terminal <span className="font-light text-gray-400">T1</span></h1>
         </div>
         <div className="flex items-center gap-8 mt-4 md:mt-0 text-sm font-medium">
            <div className="flex items-center gap-2">
               <MapPin className="w-4 h-4 text-gray-400" /> Local Origin
            </div>
            <div className="flex items-center gap-2">
               <CloudSun className="w-4 h-4 text-yellow-400" /> 72°F Clear
            </div>
            <div className="flex items-center gap-2 tabular-nums bg-black/30 px-3 py-1 rounded-md border border-white/10">
               <Clock className="w-4 h-4 text-blue-400" />
               {currentTime.toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' })}
            </div>
         </div>
      </div>

      <div className="max-w-[1400px] mx-auto p-4 md:p-8 space-y-12">
        {/* Boarding Pass Hero Section */}
         <div className="mb-12">
            <BoardingPass personal={personal} socials={socials} />
         </div>

         {/* Interactive Easter Egg */}
         <Runway />

         {/* Departures Board (Projects) */}
        <section>
          <div className="flex items-center gap-4 mb-6">
            <div className="w-2 h-8 bg-yellow-400" />
            <h2 className="text-3xl font-black uppercase tracking-widest text-[#1A2530]">Departures (Projects)</h2>
          </div>
          <DeparturesBoard projects={projects} />
        </section>

        {/* Two-Column Layout for Timeline and Skills */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <section>
            <div className="flex items-center gap-4 mb-6">
              <div className="w-2 h-8 bg-blue-600" />
              <h2 className="text-3xl font-black uppercase tracking-widest text-[#1A2530]">Flight Log</h2>
            </div>
            <FlightRoute experience={experience} education={education} />
          </section>

          <section>
            <div className="flex items-center gap-4 mb-6">
              <div className="w-2 h-8 bg-green-600" />
              <h2 className="text-3xl font-black uppercase tracking-widest text-[#1A2530]">Customs / Skills</h2>
            </div>
            <PassportStamps skills={skills} certifications={certifications} />
          </section>
        </div>
        
      </div>
      
      {/* Footer */}
      <footer className="bg-[#1A2530] text-center p-8 text-gray-400 text-sm mt-12">
        Baggage Claim located on Lower Level. Thanks for flying with {personal.name}.
      </footer>
    </div>
  );
}
