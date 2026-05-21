import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

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

const paragraphs = [
  `wowinX was born from that decision. From the conviction that the digital world was about to be transformed completely — and that those who arrived early, with vision and the right people, would define the rules. Since 2009, we've been building in that territory. Learning the problems before the market knew they existed. Accumulating the kind of knowledge that only comes from arriving first.`,

  `Hoy somos un ecosistema de empresas que opera en los espacios donde la vida humana digital ocurre: el deporte y la competición, el entretenimiento y la cultura, la música y la creación, las nuevas economías y los activos digitales, la formación, la comunidad, la identidad y la seguridad.`,

  `Una creencia atraviesa todo lo que construimos: la tecnología es el mayor superpoder que hemos creado. Las personas, la razón de todo.`,

  `XR, inteligencia artificial y Web3 son las herramientas. Lo que importa es lo que ocurre cuando esas herramientas amplían lo humano, cuando el deporte llega a cualquier lugar del mundo, cuando el conocimiento de un ídolo se vuelve accesible, cuando la música recupera su verdad, cuando cualquier persona puede competir, crear y conectar sin límites geográficos ni barreras económicas.`,

  `Eso es wowinX, un ecosistema construido por personas que decidieron transitar nuevos caminos y que siguen construyendo.`,
];

export default function StoryScreen() {
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
          }}>
            Digital is the territory. <br />People are the reason behind it all. 
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
          There have always been people who choose to build their lives instead of letting life happen to them. People who choose the path before it exists. People who commit to what doesn't yet have a name — and keep going while the world still doesn't understand why.
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