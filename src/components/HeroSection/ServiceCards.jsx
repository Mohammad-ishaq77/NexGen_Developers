// src/components/HeroSection/ServiceCards.jsx
import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import './styles/cards.css';

const services = [
  {
    id: 'ai',
    label: 'AI Solutions',
    icon: (
      <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <path d="M24 8C24 8 16 16 16 24C16 32 24 40 24 40C24 40 32 32 32 24C32 16 24 8 24 8Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="24" cy="24" r="4" stroke="currentColor" strokeWidth="2" />
        <path d="M24 12V16M24 32V36M12 24H16M32 24H36" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    id: 'web',
    label: 'Web Development',
    icon: (
      <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <path d="M14 18L8 24L14 30" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M34 18L40 24L34 30" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M20 34L28 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    id: 'mobile',
    label: 'Mobile Apps',
    icon: (
      <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <rect x="14" y="4" width="20" height="40" rx="4" stroke="currentColor" strokeWidth="2" />
        <line x1="20" y1="8" x2="28" y2="8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <circle cx="24" cy="38" r="2" stroke="currentColor" strokeWidth="2" />
      </svg>
    ),
  },
  {
    id: 'cloud',
    label: 'Cloud Infrastructure',
    icon: (
      <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <path d="M12 32C8.686 32 6 29.314 6 26C6 22.962 8.178 20.486 11.106 20.068C11.566 15.382 15.486 11.714 20.286 11.714C23.738 11.714 26.714 13.714 28.286 16.572C29.028 16.286 29.828 16.128 30.666 16.128C34.45 16.128 37.524 19.202 37.524 22.986C37.524 23.058 37.52 23.13 37.514 23.2C40.186 23.934 42 26.286 42 29C42 32.314 39.314 35 36 35H12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M18 38L24 44L30 38" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M24 44V32" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
  },
];

const ServiceCards = () => {
  const cardsRef = useRef(null);

  useGSAP(() => {
    const cards = cardsRef.current.querySelectorAll('.service-card');
    gsap.fromTo(
      cards,
      { y: 60, opacity: 0, scale: 0.9 },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 0.8,
        stagger: 0.12,
        ease: 'power4.out',
        delay: 1.6,
      }
    );
  }, { scope: cardsRef });

  return (
    <div ref={cardsRef} className="service-cards">
      {services.map((service) => (
        <div key={service.id} className="service-card" tabIndex={0} role="button" aria-label={service.label}>
          <div className="service-card__icon">{service.icon}</div>
          <span className="service-card__label">{service.label}</span>
          <div className="service-card__glow" aria-hidden="true" />
        </div>
      ))}
    </div>
  );
};

export default ServiceCards;