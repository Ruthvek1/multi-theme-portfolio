import React from 'react';
import { useWindowsOS, AppId } from '../Adapter';

const ResumeIcon = () => (
  <div className="w-10 h-10 relative flex items-center justify-center group-hover:scale-105 transition-transform">
    <div className="absolute inset-0 bg-gradient-to-br from-red-600 to-rose-800 rounded shadow-md transform -rotate-6 scale-95 origin-bottom-left"></div>
    <div className="absolute inset-0 bg-gradient-to-br from-white to-gray-200 rounded shadow-lg border border-gray-300 flex flex-col p-1.5 gap-[3px]">
      <div className="w-full h-2.5 bg-red-600 rounded-sm mb-0.5 shadow-sm"></div>
      <div className="w-3/4 h-[2px] bg-gray-400 rounded-full"></div>
      <div className="w-full h-[2px] bg-gray-300 rounded-full"></div>
      <div className="w-5/6 h-[2px] bg-gray-300 rounded-full"></div>
      <div className="w-full h-[2px] bg-gray-300 rounded-full"></div>
    </div>
    <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-gradient-to-br from-blue-500 to-blue-700 rounded-full border border-white/50 shadow-md flex items-center justify-center">
      <div className="w-2 h-2 rounded-full border-[1.5px] border-white border-t-transparent animate-spin"></div>
    </div>
  </div>
);

const MailIcon = () => (
  <div className="w-10 h-10 relative flex items-center justify-center group-hover:scale-105 transition-transform">
    <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-blue-600 rounded-lg shadow-lg overflow-hidden border border-blue-300/30">
      <div className="absolute -top-3 -left-3 w-[150%] h-[100%] bg-blue-300/40 rounded-full rotate-12 blur-[1px]"></div>
      <div className="absolute bottom-0 w-full h-1/2 bg-gradient-to-t from-black/20 to-transparent"></div>
    </div>
    <svg className="w-5 h-5 text-white relative z-10 drop-shadow-md" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    </svg>
  </div>
);

const AboutIcon = () => (
  <div className="w-10 h-10 relative flex items-center justify-center group-hover:scale-105 transition-transform">
    <div className="absolute inset-0 bg-gradient-to-b from-blue-300 to-blue-500 rounded shadow-lg flex flex-col overflow-hidden border border-blue-400/50">
      <div className="w-full h-3 bg-gradient-to-r from-blue-600 to-blue-800 flex items-center px-1 gap-[2px]">
        {[1,2,3,4,5].map(i => <div key={i} className="w-1 h-1.5 bg-gray-200 rounded-full shadow-inner opacity-80" />)}
      </div>
      <div className="flex-1 bg-gradient-to-br from-blue-50 to-white flex flex-col items-center justify-center p-1 border-t border-blue-900/20">
        <div className="w-3.5 h-3.5 rounded-full bg-blue-500 mb-1 shadow-sm border border-white" />
        <div className="w-6 h-1.5 bg-blue-500 rounded-[2px] shadow-sm" />
      </div>
    </div>
  </div>
);

const ProjectsIcon = () => (
  <div className="w-10 h-10 relative flex items-end justify-center group-hover:scale-105 transition-transform pb-1">
    <div className="absolute bottom-1 w-9 h-7 bg-gradient-to-b from-yellow-500 to-yellow-600 rounded-sm shadow-inner" />
    <div className="absolute bottom-6 left-1 w-4 h-2 bg-yellow-500 rounded-t-sm" />
    <div className="absolute bottom-1 w-8 h-6 bg-white rounded-sm shadow-sm rotate-6 origin-bottom-left" />
    <div className="absolute bottom-1 w-9 h-6 bg-gradient-to-br from-yellow-300 to-yellow-500 rounded-sm shadow-md border-t border-yellow-200/50" />
    <div className="absolute bottom-2 right-1.5 w-3.5 h-3.5 bg-blue-600 rounded flex items-center justify-center shadow-sm border border-white/40">
       <span className="text-[8px] text-white font-bold font-mono">{'</>'}</span>
    </div>
  </div>
);

const ExperienceIcon = () => (
  <div className="w-10 h-10 relative flex items-center justify-center group-hover:scale-105 transition-transform">
    <div className="absolute inset-0 bg-gradient-to-b from-gray-700 to-gray-900 rounded-md shadow-lg border border-gray-600 flex flex-col p-1 overflow-hidden">
      <div className="w-full h-1.5 flex justify-between items-center mb-0.5 px-[1px]">
        <div className="flex gap-[1px]">
          <div className="w-1 h-1 rounded-full bg-red-400"></div>
          <div className="w-1 h-1 rounded-full bg-yellow-400"></div>
          <div className="w-1 h-1 rounded-full bg-green-400"></div>
        </div>
      </div>
      <div className="flex-1 bg-black rounded-sm border border-gray-700 relative overflow-hidden flex items-end">
        <div className="absolute bottom-0 left-0 w-full h-[60%] bg-gradient-to-t from-green-500/30 to-transparent pointer-events-none"></div>
        <svg className="w-full h-[80%] text-green-400 drop-shadow-[0_0_2px_#4ade80]" viewBox="0 0 100 50" preserveAspectRatio="none">
          <path d="M0 40 L20 40 L30 10 L40 45 L50 20 L60 35 L80 15 L100 25" fill="none" stroke="currentColor" strokeWidth="4" />
        </svg>
      </div>
    </div>
  </div>
);

const EducationIcon = () => (
  <div className="w-10 h-10 relative flex items-center justify-center group-hover:scale-105 transition-transform">
    <div className="absolute top-2.5 w-7 h-7 bg-gradient-to-br from-purple-500 to-purple-800 rounded-sm shadow-lg transform rotate-45 scale-x-[1.4] scale-y-[0.8] border border-purple-400/50 z-10"></div>
    <div className="absolute top-[18px] w-4 h-3.5 bg-gradient-to-b from-purple-800 to-gray-900 rounded-b-md shadow-inner border-b border-gray-700"></div>
    <div className="absolute top-3 right-1.5 w-[1.5px] h-3 bg-yellow-500 rotate-12 z-20"></div>
    <div className="absolute top-5 right-0.5 w-1.5 h-2.5 bg-gradient-to-b from-yellow-400 to-yellow-600 rounded-sm z-20 shadow-md"></div>
  </div>
);

const SkillsIcon = () => (
  <div className="w-10 h-10 relative flex items-center justify-center group-hover:scale-105 transition-transform">
    <div className="absolute inset-0 bg-gradient-to-br from-gray-200 to-gray-400 rounded-full shadow-lg border border-white/80 flex items-center justify-center">
      <div className="absolute inset-1 border-[4px] border-dashed border-gray-500 rounded-full opacity-40"></div>
      <div className="w-5 h-5 bg-gradient-to-tl from-gray-500 to-gray-300 rounded-full shadow-inner border border-gray-400 flex items-center justify-center relative z-10">
        <div className="w-2 h-2 bg-gradient-to-br from-gray-700 to-black rounded-full shadow-inner border border-gray-500"></div>
      </div>
      <div className="absolute top-0 right-0 w-4 h-4 bg-gradient-to-br from-blue-400 to-blue-600 rounded-sm transform rotate-12 shadow-md flex items-center justify-center border border-white/50 z-20">
         <div className="w-1.5 h-1.5 bg-white rounded-full opacity-80"></div>
      </div>
    </div>
  </div>
);

export default function Desktop() {
  const { openApp } = useWindowsOS();

  const desktopIcons: { id: AppId; label: string; icon: React.ReactNode }[] = [
    { id: 'notepad', label: 'About Me', icon: <AboutIcon /> },
    { id: 'explorer', label: 'Projects', icon: <ProjectsIcon /> },
    { id: 'taskmanager', label: 'Experience', icon: <ExperienceIcon /> },
    { id: 'education', label: 'Education', icon: <EducationIcon /> },
    { id: 'settings', label: 'Skills', icon: <SkillsIcon /> },
    { id: 'certificates', label: 'Certificates', icon: <ProjectsIcon /> },
    { id: 'edge', label: 'Resume', icon: <ResumeIcon /> },
    { id: 'mail', label: 'Contact', icon: <MailIcon /> },
  ];

  return (
    <div className="flex-1 w-full h-full p-4 flex flex-col gap-4 flex-wrap content-start">
      {desktopIcons.map(icon => (
        <button aria-label="Interactive Button" key={icon.id}
          onClick={() => openApp(icon.id)}
          className="flex flex-col items-center w-20 gap-1 p-2 rounded hover:bg-white/10 active:bg-white/20 transition-colors cursor-default group"
        >
          <div 
            className="group-hover:scale-105 transition-transform"
            style={{ filter: 'drop-shadow(0px 2px 5px rgba(0,0,0,0.8)) drop-shadow(0px 0px 2px rgba(0,0,0,1))' }}
          >
            {icon.icon}
          </div>
          <span 
            className="text-xs text-white text-center font-semibold leading-tight mt-1"
            style={{ textShadow: '0 1px 3px black, 0 0 5px black, 0 0 8px black' }}
          >
            {icon.label}
          </span>
        </button>
      ))}
      
      {/* We will mount the windows here eventually, but for now we'll put them in Adapter or WindowRenderer */}
    </div>
  );
}
