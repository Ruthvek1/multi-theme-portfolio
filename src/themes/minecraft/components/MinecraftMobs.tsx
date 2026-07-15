'use client';
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function MinecraftMobs() {
    const [mounted, setMounted] = useState(false);
    
    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    return (
        <div className="fixed inset-0 pointer-events-none z-[100] overflow-hidden">
            
            {/* Enderman (Teleporting and walking fast) */}
            <motion.div 
                className="absolute bottom-12 drop-shadow-2xl"
                animate={{ 
                    x: ['-10vw', '110vw', '110vw', '-10vw'],
                    opacity: [0, 1, 1, 0, 0, 1, 1, 0] // Simulate teleporting in/out at edges
                }}
                transition={{ 
                    duration: 20, 
                    repeat: Infinity,
                    ease: "linear"
                }}
            >
                <svg width="40" height="120" viewBox="0 0 10 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                    {/* Head */}
                    <rect x="1" y="0" width="8" height="8" fill="#111" />
                    {/* Eyes */}
                    <rect x="1" y="4" width="3" height="1" fill="#c252ff" />
                    <rect x="6" y="4" width="3" height="1" fill="#c252ff" />
                    <rect x="2" y="4" width="1" height="1" fill="#ffb8ff" />
                    <rect x="7" y="4" width="1" height="1" fill="#ffb8ff" />
                    {/* Body */}
                    <rect x="3" y="8" width="4" height="10" fill="#111" />
                    {/* Arms (Long) */}
                    <motion.rect x="1" y="8" width="1" height="14" fill="#111" animate={{ y: [0, -2, 0] }} transition={{ duration: 0.5, repeat: Infinity }} />
                    <motion.rect x="8" y="8" width="1" height="14" fill="#111" animate={{ y: [0, -2, 0] }} transition={{ duration: 0.5, repeat: Infinity, delay: 0.25 }} />
                    {/* Legs (Long) */}
                    <motion.rect x="3" y="18" width="1" height="12" fill="#111" animate={{ y: [0, -1, 0] }} transition={{ duration: 0.5, repeat: Infinity }} />
                    <motion.rect x="6" y="18" width="1" height="12" fill="#111" animate={{ y: [0, -1, 0] }} transition={{ duration: 0.5, repeat: Infinity, delay: 0.25 }} />
                </svg>
            </motion.div>

            {/* Pig (Walking slowly left) */}
            <motion.div 
                className="absolute bottom-4 drop-shadow-xl"
                animate={{ 
                    x: ['110vw', '-10vw'],
                }}
                transition={{ 
                    x: { duration: 35, repeat: Infinity, ease: "linear" },
                }}
            >
                <motion.div
                    animate={{ y: [0, -4, 0] }}
                    transition={{ duration: 0.6, repeat: Infinity, ease: "linear" }}
                >
                    <svg width="48" height="32" viewBox="0 0 24 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        {/* Body */}
                        <rect x="6" y="4" width="16" height="10" fill="#f09ca9" />
                        {/* Head */}
                        <rect x="0" y="2" width="8" height="8" fill="#f09ca9" />
                        {/* Snout */}
                        <rect x="-2" y="5" width="3" height="3" fill="#d97b88" />
                        <rect x="-1" y="6" width="1" height="1" fill="#7a343f" />
                        {/* Eyes */}
                        <rect x="2" y="4" width="1" height="1" fill="#333" />
                        <rect x="5" y="4" width="1" height="1" fill="#333" />
                        {/* Legs */}
                        <rect x="6" y="14" width="2" height="2" fill="#f09ca9" />
                        <rect x="10" y="14" width="2" height="2" fill="#f09ca9" />
                        <rect x="16" y="14" width="2" height="2" fill="#f09ca9" />
                        <rect x="20" y="14" width="2" height="2" fill="#f09ca9" />
                    </svg>
                </motion.div>
            </motion.div>

            {/* Ender Dragon (Flying across the sky) */}
            <motion.div 
                className="absolute top-32 drop-shadow-2xl mix-blend-hard-light opacity-90"
                animate={{ 
                    x: ['-20vw', '120vw'],
                    y: [0, -30, 20, -10, 0]
                }}
                transition={{ 
                    x: { duration: 25, repeat: Infinity, ease: "linear" },
                    y: { duration: 6, repeat: Infinity, ease: "easeInOut" }
                }}
            >
                <svg width="300" height="150" viewBox="0 0 100 50" fill="none" xmlns="http://www.w3.org/2000/svg">
                    {/* Flapping Wings Behind */}
                    <motion.g 
                        animate={{ scaleY: [1, 0.2, 1] }} 
                        transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }} 
                        style={{ transformOrigin: "50% 25px" }}
                    >
                        <rect x="35" y="5" width="20" height="40" fill="#222" />
                    </motion.g>

                    {/* Body */}
                    <rect x="30" y="20" width="40" height="10" fill="#111" />
                    
                    {/* Tail */}
                    <rect x="10" y="22" width="20" height="6" fill="#111" />
                    <rect x="0" y="24" width="10" height="2" fill="#111" />
                    
                    {/* Back Spikes */}
                    <rect x="20" y="18" width="2" height="2" fill="#a0a0a0" />
                    <rect x="30" y="18" width="2" height="2" fill="#a0a0a0" />
                    <rect x="40" y="18" width="2" height="2" fill="#a0a0a0" />
                    <rect x="50" y="18" width="2" height="2" fill="#a0a0a0" />
                    <rect x="60" y="18" width="2" height="2" fill="#a0a0a0" />
                    
                    {/* Head */}
                    <rect x="70" y="18" width="12" height="10" fill="#111" />
                    {/* Snout */}
                    <rect x="82" y="22" width="8" height="4" fill="#111" />
                    {/* Eyes */}
                    <rect x="76" y="20" width="2" height="2" fill="#c252ff" />
                    <rect x="76" y="20" width="1" height="1" fill="#ffb8ff" />

                    {/* Flapping Wings Front */}
                    <motion.g 
                        animate={{ scaleY: [1, -0.2, 1] }} 
                        transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }} 
                        style={{ transformOrigin: "50% 25px" }}
                    >
                        <rect x="40" y="15" width="15" height="35" fill="#1a1a1a" />
                    </motion.g>
                </svg>
            </motion.div>
        </div>
    );
}
