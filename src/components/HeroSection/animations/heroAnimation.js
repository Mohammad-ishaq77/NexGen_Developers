// src/components/HeroSection/animations/heroAnimation.js
import gsap from 'gsap';

export const createHeroTimeline = (containerRef) => {
  const tl = gsap.timeline({ defaults: { ease: 'power4.out' } });

  tl.fromTo(
    containerRef.querySelector('.hero-label'),
    { y: 40, opacity: 0 },
    { y: 0, opacity: 1, duration: 0.8 },
    0.5
  );

  const lines = containerRef.querySelectorAll('.hero-heading__line');
  tl.fromTo(
    lines,
    { y: 100, opacity: 0 },
    { y: 0, opacity: 1, duration: 1, stagger: 0.15 },
    0.7
  );

  tl.fromTo(
    containerRef.querySelector('.hero-paragraph'),
    { y: 40, opacity: 0 },
    { y: 0, opacity: 1, duration: 0.8 },
    1.2
  );

  tl.fromTo(
    containerRef.querySelector('.hero-buttons'),
    { scale: 0.8, opacity: 0 },
    { scale: 1, opacity: 1, duration: 0.8 },
    1.4
  );

  return tl;
};

export const createGradientAnimation = (elementRef) => {
  return gsap.to(elementRef, {
    backgroundPosition: '200% center',
    duration: 4,
    repeat: -1,
    ease: 'none',
  });
};

export const cleanupAnimations = (animations) => {
  animations.forEach((anim) => {
    if (anim && typeof anim.kill === 'function') {
      anim.kill();
    }
  });
};