"use client";
import { useState } from "react";

export default function ServiceItem({ itemText, itemImages }: { itemText: string, itemImages: string[] }) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  return (
    <div className="flex flex-col bg-white p-4 rounded-xl border border-gray-150 shadow-sm hover:border-primary hover:shadow-md transition-all group">
      <div className="flex items-center justify-between text-gray-700 w-full cursor-pointer" onClick={() => setIsOpen(!isOpen)}>
        <div className="flex items-center space-x-3 text-left flex-1">
          <div className="w-2 h-2 bg-secondary rounded-full flex-shrink-0 group-hover:bg-primary transition-colors"></div>
          <span className="font-bold flex-1 text-base">{itemText}</span>
        </div>
        {itemImages.length > 0 && (
          <button className="text-xs font-bold text-gray-500 group-hover:text-primary transition-colors flex items-center bg-gray-50 hover:bg-gray-100 px-3 py-1.5 rounded-lg border border-gray-200 shadow-sm ml-4 whitespace-nowrap">
            {isOpen ? "Hide Images ↑" : "View Images ↓"}
          </button>
        )}
      </div>
      
      {isOpen && itemImages.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-4 pt-4 border-t border-gray-100">
          {itemImages.map((img: string, imgIdx: number) => (
            <div key={imgIdx} className="h-32 overflow-hidden rounded-lg border border-gray-200 shadow-sm">
              <img src={img} className="w-full h-full object-cover hover:scale-110 transition-transform duration-500 cursor-zoom-in" alt={itemText} onClick={() => setSelectedImage(img)} />
            </div>
          ))}
        </div>
      )}

      {selectedImage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4" onClick={() => setSelectedImage(null)}>
          <div className="relative max-w-4xl w-full h-full max-h-[90vh] flex items-center justify-center">
            <button 
              className="absolute top-4 right-4 bg-white text-black w-10 h-10 rounded-full flex items-center justify-center font-bold text-xl shadow-lg hover:bg-gray-200 z-10"
              onClick={(e) => { e.stopPropagation(); setSelectedImage(null); }}
            >
              ✕
            </button>
            <img src={selectedImage} className="max-w-full max-h-full object-contain rounded-lg shadow-2xl" alt="Enlarged view" onClick={(e) => e.stopPropagation()} />
          </div>
        </div>
      )}
    </div>
  );
}
