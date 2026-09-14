"use client";

import { useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";

export function TechCluster() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Track mouse position and lerped positions
  const mouse = useRef({ x: 0, y: 0 });
  const lerped = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let animationFrameId = 0;
    let isActive = false;

    const handleMouseMove = (e: MouseEvent) => {
      if (!isActive) return;
      mouse.current = {
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: (e.clientY / window.innerHeight) * 2 - 1,
      };
    };

    const render = () => {
      if (isActive) {
        lerped.current.x += (mouse.current.x - lerped.current.x) * 0.08;
        lerped.current.y += (mouse.current.y - lerped.current.y) * 0.08;

        const card = container.children[0] as HTMLElement | undefined;
        if (card) {
          card.style.transform = `translate(${lerped.current.x * 6}px, ${lerped.current.y * 6}px) rotate(${lerped.current.x * 3}deg)`;
        }
      }
      animationFrameId = requestAnimationFrame(render);
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        isActive = entry.isIntersecting;
      },
      { threshold: 0.1 }
    );

    observer.observe(container);
    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    animationFrameId = requestAnimationFrame(render);

    return () => {
      observer.disconnect();
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);


  const cardRef = useRef(null);
  const isInView = useInView(cardRef, { margin: "-100px" });

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.3,
      }
    }
  };

  const lineVariants = {
    hidden: { width: "0%" },
    visible: { width: "100%", transition: { duration: 0.6, ease: "linear" as const } }
  };

  return (
    <div className="hidden lg:flex relative w-[320px] h-[320px] items-center justify-center" ref={containerRef}>
      
      {/* Main 1: Code Card */}
      <div className="relative w-[280px] rounded-xl bg-[#141414]/95 border border-white/10 p-5 shadow-2xl z-10" ref={cardRef}>
        {/* Window Controls */}
        <div className="flex gap-1.5 mb-4">
          <div className="w-2.5 h-2.5 rounded-full bg-red-500/80"></div>
          <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80"></div>
          <div className="w-2.5 h-2.5 rounded-full bg-green-500/80"></div>
        </div>
        
        {/* Code Content */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="font-mono text-xs sm:text-sm text-gray-300 leading-loose flex flex-col items-start"
        >
          <motion.div variants={lineVariants} className="overflow-hidden whitespace-nowrap">
            <span className="text-[#3B82F6]">const</span> build = () =&gt; {"{"}
          </motion.div>
          <motion.div variants={lineVariants} className="overflow-hidden whitespace-nowrap pl-4">
            <span className="text-[#3B82F6]">return</span> (
          </motion.div>
          <motion.div variants={lineVariants} className="overflow-hidden whitespace-nowrap pl-8">
            <span className="text-[#FFD60A]">&lt;AwesomeApp /&gt;</span>
          </motion.div>
          <motion.div variants={lineVariants} className="overflow-hidden whitespace-nowrap pl-4">
            );
          </motion.div>
          <motion.div variants={lineVariants} className="overflow-hidden whitespace-nowrap">
            {"};"}
          </motion.div>
          <motion.div variants={lineVariants} className="overflow-hidden whitespace-nowrap relative">
            <span className="text-[#3B82F6]">export</span> <span className="text-[#3B82F6]">default</span> build;
            {/* Blinking Cursor */}
            <span 
              className="inline-block w-1.5 h-4 ml-1 align-middle bg-gray-300"
              style={{ animation: "cursor-blink 1s step-start infinite" }}
            ></span>
          </motion.div>
        </motion.div>
      </div>

    </div>
  );
}
