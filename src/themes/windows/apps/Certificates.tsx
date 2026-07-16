import React, { useState } from 'react';
import Window from '../components/Window';
import { usePortfolio } from '@/core/PortfolioContext';
import { Award, FolderGit2, HardDrive, Monitor, FolderOpen, ArrowLeft, ArrowRight, ArrowUp, Search, Download, ExternalLink } from 'lucide-react';

export default function CertificatesApp() {
  const { certifications } = usePortfolio();
  const [selectedCert, setSelectedCert] = useState<any | null>(null);

  return (
    <Window 
      id="certificates" 
      title="File Explorer - Certificates" 
      icon={<Award className="w-full h-full text-blue-400" />}
      defaultWidth={900}
      defaultHeight={600}
    >
      <div className="w-full h-full flex flex-col bg-[#191919] text-gray-200 text-sm">
        
        {/* Explorer Toolbar / Ribbon */}
        <div className="flex flex-col border-b border-white/10 bg-[#202020]">
          {/* Tabs */}
          <div className="flex gap-2 px-2 pt-2">
            <div className="px-4 py-1.5 bg-[#191919] rounded-t flex items-center gap-2 text-xs">
              <Award className="w-3.5 h-3.5 text-blue-400" /> Certificates
            </div>
            <div className="px-4 py-1.5 hover:bg-white/5 rounded-t flex items-center gap-2 text-xs">
              +
            </div>
          </div>
          
          {/* Actions & Path Bar */}
          <div className="flex items-center gap-4 px-2 py-2 border-t border-white/5">
            <div className="flex gap-2 text-gray-400">
              <ArrowLeft className="w-4 h-4 hover:text-white cursor-pointer" onClick={() => setSelectedCert(null)} />
              <ArrowRight className="w-4 h-4 opacity-50" />
              <ArrowUp className="w-4 h-4 hover:text-white cursor-pointer" onClick={() => setSelectedCert(null)} />
            </div>
            
            <div className="flex-1 bg-[#191919] border border-white/10 rounded flex items-center px-2 py-1 gap-2">
              <FolderOpen className="w-4 h-4 text-blue-400" />
              <span className="text-xs">{selectedCert ? `This PC > Certificates > ${selectedCert.name}` : 'This PC > Certificates'}</span>
            </div>

            <div className="w-64 bg-[#191919] border border-white/10 rounded flex items-center px-2 py-1 gap-2">
              <input type="text" placeholder="Search Certificates" className="bg-transparent outline-none text-xs w-full" />
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
              <div className="flex items-center gap-2 p-1 hover:bg-white/5 rounded cursor-pointer text-gray-400">
                <FolderGit2 className="w-4 h-4 text-yellow-400" /> Projects
              </div>
              <div className="flex items-center gap-2 p-1 bg-white/10 rounded cursor-pointer text-blue-400">
                <Award className="w-4 h-4" /> Certificates
              </div>
              <div className="flex items-center gap-2 p-1 hover:bg-white/5 rounded cursor-pointer text-gray-400">
                <HardDrive className="w-4 h-4" /> Local Disk (C:)
              </div>
            </div>
          </div>

          {/* Main Files View */}
          <div className="flex-1 p-4 overflow-y-auto bg-[#191919]">
            {!selectedCert ? (
              <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {certifications?.map((cert: any) => (
                  <div 
                    key={cert.id}
                    onClick={() => setSelectedCert(cert)}
                    className="flex flex-col items-center gap-2 p-3 hover:bg-white/10 rounded-lg cursor-pointer group"
                  >
                    <div className="w-16 h-16 bg-blue-500/20 rounded-lg flex items-center justify-center border border-blue-500/40 group-hover:bg-blue-500/30 transition-colors">
                      <Award className="w-8 h-8 text-blue-400 group-hover:scale-110 transition-transform" />
                    </div>
                    <span className="text-xs text-center line-clamp-2">{cert.name}</span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col gap-6 max-w-3xl">
                <div className="flex gap-6">
                  <div className="w-48 h-48 rounded-lg overflow-hidden shrink-0 bg-blue-500/10 border border-blue-500/30 flex items-center justify-center">
                     <Award className="w-24 h-24 text-blue-400" />
                  </div>
                  <div className="flex flex-col gap-3">
                    <h1 className="text-3xl font-bold">{selectedCert.name}</h1>
                    <h2 className="text-lg text-blue-400">{selectedCert.issuer}</h2>
                    <p className="text-sm text-gray-400">Date Issued: {selectedCert.date}</p>
                    
                    <div className="flex gap-3 mt-4">
                      {selectedCert.url && (
                        <a aria-label="Link" href={selectedCert.url} target="_blank" rel="noreferrer" className="px-4 py-1.5 bg-blue-600 hover:bg-blue-500 rounded text-xs font-semibold shadow-lg transition-colors">
                          View Online
                        </a>
                      )}
                      {selectedCert.fileUrl && (
                        <a aria-label="Link" href={selectedCert.url || selectedCert.fileUrl} target="_blank" rel="noreferrer" className="flex items-center gap-2 px-4 py-1.5 bg-white/10 hover:bg-white/20 rounded text-xs font-semibold shadow-lg transition-colors border border-white/20">
                          <ExternalLink className="w-3.5 h-3.5" /> View Credential
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
        
        {/* Status Bar */}
        <div className="flex items-center justify-between px-2 py-1 bg-[#202020] text-xs border-t border-white/10 text-gray-400">
          <div>{selectedCert ? '1 item selected' : `${certifications?.length || 0} items`}</div>
          <div className="flex gap-4">
            <span className="hover:text-white cursor-pointer">View</span>
            <span className="hover:text-white cursor-pointer">Sort</span>
          </div>
        </div>
      </div>
    </Window>
  );
}
