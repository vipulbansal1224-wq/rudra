"use client";

import { useState } from "react";

export default function PartnerMarquee({ partners }: { partners: any[] }) {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  return (
    <>
      <div className="relative w-full overflow-hidden py-6 bg-gray-50 border-y border-gray-100 flex items-center group">
        <div className="animate-marquee group-hover:[animation-play-state:paused] flex whitespace-nowrap space-x-12 items-center">
          {[...partners, ...partners, ...partners].map((partner: any, idx: number) => (
            <div 
              key={idx} 
              onClick={() => setSelectedImage(partner.src)}
              className="flex-shrink-0 flex items-center justify-center bg-white p-4 h-24 w-44 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow cursor-pointer"
            >
              <img 
                alt={partner.name} 
                className="max-h-16 max-w-full object-contain filter grayscale hover:grayscale-0 transition-all duration-300" 
                src={partner.src} 
              />
            </div>
          ))}
        </div>
      </div>

      {selectedImage && (
        <div 
          className="fixed inset-0 bg-black/80 z-[100] flex items-center justify-center p-4 cursor-pointer transition-opacity"
          onClick={() => setSelectedImage(null)}
        >
          <div 
            className="relative w-[90%] max-w-2xl bg-white p-8 md:p-12 rounded-2xl flex items-center justify-center shadow-2xl transform transition-transform"
            onClick={(e) => e.stopPropagation()}
          >
            <button 
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-900 transition-colors p-2"
              onClick={() => setSelectedImage(null)}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
            </button>
            <img 
              src={selectedImage} 
              alt="Partner Logo Large" 
              className="max-w-full max-h-[60vh] object-contain" 
            />
          </div>
        </div>
      )}
    </>
  );
}
