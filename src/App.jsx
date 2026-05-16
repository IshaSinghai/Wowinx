import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import useSmoothScroll from './hooks/useSmoothScroll';

import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import BuildNextSection from './components/BuildNextSection';
import EcosystemSection from './components/EcosystemSection';
import MarqueeSection from './components/MarqueeSection';
import Footer from './components/Footer';

gsap.registerPlugin(ScrollTrigger);




export default function App() {
  useSmoothScroll();

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {/* Loading Screen */}
      <motion.div
        initial={{ opacity: 1 }}
        animate={{ opacity: isLoading ? 1 : 0 }}
        transition={{
          duration: 0.6,
          ease: [0.22, 1, 0.36, 1],
        }}
        style={{
          pointerEvents: isLoading ? 'all' : 'none',
        }}
        className="fixed inset-0 z-[100] bg-bg flex items-center justify-center"
      >
        <motion.p
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="text-lg font-bold tracking-[0.15em] text-white/50 uppercase"
        >
          wowinx
        </motion.p>
      </motion.div>

      {/* Main Content */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isLoading ? 0 : 1 }}
        transition={{
          duration: 0.8,
          delay: 0.1,
          ease: [0.22, 1, 0.36, 1],
        }}
      >
        <Navbar />

        <main>
          <section id="hero">
            <HeroSection />
          </section>

          <section id="venture">
            <BuildNextSection />
          </section>

          <section id="ecosystem">
            <EcosystemSection />
          </section>

          <section id="marquee">
            <MarqueeSection />
          </section>

          <section id="contact">
            <Footer />
          </section>
        </main>
      </motion.div>
    </>
  );
}