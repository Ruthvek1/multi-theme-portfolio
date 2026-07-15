'use client';

import React, { useState } from 'react';
import { Wind, Thermometer, Power, Zap, ChevronUp, ChevronDown, CheckCircle2 } from 'lucide-react';
export default function ClimateControls({ skills }: { skills: any }) {
  const [isOn, setIsOn] = useState(true);
  const [temp, setTemp] = useState(72);
  const [fanSpeed, setFanSpeed] = useState(3);

  if (!skills) return null;

  return (
    <div className="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-3xl p-6 shadow-2xl transition-all">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-xl font-bold tracking-widest uppercase">Climate / Capabilities</h2>
          <p className="text-sm text-gray-400 mt-1">Adjust system competencies</p>
        </div>
        <button aria-label="Interactive Button" onClick={() => setIsOn(!isOn)}
          className={`w-14 h-14 rounded-full flex items-center justify-center transition-colors shadow-lg ${isOn ? 'bg-blue-500 text-white' : 'bg-gray-800 text-gray-500'}`}
        >
          <Power className="w-6 h-6" />
        </button>
      </div>

      <div className={`transition-opacity duration-500 ${isOn ? 'opacity-100' : 'opacity-30 pointer-events-none'}`}>
        
        {/* Main Controls row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          
          {/* Temperature */}
          <div className="bg-black/40 rounded-2xl p-4 flex flex-col items-center justify-center border border-white/5">
            <Thermometer className="w-6 h-6 text-red-400 mb-2" />
            <div className="flex items-center gap-6">
              <button aria-label="Interactive Button" onClick={() => setTemp(t => t - 1)} className="p-2 hover:bg-white/10 rounded-full"><ChevronDown className="w-6 h-6"/></button>
              <span className="text-4xl font-black">{temp}°</span>
              <button aria-label="Interactive Button" onClick={() => setTemp(t => t + 1)} className="p-2 hover:bg-white/10 rounded-full"><ChevronUp className="w-6 h-6"/></button>
            </div>
            <span className="text-xs uppercase tracking-widest text-gray-400 mt-2">Sys Temp</span>
          </div>

          {/* Fan Speed */}
          <div className="bg-black/40 rounded-2xl p-4 flex flex-col items-center justify-center border border-white/5">
            <Wind className="w-6 h-6 text-blue-400 mb-2" />
            <div className="flex flex-wrap justify-center items-center gap-1 sm:gap-2 mt-2">
              {[1,2,3,4,5].map((speed) => (
                <button aria-label="Interactive Button" key={speed}
                  onClick={() => setFanSpeed(speed)}
                  className={`w-8 h-8 sm:w-10 sm:h-10 text-sm rounded-lg transition-all ${fanSpeed >= speed ? 'bg-white text-black font-bold' : 'bg-white/10 text-white/50'}`}
                >
                  {speed}
                </button>
              ))}
            </div>
            <span className="text-xs uppercase tracking-widest text-gray-400 mt-4">Processing Power</span>
          </div>

          {/* Modes */}
          <div className="bg-black/40 rounded-2xl p-4 flex items-center justify-center gap-4 border border-white/5">
            <button aria-label="Interactive Button" className="flex flex-col items-center gap-2 text-blue-400">
               <div className="w-12 h-12 rounded-full bg-blue-500/20 border border-blue-500/30 flex items-center justify-center">
                  <Wind className="w-6 h-6" />
               </div>
               <span className="text-[10px] uppercase font-bold tracking-widest">Auto</span>
            </button>
            <button aria-label="Interactive Button" className="flex flex-col items-center gap-2 text-gray-400 hover:text-white">
               <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 transition-colors">
                  <Zap className="w-6 h-6" />
               </div>
               <span className="text-[10px] uppercase font-bold tracking-widest">Camp</span>
            </button>
          </div>
        </div>

        {/* Skills as Climate Vents / Sub-systems */}
        <div className="space-y-6">
          <h3 className="text-sm uppercase tracking-widest text-gray-400 font-bold border-b border-white/10 pb-2">Active Subsystems (Skills)</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {skills.map((skill: any, index: number) => (
              <div key={index} className="bg-gradient-to-r from-black/60 to-black/30 p-4 rounded-xl border border-white/5 flex items-center gap-4 group hover:border-white/20 transition-colors">
                 <div className="w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center shrink-0">
                    <CheckCircle2 className="w-5 h-5 text-blue-400" />
                 </div>
                 <div className="flex-1">
                    <h4 className="font-bold text-lg">{skill.category}</h4>
                    <div className="flex flex-wrap gap-2 mt-2">
                       {skill.items?.map((kw: string, i: number) => (
                          <span key={i} className="text-xs bg-white/10 px-2 py-1 rounded-md text-gray-300">
                             {kw}
                          </span>
                       ))}
                    </div>
                 </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
