import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useTranslation } from 'react-i18next';
import { ArrowUpRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function Footer() {
  const { t } = useTranslation();
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
      {/* Content */}
      <div
        ref={contentRef}
        className="relative z-30"
      >
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 pt-14 md:pt-16 pb-10 md:pb-12 grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-12">
          <div className="max-w-[320px]">
            <img
              src="/images/wowinx.png"
              alt="wowinx"
              className="h-8 w-auto object-contain"
            />
            <p className="mt-7 text-[16px] sm:text-[24px] leading-[1.35] text-white/95">
              {t('footer.top.description')}
            </p>
          </div>

          <div>
            <h3 className="text-[20px] leading-[28px] text-white font-normal">
              {t('footer.top.linksTitle')}
            </h3>
            <div className="mt-10 flex flex-col gap-4">
              <a href="#story" className="text-[14px] leading-[20px] text-white/90 hover:text-white transition-colors duration-300">
                {t('footer.top.story')}
              </a>
              <a href="#OurVisionPage" className="text-[14px] leading-[20px] text-white/90 hover:text-white transition-colors duration-300">
                {t('footer.top.vision')}
              </a>
            </div>
            <a
              href="#"
              className="mt-8 inline-flex items-center gap-2 border border-white/90 text-white text-[16px] leading-[24px] px-4 py-2 hover:bg-white hover:text-black transition-colors duration-300"
            >
              <span>{t('footer.top.linkedin')}</span>
              <ArrowUpRight size={30} />
            </a>
          </div>

          <div>
            <h3 className="text-[18px] leading-[28px] text-white font-normal">
              {t('footer.top.subscribeTitle')}
            </h3>
            <p className="mt-10 text-[14px] leading-[20px] text-white/90">
              {t('footer.top.subscribeText')}
            </p>
            <input
              type="email"
              placeholder={t('footer.top.emailPlaceholder')}
              className="mt-7 w-full bg-black/55 border border-white/15 rounded-[14px] px-4 py-3 text-[16px] leading-[24px] text-white placeholder:text-white/35 outline-none focus:border-white/35 transition-colors duration-300"
            />
            <p className="mt-4 text-[14px] leading-[20px] text-white/35">
              {t('footer.top.unsubscribe')}
            </p>
          </div>
        </div>

        <div className="mx-6 md:mx-12 h-[1px] bg-white/20" />

        <div className="max-w-[1400px] mx-auto px-6 md:px-12 py-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          
          <p className="text-xs text-white/50">
            {t('footer.rights')}
          </p>

          <div className="flex flex-wrap items-center gap-6">
            {[
              { key: 'footer.privacy', label: t('footer.privacy') },
              { key: 'footer.cookies', label: t('footer.cookies') },
              { key: 'footer.legal', label: t('footer.legal') },
            ].map(({ key, label }) => (
              <a
                key={key}
                href="#"
                className="text-xs text-white/60 hover:text-white transition-colors duration-300 underline underline-offset-2"
              >
                {label}
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