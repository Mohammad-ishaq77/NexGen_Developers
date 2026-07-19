// src/components/HeroSection/HeroSection.jsx
import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import HeroContent from './HeroContent';
import TrustedBy from './TrustedBy';
import './Styles/heroSection.css';

const HeroSection = () => {
  const heroRef = useRef(null);
  const overlayRef = useRef(null);

  useGSAP(() => {
    const tl = gsap.timeline({ defaults: { ease: 'power4.out' } });

    // Fade out overlay
    tl.to(overlayRef.current, {
      opacity: 0,
      duration: 1,
      ease: 'power2.inOut',
      onComplete: () => {
        if (overlayRef.current) overlayRef.current.style.pointerEvents = 'none';
      },
    });

    // Grid lines fade in
    tl.fromTo('.hero-grid',
      { opacity: 0 },
      { opacity: 1, duration: 1.5 },
      '-=0.5'
    );

    // Stars twinkle in
    tl.fromTo('.star',
      { opacity: 0, scale: 0 },
      { opacity: 1, scale: 1, duration: 0.6, stagger: 0.1 },
      '-=1'
    );

  }, { scope: heroRef });

  return (
    <section ref={heroRef} className="hero" id="hero">
      <div ref={overlayRef} className="hero-overlay" aria-hidden="true" />

      {/* Dark background */}
      <div className="hero-bg-dark" aria-hidden="true" />

      {/* Perspective grid floor */}
      <div className="hero-grid" aria-hidden="true">
        <div className="hero-grid__floor" />
        <div className="hero-grid__horizon" />
      </div>

      {/* Floating stars */}
      <div className="stars-container" aria-hidden="true">
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            className="star"
            style={{
              top: `${Math.random() * 60}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
            }}
          />
        ))}
      </div>

      
      <HeroContent />
      <TrustedBy />
    </section>
  );
};

export default HeroSection;