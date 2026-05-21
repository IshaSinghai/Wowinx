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
    headingColor: '#E3E3E3',
    heading: `There's room here for extraordinary people.`,
    description: `At wowinX, we build with people who already know what they're doing — and who want to do it as part of something bigger than a single project.`,
    button: 'Join Us',
    buttonAction: 'contact',
    image: '/images/JoinUs1.png',
  },
  {
    id: 'students',
    title: 'Students',
    headingColor: '#FFF',
    heading: `The best careers begin before graduation.`,
    description: `wowinX opens the doors of its companies to students who already think like professionals. We care less about your academic record than about the way you see the world.\n\nWe'll figure out the rest together.`,
    button: 'Join Us',
    buttonAction: 'contact',
    image: '/images/JoinUs3.png',
    // NOTE: headingColor #FFF — no red, no "Pending"
  },
  {
    id: 'empresa',
    title: 'Empresa',
    headingColor: '#E3E3E3',
    heading: `You see opportunity in what we're building.`,
    description: `If your business can grow within or alongside wowinX, let's talk. Co-creation and execution are our common language.`,
    button: 'Connect with us',
    buttonAction: null,
    image: '/images/JoinUs3.png',
  },
  {
    id: 'inversor',
    title: 'Inversor',
    headingColor: '#FFF',
    heading: `You want to be there from the start.`,
    description: `wowinX builds position before the market catches up. If you share that vision, there are conversations worth having.`,
    button: 'Explore',
    buttonAction: null,
    image: '/images/JoinUs5.png',
  },
];

/* =========================================================
   SHARED STYLES
========================================================= */

const headingStyle = {
  fontFamily: '"PP Neue Montreal", sans-serif',
  fontSize: '48px',
  fontStyle: 'normal',
  fontWeight: 500,
  lineHeight: '56px',
  letterSpacing: '-0.48px',
};

const bodyStyle = {
  fontFamily: 'Inter, sans-serif',
  fontSize: '16px',
  fontStyle: 'normal',
  fontWeight: 400,
  lineHeight: '24px',
};

const gradientText = {
  background: 'linear-gradient(270deg, #F2E7C9 18.11%, #E9C9D6 42.04%, #D6CFEA 71.95%, #BFD7EE 99.87%)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  backgroundClip: 'text',
};

/* =========================================================
   PAGE
========================================================= */

export default function JoinUsPage({ currentPage, setCurrentPage }) {
  const [activeTab, setActiveTab] = useState('jobs');
  const [hoveredTab, setHoveredTab] = useState(null);
  const activeContent = tabs.find((tab) => tab.id === activeTab);

  return (
    <div className="bg-black text-white">

      <Navbar currentPage={currentPage} setCurrentPage={setCurrentPage} />

      {/* =========================================================
          HERO SECTION
      ========================================================= */}
      <section id="JoinUsScreen" className="relative w-full h-[760px] overflow-hidden">
        <img
          src="/images/JoinUs1.png"
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/55" />

        <div className="relative z-10 w-[90%] max-w-[1280px] mx-auto h-full flex items-center">
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            style={{
              fontFamily: '"PP Neue Montreal", sans-serif',
              fontSize: '48px',
              fontStyle: 'normal',
              fontWeight: 500,
              lineHeight: '56px',
              letterSpacing: '-0.48px',
              color: '#FFF',
              width: '628px',
              height: '168px',
              margin: 0,
              overflow: 'hidden',
            }}
          >
            Some people were born to build what comes next. This is for them.
          </motion.h1>
        </div>
      </section>

      {/* =========================================================
          TABS SECTION
      ========================================================= */}
      <section className="w-full py-20 md:py-24 bg-black">
        <div className="w-[90%] max-w-[1280px] mx-auto">

          {/* TAB LABELS */}
          <div className="flex items-center gap-8 md:gap-12 mb-16 md:mb-20 overflow-x-auto scrollbar-hide">
            {tabs.map((tab) => {
              const isActive = activeTab === tab.id;
              const isHovered = hoveredTab === tab.id;
              const highlight = isActive || isHovered;

              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  onMouseEnter={() => setHoveredTab(tab.id)}
                  onMouseLeave={() => setHoveredTab(null)}
                  style={{
                    position: 'relative',
                    fontSize: '38px',
                    lineHeight: 1,
                    fontWeight: 500,
                    fontFamily: '"PP Neue Montreal", sans-serif',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    padding: '0 0 8px 0',
                    whiteSpace: 'nowrap',
                    transition: 'all 0.3s ease',
                    ...(highlight
                      ? gradientText
                      : { color: '#5A5A66' }),
                  }}
                >
                  {tab.title}

                  {/* underline — active (layoutId animated) */}
                  {isActive && (
                    <motion.div
                      layoutId="underline"
                      style={{
                        position: 'absolute',
                        left: 0,
                        bottom: 0,
                        width: '100%',
                        height: '2px',
                        background: 'linear-gradient(270deg, #F2E7C9 18.11%, #E9C9D6 42.04%, #D6CFEA 71.95%, #BFD7EE 99.87%)',
                      }}
                    />
                  )}

                  {/* underline — hover only (not active) */}
                  {isHovered && !isActive && (
                    <div
                      style={{
                        position: 'absolute',
                        left: 0,
                        bottom: 0,
                        width: '100%',
                        height: '2px',
                        background: 'linear-gradient(270deg, #F2E7C9 18.11%, #E9C9D6 42.04%, #D6CFEA 71.95%, #BFD7EE 99.87%)',
                        opacity: 0.5,
                      }}
                    />
                  )}
                </button>
              );
            })}
          </div>

          {/* CONTENT */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.4 }}
              className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center"
            >
              {/* LEFT */}
              <div>

                {/* HEADING — color comes from tab data, never from className */}
                <h2 style={{
                  fontFamily: '"PP Neue Montreal", sans-serif',
                  fontSize: '48px',
                  fontStyle: 'normal',
                  fontWeight: 500,
                  lineHeight: '56px',
                  letterSpacing: '-0.48px',
                  color: activeContent.headingColor,
                  maxWidth: '470px',
                  margin: 0,
                }}>
                  {activeContent.heading}
                </h2>

                {/* BODY */}
                <p style={{
                  ...bodyStyle,
                  color: '#FFF',
                  marginTop: '32px',
                  maxWidth: '420px',
                  whiteSpace: 'pre-line',
                }}>
                  {activeContent.description}
                </p>

                {/* BUTTON */}
                <button
                  onClick={() => {
                    if (activeContent.buttonAction === 'contact') {
                      setCurrentPage('contact');
                    }
                  }}
                  className="
                    mt-10 border border-white/20
                    px-6 py-3 flex items-center gap-2
                    hover:bg-white hover:text-black transition
                  "
                >
                  {activeContent.button}
                  <ArrowUpRight size={18} />
                </button>

              </div>

              {/* RIGHT — IMAGE */}
              <div className="relative overflow-hidden">
                <motion.img
                  key={activeContent.image}
                  initial={{ opacity: 0, scale: 1.04 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                  src={activeContent.image}
                  alt=""
                  className="w-full h-[320px] md:h-[500px] object-cover"
                />
              </div>

            </motion.div>
          </AnimatePresence>

        </div>
      </section>

      {/* =========================================================
          MARQUEE + FOOTER
      ========================================================= */}
      <MarqueeSection />
      <Footer />

      <div id="joinUsAnchor" className="h-0" />
    </div>
  );
}