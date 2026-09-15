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
    <header className="absolute top-0 left-0 w-full px-4 py-3.5 sm:px-6 sm:py-5 md:px-10 md:py-8 flex flex-row justify-between items-center z-50 gap-2 font-clash">
      <div className="text-white text-base sm:text-xl md:text-2xl font-semibold tracking-wide flex items-center flex-shrink-0">
        <span>Hi, I&apos;m&nbsp;</span>
        <span ref={nameRef} className="cursor-pointer flex">
          {name.split("").map((char, index) => (
            <span key={index} className="char transition-transform duration-300">
              {char === " " ? "\u00A0" : char}
            </span>
          ))}
        </span>
      </div>
      <nav className="flex gap-2 sm:gap-4 flex-shrink-0 w-auto justify-end">
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

