"use client";

import confetti from "canvas-confetti";
import Link from "next/link";

export default function ConfettiLogo() {
  const handleMouseEnter = (event: React.MouseEvent) => {
    const rect = (event.target as HTMLElement).getBoundingClientRect();
    const x = (rect.left + rect.width / 2) / window.innerWidth;
    const y = (rect.top + rect.height / 2) / window.innerHeight;

    confetti({
      particleCount: 50,
      spread: 60,
      origin: { x, y },
      disableForReducedMotion: true,
      zIndex: 100,
    });
  };

  return (
    <Link className="flex items-center space-x-3 text-decoration-none py-1" href="/">
      <img 
        alt="Rudraksh Enterprises Logo 2" 
        className="h-10 sm:h-12 md:h-16 w-auto object-contain transition-transform duration-700 hover:rotate-[360deg]" 
        src="/logo-2.jpeg"
      />
      <img 
        alt="Rudraksh Enterprises Logo 1" 
        className="h-8 sm:h-10 md:h-12 w-auto object-contain cursor-pointer" 
        src="/logo-1.jpeg"
        onMouseEnter={handleMouseEnter}
      />
    </Link>
  );
}
