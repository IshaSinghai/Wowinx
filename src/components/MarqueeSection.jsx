import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useTranslation } from 'react-i18next';

gsap.registerPlugin(ScrollTrigger);

export default function MarqueeSection() {
  const { t } = useTranslation();
  const trackRef = useRef(null);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const marqueeTrigger = ScrollTrigger.create({
      trigger: track,
      start: 'top bottom',
      end: 'bottom top',
      onUpdate: (self) => {
        const velocity = Math.abs(self.getVelocity());
        const currentSpeed = gsap.utils.clamp(0.6, 1.2, velocity / 4000);
        gsap.to(track, {
          '--marquee-speed': currentSpeed,
          duration: 4,
          ease: 'power1.out',
          overwrite: true,
        });
      },
    });

    return () => marqueeTrigger.kill();
  }, []);

  const marqueeContent = (
    <>
    <span
      className='text-[22px] sm:text-[48px] font-normal leading-[48px] text-[#111110] whitespace-nowrap'
      style={{
        fontFamily: '"PP Neue Montreal", sans-serif',
      }}
    >
        {t('marquee.text')}
      </span>
      <span style={{
        fontFamily: '"PP Neue Montreal", sans-serif',
        fontSize: '48px',
        fontWeight: 400,
        lineHeight: '48px',
        color: '#111110',
        whiteSpace: 'nowrap',
        margin: '0 32px',
      }}>
        /
      </span>
    </>
  );

  return (
    <section style={{ width: '100%', overflow: 'hidden', backgroundColor: '#F8F5EF', borderTop: '1px solid rgba(17,17,16,0.08)', borderBottom: '1px solid rgba(17,17,16,0.08)' }}>
      <div className='py-3 sm:pt-6 sm:pb-8'>
        <div
          ref={trackRef}
          style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '10px', '--marquee-speed': 1 }}
        >
          <div
            className="animate-marquee"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0px',
              animationDuration: 'calc(90s / var(--marquee-speed))',
            }}
          >
            {marqueeContent}
            {marqueeContent}
            {marqueeContent}
            {marqueeContent}
            {marqueeContent}
            {marqueeContent}
          </div>
        </div>
      </div>
    </section>
  );
}