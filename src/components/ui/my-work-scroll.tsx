"use client";

import { motion, useScroll, useTransform, MotionValue } from "framer-motion";
import React, { useRef } from "react";

type Project = {
  name: string;
  description: string;
  image: string;
  link: string;
  detail: string;
  point: { x: number; y: number };
  top: string;
  align: "left" | "right";
};

const projects: Project[] = [
  {
    name: "SyncFlow",
    description: "AI integrated task management and meeting system",
    image: "/assets/images/syncflow.webp",
    link: "https://sync-flow-tms.vercel.app/",
    detail:
      "Designed an admin-controlled, auth-based (JWT) task management platform supporting unlimited members, departments, and team leads with granular role-based access control. Engineered integration of third-party AI APIs to power intelligent task suggestions inside a custom dashboard, reducing manual workflow effort.",
    point: { x: 30, y: 112 },
    top: "100vh",
    align: "left",
  },
  {
    name: "Fashion Circle",
    description: "E-commerce website",
    image: "/assets/images/fashioncircle.webp",
    link: "https://fashioncircle2026.netlify.app/",
    detail:
      "Delivered a responsive brand showcase website with modular component architecture for scalability. Kept the layout light and image-led, so the collection stays the focus on every screen size.",
    point: { x: 70, y: 198 },
    top: "188vh",
    align: "right",
  },
];

const MyWork = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  const pathLength = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <>
      {/* ── MOBILE LAYOUT (< md) ── */}
      <section
        id="work-mobile"
        className="relative z-10 flex flex-col items-center overflow-hidden rounded-t-[2.5rem] bg-black px-5 py-24 text-white md:hidden"
      >
        <div className="mb-14 flex w-full flex-col items-center gap-4 text-center">
          <h2 className="font-jakarta-sans text-5xl font-medium tracking-[-0.04em]">
            My Work
          </h2>
          <p className="font-jakarta-sans max-w-sm text-base font-medium text-white/60">
            Same commitment, carried all the way through to the last detail.
          </p>
        </div>

        <div className="flex w-full flex-col gap-12">
          {projects.map((project) => (
            <motion.div
              key={project.name}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="flex flex-col gap-5 rounded-2xl border border-white/10 bg-white/[0.03] overflow-hidden"
            >
              {/* Project Image */}
              <div className="relative aspect-[16/10] w-full overflow-hidden">
                <img
                  src={project.image}
                  alt={project.name}
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-cover object-top"
                />
              </div>

              {/* Project Info */}
              <div className="flex flex-col gap-3 px-5 pb-6">
                <h3 className="font-jakarta-sans text-xl font-semibold text-white">
                  {project.name}
                </h3>
                <p className="text-sm leading-snug text-white/60">
                  {project.description}
                </p>
                <p className="text-sm leading-relaxed text-white/70">
                  {project.detail}
                </p>
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 inline-flex w-fit items-center gap-2 rounded-full border border-white/25 px-4 py-2 text-xs font-medium text-white/80 transition-colors duration-300 hover:border-blue-400 hover:bg-blue-400/10 hover:text-white"
                >
                  View project
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── DESKTOP LAYOUT (md+) ── original scroll-animated version */}
      <section
        id="work"
        ref={ref}
        className="relative z-10 hidden h-[280vh] w-screen flex-col items-center overflow-hidden rounded-t-[2.5rem] bg-black px-4 text-white md:flex md:rounded-t-[3.5rem]"
      >
        <div className="relative z-20 mt-28 flex w-fit max-w-2xl flex-col items-center gap-5 text-center md:mt-36">
          <h2 className="font-jakarta-sans text-6xl font-medium tracking-[-0.04em] md:text-8xl">
            My Work
          </h2>
          <p className="font-jakarta-sans max-w-lg text-lg font-medium text-white/60 md:text-xl">
            Same commitment, carried all the way through to the last detail.
          </p>
        </div>

        <LinePath pathLength={pathLength} points={projects.map((p) => p.point)} />

        {projects.map((project) => (
          <React.Fragment key={project.name}>
            <ProjectCard project={project} />
            <ProjectDetail project={project} />
          </React.Fragment>
        ))}
      </section>
    </>
  );
};

export { MyWork };

const LinePath = ({
  pathLength,
  points,
}: {
  pathLength: MotionValue<number>;
  points: { x: number; y: number }[];
}) => {
  const d = `M50,0 C50,55 22,70 ${points[0].x},${points[0].y}
             C${points[0].x + 15},${points[0].y + 35} ${points[1].x - 15},${points[1].y - 35} ${points[1].x},${points[1].y}
             C${points[1].x - 8},${points[1].y + 30} 50,${points[1].y + 45} 50,280`;

  // Extract the derived transform to a stable variable (not inline in JSX)
  const strokeDashoffset = useTransform(pathLength, (v) => 1 - v);

  return (
    <svg
      className="pointer-events-none absolute left-0 top-0 z-0 h-full w-full"
      viewBox="0 0 100 280"
      preserveAspectRatio="none"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <motion.path
        d={d}
        stroke="#3B82F6"
        strokeWidth="3"
        vectorEffect="non-scaling-stroke"
        strokeLinecap="round"
        style={{
          pathLength,
          strokeDashoffset,
        }}
      />
      {points.map((p, i) => (
        <Dot key={i} x={p.x} y={p.y} />
      ))}
    </svg>
  );
};


const Dot = ({ x, y }: { x: number; y: number }) => (
  <motion.circle
    cx={x}
    cy={y}
    r="1.6"
    fill="#3B82F6"
    initial={{ opacity: 0, scale: 0 }}
    whileInView={{ opacity: 1, scale: 1 }}
    viewport={{ once: true, margin: "-30% 0px -30% 0px" }}
    transition={{ duration: 0.4, ease: "easeOut" }}
    style={{ transformOrigin: `${x}px ${y}px` }}
  />
);

const ProjectCard = ({ project }: { project: Project }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-20% 0px -20% 0px" }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      style={{ top: project.top }}
      className={`group absolute z-20 w-[270px] overflow-hidden rounded-2xl border border-white/15 bg-white/[0.03] transition-colors duration-300 hover:border-blue-400/60 md:w-[340px] ${
        project.align === "left" ? "left-[8%]" : "right-[8%]"
      }`}
    >
      <div className="relative aspect-[16/10] w-full overflow-hidden">
        <img
          src={project.image}
          alt={project.name}
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
        />
      </div>

      <div className="flex flex-col gap-2 p-4">
        <h3 className="font-jakarta-sans text-lg font-semibold text-white">
          {project.name}
        </h3>
        <p className="text-sm leading-snug text-white/60">
          {project.description}
        </p>
        
        <a
          href={project.link}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-1 inline-flex w-fit items-center gap-2 rounded-full border border-white/25 px-4 py-2 text-xs font-medium text-white/80 transition-colors duration-300 group-hover:border-blue-400 group-hover:bg-blue-400/10 group-hover:text-white"
        >
          View project
        </a>
      </div>
    </motion.div>
  );
};

const ProjectDetail = ({ project }: { project: Project }) => {
  const detailAlign = project.align === "left" ? "right" : "left";
  const widthClass =
    project.detail.length > 220 ? "w-[300px] md:w-[380px]" : "w-[260px] md:w-[300px]";

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-20% 0px -20% 0px" }}
      transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
      style={{ top: `calc(${project.top} + 100px)` }}
      className={`absolute z-20 ${widthClass} text-left ${
        detailAlign === "left" ? "left-[8%]" : "right-[8%]"
      }`}
    >
      <p className="font-jakarta-sans text-base leading-relaxed text-white/70 md:text-lg">
        {project.detail}
      </p>
    </motion.div>
  );
};
