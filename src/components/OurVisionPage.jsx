import { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight } from 'lucide-react';

import MarqueeSection from './MarqueeSection';
import Footer from './Footer';

gsap.registerPlugin(ScrollTrigger);

export default function OurVisionPage() {
  const heroRef = useRef(null);
  const heroImageRef = useRef(null);
  const manifestoRef = useRef(null);
  const manifestoTextRef = useRef(null);
  const flowBtnRef = useRef(null);
  const convergenceRef = useRef(null);
  const convergenceTextRef = useRef(null);
  const accordionRef = useRef(null);

  const [activePoint, setActivePoint] = useState(0);

  const accordionItems = [
    {
      number: '/01',
      title: 'El momento en que todo converge',
      text: 'Deporte, entretenimiento, cultura, negocio y digital se fusionan en un solo espacio de experiencia humana — explorando infinitas, nuevas vistas en esta esfera. La identidad entre casi el mercado y construyó posición desde el origen.',
      image: '/images/vision3.png',
    },
    {
      number: '/02',
      title: 'Donde otros ven sectores, wowinx ve conexiones',
      text: 'Construir otros tres sectores, impactar en la comunicación.',
      image: '/images/vision4.png',
    },
    {
      number: '/03',
      title:
        'Una economía más inteligente, más inmersiva y más humana.',
      text: 'Ese es el mundo que wowinx está construyendo. Empresas con valor económico y con valores humanos, porque ambos crecen cuando juntas. El digital es el territorio. Las personas, la razón de todo.',
      image: '/images/vision5.png',
    },
  ];

  useEffect(() => {
    window.scrollTo(0, 0);

    const ctx = gsap.context(() => {
      gsap.fromTo(
        heroImageRef.current,
        { scale: 1, y: 0 },
        {
          scale: 1.15,
          y: -40,
          ease: 'none',
          scrollTrigger: {
            trigger: heroRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: 1.5,
          },
        }
      );

      gsap.fromTo(
        manifestoTextRef.current,
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: manifestoRef.current,
            start: 'top 75%',
            toggleActions: 'play none none none',
          },
        }
      );

      gsap.fromTo(
        flowBtnRef.current,
        { x: 40, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 1,
          delay: 0.3,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: manifestoRef.current,
            start: 'top 75%',
            toggleActions: 'play none none none',
          },
        }
      );

      gsap.fromTo(
        convergenceTextRef.current,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: convergenceRef.current,
            start: 'top 70%',
            toggleActions: 'play none none none',
          },
        }
      );

      const items =
        accordionRef.current?.querySelectorAll('.accordion-item');

      if (items) {
        gsap.fromTo(
          items,
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.15,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: accordionRef.current,
              start: 'top 80%',
              toggleActions: 'play none none none',
            },
          }
        );
      }
    });

    return () => ctx.revert();
  }, []);

  return (
    <>
      <div className="bg-[#111110] min-h-screen">
        {/* Hero */}
        <section
          ref={heroRef}
          className="relative w-full h-[60vh] md:h-[85vh] overflow-hidden"
          id="vision-hero"
        >
          <div ref={heroImageRef} className="absolute inset-0 z-10">
            <motion.img
              src="/images/vision1.png"
              alt="Man at desk with floating tech objects"
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.4 }}
              className="absolute inset-0 w-full h-full object-cover object-center"
            />

            <div className="absolute bottom-0 left-0 right-0 h-[40%] bg-gradient-to-t from-[#111110] via-[#111110]/60 to-transparent z-20" />
          </div>

          <div className="relative z-30 h-full flex flex-col justify-end px-2 md:px-12 pb-10 md:pb-16">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.5 }}
              className="max-w-[1400px] mx-auto w-full"
            >
              <h1
                className="text-white text-[24px] md:text-[clamp(1.4rem,3.5vw,2.4rem)] font-normal leading-[1.1] md:leading-[1.3] tracking-[-0.01em] max-w-[600px]"
                style={{
                  fontFamily:
                    'PP Neue Montreal, Inter, sans-serif',
                }}
              >
                Construimos lo que viene. Con
                <br />
                personas. En digital.
              </h1>
            </motion.div>
          </div>
        </section>

        {/* Manifesto */}
        <section
          ref={manifestoRef}
          className="w-full bg-[#111110] py-8 md:py-28 px-2 md:px-12"
          id="vision-manifesto"
        >
          <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row md:items-end md:justify-between gap-8 md:gap-16">
            <div ref={manifestoTextRef}>
              <h2
                className="text-white text-[23px] md:text-[clamp(1.5rem,3.5vw,2.8rem)] font-semibold leading-[1.08] md:leading-[1.15] tracking-[-0.02em] max-w-[700px] uppercase"
                style={{
                  fontFamily:
                    'PP Neue Montreal, Inter, sans-serif',
                }}
              >
                IGUAL QUE EL RENACIMIENTO MEZCLÓ ARTE, CIENCIA Y
                COMERCIO PARA ABRIR UN MUNDO NUEVO — WOWINX MEZCLA
                CULTURA, TECNOLOGÍA Y NEGOCIO PARA CONSTRUIR EL
                SIGUIENTE
              </h2>
            </div>

            <div
              ref={flowBtnRef}
              className="flex-shrink-0 flex justify-end"
            >
              <button
                className="flex items-center gap-2 text-white text-sm font-medium hover:opacity-80 transition-opacity duration-300 group whitespace-nowrap"
                style={{ fontFamily: 'Inter, sans-serif' }}
              >
                <span className="w-14 h-px bg-white/50 block" />
                <span className="uppercase tracking-[0.02em]">
                  FLOWIT
                </span>
                <ArrowUpRight
                  size={15}
                  strokeWidth={2}
                  className="hidden md:block transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </button>
            </div>
          </div>
        </section>

        {/* Vision */}
        <section
          ref={convergenceRef}
          className="w-full bg-[#111110]"
          id="vision-convergence"
        >
          <div className="w-full max-w-[1440px] mx-auto">
            <div className="relative w-full md:h-[672px] overflow-hidden bg-[#111110]">
              <img
                src="/images/vision2.png"
                alt="VR silhouette with headset"
                className="
                  w-full h-auto
                  md:absolute md:inset-0 md:w-full md:h-full
                  object-cover object-center
                  block
                "
                loading="lazy"
              />

              <div className="relative md:absolute left-0 md:left-20 bottom-auto md:bottom-12 z-20 px-2 md:px-0 -mt-10 md:mt-0">
                <h2
                  className="text-black text-[32px] md:text-[56px] font-normal leading-none tracking-[-0.03em]"
                  style={{
                    fontFamily:
                      'PP Neue Montreal, Inter, sans-serif',
                  }}
                >
                  Our vision
                </h2>
              </div>

              <div
                ref={convergenceTextRef}
                className="
                  relative z-10
                  w-full md:w-[733px]
                  md:min-h-[672px]
                  md:ml-auto
                  bg-[#8D8D8A] md:bg-[#8D8D8A]/90
                  p-4
                  flex flex-col
                "
              >
                <div className="mt-2 md:mt-10">
                  <div ref={accordionRef} className="flex flex-col">
                    {accordionItems.map((item, index) => {
                      const isActive = activePoint === index;

                      return (
                        <div
                          key={item.number}
                          onMouseEnter={() => setActivePoint(index)}
                          onClick={() => setActivePoint(index)}
                          className="accordion-item border-t border-white/40 py-4 cursor-pointer"
                        >
                          <div className="grid grid-cols-[34px_1fr] md:grid-cols-[42px_1fr] gap-3 md:gap-4">
                            <span
                              className="text-white text-[10px] md:text-[11px] leading-4"
                              style={{
                                fontFamily: 'Inter, sans-serif',
                              }}
                            >
                              {item.number}
                            </span>

                            <div>
                              <h3
                                className={`font-normal leading-[1.15] transition-colors duration-300 ${
                                  isActive
                                    ? 'text-white text-[15px] md:text-[25px]'
                                    : 'text-white text-[10px] md:text-[12px]'
                                }`}
                                style={{
                                  fontFamily:
                                    'PP Neue Montreal, Inter, sans-serif',
                                }}
                              >
                                {item.title}
                              </h3>

                              {isActive && (
                                <>
                                  <p
                                    className="mt-3 md:mt-4 text-white text-[10px] md:text-[12px] leading-[1.45] max-w-[390px]"
                                    style={{
                                      fontFamily:
                                        'Inter, sans-serif',
                                    }}
                                  >
                                    {item.text}
                                  </p>

                                  <img
                                    src={item.image}
                                    alt={item.title}
                                    className="
                                      mt-5 md:mt-6
                                      w-full max-w-[411px]
                                      h-[165px]
                                      object-cover object-center
                                      rounded-[2px]
                                      block
                                    "
                                  />
                                </>
                              )}
                            </div>
                          </div>
                        </div>
                      );
                    })}

                    <div className="border-t border-white/40" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      <MarqueeSection />

      <Footer />
    </>
  );
}