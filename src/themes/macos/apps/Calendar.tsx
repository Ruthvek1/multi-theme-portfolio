import React, { useState } from 'react';
import Image from 'next/image';
import { usePortfolio } from '@/core/PortfolioContext';
import { ChevronLeft, ChevronRight, Search, Plus } from 'lucide-react';

export default function Calendar() {
  const { experience } = usePortfolio();
  const [selectedEvent, setSelectedEvent] = useState<any | null>(null);

  // Group experience by year for a simplified timeline view
  const years = Array.from(new Set(experience.map(e => e.startDate.split(' ')[1] || e.startDate.split(',')[1]?.trim() || e.startDate))).sort().reverse();
  const currentYear = years[0] || '2025';

  return (
    <div className="w-full h-full flex flex-col bg-white">
      {/* Toolbar */}
      <div className="h-14 border-b border-gray-200 flex items-center px-4 justify-between shrink-0 bg-white">
        <div className="flex items-center gap-4">
           <div className="flex bg-gray-100 rounded-md p-0.5 border border-gray-200">
             <button aria-label="Interactive Button" className="px-3 py-1 text-xs font-semibold bg-white rounded shadow-sm text-black">Year</button>
             <button aria-label="Interactive Button" className="px-3 py-1 text-xs font-semibold text-gray-500 hover:text-black">Month</button>
             <button aria-label="Interactive Button" className="px-3 py-1 text-xs font-semibold text-gray-500 hover:text-black">Week</button>
             <button aria-label="Interactive Button" className="px-3 py-1 text-xs font-semibold text-gray-500 hover:text-black">Day</button>
           </div>
           <div className="flex gap-2 items-center">
             <button aria-label="Interactive Button" className="text-gray-400 hover:text-black"><ChevronLeft className="w-5 h-5" /></button>
             <span className="font-bold text-lg">{currentYear}</span>
             <button aria-label="Interactive Button" className="text-gray-400 hover:text-black"><ChevronRight className="w-5 h-5" /></button>
           </div>
        </div>
        <div className="flex items-center gap-4">
          <button aria-label="Interactive Button" className="text-gray-400 hover:text-black"><Search className="w-4 h-4" /></button>
          <button aria-label="Interactive Button" className="text-gray-400 hover:text-black"><Plus className="w-5 h-5" /></button>
        </div>
      </div>

      <div className="flex-1 flex overflow-hidden">
        {/* Main Calendar View (Timeline style) */}
        <div className="flex-1 overflow-auto p-8 bg-[#F5F5F5] relative">
          <div className="max-w-3xl mx-auto flex flex-col gap-8 relative">
             {/* Timeline line */}
             <div className="absolute left-32 top-0 bottom-0 w-0.5 bg-gray-200"></div>

             {experience.map((exp, idx) => (
               <div key={exp.id} className="flex gap-8 relative z-10">
                 {/* Left side: Date */}
                 <div className="w-24 text-right pt-4 shrink-0">
                   <div className="font-semibold text-sm text-gray-800">{exp.startDate}</div>
                   <div className="text-xs text-gray-400">{exp.endDate}</div>
                 </div>

                 {/* Dot */}
                 <div className="w-4 h-4 rounded-full bg-red-500 border-4 border-[#F5F5F5] absolute left-32 -translate-x-[7px] top-5 shadow-sm"></div>

                 {/* Right side: Event Card */}
                 <div 
                   className="flex-1 bg-white p-5 rounded-xl shadow-sm border border-gray-200 hover:shadow-md cursor-pointer transition-shadow"
                   onClick={() => setSelectedEvent(exp)}
                 >
                   <div className="flex justify-between items-start mb-2">
                     <h3 className="text-xl font-bold text-gray-800">{exp.role}</h3>
                     {exp.logoUrl && <Image src={exp.logoUrl} alt={exp.company} className="w-8 h-8 object-contain rounded" width={800} height={600} />}
                   </div>
                   <h4 className="text-red-500 font-semibold mb-3">{exp.company}</h4>
                   <p className="text-sm text-gray-600 leading-relaxed line-clamp-3">{exp.description}</p>
                 </div>
               </div>
             ))}
          </div>
        </div>

        {/* Right Sidebar (Event Inspector) */}
        {selectedEvent && (
          <div className="w-80 bg-white border-l border-gray-200 flex flex-col h-full overflow-auto shrink-0 shadow-[-10px_0_20px_rgba(0,0,0,0.05)]">
            <div className="p-6">
              <div className="flex justify-between items-start mb-6 border-b border-gray-100 pb-4">
                 <div>
                   <h2 className="text-xl font-bold text-gray-800 leading-tight mb-1">{selectedEvent.role}</h2>
                   <p className="text-red-500 font-medium">{selectedEvent.company}</p>
                 </div>
                 <button aria-label="Interactive Button" onClick={() => setSelectedEvent(null)} className="text-gray-400 hover:text-black text-sm font-bold bg-gray-100 w-6 h-6 rounded-full flex items-center justify-center">✕</button>
              </div>
              
              <div className="flex flex-col gap-6 text-sm">
                <div className="flex gap-3">
                  <div className="w-10 text-gray-400 font-medium">from</div>
                  <div className="text-gray-800 font-medium">{selectedEvent.startDate}</div>
                </div>
                <div className="flex gap-3">
                  <div className="w-10 text-gray-400 font-medium">to</div>
                  <div className="text-gray-800 font-medium">{selectedEvent.endDate}</div>
                </div>
                
                <div className="border-t border-gray-100 pt-6">
                  <div className="text-gray-400 font-medium mb-2">notes</div>
                  <p className="text-gray-700 leading-relaxed whitespace-pre-line">{selectedEvent.description}</p>
                </div>

                {selectedEvent.technologies && selectedEvent.technologies.length > 0 && (
                  <div className="border-t border-gray-100 pt-6">
                    <div className="text-gray-400 font-medium mb-3">technologies</div>
                    <div className="flex flex-wrap gap-2">
                      {selectedEvent.technologies.map((t: string, i: number) => (
                        <span key={i} className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs font-medium">{t}</span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
