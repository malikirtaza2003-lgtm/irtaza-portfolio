"use client";

import { useEffect, useRef } from "react";

export function HeroVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Use a small delay to ensure the tracker is in the DOM
    const initObserver = () => {
      const section = document.getElementById("hero-tracker");
      if (!section) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            video.currentTime = 0;
            video.playbackRate = 1.0;
            video.play().catch(() => {});
          } else {
            video.pause();
          }
        },
        { threshold: 0.5 }
      );

      observer.observe(section);
      return observer;
    };

    let observer = initObserver();
    
    // Fallback if tracker wasn't immediately ready
    if (!observer) {
      setTimeout(() => {
        observer = initObserver();
      }, 500);
    }

    return () => {
      if (observer) observer.disconnect();
    };
  }, []);

  return (
    <>
      <div className="absolute inset-0 w-full h-full flex items-end justify-center">
        <video
          ref={videoRef}
          src="/assets/videos/herovideo.mp4"
          muted
          playsInline
          preload="metadata"
          className="w-full h-[90%] object-contain object-bottom z-0"
          style={{ filter: "contrast(1.05) saturate(0.95) brightness(1.2)" }} 
          onEnded={(e) => {
            // Freeze on last frame
            e.currentTarget.pause();
          }}
        />
      </div>
      {/* Dark overlay (20-30% opacity) so text stays readable */}
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-black/30 via-black/20 to-black/30 pointer-events-none" />
    </>
  );
}
