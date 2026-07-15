import React, { useState } from 'react';
import { Plane, Play } from 'lucide-react';

export default function Runway() {
   const [takingOff, setTakingOff] = useState(false);

   const handleTakeOff = () => {
      if (takingOff) return;
      setTakingOff(true);
      setTimeout(() => {
         setTakingOff(false);
      }, 3000);
   };

   return (
      <div className="bg-[#1A2530] rounded-2xl p-8 relative overflow-hidden flex flex-col items-center justify-center border-4 border-gray-800 shadow-xl mt-8">
         <div className="text-white text-center mb-12 relative z-10">
            <h2 className="text-3xl font-black uppercase tracking-widest mb-2 text-yellow-400">Runway Clear</h2>
            <p className="text-gray-400 font-medium">Initiate takeoff sequence for next destination.</p>
         </div>

         {/* Runway Graphics */}
         <div className="w-full h-32 bg-gray-900 relative rounded-lg border border-gray-700 overflow-hidden">
            {/* Dashed line */}
            <div className="absolute top-1/2 left-0 w-full h-1 -mt-0.5 bg-transparent flex justify-around opacity-50">
               {[...Array(20)].map((_, i) => (
                  <div key={i} className="w-12 h-1 bg-yellow-400"></div>
               ))}
            </div>

            {/* Plane */}
            <div className={`absolute top-1/2 left-8 -mt-6 transition-all duration-[3000ms] ease-in ${takingOff
               ? 'translate-x-[100vw] -translate-y-24 scale-150 rotate-[35deg] opacity-0'
               : 'translate-x-0 translate-y-0 opacity-100 rotate-45'
               }`}>
               <Plane className="w-12 h-12 text-white drop-shadow-[0_10px_10px_rgba(0,0,0,0.5)] fill-white" />
            </div>
         </div>

         <button aria-label="Interactive Button" onClick={handleTakeOff}
            disabled={takingOff}
            className={`mt-4 px-8 py-4 rounded-full font-bold uppercase tracking-widest transition-all shadow-lg flex items-center gap-3 relative z-10 ${takingOff ? 'bg-gray-600 text-gray-400 cursor-not-allowed' : 'bg-blue-600 text-white hover:bg-blue-500 hover:scale-105 hover:shadow-blue-500/50'
               }`}
         >
            <Play className={`w-5 h-5 ${takingOff ? '' : 'text-white'}`} />
            {takingOff ? 'DEPARTING...' : 'CLEARED FOR TAKE OFF'}
         </button>
      </div>
   );
}
