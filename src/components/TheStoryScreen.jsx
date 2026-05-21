import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

import MarqueeSection from './MarqueeSection';
import Footer from './Footer';

const FONT_STYLE = {
  fontFamily: '"PP Neue Montreal", sans-serif',
  fontSize: '56px',
  fontStyle: 'normal',
  fontWeight: 500,
  lineHeight: '64px',
  letterSpacing: '-0.56px',
};

export default function StoryScreen() {
  const { t } = useTranslation();
  const paragraphs = t('story.paragraphs', { returnObjects: true });
  const paraRefs = useRef([]);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const center = window.innerHeight / 2;
      paraRefs.current.forEach((el, i) => {
        if (!el) return;
        const { top, bottom } = el.getBoundingClientRect();
        if (top <= center && bottom >= center) {
          setActiveIndex(i);
        }
      });
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div style={{ backgroundColor: '#000', color: '#fff', overflowX: 'hidden' }}>

      {/* ── HERO ── */}
      <section style={{ position: 'relative', width: '100%', height: '100vh' }}>
        <img
          src="/images/StoryImage.png"
          alt="story hero"
          style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
        />
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(to bottom, rgba(0,0,0,0.1) 60%, rgba(0,0,0,0.7) 100%)'
        }} />
        <div style={{
          position: 'absolute', bottom: 64,
          left: 'clamp(24px, 6vw, 80px)',
          maxWidth: 700,
        }}>
          <h1 style={{
            fontSize: 'clamp(32px, 5.5vw, 72px)',
            fontWeight: 300,
            lineHeight: 1.05,
            letterSpacing: '-0.02em',
            margin: 0,
            whiteSpace: 'pre-line',
          }}>
            {t('story.hero')}
          </h1>
        </div>
      </section>

      {/* ── STATIC INTRO PARAGRAPH ── */}
      <section style={{ padding: '120px clamp(24px, 6vw, 80px) 80px' }}>
        <p style={{
          ...FONT_STYLE,
          color: '#F8F8F8',
          margin: 0,
        }}>
          {t('story.intro')}
        </p>
      </section>

      {/* ── SCROLL-BLURRED PARAGRAPHS ── */}
      <section style={{ padding: '0 0 100px' }}>
        {paragraphs.map((text, i) => {
          const dist = Math.abs(activeIndex - i);
          return (
            <div
              key={i}
              ref={el => (paraRefs.current[i] = el)}
              style={{ padding: '48px clamp(24px, 6vw, 80px)' }}
            >
              <motion.p
                animate={{
                  opacity: dist === 0 ? 1 : dist === 1 ? 0.3 : 0.1,
                  filter:
                    dist === 0 ? 'blur(0px)'
                    : dist === 1 ? 'blur(2px)'
                    : 'blur(6px)',
                  scale: dist === 0 ? 1 : 0.98,
                }}
                transition={{ duration: 0.55, ease: 'easeOut' }}
                style={{
                  ...FONT_STYLE,
                  margin: 0,
                  color: '#303035',
                }}
              >
                {text}
              </motion.p>
            </div>
          );
        })}
      </section>

      {/* ── MARQUEE + FOOTER ── */}
      <MarqueeSection />
      <Footer />
    </div>
  );
}