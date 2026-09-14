"use client";

import { motion, AnimatePresence } from "framer-motion";
import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

type Testimonial = {
  name: string;
  role: string;
  image: string;
  quote: string;
  tag: string;
};

const testimonials: Testimonial[] = [
  {
    name: "University of South Asia",
    role: "Computer Science Dept.",
    image: "/assets/images/uni.png",
    quote:
      "He never treated a project like it was just for a grade. He was always building side projects and helping classmates debug their code late at night. One of the most dedicated students we've had.",
    tag: "Mentor",
  },
  {
    name: "Kane",
    role: "Project Lead",
    image: "/assets/images/kane%20usa.jpg",
    quote:
      "Irtaza actually answers messages when he says he will. He took over a pretty messy codebase for us and got the new dashboard running in about half the time we budgeted. Really solid work.",
    tag: "Client — USA",
  },
  {
    name: "Olivia",
    role: "E-commerce Founder",
    image: "/assets/images/olivia.jpg",
    quote:
      "We hopped on one call to explain the store layout, and he just got it. I didn't have to micromanage anything. The site feels incredibly fast now and the mobile layout is perfect.",
    tag: "Client — Australia",
  },
  {
    name: "Umar",
    role: "Startup Founder",
    image: "/assets/images/umar%20saudia.jpg",
    quote:
      "Honestly, he saved our launch. We needed the admin panel done in a week, and he delivered it fully working with no weird bugs. Super easy to talk to as well.",
    tag: "Client — Saudi Arabia",
  },
];

gsap.registerPlugin(ScrollTrigger);

/* ─── Mobile auto-rotating testimonials ─── */
function MobileTestimonials() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(1); // 1 = forward, -1 = backward

  useEffect(() => {
    const timer = setInterval(() => {
      setDirection(1);
      setActiveIndex((prev) => (prev + 1) % testimonials.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const t = testimonials[activeIndex];

  return (
    <div className="block pb-24 pt-24 md:hidden">
      {/* Header */}
      <div className="mb-12 flex flex-col items-center gap-3 text-center">
        <h2 className="font-jakarta-sans text-4xl font-medium tracking-[-0.03em] text-white">
          In Their Words
        </h2>
        <p className="font-jakarta-sans max-w-lg text-base font-medium text-white/60">
          What clients and mentors say after working together.
        </p>
      </div>

      {/* Single rotating card */}
      <div className="relative min-h-[280px] w-full overflow-hidden">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={activeIndex}
            custom={direction}
            initial={{ opacity: 0, x: direction * 60 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: direction * -60 }}
            transition={{ duration: 0.45, ease: "easeInOut" }}
            className="relative flex flex-col justify-between overflow-hidden rounded-[24px] border border-white/[0.08] bg-[#141414] p-6"
          >
            <div className="absolute bottom-0 left-0 top-0 w-[3px] bg-gradient-to-b from-[#3B82F6]/50 to-[#FFD60A]/50" />
            <div className="flex h-full flex-col gap-6">
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-4">
                  <img
                    src={t.image}
                    alt={t.name}
                    loading="lazy"
                    decoding="async"
                    className="h-14 w-14 shrink-0 rounded-full border-[1.5px] border-white/20 object-cover"
                  />
                  <div className="flex flex-col">
                    <h3 className="font-jakarta-sans text-lg font-semibold text-white">
                      {t.name}
                    </h3>
                    <p className="text-sm font-medium text-white/50">{t.role}</p>
                  </div>
                </div>
                <div className="shrink-0 rounded-full border border-white/10 px-3 py-1 text-[10px] font-medium uppercase tracking-wider text-white/40">
                  {t.tag}
                </div>
              </div>
              <p className="text-base leading-relaxed text-white/80">
                &ldquo;{t.quote}&rdquo;
              </p>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Dot indicators */}
      <div className="mt-6 flex items-center justify-center gap-3">
        {testimonials.map((_, i) => (
          <button
            key={i}
            onClick={() => {
              setDirection(i > activeIndex ? 1 : -1);
              setActiveIndex(i);
            }}
            className={`rounded-full transition-all duration-300 ${
              i === activeIndex
                ? "h-2.5 w-6 bg-blue-400"
                : "h-2 w-2 bg-white/30"
            }`}
          />
        ))}
      </div>
    </div>
  );
}

/* ─── Desktop scroll-pinned testimonials ─── */
function DesktopTestimonials() {
  const sectionRef = useRef<HTMLElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const pinEl = pinRef.current;
    const cardsEl = cardsRef.current;
    if (!pinEl || !cardsEl) return;

    const mm = gsap.matchMedia();

    mm.add("(min-width: 768px)", () => {
      const cards = gsap.utils.toArray<HTMLElement>(
        cardsEl.querySelectorAll(".testimonial-card")
      );
      const dots = gsap.utils.toArray<HTMLElement>(
        cardsEl.querySelectorAll(".testimonial-dot")
      );
      const totalCards = cards.length;
      if (totalCards === 0) return;

      gsap.set(cards, {
        opacity: 0,
        scale: 0.92,
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        margin: "auto",
      });
      gsap.set(cards[0], { opacity: 1, scale: 1 });
      gsap.set(dots, { opacity: 0.3, scale: 1 });
      gsap.set(dots[0], { opacity: 1, scale: 1.2 });

      let lastActiveIndex = 0;

      const trigger = ScrollTrigger.create({
        trigger: pinEl,
        start: "top top",
        end: () => `+=${window.innerHeight * (totalCards - 1)}`,
        pin: true,
        pinSpacing: true,
        scrub: 0.3,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          const activeIndex = Math.min(
            totalCards - 1,
            Math.floor(self.progress * totalCards)
          );

          if (activeIndex === lastActiveIndex) return;
          lastActiveIndex = activeIndex;

          cards.forEach((card, i) => {
            const isActive = i === activeIndex;
            gsap.set(card, { opacity: isActive ? 1 : 0, scale: isActive ? 1 : 0.92 });
            gsap.set(dots[i], {
              opacity: isActive ? 1 : 0.3,
              scale: isActive ? 1.2 : 1,
            });
          });
        },
      });

      ScrollTrigger.refresh();

      return () => {
        trigger.kill();
      };
    });

    return () => mm.revert();
  }, []);

  return (
    <div className="hidden md:block" ref={sectionRef as React.RefObject<HTMLDivElement>}>
      <div ref={pinRef} className="h-screen w-full">
        <div
          ref={cardsRef}
          className="relative flex h-full w-full flex-col items-center justify-center pt-10"
        >
          <div className="mb-10 w-full text-center">
            <h2 className="font-jakarta-sans text-4xl font-medium tracking-[-0.03em] text-white md:text-5xl">
              In Their Words
            </h2>
            <p className="font-jakarta-sans mx-auto mt-4 max-w-lg text-base font-medium text-white/60 md:text-lg">
              What clients and mentors say after working together.
            </p>
          </div>

          <div className="relative h-[240px] w-full max-w-[580px]">
            {testimonials.map((t) => (
              <div
                key={t.name}
                className="testimonial-card absolute inset-0 flex h-full w-full flex-col justify-start gap-6 overflow-hidden rounded-[24px] border border-white/[0.08] bg-[#141414] p-7"
              >
                <div className="absolute bottom-0 left-0 top-0 w-[4px] bg-gradient-to-b from-[#3B82F6]/50 to-[#FFD60A]/50" />
                <div className="flex h-full flex-col gap-6">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex min-w-0 flex-1 items-center gap-4">
                      <img
                        src={t.image}
                        alt={t.name}
                        loading="lazy"
                        decoding="async"
                        className="h-16 w-16 shrink-0 rounded-full border-[1.5px] border-white/20 object-cover"
                      />
                      <div className="flex min-w-0 flex-col">
                        <h3 className="truncate font-jakarta-sans text-xl font-semibold text-white">
                          {t.name}
                        </h3>
                        <p className="truncate text-base font-medium text-white/50">
                          {t.role}
                        </p>
                      </div>
                    </div>
                    <div className="shrink-0 rounded-full border border-white/10 px-4 py-1.5 text-xs font-medium uppercase tracking-wider text-white/40">
                      {t.tag}
                    </div>
                  </div>
                  <p className="text-lg leading-relaxed text-white/80">
                    &ldquo;{t.quote}&rdquo;
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 flex gap-4">
            {testimonials.map((_, i) => (
              <div
                key={i}
                className="testimonial-dot h-2 w-2 rounded-full bg-white"
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── Main export ─── */
const Testimonials = () => {
  return (
    <section className="relative z-30 -mt-16 w-screen rounded-t-[2.5rem] bg-black px-6 md:-mt-28 md:rounded-t-[3.5rem]">
      <MobileTestimonials />
      <DesktopTestimonials />
    </section>
  );
};

export { Testimonials };
