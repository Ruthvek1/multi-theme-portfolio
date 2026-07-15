'use client';
import React, { useEffect, useRef, useState } from 'react';

export default function EvidenceTimeline({ experience, education }: { experience: any[], education: any[] }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [lines, setLines] = useState<{x1: number, y1: number, x2: number, y2: number}[]>([]);

  // Calculate string paths between evidence pins
  useEffect(() => {
    const updateLines = () => {
      if (!containerRef.current) return;
      const containerRect = containerRef.current.getBoundingClientRect();
      const pins = Array.from(containerRef.current.querySelectorAll('.evidence-pin'));
      
      const newLines = [];
      for (let i = 0; i < pins.length - 1; i++) {
        const pin1 = pins[i].getBoundingClientRect();
        const pin2 = pins[i+1].getBoundingClientRect();
        
        newLines.push({
          x1: pin1.left + pin1.width / 2 - containerRect.left,
          y1: pin1.top + pin1.height / 2 - containerRect.top,
          x2: pin2.left + pin2.width / 2 - containerRect.left,
          y2: pin2.top + pin2.height / 2 - containerRect.top,
        });
      }
      setLines(newLines);
    };

    // Use ResizeObserver for window resizes or layout shifts
    const observer = new ResizeObserver(() => {
      window.requestAnimationFrame(updateLines);
    });

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }
    observer.observe(document.body);

    // Actively recalculate lines during the entry animation (1.3s) and font loading phase (up to 3.5s)
    let animationFrameId: number;
    const startTime = Date.now();
    const loop = () => {
      updateLines();
      if (Date.now() - startTime < 3500) {
        animationFrameId = requestAnimationFrame(loop);
      }
    };
    loop();

    // Also trigger specifically when fonts finish loading
    if ('fonts' in document) {
      document.fonts.ready.then(updateLines);
    }

    window.addEventListener('resize', updateLines);
    
    return () => {
      observer.disconnect();
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', updateLines);
    };
  }, [experience, education]);

  return (
    <div className="max-w-5xl mx-auto mb-32 relative" ref={containerRef}>
       
       {/* Global Red String Layer */}
       <svg className="absolute inset-0 w-full h-full pointer-events-none z-10" style={{ minHeight: '100%' }}>
          {/* Drop shadow for strings */}
          <filter id="string-shadow">
             <feDropShadow dx="2" dy="5" stdDeviation="2" floodColor="#000" floodOpacity="0.4" />
          </filter>
          {lines.map((line, i) => (
             <line 
                key={i} 
                x1={line.x1} y1={line.y1} x2={line.x2} y2={line.y2} 
                stroke="#c0392b" 
                strokeWidth="4" 
                filter="url(#string-shadow)"
                className="opacity-90"
             />
          ))}
       </svg>

       <div className="flex justify-center mb-16 relative z-20">
          <div className="bg-red-700 text-white px-6 py-2 font-['Courier_New'] font-bold text-2xl uppercase shadow-[0_5px_15px_rgba(0,0,0,0.5)] rotate-[-3deg] border-2 border-white">
             Subject Timeline Logs
          </div>
       </div>

       <div className="space-y-24 relative z-20 pb-16">
          
          {/* Scatter Experience as Polaroids */}
          {experience.map((exp, i) => {
             const alignLeft = i % 2 === 0;
             const rotate = alignLeft ? `rotate-[-${(i%3 + 1)*3}deg]` : `rotate-[${(i%3 + 1)*3}deg]`;
             
             return (
                <div key={`exp-${i}`} className={`flex flex-col ${alignLeft ? 'items-start md:pr-48' : 'items-end md:pl-48'}`}>
                   
                   <div className={`w-full md:w-[400px] bg-white p-4 pb-8 shadow-2xl border border-gray-300 relative transition-transform hover:scale-110 hover:z-30 ${rotate}`}>
                      
                      {/* Physical Pin */}
                      <div className="evidence-pin absolute -top-3 left-1/2 -translate-x-1/2 w-6 h-6 rounded-full bg-red-600 border border-red-900 shadow-[2px_4px_5px_rgba(0,0,0,0.5)] flex items-center justify-center z-30">
                         <div className="w-2 h-2 rounded-full bg-white/40 absolute top-1 left-1"></div>
                      </div>

                      {/* Polaroid Photo area (using a dark box since we don't have photos for every job) */}
                      <div className="w-full aspect-[4/3] bg-gray-900 mb-4 p-2 flex flex-col justify-between border border-gray-400 relative overflow-hidden">
                         <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-20"></div>
                         <div className="text-white/50 font-['Courier_New'] text-xs text-right">EVIDENCE REF: {exp.company.substring(0,3).toUpperCase()}-{i}</div>
                         <h3 className="text-white font-serif font-black text-3xl uppercase leading-none drop-shadow-md z-10">{exp.company}</h3>
                      </div>

                      {/* Sharpie text below photo */}
                      <div className="font-['Caveat',_cursive] text-blue-900 text-2xl leading-none px-2 transform -rotate-1">
                         <div className="text-red-600 font-bold text-lg mb-1 font-['Courier_New'] uppercase tracking-widest border-b border-red-200">
                            [ {exp.startDate} - {exp.endDate || 'Present'} ]
                         </div>
                         <div className="font-black mb-1">{exp.role}</div>
                         <p className="text-lg opacity-80 leading-tight">{exp.description}</p>
                      </div>
                   </div>
                </div>
             );
          })}

          {/* Scatter Education as Torn Receipts/Tickets */}
          {education.map((edu, i) => {
             const alignLeft = i % 2 !== 0; // Opposite scatter
             const rotate = alignLeft ? `rotate-[-${(i%2 + 2)*4}deg]` : `rotate-[${(i%2 + 2)*4}deg]`;
             
             return (
                <div key={`edu-${i}`} className={`flex flex-col ${alignLeft ? 'items-start md:pr-64' : 'items-end md:pl-64'}`}>
                   
                   <div className={`w-full md:w-[350px] bg-[#f9f5ea] p-6 shadow-xl border-t border-b border-dashed border-gray-400 relative transition-transform hover:scale-110 hover:z-30 ${rotate}`}>
                      
                      {/* Physical Pin */}
                      <div className="evidence-pin absolute top-4 -left-3 w-6 h-6 rounded-full bg-blue-600 border border-blue-900 shadow-[2px_4px_5px_rgba(0,0,0,0.5)] flex items-center justify-center z-30">
                         <div className="w-2 h-2 rounded-full bg-white/40 absolute top-1 left-1"></div>
                      </div>

                      {/* Coffee Stain */}
                      {i % 2 === 0 && (
                         <div className="absolute -bottom-4 -right-4 w-16 h-16 rounded-full border-4 border-yellow-800/20 opacity-50 z-0 pointer-events-none"></div>
                      )}

                      <div className="font-['Courier_New'] text-gray-800 relative z-10">
                         <div className="text-center font-black uppercase text-xl mb-4 pb-2 border-b-2 border-dashed border-gray-400 tracking-widest">
                            Admission Ticket
                         </div>
                         
                         <div className="text-sm font-bold bg-black text-white px-2 py-1 mb-4 inline-block">
                            [ {edu.startDate} - {edu.endDate || 'Present'} ]
                         </div>
                         
                         <h3 className="text-xl font-bold uppercase mb-2">{edu.degree}</h3>
                         <div className="text-lg mb-4">{edu.institution || edu.school}</div>
                         
                         {edu.description && (
                            <p className="font-['Caveat',_cursive] text-2xl text-blue-800 leading-tight mt-4 rotate-2 pb-2">
                               {edu.description}
                            </p>
                         )}
                      </div>
                   </div>
                </div>
             );
          })}

       </div>
    </div>
  );
}
