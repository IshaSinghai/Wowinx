import { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function OurVisionPage() {
  const heroRef = useRef(null);
  const heroImageRef = useRef(null);
  const heroTextRef = useRef(null);
  const manifestoRef = useRef(null);
  const manifestoTextRef = useRef(null);
  const flowBtnRef = useRef(null);
  const convergenceRef = useRef(null);
  const vrImageRef = useRef(null);
  const convergenceTextRef = useRef(null);
  const accordionRef = useRef(null);

  useEffect(() => {
    // Scroll to top when page mounts
    window.scrollTo(0, 0);

    const ctx = gsap.context(() => {
      // Hero parallax
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

      // Manifesto text reveal
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

      // Flow button reveal
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

      // VR image reveal
      gsap.fromTo(
        vrImageRef.current,
        { x: -60, opacity: 0, scale: 0.95 },
        {
          x: 0,
          opacity: 1,
          scale: 1,
          duration: 1.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: convergenceRef.current,
            start: 'top 70%',
            toggleActions: 'play none none none',
          },
        }
      );

      // Convergence text reveal
      gsap.fromTo(
        convergenceTextRef.current,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          delay: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: convergenceRef.current,
            start: 'top 70%',
            toggleActions: 'play none none none',
          },
        }
      );

      // Accordion items stagger
      const accordionItems = accordionRef.current?.querySelectorAll('.accordion-item');
      if (accordionItems) {
        gsap.fromTo(
          accordionItems,
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

  const accordionItems = [
    {
      number: '/01',
      text: 'Deporte, entretenimiento, cultura, negocio y digital se fusionan en un solo espacio de experiencia humana — reinventando sobre estructuras. La identidad de una marca, de un mercado y construimos productos desde el origen.',
    },
    {
      number: '/02',
      text: 'Construir otros tres sectores, impactar en la comunicación.',
    },
    {
      number: '/03',
      text: 'Una economía más inteligente, más inmersiva y más humana.',
    },
  ];

  return (
    <div className="bg-[#111110] min-h-screen">
      {/* ============================================
          HERO SECTION — Man at desk with floating objects
          ============================================ */}
      <section
        ref={heroRef}
        className="relative w-full h-[60vh] md:h-[85vh] overflow-hidden"
        id="vision-hero"
      >
        {/* Background Image */}
        <div ref={heroImageRef} className="absolute inset-0 z-10">
          <motion.img
            src="/images/vision1.png"
            alt="Man at desk with floating tech objects"
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.4 }}
            className="absolute inset-0 w-full h-full object-cover object-center"
          />
          {/* Bottom gradient fade to dark */}
          <div className="absolute bottom-0 left-0 right-0 h-[40%] bg-gradient-to-t from-[#111110] via-[#111110]/60 to-transparent z-20" />
        </div>

        {/* Hero Text Overlay */}
        <div className="relative z-30 h-full flex flex-col justify-end px-6 md:px-12 pb-10 md:pb-16">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="max-w-[1400px] mx-auto w-full"
          >
            <h1
              className="text-white text-[clamp(1.4rem,3.5vw,2.4rem)] font-normal leading-[1.3] tracking-[-0.01em] max-w-[600px]"
              style={{ fontFamily: 'PP Neue Montreal, Inter, sans-serif' }}
            >
              Construimos lo que viene. Con
              <br />
              personas. En digital.
            </h1>
          </motion.div>
        </div>
      </section>

      {/* ============================================
          MANIFESTO SECTION — Dark text block
          ============================================ */}
      <section
        ref={manifestoRef}
        className="w-full bg-[#111110] py-16 md:py-28 px-6 md:px-12"
        id="vision-manifesto"
      >
        <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row md:items-end md:justify-between gap-8 md:gap-16">
          <div ref={manifestoTextRef}>
            <h2
              className="text-white text-[clamp(1.5rem,3.5vw,2.8rem)] font-semibold leading-[1.15] tracking-[-0.02em] max-w-[700px] uppercase"
              style={{ fontFamily: 'PP Neue Montreal, Inter, sans-serif' }}
            >
              IGUAL QUE EL RENACIMIENTO MEZCLÓ ARTE, CIENCIA Y
              COMERCIO PARA ABRIR UN MUNDO NUEVO — WOWINX MEZCLA
              CULTURA, TECNOLOGÍA Y NEGOCIO PARA CONSTRUIR EL SIGUIENTE
            </h2>
          </div>

          <div ref={flowBtnRef} className="flex-shrink-0">
            <button
              className="flex items-center gap-2 text-white text-sm font-medium hover:opacity-80 transition-opacity duration-300 group whitespace-nowrap"
              style={{ fontFamily: 'Inter, sans-serif' }}
            >
              <span className="uppercase tracking-[0.1em]">FLOW IT</span>
              <ArrowUpRight
                size={15}
                strokeWidth={2}
                className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </button>
          </div>
        </div>
      </section>

      {/* ============================================
          CONVERGENCE SECTION — VR silhouette + text + accordion
          ============================================ */}
      <section
        ref={convergenceRef}
        className="w-full bg-[#111110] pb-16 md:pb-28"
        id="vision-convergence"
      >
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
            {/* Left: VR Image */}
            <div ref={vrImageRef} className="relative">
              <div className="relative w-full aspect-[4/3] rounded-lg overflow-hidden bg-black">
                <img
                  src="/images/vision2.png"
                  alt="VR silhouette with headset"
                  className="w-full h-full object-cover object-center"
                  loading="lazy"
                />
              </div>

              {/* "Our vision" label overlaid on bottom-left of image */}
              <div className="absolute bottom-4 md:bottom-8 left-4 md:left-8 z-10">
                <h3
                  className="text-white text-[clamp(2rem,4vw,3.5rem)] font-normal leading-[1.1] tracking-[-0.02em]"
                  style={{ fontFamily: 'PP Neue Montreal, Inter, sans-serif' }}
                >
                  Our vision
                </h3>
              </div>
            </div>

            {/* Right: Text + Accordion */}
            <div ref={convergenceTextRef} className="flex flex-col pt-0 lg:pt-4">
              {/* Number tag */}
              <span
                className="text-white/40 text-xs tracking-[0.15em] uppercase mb-4"
                style={{ fontFamily: 'Inter, sans-serif' }}
              >
                /01
              </span>

              {/* Title */}
              <h3
                className="text-white text-[clamp(1.2rem,2.5vw,1.8rem)] font-semibold leading-[1.2] tracking-[-0.01em] mb-4"
                style={{ fontFamily: 'PP Neue Montreal, Inter, sans-serif' }}
              >
                El momento en que todo
                <br />
                converge
              </h3>

              {/* Description */}
              <p
                className="text-white/60 text-sm leading-[1.7] max-w-[440px] mb-8"
                style={{ fontFamily: 'Inter, sans-serif' }}
              >
                Deporte, entretenimiento, cultura, negocio y digital se
                fusionan en un solo espacio de experiencia humana —
                reinventando sobre estructuras. La identidad de una marca, de un
                mercado y construimos productos desde el origen.
              </p>

              {/* Accordion-like items */}
              <div ref={accordionRef} className="flex flex-col">
                {accordionItems.map((item, index) => (
                  <div
                    key={index}
                    className="accordion-item border-t border-white/[0.08] py-5 flex items-start gap-6"
                  >
                    <span
                      className="text-white/40 text-xs tracking-[0.1em] flex-shrink-0 pt-0.5"
                      style={{ fontFamily: 'Inter, sans-serif' }}
                    >
                      {item.number}
                    </span>
                    <p
                      className="text-white/70 text-sm leading-[1.6] max-w-[400px]"
                      style={{ fontFamily: 'Inter, sans-serif' }}
                    >
                      {item.text}
                    </p>
                  </div>
                ))}
                {/* Bottom border */}
                <div className="border-t border-white/[0.08]" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
