// src/components/HeroSection/ScrollIndicator.jsx
import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import './Styles/heroSection.css';

const ScrollIndicator = () => {
  const indicatorRef = useRef(null);

  useGSAP(() => {
    gsap.fromTo(indicatorRef.current, 
      { opacity: 0 }, 
      { opacity: 1, duration: 0.8, delay: 2 }
    );

    gsap.to(indicatorRef.current, {
      y: 8,
      duration: 1.5,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
    });
  }, { scope: indicatorRef });

  const handleClick = () => {
    document.getElementById('next-section')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div ref={indicatorRef} className="scroll-indicator" onClick={handleClick} role="button" tabIndex={0} aria-label="Scroll to next section">
      <div className="scroll-indicator__mouse">
        <div className="scroll-indicator__wheel" />
      </div>
      <svg className="scroll-indicator__arrow" width="12" height="8" viewBox="0 0 12 8" fill="none" aria-hidden="true">
        <path d="M1 1.5L6 6.5L11 1.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    </div>
  );
};

export default ScrollIndicator;