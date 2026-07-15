'use client';
import React, { useState, useEffect } from 'react';
import { ExternalLink, Play } from 'lucide-react';

// Split flap character simulation component
function SplitFlapText({ text, length, delay = 0 }: { text: string, length: number, delay?: number }) {
  const [displayedText, setDisplayedText] = useState(Array(length).fill(''));
  const targetText = (text || '').padEnd(length, ' ').slice(0, length).toUpperCase();
  const characters = ' ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789-./'.split('');

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    
    timeout = setTimeout(() => {
      let currentIndices = Array(length).fill(0);
      const targetIndices = targetText.split('').map(char => Math.max(0, characters.indexOf(char)));
      
      const interval = setInterval(() => {
        let allMatched = true;
        
        currentIndices = currentIndices.map((current, i) => {
          if (current !== targetIndices[i]) {
            allMatched = false;
            return (current + 1) % characters.length;
          }
          return current;
        });

        setDisplayedText(currentIndices.map(idx => characters[idx]));

        if (allMatched) clearInterval(interval);
      }, 50);

      return () => clearInterval(interval);
    }, delay);

    return () => clearTimeout(timeout);
  }, [targetText, length, delay]);

  return (
    <div className="flex gap-[2px]">
      {displayedText.map((char, i) => (
        <div key={i} className="w-6 h-8 bg-black text-yellow-400 font-mono text-xl font-bold flex items-center justify-center rounded-sm relative shadow-inner overflow-hidden border border-gray-800">
           {/* Center split line */}
           <div className="absolute top-1/2 left-0 right-0 h-[1px] bg-black z-10 w-full shadow-[0_1px_0_rgba(255,255,255,0.1)]"></div>
           {char === ' ' ? '' : char}
        </div>
      ))}
    </div>
  );
}

export default function DeparturesBoard({ projects }: { projects: any[] }) {
  return (
    <div className="bg-[#111] p-4 md:p-8 rounded-xl shadow-2xl overflow-hidden border-8 border-gray-900 relative">
       {/* Frame detailing */}
       <div className="absolute top-0 left-0 right-0 h-4 bg-gradient-to-b from-black to-transparent pointer-events-none z-20"></div>
       <div className="absolute bottom-0 left-0 right-0 h-4 bg-gradient-to-t from-black to-transparent pointer-events-none z-20"></div>

       <div className="overflow-x-auto">
          <div className="min-w-[1000px]">
             {/* Header Row */}
             <div className="grid grid-cols-[100px_350px_150px_200px_auto] gap-4 mb-4 px-2 text-xs font-bold text-gray-500 uppercase tracking-widest border-b border-gray-800 pb-2">
                <div>Flight</div>
                <div>Destination (Project)</div>
                <div>Est. Year</div>
                <div>Tech Stack</div>
                <div>Gate / Boarding</div>
             </div>

             {/* Rows */}
             <div className="space-y-3">
                {projects.map((project, index) => (
                  <div key={project.id} className="grid grid-cols-[100px_350px_150px_200px_auto] gap-4 items-center p-2 hover:bg-white/5 rounded-lg transition-colors group">
                     <div>
                        <SplitFlapText text={`PRJ${(index + 1).toString().padStart(2, '0')}`} length={5} delay={index * 200} />
                     </div>
                     <div>
                        <SplitFlapText text={project.title} length={16} delay={index * 200 + 100} />
                     </div>
                     <div>
                        <SplitFlapText text={project.year || "LIVE"} length={4} delay={index * 200 + 200} />
                     </div>
                     <div>
                        <SplitFlapText text={project.technologies?.[0] || "WEB"} length={8} delay={index * 200 + 300} />
                     </div>
                     <div className="flex items-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
                        {project.liveUrl && (
                           <a aria-label="Link" href={project.liveUrl} target="_blank" rel="noreferrer" className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded font-bold text-xs uppercase tracking-widest hover:bg-green-500 transition-colors">
                              <Play className="w-3 h-3" /> Board Now
                           </a>
                        )}
                        {project.githubUrl && (
                           <a aria-label="Link" href={project.githubUrl} target="_blank" rel="noreferrer" className="flex items-center gap-2 bg-gray-800 text-white px-4 py-2 rounded font-bold text-xs uppercase tracking-widest hover:bg-gray-700 transition-colors border border-gray-600">
                              <ExternalLink className="w-3 h-3" /> Source
                           </a>
                        )}
                     </div>
                  </div>
                ))}
             </div>
          </div>
       </div>
    </div>
  );
}
