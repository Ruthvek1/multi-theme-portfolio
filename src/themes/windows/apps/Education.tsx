import React from 'react';
import Window from '../components/Window';
import { usePortfolio } from '@/core/PortfolioContext';
import { GraduationCap, Award, BookOpen } from 'lucide-react';

export default function EducationApp() {
  const { education } = usePortfolio();

  return (
    <Window 
      id="education" 
      title="Education & Training" 
      icon={<GraduationCap className="w-full h-full text-purple-400" />}
      defaultWidth={700}
      defaultHeight={500}
    >
      <div className="w-full h-full flex flex-col bg-[#ffffff] text-black">
        
        {/* Toolbar */}
        <div className="flex border-b border-gray-200 bg-[#f5f5f5] p-2 gap-4 text-xs font-semibold text-gray-700">
          <div className="flex items-center gap-2 px-3 py-1 bg-white border border-gray-300 rounded shadow-sm">
            <BookOpen className="w-4 h-4 text-purple-500" /> Academic Records
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 p-8 overflow-y-auto bg-gray-50">
          <h1 className="text-2xl font-bold text-gray-800 mb-6 border-b pb-2 flex items-center gap-3">
            <GraduationCap className="w-8 h-8 text-purple-600" />
            Education History
          </h1>
          
          <div className="flex flex-col gap-6 relative">
            {/* Vertical timeline line */}
            <div className="absolute left-[15px] top-4 bottom-0 w-0.5 bg-gray-300" />

            {education && education.map((edu: any, i: number) => (
              <div key={edu.id} className="relative pl-10">
                {/* Timeline dot */}
                <div className="absolute left-[9px] top-1.5 w-3.5 h-3.5 rounded-full bg-purple-500 border-2 border-white shadow-sm" />
                
                <div className="bg-white p-5 rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h2 className="text-lg font-bold text-gray-900">{edu.degree}</h2>
                      <h3 className="text-md font-semibold text-purple-700">{edu.institution}</h3>
                    </div>
                    <span className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-xs font-bold whitespace-nowrap">
                      {edu.startDate} - {edu.endDate}
                    </span>
                  </div>
                  <p className="text-gray-600 text-sm mt-3 leading-relaxed border-t border-gray-100 pt-3">
                    {edu.description}
                  </p>
                </div>
              </div>
            ))}

            {(!education || education.length === 0) && (
              <div className="text-gray-500 pl-10 italic">No education records found.</div>
            )}
          </div>
        </div>
      </div>
    </Window>
  );
}
