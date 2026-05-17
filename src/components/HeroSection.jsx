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
      className="relative w-full min-h-[680px] md:h-screen flex flex-col justify-end overflow-hidden bg-black"
      id="hero"
    >
      <div ref={imageRef} className="absolute inset-0 z-10 overflow-hidden">
        <motion.img
          src="/images/HomepageWomen.png"
          alt="VR Person"
          initial={{ opacity: 0, scale: 1.08 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.6 }}
          className="absolute inset-0 w-full h-full object-cover"
        />
      </div>

      <div className="relative z-20 px-5 sm:px-8 md:px-12 pb-14 md:pb-20 text-center">
        <motion.div
          ref={textRef}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, delay: 0.5 }}
          className="relative w-full max-w-[1180px] mx-auto"
        >
          <h1
            className={`
              relative
              text-[#ffffff]
              text-[clamp(2.2rem,5vw,5.2rem)]
              drop-shadow-[0_3px_10px_rgba(0,0,0,0.45)]
              leading-[1.02]
              md:leading-[0.95]
              tracking-[-0.06em]
              font-medium
              text-center
              break-words
              max-w-full
              overflow-visible
            `}
          >
            The constellation of companies behind the
            
            next generation of human experiences
          </h1>

          <motion.div
            ref={citiesRef}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.9 }}
            className="
              mt-6
              flex
              items-center
              justify-center
              gap-3
              sm:gap-4
              flex-wrap
              text-xs
              sm:text-sm
              text-white/90
              font-medium
            "
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
        </motion.div>
      </div>

    </section>
  );
}