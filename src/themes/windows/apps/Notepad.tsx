import React from 'react';
import Window from '../components/Window';
import { usePortfolio } from '@/core/PortfolioContext';
import { User } from 'lucide-react';

export default function NotepadApp() {
  const { personal } = usePortfolio();

  if (!personal) return null;

  return (
    <Window 
      id="notepad" 
      title="Notepad - About Me.txt" 
      icon={<User className="w-full h-full text-blue-400" />}
      defaultWidth={600}
      defaultHeight={500}
    >
      <div className="w-full h-full bg-white text-black flex flex-col font-mono text-sm">
        {/* Classic Notepad Menu Bar */}
        <div className="flex gap-4 px-2 py-1 bg-[#f0f0f0] border-b border-gray-300 text-xs">
          <span className="hover:bg-blue-100 px-1 cursor-default">File</span>
          <span className="hover:bg-blue-100 px-1 cursor-default">Edit</span>
          <span className="hover:bg-blue-100 px-1 cursor-default">Format</span>
          <span className="hover:bg-blue-100 px-1 cursor-default">View</span>
          <span className="hover:bg-blue-100 px-1 cursor-default">Help</span>
        </div>
        
        {/* Text Area */}
        <div className="flex-1 p-2 outline-none resize-none overflow-y-auto whitespace-pre-wrap">
          {`Name: ${personal.name}
Title: ${personal.title}
Location: San Francisco, CA

=========================================
WHO I AM & BACKGROUND
=========================================

${personal.bio}

`}
        </div>
      </div>
    </Window>
  );
}
