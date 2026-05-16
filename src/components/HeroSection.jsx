import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const cities = ['Miami', 'Dubai', 'Madrid', 'Andorra', 'Medellín'];

export default function HeroSection() {
  const sectionRef = useRef(null);
  const imageRef = useRef(null);
  const textRef = useRef(null);
  const citiesRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const section = sectionRef.current;

      // Background parallax
      gsap.fromTo(
        imageRef.current,
        { scale: 1, y: 0 },
        {
          scale: 1.2,
          y: -50,
          ease: 'none',
          scrollTrigger: {
            trigger: section,
            start: 'top top',
            end: 'bottom top',
            scrub: 1.5,
          },
        }
      );

      // Text movement only (no disappearing)
      gsap.to(textRef.current, {
        y: 80,
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: '55% top',
          end: 'bottom top',
          scrub: true,
        },
      });

      // Cities movement
      gsap.to(citiesRef.current, {
        y: 50,
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: '60% top',
          end: 'bottom top',
          scrub: true,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full h-screen flex flex-col justify-end overflow-hidden bg-black"
      id="hero"
    >
      {/* Background Image */}
      <div ref={imageRef} className="absolute inset-0 z-10 overflow-hidden">
        <motion.img
          src="/images/c7e65d987f08961585c06a72e5f0c3f28b4caeee.png"
          alt="VR Person"
          initial={{ opacity: 0, scale: 1.08 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.6 }}
          className="absolute inset-0 w-full h-full object-cover"
        />
      </div>

      {/* Content */}
      <div className="relative z-20 px-6 md:px-12 pb-14 md:pb-20 text-center">

        {/* Dual Tone Text */}
        <motion.div
          ref={textRef}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, delay: 0.5 }}
          className="relative max-w-[1004px] mx-auto"
        >
          {/* Bottom layer (dark) */}
          <h1 className="absolute inset-0 text-[#1a1a1a] text-[56px] leading-[56px] tracking-[-0.01em] font-medium text-center">
            The constellation of companies behind the <br />
            next generation of human experiences
          </h1>

          {/* Top layer (white clipped) */}
          <h1 className="relative text-[#F8F8F8] text-[56px] leading-[56px] tracking-[-0.01em] font-medium text-center clip-text-half">
            The constellation of companies behind the <br />
            next generation of human experiences
          </h1>
        </motion.div>

        {/* Cities */}
        <motion.div
          ref={citiesRef}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9 }}
          className="mt-6 flex items-center justify-center gap-4 flex-wrap text-sm text-white/90 font-medium"
        >
          {cities.map((city, i) => (
            <span key={city} className="flex items-center gap-2">
              {city}
              {i < cities.length - 1 && (
                <span className="w-[4px] h-[4px] rounded-full bg-white/80" />
              )}
            </span>
          ))}
        </motion.div>

      </div>
    </section>
  );
}