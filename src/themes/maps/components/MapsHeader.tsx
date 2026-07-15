import React from 'react';
import { Menu, Search, MapPin, Navigation } from 'lucide-react';

export default function MapsHeader({ name }: { name: string }) {
  return (
    <div className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm flex items-center justify-between px-4 py-2">
       {/* Left: Menu & Search */}
       <div className="flex items-center gap-4 flex-1">
          <button aria-label="Interactive Button" className="p-2 hover:bg-gray-100 rounded-full transition-colors">
             <Menu className="w-6 h-6 text-gray-600" />
          </button>
          
          <div className="flex-1 max-w-2xl bg-gray-100 rounded-full flex items-center px-4 py-2 border border-transparent hover:bg-white hover:border-gray-300 hover:shadow-md transition-all focus-within:bg-white focus-within:border-blue-500 focus-within:shadow-md">
             <Search className="w-5 h-5 text-gray-500 mr-3" />
             <input 
               type="text" 
               placeholder={`Search for places in ${name}'s Portfolio`} 
               className="bg-transparent border-none outline-none w-full text-gray-800 placeholder-gray-500"
               readOnly
             />
             <div className="border-l border-gray-300 h-6 mx-3"></div>
             <button aria-label="Interactive Button" className="text-blue-600 hover:text-blue-800 transition-colors">
                <Navigation className="w-5 h-5" />
             </button>
          </div>
       </div>

       {/* Right: User actions */}
       <div className="flex items-center gap-3 ml-4">
          <button aria-label="Interactive Button" className="p-2 hover:bg-gray-100 rounded-full transition-colors hidden md:block">
             <MapPin className="w-6 h-6 text-gray-600" />
          </button>
          <div className="w-10 h-10 bg-blue-600 text-white font-bold rounded-full flex items-center justify-center">
             {name.charAt(0)}
          </div>
       </div>
    </div>
  );
}
