import React from 'react';
import Image from 'next/image';
import { ExternalLink, Code, Navigation } from 'lucide-react';

export default function DestinationsGrid({ projects }: { projects: any[] }) {
  return (
    <div className="space-y-6">
       <div className="flex items-center justify-between px-2">
          <h2 className="text-xl font-bold text-gray-800">Featured Destinations (Projects)</h2>
       </div>
       
       <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {projects.map((project, i) => (
             <div key={i} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow group flex flex-col">
                {/* Header Image Fake Map Box */}
                <div className="h-40 bg-gray-100 relative overflow-hidden flex items-center justify-center">
                   {project.thumbnailUrl ? (
                     <Image src={project.thumbnailUrl} alt={project.title} className="w-full h-full object-cover" width={800} height={600} />
                   ) : (
                     <div className="w-full h-full bg-gradient-to-br from-blue-100 to-indigo-100 flex items-center justify-center">
                        <Navigation className="w-12 h-12 text-blue-300 rotate-45 group-hover:scale-110 transition-transform" />
                     </div>
                   )}
                   <div className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm px-2 py-1 rounded font-bold text-sm text-gray-800 shadow-sm flex items-center gap-1">
                      4.9 <span className="text-yellow-400">★</span>
                   </div>
                </div>

                <div className="p-5 flex-1 flex flex-col">
                   <h3 className="font-bold text-gray-900 text-lg mb-1 group-hover:text-blue-600 transition-colors">{project.title}</h3>
                   <div className="text-gray-500 text-sm mb-3">Attraction • Software</div>
                   
                   <p className="text-gray-600 text-sm mb-4 flex-1 line-clamp-3">
                      {project.description}
                   </p>
                   
                   <div className="flex flex-wrap gap-2 mb-4">
                      {project.technologies?.slice(0, 3).map((tech: string) => (
                         <span key={tech} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                            {tech}
                         </span>
                      ))}
                   </div>
                   
                   <div className="flex items-center gap-2 mt-auto border-t border-gray-100 pt-4">
                      {project.liveUrl && (
                        <a aria-label="Link" href={project.liveUrl}
                           target="_blank"
                           rel="noreferrer"
                           className="flex-1 bg-blue-50 text-blue-600 text-sm font-bold py-2 rounded-full flex items-center justify-center gap-2 hover:bg-blue-100 transition-colors"
                        >
                           <ExternalLink className="w-4 h-4" /> Visit
                        </a>
                      )}
                      {project.githubUrl && (
                        <a aria-label="Link" href={project.githubUrl}
                           target="_blank"
                           rel="noreferrer"
                           className="flex-1 border border-gray-200 text-gray-700 text-sm font-bold py-2 rounded-full flex items-center justify-center gap-2 hover:bg-gray-50 transition-colors"
                        >
                           <Code className="w-4 h-4" /> Code
                        </a>
                      )}
                   </div>
                </div>
             </div>
          ))}
       </div>
    </div>
  );
}
