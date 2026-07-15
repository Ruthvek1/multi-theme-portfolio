import React, { useState } from 'react';
import { usePortfolio } from '@/core/PortfolioContext';
import { Search, ChevronLeft, ChevronRight, BookOpen } from 'lucide-react';

export default function Dictionary() {
  const { education } = usePortfolio();
  const [selectedWord, setSelectedWord] = useState<any | null>(education[0] || null);

  return (
    <div className="w-full h-full flex flex-col bg-white">
      {/* Toolbar */}
      <div className="h-12 border-b border-gray-200 flex items-center px-4 justify-between shrink-0 bg-gray-50/80 backdrop-blur-md">
        <div className="flex gap-4 items-center">
          <div className="flex gap-1">
            <button aria-label="Interactive Button" className="text-gray-400"><ChevronLeft className="w-5 h-5" /></button>
            <button aria-label="Interactive Button" className="text-gray-300"><ChevronRight className="w-5 h-5" /></button>
          </div>
          <div className="flex gap-4 text-sm font-medium">
             <button aria-label="Interactive Button" className="text-black bg-gray-200/80 px-2 py-0.5 rounded shadow-sm">All</button>
             <button aria-label="Interactive Button" className="text-gray-500 hover:text-black">Wikipedia</button>
             <button aria-label="Interactive Button" className="text-gray-500 hover:text-black">Apple</button>
          </div>
        </div>
        <div className="relative">
          <Search className="w-3.5 h-3.5 text-gray-400 absolute left-2 top-1/2 -translate-y-1/2" />
          <input type="text" placeholder="Search" className="pl-7 pr-3 py-1 bg-white border border-gray-200 rounded-md text-sm w-48 outline-none focus:ring-2 focus:ring-blue-500/50 shadow-sm" />
        </div>
      </div>

      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar (Word List) */}
        <div className="w-64 bg-[#F5F5F5] border-r border-gray-200 flex flex-col h-full shrink-0 overflow-auto">
           {education.map((edu, idx) => (
             <div 
               key={edu.id} 
               onClick={() => setSelectedWord(edu)}
               className={`px-4 py-2 border-b border-gray-200/50 cursor-pointer ${selectedWord?.id === edu.id ? 'bg-blue-500 text-white' : 'hover:bg-gray-200/50'}`}
             >
                <div className="font-bold text-sm truncate">{edu.degree}</div>
                <div className={`text-xs truncate ${selectedWord?.id === edu.id ? 'text-blue-100' : 'text-gray-500'}`}>{edu.institution}</div>
             </div>
           ))}
        </div>

        {/* Main Content (Definition) */}
        <div className="flex-1 overflow-auto p-12 bg-white">
           {selectedWord ? (
             <div className="max-w-2xl text-gray-800">
                <div className="flex items-baseline gap-4 mb-2">
                  <h1 className="text-4xl font-serif font-bold text-black">{selectedWord.degree}</h1>
                  <span className="text-lg text-gray-500 font-serif italic">noun</span>
                </div>
                <div className="text-blue-600 mb-8 font-medium">/ ˈɛdʒ ʊ ˈk eɪ ʃ ən /</div>
                
                <div className="mb-6">
                  <h2 className="text-xl font-bold mb-2">1</h2>
                  <p className="text-lg font-serif leading-relaxed pl-6 border-l-4 border-gray-200">
                    A degree pursued at <span className="font-bold">{selectedWord.institution}</span>, focusing on advanced studies and academic excellence.
                  </p>
                  <div className="pl-6 mt-4 text-gray-600 font-serif italic">
                    "Graduated in {selectedWord.endDate} with notable achievements."
                  </div>
                </div>

                <div className="mb-6">
                  <h2 className="text-xl font-bold mb-2">2</h2>
                  <p className="text-lg font-serif leading-relaxed pl-6 border-l-4 border-gray-200">
                    {selectedWord.description}
                  </p>
                </div>

                <div className="mb-6">
                  <h2 className="text-xl font-bold mb-2">3</h2>
                  <p className="text-lg font-serif leading-relaxed pl-6 border-l-4 border-gray-200">
                    Duration of study.
                  </p>
                  <div className="pl-6 mt-4 text-gray-600 font-serif italic">
                    "Attended from {selectedWord.startDate} to {selectedWord.endDate}."
                  </div>
                </div>

             </div>
           ) : (
             <div className="flex flex-col items-center justify-center h-full text-gray-400">
                <BookOpen className="w-16 h-16 mb-4 opacity-50" />
                <p>Select an entry to view details</p>
             </div>
           )}
        </div>
      </div>
    </div>
  );
}
