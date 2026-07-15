'use client';

import React from 'react';

export default function TripHistory({ experience }: { experience: any[] }) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden flex flex-col">
      <div className="p-4 md:p-6 border-b border-gray-100">
        <h2 className="text-lg font-bold text-black">Past Trips (Experience)</h2>
        <p className="text-sm text-gray-500">Your chronological journey</p>
      </div>
      
      <div className="p-4 md:p-6 space-y-6">
        {experience.map((exp: any, i: number) => (
          <div key={i} className="flex gap-4">
            
            {/* Uber Timeline Line */}
            <div className="flex flex-col items-center shrink-0 w-6 pt-1">
               {/* Start dot (black) */}
               <div className="w-2.5 h-2.5 bg-black rounded-full shrink-0" />
               {/* Vertical connecting line */}
               {i !== experience.length - 1 && (
                 <div className="w-[1px] h-full bg-gray-300 my-1" />
               )}
            </div>
            
            {/* Trip Details */}
            <div className="flex-1 pb-6 border-b border-gray-100 last:border-0 last:pb-0">
               <div className="flex justify-between items-start mb-1">
                 <h3 className="text-base font-bold text-black">{exp.role}</h3>
                 <span className="text-sm text-gray-500 bg-gray-100 px-2 py-0.5 rounded-md whitespace-nowrap">{exp.startDate} - {exp.endDate}</span>
               </div>
               
               <div className="text-sm font-medium text-black mb-2">{exp.company}</div>
               
               <p className="text-sm text-gray-600 leading-relaxed">
                 {exp.description}
               </p>
            </div>

          </div>
        ))}

        {/* Final dropoff point (square) */}
        <div className="flex gap-4">
            <div className="flex flex-col items-center shrink-0 w-6">
               <div className="w-2.5 h-2.5 bg-[#05A357] shrink-0" /> {/* Uber Green Square */}
            </div>
            <div className="flex-1">
               <h3 className="text-base font-bold text-black">Current Location</h3>
               <div className="text-sm text-gray-500">Looking for new destinations...</div>
            </div>
        </div>

      </div>
    </div>
  );
}
