import React, { useState } from 'react';
import { User, MapPin } from 'lucide-react';

export default function StreetViewDrop() {
  const [dropped, setDropped] = useState(false);
  const [dragging, setDragging] = useState(false);
  const [phase, setPhase] = useState(0);

  const handleDrop = () => {
    if (dragging || dropped) return;
    setDragging(true);
    
    // Sequence of events
    setTimeout(() => {
      setDropped(true);
      setPhase(1); // Initialize overlay with pin
      
      setTimeout(() => setPhase(2), 100); // Start scaling pin
      setTimeout(() => setPhase(3), 1500); // Show "KEEP SMILING"
      
      // Auto-reset after 6 seconds
      setTimeout(() => {
        setDropped(false);
        setDragging(false);
        setPhase(0);
      }, 6000);
    }, 600);
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden relative">
       {/* Background Map Graphic */}
       <div className="h-64 bg-[#eef1f3] relative overflow-hidden flex items-center justify-center">
          <div className="absolute inset-0 opacity-20 pointer-events-none" 
               style={{ backgroundImage: `repeating-linear-gradient(45deg, #cbd5e1 0, #cbd5e1 2px, transparent 2px, transparent 40px)` }} 
          />
          
          {!dropped ? (
             <div className="text-center z-10 relative">
                <button aria-label="Interactive Button" className="w-16 h-16 bg-blue-100 hover:bg-blue-200 rounded-full flex items-center justify-center mx-auto mb-4 relative animate-bounce shadow-lg cursor-pointer transition-colors" 
                  onClick={handleDrop}
                  type="button"
                >
                   <User className={`w-8 h-8 text-yellow-500 fill-yellow-500 transition-transform ${dragging ? 'scale-150 rotate-12' : ''}`} />
                </button>
                <h3 className="font-bold text-gray-800 mb-1">Explore Street View</h3>
                <p className="text-sm text-gray-500">Click the Pegman to enter Street View!</p>
             </div>
          ) : (
             <div className="text-center z-10 relative opacity-50">
                <div className="w-16 h-16 bg-gray-200 rounded-full mx-auto mb-4"></div>
                <h3 className="font-bold text-gray-400 mb-1">Loading...</h3>
             </div>
          )}
       </div>

       {/* Full Screen Overlay Animation */}
       {dropped && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center bg-[#eef1f3] overflow-hidden">
             
             {/* The Red Pin Scaling Up */}
             <div className={`transition-transform duration-[1500ms] ease-in-out origin-bottom ${phase >= 2 ? 'scale-[150]' : 'scale-100'} ${phase >= 3 ? 'opacity-0' : 'opacity-100'}`}>
                <MapPin className="w-32 h-32 text-red-500 fill-red-500 drop-shadow-2xl" />
             </div>

             {/* The "KEEP SMILING" Screen */}
             {phase >= 3 && (
                <div className="absolute inset-0 bg-red-500 flex flex-col items-center justify-center animate-in fade-in duration-500 z-10">
                   <h1 className="text-5xl md:text-8xl lg:text-9xl font-black text-white tracking-widest uppercase text-center px-4 animate-in zoom-in-50 duration-700">
                      KEEP SMILING
                   </h1>
                </div>
             )}
          </div>
       )}
    </div>
  );
}
