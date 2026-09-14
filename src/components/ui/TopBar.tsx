"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { AnimatedButton } from "./AnimatedButton";

export function TopBar() {
  const nameRef = useRef<HTMLSpanElement>(null);
  
  useEffect(() => {
    const chars = nameRef.current?.querySelectorAll(".char");
    if (!chars || chars.length === 0) return;

    const hoverIn = () => {
      gsap.to(chars, {
        color: "#FFD60A",
        stagger: 0.03,
        duration: 0.3,
        ease: "power2.out",
      });
    };

    const hoverOut = () => {
      gsap.to(chars, {
        color: "#ffffff",
        stagger: 0.03,
        duration: 0.3,
        ease: "power2.out",
      });
    };

    const el = nameRef.current;
    el?.addEventListener("mouseenter", hoverIn);
    el?.addEventListener("mouseleave", hoverOut);

    return () => {
      el?.removeEventListener("mouseenter", hoverIn);
      el?.removeEventListener("mouseleave", hoverOut);
    };
  }, []);

  const name = "Irtaza Tahir";

  return (
    <header className="absolute top-0 left-0 w-full p-6 md:p-10 flex flex-col sm:flex-row justify-between items-start sm:items-center z-50 gap-6 sm:gap-0 font-clash">
      <div className="text-white text-xl sm:text-2xl font-semibold tracking-wide flex items-center">
        <span>Hi, I&apos;m&nbsp;</span>
        <span ref={nameRef} className="cursor-pointer flex">
          {name.split("").map((char, index) => (
            <span key={index} className="char transition-transform duration-300">
              {char === " " ? "\u00A0" : char}
            </span>
          ))}
        </span>
      </div>
      <nav className="flex gap-3 sm:gap-4 w-full sm:w-auto justify-start sm:justify-end">
        <AnimatedButton onClick={() => {
          // @ts-ignore
          if (window.lenis) window.lenis.scrollTo('#contact');
          else document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
        }}>Contact</AnimatedButton>
        <AnimatedButton onClick={() => {
          // @ts-ignore
          if (window.lenis) window.lenis.scrollTo('#work');
          else document.getElementById('work')?.scrollIntoView({ behavior: 'smooth' });
        }}>My Work</AnimatedButton>
      </nav>
    </header>
  );
}

