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
        {
          y: 40,
          opacity: 0,
        },
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
      id="contact"
      className="relative w-full bg-[#111110] overflow-hidden"
    >
      {/* Divider */}
      <div className="absolute top-0 left-6 md:left-12 right-6 md:right-12 h-[1px] bg-white/20 z-30"></div>

      {/* Content */}
      <div
        ref={contentRef}
        className="relative z-30"
      >
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 py-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          
          <p className="text-xs text-white/50">
            2026. All rights reserved.
          </p>

          <div className="flex flex-wrap items-center gap-6">
            {[
              'Privacy policy',
              'Cookies policy',
              'Legal notice',
            ].map((link) => (
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

      {/* Images Section */}
      <div className="w-full flex flex-col items-center justify-center">

        {/* HANDS IMAGE */}
        <div className="w-full bg-transparent overflow-hidden">
          <img
            src="/images/hands2.png"
            alt="decorative hands"
            className="
              w-full
              h-auto
              object-cover
              block
            "
          />
        </div>

        {/* WOWINX IMAGE */}
        <div className="w-full flex justify-center bg-[#111110] pt-2 md:pt-4">
          <img
            src="/images/wowinx footer.png"
            alt="wowinx footer"
            className="
              w-[92%]
              md:w-[85%]
              h-auto
              object-contain
              block
            "
          />
        </div>

      </div>
    </footer>
  );
}