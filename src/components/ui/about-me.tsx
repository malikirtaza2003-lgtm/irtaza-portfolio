"use client";

import React from "react";

type TimelineItem = {
  title: string;
  org: string;
  duration: string;
  description: string;
};

const timeline: TimelineItem[] = [
  {
    title: "Bachelor's in Computer Science",
    org: "University of South Asia",
    duration: "Graduated 2026",
    description:
      "Built the fundamentals — data structures, algorithms, and software design — that everything after this was built on.",
  },
  {
    title: "Freelance Software Developer",
    org: "Self-employed",
    duration: "2 years",
    description:
      "Worked directly with clients across the US, Saudi Arabia, and Australia — taking projects from a first call to a shipped product.",
  },
  {
    title: "Full Stack Developer",
    org: "Tenbit Solutions",
    duration: "1 year — Present",
    description:
      "Building high-quality web applications, AI-powered chatbots, and websites for clients as part of the core dev team.",
  },
];

const AboutMe = () => {
  return (
    <section className="relative z-20 -mt-16 w-screen rounded-t-[2.5rem] bg-black px-6 pb-32 pt-24 text-white md:-mt-28 md:rounded-t-[3.5rem] md:px-16 md:pt-32">
      <div className="mx-auto max-w-4xl">
        <div className="mb-16 flex flex-col gap-4 md:mb-24">
          <h2 className="font-jakarta-sans text-5xl font-medium tracking-[-0.03em] md:text-7xl">
            About Me
          </h2>
          <p className="font-jakarta-sans max-w-lg text-lg font-medium text-white/60 md:text-xl">
            The path so far — school, freelance, and where I build today.
          </p>
        </div>

        <div className="relative flex flex-col gap-16 md:gap-20">
          <div className="absolute left-[7px] top-2 h-[calc(100%-2rem)] w-px bg-[#FFD60A]/30 md:left-[9px]" />

          {timeline.map((item) => (
            <div key={item.title} className="relative flex gap-6 md:gap-10 pl-8 md:pl-12">
              <span className="absolute left-0 top-2 h-3.5 w-3.5 rounded-full border-2 border-[#FFD60A] bg-black md:h-[18px] md:w-[18px]" />

              <div className="flex flex-1 flex-col gap-2 md:flex-row md:items-baseline md:justify-between md:gap-8">
                <div className="flex flex-col gap-1.5">
                  <h3 className="font-jakarta-sans text-xl font-semibold text-white md:text-2xl">
                    {item.title}
                  </h3>
                  <p className="text-sm font-medium text-[#FFD60A] md:text-base">
                    {item.org}
                  </p>
                  <p className="max-w-md text-sm leading-relaxed text-white/60 md:text-base">
                    {item.description}
                  </p>
                </div>

                <span className="shrink-0 text-sm font-medium text-white/40 md:text-base">
                  {item.duration}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export { AboutMe };
