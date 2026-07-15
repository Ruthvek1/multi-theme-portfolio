import React, { useState } from 'react';
import Image from 'next/image';
import Window from '../components/Window';
import { usePortfolio } from '@/core/PortfolioContext';
import { FolderGit2, ChevronRight, ChevronDown, HardDrive, Monitor, FolderOpen, Search, ArrowLeft, ArrowRight, ArrowUp } from 'lucide-react';

export default function FileExplorerApp() {
  const { projects } = usePortfolio();
  const [selectedProject, setSelectedProject] = useState<any | null>(null);

  return (
    <Window 
      id="explorer" 
      title="File Explorer - Projects" 
      icon={<FolderGit2 className="w-full h-full text-yellow-400" />}
      defaultWidth={900}
      defaultHeight={600}
    >
      <div className="w-full h-full flex flex-col bg-[#191919] text-gray-200 text-sm">
        
        {/* Explorer Toolbar / Ribbon */}
        <div className="flex flex-col border-b border-white/10 bg-[#202020]">
          {/* Tabs */}
          <div className="flex gap-2 px-2 pt-2">
            <div className="px-4 py-1.5 bg-[#191919] rounded-t flex items-center gap-2 text-xs">
              <FolderGit2 className="w-3.5 h-3.5 text-yellow-400" /> Projects
            </div>
            <div className="px-4 py-1.5 hover:bg-white/5 rounded-t flex items-center gap-2 text-xs">
              +
            </div>
          </div>
          
          {/* Actions & Path Bar */}
          <div className="flex items-center gap-4 px-2 py-2 border-t border-white/5">
            <div className="flex gap-2 text-gray-400">
              <ArrowLeft className="w-4 h-4 hover:text-white cursor-pointer" onClick={() => setSelectedProject(null)} />
              <ArrowRight className="w-4 h-4 opacity-50" />
              <ArrowUp className="w-4 h-4 hover:text-white cursor-pointer" onClick={() => setSelectedProject(null)} />
            </div>
            
            <div className="flex-1 bg-[#191919] border border-white/10 rounded flex items-center px-2 py-1 gap-2">
              <FolderOpen className="w-4 h-4 text-yellow-400" />
              <span className="text-xs">{selectedProject ? `This PC > Projects > ${selectedProject.title}` : 'This PC > Projects'}</span>
            </div>

            <div className="w-64 bg-[#191919] border border-white/10 rounded flex items-center px-2 py-1 gap-2">
              <input type="text" placeholder="Search Projects" className="bg-transparent outline-none text-xs w-full" />
              <Search className="w-3.5 h-3.5 text-gray-400" />
            </div>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 flex overflow-hidden">
          
          {/* Sidebar */}
          <div className="w-48 border-r border-white/10 overflow-y-auto p-2 bg-[#202020] hidden md:block">
            <div className="flex items-center gap-2 p-1 hover:bg-white/5 rounded cursor-pointer mb-2">
              <Monitor className="w-4 h-4 text-blue-400" /> This PC
            </div>
            
            <div className="pl-4 flex flex-col gap-1">
              <div className="flex items-center gap-2 p-1 hover:bg-white/5 rounded cursor-pointer text-yellow-400">
                <FolderGit2 className="w-4 h-4" /> Projects
              </div>
              <div className="flex items-center gap-2 p-1 hover:bg-white/5 rounded cursor-pointer text-gray-400">
                <HardDrive className="w-4 h-4" /> Local Disk (C:)
              </div>
            </div>
          </div>

          {/* Main Files View */}
          <div className="flex-1 p-4 overflow-y-auto bg-[#191919]">
            {!selectedProject ? (
              <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {projects.map((project: any) => (
                  <div 
                    key={project.id}
                    onClick={() => setSelectedProject(project)}
                    className="flex flex-col items-center gap-2 p-3 hover:bg-white/10 rounded-lg cursor-pointer group"
                  >
                    <FolderGit2 className="w-16 h-16 text-yellow-400 group-hover:scale-105 transition-transform" />
                    <span className="text-xs text-center line-clamp-2">{project.title}</span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col gap-6 max-w-3xl">
                <div className="flex gap-6">
                  <div className="w-48 h-48 rounded-lg overflow-hidden shrink-0 bg-[#202020] border border-white/10">
                    <Image src={projectImagePlaceholder(selectedProject)} alt={selectedProject.title} className="w-full h-full object-cover" width={800} height={600} />
                  </div>
                  <div className="flex flex-col gap-3">
                    <h1 className="text-3xl font-bold">{selectedProject.title}</h1>
                    <h2 className="text-lg text-gray-400">{selectedProject.subtitle}</h2>
                    <p className="text-sm text-gray-300 leading-relaxed">{selectedProject.description}</p>
                    
                    <div className="flex gap-3 mt-2">
                      {selectedProject.liveUrl && (
                        <a aria-label="Link" href={selectedProject.liveUrl} target="_blank" className="px-4 py-1.5 bg-blue-600 hover:bg-blue-500 rounded text-xs font-semibold shadow-lg">Open Live Demo</a>
                      )}
                      {selectedProject.githubUrl && (
                        <a aria-label="Link" href={selectedProject.githubUrl} target="_blank" className="px-4 py-1.5 bg-white/10 hover:bg-white/20 rounded text-xs font-semibold">View Source (GitHub)</a>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex flex-col gap-2 border-t border-white/10 pt-6">
                  <h3 className="font-semibold text-gray-400 mb-2">Technologies Used (Properties)</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.technologies.map((tech: string, i: number) => (
                      <span key={i} className="px-2 py-1 bg-white/5 border border-white/10 rounded text-xs">{tech}</span>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

        </div>
        
        {/* Status Bar */}
        <div className="h-6 bg-[#202020] border-t border-white/10 flex items-center px-4 text-xs text-gray-400">
          {!selectedProject ? `${projects.length} items` : `1 item selected`}
        </div>

      </div>
    </Window>
  );
}

// Helper to provide a fallback image
function projectImagePlaceholder(project: any) {
  if (project.thumbnailUrl) return project.thumbnailUrl;
  return `https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=2670&auto=format&fit=crop`;
}
