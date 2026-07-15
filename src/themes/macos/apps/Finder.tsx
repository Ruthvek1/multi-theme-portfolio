import React, { useState } from 'react';
import Image from 'next/image';
import { usePortfolio } from '@/core/PortfolioContext';
import { Folder, FileText, ChevronRight, LayoutGrid, List, Search, Star, Clock, Cloud } from 'lucide-react';

export default function Finder() {
  const { projects } = usePortfolio();
  const [view, setView] = useState<'grid' | 'list'>('grid');
  const [selectedProject, setSelectedProject] = useState<any | null>(null);

  if (selectedProject) {
    return (
      <div className="w-full h-full flex flex-col bg-white">
        {/* Finder Toolbar */}
        <div className="h-12 border-b border-gray-200 flex items-center px-4 justify-between bg-gray-50/80 backdrop-blur-md">
          <div className="flex items-center gap-4">
            <button aria-label="Interactive Button" onClick={() => setSelectedProject(null)} className="text-gray-500 hover:text-black">
              <ChevronRight className="w-5 h-5 rotate-180" />
            </button>
            <span className="font-medium text-sm">{selectedProject.title}</span>
          </div>
        </div>
        
        {/* Project Detail */}
        <div className="flex-1 overflow-auto p-8 flex flex-col md:flex-row gap-8">
          <div className="w-full md:w-1/2 rounded-xl overflow-hidden shadow-lg border border-gray-200 shrink-0">
             <Image src={selectedProject.thumbnailUrl || 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2940&auto=format&fit=crop'} alt={selectedProject.title} className="w-full h-auto object-cover" width={800} height={600} />
          </div>
          <div className="flex flex-col gap-4">
            <h1 className="text-3xl font-bold">{selectedProject.title}</h1>
            <h2 className="text-xl text-gray-500">{selectedProject.subtitle}</h2>
            <p className="text-gray-700 leading-relaxed">{selectedProject.description}</p>
            
            <div className="mt-4">
              <h3 className="font-semibold text-sm text-gray-500 mb-2">Technologies</h3>
              <div className="flex flex-wrap gap-2">
                {selectedProject.technologies.map((t: string, i: number) => (
                  <span key={i} className="px-3 py-1 bg-gray-100 rounded-full text-xs font-medium text-gray-600 border border-gray-200">{t}</span>
                ))}
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              {selectedProject.liveUrl && (
                <a aria-label="Link" href={selectedProject.liveUrl} target="_blank" className="px-5 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg text-sm font-semibold shadow-sm transition-colors">Open Live Demo</a>
              )}
              {selectedProject.githubUrl && (
                <a aria-label="Link" href={selectedProject.githubUrl} target="_blank" className="px-5 py-2 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-lg text-sm font-semibold border border-gray-300 transition-colors">View Source</a>
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
            <Folder className="w-4 h-4 text-blue-500" fill="currentColor" /> Projects
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
             <span className="font-bold text-sm">Projects</span>
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
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-gray-400 absolute left-2 top-1/2 -translate-y-1/2" />
              <input type="text" placeholder="Search" className="pl-7 pr-3 py-1 bg-gray-100 border border-gray-200 rounded-md text-sm w-40 outline-none focus:ring-2 focus:ring-blue-500/50" />
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-auto p-4">
          {view === 'grid' ? (
            <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
              {projects.map((project: any) => (
                <div 
                  key={project.id} 
                  className="flex flex-col items-center gap-2 p-3 rounded-lg hover:bg-gray-100 cursor-pointer group"
                  onClick={() => setSelectedProject(project)}
                >
                  <div className="relative">
                    <Folder className="w-16 h-16 text-blue-400 drop-shadow-sm group-hover:scale-105 transition-transform" fill="currentColor" />
                    <div className="absolute inset-0 flex items-center justify-center pt-2">
                       <FileText className="w-6 h-6 text-white/50" />
                    </div>
                  </div>
                  <span className="text-xs text-center font-medium line-clamp-2 leading-tight">{project.title}</span>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col">
              <div className="flex items-center gap-4 px-4 py-2 border-b border-gray-200 text-xs font-semibold text-gray-500">
                <div className="w-1/2">Name</div>
                <div className="w-1/4">Date Modified</div>
                <div className="w-1/4">Kind</div>
              </div>
              {projects.map((project: any) => (
                <div 
                  key={project.id}
                  onClick={() => setSelectedProject(project)}
                  className="flex items-center gap-4 px-4 py-1.5 hover:bg-blue-500 hover:text-white cursor-pointer group text-sm border-b border-gray-100 last:border-0"
                >
                  <div className="w-1/2 flex items-center gap-3">
                    <Folder className="w-4 h-4 text-blue-400 group-hover:text-white" fill="currentColor" />
                    <span className="font-medium truncate">{project.title}</span>
                  </div>
                  <div className="w-1/4 text-gray-500 group-hover:text-blue-100 text-xs">{project.year || 'Unknown Date'}</div>
                  <div className="w-1/4 text-gray-500 group-hover:text-blue-100 text-xs">Project Folder</div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
