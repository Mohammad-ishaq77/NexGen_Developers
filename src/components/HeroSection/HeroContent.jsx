// src/components/HeroSection/HeroContent.jsx
import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import './Styles/heroSection.css';

const HeroContent = () => {
  const contentRef = useRef(null);

  useGSAP(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: { ease: 'power4.out' },
        delay: 0.5,
      });

      // Badge slides down + fades in
      tl.fromTo('.hero-badge',
        { y: -30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8 }
      );

      // Heading lines — dramatic stagger from below
      tl.fromTo('.hero-heading__line',
        { y: 120, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.2, stagger: 0.18 },
        '-=0.4'
      );

      // Subheading fades up
      tl.fromTo('.hero-subheading',
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.9 },
        '-=0.7'
      );

      // Description fades up
      tl.fromTo('.hero-description',
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8 },
        '-=0.6'
      );

      // Buttons scale in
      tl.fromTo('.hero-buttons',
        { y: 20, opacity: 0, scale: 0.95 },
        { y: 0, opacity: 1, scale: 1, duration: 0.8 },
        '-=0.5'
      );

    }, contentRef);

    return () => ctx.revert();
  }, { scope: contentRef });

  return (
    <div ref={contentRef} className="hero-content">
      {/* Badge */}
      <div className="hero-badge">
        <span className="hero-badge__dot" aria-hidden="true" />
        <span>Welcome to NexGen Developers</span>
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
          <path d="M3 7H11M11 7L7 3M11 7L7 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>

      {/* Main Heading */}
      <h1 className="hero-heading">
        <span className="hero-heading__line">Designing the next</span>
        <span className="hero-heading__line">era of software.</span>
      </h1>

      {/* Description */}
      <p className="hero-description">
       Kashmir-based digital software company. </p>

      {/* Buttons */}
      <div className="hero-buttons">
        <a href="#explore" className="hero-btn hero-btn--primary">
          <span>Get Started</span>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <path d="M3 8H13M13 8L9 4M13 8L9 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </a>

        <button type="button" className="hero-btn hero-btn--secondary" aria-label="View our work">
          <span className="hero-btn__play">
            <svg width="10" height="12" viewBox="0 0 10 12" fill="none" aria-hidden="true">
              <path d="M1 1L9 6L1 11V1Z" fill="currentColor" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
            </svg>
          </span>
          <span>View Our Work</span>
        </button>
      </div>
    </div>
  );
};

export default HeroContent;