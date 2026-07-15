import React, { useState } from 'react';
import Window from '../components/Window';
import { usePortfolio } from '@/core/PortfolioContext';
import { Wrench, Monitor, Palette, Database, Server, Code, HardDrive, Smartphone, ChevronRight } from 'lucide-react';

export default function SettingsApp() {
  const { skills } = usePortfolio();
  const [activeCategoryIndex, setActiveCategoryIndex] = useState(0);

  // Map skill categories to settings-like icons
  const getIconForCategory = (category: string) => {
    const c = category.toLowerCase();
    if (c.includes('front')) return <Monitor className="w-5 h-5 text-blue-400" />;
    if (c.includes('back')) return <Server className="w-5 h-5 text-green-400" />;
    if (c.includes('design') || c.includes('ui')) return <Palette className="w-5 h-5 text-pink-400" />;
    if (c.includes('data')) return <Database className="w-5 h-5 text-yellow-400" />;
    if (c.includes('mobile')) return <Smartphone className="w-5 h-5 text-purple-400" />;
    if (c.includes('devops') || c.includes('cloud')) return <HardDrive className="w-5 h-5 text-gray-400" />;
    return <Code className="w-5 h-5 text-blue-300" />;
  };

  return (
    <Window 
      id="settings" 
      title="Settings" 
      icon={<Wrench className="w-full h-full text-blue-500" />}
      defaultWidth={850}
      defaultHeight={600}
    >
      <div className="w-full h-full flex bg-[#202020] text-gray-200">
        
        {/* Sidebar */}
        <div className="w-64 border-r border-white/10 flex flex-col p-4">
          <div className="flex items-center gap-3 mb-6 px-2">
            <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-lg font-bold shadow-lg">S</div>
            <div>
              <div className="font-semibold">Local Account</div>
              <div className="text-xs text-gray-400">Administrator</div>
            </div>
          </div>

          <div className="text-xs font-semibold text-gray-400 mb-2 px-2">System Categories</div>
          
          <div className="flex flex-col gap-1">
            {skills.map((group: any, i: number) => (
              <button aria-label="Interactive Button" key={i}
                onClick={() => setActiveCategoryIndex(i)}
                className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors text-left text-sm ${activeCategoryIndex === i ? 'bg-blue-500 hover:bg-blue-600 shadow-md' : 'hover:bg-white/10'}`}
              >
                {getIconForCategory(group.category)}
                <span className="flex-1">{group.category}</span>
                {activeCategoryIndex === i && <ChevronRight className="w-4 h-4" />}
              </button>
            ))}
          </div>
        </div>

        {/* Main Settings Area */}
        <div className="flex-1 overflow-y-auto p-10 bg-[#181818]">
          {skills[activeCategoryIndex] && (
            <div className="max-w-2xl">
              <h1 className="text-3xl font-semibold mb-8 flex items-center gap-4">
                {getIconForCategory(skills[activeCategoryIndex].category)}
                {skills[activeCategoryIndex].category}
              </h1>

              <div className="bg-[#202020] border border-white/10 rounded-xl overflow-hidden flex flex-col shadow-sm">
                {skills[activeCategoryIndex].items.map((skill: string, i: number) => (
                  <div key={i} className={`flex items-center justify-between p-4 hover:bg-white/5 transition-colors ${i !== 0 ? 'border-t border-white/5' : ''}`}>
                    <div className="flex items-center gap-4">
                      <div className="w-8 h-8 rounded bg-white/5 flex items-center justify-center">
                        <Code className="w-4 h-4 text-blue-400" />
                      </div>
                      <div className="font-medium text-sm">{skill}</div>
                    </div>
                    <div className="text-xs px-3 py-1 bg-white/10 rounded-full text-gray-300">Installed</div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

      </div>
    </Window>
  );
}
