import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./Projects.css";

gsap.registerPlugin(ScrollTrigger);

// Split text into individual character spans for GSAP animation
const AnimatedHeading = ({ text }) => {
  return (
    <span className="projects-heading__chars">
      {text.split("").map((char, index) => (
        <span
          key={index}
          className="projects-heading__char"
          style={{ display: char === " " ? "inline" : "inline-block" }}
        >
          {char === " " ? "\u00A0" : char}
        </span>
      ))}
    </span>
  );
};

function Project() {
  const sectionRef = useRef(null);
  const wrapperRef = useRef(null);
  const headingRef = useRef(null);

  const projects = [
    {
      id: "01",
      title: "exceptional ias coaching academy",
      description:
        "exceptional IAS is a leading educational platform that provides comprehensive resources and guidance for students preparing for the Indian Administrative Service (IAS) exams.",
      tags: ["react", "node.js", "express", "mongodb", "socket.io", "gsap"],
      image: "/images/exceptional_ias.png",
      viewProject: "https://exceptional-ias.vercel.app",
      viewDetails: "#",
    },
    {
      id: "02",
      title: "shoeshub e-commerce store",
      description:
        "shoeShub is a modern e-commerce platform for footwear, featuring product listings, cart functionality, secure checkout, and responsive design for an optimal shopping experience.",
      tags: ["react", "node.js", "express", "mongodb", "stripe", "responsive design"],
      image: "/images/shoeshub.png",
      viewProject: "https://shoeshubpoonch.vercel.app/",
      viewDetails: "#",
    },
    {
      id: "03",
      title: "fitspace gym-fitness center",
      description:
        "fitSpace is a modern and responsive website for a gym and fitness center, showcasing services, trainers, class schedules, and membership options with an interactive user experience.",
      tags: ["next.js", "react", "tailwindcss", "typescript", "framer motion", "responsive design", "seo-optimization"],
      image: "/images/gymimg.png",
      viewProject: "https://fitspacegym.vercel.app/",
      viewDetails: "#",
    },
    {
      id: "04",
      title: "citadel library study space",
      description:
        "A calm, well-structured website for a library and study space featuring memberships, seating, and resources.",
      tags: ["next.js", "react", "typescript", "tailwindcss", "responsive design", "seo-optimization"],
      image: "/images/library.png",
      viewProject: "https://citadellibrary.vercel.app/",
      viewDetails: "#",
    },
    {
      id: "05",
      title: "orthopedic care website",
      description:
        "A professional website for an orthopedic care center, providing information about services, treatments, and patient resources.",
      tags: ["next.js", "react", "tailwindcss", "typescript", "framer motion", "responsive design", "seo-optimization"],
      image: "/images/medicalweb.png",
      viewProject: "https://drjibranbashir.com/",
      viewDetails: "#",
    },
    {
      id: "06",
      title: "saibbyweb office dashboard",
      description:
        "A comprehensive office management dashboard for efficient task tracking, employee management, and data visualization, enhancing productivity and collaboration within the organization.",
      tags: ["svelte", "typescript", "graphql", "docker"],
      image: "/images/saibbyweb.png",
      viewProject: "https://sw-office.vercel.app/",
      viewDetails: "#",
    },
  ];

  const openExternalLink = (url) => {
    if (!url || url.includes("yourusername") || url === "https://www.google.com") {
      console.warn("Invalid or placeholder URL detected:", url);
      return;
    }
    window.open(url, "_blank", "noopener,noreferrer");
  };

  useEffect(() => {
    const section = sectionRef.current;
    const wrapper = wrapperRef.current;
    const cards = gsap.utils.toArray(".projectCard");

    if (!section || !wrapper || cards.length === 0) return;

    const ctx = gsap.context(() => {
      // Set wrapper as relative with fixed height
      gsap.set(wrapper, { position: "relative", height: "520px" });

      // Set all cards absolutely positioned
      gsap.set(cards, {
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
      });

      // First card visible at top, others stacked below
      gsap.set(cards[0], { y: 0, opacity: 1, scale: 1, zIndex: cards.length });
      cards.slice(1).forEach((card, i) => {
        gsap.set(card, {
          y: "100%",
          opacity: 0,
          scale: 0.95,
          zIndex: cards.length - i - 1,
        });
      });

      const masterTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => `+=${(cards.length - 1) * window.innerHeight * 0.8}`,
          pin: true,
          scrub: 1.5,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          snap: {
            snapTo: (progress) => {
              const step = 1 / (cards.length - 1);
              return Math.round(progress / step) * step;
            },
            duration: { min: 0.15, max: 0.35 },
            ease: "power2.inOut",
            delay: 0,
          },
        },
      });

      cards.forEach((card, index) => {
        if (index === cards.length - 1) return;

        const nextCard = cards[index + 1];

        const currentNumber = card.querySelector(".projectNumber");
        const currentTitle = card.querySelector(".projectTitle");
        const currentDesc = card.querySelector(".projectDescription");
        const currentTags = card.querySelectorAll(".techTag");
        const currentButtons = card.querySelector(".projectButtons");
        const currentImage = card.querySelector(".projectImage");

        const nextNumber = nextCard.querySelector(".projectNumber");
        const nextTitle = nextCard.querySelector(".projectTitle");
        const nextDesc = nextCard.querySelector(".projectDescription");
        const nextTags = nextCard.querySelectorAll(".techTag");
        const nextButtons = nextCard.querySelector(".projectButtons");
        const nextImage = nextCard.querySelector(".projectImage");

        const stepStart = index;
        const stepEnd = index + 1;
        const midPoint = stepStart + 0.5;

        // === CURRENT CARD EXITS (0% to 50% of step) ===
        masterTl.fromTo(
          [currentNumber, currentTitle, currentDesc],
          { y: 0, opacity: 1 },
          {
            y: -40,
            opacity: 0,
            duration: 0.5,
            stagger: 0.02,
            ease: "power2.inOut",
          },
          stepStart
        );

        masterTl.fromTo(
          currentTags,
          { y: 0, scale: 1, opacity: 1 },
          {
            y: -20,
            scale: 0.8,
            opacity: 0,
            duration: 0.4,
            stagger: 0.02,
            ease: "power2.inOut",
          },
          stepStart + 0.05
        );

        masterTl.fromTo(
          currentButtons,
          { y: 0, opacity: 1 },
          {
            y: -20,
            opacity: 0,
            duration: 0.4,
            ease: "power2.inOut",
          },
          stepStart + 0.05
        );

        masterTl.fromTo(
          currentImage,
          { y: 0, opacity: 1 },
          {
            y: -60,
            opacity: 0,
            duration: 0.5,
            ease: "power2.inOut",
          },
          stepStart
        );

        // Slide current card UP and out
        masterTl.fromTo(
          card,
          { y: 0, opacity: 1, scale: 1 },
          {
            y: "-100%",
            opacity: 0,
            scale: 0.92,
            duration: 0.5,
            ease: "power2.inOut",
          },
          stepStart + 0.15
        );

        // === NEXT CARD ENTERS (50% to 100% of step) ===
        masterTl.fromTo(
          nextCard,
          { y: "100%", opacity: 0, scale: 0.95 },
          { y: 0, opacity: 1, scale: 1, duration: 0.5, ease: "power2.out" },
          midPoint
        );

        masterTl.fromTo(
          [nextNumber, nextTitle, nextDesc],
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.4,
            stagger: 0.04,
            ease: "power2.out",
          },
          midPoint + 0.05
        );

        masterTl.fromTo(
          nextTags,
          { y: 20, scale: 0.8, opacity: 0 },
          {
            y: 0,
            scale: 1,
            opacity: 1,
            duration: 0.3,
            stagger: 0.03,
            ease: "back.out(1.5)",
          },
          midPoint + 0.15
        );

        masterTl.fromTo(
          nextButtons,
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.3, ease: "power2.out" },
          midPoint + 0.2
        );

        masterTl.fromTo(
          nextImage,
          { y: 60, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.4, ease: "power2.out" },
          midPoint + 0.05
        );
      });

      // === GRID LINES ANIMATION ===
      gsap.to(".projects-grid__line", {
        opacity: 0.15,
        duration: 2,
        stagger: 0.05,
        ease: "power2.out",
        scrollTrigger: {
          trigger: section,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      });

      // === STARS ANIMATION ===
      gsap.to(".projects-star", {
        opacity: 1,
        scale: 1,
        duration: 0.6,
        stagger: 0.1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: section,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      });
    }, section);

    return () => ctx.revert();
  }, []);

  // GSAP heading character animation
  useEffect(() => {
    const heading = headingRef.current;
    if (!heading) return;

    const chars = heading.querySelectorAll(".projects-heading__char");

    gsap.set(chars, {
      opacity: 0,
      y: 20,
      filter: "blur(4px)",
    });

    gsap.to(chars, {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      duration: 0.9,
      stagger: 0.07,
      delay: 0.2,
      ease: "power3.out",
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

  return (
    <section className="projects-section" id="projects" ref={sectionRef}>
      {/* Dark Background */}
      <div className="projects-bg-dark" aria-hidden="true" />

      {/* Perspective Grid Floor */}
      <div className="projects-grid" aria-hidden="true">
        <div className="projects-grid__floor">
          {Array.from({ length: 20 }).map((_, i) => (
            <div key={`h-${i}`} className="projects-grid__line projects-grid__line--horizontal" style={{ top: `${(i + 1) * 5}%` }} />
          ))}
          {Array.from({ length: 20 }).map((_, i) => (
            <div key={`v-${i}`} className="projects-grid__line projects-grid__line--vertical" style={{ left: `${(i + 1) * 5}%` }} />
          ))}
        </div>
        <div className="projects-grid__horizon" />
      </div>

      {/* Floating Stars */}
      <div className="projects-stars" aria-hidden="true">
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            className="projects-star"
            style={{
              top: `${Math.random() * 60}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
            }}
          />
        ))}
      </div>

      {/* Heading — replaces the old recentProjects(); tag */}
      <div className="projects-heading-wrapper">
        <div className="projects-heading-box" ref={headingRef}>
          <h2 className="projects-heading__text">
            <AnimatedHeading text="> Our Recent Projects_" />
          </h2>
        </div>
      </div>

      {/* Projects Container */}
      <div className="projectsContainer" ref={wrapperRef}>
        {projects.map((project) => (
          <div className="projectCard" key={project.id}>
            <div className="projectInfo">
              <div className="projectNumber">{project.id}</div>
              <h3 className="projectTitle">{project.title}</h3>
              <p className="projectDescription">{project.description}</p>
              <div className="techTags">
                {project.tags.map((tag) => (
                  <span className="techTag" key={tag}>
                    {tag}
                  </span>
                ))}
              </div>
              <div className="projectButtons">
                <button
                  onClick={() => openExternalLink(project.viewProject)}
                  className="btn btnPrimary"
                >
                  view project <span className="arrowIcon">↗</span>
                </button>
                <button
                  onClick={() => openExternalLink(project.viewDetails)}
                  className="btn btnSecondary"
                >
                  view details <span className="arrowIcon">↗</span>
                </button>
              </div>
            </div>

            <div className="projectImage">
              <img src={project.image} alt={project.title} />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Project;