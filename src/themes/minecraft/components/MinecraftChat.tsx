'use client';
import React, { useEffect, useState } from 'react';
import { useScroll } from 'framer-motion';

type ChatMessage = {
    id: string;
    text: React.ReactNode;
};

export default function MinecraftChat() {
    const { scrollYProgress } = useScroll();
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    
    // Track thresholds to only trigger once
    const [triggered, setTriggered] = useState<Record<string, boolean>>({});

    const addMessage = (text: React.ReactNode) => {
        const id = `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
        setMessages(prev => [...prev.slice(-4), { id, text }]); // Keep max 5 messages

        // Auto remove after 5 seconds
        setTimeout(() => {
            setMessages(prev => prev.filter(m => m.id !== id));
        }, 5000);
    };

    useEffect(() => {
        // Initial join message
        setTimeout(() => {
            addMessage(<span><span className="text-yellow-400">Server:</span> Welcome to the portfolio!</span>);
        }, 1000);
    }, []);

    useEffect(() => {
        return scrollYProgress.onChange((latest) => {
            if (latest > 0.2 && !triggered['0.2']) {
                setTriggered(prev => ({...prev, '0.2': true}));
                addMessage(<span><span className="text-gray-400">[System]</span> Entering the Mineshaft...</span>);
            }
            if (latest > 0.4 && !triggered['0.4']) {
                setTriggered(prev => ({...prev, '0.4': true}));
                addMessage(<span><span className="text-yellow-400">Achievement Get!</span> <span className="text-white">Crafting Master</span></span>);
            }
            if (latest > 0.6 && !triggered['0.6']) {
                setTriggered(prev => ({...prev, '0.6': true}));
                addMessage(<span><span className="text-gray-400">[System]</span> Chests discovered!</span>);
            }
            if (latest > 0.9 && !triggered['0.9']) {
                setTriggered(prev => ({...prev, '0.9': true}));
                addMessage(<span><span className="text-red-400">Warning:</span> Reached Bedrock layer.</span>);
            }
        });
    }, [scrollYProgress, triggered]);

    return (
        <div className="fixed bottom-24 left-4 z-[150] w-[320px] pointer-events-none flex flex-col justify-end gap-1">
            {messages.map((msg) => (
                <div 
                    key={msg.id} 
                    className="font-pixel text-[10px] text-white bg-black/50 px-2 py-1 animate-in fade-in slide-in-from-bottom-2 duration-300"
                    style={{ textShadow: '1px 1px 0 #000' }}
                >
                    {msg.text}
                </div>
            ))}
        </div>
    );
}
