import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function MarqueeSection() {
  const trackRef = useRef(null);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

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

    return () => ScrollTrigger.getAll().forEach((t) => t.kill());
  }, []);

  const marqueeContent = (
    <>
      <span className="text-[clamp(2rem,5vw,4.5rem)] font-semibold text-white tracking-[-0.03em] whitespace-nowrap">
        The renaissance
      </span>

      <div className="w-[140px] h-[74px] md:w-[193px] md:h-[102px] overflow-hidden flex-shrink-0 mx-4 md:mx-6 opacity-100">
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

      <div className="w-[140px] h-[74px] md:w-[193px] md:h-[102px] overflow-hidden flex-shrink-0 mx-4 md:mx-6 opacity-100">
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
    <section className="w-full overflow-hidden bg-[#111110] border-y border-white/[0.06]">
      
      <div className="py-10 md:py-14">
        <div
          ref={trackRef}
          className="flex items-center"
          style={{ '--marquee-speed': 1 }}
        >
          <div
            className="flex items-center gap-4 md:gap-6 marquee-track"
            style={{
              animationDuration: 'calc(30s / var(--marquee-speed))',
            }}
          >
            {marqueeContent}
            <span className="mx-6 md:mx-10" />
            {marqueeContent}
            <span className="mx-6 md:mx-10" />
            {marqueeContent}
            <span className="mx-6 md:mx-10" />
          </div>
        </div>
      </div>

      <div className="border-t border-white/[0.06] px-5 sm:px-6 md:px-12 py-10 md:py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-12 text-white">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold lowercase tracking-tight">
              wowinx 
            </h2>

            <p className="text-sm text-white/60 mt-2">
              Claim...
            </p>
          </div>

          <div>
            <h3 className="text-sm sm:text-base font-medium mb-5 md:mb-6">
              Links and resources
            </h3>

            <div className="flex flex-col gap-3 md:gap-4 text-sm text-white/70">
              <a
                href="#"
                className="
                  w-fit
                  text-sm sm:text-base
                  hover:text-white
                  transition-colors
                  duration-300
                "
              >
                The story
              </a>

              <a
                href="#"
                className="
                  w-fit
                  text-sm sm:text-base
                  hover:text-white
                  transition-colors
                  duration-300
                "
              >
                Our vision
              </a>
            </div>
          </div>

          <div className="w-full">
            <h3 className="text-sm sm:text-base font-medium mb-5 md:mb-6">
              Subscribe
            </h3>

            <p className="text-sm text-white/60 mb-5 leading-relaxed max-w-md">
              Subscribe to our newsletter for the latest news,
              tournaments and exclusive content
            </p>

            <div className="w-full max-w-md">
              <input
                type="email"
                placeholder="tu@email.com"
                className="
                  w-full
                  bg-transparent
                  border
                  border-white/[0.08]
                  rounded-md
                  px-4
                  py-3
                  text-sm
                  sm:text-base
                  text-white
                  placeholder:text-white/30
                  outline-none
                  focus:border-white/20
                  transition-colors
                "
              />

              <p className="text-xs text-white/30 mt-3">
                No spam. Unsubscribe anytime.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}