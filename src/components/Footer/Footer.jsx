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
  const highlightWordRef = useRef(null);
  const linksRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Heading words stagger animation
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

      // Quick links stagger
      const linkItems = linksRef.current?.querySelectorAll(".quickLink");
      if (linkItems) {
        gsap.from(linkItems, {
          opacity: 0,
          x: -20,
          duration: 0.5,
          stagger: 0.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: linksRef.current,
            start: "top 90%",
            toggleActions: "play none none none",
          },
        });
      }

      // Highlight word glow pulse - cyan color
      gsap.to(highlightWordRef.current, {
        textShadow: "0 0 20px rgba(34, 211, 238, 0.6), 0 0 40px rgba(34, 211, 238, 0.3)",
        duration: 1.5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    });

    return () => ctx.revert();
  }, []);

  const handleButtonClick = () => {
    window.open("#", "_blank", "noopener,noreferrer");
  };

  const handleEmailClick = () => {
    window.location.href = "mailto:hello@studio.dev";
  };

  const handlePhoneClick = () => {
    window.location.href = "tel:+1234567890";
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
          <span className="word">Let&apos;s</span>{" "}
          <span className="word">Build</span>{" "}
          <span className="word">What&apos;s</span>{" "}
          <span className="word">Next</span>
          <br />
         
        </h2>
        <p className="footerSubtext" ref={subtextRef}>
          Turn your imagination into something real. Reach out and let&apos;s design something remarkable side by side.
        </p>
        <button
          className="scheduleButton"
          ref={buttonRef}
          onClick={handleButtonClick}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          Get in touch
        </button>
      </div>

      {/* Middle Section: Quick Links + Contact Info */}
      <div className="footerMiddle" ref={contactGridRef}>
        {/* Quick Links Column */}
        <div className="contactBlock linksBlock">
          <div className="contactLabel">Navigate</div>
          <div className="linksList" ref={linksRef}>
            <button className="quickLink">Home</button>
            <button className="quickLink">Services</button>
            <button className="quickLink">About Us</button>
            <button className="quickLink">Blogs</button>
            <button className="quickLink">Team</button>
          </div>
        </div>

        {/* Location */}
        <div className="contactBlock">
          <div className="contactLabel">
            <span className="locationIcon">📍</span>
         Visit Our Office
          </div>
          <address className="contactValue addressValue">
         207 – Main Market Baramulla,
            <br />
           NH1A, DC Office Bypass,
            <br />
        Baramulla, Jammu & Kashmir 193101
          </address>
        </div>

        {/* Email */}
        <div className="contactBlock">
          <div className="contactLabel muted">Write to us</div>
          <button
            className="contactValue emailValue"
            onClick={handleEmailClick}
          >
           info@nexGenDevelopers.in
          </button>
        </div>

        {/* Phone */}
        <div className="contactBlock">
          <div className="contactLabel muted">Call us</div>
          <button
            className="contactValue phoneValue"
            onClick={handlePhoneClick}
          >
           +91600-616-1726
          </button>
        </div>
      </div>

     
    </footer>
  );
}

export default Footer;