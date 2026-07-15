import React from 'react';
import { Check, Award } from 'lucide-react';

export default function AmenitiesList({ skills }: { skills: any }) {
  if (!skills) return null;

  return (
    <div className="space-y-8">
      {/* Amenities (Skills) Card */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 md:p-8">
         <h2 className="text-xl font-bold text-gray-800 mb-6 border-b border-gray-100 pb-4">Amenities (Skills)</h2>
         
         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {skills.map((data: any, index: number) => (
               <div key={index}>
                  <h3 className="font-bold text-gray-900 mb-3">{data.category}</h3>
                  <ul className="space-y-2">
                     {data.items?.map((item: string) => (
                        <li key={item} className="flex items-start gap-2 text-gray-600">
                           <Check className="w-5 h-5 text-green-500 shrink-0" />
                           <span>{item}</span>
                        </li>
                     ))}
                  </ul>
               </div>
            ))}
         </div>
      </div>
    </div>
  );
}
