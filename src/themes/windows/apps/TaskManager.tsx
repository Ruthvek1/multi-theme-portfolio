import React from 'react';
import Image from 'next/image';
import Window from '../components/Window';
import { usePortfolio } from '@/core/PortfolioContext';
import { Activity, Cpu, Play, Search, StopCircle, RefreshCw } from 'lucide-react';

export default function TaskManagerApp() {
  const { experience } = usePortfolio();

  return (
    <Window 
      id="taskmanager" 
      title="Task Manager" 
      icon={<Activity className="w-full h-full text-green-400" />}
      defaultWidth={850}
      defaultHeight={600}
    >
      <div className="w-full h-full flex flex-col bg-[#1e1e1e] text-gray-200 text-sm">
        
        {/* Ribbon / Menu */}
        <div className="flex border-b border-white/10 p-2 gap-2 text-xs">
          <div className="flex items-center gap-2 hover:bg-white/10 px-3 py-1.5 rounded cursor-default">File</div>
          <div className="flex items-center gap-2 hover:bg-white/10 px-3 py-1.5 rounded cursor-default">Options</div>
          <div className="flex items-center gap-2 hover:bg-white/10 px-3 py-1.5 rounded cursor-default">View</div>
        </div>

        {/* Tab Row */}
        <div className="flex border-b border-white/10 px-2 bg-[#252525]">
          <div className="px-4 py-2 border-b-2 border-blue-500 font-semibold text-white">Processes</div>
          <div className="px-4 py-2 hover:bg-white/5 cursor-pointer">Performance</div>
          <div className="px-4 py-2 hover:bg-white/5 cursor-pointer">App history</div>
          <div className="px-4 py-2 hover:bg-white/5 cursor-pointer">Startup</div>
          <div className="px-4 py-2 hover:bg-white/5 cursor-pointer">Users</div>
          <div className="px-4 py-2 hover:bg-white/5 cursor-pointer">Details</div>
          <div className="px-4 py-2 hover:bg-white/5 cursor-pointer">Services</div>
        </div>

        {/* Search & Actions */}
        <div className="flex justify-between items-center p-3 border-b border-white/10">
          <div className="relative w-64">
            <input type="text" placeholder="Type to search" className="w-full bg-[#151515] border border-white/20 rounded pl-8 pr-3 py-1 text-xs outline-none focus:border-blue-500" />
            <Search className="w-3.5 h-3.5 text-gray-400 absolute left-2.5 top-1.5" />
          </div>
          <div className="flex gap-2">
            <button aria-label="Interactive Button" className="flex items-center gap-1.5 px-3 py-1 hover:bg-white/10 rounded text-xs"><Play className="w-3.5 h-3.5 text-green-500" /> Run new task</button>
            <button aria-label="Interactive Button" className="flex items-center gap-1.5 px-3 py-1 hover:bg-white/10 rounded text-xs"><StopCircle className="w-3.5 h-3.5 text-red-500" /> End task</button>
            <button aria-label="Interactive Button" className="flex items-center gap-1.5 px-3 py-1 hover:bg-white/10 rounded text-xs"><RefreshCw className="w-3.5 h-3.5 text-blue-500" /> Restart</button>
          </div>
        </div>

        {/* Main Grid View */}
        <div className="flex-1 overflow-auto bg-[#151515]">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="sticky top-0 bg-[#202020] border-b border-white/10 shadow-md">
                <th className="font-semibold p-2 w-1/4 border-r border-white/5 text-white">Name (Company)</th>
                <th className="font-semibold p-2 w-1/4 border-r border-white/5 text-white">Role</th>
                <th className="font-semibold p-2 w-1/6 border-r border-white/5 text-white">Status</th>
                <th className="font-semibold p-2 w-1/6 border-r border-white/5 text-white">Timeline</th>
                <th className="font-semibold p-2 w-1/12 border-r border-white/5 text-right"><Cpu className="w-3 h-3 inline mr-1" /> CPU</th>
                <th className="font-semibold p-2 w-auto text-right">Memory</th>
              </tr>
            </thead>
            <tbody>
              {/* Apps Section */}
              <tr className="bg-white/5">
                <td colSpan={6} className="p-2 font-semibold text-white">Apps ({experience.length})</td>
              </tr>
              {experience.map((exp: any, i: number) => {
                // Calculate pseudo-metrics based on index to look realistic
                const cpu = (((i + 1) * 7.3) % 5 + 0.1).toFixed(1);
                const memory = (((i + 1) * 113) % 500 + 50).toFixed(1);
                const isCurrent = exp.endDate.toLowerCase().includes('present');
                
                return (
                  <React.Fragment key={exp.id}>
                    <tr className="hover:bg-blue-600/30 transition-colors border-b border-white/5 cursor-default group">
                      <td className="p-2 border-r border-white/5 font-bold">
                        <div className="flex items-center gap-3 text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.3)]">
                          <div className="w-6 h-6 rounded bg-white/10 flex items-center justify-center p-1 shrink-0 shadow-[0_0_10px_rgba(255,255,255,0.1)]">
                            {exp.logoUrl ? (
                              <Image src={exp.logoUrl} alt={exp.company} className="w-full h-full object-contain" width={800} height={600} />
                            ) : (
                              <Activity className="w-3 h-3 text-white" />
                            )}
                          </div>
                          <span className="truncate">{exp.company}.exe</span>
                        </div>
                      </td>
                      <td className="p-2 border-r border-white/5 truncate text-white font-bold drop-shadow-[0_0_8px_rgba(255,255,255,0.3)]">{exp.role}</td>
                      <td className={`p-2 border-r border-white/5 font-bold drop-shadow-[0_0_8px_rgba(255,255,255,0.3)] ${isCurrent ? 'text-green-400' : 'text-gray-400'}`}>{isCurrent ? 'Running' : 'Ended'}</td>
                      <td className="p-2 border-r border-white/5 truncate text-white font-bold drop-shadow-[0_0_8px_rgba(255,255,255,0.3)]">{exp.startDate} - {exp.endDate}</td>
                      <td className={`p-2 border-r border-white/5 text-right ${isCurrent ? 'bg-yellow-500/20' : ''}`}>{cpu}%</td>
                      <td className="p-2 text-right">{memory} MB</td>
                    </tr>
                    {/* Expandable description row */}
                    <tr className="hidden group-hover:table-row bg-blue-900/20">
                      <td colSpan={6} className="p-3 pl-11 text-gray-300 border-b border-white/5 leading-relaxed">
                        {exp.description}
                      </td>
                    </tr>
                  </React.Fragment>
                );
              })}
              
              {/* Background processes placeholder */}
              <tr className="bg-white/5">
                <td colSpan={6} className="p-2 font-semibold text-white mt-4 block">Background processes (3)</td>
              </tr>
              <tr className="hover:bg-blue-600/30 border-b border-white/5">
                <td className="p-2 border-r border-white/5 pl-4 flex items-center gap-2 text-white font-bold"><Activity className="w-4 h-4 text-gray-400"/> System Idle Process</td>
                <td className="p-2 border-r border-white/5 text-white font-bold">Kernel</td>
                <td className="p-2 border-r border-white/5 text-green-400 font-bold">Running</td>
                <td className="p-2 border-r border-white/5 text-white font-bold">-</td>
                <td className="p-2 border-r border-white/5 text-right">98.2%</td>
                <td className="p-2 text-right">8.0 KB</td>
              </tr>
              <tr className="hover:bg-blue-600/30 border-b border-white/5">
                <td className="p-2 border-r border-white/5 pl-4 flex items-center gap-2 text-white font-bold"><Cpu className="w-4 h-4 text-gray-400"/> Registry</td>
                <td className="p-2 border-r border-white/5 text-white font-bold">System</td>
                <td className="p-2 border-r border-white/5 text-green-400 font-bold">Running</td>
                <td className="p-2 border-r border-white/5 text-white font-bold">-</td>
                <td className="p-2 border-r border-white/5 text-right">0.0%</td>
                <td className="p-2 text-right">62.1 MB</td>
              </tr>
            </tbody>
          </table>
        </div>

      </div>
    </Window>
  );
}
