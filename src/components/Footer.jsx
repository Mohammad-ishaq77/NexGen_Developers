import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./footer.css";

gsap.registerPlugin(ScrollTrigger);

function Footer() {
  const buttonRef = useRef(null);
  const headingRef = useRef(null);
  const subtextRef = useRef(null);
  const ctaRef = useRef(null);
  const contactGridRef = useRef(null);
  const bottomBarRef = useRef(null);
  const connectWordRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Heading word animation (not character - to preserve spacing)
      const headingText = headingRef.current;
      if (headingText) {
        const words = headingText.querySelectorAll(".word");

        gsap.from(words, {
          opacity: 0,
          y: 60,
          rotateX: -45,
          duration: 0.8,
          stagger: 0.08,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: ctaRef.current,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        });
      }

      // Subtext fade + slide up
      gsap.from(subtextRef.current, {
        opacity: 0,
        y: 30,
        duration: 1,
        delay: 0.6,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ctaRef.current,
          start: "top 85%",
          toggleActions: "play none none none",
        },
      });

      // Button scale-in
      gsap.from(buttonRef.current, {
        opacity: 0,
        scale: 0.5,
        duration: 0.8,
        delay: 0.9,
        ease: "elastic.out(1, 0.5)",
        scrollTrigger: {
          trigger: ctaRef.current,
          start: "top 85%",
          toggleActions: "play none none none",
        },
      });

      // Contact blocks stagger in
      const contactBlocks = contactGridRef.current?.querySelectorAll(".contactBlock");
      if (contactBlocks) {
        gsap.from(contactBlocks, {
          opacity: 0,
          y: 50,
          duration: 0.8,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: contactGridRef.current,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        });
      }

      // Bottom bar slide up
      gsap.from(bottomBarRef.current, {
        opacity: 0,
        y: 30,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: {
          trigger: bottomBarRef.current,
          start: "top 95%",
          toggleActions: "play none none none",
        },
      });

      // Connect word glow pulse - blue color
      gsap.to(connectWordRef.current, {
        textShadow: "0 0 20px rgba(59, 130, 246, 0.6), 0 0 40px rgba(59, 130, 246, 0.3)",
        duration: 1.5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    });

    return () => ctx.revert();
  }, []);

  const handleScheduleClick = () => {
    window.open("#", "_blank", "noopener,noreferrer");
  };

  const handleEmailClick = () => {
    window.location.href = "#";
  };

  const handlePhoneClick = () => {
    window.location.href = "#";
  };

  const handleSocialClick = (url) => {
    window.open(url, "_blank", "noopener,noreferrer");
  };

  const handleMouseEnter = () => {
    if (!buttonRef.current) return;
    gsap.to(buttonRef.current, {
      scale: 1.05,
      duration: 0.3,
      ease: "power2.out",
    });
  };

  const handleMouseLeave = () => {
    if (!buttonRef.current) return;
    gsap.to(buttonRef.current, {
      scale: 1,
      duration: 0.3,
      ease: "power2.out",
    });
  };

  return (
    <footer className="footerSection">
      {/* CTA Area */}
      <div className="footerCta" ref={ctaRef}>
        <h2 className="footerHeading" ref={headingRef}>
          <span className="word">Got</span>{" "}
          <span className="word">a</span>{" "}
          <span className="word">vision?</span>
          <br />
          <span className="word">Let&apos;s</span>{" "}
          <span className="word connectHighlight" ref={connectWordRef}>build it.</span>
        </h2>
        <p className="footerSubtext" ref={subtextRef}>
          Transform your concepts into digital reality. Book a strategy session and let&apos;s architect something extraordinary together.
        </p>
        <button
          className="scheduleButton"
          ref={buttonRef}
          onClick={handleScheduleClick}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          Start a conversation
        </button>
      </div>

      {/* Contact Info Grid */}
      <div className="footerContactGrid" ref={contactGridRef}>
        {/* Location */}
        <div className="contactBlock">
          <div className="contactLabel">
            <span className="locationIcon">🏔️</span>
            Kashmir, India
          </div>
          <address className="contactValue addressValue">
            207 - Main market Baramulla, NH1A,
            <br />
            DC Office, Bypass, Baramulla, Jammu &amp;
            <br />
            Kashmir, 193101
          </address>
        </div>

        {/* Email */}
        <div className="contactBlock">
          <div className="contactLabel muted">Drop us a line</div>
          <button
            className="contactValue emailValue"
            onClick={handleEmailClick}
          >
           info@nexgendevelopers.in
          </button>
        </div>

        {/* Phone */}
        <div className="contactBlock">
          <div className="contactLabel muted">Ring us up</div>
          <button
            className="contactValue phoneValue"
            onClick={handlePhoneClick}
          >
            +91600-616-1726
          </button>
        </div>
      </div>

      {/* Bottom Bar - 4 boxes with dividers */}
      <div className="footerBottomBar" ref={bottomBarRef}>
        <div className="bottomItem">
          <span className="bottomText">© nexgendevelopers 2024</span>
        </div>
        <div className="bottomDivider"></div>
        <div className="bottomItem">
          <button className="bottomLink">NexGen members</button>
        </div>
        <div className="bottomDivider"></div>
        <div className="bottomItem">
          <button className="bottomLink">About NexGen</button>
        </div>
        <div className="bottomDivider"></div>
        <div className="bottomItem socialRow">
          <button
            className="socialIcon"
            onClick={() => handleSocialClick("#")}
            aria-label="Instagram"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
              <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
              <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
            </svg>
          </button>
          <button
            className="socialIcon"
            onClick={() => handleSocialClick("#")}
            aria-label="Facebook"
          >
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
            </svg>
          </button>
          <button
            className="socialIcon"
            onClick={() => handleSocialClick("#")}
            aria-label="LinkedIn"
          >
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
              <rect x="2" y="9" width="4" height="12"/>
              <circle cx="4" cy="4" r="2"/>
            </svg>
          </button>
          <button
            className="socialIcon"
            onClick={() => handleSocialClick("#")}
            aria-label="Twitter"
          >
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"/>
            </svg>
          </button>
        </div>
      </div>
    </footer>
  );
}

export default Footer;