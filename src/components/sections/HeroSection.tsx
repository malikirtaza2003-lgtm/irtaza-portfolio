import { HeroVideo } from "../ui/HeroVideo";
import { TopBar } from "../ui/TopBar";
import TaglineRotator from "../ui/TaglineRotator";
import { ChevronDown } from "lucide-react";
import { LiquidCta } from "../ui/LiquidCta";
import { TechCluster } from "../ui/TechCluster";

export function HeroSection() {
  return (
    <section className="relative w-full h-screen bg-[#000000] overflow-hidden">

      {/* ── DESKTOP: Full-screen background video (lg+) ── */}
      <div className="hidden lg:block absolute inset-0 w-full h-full">
        <HeroVideo />
      </div>

      {/* ── MOBILE LAYOUT (< lg) ── */}
      <div className="flex lg:hidden absolute inset-0 flex-row items-center justify-between px-5 pt-20 pb-10 gap-3 z-10">

        {/* Left: Text + CTA */}
        <div className="flex flex-col justify-center w-[52%] gap-6">
          <TaglineRotator />
          <LiquidCta />
        </div>

        {/* Right: Video preview + Code card */}
        <div className="flex flex-col items-center justify-center w-[44%] gap-4 h-full">
          {/* Clipped video preview */}
          <div className="relative w-full rounded-2xl overflow-hidden border border-white/10 shadow-xl"
               style={{ aspectRatio: "9/14" }}>
            <video
              src="/assets/videos/herovideo.mp4"
              autoPlay
              muted
              playsInline
              loop
              preload="metadata"
              className="w-full h-full object-cover object-top"
              style={{ filter: "contrast(1.05) saturate(0.95) brightness(1.15)" }}
            />
            {/* Subtle overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/10 pointer-events-none" />
          </div>

          {/* Code card widget — visible on mobile here */}
          <TechCluster className="flex w-full h-auto" />
        </div>
      </div>

      {/* ── DESKTOP CONTENT LAYER (lg+) ── */}
      <div className="hidden lg:flex absolute inset-0 z-10 pointer-events-none items-center justify-between px-12 xl:px-24 max-w-[1600px] mx-auto">
        {/* Left Side: Tagline & CTA */}
        <div className="pointer-events-auto w-full max-w-[50%]">
          <TaglineRotator />
          <div className="mt-12">
            <LiquidCta />
          </div>
        </div>

        {/* Right Side: TechCluster code card */}
        <div className="pointer-events-auto flex items-center justify-center w-[400px] h-[400px]">
          <TechCluster className="flex w-[320px] h-[320px]" />
        </div>
      </div>

      {/* Navigation Layer */}
      <TopBar />

      {/* Bottom Scroll Indicator */}
      <div className="absolute bottom-6 sm:bottom-10 left-0 w-full flex flex-col items-center justify-center z-20 pointer-events-none opacity-60">
        <span className="text-white text-xs sm:text-sm tracking-widest uppercase mb-1 font-medium">Scroll to explore</span>
        <div className="animate-pulse">
          <ChevronDown size={24} className="text-white" />
        </div>
      </div>
    </section>
  );
}
