'use client';
import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export default function MinecraftHUD() {
    const { scrollYProgress } = useScroll();
    
    // XP Bar fills based on scroll
    const xpScaleX = useTransform(scrollYProgress, [0, 1], [0, 1]);
    
    // Level number increases based on scroll (0 to 30)
    const level = useTransform(scrollYProgress, [0, 1], [0, 30]);
    // Framer motion uses useTransform to interpolate, but for discrete text we can use a component that reads it, or just use `Math.floor` inside a motion value.
    // Instead of complex motion text, we'll just let it scale. For the level number, we can use an effect, but to keep it simple, we'll just render '30' or use a state. 
    // Actually, useMotionValueEvent can update a React state for the level number.

    const [currentLevel, setCurrentLevel] = React.useState(0);

    React.useEffect(() => {
        return scrollYProgress.onChange((latest) => {
            setCurrentLevel(Math.floor(latest * 30));
        });
    }, [scrollYProgress]);

    const renderHearts = () => {
        return Array.from({ length: 10 }).map((_, i) => (
            <div key={i} className="relative w-4 h-4 mr-0.5 inline-block">
                {/* Heart outline */}
                <svg viewBox="0 0 9 9" className="absolute inset-0 w-full h-full">
                    <path d="M1 2v3h1v1h1v1h1v1h1v-1h1v-1h1v-1h1v-3h-1v-1h-2v1h-1v-1h-2v1h-1z" fill="#000" />
                    {/* Heart fill */}
                    <path d="M2 2v3h1v1h1v1h1v-1h1v-1h1v-3h-1v-1h-1v1h-1v-1h-1v1z" fill="#ff0000" />
                </svg>
            </div>
        ));
    };

    const renderHunger = () => {
        return Array.from({ length: 10 }).map((_, i) => (
            <div key={i} className="relative w-4 h-4 ml-0.5 inline-block">
                <svg viewBox="0 0 9 9" className="absolute inset-0 w-full h-full">
                    {/* Drumstick outline */}
                    <path d="M5 0v1h1v1h1v2h-1v1h-1v1h-1v1h-1v-1h-1v-1h-1v-1h1v-1h1v-1h1v-1h1v-1h-1z" fill="#000" />
                    {/* Drumstick fill */}
                    <path d="M5 1v1h1v2h-1v1h-1v1h-1v-1h-1v-1h1v-1h1v-1h1v-1z" fill="#8a3f27" />
                </svg>
            </div>
        ));
    };

    return (
        <div className="fixed bottom-0 left-1/2 -translate-x-1/2 z-[150] w-full max-w-lg pointer-events-none pb-2 flex flex-col items-center">
            
            {/* Top Row: Health and Hunger */}
            <div className="flex justify-between w-[280px] mb-1">
                <div className="flex">
                    {renderHearts()}
                </div>
                <div className="flex">
                    {renderHunger()}
                </div>
            </div>

            {/* Middle Row: XP Bar */}
            <div className="relative w-[280px] h-[10px] bg-black border border-black mb-1 flex items-center justify-center">
                <div className="absolute left-0 top-0 bottom-0 bg-[#404040] w-full"></div>
                
                {/* The XP Fill */}
                <motion.div 
                    className="absolute left-0 top-0 bottom-0 bg-[#82fa58] origin-left"
                    style={{ scaleX: xpScaleX }}
                ></motion.div>
                
                {/* XP Dividers */}
                <div className="absolute inset-0 flex justify-between px-2">
                    {Array.from({length: 8}).map((_, i) => (
                        <div key={i} className="w-[1px] h-full bg-black/40"></div>
                    ))}
                </div>
            </div>

            {/* Level Number */}
            <div className="relative font-pixel text-[#82fa58] text-[10px] mb-1 text-center font-bold">
                <span className="absolute left-1/2 -translate-x-1/2 top-[1px] text-black">{currentLevel}</span>
                <span className="absolute left-1/2 -translate-x-[calc(50%-1px)] top-0 text-black">{currentLevel}</span>
                <span className="absolute left-1/2 -translate-x-[calc(50%+1px)] top-0 text-black">{currentLevel}</span>
                <span className="absolute left-1/2 -translate-x-1/2 -top-[1px] text-black">{currentLevel}</span>
                <span className="relative">{currentLevel}</span>
            </div>

            {/* Bottom Row: Hotbar */}
            <div className="relative w-[364px] h-[44px] bg-[#8b8b8b] border-2 border-white/40 flex items-center justify-center shadow-[4px_4px_0_rgba(0,0,0,0.5)]">
                {Array.from({ length: 9 }).map((_, i) => (
                    <div key={i} className={`w-[40px] h-[40px] border-[2px] border-b-[#373737] border-r-[#373737] border-t-white border-l-white bg-[#8b8b8b] flex items-center justify-center
                        ${i === 0 ? 'bg-white/30 border-4 border-white' : ''}`}>
                        
                        {/* Fake Items inside Hotbar */}
                        {i === 0 && (
                            <svg width="24" height="24" viewBox="0 0 16 16" fill="#855e42"><rect x="4" y="4" width="8" height="8" /><rect x="6" y="2" width="4" height="2" fill="#5c4033" /></svg>
                        )}
                        {i === 1 && (
                            <svg width="20" height="20" viewBox="0 0 16 16" fill="#fff"><path d="M2 14L14 2M14 2v4M14 2h-4" stroke="#fff" strokeWidth="2" /></svg>
                        )}
                        {i === 8 && (
                            <svg width="20" height="20" viewBox="0 0 16 16"><circle cx="8" cy="8" r="4" fill="#a0a0a0" /></svg>
                        )}

                    </div>
                ))}
            </div>

        </div>
    );
}
