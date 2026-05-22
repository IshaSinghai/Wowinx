import { useRef, useEffect } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useTranslation } from 'react-i18next';


gsap.registerPlugin(ScrollTrigger);

export default function BuildNextSection() {
  const { t } = useTranslation();
  const sectionRef = useRef(null);
  const imageRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    // Text reveal on scroll
    const textAnimation = gsap.fromTo(
      textRef.current,
      { y: 60, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: section,
          start: 'top 75%',
          toggleActions: 'play none none reverse',
        },
      }
    );

    // Image reveal on scroll
    const imageAnimation = gsap.fromTo(
      imageRef.current,
      { y: 40, opacity: 0, scale: 0.97 },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 1.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: section,
          start: 'top 70%',
          toggleActions: 'play none none reverse',
        },
      }
    );

    return () => {
      textAnimation.scrollTrigger?.kill();
      imageAnimation.scrollTrigger?.kill();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="w-full py-20 md:py-28 px-6 md:px-12 bg-bg"
      id="join"
    >
      <div className="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-center">
        {/* Left: Text */}
        <div ref={textRef} className="order-1 md:order-1">
          <h2 className="text-section font-semibold text-white mb-6 tracking-[-0.02em]" style={{ whiteSpace: 'pre-line' }}>
            {t('buildNext.title')}
          </h2>

          <p className="text-body-lg text-text-secondary max-w-[500px] mb-8 leading-relaxed">
            {t('buildNext.description')}
          </p>

          <a
            href="#positions"
            className="btn-outline group"
            id="btn-positions"
          >
            {t('buildNext.cta')}
            <ArrowUpRight
              size={16}
              className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </a>
        </div>

        {/* Right: Image */}
        <div ref={imageRef} className="order-2 md:order-2">
          <div className="relative w-full aspect-[4/3] rounded-lg overflow-hidden">
            <img
              src="/images/8fd93ab3a99f4f956a66a4ffd922851a454682b8.png"
              alt="Team members in editorial setting"
              className="w-full h-full object-cover"
              loading="lazy"
            />
            {/* Subtle gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-bg/20 to-transparent" />
          </div>
        </div>
      </div>
    </section>
  );
}
