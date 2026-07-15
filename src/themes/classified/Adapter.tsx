'use client';
import React, { useState, useEffect } from 'react';
import { usePortfolio } from '@/core/PortfolioContext';
import SecurityClearance from './components/SecurityClearance';
import CaseFiles from './components/CaseFiles';
import SurveillanceLog from './components/SurveillanceLog';
import AssetCapabilities from './components/AssetCapabilities';
import SelfDestruct from './components/SelfDestruct';
import { Fingerprint, ShieldAlert, AlertTriangle } from 'lucide-react';

export default function ClassifiedAdapter() {
  const { personal, projects, experience, skills, education, certifications, socials } = usePortfolio();
  const [accessGranted, setAccessGranted] = useState(false);
  const [scanning, setScanning] = useState(false);

  // Simulated scan effect
  const handleScan = () => {
    setScanning(true);
    setTimeout(() => {
      setAccessGranted(true);
    }, 2000);
  };

  if (!personal) return null;

  if (!accessGranted) {
    return (
      <div className="min-h-screen bg-[#050505] text-[#33ff33] font-mono flex flex-col items-center justify-center p-4 selection:bg-[#33ff33] selection:text-black">
        <div className="max-w-md w-full border border-[#33ff33] p-8 relative flex flex-col items-center">
          <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-[#33ff33]"></div>
          <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-[#33ff33]"></div>
          <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-[#33ff33]"></div>
          <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-[#33ff33]"></div>
          
          <ShieldAlert className="w-16 h-16 mb-4 text-[#33ff33] animate-pulse" />
          <h1 className="text-2xl font-black tracking-widest mb-2 text-center">RESTRICTED ACCESS</h1>
          <p className="text-xs text-center mb-8 opacity-80">UNAUTHORIZED ENTRY IS PUNISHABLE UNDER FEDERAL LAW. IDENTIFICATION REQUIRED.</p>
          
          <button aria-label="Interactive Button" onClick={handleScan}
            disabled={scanning}
            className={`w-32 h-32 rounded-full border-2 flex items-center justify-center transition-all ${
              scanning ? 'border-[#33ff33] bg-[#33ff33]/20 scale-95' : 'border-[#33ff33] hover:bg-[#33ff33]/10 hover:scale-105 cursor-pointer'
            }`}
          >
            <Fingerprint className={`w-16 h-16 ${scanning ? 'animate-pulse text-[#33ff33]' : 'text-[#33ff33]/50'}`} />
          </button>
          
          <div className="h-6 mt-6">
            {scanning ? (
              <span className="text-sm font-bold tracking-widest animate-pulse">SCANNING BIOMETRICS...</span>
            ) : (
              <span className="text-sm tracking-widest opacity-50">PLACE THUMB ON SENSOR</span>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#050505] text-[#e0e0e0] font-mono overflow-y-auto selection:bg-[#33ff33] selection:text-black pb-24">
      
      {/* Top Warning Banner */}
      <div className="bg-[#111] border-b border-[#33ff33]/30 p-2 flex justify-between items-center sticky top-0 z-50 shadow-[0_4px_20px_rgba(0,0,0,0.8)] backdrop-blur-md">
        <div className="flex items-center gap-3">
          <AlertTriangle className="w-5 h-5 text-yellow-500" />
          <span className="text-xs font-bold tracking-widest text-yellow-500">TOP SECRET // NOFORN</span>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-xs text-[#33ff33] animate-pulse">CLEARANCE: LEVEL 5</span>
          <span className="text-[10px] text-gray-500">ID: {personal.name.toUpperCase().replace(/\s/g, '_')}</span>
        </div>
      </div>

      <div className="max-w-6xl mx-auto p-4 md:p-8 flex flex-col gap-8">
         {/* Dossier / Profile */}
         <SecurityClearance personal={personal} socials={socials} />

         {/* Grid Layout for the rest */}
         <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="col-span-1 lg:col-span-2 flex flex-col gap-8">
               <SurveillanceLog experience={experience} education={education} />
               <CaseFiles projects={projects} />
            </div>
            <div className="col-span-1 flex flex-col gap-8">
               <AssetCapabilities skills={skills} certifications={certifications} />
            </div>
         </div>
         
         {/* Interactive Easter Egg */}
         <SelfDestruct />
      </div>
      
      {/* Scanlines overlay effect */}
      <div className="pointer-events-none fixed inset-0 z-50 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_4px,3px_100%] opacity-20 mix-blend-overlay"></div>
    </div>
  );
}
