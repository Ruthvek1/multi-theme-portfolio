'use client';

import React, { useState } from 'react';
import { usePortfolio } from '@/core/PortfolioContext';
import dynamic from 'next/dynamic';
import ClimateControls from './components/ClimateControls';

const TeslaCar3D = dynamic(() => import('./components/TeslaCar3D'), { 
  ssr: false, 
  loading: () => <div className="absolute inset-0 flex items-center justify-center text-gray-500">Loading 3D Model...</div> 
});
import TripPlanner from './components/TripPlanner';
import MediaCenter from './components/MediaCenter';
import { Battery, Wifi, SignalHigh, Thermometer, User, ShieldCheck, FileText, Phone, Mail, ExternalLink } from 'lucide-react';

export default function TeslaAdapter() {
  const { personal, projects, skills, experience, education, certifications, socials } = usePortfolio();

  // Keep track of the 'active' tab in the bottom bar
  const [activeTab, setActiveTab] = useState('car'); // 'car', 'climate', 'nav', 'media'

  if (!personal) return null;

  return (
    <div className="min-h-screen bg-[#111111] text-white font-sans overflow-x-hidden pb-32">
      
      {/* 
        ========================================================================
        Top Status Bar 
        ========================================================================
      */}
      <div className="sticky top-0 z-50 w-full px-6 py-2 bg-gradient-to-b from-black/80 to-transparent backdrop-blur-sm flex justify-between items-center text-sm text-gray-400 font-medium">
        <div className="flex items-center gap-4">
           <span>Model P(ortfolio)</span>
           <span className="flex items-center gap-1"><Thermometer className="w-4 h-4"/> 72°</span>
        </div>
        <div className="flex items-center gap-4">
           <SignalHigh className="w-4 h-4" />
           <Wifi className="w-4 h-4" />
           <span className="flex items-center gap-1"><Battery className="w-4 h-4 text-green-500" /> 100%</span>
           <span>12:00 PM</span>
        </div>
      </div>

      {/* 
        ========================================================================
        Main Scrollable Content Area 
        ========================================================================
      */}
      <div className="max-w-7xl mx-auto px-6 pt-4 pb-24 relative z-10 flex flex-col gap-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* LEFT COLUMN: Driver Profile & 3D Car (Sticky on large screens) */}
          <div className="lg:col-span-5 flex flex-col gap-8">
           
           {/* Driver Profile Widget (Requirement 1, 2, 8) */}
           <div className="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-3xl p-6 shadow-2xl">
              <div className="flex items-center gap-4 mb-6">
                 <div className="w-16 h-16 bg-gradient-to-br from-gray-700 to-gray-900 rounded-full flex items-center justify-center shadow-inner border-2 border-white/20">
                    <User className="w-8 h-8 text-white" />
                 </div>
                 <div>
                    <h1 className="text-2xl font-black">{personal.name}</h1>
                    <p className="text-gray-400 font-medium">{personal.title}</p>
                 </div>
              </div>
              
              <p className="text-gray-300 text-sm leading-relaxed mb-6">
                 {personal.bio}
              </p>

              {/* Contact Actions */}
              <div className="grid grid-cols-2 gap-3 mb-6">
                 <a aria-label="Link" href={`mailto:${personal.email}`} className="flex flex-col items-center justify-center p-3 rounded-2xl bg-white/10 hover:bg-white/20 transition-colors">
                    <Mail className="w-5 h-5 mb-1 text-white" />
                    <span className="text-[10px] uppercase font-bold tracking-wider text-gray-400 mb-1">Email</span>
                    <span className="text-[10px] text-gray-500 truncate w-full text-center px-2">{personal.email}</span>
                 </a>
                 <a aria-label="Link" href={`tel:${personal.phone}`} className="flex flex-col items-center justify-center p-3 rounded-2xl bg-white/10 hover:bg-white/20 transition-colors">
                    <Phone className="w-5 h-5 mb-1 text-white" />
                    <span className="text-[10px] uppercase font-bold tracking-wider text-gray-400 mb-1">Call</span>
                    <span className="text-[10px] text-gray-500 truncate w-full text-center px-2">{personal.phone}</span>
                 </a>
                 {socials?.linkedin && (
                   <a aria-label="Link" href={socials.linkedin} target="_blank" rel="noreferrer" className="flex flex-col items-center justify-center p-3 rounded-2xl bg-white/10 hover:bg-white/20 transition-colors">
                      <ExternalLink className="w-5 h-5 mb-1 text-white" />
                      <span className="text-[10px] uppercase font-bold tracking-wider text-gray-400">LinkedIn</span>
                   </a>
                 )}
                 {socials?.github && (
                   <a aria-label="Link" href={socials.github} target="_blank" rel="noreferrer" className="flex flex-col items-center justify-center p-3 rounded-2xl bg-white/10 hover:bg-white/20 transition-colors">
                      <ExternalLink className="w-5 h-5 mb-1" />
                      <span className="text-[10px] uppercase font-bold tracking-wider text-gray-400">GitHub</span>
                   </a>
                 )}
              </div>

              {/* Resume Download (Requirement 12) */}
              {personal.resumeUrl && (
                <div className="flex flex-col items-center gap-2">
                  <a aria-label="Link" href={personal.resumeUrl} download target="_blank" rel="noreferrer" className="w-full flex items-center justify-center gap-2 bg-white text-black font-black uppercase tracking-widest py-4 rounded-xl hover:bg-gray-200 transition-colors shadow-lg">
                     <FileText className="w-5 h-5" /> Download Driver Dossier
                  </a>
                  <span className="text-[10px] uppercase tracking-widest text-gray-500 font-bold">Curriculum Vitae (CV)</span>
                </div>
              )}
           </div>

           {/* Academic Route (Education) */}
           <div id="academic" className="scroll-mt-20 w-full">
              <TripPlanner experience={null} education={education} />
           </div>

           {/* Interactive 3D Car Viewport */}
           <div className="bg-gradient-to-b from-gray-800 to-black rounded-3xl h-[400px] lg:h-[500px] relative overflow-hidden shadow-2xl border border-white/5 sticky top-16 z-20">
              <div className="absolute inset-x-0 top-6 text-center z-10 pointer-events-none">
                 <h2 className="text-xl font-bold tracking-widest uppercase">Model Portfolio</h2>
                 <p className="text-xs text-gray-400">Parked</p>
              </div>
              <TeslaCar3D />
           </div>

          </div>

        {/* RIGHT COLUMN: Scrolling Widgets */}
        <div className="lg:col-span-7 flex flex-col gap-8">
           
           {/* Climate Controls (Skills) */}
           <div id="climate" className="scroll-mt-20">
              <ClimateControls skills={skills} />
           </div>

           {/* Career Route (Experience) */}
           <div id="career" className="scroll-mt-20 w-full">
              <TripPlanner experience={experience} education={null} />
           </div>

          </div>
        </div>

        {/* FULL WIDTH BOTTOM: Media Center */}
        <div id="media" className="scroll-mt-20 w-full">
           <MediaCenter projects={projects} certifications={certifications} />
        </div>

      </div>

      {/* 
        ========================================================================
        Bottom Dock / Climate Bar (Fixed)
        ========================================================================
      */}
      <div className="fixed bottom-0 inset-x-0 h-24 bg-black/90 backdrop-blur-xl border-t border-white/10 z-50 flex items-center justify-between px-8">
         
         {/* Left Side: Temps */}
         <div className="flex items-center gap-6">
            <button aria-label="Interactive Button" className="text-2xl font-medium hover:text-white transition-colors text-gray-300">68°</button>
            <div className="hidden sm:flex items-center gap-4">
               <button aria-label="Interactive Button" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20"><Thermometer className="w-5 h-5"/></button>
            </div>
         </div>

         {/* Middle: App Launcher */}
         <div className="flex items-center justify-center gap-2 sm:gap-6 flex-1 max-w-lg mx-auto">
            <button aria-label="Interactive Button" onClick={() => { setActiveTab('car'); window.scrollTo({top: 0, behavior: 'smooth'}); }}
              className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all ${activeTab === 'car' ? 'bg-white/20 shadow-[0_0_15px_rgba(255,255,255,0.2)]' : 'bg-transparent hover:bg-white/10'}`}
            >
               <User className="w-7 h-7" />
            </button>
            <button aria-label="Interactive Button" onClick={() => { setActiveTab('climate'); document.getElementById('climate')?.scrollIntoView({behavior: 'smooth'}); }}
              className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all ${activeTab === 'climate' ? 'bg-white/20 shadow-[0_0_15px_rgba(255,255,255,0.2)]' : 'bg-transparent hover:bg-white/10'}`}
            >
               <Thermometer className="w-7 h-7 text-blue-400" />
            </button>
            <button aria-label="Interactive Button" onClick={() => { setActiveTab('nav'); document.getElementById('career')?.scrollIntoView({behavior: 'smooth'}); }}
              className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all ${activeTab === 'nav' ? 'bg-white/20 shadow-[0_0_15px_rgba(255,255,255,0.2)]' : 'bg-transparent hover:bg-white/10'}`}
            >
               <SignalHigh className="w-7 h-7 text-red-500" />
            </button>
            <button aria-label="Interactive Button" onClick={() => { setActiveTab('media'); document.getElementById('media')?.scrollIntoView({behavior: 'smooth'}); }}
              className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all ${activeTab === 'media' ? 'bg-white/20 shadow-[0_0_15px_rgba(255,255,255,0.2)]' : 'bg-transparent hover:bg-white/10'}`}
            >
               <ShieldCheck className="w-7 h-7 text-green-400" />
            </button>
         </div>

         {/* Right Side: Quick Actions */}
         <div className="flex items-center gap-6 justify-end">
            <button aria-label="Interactive Button" className="text-2xl font-medium hover:text-white transition-colors text-gray-300">72°</button>
         </div>
      </div>
    </div>
  );
}
