// src/components/HeroSection/HeroVisual.jsx
import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import logoImage from '../../assets/logo.png';
import './Styles/heroSection.css';

const HeroVisual = () => {
  const visualRef = useRef(null);
  const logoRef = useRef(null);
  const sceneRef = useRef(null);

  // Mouse parallax — very subtle
  useEffect(() => {
    const handleMouseMove = (e) => {
      const { clientX, clientY } = e;
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;
      const moveX = (clientX - centerX) / centerX;
      const moveY = (clientY - centerY) / centerY;

      gsap.to(sceneRef.current, {
        rotateY: moveX * 4,
        rotateX: -moveY * 3,
        duration: 1.5,
        ease: 'power2.out',
      });
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Cinematic logo animation
  useGSAP(() => {
    const logo = logoRef.current;
    if (!logo) return;

    // Gentle floating
    gsap.to(logo, {
      y: -12,
      duration: 4,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
    });

    // Breathing scale
    gsap.to(logo, {
      scale: 1.02,
      duration: 5,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
    });

    // Glow ring pulse
    gsap.to('.hero-visual__ring-glow', {
      scale: 1.08,
      opacity: 0.9,
      duration: 3,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
    });

    // Inner ring pulse
    gsap.to('.hero-visual__ring-inner', {
      scale: 1.05,
      opacity: 0.7,
      duration: 4,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
    });

    // Podium glow
    gsap.to('.hero-visual__podium-glow', {
      opacity: 0.8,
      duration: 2.5,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
    });

    // Floating spheres
    const spheres = document.querySelectorAll('.floating-sphere');
    spheres.forEach((sphere, i) => {
      gsap.to(sphere, {
        y: `random(-20, 20)`,
        x: `random(-15, 15)`,
        duration: 3 + i * 0.5,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        delay: i * 0.3,
      });
    });
  }, { scope: visualRef });

  return (
    <div ref={visualRef} className="hero-visual">
      {/* Ambient glows */}
      <div className="hero-visual__ambient" aria-hidden="true" />
      <div className="hero-visual__ambient hero-visual__ambient--secondary" aria-hidden="true" />

      {/* Floating 3D spheres */}
      <div className="floating-sphere floating-sphere--1" aria-hidden="true" />
      <div className="floating-sphere floating-sphere--2" aria-hidden="true" />
      <div className="floating-sphere floating-sphere--3" aria-hidden="true" />
      <div className="floating-sphere floating-sphere--4" aria-hidden="true" />
      <div className="floating-sphere floating-sphere--5" aria-hidden="true" />
      <div className="floating-sphere floating-sphere--6" aria-hidden="true" />

      {/* Main scene with 3D perspective */}
      <div ref={sceneRef} className="hero-visual__scene">
        {/* Outer pulsing ring */}
        <div className="hero-visual__ring-glow" aria-hidden="true" />
        
        {/* Inner ring */}
        <div className="hero-visual__ring-inner" aria-hidden="true" />

        {/* Podium base */}
        <div className="hero-visual__podium" aria-hidden="true">
          <div className="hero-visual__podium-top" />
          <div className="hero-visual__podium-glow" />
        </div>

        {/* Logo */}
        <div className="hero-visual__logo-wrap">
          <img
            ref={logoRef}
            src={logoImage}
            alt="NexGen Developers Logo"
            className="hero-visual__logo"
          />
        </div>

        {/* Reflection on podium */}
        <div className="hero-visual__reflection" aria-hidden="true" />
      </div>
    </div>
  );
};

export default HeroVisual;