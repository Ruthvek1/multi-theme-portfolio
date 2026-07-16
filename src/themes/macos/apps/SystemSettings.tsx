import React, { useState } from 'react';
import { usePortfolio } from '@/core/PortfolioContext';
import { Search, Monitor, Wifi, Bluetooth, Settings, Shield, User, HardDrive } from 'lucide-react';

export default function SystemSettings() {
  const { skills } = usePortfolio();
  
  // Group skills by category
  const categories = Array.from(new Set(skills.map(s => s.category)));
  const [activeCategory, setActiveCategory] = useState(categories[0] || 'All');

  const getCategoryIcon = (cat: string) => {
    if (cat.toLowerCase().includes('frontend') || cat.toLowerCase().includes('ui')) return <Monitor className="w-4 h-4 text-white" />;
    if (cat.toLowerCase().includes('backend') || cat.toLowerCase().includes('database')) return <HardDrive className="w-4 h-4 text-white" />;
    if (cat.toLowerCase().includes('tool') || cat.toLowerCase().includes('devops')) return <Settings className="w-4 h-4 text-white" />;
    return <Shield className="w-4 h-4 text-white" />;
  };

  const getCategoryColor = (cat: string) => {
    if (cat.toLowerCase().includes('frontend')) return 'bg-blue-500';
    if (cat.toLowerCase().includes('backend')) return 'bg-green-500';
    if (cat.toLowerCase().includes('tool')) return 'bg-gray-500';
    return 'bg-purple-500';
  };

  return (
    <div className="w-full h-full flex bg-[#ECECEC]">
      {/* Sidebar */}
      <div className="w-64 bg-gray-100/50 backdrop-blur-xl border-r border-gray-300 flex flex-col h-full">
        {/* Search */}
        <div className="h-14 border-b border-gray-200 flex items-center px-4 shrink-0">
          <div className="relative w-full">
            <Search className="w-3 h-3 text-gray-500 absolute left-2 top-1/2 -translate-y-1/2" />
            <input type="text" placeholder="Search" className="w-full pl-7 pr-3 py-1 bg-white border border-gray-300 rounded-md text-sm outline-none focus:ring-2 focus:ring-blue-500/50 shadow-sm" />
          </div>
        </div>
        
        {/* Categories */}
        <div className="flex-1 overflow-auto py-2 px-3 flex flex-col gap-1">
          {categories.map((cat, i) => (
            <button aria-label="Interactive Button" key={i}
              onClick={() => setActiveCategory(cat)}
              className={`flex items-center text-left gap-2.5 px-2 py-1.5 rounded-lg text-sm transition-colors ${activeCategory === cat ? 'bg-blue-500 text-white' : 'hover:bg-gray-200 text-gray-800'}`}
            >
              <div className={`w-6 h-6 rounded-md flex items-center justify-center shadow-sm ${getCategoryColor(cat)}`}>
                {getCategoryIcon(cat)}
              </div>
              <span className="font-medium">{cat}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 bg-[#ECECEC] p-8 overflow-y-auto">
        <h1 className="text-2xl font-semibold text-gray-800 mb-8">{activeCategory}</h1>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          {skills.filter(s => s.category === activeCategory).flatMap(s => s.items).map((skillName, index, arr) => (
            <div key={index} className={`flex items-center justify-between p-4 ${index !== arr.length - 1 ? 'border-b border-gray-100' : ''}`}>
              <div className="flex flex-col">
                <span className="font-medium text-gray-800">{skillName}</span>
                <span className="text-xs text-gray-500 mt-1">Status: Active</span>
              </div>
              <div className="flex items-center gap-4">
                {/* macOS Toggle Switch (visual only) */}
                <div className="w-10 h-6 bg-green-500 rounded-full shadow-inner relative flex items-center px-0.5">
                   <div className="w-5 h-5 bg-white rounded-full shadow-md transform translate-x-4"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
