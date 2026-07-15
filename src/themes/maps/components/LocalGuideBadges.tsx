import React, { useState } from 'react';
import { Award, ChevronDown, ChevronUp } from 'lucide-react';

export default function LocalGuideBadges({ certifications }: { certifications: any[] }) {
  const [showAll, setShowAll] = useState(false);
  
  if (!certifications || certifications.length === 0) return null;

  return (
    <div className="w-full bg-white rounded-xl shadow-sm border border-gray-200 p-6 md:p-8">
       <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2 border-b border-gray-100 pb-4">
          <Award className="w-6 h-6 text-yellow-500" />
          Local Guide Badges (Certifications)
       </h2>
       <div className="grid grid-cols-1 gap-4">
          {(showAll ? certifications : certifications.slice(0, 7)).map((cert, i) => (
             <div key={i} className="flex items-center gap-4 bg-gray-50 p-4 rounded-lg border border-gray-200">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center shrink-0">
                   <Award className="w-6 h-6 text-blue-600" />
                </div>
                <div className="flex-1">
                   <h4 className="font-bold text-gray-900">{cert.name}</h4>
                   <div className="text-sm text-gray-500 mb-2">{cert.issuer} • {cert.date}</div>
                   <div className="flex items-center gap-3">
                      {(cert.url || cert.fileUrl) && (
                         <a aria-label="Link" href={cert.url || cert.fileUrl} target="_blank" rel="noreferrer" className="text-sm font-bold text-blue-600 hover:underline">
                            View Credential
                         </a>
                      )}
                   </div>
                </div>
             </div>
          ))}
       </div>
       
       {certifications.length > 7 && (
         <button 
           onClick={() => setShowAll(!showAll)}
           className="w-full mt-6 py-3 border border-gray-200 rounded-lg text-blue-600 font-semibold text-sm hover:bg-gray-50 transition-colors flex items-center justify-center gap-2"
         >
           {showAll ? (
             <>Show Less <ChevronUp className="w-4 h-4" /></>
           ) : (
             <>View {certifications.length - 7} More Badges <ChevronDown className="w-4 h-4" /></>
           )}
         </button>
       )}
    </div>
  );
}
