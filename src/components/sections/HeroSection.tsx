import { TopBar } from "../ui/TopBar";
import TaglineRotator from "../ui/TaglineRotator";
import { ChevronDown } from "lucide-react";
import { LiquidCta } from "../ui/LiquidCta";
import { TechCluster } from "../ui/TechCluster";
import { HeroVideo } from "../ui/HeroVideo";

export function HeroSection() {
  return (
    <section className="relative w-full h-screen bg-[#000000] overflow-hidden">

      {/* ── DESKTOP: Full-screen background video (lg+) ── */}
      <div className="hidden lg:block absolute inset-0 w-full h-full">
        <HeroVideo />
      </div>

      {/* ── MOBILE LAYOUT (< lg) ──
          Stack: [TopBar] → [Tagline + CTA, full-width] → [Video | Code card row]
          Nothing overlaps, everything breathes.
      ── */}
      <div className="flex lg:hidden absolute inset-0 flex-col z-10 pt-16 pb-10 px-4 gap-3">

        {/* Row 1: Tagline text — full width, no cramping */}
        <div className="flex-shrink-0">
          <TaglineRotator />
        </div>

        {/* Row 2: CTA button */}
        <div className="flex-shrink-0">
          <LiquidCta />
        </div>

        {/* Row 3: Video (left, bigger) + Code card (right, smaller) */}
        <div className="flex flex-row gap-3 flex-1 min-h-0 overflow-hidden">

          {/* Video — takes 58% of width */}
          <div className="flex-[58] min-w-0 rounded-2xl overflow-hidden border border-white/10 shadow-xl">
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
          </div>

          {/* Code card — takes 42% of width, fluid inside */}
          <div className="flex-[42] min-w-0 flex items-center justify-center overflow-hidden">
            <TechCluster className="flex w-full" />
          </div>

        </div>
      </div>

      {/* ── DESKTOP CONTENT LAYER (lg+) — unchanged ── */}
      <div className="hidden lg:flex absolute inset-0 z-10 pointer-events-none items-center justify-between px-12 xl:px-24 max-w-[1600px] mx-auto">
        <div className="pointer-events-auto w-full max-w-[50%]">
          <TaglineRotator />
          <div className="mt-12">
            <LiquidCta />
          </div>
        </div>
        <div className="pointer-events-auto flex items-center justify-center w-[400px] h-[400px]">
          <TechCluster className="flex w-[320px] h-[320px]" />
        </div>
      </div>

      {/* Navigation Layer */}
      <TopBar />

      {/* Bottom Scroll Indicator */}
      <div className="absolute bottom-5 left-0 w-full flex flex-col items-center justify-center z-20 pointer-events-none opacity-60">
        <span className="text-white text-xs tracking-widest uppercase mb-1 font-medium">Scroll to explore</span>
        <div className="animate-pulse">
          <ChevronDown size={20} className="text-white" />
        </div>
      </div>
    </section>
  );
}
