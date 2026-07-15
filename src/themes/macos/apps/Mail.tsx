import React from 'react';
import { usePortfolio } from '@/core/PortfolioContext';
import { Mail as MailIcon, Send, Archive, Trash2, Reply, CornerUpRight, Paperclip, Clock } from 'lucide-react';

export default function Mail() {
  const { personal } = usePortfolio();

  return (
    <div className="w-full h-full flex bg-white">
      {/* Sidebar 1: Mailboxes */}
      <div className="w-48 bg-[#F5F5F5] border-r border-gray-200 flex flex-col h-full shrink-0">
        <div className="h-12 flex items-center px-4 font-semibold text-gray-700">Mailboxes</div>
        <div className="flex-1 overflow-auto">
          <div className="px-2 flex flex-col gap-1 text-sm font-medium text-gray-700">
            <div className="flex items-center gap-2 px-2 py-1 bg-gray-200/80 rounded-md">
              <MailIcon className="w-4 h-4 text-blue-500" fill="currentColor" /> Inbox
            </div>
            <div className="flex items-center gap-2 px-2 py-1 hover:bg-gray-200/50 rounded-md">
              <Send className="w-4 h-4 text-gray-500" /> Sent
            </div>
            <div className="flex items-center gap-2 px-2 py-1 hover:bg-gray-200/50 rounded-md">
              <Archive className="w-4 h-4 text-gray-500" /> Archive
            </div>
            <div className="flex items-center gap-2 px-2 py-1 hover:bg-gray-200/50 rounded-md">
              <Trash2 className="w-4 h-4 text-gray-500" /> Trash
            </div>
          </div>
        </div>
      </div>

      {/* Sidebar 2: Message List */}
      <div className="w-72 bg-white border-r border-gray-200 flex flex-col h-full shrink-0">
        <div className="h-12 border-b border-gray-100 flex items-center px-4 font-semibold text-gray-800">
          Inbox
        </div>
        <div className="flex-1 overflow-auto">
          {/* Active Message Item */}
          <div className="p-3 bg-blue-500 text-white border-b border-blue-600 cursor-default">
            <div className="flex justify-between items-baseline mb-1">
              <span className="font-bold truncate text-sm">To: {personal?.name}</span>
              <span className="text-xs text-blue-100 shrink-0">10:41 AM</span>
            </div>
            <div className="font-semibold text-xs mb-1">New Portfolio Contact Request</div>
            <div className="text-xs text-blue-100 line-clamp-2 leading-relaxed">
              I'm reaching out because I saw your portfolio and I would love to discuss a potential opportunity...
            </div>
          </div>
        </div>
      </div>

      {/* Main Content: Message Viewer */}
      <div className="flex-1 flex flex-col h-full bg-white relative">
        {/* Toolbar */}
        <div className="h-12 border-b border-gray-200 flex items-center px-4 justify-between shrink-0 bg-[#F9F9F9]">
          <div className="flex gap-4">
            <button aria-label="Interactive Button" className="text-gray-500 hover:text-black"><Trash2 className="w-4 h-4" /></button>
            <button aria-label="Interactive Button" className="text-gray-500 hover:text-black"><Archive className="w-4 h-4" /></button>
          </div>
          <div className="flex gap-4">
            <button aria-label="Interactive Button" className="text-gray-500 hover:text-black"><Reply className="w-4 h-4" /></button>
            <button aria-label="Interactive Button" className="text-gray-500 hover:text-black"><CornerUpRight className="w-4 h-4" /></button>
          </div>
        </div>

        {/* Message Header */}
        <div className="p-6 border-b border-gray-100">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">New Portfolio Contact Request</h2>
          <div className="flex items-start justify-between text-sm">
             <div className="flex gap-3">
               <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center font-bold text-gray-500 text-lg shadow-inner">
                 ?
               </div>
               <div className="flex flex-col">
                 <span className="font-bold text-gray-800">Recruiter <span className="text-gray-500 font-normal">{'<recruiter@example.com>'}</span></span>
                 <span className="text-gray-500">To: {personal?.name} {`<${personal?.email}>`}</span>
               </div>
             </div>
             <div className="text-gray-400">Today at 10:41 AM</div>
          </div>
        </div>

        {/* Message Body (Reply Form Simulation) */}
        <div className="flex-1 overflow-auto p-8 relative">
           <div className="max-w-2xl text-sm text-gray-800 font-sans leading-relaxed">
              <p className="mb-4">Hi {personal?.name},</p>
              <p className="mb-4">I saw your impressive portfolio and would love to get in touch regarding a potential opportunity. Please reply to this email or reach out when you have a moment.</p>
              <p className="mb-8">Thanks!</p>
              
              {/* Draft Reply Area */}
              <div className="mt-8 border border-gray-200 rounded-lg shadow-sm overflow-hidden flex flex-col">
                 <div className="bg-gray-50 px-4 py-2 border-b border-gray-200 flex items-center text-xs text-gray-500 gap-2">
                   <Reply className="w-3 h-3" /> Replying to Recruiter
                 </div>
                 <textarea 
                   className="w-full h-40 p-4 resize-none outline-none text-sm text-gray-800"
                   placeholder="Write your message here..."
                   defaultValue={`Hi,\n\nThanks for reaching out! You can contact me directly at ${personal?.email} or connect with me via my social links.\n\nBest,\n${personal?.name}`}
                 />
                 <div className="bg-white border-t border-gray-100 px-4 py-2 flex justify-between items-center">
                    <div className="flex gap-3">
                      <button aria-label="Interactive Button" className="text-gray-400 hover:text-gray-600"><Paperclip className="w-4 h-4" /></button>
                    </div>
                    <button aria-label="Interactive Button" className="px-4 py-1.5 bg-blue-500 hover:bg-blue-600 text-white rounded-md text-sm font-semibold shadow-sm flex items-center gap-2">
                      <Send className="w-3 h-3" /> Send
                    </button>
                 </div>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
}
