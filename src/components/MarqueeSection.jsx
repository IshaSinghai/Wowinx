import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function MarqueeSection() {
  const trackRef = useRef(null);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    // Speed up/slow down marquee based on scroll velocity
    let currentSpeed = 1;

    ScrollTrigger.create({
      trigger: track,
      start: 'top bottom',
      end: 'bottom top',
      onUpdate: (self) => {
        const velocity = Math.abs(self.getVelocity());
        currentSpeed = gsap.utils.clamp(1, 4, velocity / 500);
        gsap.to(track, {
          '--marquee-speed': currentSpeed,
          duration: 0.3,
          overwrite: true,
        });
      },
    });

    return () => ScrollTrigger.getAll().forEach(t => t.kill());
  }, []);

  const marqueeContent = (
    <>
      <span className="text-[clamp(2rem,5vw,4.5rem)] font-semibold text-white tracking-[-0.03em] whitespace-nowrap">
        The renaissance
      </span>
      <div className="w-[80px] h-[80px] md:w-[110px] md:h-[110px] overflow-hidden flex-shrink-0 mx-4 md:mx-6">
        <img
          src="/images/earth.png"
          alt="Earth"
          className="w-full h-full object-cover"
          loading="lazy"
        />
      </div>
      <span className="text-[clamp(2rem,5vw,4.5rem)] font-semibold text-white tracking-[-0.03em] whitespace-nowrap">
        of the 22nd century
      </span>
      <div className="w-[80px] h-[80px] md:w-[110px] md:h-[110px] overflow-hidden flex-shrink-0 mx-4 md:mx-6">
        <img
          src="/images/silver metal.png"
          alt="Silver metal"
          className="w-full h-full object-cover"
          loading="lazy"
        />
      </div>
    </>
  );

  return (
    <section className="w-full py-10 md:py-14 overflow-hidden bg-bg border-y border-white/[0.06]">
      <div
        ref={trackRef}
        className="flex items-center animate-marquee"
        style={{ '--marquee-speed': 1 }}
      >
        {/* Duplicate content for seamless loop */}
        <div className="flex items-center gap-4 md:gap-6 marquee-track animate-marquee">
          {marqueeContent}
          {/* Spacer */}
          <span className="mx-6 md:mx-10" />
          {marqueeContent}
          <span className="mx-6 md:mx-10" />
          {marqueeContent}
          <span className="mx-6 md:mx-10" />
        </div>
      </div>
    </section>
  );
}
