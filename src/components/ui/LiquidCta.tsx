"use client";

import { ArrowUpRight } from "lucide-react";
import React, { useRef, useState } from "react";

export function LiquidCta() {
  const buttonRef = useRef<HTMLButtonElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!buttonRef.current) return;
    const rect = buttonRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    buttonRef.current.style.setProperty('--x', `${x}%`);
    buttonRef.current.style.setProperty('--y', `${y}%`);
  };

  return (
    <button
      ref={buttonRef}
      onMouseMove={handleMouseMove}
      className="group relative overflow-hidden inline-flex items-center justify-center gap-2 rounded-full border-[1.5px] border-white px-7 py-3.5 text-white bg-transparent outline-none transition-all duration-300"
      style={{
        // @ts-ignore
        "--x": "50%",
        "--y": "50%",
      }}
    >
      {/* Liquid Blob Background */}
      <span className="absolute inset-0 z-0 pointer-events-none overflow-hidden rounded-full">
        <span 
          className="absolute z-[-1] block w-[200%] h-[200%] -top-[50%] -left-[50%] rounded-full bg-[#3B82F6] transition-all duration-500 ease-out group-hover:scale-100 scale-0"
          style={{
            transformOrigin: "var(--x) var(--y)",
            animation: "liquid-blob 3s infinite alternate ease-in-out",
          }}
        />
      </span>

      {/* Text */}
      <span className="relative z-10 font-medium transition-transform duration-300 group-hover:-translate-y-[1px]">
        Start Your Project
      </span>

      {/* Icon */}
      <span className="relative z-10 transition-transform duration-300 group-hover:rotate-[12deg] group-hover:-translate-y-[1px]">
        <ArrowUpRight size={18} strokeWidth={2.5} />
      </span>

    </button>
  );
}
