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
import { CompaniesSection } from './components/CompaniesSection';
import OurVisionPage from './components/OurVisionPage';
import VentureScreen from './components/VentureScreen';
import TheStoryScreen from './components/TheStoryScreen';
import JoinUsScreen from './components/JoinUsScreen';

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  const lenisRef = useSmoothScroll();

  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState('home');

  const scrollToTop = () => {
    if (lenisRef.current) {
      lenisRef.current.scrollTo(0, { duration: 0 });
    } else {
      window.scrollTo(0, 0);
    }
  };

  // Loading screen
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  // Hash routing
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;

      if (hash === '#companies' || hash === '#CompaniesSection') {
        setCurrentPage('companies');
        scrollToTop();
      } else if (hash === '#VentureScreen') {
        setCurrentPage('VentureScreen');
        scrollToTop();
      } else if (
        hash === '#vision' ||
        hash === '#OurVisionPage'
      ) {
        setCurrentPage('OurVisionPage');
        scrollToTop();
      } else if (
        hash === '#story' ||
        hash === '#ecosystem'
      ) {
        setCurrentPage('story');
        scrollToTop();
      } else if (
        hash === '#JoinUsScreen' ||
        hash === '#joinUs'
      ) {
        setCurrentPage('joinUs');
        scrollToTop();
      } else {
        setCurrentPage('home');
        scrollToTop();
      }
    };

    window.addEventListener(
      'hashchange',
      handleHashChange
    );

    handleHashChange();

    return () => {
      window.removeEventListener(
        'hashchange',
        handleHashChange
      );
    };
  }, []);

  // Refresh ScrollTrigger when returning home
  useEffect(() => {
    if (currentPage === 'home') {
      scrollToTop();

      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          ScrollTrigger.refresh();
        });
      });
    }
  }, [currentPage]);

  // Venture Page
  if (currentPage === 'VentureScreen') {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isLoading ? 0 : 1 }}
        transition={{
          duration: 0.8,
          delay: 0.1,
          ease: [0.22, 1, 0.36, 1],
        }}
      >
        <VentureScreen
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      </motion.div>
    );
  }

  // Story Page
  if (currentPage === 'story') {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isLoading ? 0 : 1 }}
        transition={{
          duration: 0.8,
          delay: 0.1,
          ease: [0.22, 1, 0.36, 1],
        }}
      >
        <Navbar
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />

        <TheStoryScreen />
      </motion.div>
    );
  }

  // Vision Page
  if (currentPage === 'OurVisionPage') {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isLoading ? 0 : 1 }}
        transition={{
          duration: 0.8,
          delay: 0.1,
          ease: [0.22, 1, 0.36, 1],
        }}
      >
        <Navbar
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />

        <OurVisionPage />
      </motion.div>
    );
  }

  // Join Us Page — FIXED: currentPage and setCurrentPage now passed to JoinUsScreen
  if (currentPage === 'joinUs') {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isLoading ? 0 : 1 }}
        transition={{
          duration: 0.8,
          delay: 0.1,
          ease: [0.22, 1, 0.36, 1],
        }}
      >
        <JoinUsScreen
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      </motion.div>
    );
  }

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
          pointerEvents: isLoading
            ? 'all'
            : 'none',
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
        <Navbar
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />

        {currentPage === 'companies' ? (
          <main>
            <CompaniesSection />
          </main>
        ) : (
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

            <section id="marquee-image" className="relative w-full min-h-[680px] md:h-screen overflow-hidden">
              <img
                src="/images/MarqueUpdated.png"
                alt=""
                className="absolute inset-0 w-full h-full object-cover"
              />
            </section>

            <section id="marquee">
              <MarqueeSection />
            </section>

            <section id="contact">
              <Footer />
            </section>
          </main>
        )}
      </motion.div>
    </>
  );
}