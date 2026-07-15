import React from 'react';
import { usePortfolio } from '@/core/PortfolioContext';
import { Edit, Share, Trash2 } from 'lucide-react';

export default function Notes() {
  const { personal } = usePortfolio();

  const bioLines = personal?.bio ? personal.bio.split('\n\n') : [];

  return (
    <div className="w-full h-full flex bg-[#F9F9F8]">
      {/* Sidebar */}
      <div className="w-64 bg-[#F2F2F1] border-r border-[#DCDCDA] flex flex-col h-full">
        {/* Header */}
        <div className="h-12 border-b border-[#DCDCDA] flex items-center justify-end px-4 gap-4 shrink-0">
          <Trash2 className="w-4 h-4 text-gray-500" />
          <Share className="w-4 h-4 text-gray-500" />
          <Edit className="w-4 h-4 text-gray-500" />
        </div>
        
        {/* List */}
        <div className="flex-1 overflow-auto p-2">
          <div className="bg-[#E5E5E3] rounded-lg p-3 cursor-pointer">
            <h4 className="font-bold text-sm truncate">About {personal?.name}</h4>
            <div className="flex gap-2 text-xs text-gray-500 mt-1">
              <span>Today</span>
              <span className="truncate">{bioLines[0] || 'My bio...'}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col h-full">
        {/* Header */}
        <div className="h-12 flex items-center justify-between px-6 shrink-0 bg-[#F9F9F8]">
           <span className="text-gray-400 text-xs">October 24, 2025 at 9:41 AM</span>
        </div>

        {/* Text Area */}
        <div className="flex-1 overflow-auto px-10 pb-10">
            <h1 className="text-3xl mt-4 font-serif text-gray-800">About {personal?.name}</h1>
          
          <div className="space-y-6 text-gray-700 font-serif leading-relaxed text-[15px]">
            {bioLines.map((line: string, i: number) => (
              <p key={i}>{line}</p>
            ))}
          </div>

          <div className="mt-12 pt-6 border-t border-[#E5E5E3]">
            <h3 className="font-bold text-sm mb-3 text-gray-500 uppercase tracking-wider">Contact Details</h3>
            <ul className="space-y-2 text-sm text-gray-600 font-serif">
              <li>Email: {personal?.email}</li>
              <li>Location: {personal?.location}</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
