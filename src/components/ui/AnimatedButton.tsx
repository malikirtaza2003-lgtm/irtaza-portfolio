"use client";

import { ArrowUpRight } from "lucide-react";

interface AnimatedButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
}

export function AnimatedButton({ children, onClick, className = "" }: AnimatedButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`group relative flex items-center justify-center gap-1.5 px-2 py-1 text-sm font-medium text-white transition-colors duration-300 ${className}`}
    >
      <span className="relative">
        {children}
        {/* Underline hover effect */}
        <span className="absolute left-0 -bottom-1 h-[1.5px] w-full bg-[#3B82F6] scale-x-0 origin-left transition-transform duration-300 ease-out group-hover:scale-x-100" />
      </span>
      
      {/* Arrow icon */}
      <span className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
        <ArrowUpRight size={16} strokeWidth={2.5} />
      </span>
    </button>
  );
}
