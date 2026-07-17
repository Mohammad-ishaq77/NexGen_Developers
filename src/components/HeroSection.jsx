import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import useMouseParallax from '../hooks/useMouseParallax'
import styles from '../styles/HeroSection.module.css'

const floatingTags = [
  { text: 'React', position: 'top-[12%] right-[8%]' },
  { text: 'Node.js', position: 'top-[18%] left-[6%]' },
  { text: 'AI/ML', position: 'bottom-[20%] right-[10%]' },
  { text: 'Cloud', position: 'bottom-[15%] left-[12%]' },
  { text: 'Mobile', position: 'top-[40%] right-[4%]' },
  { text: 'Web3', position: 'top-[50%] left-[3%]' },
]

export default function HeroSection() {
  const sectionRef = useRef(null)
  const labelRef = useRef(null)
  const line1Ref = useRef(null)
  const line2Ref = useRef(null)
  const line3Ref = useRef(null)
  const line4Ref = useRef(null)
  const highlightRef = useRef(null)
  const dividerRef = useRef(null)
  const subtitleRef = useRef(null)
  const ctaRef = useRef(null)
  const tagRefs = useRef([])
  const glowRef = useRef(null)
  const gridRef = useRef(null)

  const mousePos = useMouseParallax(0.018)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })

      // Initial states
      gsap.set([labelRef.current, line1Ref.current, line2Ref.current, line3Ref.current, line4Ref.current], {
        opacity: 0,
        y: 60,
        rotateX: 45,
      })
      gsap.set(highlightRef.current, { opacity: 0, filter: 'blur(20px)', scale: 1.2 })
      gsap.set(dividerRef.current, { scaleX: 0, transformOrigin: 'left center' })
      gsap.set([subtitleRef.current, ctaRef.current], {
        opacity: 0,
        y: 30,
      })
      gsap.set(tagRefs.current, { opacity: 0, scale: 0, rotateY: 90 })
      gsap.set(glowRef.current, { opacity: 0, scale: 0.8 })
      gsap.set(gridRef.current, { opacity: 0 })

      // Main timeline
      tl
        .to(gridRef.current, { opacity: 1, duration: 1.2 }, 0)
        .to(glowRef.current, { opacity: 1, scale: 1, duration: 1.5, ease: 'power2.out' }, 0.2)
        .to(labelRef.current, { opacity: 1, y: 0, rotateX: 0, duration: 0.8 }, 0.3)
        .to(line1Ref.current, { opacity: 1, y: 0, rotateX: 0, duration: 0.9 }, 0.45)
        .to(line2Ref.current, { opacity: 1, y: 0, rotateX: 0, duration: 0.9 }, 0.6)
        .to(line3Ref.current, { opacity: 1, y: 0, rotateX: 0, duration: 0.9 }, 0.75)
        .to(highlightRef.current, { opacity: 1, filter: 'blur(0px)', scale: 1, duration: 1 }, 0.85)
        .to(line4Ref.current, { opacity: 1, y: 0, rotateX: 0, duration: 0.9 }, 0.9)
        .to(dividerRef.current, { scaleX: 1, duration: 0.7, ease: 'power2.inOut' }, 1.1)
        .to(subtitleRef.current, { opacity: 1, y: 0, duration: 0.8 }, 1.25)
        .to(ctaRef.current, { opacity: 1, y: 0, duration: 0.8, ease: 'back.out(1.7)' }, 1.4)
        .to(tagRefs.current, {
          opacity: 1,
          scale: 1,
          rotateY: 0,
          duration: 0.7,
          stagger: 0.1,
          ease: 'back.out(1.5)',
        }, 1.5)

      // Continuous floating animations for tags
      tagRefs.current.forEach((tag, index) => {
        gsap.to(tag, {
          y: index % 2 === 0 ? -15 : 12,
          x: index % 2 === 0 ? 8 : -6,
          rotateZ: index % 2 === 0 ? 3 : -3,
          duration: 2.5 + index * 0.4,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
        })
      })

      // Subtle glow pulse
      gsap.to(glowRef.current, {
        scale: 1.05,
        opacity: 0.7,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className={styles.hero}>
      {/* Background layers */}
      <div ref={glowRef} className={styles.ambientGlow} />
      <div ref={gridRef} className={styles.gridBg} />
      <div className={styles.vignette} />

      {/* Floating 3D tags */}
      {floatingTags.map((tag, index) => (
        <div
          key={tag.text}
          ref={(el) => { tagRefs.current[index] = el }}
          className={`${styles.floatingTag} ${tag.position}`}
        >
          <span className={styles.tagText}>{tag.text}</span>
          <span className={styles.tagGlow} />
        </div>
      ))}

      {/* Main content */}
      <div className={styles.mainContent} style={{ transform: `translate(${mousePos.x * 0.5}px, ${mousePos.y * 0.5}px)` }}>
        <div ref={labelRef} className={styles.label}>
          <span className={styles.labelLine} />
          <span>NEXGEN DEVELOPERS</span>
        </div>

        <h1 className={styles.heading}>
          <span ref={line1Ref} className={styles.line} data-text="Building">Building</span>
          <span ref={line2Ref} className={styles.line} data-text="Tomorrow's">Tomorrow&apos;s</span>
          <span ref={line3Ref} className={styles.line}>
            <span ref={highlightRef} className={styles.highlight} data-text="Digital">Digital</span>
          </span>
          <span ref={line4Ref} className={styles.line} data-text="Experiences">Experiences</span>
        </h1>

        <div ref={dividerRef} className={styles.divider} />

        <p ref={subtitleRef} className={styles.subtitle}>
          <span>AI Solutions</span>
          <span className={styles.pipe}>|</span>
          <span>Web Development</span>
          <span className={styles.pipe}>|</span>
          <span>Mobile Apps</span>
          <span className={styles.pipe}>|</span>
          <span>Cloud Infrastructure</span>
        </p>

        <button ref={ctaRef} className={styles.cta}>
          <span className={styles.ctaText}>Explore NexGen</span>
          <svg className={styles.ctaArrow} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="5" y1="12" x2="19" y2="12" />
            <polyline points="12 5 19 12 12 19" />
          </svg>
        </button>
      </div>
    </section>
  )
}