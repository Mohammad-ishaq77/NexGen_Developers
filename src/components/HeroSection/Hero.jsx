// src/components/Hero.jsx
import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import Navbar from './Navbar';
import HeroContent from './HeroContent';
import HeroVisual from './HeroVisual';
import ScrollIndicator from './ScrollIndicator';
import '../styles/hero.css';

const Hero = () => {
  const heroRef = useRef(null);
  const overlayRef = useRef(null);

  // Page load reveal sequence
  useGSAP(() => {
    const tl = gsap.timeline();

    // Black overlay fade out
    tl.to(overlayRef.current, {
      opacity: 0,
      duration: 1.2,
      ease: 'power2.inOut',
      onComplete: () => {
        overlayRef.current.style.pointerEvents = 'none';
      },
    });

    // Background elements fade in
    tl.fromTo(
      '.hero-bg__blob',
      { scale: 0, opacity: 0 },
      { scale: 1, opacity: 1, duration: 2, stagger: 0.3, ease: 'power4.out' },
      '-=0.5'
    );
  }, { scope: heroRef });

  return (
    <section ref={heroRef} className="hero" id="hero">
      {/* Loading overlay */}
      <div ref={overlayRef} className="hero-overlay" aria-hidden="true" />

      {/* Animated background */}
      <div className="hero-bg" aria-hidden="true">
        <div className="hero-bg__blob hero-bg__blob--1" />
        <div className="hero-bg__blob hero-bg__blob--2" />
        <div className="hero-bg__blob hero-bg__blob--3" />
        <div className="hero-bg__grid" />
      </div>

      {/* Navbar */}
      <Navbar />

      {/* Main hero layout */}
      <div className="hero__container">
        <HeroContent />
        <HeroVisual />
      </div>

      {/* Scroll indicator */}
      <ScrollIndicator />
    </section>
  );
};

export default Hero;