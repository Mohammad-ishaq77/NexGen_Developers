// src/components/HeroSection/parallax/mouseParallax.js
import gsap from 'gsap';

export const createMouseParallax = (target, options = {}) => {
  const {
    intensity = 15,
    duration = 1.2,
    ease = 'power2.out',
  } = options;

  if (!target) return () => {};

  const handleMouseMove = (e) => {
    const { clientX, clientY } = e;
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;

    const moveX = ((clientX - centerX) / centerX) * intensity;
    const moveY = ((clientY - centerY) / centerY) * intensity;

    gsap.to(target, {
      x: moveX,
      y: moveY,
      duration,
      ease,
    });
  };

  window.addEventListener('mousemove', handleMouseMove, { passive: true });

  return () => {
    window.removeEventListener('mousemove', handleMouseMove);
  };
};

export const createMultiLayerParallax = (layers) => {
  const cleanupFns = layers.map(({ element, intensity = 15, duration = 1.2 }) =>
    createMouseParallax(element, { intensity, duration })
  );

  return () => cleanupFns.forEach((fn) => fn());
};