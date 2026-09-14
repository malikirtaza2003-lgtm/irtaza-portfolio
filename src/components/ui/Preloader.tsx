"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { Outfit } from "next/font/google";

// Professional, bold, geometric font
const outfit = Outfit({ subsets: ["latin"], weight: ["700", "800"] });

const words = [
  { text: "Welcome", color: "text-white" },
  { text: "to", color: "text-white" },
  { text: "Irtaza", color: "text-[#FFD60A]" },
  { text: "Tahir", color: "text-[#FFD60A]" },
  { text: "Portfolio!", color: "text-white" },
];

export function Preloader() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Reveal text for ~1.5s, hold, then slide up.
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2800); 
    return () => clearTimeout(timer);
  }, []);

  const containerVariants: Variants = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.03, // faster stagger for letters
        delayChildren: 0.2,
      },
    },
    exit: {
      y: "-100vh",
      transition: { duration: 0.9, ease: [0.76, 0, 0.24, 1] },
    },
  };

  const charVariants: Variants = {
    hidden: { y: "100%", rotateZ: 10, opacity: 0 },
    visible: {
      y: "0%",
      rotateZ: 0,
      opacity: 1,
      transition: { duration: 0.6, ease: [0.33, 1, 0.68, 1] },
    },
  };

  return (
    <AnimatePresence mode="wait">
      {isLoading && (
        <motion.div
          key="preloader"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="fixed inset-0 z-[100] bg-[#0A0A0A] flex items-center justify-center overflow-hidden"
        >
          <div className={`${outfit.className} flex flex-wrap justify-center items-center gap-x-2 gap-y-1 md:gap-x-3 px-6 max-w-4xl text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-center`}>
            {words.map((item, index) => (
              <div key={index} className="flex overflow-hidden pb-1">
                {item.text.split("").map((char, charIdx) => (
                  <motion.div
                    key={charIdx}
                    variants={charVariants}
                    className={`inline-block ${item.color} leading-none`}
                  >
                    {char === " " ? "\u00A0" : char}
                  </motion.div>
                ))}
              </div>
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
