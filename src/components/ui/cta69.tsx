"use client";

import { useState, useEffect } from "react";
import { ArrowRight } from "lucide-react";
import ShaderBackground from "@/components/ui/animated-shader-background";

const Instagram = ({ size = 24 }: { size?: number }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
    <path d="M16.113 11.95A4.5 4.5 0 1 1 11.95 7.5a4.5 4.5 0 0 1 4.163 4.45z"/>
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
  </svg>
);

const Facebook = ({ size = 24 }: { size?: number }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
  </svg>
);

const Linkedin = ({ size = 24 }: { size?: number }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
    <rect width="4" height="12" x="2" y="9"/>
    <circle cx="4" cy="4" r="2"/>
  </svg>
);

const PLACEHOLDER_QUESTIONS = [
  "What do you want to build?",
  "A website for your business?",
  "A dashboard or web app?",
  "Something else entirely?",
];

const MARQUEE_PHRASE = "Build. Ship. Repeat.";
const REPEATS = 8;

function useTypewriterPlaceholder(questions: string[]) {
  const [text, setText] = useState("");
  const [qIndex, setQIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = questions[qIndex];
    let timeout: ReturnType<typeof setTimeout>;

    if (!deleting && text.length < current.length) {
      timeout = setTimeout(() => setText(current.slice(0, text.length + 1)), 50);
    } else if (!deleting && text.length === current.length) {
      timeout = setTimeout(() => setDeleting(true), 1500);
    } else if (deleting && text.length > 0) {
      timeout = setTimeout(() => setText(current.slice(0, text.length - 1)), 30);
    } else if (deleting && text.length === 0) {
      setDeleting(false);
      setQIndex((prev) => (prev + 1) % questions.length);
    }

    return () => clearTimeout(timeout);
  }, [text, deleting, qIndex, questions]);

  return text;
}

export function Cta69({ className }: { className?: string }) {
  const placeholder = useTypewriterPlaceholder(PLACEHOLDER_QUESTIONS);
  const marqueeLine = `${MARQUEE_PHRASE} · `.repeat(REPEATS);

  return (
    <section
      id="contact"
      className={`relative z-40 -mt-16 flex min-h-screen w-full flex-col items-center justify-center overflow-hidden rounded-t-[2.5rem] bg-black px-4 py-16 md:-mt-28 md:rounded-t-[3.5rem] md:px-6 ${className || ""}`}
    >
      <div className="absolute inset-0 z-0 pointer-events-none">
        <ShaderBackground />
      </div>

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 flex items-center overflow-hidden select-none z-[1]"
      >
        <div className="marquee-scroll flex w-max shrink-0 whitespace-nowrap text-white/[0.03]">
          {[0, 1].map((copy) => (
            <span
              key={copy}
              className="font-jakarta-sans text-[22vw] font-bold leading-none tracking-tighter md:text-[16vw]"
            >
              {marqueeLine}
            </span>
          ))}
        </div>
      </div>

      <div className="relative z-10 mx-auto flex max-w-3xl flex-col items-center text-center">
        <h2 className="font-clash text-balance text-4xl font-medium leading-[1.05] tracking-tight text-white md:text-5xl lg:text-6xl">
          Have an idea? Let's bring it to life.
        </h2>

        <p className="mt-6 max-w-xl text-balance text-lg font-medium text-gray-400 md:text-xl">
          Share what you're working on and I'll get back to you within a day.
        </p>

        <div className="mt-12 w-full max-w-md">
          <div className="relative flex items-center rounded-lg border border-white/15 bg-[#111] px-5 py-4 transition-colors focus-within:border-white/40">
            <input
              type="text"
              placeholder={placeholder}
              className="w-full bg-transparent text-white placeholder:text-gray-500 outline-none font-medium"
            />
            <button
              type="button"
              aria-label="Submit"
              className="ml-3 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20 hover:text-[#FFD60A]"
            >
              <ArrowRight size={16} />
            </button>
          </div>
        </div>

        <div className="mt-10 flex items-center gap-6">
          <a
            href="https://www.instagram.com/malik._.irtaza/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-500 transition-all hover:scale-110 hover:text-[#FFD60A]"
            aria-label="Instagram"
          >
            <Instagram size={24} />
          </a>
          <a
            href="https://web.facebook.com/Malik.itti.10/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-500 transition-all hover:scale-110 hover:text-[#FFD60A]"
            aria-label="Facebook"
          >
            <Facebook size={24} />
          </a>
          <a
            href="https://linkedin.com/in/irtaza-ali13"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-500 transition-all hover:scale-110 hover:text-[#FFD60A]"
            aria-label="LinkedIn"
          >
            <Linkedin size={24} />
          </a>
        </div>
      </div>
    </section>
  );
}

export default Cta69;
