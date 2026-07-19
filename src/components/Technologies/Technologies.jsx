import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./techstack.css";

gsap.registerPlugin(ScrollTrigger);

// ── Split text into individual character spans for GSAP animation ──
const AnimatedHeading = ({ text }) => {
  return (
    <span className="tech-heading__chars">
      {text.split("").map((char, index) => (
        <span
          key={index}
          className="tech-heading__char"
          style={{ display: char === " " ? "inline" : "inline-block" }}
        >
          {char === " " ? "\u00A0" : char}
        </span>
      ))}
    </span>
  );
};

// ── Individual Tech Card with isolated hover animations ──
const TechCard = ({ tech }) => {
  const cardRef = useRef(null);
  const iconRef = useRef(null);
  const nameRef = useRef(null);
  const glowRef = useRef(null);
  const borderRef = useRef(null);

  const handleMouseEnter = () => {
    const card = cardRef.current;
    if (!card) return;

    gsap.to(card, {
      scale: 1.06,
      y: -10,
      duration: 0.4,
      ease: "power3.out",
    });
    gsap.to(iconRef.current, {
      scale: 1.2,
      rotate: 5,
      duration: 0.4,
      ease: "back.out(1.7)",
    });
    gsap.to(nameRef.current, {
      y: -3,
      duration: 0.3,
      ease: "power2.out",
    });
    gsap.to(glowRef.current, {
      opacity: 0.6,
      scale: 1.15,
      duration: 0.5,
      ease: "power2.out",
    });
    gsap.to(borderRef.current, {
      opacity: 1,
      duration: 0.3,
    });
  };

  const handleMouseLeave = () => {
    const card = cardRef.current;
    if (!card) return;

    gsap.to(card, {
      scale: 1,
      y: 0,
      duration: 0.5,
      ease: "power3.out",
    });
    gsap.to(iconRef.current, {
      scale: 1,
      rotate: 0,
      duration: 0.5,
      ease: "power2.out",
    });
    gsap.to(nameRef.current, {
      y: 0,
      duration: 0.35,
      ease: "power2.out",
    });
    gsap.to(glowRef.current, {
      opacity: 0,
      scale: 1,
      duration: 0.5,
      ease: "power2.out",
    });
    gsap.to(borderRef.current, {
      opacity: 0,
      duration: 0.3,
    });
  };

  return (
    <div
      className="techCard"
      ref={cardRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="techCard-glow" ref={glowRef} />
      <div className="techCard-border" ref={borderRef} />
      <div className="techIconWrapper">
        <div className="techIcon" ref={iconRef}>
          {tech.icon}
        </div>
      </div>
      <div className="techName" ref={nameRef}>
        {tech.name}
      </div>
      <div className="techCategory">{tech.category}</div>
    </div>
  );
};

function TechStack() {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const gridRef = useRef(null);

  const technologies = [
    {
      name: "MongoDB",
      category: "database",
      icon: (
        <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M16.62 30.08c-.26-1.03-.55-1.86-.9-2.66-.34-.78-.74-1.5-1.2-2.16-.46-.66-1-1.26-1.6-1.8-.6-.54-1.26-1.02-1.96-1.44-.7-.42-1.44-.78-2.2-1.08-.76-.3-1.54-.54-2.32-.72-.78-.18-1.56-.3-2.34-.36-.78-.06-1.54-.06-2.3 0-.76.06-1.5.18-2.22.36-.72.18-1.42.42-2.08.72-.66.3-1.28.66-1.86 1.08-.58.42-1.12.9-1.6 1.44-.48.54-.9 1.14-1.26 1.8-.36.66-.66 1.38-.9 2.16-.24.78-.42 1.62-.54 2.66-.12 1.04-.18 2.16-.18 3.36 0 1.2.06 2.32.18 3.36.12 1.04.3 1.88.54 2.66.24.78.54 1.5.9 2.16.36.66.78 1.26 1.26 1.8.48.54 1.02 1.02 1.6 1.44.58.42 1.2.78 1.86 1.08.66.3 1.36.54 2.08.72.72.18 1.46.3 2.22.36.76.06 1.52.06 2.3 0 .78-.06 1.56-.18 2.34-.36.78-.18 1.56-.42 2.32-.72.76-.3 1.5-.66 2.2-1.08.7-.42 1.36-.9 1.96-1.44.6-.54 1.14-1.14 1.6-1.8.46-.66.86-1.38 1.2-2.16.35-.8.64-1.63.9-2.66.25-1.03.44-2.15.56-3.35.12-1.2.18-2.32.18-3.36 0-1.04-.06-2.16-.18-3.36-.12-1.2-.31-2.32-.56-3.36z"
            fill="currentColor"
          />
        </svg>
      ),
    },
    {
      name: "Vite",
      category: "build tool",
      icon: (
        <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M29.88 3.28L17.34 28.76c-.38.76-1.46.76-1.84 0L2.96 3.28c-.44-.88.42-1.86 1.34-1.54l11.42 4.18c.28.1.58.1.86 0L28.54 1.74c.92-.32 1.78.66 1.34 1.54zM16.92 11.54l-7.4 12.4c-.18.3.18.64.46.44l7.58-5.48c.2-.14.46-.14.66 0l7.58 5.48c.28.2.64-.14.46-.44l-7.4-12.4c-.18-.3-.64-.3-.82 0z"
            fill="currentColor"
          />
        </svg>
      ),
    },
    {
      name: "React",
      category: "frontend",
      icon: (
        <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M16 11.2c2.65 0 4.8 2.15 4.8 4.8s-2.15 4.8-4.8 4.8-4.8-2.15-4.8-4.8 2.15-4.8 4.8-4.8zm0-2.4c-4 0-7.2 3.2-7.2 7.2s3.2 7.2 7.2 7.2 7.2-3.2 7.2-7.2-3.2-7.2-7.2-7.2z"
            fill="currentColor"
          />
          <ellipse
            cx="16"
            cy="16"
            rx="11"
            ry="4.4"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.2"
          />
          <ellipse
            cx="16"
            cy="16"
            rx="11"
            ry="4.4"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.2"
            transform="rotate(60 16 16)"
          />
          <ellipse
            cx="16"
            cy="16"
            rx="11"
            ry="4.4"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.2"
            transform="rotate(120 16 16)"
          />
        </svg>
      ),
    },
    {
      name: "Node.js",
      category: "backend",
      icon: (
        <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M16 2L3.5 9.25v13.5L16 30l12.5-7.25V9.25L16 2zm-1 4.5v11l-8.5-4.92V9.42L15 6.5zm2 0l8.5 2.92v4.16L17 17.5V6.5zM7.5 18.08L15 22.33v4.17l-7.5-4.34v-4.08zm17 0v4.08L17 26.5v-4.17l7.5-4.25z"
            fill="currentColor"
          />
        </svg>
      ),
    },
    {
      name: "TypeScript",
      category: "language",
      icon: (
        <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M2 2h28v28H2V2zm14.5 14v-2h-3v8h2v-3h1.5v-2H15.5v-1h-1zm4.5 0v-2h-3v8h2v-3h1.5v-2H20v-1h-1z"
            fill="currentColor"
          />
        </svg>
      ),
    },
    {
      name: "Tailwind",
      category: "styling",
      icon: (
        <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M16 8c-2.5 0-4 1.5-4.5 3.5C10.5 8.5 8 7 5.5 7 2.5 7 0 9.5 0 13c0 5.5 6 11 10 14.5 1.5-3 3-7 3-10.5 0-1.5-.5-3-1.5-4 1 1.5 2.5 2.5 4.5 2.5 2.5 0 4-1.5 4.5-3.5 1 3 3.5 4.5 6 4.5 3 0 5.5-2.5 5.5-6 0-5.5-6-11-10-14.5-1.5 3-3 7-3 10.5 0 1.5.5 3 1.5 4-1-1.5-2.5-2.5-4.5-2.5z"
            fill="currentColor"
          />
        </svg>
      ),
    },
    {
      name: "Next.js",
      category: "framework",
      icon: (
        <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M16 2C8.27 2 2 8.27 2 16s6.27 14 14 14 14-6.27 14-14S23.73 2 16 2zm-1 20h-2V10h2v12zm8 0h-2l-6-8v8h-2V10h2l6 8V10h2v12z"
            fill="currentColor"
          />
        </svg>
      ),
    },
    {
      name: "Express",
      category: "backend",
      icon: (
        <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M2 16c0-2.5 2-4.5 4.5-4.5S11 13.5 11 16s-2 4.5-4.5 4.5S2 18.5 2 16zm9 0c0-2.5 2-4.5 4.5-4.5S20 13.5 20 16s-2 4.5-4.5 4.5S11 18.5 11 16zm9 0c0-2.5 2-4.5 4.5-4.5S29 13.5 29 16s-2 4.5-4.5 4.5S20 18.5 20 16z"
            fill="currentColor"
          />
        </svg>
      ),
    },
  ];

  // ── GSAP heading character animation ──
  useEffect(() => {
    const heading = headingRef.current;
    if (!heading) return;

    const chars = heading.querySelectorAll(".tech-heading__char");

    gsap.set(chars, {
      opacity: 0,
      y: 30,
      filter: "blur(6px)",
    });

    gsap.to(chars, {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      duration: 1,
      stagger: 0.06,
      delay: 0.3,
      ease: "power4.out",
      scrollTrigger: {
        trigger: heading,
        start: "top 85%",
        toggleActions: "play none none none",
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach((t) => {
        if (t.vars.trigger === heading) t.kill();
      });
    };
  }, []);

  // ── Grid lines, stars, and card entrance animations ──
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // Grid lines fade in
      gsap.to(".tech-grid__line", {
        opacity: 0.18,
        duration: 2.2,
        stagger: 0.04,
        ease: "power2.out",
        scrollTrigger: {
          trigger: section,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      });

      // Stars pop in
      gsap.to(".tech-star", {
        opacity: 1,
        scale: 1,
        duration: 0.8,
        stagger: 0.08,
        ease: "power2.out",
        scrollTrigger: {
          trigger: section,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      });

      // Cards stagger entrance
      gsap.from(".techCard", {
        opacity: 0,
        y: 60,
        scale: 0.85,
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: gridRef.current,
          start: "top 85%",
          toggleActions: "play none none none",
        },
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section className="techStackSection" id="technologies" ref={sectionRef}>
      {/* Dark aurora background */}
      <div className="tech-bg-dark" aria-hidden="true" />

      {/* Perspective Grid Floor */}
      <div className="tech-grid" aria-hidden="true">
        <div className="tech-grid__floor">
          {Array.from({ length: 20 }).map((_, i) => (
            <div
              key={`h-${i}`}
              className="tech-grid__line tech-grid__line--horizontal"
              style={{ top: `${(i + 1) * 5}%` }}
            />
          ))}
          {Array.from({ length: 20 }).map((_, i) => (
            <div
              key={`v-${i}`}
              className="tech-grid__line tech-grid__line--vertical"
              style={{ left: `${(i + 1) * 5}%` }}
            />
          ))}
        </div>
        <div className="tech-grid__horizon" />
      </div>

      {/* Floating Stars */}
      <div className="tech-stars" aria-hidden="true">
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            className="tech-star"
            style={{
              top: `${Math.random() * 60}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
            }}
          />
        ))}
      </div>

      {/* Heading — terminal style with GSAP letter animation */}
      <div className="tech-heading-wrapper">
        <div className="tech-heading-box" ref={headingRef}>
          <span className="tech-heading__prefix">&gt;</span>
          <h2 className="tech-heading__text">
            <AnimatedHeading text="Technologies We Master" />
          </h2>
          <span className="tech-heading__cursor">_</span>
        </div>
      </div>

      <div className="techStackGrid" ref={gridRef}>
        {technologies.map((tech) => (
          <TechCard key={tech.name} tech={tech} />
        ))}
      </div>
    </section>
  );
}

export default TechStack;