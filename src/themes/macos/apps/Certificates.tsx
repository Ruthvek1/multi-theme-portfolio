import React, { useState } from 'react';
import { usePortfolio } from '@/core/PortfolioContext';
import { Award, ChevronRight, LayoutGrid, List, Star, Clock, Cloud } from 'lucide-react';

export default function Certificates() {
  const { certifications } = usePortfolio();
  const [view, setView] = useState<'grid' | 'list'>('grid');
  const [selectedCert, setSelectedCert] = useState<any | null>(null);

  if (selectedCert) {
    return (
      <div className="w-full h-full flex flex-col bg-white">
        {/* Finder Toolbar */}
        <div className="h-12 border-b border-gray-200 flex items-center px-4 justify-between bg-gray-50/80 backdrop-blur-md">
          <div className="flex items-center gap-4">
            <button aria-label="Interactive Button" onClick={() => setSelectedCert(null)} className="text-gray-500 hover:text-black">
              <ChevronRight className="w-5 h-5 rotate-180" />
            </button>
            <span className="font-medium text-sm">{selectedCert.name}</span>
          </div>
        </div>
        
        {/* Detail */}
        <div className="flex-1 overflow-auto p-8 flex flex-col md:flex-row gap-8">
          <div className="w-full md:w-1/3 rounded-xl overflow-hidden shadow-lg border border-gray-200 shrink-0 bg-blue-50/50 flex flex-col items-center justify-center p-8 aspect-square">
             <Award className="w-32 h-32 text-blue-500 mb-4" />
          </div>
          <div className="flex flex-col gap-4">
            <h1 className="text-3xl font-bold">{selectedCert.name}</h1>
            <h2 className="text-xl text-gray-500">{selectedCert.issuer}</h2>
            <p className="text-gray-700 leading-relaxed font-semibold">Date Issued: {selectedCert.date}</p>
            
            <div className="flex gap-3 mt-6">
              {(selectedCert.url || selectedCert.fileUrl) && (
                <a aria-label="Link" href={selectedCert.url || selectedCert.fileUrl} target="_blank" rel="noreferrer" className="px-5 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg text-sm font-semibold shadow-sm transition-colors">
                  View Credential
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-full flex bg-white">
      {/* Sidebar */}
      <div className="w-48 bg-gray-100/80 backdrop-blur-xl border-r border-gray-200 flex flex-col py-2 shrink-0 h-full overflow-y-auto">
        <div className="px-4 py-1 text-xs font-semibold text-gray-400 mt-2">Favorites</div>
        <div className="px-2 flex flex-col gap-0.5 mt-1">
          <div className="flex items-center gap-2 px-2 py-1.5 rounded-md hover:bg-gray-200/50 cursor-pointer text-sm font-medium text-gray-700">
            <Star className="w-4 h-4 text-blue-500" fill="currentColor" /> AirDrop
          </div>
          <div className="flex items-center gap-2 px-2 py-1.5 rounded-md hover:bg-gray-200/50 cursor-pointer text-sm font-medium text-gray-700">
            <Clock className="w-4 h-4 text-blue-500" /> Recents
          </div>
          <div className="flex items-center gap-2 px-2 py-1.5 bg-gray-200/80 rounded-md cursor-pointer text-sm font-medium text-black">
            <Award className="w-4 h-4 text-blue-500" /> Certificates
          </div>
        </div>
        
        <div className="px-4 py-1 text-xs font-semibold text-gray-400 mt-4">iCloud</div>
        <div className="px-2 flex flex-col gap-0.5 mt-1">
          <div className="flex items-center gap-2 px-2 py-1.5 rounded-md hover:bg-gray-200/50 cursor-pointer text-sm font-medium text-gray-700">
            <Cloud className="w-4 h-4 text-blue-500" /> iCloud Drive
          </div>
        </div>
      </div>

      {/* Main Area */}
      <div className="flex-1 flex flex-col h-full overflow-hidden bg-white">
        {/* Toolbar */}
        <div className="h-12 border-b border-gray-200 flex items-center px-4 justify-between bg-white shrink-0">
          <div className="flex gap-4">
             <div className="flex gap-1">
               <button aria-label="Interactive Button" className="text-gray-300"><ChevronRight className="w-5 h-5 rotate-180" /></button>
               <button aria-label="Interactive Button" className="text-gray-300"><ChevronRight className="w-5 h-5" /></button>
             </div>
             <span className="font-bold text-sm">Certificates</span>
          </div>
          <div className="flex gap-4 items-center">
            <div className="flex bg-gray-100 rounded-md border border-gray-200 p-0.5">
              <button aria-label="Interactive Button" onClick={() => setView('grid')} className={`p-1 rounded shadow-sm ${view === 'grid' ? 'bg-white text-black' : 'text-gray-500 hover:text-black'}`}>
                <LayoutGrid className="w-4 h-4" />
              </button>
              <button aria-label="Interactive Button" onClick={() => setView('list')} className={`p-1 rounded ${view === 'list' ? 'bg-white text-black shadow-sm' : 'text-gray-500 hover:text-black'}`}>
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-auto p-4 md:p-8">
          {view === 'grid' ? (
            <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
              {certifications?.map((cert: any) => (
                <div key={cert.id} onClick={() => setSelectedCert(cert)} className="flex flex-col items-center gap-2 p-3 rounded-lg hover:bg-blue-50/50 cursor-pointer group">
                  <div className="w-20 h-24 bg-white border border-gray-200 shadow-sm flex items-center justify-center rounded group-hover:scale-105 transition-transform">
                    <Award className="w-10 h-10 text-blue-500" />
                  </div>
                  <span className="text-sm font-medium text-center line-clamp-2">{cert.name}</span>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col">
              <div className="flex border-b border-gray-200 pb-2 mb-2 text-xs font-medium text-gray-500 px-2">
                <div className="w-1/2">Name</div>
                <div className="w-1/4">Date</div>
                <div className="w-1/4">Issuer</div>
              </div>
              {certifications?.map((cert: any) => (
                <div key={cert.id} onClick={() => setSelectedCert(cert)} className="flex items-center py-2 px-2 hover:bg-blue-50 cursor-pointer rounded-md">
                  <div className="w-1/2 flex items-center gap-3">
                    <Award className="w-5 h-5 text-blue-500" />
                    <span className="text-sm font-medium">{cert.name}</span>
                  </div>
                  <div className="w-1/4 text-sm text-gray-600">{cert.date}</div>
                  <div className="w-1/4 text-sm text-gray-600">{cert.issuer}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
