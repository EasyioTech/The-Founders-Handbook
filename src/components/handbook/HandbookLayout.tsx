"use client";

import { ReactNode, useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { Navigation } from "./Navigation";

export function HandbookLayout({ 
  children, 
  currentSection 
}: { 
  children: ReactNode; 
  currentSection: string;
}) {
  const [isTransitioning, setIsTransitioning] = useState(true);
  const pathname = usePathname();

  useEffect(() => {
    setIsTransitioning(true);
    const timer = setTimeout(() => {
      setIsTransitioning(false);
    }, 50);
    return () => clearTimeout(timer);
  }, [pathname]);

  return (
    <div className="min-h-screen bg-background">
      <Navigation currentSection={currentSection} />
      <main className="lg:ml-72 min-h-screen">
        <div 
          className={`max-w-4xl mx-auto px-6 py-12 lg:px-12 lg:py-16 transition-all duration-500 ease-out ${
            isTransitioning ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'
          }`}
        >
          {children}
        </div>
      </main>
    </div>
  );
}
