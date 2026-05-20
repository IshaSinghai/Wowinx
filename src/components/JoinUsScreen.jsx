// pages/join-us.jsx

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

import Navbar from '../components/Navbar';
import MarqueeSection from '../components/MarqueeSection';
import Footer from '../components/Footer';

/* =========================================================
   DATA
========================================================= */

const tabs = [
  {
    id: 'jobs',
    title: 'Jobs',

    heading: 'Eres extraordinario en algo',

    description:
      'Buscamos personas con experiencia real, criterio propio y espíritu creador. El ecosistema tiene un lugar para los mejores en lo que hacen.',

    button: 'Quiero sumarme',

    image:
      '/images/JoinUs1.png',
  },

  {
    id: 'students',
    title: 'Students',

    heading: 'Pending',

    description:
      'Buscamos personas con experiencia real, criterio propio y espíritu creador. El ecosistema tiene un lugar para los mejores en lo que hacen.',

    button: 'Quiero sumarme',

    image: '/images/JoinUs2.png',
  },

  {
    id: 'empresa',
    title: 'Empresa',

    heading: 'Build meaningful things.',

    description:
      'We partner with ambitious builders creating products and experiences for the future.',

    button: 'Explore',

    image:
      '/images/JoinUs3.png',
  },

  {
    id: 'inversor',
    title: 'Inversor',

    heading: 'Invest in what matters.',

    description:
      'Join a network of founders, operators and investors building long-term impact.',

    button: 'Learn more',

    image:
      '/images/JoinUs5.png',
  },
];

/* =========================================================
   PAGE
========================================================= */

export default function JoinUsPage({
  currentPage,
  setCurrentPage,
}) {
  const [activeTab, setActiveTab] =
    useState('jobs');

  const activeContent = tabs.find(
    (tab) => tab.id === activeTab
  );

  return (
    <div className="bg-black text-white overflow-hidden">
      {/* =========================================================
          CORRECT NAVBAR COMPONENT
      ========================================================= */}

      <Navbar
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />

      {/* =========================================================
          HERO SECTION (KEEP SAME)
      ========================================================= */}

      <section id="JoinUsScreen" className="relative w-full h-[760px] overflow-hidden">
        <img
          src="/images/JoinUs1.png"
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
        />

        <div className="absolute inset-0 bg-black/55" />

        <div className="relative z-10 w-[90%] max-w-[1280px] mx-auto h-full flex items-center">
          <div>
            <motion.h1
              initial={{
                opacity: 0,
                y: 40,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 0.8,
              }}
              className="
                text-[44px]
                md:text-[72px]
                leading-[1.02]
                font-medium
                max-w-[850px]
              "
            >
              Great people build great companies.
            </motion.h1>

            <motion.p
              initial={{
                opacity: 0,
                y: 30,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                delay: 0.2,
                duration: 0.8,
              }}
              className="
                text-white/70
                mt-8
                max-w-[560px]
                text-[16px]
                md:text-lg
                leading-relaxed
              "
            >
              We’re looking for ambitious people
              who want to shape the future of
              technology, culture and human
              experiences.
            </motion.p>

            <motion.button
              initial={{
                opacity: 0,
                y: 20,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                delay: 0.3,
                duration: 0.8,
              }}
              className="
                mt-10
                border border-white/20
                px-6 py-3
                flex items-center gap-2
                hover:bg-white
                hover:text-black
                transition
              "
            >
              Explore opportunities

              <ArrowUpRight size={18} />
            </motion.button>
          </div>
        </div>
      </section>

      {/* =========================================================
          TABS SECTION (KEEP SAME)
      ========================================================= */}

      <section className="w-full py-20 md:py-24 bg-black">
        <div className="w-[90%] max-w-[1280px] mx-auto">
          {/* TABS */}
          <div className="flex items-center gap-8 md:gap-12 mb-16 md:mb-20 overflow-x-auto scrollbar-hide">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() =>
                  setActiveTab(tab.id)
                }
                className={`
                  relative
                  text-[24px]
                  md:text-[38px]
                  leading-none
                  transition-all
                  duration-300
                  whitespace-nowrap
                  ${
                    activeTab === tab.id
                      ? 'text-white'
                      : 'text-[#5A5A66] hover:text-white/80'
                  }
                `}
              >
                {tab.title}

                {activeTab === tab.id && (
                  <motion.div
                    layoutId="underline"
                    className="
                      absolute
                      left-0
                      -bottom-2
                      w-full
                      h-[2px]
                      bg-white
                    "
                  />
                )}
              </button>
            ))}
          </div>

          {/* CONTENT */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{
                opacity: 0,
                y: 30,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              exit={{
                opacity: 0,
                y: -30,
              }}
              transition={{
                duration: 0.4,
              }}
              className="
                grid
                grid-cols-1
                lg:grid-cols-2
                gap-12
                lg:gap-16
                items-center
              "
            >
              {/* LEFT */}
              <div>
                <h2
                  className={`
                    text-[40px]
                    md:text-[58px]
                    leading-[1.02]
                    font-medium
                    max-w-[470px]
                    ${
                      activeTab === 'students'
                        ? 'text-red-500'
                        : 'text-white'
                    }
                  `}
                >
                  {activeContent.heading}
                </h2>

                <p className="text-white/60 mt-8 max-w-[420px] leading-relaxed">
                  {activeContent.description}
                </p>

                <button
                  className="
                    mt-10
                    border border-white/20
                    px-6 py-3
                    flex items-center gap-2
                    hover:bg-white
                    hover:text-black
                    transition
                  "
                >
                  {activeContent.button}

                  <ArrowUpRight size={18} />
                </button>
              </div>

              {/* RIGHT */}
              <div className="relative overflow-hidden">
                {activeContent.image ? (
                  <motion.img
                    key={activeContent.image}
                    initial={{
                      opacity: 0,
                      scale: 1.04,
                    }}
                    animate={{
                      opacity: 1,
                      scale: 1,
                    }}
                    transition={{
                      duration: 0.5,
                    }}
                    src={activeContent.image}
                    alt=""
                    className="
                      w-full
                      h-[320px]
                      md:h-[500px]
                      object-cover
                    "
                  />
                ) : (
                  <div className="w-full h-[320px] md:h-[500px] bg-red-600" />
                )}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* =========================================================
          REMOVE EVERYTHING BELOW
          AND USE YOUR ORIGINAL COMPONENTS
      ========================================================= */}

      <section id="marquee">
        <MarqueeSection />
      </section>

      <section id="contact">
        <Footer />
      </section>

      {/* Anchor for navbar hash navigation */}
      <div id="joinUsAnchor" className="h-0" />
    </div>
  );
}