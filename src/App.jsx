import { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
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

function MouseParallax({ children }) {
  const containerRef = useRef(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothX = useSpring(mouseX, { stiffness: 50, damping: 20 });
  const smoothY = useSpring(mouseY, { stiffness: 50, damping: 20 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      mouseX.set((clientX / innerWidth - 0.5) * 20);
      mouseY.set((clientY / innerHeight - 0.5) * 20);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <motion.div
      ref={containerRef}
      style={{ x: smoothX, y: smoothY }}
      className="gpu-accelerate"
    >
      {children}
    </motion.div>
  );
}

export default function App() {
  // Initialize Lenis smooth scroll
  useSmoothScroll();

  // Loading state for premium entrance
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate a brief loading screen for the cinematic entrance feel
    const timer = setTimeout(() => setIsLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {/* Loading Screen */}
      <motion.div
        initial={{ opacity: 1 }}
        animate={{ opacity: isLoading ? 1 : 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        style={{ pointerEvents: isLoading ? 'all' : 'none' }}
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
        transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
      >
        <Navbar />
        <main>
          <HeroSection />
          <BuildNextSection />
          <EcosystemSection />
          <MarqueeSection />
        </main>
        <Footer />
      </motion.div>
    </>
  );
}
