import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { gsap } from 'gsap';
import './ServiceDetail.css';

const ServiceDetail = ({ service, onBack }) => {
  const containerRef = useRef(null);
  const heroRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });

    const ctx = gsap.context(() => {
      gsap.fromTo(
        heroRef.current,
        { opacity: 0, scale: 1.05 },
        { opacity: 1, scale: 1, duration: 1, ease: 'power3.out' }
      );

      gsap.fromTo(
        contentRef.current.children,
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.7, stagger: 0.1, ease: 'power3.out', delay: 0.3 }
      );
    }, containerRef);

    return () => ctx.revert();
  }, [service]);

  const detailContent = (
    <div className="service-detail-overlay" ref={containerRef}>
      {/* Background */}
      <div className="service-detail-bg" />

      {/* Back Button */}
      <button className="service-detail-back-btn" onClick={onBack}>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M19 12H5M12 19l-7-7 7-7" />
        </svg>
        Back to Services
      </button>

      {/* Hero Section */}
      <div className="service-detail-hero" ref={heroRef}>
        <div className="service-detail-hero__image-wrap">
          <img src={service.image} alt={service.title} />
        </div>
        <div className="service-detail-hero__overlay" />
        <div className="service-detail-hero__content">
          <span className="service-detail-hero__number">0{service.id}</span>
          <h1 className="service-detail-hero__title">{service.title}</h1>
          <p className="service-detail-hero__subtitle">{service.subtitle}</p>
        </div>
      </div>

      {/* Content Section */}
      <div className="service-detail-content" ref={contentRef}>
        <div className="service-detail-content__inner">
          {/* About Section */}
          <div className="service-detail-section">
            <h2 className="service-detail-section__title">About This Service</h2>
            <div className="service-detail-section__line" />
            <p className="service-detail-section__text">{service.description}</p>
          </div>

          {/* Features Section */}
          <div className="service-detail-section">
            <h2 className="service-detail-section__title">What NexGen Delivers_</h2>
            <div className="service-detail-section__line" />
            <div className="service-detail-features">
              {[
                { icon: 'check', title: 'Expert Team', desc: 'Skilled professionals with years of industry experience' },
                { icon: 'clock', title: 'On-Time Delivery', desc: 'We respect deadlines and deliver quality work promptly' },
                { icon: 'layers', title: 'Scalable Solutions', desc: 'Built to grow with your business needs' },
                { icon: 'message', title: '24/7 Support', desc: 'Round-the-clock assistance for all your queries' },
              ].map((feature, idx) => (
                <div key={idx} className="service-detail-feature">
                  <div className="service-detail-feature__icon">
                    {feature.icon === 'check' && (
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                        <polyline points="22 4 12 14.01 9 11.01" />
                      </svg>
                    )}
                    {feature.icon === 'clock' && (
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="12" r="10" />
                        <polyline points="12 6 12 12 16 14" />
                      </svg>
                    )}
                    {feature.icon === 'layers' && (
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M12 2L2 7l10 5 10-5-10-5z" />
                        <path d="M2 17l10 5 10-5" />
                        <path d="M2 12l10 5 10-5" />
                      </svg>
                    )}
                    {feature.icon === 'message' && (
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                      </svg>
                    )}
                  </div>
                  <div>
                    <h4 className="service-detail-feature__title">{feature.title}</h4>
                    <p className="service-detail-feature__desc">{feature.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* CTA Section */}
          <div className="service-detail-cta">
            <h3 className="service-detail-cta__title">Ready to get started?</h3>
            <p className="service-detail-cta__text">
              Let us help you bring your vision to life with our {service.title.toLowerCase()} expertise.
            </p>
            <div className="service-detail-cta__buttons">
              <button className="service-detail-btn service-detail-btn--primary">
                Get Started
              </button>
              <button className="service-detail-btn service-detail-btn--secondary" onClick={onBack}>
                Explore Other Services
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return createPortal(detailContent, document.body);
};

export default ServiceDetail;