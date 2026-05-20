import { useRef, useEffect } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function EcosystemSection() {
  const sectionRef = useRef(null);
  const imageRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const imageAnimation = gsap.fromTo(
      imageRef.current,
      { x: -60, opacity: 0, scale: 0.95 },
      {
        x: 0,
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

    const textAnimation = gsap.fromTo(
      textRef.current,
      { x: 60, opacity: 0 },
      {
        x: 0,
        opacity: 1,
        duration: 1,
        delay: 0.15,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: section,
          start: 'top 70%',
          toggleActions: 'play none none reverse',
        },
      }
    );

    return () => {
      imageAnimation.scrollTrigger?.kill();
      textAnimation.scrollTrigger?.kill();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="w-full py-28 md:py-40 px-6 md:px-12 bg-bg"
    >
      <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
        {/* Left: 3D Cross Image */}
        <div ref={imageRef}>
          <div className="relative w-full aspect-[4/3] rounded-lg overflow-hidden bg-black">
            <img
              src="/images/unsplash.jpg"
              alt="3D cross structure representing ecosystem"
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </div>
        </div>

        {/* Right: Text */}
        <div ref={textRef}>
          <h2 className="text-section font-semibold text-white mb-6 tracking-[-0.02em]">
            Each company in the
            <br />
            ecosystem opens
            <br />
            doors to the next
            <br />
            ones.
          </h2>

          <p className="text-body-lg text-text-secondary max-w-[480px] mb-8 leading-relaxed">
            If you see a business opportunity in what we are
            building, let's talk. Here, execution is the common
            language.
          </p>

          <a
            href="#contact"
            className="btn-outline group"
            id="btn-talk"
          >
            Let's talk
            <ArrowUpRight
              size={16}
              className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </a>
        </div>
      </div>
    </section>
  );
}
