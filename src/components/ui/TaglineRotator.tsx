"use client";
import { useState, useEffect, useRef } from "react";
import { AnimatePresence, motion, useInView } from "framer-motion";

const taglines = [
  { text: "Irtaza Tahir — ", highlight: "PASSIONATE", rest: " about building things that matter.", color: "#3B82F6" },
  { text: "Every project sharpens the ", highlight: "CRAFT", rest: " a little more.", color: "#FFD60A" },
  { text: "Driven by ", highlight: "CURIOSITY", rest: ", backed by real-world execution.", color: "#2DD4BF" },
  { text: "Committed to a level of ", highlight: "QUALITY", rest: " most people skip.", color: "#3B82F6" },
];

export default function TaglineRotator() {
  const [index, setIndex] = useState(0);
  const containerRef = useRef(null);
  const isInView = useInView(containerRef);

  useEffect(() => {
    if (!isInView) return;
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % taglines.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [isInView]);

  const current = taglines[index];

  return (
    <div className="relative min-h-[120px] md:min-h-[160px] max-w-[420px]" ref={containerRef}>
      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="text-2xl md:text-4xl font-bold text-white leading-tight"
        >
          {current.text}
          <span className="relative inline-block">
            <motion.span
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
              style={{ backgroundColor: current.color, transformOrigin: "left" }}
              className="absolute inset-0 -z-10"
            />
            <span className="relative px-1">{current.highlight}</span>
          </span>
          {current.rest}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
