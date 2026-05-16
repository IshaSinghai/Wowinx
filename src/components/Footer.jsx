import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Footer() {
  const footerRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        contentRef.current,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: footerRef.current,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        }
      );
    }, footerRef);

    return () => ctx.revert();
  }, []);

  return (
    <footer
      ref={footerRef}
      className="relative w-full bg-[#111110] overflow-hidden"
      id="contact"
    >
      {/* Divider */}
      <div className="absolute top-0 left-12 right-12 h-[1px] bg-white/20 z-30"></div>

      {/* Content */}
      <div ref={contentRef} className="relative z-30">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 py-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <p className="text-xs text-white/50">
            2026. All rights reserved.
          </p>

          <div className="flex flex-wrap items-center gap-6">
            {['Privacy policy', 'Cookies policy', 'Legal notice'].map((link) => (
              <a
                key={link}
                href="#"
                className="text-xs text-white/60 hover:text-white transition-colors duration-300 underline underline-offset-2"
              >
                {link}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Visual Layers */}
      <div className="relative w-full h-[420px] overflow-hidden">

        {/* WOWINX (BOTTOM layer) */}
        <img
          src="/images/wowinx footer.png"
          alt="wowinx background"
          className="absolute bottom-[-80px] left-1/2 -translate-x-1/2 w-[85%] max-w-none z-0 pointer-events-none"
        />

        {/* HANDS (TOP layer - black bg handled via blend mode) */}
        <img
          src="/images/hands.png"
          alt="decorative hands"
          className="absolute inset-0 w-full h-full object-cover z-10 pointer-events-none mix-blend-screen"
        />

      </div>
    </footer>
  );
}