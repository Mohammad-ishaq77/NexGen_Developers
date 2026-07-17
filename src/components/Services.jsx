import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import '../styles/services.css';
import webdevImg from '../assets/webdev.png';
import appdevImg from '../assets/appdev.png';
import designImg from '../assets/design.png';
import cloudservicesImg from '../assets/claudservices.png';
import aiImg from '../assets/ai.png';

gsap.registerPlugin(ScrollTrigger);

const servicesData = [
  {
    id: 1,
    title: 'Web\nDevelopment',
    description: 'We deliver web presence to help you grow your business using the best web technologies.',
    image: webdevImg,
    subServices: [
      { bold: 'frontend', light: 'development' },
      { bold: 'backend', light: 'development' },
      { bold: 'database', light: 'development' },
      { bold: 'maintenance', light: 'management' },
    ],
  },
  {
    id: 2,
    title: 'Mobile\nDevelopment',
    description: 'We deliver web presence to help you grow your business using the best web technologies.',
    image: appdevImg,
    subServices: [
      { bold: 'ios', light: 'development' },
      { bold: 'android', light: 'development' },
      { bold: 'backend', light: 'development' },
      { bold: 'database', light: 'development' },
    ],
  },
  {
    id: 3,
    title: 'Design',
    description: 'We deliver web presence to help you grow your business using the best web technologies.',
    image: designImg,
    subServices: [
      { bold: 'design', light: 'research' },
      { bold: 'ui/ux', light: 'design' },
      { bold: 'wireframe', light: 'design' },
      { bold: 'prototype', light: 'development' },
    ],
  },
  {
    id: 4,
    title: 'Cloud\nServices',
    description: 'We deliver web presence to help you grow your business using the best web technologies.',
    image: cloudservicesImg,
    subServices: [
      { bold: 'aws', light: 'deployment' },
      { bold: 'serverless', light: 'architecture' },
      { bold: 'ci/cd', light: 'pipelines' },
      { bold: 'devops', light: 'automation' },
    ],
  },
  {
    id: 5,
    title: 'AI\nSolutions',
    description: 'We deliver web presence to help you grow your business using the best web technologies.',
    image: aiImg,
    subServices: [
      { bold: 'machine', light: 'learning' },
      { bold: 'nlp', light: 'processing' },
      { bold: 'computer', light: 'vision' },
      { bold: 'data', light: 'analytics' },
    ],
  },
];

const Services = () => {
  const sectionRef = useRef(null);
  const triggerRef = useRef(null);
  const trackRef = useRef(null);

  useEffect(() => {
    const track = trackRef.current;
    const trigger = triggerRef.current;
    if (!track || !trigger) return;

    const cards = track.querySelectorAll('.service-card');
    const viewportWidth = trigger.clientWidth || window.innerWidth;
    const maxTravel = Math.max(0, track.scrollWidth - viewportWidth + 40);

    // Initial state: first card peeking from right at 50% opacity
    const firstCard = cards[0];
    if (firstCard) {
      gsap.set(firstCard, {
        x: viewportWidth * 0.35,
        opacity: 0.5,
        scale: 1,
      });
    }

    const scrollTween = gsap.fromTo(
      track,
      { x: 0 },
      {
        x: -maxTravel,
        ease: 'none',
        scrollTrigger: {
          trigger: trigger,
          start: 'top top',
          end: () => `+=${maxTravel}`,
          scrub: 2.2,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      }
    );

    cards.forEach((card, index) => {
      // Skip the first card - it already has its initial state set
      if (index === 0) return;

      gsap.fromTo(
        card,
        {
          x: 150,
          opacity: 0,
          scale: 0.95,
        },
        {
          x: 0,
          opacity: 1,
          scale: 1,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: card,
            containerAnimation: scrollTween,
            start: 'left 90%',
            end: 'left 50%',
            toggleActions: 'play none none reverse',
          },
          delay: index * 0.1,
        }
      );
    });

    // Animate first card from its peek state to full view
    if (firstCard) {
      gsap.fromTo(
        firstCard,
        {
          x: viewportWidth * 0.35,
          opacity: 0.5,
          scale: 1,
        },
        {
          x: 0,
          opacity: 1,
          scale: 1,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: firstCard,
            containerAnimation: scrollTween,
            start: 'left 90%',
            end: 'left 50%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <section className="services-section" ref={sectionRef}>
      <div className="section-title">
        <span className="code-icon"></span>
        <h2>whatWeDo();</h2>
      </div>

      <div className="scroll-trigger-wrapper" ref={triggerRef}>
        <div className="services-track" ref={trackRef}>
          {servicesData.map((service) => (
            <div className="service-card" key={service.id}>
              <div className="card-content">
                <div className="card-text">
                  <div className="square-icon">{service.id}</div>
                  <h3 dangerouslySetInnerHTML={{ __html: service.title.replace('\n', '<br>') }}></h3>
                  <p>{service.description}</p>
                  <button className="learn-more-btn">learn more</button>
                </div>
                <div className="card-image">
                  <img src={service.image} alt={service.title.replace('\n', ' ')} />
                </div>
              </div>

              <div className="sub-services">
                <ul>
                  {service.subServices.map((sub, index) => (
                    <li key={index}>
                      <span className="bold">{sub.bold}</span>{' '}
                      <span className="light">{sub.light}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;