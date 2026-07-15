import Image from 'next/image';
import React from 'react';
import Window from '../components/Window';
import { usePortfolio } from '@/core/PortfolioContext';
import { Mail, Send, Paperclip, Type, Image as ImageIcon, Link as LinkIcon, User } from 'lucide-react';

export default function MailApp() {
  const { personal, socials } = usePortfolio();

  return (
    <Window 
      id="mail" 
      title="Mail - Contact" 
      icon={<Mail className="w-full h-full text-blue-300" />}
      defaultWidth={800}
      defaultHeight={600}
    >
      <div className="w-full h-full flex flex-col bg-[#ffffff] text-black text-sm">
        
        {/* Mail Toolbar */}
        <div className="flex border-b border-gray-200 bg-[#f5f5f5] p-2 gap-4 text-xs font-semibold text-gray-700">
          <div className="flex flex-col items-center gap-1 hover:bg-black/5 p-2 rounded cursor-pointer text-blue-600">
            <Send className="w-5 h-5" /> Send
          </div>
          <div className="flex flex-col items-center gap-1 hover:bg-black/5 p-2 rounded cursor-pointer">
            <Paperclip className="w-5 h-5" /> Attach
          </div>
          <div className="w-px bg-gray-300 mx-2" />
          <div className="flex flex-col items-center gap-1 hover:bg-black/5 p-2 rounded cursor-pointer">
            <Type className="w-5 h-5" /> Formatting
          </div>
          <div className="flex flex-col items-center gap-1 hover:bg-black/5 p-2 rounded cursor-pointer">
            <ImageIcon className="w-5 h-5" /> Insert
          </div>
        </div>

        {/* Compose Fields */}
        <div className="flex flex-col border-b border-gray-200 px-6 py-2 bg-white">
          <div className="flex items-center py-2 border-b border-gray-100">
            <span className="w-12 text-gray-500 font-semibold text-xs uppercase">To:</span>
            <div className="flex items-center gap-2 bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-xs font-medium">
              <User className="w-3 h-3" /> {personal?.name} &lt;{personal?.email}&gt;
            </div>
          </div>
          <div className="flex items-center py-2 border-b border-gray-100">
            <span className="w-12 text-gray-500 font-semibold text-xs uppercase">Cc:</span>
            <input type="text" className="flex-1 outline-none text-sm" />
          </div>
          <div className="flex items-center py-2">
            <span className="w-12 text-gray-500 font-semibold text-xs uppercase">Sub:</span>
            <input type="text" className="flex-1 outline-none text-sm font-semibold" placeholder="New Inquiry from Portfolio" defaultValue="Let's connect!" />
          </div>
        </div>

        {/* Message Body */}
        <div className="flex-1 p-6 flex flex-col">
          <textarea 
            className="w-full h-full outline-none resize-none text-sm leading-relaxed" 
            placeholder="Write your message here..."
            defaultValue={`Hi ${personal?.name?.split(' ')[0]},\n\nI just saw your Windows 11 portfolio and wanted to reach out. I'm very impressed with your work!\n\nBest,\n[Your Name]`}
          />
        </div>

        {/* Status / Signature Bar */}
        <div className="bg-[#f5f5f5] border-t border-gray-200 p-3 flex justify-between items-center text-xs text-gray-500">
          <div>Sending as: Guest User</div>
          <div className="flex gap-4">
            {socials?.github && (
              <a aria-label="Link" href={socials.github} target="_blank" className="flex items-center gap-1 hover:text-black">
                <LinkIcon className="w-3.5 h-3.5" /> GitHub
              </a>
            )}
            {socials?.linkedin && (
              <a aria-label="Link" href={socials.linkedin} target="_blank" className="flex items-center gap-1 hover:text-[#0a66c2]">
                <LinkIcon className="w-3.5 h-3.5" /> LinkedIn
              </a>
            )}
          </div>
        </div>

      </div>
    </Window>
  );
}
