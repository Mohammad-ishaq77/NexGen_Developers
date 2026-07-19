import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './services.css';
import webdevImg from '../../assets/webdev.png';
import appdevImg from '../../assets/appdev.png';
import designImg from '../../assets/design.png';
import cloudservicesImg from '../../assets/claudservices.png';
import aiImg from '../../assets/ai.png';

gsap.registerPlugin(ScrollTrigger);

export const servicesData = [
  {
    id: 1,
    title: 'Web Development',
    subtitle: 'Modern, responsive, and scalable web solutions',
    description: 'We build complete, end-to-end web solutions from frontend to backend. Our website development services include modern responsive websites, web applications, and complex enterprise solutions. We handle everything from user interface design to server-side logic, database management, and API integration.',
    image: webdevImg,
  },
  {
    id: 2,
    title: 'Mobile Development',
    subtitle: 'Native & cross-platform apps that users love',
    description: 'We develop powerful native and cross-platform mobile applications for iOS and Android. From concept to deployment, we create user-friendly apps that deliver exceptional performance and seamless user experiences across all devices. Our mobile app development services cover the entire lifecycle from initial ideation and design to App Store and Play Store submission.',
    image: appdevImg,
  },
  {
    id: 3,
    title: 'AI & ML Solutions',
    subtitle: 'Intelligent automation for smarter decisions',
    description: 'We integrate Artificial Intelligence and Machine Learning to automate processes, enhance decision-making, and create intelligent applications. From predictive analytics to computer vision, we build AI solutions that transform your business operations. Our AI/ML services help businesses leverage data to gain competitive advantages, automate repetitive tasks, and make data-driven decisions.',
    image: designImg,
  },
  {
    id: 4,
    title: 'SEO',
    subtitle: 'Rank higher and grow organic traffic',
    description: 'We help you rank higher in search results and grow organic traffic with proven SEO strategies. Our services include on-page and off-page optimization, keyword research, technical SEO, content strategy, and link building.',
    image: cloudservicesImg,
  },
  {
    id: 5,
    title: 'Deployment & DevOps',
    subtitle: 'Secure, scalable, and automated infrastructure',
    description: 'We ensure your applications are deployed securely and efficiently. Our DevOps services include cloud deployment, CI/CD pipeline setup, server configuration, and infrastructure management to keep your applications running smoothly. We help you build, deploy, and scale your applications with modern DevOps practices. Our services cover infrastructure as code, automated testing and deployment, containerization with Docker, orchestration with Kubernetes, cloud migration, and continuous monitoring.',
    image: aiImg,
  },
];

// Split text into individual character spans for GSAP animation
const AnimatedHeading = ({ text }) => {
  return (
    <span className="services-heading__chars">
      {text.split('').map((char, index) => (
        <span
          key={index}
          className="services-heading__char"
          style={{ display: char === ' ' ? 'inline' : 'inline-block' }}
        >
          {char === ' ' ? '\u00A0' : char}
        </span>
      ))}
    </span>
  );
};

const Services = ({ onSelectService }) => {
  const sectionRef = useRef(null);
  const triggerRef = useRef(null);
  const trackRef = useRef(null);
  const headingRef = useRef(null);

  useEffect(() => {
    const track = trackRef.current;
    const trigger = triggerRef.current;
    if (!track || !trigger) return;

    const cards = track.querySelectorAll('.service-card');
    const viewportWidth = trigger.clientWidth || window.innerWidth;
    const maxTravel = Math.max(0, track.scrollWidth - viewportWidth + 80);

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
          end: () => `+=${maxTravel * 1.5}`,
          scrub: 2.5,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      }
    );

    cards.forEach((card, index) => {
      if (index === 0) {
        gsap.fromTo(
          card,
          { x: viewportWidth * 0.35, opacity: 0.5, scale: 1 },
          {
            x: 0, opacity: 1, scale: 1, duration: 1, ease: 'power3.out',
            scrollTrigger: {
              trigger: card, containerAnimation: scrollTween,
              start: 'left 90%', end: 'left 50%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      } else {
        gsap.fromTo(
          card,
          { x: 150, opacity: 0, scale: 0.95 },
          {
            x: 0, opacity: 1, scale: 1, duration: 1, ease: 'power3.out',
            scrollTrigger: {
              trigger: card, containerAnimation: scrollTween,
              start: 'left 90%', end: 'left 50%',
              toggleActions: 'play none none reverse',
            },
            delay: index * 0.08,
          }
        );
      }
    });

    gsap.to('.services-grid__line', {
      opacity: 0.15,
      duration: 2,
      stagger: 0.05,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 80%',
        toggleActions: 'play none none reverse',
      },
    });

    gsap.to('.services-star', {
      opacity: 1,
      scale: 1,
      duration: 0.6,
      stagger: 0.1,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 80%',
        toggleActions: 'play none none reverse',
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  // GSAP heading character animation — same as Projects
  useEffect(() => {
    const heading = headingRef.current;
    if (!heading) return;

    const chars = heading.querySelectorAll('.services-heading__char');

    gsap.set(chars, {
      opacity: 0,
      y: 20,
      filter: 'blur(4px)',
    });

    gsap.to(chars, {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      duration: 0.9,
      stagger: 0.07,
      delay: 0.2,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: heading,
        start: 'top 85%',
        toggleActions: 'play none none none',
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach((t) => {
        if (t.vars.trigger === heading) t.kill();
      });
    };
  }, []);

  return (
    <section className="services-section" id="services" ref={sectionRef}>
      <div className="services-bg-dark" aria-hidden="true" />

      <div className="services-grid" aria-hidden="true">
        <div className="services-grid__floor">
          {Array.from({ length: 20 }).map((_, i) => (
            <div key={`h-${i}`} className="services-grid__line services-grid__line--horizontal" style={{ top: `${(i + 1) * 5}%` }} />
          ))}
          {Array.from({ length: 20 }).map((_, i) => (
            <div key={`v-${i}`} className="services-grid__line services-grid__line--vertical" style={{ left: `${(i + 1) * 5}%` }} />
          ))}
        </div>
        <div className="services-grid__horizon" />
      </div>

      <div className="services-stars" aria-hidden="true">
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            className="services-star"
            style={{
              top: `${Math.random() * 60}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
            }}
          />
        ))}
      </div>

      {/* Services Heading — white box with GSAP letter animation */}
      <div className="services-heading-wrapper">
        <div className="services-heading-box" ref={headingRef}>
          <h2 className="services-heading__text">
            <AnimatedHeading text="What NexGen Delivers" />
          </h2>
        </div>
      </div>

      <div className="scroll-trigger-wrapper" ref={triggerRef}>
        <div className="services-track" ref={trackRef}>
          {servicesData.map((service) => (
            <div className="service-card" key={service.id}>
              <div className="service-card__image">
                <span className="service-card__number">{service.id}</span>
                <img src={service.image} alt={service.title} />
              </div>
              <div className="service-card__divider" />
              <div className="service-card__content">
                <h3 className="service-card__title">{service.title}</h3>
                <p className="service-card__subtitle">{service.subtitle}</p>
                <p className="service-card__description">{service.description}</p>
                <button
                  className="service-card__button"
                  onClick={() => onSelectService && onSelectService(service.id)}
                >
                  learn more
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;