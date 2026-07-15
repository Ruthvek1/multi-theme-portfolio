import React from 'react';
import Window from '../components/Window';
import { usePortfolio } from '@/core/PortfolioContext';
import { FileText, ArrowLeft, ArrowRight, RotateCw, Plus, Home } from 'lucide-react';

export default function EdgeBrowserApp() {
  const { personal, certifications, education } = usePortfolio();

  return (
    <Window
      id="edge"
      title="Web Browser - Resume & Certifications"
      icon={<FileText className="w-full h-full text-blue-500" />}
      defaultWidth={1000}
      defaultHeight={700}
    >
      <div className="w-full h-full flex flex-col bg-white text-black text-sm">

        {/* Browser Tabs */}
        <div className="h-10 bg-[#e5e5e5] flex items-end px-2 gap-1 select-none">
          <div className="bg-white px-4 py-2 rounded-t-lg shadow-[0_-2px_5px_rgba(0,0,0,0.05)] flex items-center gap-2 max-w-[200px] w-full text-xs">
            <FileText className="w-3.5 h-3.5 text-blue-500" />
            <span className="truncate">Resume.pdf</span>
          </div>
          <div className="px-3 py-2 text-gray-500 hover:bg-white/50 rounded-t-lg transition-colors cursor-pointer">
            <Plus className="w-4 h-4" />
          </div>
        </div>

        {/* URL Bar */}
        <div className="h-12 bg-white border-b border-gray-300 flex items-center px-4 gap-4">
          <div className="flex items-center gap-2 text-gray-600">
            <ArrowLeft className="w-5 h-5 hover:text-black cursor-pointer transition-colors" />
            <ArrowRight className="w-5 h-5 opacity-30" />
            <RotateCw className="w-4 h-4 hover:text-black cursor-pointer transition-colors" />
            <Home className="w-5 h-5 hover:text-black cursor-pointer transition-colors ml-2" />
          </div>

          <div className="flex-1 bg-gray-100 rounded-full h-8 flex items-center px-4 border border-transparent focus-within:border-blue-400 focus-within:bg-white transition-all shadow-inner">
            <span className="text-gray-500 text-xs truncate">https://portfolio.local/docs/resume.pdf</span>
          </div>
        </div>

        {/* Page Content */}
        <div className="flex-1 bg-[#f0f0f0] overflow-y-auto flex justify-center p-8">
          <div className="w-full max-w-4xl bg-white shadow-2xl flex flex-col min-h-[1900px]">
            {/* Embedded Resume */}
            <div className="p-12 flex flex-col">
              <div className="flex justify-between items-start border-b-2 border-gray-900 pb-6 mb-8">
                <div>
                  <h1 className="text-4xl font-serif font-bold text-gray-900">{personal?.name}</h1>
                  <h2 className="text-xl text-gray-600 mt-2">{personal?.title}</h2>
                </div>
                <div className="text-right text-gray-500 text-sm flex flex-col gap-1">
                  <span>{personal?.email}</span>
                  <a aria-label="Link" href={personal?.resumeUrl} target="_blank" className="text-blue-600 hover:underline font-semibold mt-2">Open Original PDF ↗</a>
                </div>
              </div>

              <div className="mb-10">
                <h3 className="text-lg font-bold text-gray-900 border-b border-gray-300 mb-4 pb-1 uppercase tracking-wider">Professional Summary</h3>
                <p className="text-gray-700 leading-relaxed text-sm">{personal?.bio}</p>
              </div>

              {certifications && certifications.length > 0 && (
                <div className="mb-10">
                  <h3 className="text-lg font-bold text-gray-900 border-b border-gray-300 mb-4 pb-1 uppercase tracking-wider">Certifications & Credentials</h3>
                  <div className="grid grid-cols-2 gap-4">
                    {certifications.map((cert: any) => (
                      <div key={cert.id} className="border border-gray-200 p-4 rounded-sm flex flex-col gap-1">
                        <span className="text-xs font-bold text-blue-600">{cert.issuer}</span>
                        <span className="font-semibold text-gray-900 leading-tight">{cert.name}</span>
                        <span className="text-xs text-gray-500 mt-1">{cert.date}</span>
                        {(cert.url || cert.fileUrl) && (
                          <a aria-label="Link" href={cert.url || cert.fileUrl} target="_blank" className="text-xs text-blue-500 hover:underline mt-2">Verify Credential →</a>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {education && education.length > 0 && (
                <div className="mb-10">
                  <h3 className="text-lg font-bold text-gray-900 border-b border-gray-300 mb-4 pb-1 uppercase tracking-wider">Education</h3>
                  <div className="flex flex-col gap-6">
                    {education.map((edu: any) => (
                      <div key={edu.id} className="flex flex-col">
                        <div className="flex justify-between items-start">
                          <div>
                            <span className="font-bold text-gray-900 text-base">{edu.degree}</span>
                            <div className="text-sm text-gray-600 font-semibold">{edu.institution}</div>
                          </div>
                          <span className="text-sm font-bold text-gray-500">{edu.startDate} - {edu.endDate}</span>
                        </div>
                        <p className="text-sm text-gray-700 mt-2">{edu.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

      </div>
    </Window>
  );
}
