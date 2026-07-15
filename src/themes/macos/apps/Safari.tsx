import React, { useState } from 'react';
import { usePortfolio } from '@/core/PortfolioContext';
import { ChevronLeft, ChevronRight, Share, Plus, Shield, Search } from 'lucide-react';

export default function Safari() {
  const { personal } = usePortfolio();
  const [url, setUrl] = useState('portfolio.local/resume.pdf');

  return (
    <div className="w-full h-full flex flex-col bg-white">
      {/* Toolbar */}
      <div className="h-14 border-b border-gray-200 flex flex-col justify-center bg-gray-50/80 backdrop-blur-md shrink-0 px-4">
        <div className="flex items-center justify-between w-full">
          {/* Navigation Controls */}
          <div className="flex gap-4">
            <div className="flex gap-1">
              <button aria-label="Interactive Button" className="text-gray-400"><ChevronLeft className="w-5 h-5" /></button>
              <button aria-label="Interactive Button" className="text-gray-300"><ChevronRight className="w-5 h-5" /></button>
            </div>
            <button aria-label="Interactive Button" className="text-gray-500"><Shield className="w-4 h-4" /></button>
          </div>

          {/* Address Bar */}
          <div className="flex-1 max-w-xl mx-8">
            <div className="w-full bg-white border border-gray-200 rounded-md h-7 flex items-center px-3 shadow-sm relative focus-within:ring-2 focus-within:ring-blue-500/50">
               <span className="text-xs text-black/50 font-medium select-none absolute left-1/2 -translate-x-1/2 flex items-center gap-1">
                  <Search className="w-3 h-3" /> {url}
               </span>
            </div>
          </div>

          {/* Right Controls */}
          <div className="flex gap-4">
            <button aria-label="Interactive Button" className="text-gray-500"><Share className="w-4 h-4" /></button>
            <button aria-label="Interactive Button" className="text-gray-500"><Plus className="w-5 h-5" /></button>
          </div>
        </div>
      </div>

      {/* Main Browser Content Area */}
      <div className="flex-1 w-full bg-gray-100 flex justify-center overflow-auto p-8 relative">
         <div className="w-full max-w-4xl bg-white shadow-2xl h-[200%] border border-gray-200 relative mb-20 flex flex-col items-center justify-center">
            {personal?.resumeUrl ? (
              <iframe src={personal.resumeUrl} className="w-full h-full border-none" title="Resume" />
            ) : (
              <div className="flex flex-col items-center text-center p-20 opacity-50">
                <FileText className="w-20 h-20 text-gray-400 mb-6" />
                <h2 className="text-3xl font-serif text-gray-800">Resume PDF Viewer</h2>
                <p className="mt-4 text-gray-500 font-serif">Configure a resumeUrl in personal.json to display your actual resume document here.</p>
              </div>
            )}
         </div>
      </div>
    </div>
  );
}

const FileText = (props: any) => (
  <svg {...props} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
  </svg>
);
