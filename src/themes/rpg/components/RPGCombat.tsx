'use client';
import Image from 'next/image';
import React, { useState, useEffect } from 'react';
import { Mail, Phone, MapPin } from 'lucide-react';

export default function RPGCombat({ personal, socials }: { personal: any, socials: any }) {
  const [playerHP, setPlayerHP] = useState(100);
  const [bossHP, setBossHP] = useState(250);
  const [combatState, setCombatState] = useState<'idle' | 'player_attack' | 'boss_attack' | 'victory'>('idle');
  const [message, setMessage] = useState('A wild BUG appeared!');
  
  const maxBossHP = 250;

  const handleAction = (actionType: 'attack' | 'magic') => {
      if (combatState !== 'idle' || playerHP <= 0 || bossHP <= 0) return;

      setCombatState('player_attack');
      
      const damage = actionType === 'attack' ? Math.floor(Math.random() * 20) + 20 : Math.floor(Math.random() * 40) + 30;
      
      setMessage(`You used ${actionType.toUpperCase()}! Dealt ${damage} damage.`);
      
      setTimeout(() => {
          setBossHP(prev => {
              const newHP = Math.max(0, prev - damage);
              if (newHP <= 0) {
                  setCombatState('victory');
                  setMessage('The BUG was defeated! Loot dropped.');
                  return 0;
              }
              return newHP;
          });
      }, 1000);
  };

  useEffect(() => {
      if (combatState === 'player_attack' && bossHP > 0) {
          // Trigger boss attack after player
          const timer = setTimeout(() => {
              setCombatState('boss_attack');
              const damage = Math.floor(Math.random() * 15) + 5;
              setMessage(`The BUG attacked! You took ${damage} damage.`);
              
              setTimeout(() => {
                  setPlayerHP(prev => Math.max(0, prev - damage));
                  setCombatState('idle');
                  setMessage('What will you do?');
              }, 1000);
              
          }, 2000);
          return () => clearTimeout(timer);
      }
  }, [combatState, bossHP]);

  return (
    <div className="py-32 relative w-full bg-[#000] overflow-hidden min-h-[900px] flex items-center justify-center border-t-8 border-[#333]">
       
       {/* Retro Battle Background */}
       <div 
           className="absolute inset-0 pointer-events-none opacity-30"
           style={{
               backgroundImage: `url('data:image/svg+xml;utf8,<svg width="128" height="128" xmlns="http://www.w3.org/2000/svg"><rect width="128" height="128" fill="%231a0033"/><path d="M0,100 Q32,80 64,100 T128,100 L128,128 L0,128 Z" fill="%23330066"/><path d="M0,110 Q32,100 64,110 T128,110 L128,128 L0,128 Z" fill="%234d0099"/></svg>')`,
               backgroundSize: '128px 128px'
           }}
       ></div>

       <div className="relative z-10 w-full max-w-5xl mx-auto px-4 flex flex-col items-center">
           
           {/* Battle Arena */}
           <div className="w-full flex justify-between items-end mb-12 relative h-[400px]">
               
               {/* Player Side */}
               <div className="flex flex-col items-center w-1/3 z-20">
                   <div className="bg-gradient-to-b from-[#0d1b40] to-[#04081c] border-[4px] border-white p-4 shadow-[4px_4px_0_rgba(0,0,0,0.8)] rounded-sm mb-4 w-full">
                       <h4 className="font-rpg text-white text-xl uppercase mb-2 text-center">Hero</h4>
                       <div className="w-full bg-red-900 h-4 border-2 border-white">
                           <div className="bg-green-500 h-full transition-all duration-300" style={{ width: `${Math.max(0, (playerHP / 100) * 100)}%` }}></div>
                       </div>
                       <p className="font-rpg text-white text-right mt-1 text-sm">{playerHP}/100 HP</p>
                   </div>
                   
                   <div className={`transition-transform duration-300 ${combatState === 'player_attack' ? 'translate-x-12' : ''} ${combatState === 'boss_attack' ? 'opacity-50 animate-pulse' : ''}`}>
                       <Image src="/assets/rpg-hero.png" 
                           alt="Hero"
                           className="w-48 h-48 object-contain pixelated"
                           style={{ imageRendering: 'pixelated' }} width={800} height={600} />
                   </div>
               </div>

               {/* Boss Side */}
               <div className="flex flex-col items-center w-1/3 z-20">
                   <div className="bg-gradient-to-b from-[#400d0d] to-[#1c0404] border-[4px] border-white p-4 shadow-[4px_4px_0_rgba(0,0,0,0.8)] rounded-sm mb-4 w-full">
                       <h4 className="font-rpg text-white text-xl uppercase mb-2 text-center">The BUG</h4>
                       <div className="w-full bg-red-900 h-4 border-2 border-white">
                           <div className="bg-yellow-400 h-full transition-all duration-300" style={{ width: `${Math.max(0, (bossHP / maxBossHP) * 100)}%` }}></div>
                       </div>
                   </div>

                   <div className={`transition-transform duration-300 ${combatState === 'boss_attack' ? '-translate-x-12 scale-110' : ''} ${combatState === 'player_attack' ? 'opacity-50 animate-pulse' : ''}`}>
                       {bossHP > 0 ? (
                           <Image src="/assets/rpg-boss.png" 
                               alt="Boss"
                               className="w-64 h-64 object-contain pixelated"
                               style={{ imageRendering: 'pixelated' }} width={800} height={600} />
                       ) : (
                           <div className="w-64 h-64 flex items-center justify-center font-rpg text-red-500 text-4xl animate-pulse">
                               DEFEATED
                           </div>
                       )}
                   </div>
               </div>

           </div>

           {/* UI Bottom Area */}
           {bossHP > 0 ? (
               <div className="w-full flex gap-4 h-[150px]">
                   
                   {/* Message Box */}
                   <div className="flex-1 bg-gradient-to-b from-[#0d1b40] to-[#04081c] border-[6px] border-white p-6 shadow-[4px_4px_0_rgba(0,0,0,0.8)] rounded-sm relative">
                       <div className="absolute inset-1 border-[2px] border-[#5577ff] pointer-events-none rounded-sm"></div>
                       <p className="font-rpg text-white text-3xl leading-relaxed typing-effect">
                           {message}
                       </p>
                   </div>

                   {/* Command Menu */}
                   <div className="w-64 bg-gradient-to-b from-[#0d1b40] to-[#04081c] border-[6px] border-white p-6 shadow-[4px_4px_0_rgba(0,0,0,0.8)] rounded-sm relative flex flex-col justify-around">
                       <div className="absolute inset-1 border-[2px] border-[#5577ff] pointer-events-none rounded-sm"></div>
                       
                       <button aria-label="Interactive Button" className={`group flex items-center gap-3 w-full ${combatState !== 'idle' ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
                           onClick={() => handleAction('attack')}
                           disabled={combatState !== 'idle'}
                       >
                           <span className="text-white opacity-0 group-hover:opacity-100 font-rpg text-2xl">▶</span>
                           <span className="font-rpg text-white text-3xl uppercase tracking-wider">Attack</span>
                       </button>

                       <button aria-label="Interactive Button" className={`group flex items-center gap-3 w-full ${combatState !== 'idle' ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
                           onClick={() => handleAction('magic')}
                           disabled={combatState !== 'idle'}
                       >
                           <span className="text-white opacity-0 group-hover:opacity-100 font-rpg text-2xl">▶</span>
                           <span className="font-rpg text-white text-3xl uppercase tracking-wider">Magic</span>
                       </button>
                   </div>

               </div>
           ) : (
               // Victory Screen
               <div className="w-full bg-gradient-to-b from-[#0d1b40] to-[#04081c] border-[6px] border-yellow-400 p-8 shadow-[0_0_30px_rgba(250,204,21,0.4)] rounded-sm relative animate-in zoom-in duration-500">
                   <div className="absolute inset-1 border-[2px] border-[#5577ff] pointer-events-none rounded-sm"></div>
                   
                   <h2 className="font-rpg text-yellow-400 text-4xl mb-4 text-center uppercase tracking-widest">
                       Victory!
                   </h2>
                   
                   <p className="font-rpg text-white text-2xl text-center">
                       You defeated the BUG and gained 999 EXP!
                   </p>
               </div>
           )}

       </div>

    </div>
  );
}
