"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";

type TaglinePart = {
  word: string;
  space?: boolean;
  isHighlight?: boolean;
  highlightColor?: string;
  textColor?: string;
};

const taglines: TaglinePart[][] = [
  [
    { word: "Irtaza", space: true }, { word: "Tahir", space: true }, { word: "—", space: true }, 
    { word: "PASSIONATE", isHighlight: true, highlightColor: "#3B82F6", textColor: "text-white", space: true }, 
    { word: "about", space: true }, { word: "building", space: true }, { word: "things", space: true }, { word: "that", space: true }, { word: "matter.", space: false }
  ],
  [
    { word: "Every", space: true }, { word: "project", space: true }, { word: "sharpens", space: true }, { word: "the", space: true }, 
    { word: "CRAFT", isHighlight: true, highlightColor: "#FFD60A", textColor: "text-black", space: true }, 
    { word: "a", space: true }, { word: "little", space: true }, { word: "more.", space: false }
  ],
  [
    { word: "Driven", space: true }, { word: "by", space: true }, 
    { word: "CURIOSITY,", isHighlight: true, highlightColor: "#2DD4BF", textColor: "text-black", space: true }, 
    { word: "backed", space: true }, { word: "by", space: true }, { word: "real-world", space: true }, { word: "execution.", space: false }
  ],
  [
    { word: "Committed", space: true }, { word: "to", space: true }, { word: "a", space: true }, { word: "level", space: true }, { word: "of", space: true }, 
    { word: "QUALITY", isHighlight: true, highlightColor: "#3B82F6", textColor: "text-white", space: true }, 
    { word: "most", space: true }, { word: "people", space: true }, { word: "skip.", space: false }
  ]
];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1, 
    transition: { 
      staggerChildren: 0.08,
      delayChildren: 0.1
    }
  },
  exit: {
    opacity: 0,
    y: -20,
    transition: {
      duration: 0.4,
      ease: "easeIn" as const
    }
  }
};

const wordVariants: Variants = {
  hidden: { opacity: 0, y: 15 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.4, ease: [0.33, 1, 0.68, 1] as const }
  }
};

export function RotatingText() {
  const [index, setIndex] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true); // Ensures identical render sequence in dev mode strict mode
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % taglines.length);
    }, 4500); 
    return () => clearInterval(timer);
  }, []);

  if (!mounted) {
    return <div className="relative h-[240px] sm:h-[180px] md:h-[150px] w-full" />;
  }

  return (
    <div className="relative h-[240px] sm:h-[180px] md:h-[150px] w-full flex items-center overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="text-2xl sm:text-3xl md:text-4xl font-bold text-white absolute inset-0 leading-snug flex items-center flex-wrap content-center"
        >
          {taglines[index].map((item, i) => {
            const delay = 0.4 + (i * 0.08); // sync highlight timing with word reveal
            return (
              <motion.span 
                key={i} 
                variants={wordVariants}
                className="inline-block"
              >
                {item.isHighlight ? (
                  <span className="relative inline-block">
                    <motion.span 
                      className="relative z-10 px-1"
                      initial={{ color: "#ffffff" }}
                      animate={{ color: item.textColor === "text-black" ? "#000000" : "#ffffff" }}
                      transition={{ delay, duration: 0.2 }}
                    >
                      {item.word}
                    </motion.span>
                    
                    <motion.span
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ delay, duration: 0.5, ease: "easeOut" as const }}
                      className="absolute inset-0 z-[-1] origin-left rounded-sm"
                      style={{ backgroundColor: item.highlightColor }}
                    />
                  </span>
                ) : (
                  <span>{item.word}</span>
                )}
                
                {item.space && <span>&nbsp;</span>}
              </motion.span>
            );
          })}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
