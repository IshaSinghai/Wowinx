import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

import {
  ChevronDown,
  Globe,
  ArrowUpRight,
  Menu,
  X,
} from 'lucide-react';

const navLinks = [
  { label: 'Companies', href: '#ecosystem' },
  { label: 'Ventures', href: '#venture' },
  { label: 'Contact', href: '#contact' },
];

const navDropdown = [
  { label: 'Home', href: '#hero' },
  { label: 'The story', href: '#ecosystem' },
  { label: 'Our vision', href: '#venture' },
];

const mobileDropdownImages = [
  '/images/HomepageWomen.png',
  '/images/VR.png',
  '/images/Women.png',
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isPastHero, setIsPastHero] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [activeDropdownItem, setActiveDropdownItem] =
    useState('Home');

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;

      setIsScrolled(scrollY > 50);
      setIsPastHero(scrollY > window.innerHeight * 0.8);
      setIsDropdownOpen(false);
    };

    window.addEventListener('scroll', handleScroll, {
      passive: true,
    });

    return () =>
      window.removeEventListener('scroll', handleScroll);
  }, []);

  const navBackgroundClass = isScrolled
    ? isPastHero
      ? 'bg-black/40 backdrop-blur-xl border border-white/10 shadow-lg shadow-black/30'
      : 'bg-white/10 backdrop-blur-xl border border-white/10'
    : isPastHero
    ? 'bg-[#2b2b2b]/[0.20] backdrop-blur-sm border border-white/10'
    : 'bg-[#0e0e0e]/40 backdrop-blur-xl border border-white/10';

  // Solid background for dropdown (mirrors navBackgroundClass but opaque so backdrop-blur works)
  const dropdownBgStyle = isScrolled
    ? isPastHero
      ? { backgroundColor: 'rgba(0,0,0,0.85)' }
      : { backgroundColor: 'rgba(255,255,255,0.12)' }
    : isPastHero
    ? { backgroundColor: 'rgba(43,43,43,0.75)' }
    : { backgroundColor: 'rgba(14,14,14,0.85)' };

  return (
    <>
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{
          duration: 0.8,
          ease: [0.22, 1, 0.36, 1],
          delay: 0.3,
        }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? 'py-2 px-3 md:px-6'
            : 'py-4 px-4 md:px-8'
        }`}
      >
        <div
          className={`relative mx-auto max-w-[1500px] flex items-center justify-between rounded-[10px] px-5 md:px-7 py-3 transition-all duration-500 ${navBackgroundClass}`}
        >
          {/* Logo + Dropdown */}
          <div className="flex items-center">
            <button
              onClick={() => {
                setIsMobileOpen(false);
                setIsDropdownOpen(!isDropdownOpen);
              }}
              className="flex items-center gap-2 text-white hover:opacity-80 transition-all duration-300"
            >
              <img
                src="/images/wowinx.png"
                alt="wowinx"
                className="h-6 w-auto object-contain"
              />

              <ChevronDown
                size={14}
                className={`transition-transform duration-300 ${
                  isDropdownOpen ? 'rotate-180' : ''
                }`}
              />
            </button>

            {/* Dropdown */}
            <AnimatePresence>
              {isDropdownOpen && (
                <motion.div
                  initial={{
                    opacity: 0,
                    y: 10,
                    scale: 0.96,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                    scale: 1,
                  }}
                  exit={{
                    opacity: 0,
                    y: 10,
                    scale: 0.96,
                  }}
                  transition={{ duration: 0.2 }}
                  style={{
                    ...dropdownBgStyle,
                    backdropFilter: 'blur(24px)',
                    WebkitBackdropFilter: 'blur(24px)',
                  }}
                  className={`
                    absolute top-full mt-4 md:mt-5
                    left-0 right-0
                    w-full
                    md:w-full
                    max-w-full
                    rounded-[4px]
                    md:rounded-[12px]
                    overflow-hidden
                    border border-white/10
                    shadow-2xl shadow-black/40
                    text-white
                    isolate
                  `}
                >
                  {/* Mobile Dropdown */}
                  <div className="md:hidden px-3 pt-12 pb-8">
                    <div className="flex flex-col gap-5">
                      {navDropdown.map((item) => {
                        const isActive =
                          activeDropdownItem === item.label;

                        return (
                          <a
                            key={item.label}
                            href={item.href}
                            onClick={() => {
                              setActiveDropdownItem(item.label);
                              setIsDropdownOpen(false);
                            }}
                            className={`
                              text-white
                              text-[26px]
                              leading-[28px]
                              font-normal
                              no-underline
                            `}
                            style={{
                              fontFamily: 'PP Neue Montreal, sans-serif',
                            }}
                          >
                            {item.label}
                          </a>
                        );
                      })}
                    </div>

                    <div className="mt-[72px] flex w-full max-w-[340px] gap-2 opacity-100">
                      {mobileDropdownImages.map(
                        (src, index) => (
                          <img
                            key={src}
                            src={src}
                            alt={`Dropdown preview ${
                              index + 1
                            }`}
                            className="
                              w-[100px]
                              h-[224px]
                              object-cover
                              rounded-[4px]
                              opacity-100
                              block
                            "
                            style={{ objectPosition: 'center center' }}
                          />
                        )
                      )}
                    </div>

                    <div className="mt-[28px] flex items-center gap-5 text-white">
                      <a
                        href="https://www.linkedin.com"
                        target="_blank"
                        rel="noreferrer"
                        className="
                          flex items-center gap-4
                          text-white
                          text-[14px]
                          leading-5
                          font-normal
                          no-underline
                        "
                        style={{
                          fontFamily: 'Inter, sans-serif',
                        }}
                      >
                        LinkedIn
                        <ArrowUpRight
                          size={14}
                          strokeWidth={1.8}
                        />
                      </a>

                      <a
                        href="mailto:hi@wowinx.com"
                        className="
                          text-white
                          text-[14px]
                          leading-5
                          font-normal
                          no-underline
                        "
                        style={{
                          fontFamily: 'Inter, sans-serif',
                        }}
                      >
                        hi@wowinx.com
                      </a>
                    </div>
                  </div>

                  {/* Desktop Dropdown */}
                  <div className="hidden md:grid grid-cols-[190px_1fr] gap-5 p-5">
                    <div className="flex flex-col gap-2">
                      {navDropdown.map((item) => {
                        const isActive =
                          activeDropdownItem === item.label;

                        return (
                          <a
                            key={item.label}
                            href={item.href}
                            onClick={() => {
                              setActiveDropdownItem(
                                item.label
                              );
                              setIsDropdownOpen(false);
                            }}
                            className={`
                              px-4 py-3 rounded-lg text-sm font-medium
                              transition-all duration-300
                              hover:bg-white/5
                              ${
                                isActive
                                  ? `
                                    bg-gradient-to-r
                                    from-[#F2E7C9]
                                    via-[#E9C9D6]
                                    via-[#D6CFEA]
                                    to-[#BFD7EE]
                                    bg-clip-text
                                    text-transparent
                                  `
                                  : 'text-white/80 hover:text-white'
                              }
                            `}
                          >
                            {item.label}
                          </a>
                        );
                      })}
                    </div>

                    <div className="w-full overflow-hidden rounded-xl bg-[#111110]">
                      <img
                        src="/images/c7e65d987f08961585c06a72e5f0c3f28b4caeee.png"
                        alt="Dropdown preview"
                        className="w-full h-auto object-cover"
                      />
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-7">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-[13px] text-white hover:text-white/80 transition-colors duration-300 font-medium"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-4">
            <button
              onClick={() =>
                alert('Language feature coming soon')
              }
              className="flex items-center gap-1 text-[13px] text-white font-medium"
            >
              <Globe size={13} />
              <span>EN</span>
              <ChevronDown size={11} />
            </button>

            <a
              href="#contact"
              className={`
                flex items-center gap-1.5
                px-5 py-2
                text-[13px]
                font-semibold
                rounded-lg
                transition-all duration-300
                ${
                  isPastHero
                    ? 'bg-white text-black hover:bg-white/90'
                    : 'bg-white/10 text-white hover:bg-white/20 border border-white/10'
                }
              `}
            >
              Get in touch

              <ArrowUpRight
                size={13}
                strokeWidth={2.5}
              />
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-white"
            onClick={() => {
              setIsDropdownOpen(false);
              setIsMobileOpen(!isMobileOpen);
            }}
          >
            {isMobileOpen ? (
              <X size={24} />
            ) : (
              <Menu size={24} />
            )}
          </button>
        </div>
      </motion.nav>

      {/* Mobile Full Screen Drawer */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{
              duration: 0.3,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="fixed inset-0 md:hidden z-[999] bg-[#191A1F] flex flex-col"
          >
            <div className="flex items-start justify-between px-[10px] pt-5">
              <a
                href="#contact"
                onClick={() => setIsMobileOpen(false)}
                className="
                  flex items-center justify-center gap-1.5
                  w-[145px] h-10
                  bg-[#191A1F]
                  text-white
                  border border-white
                  rounded-[2px]
                  font-normal text-base leading-6
                  transition-all duration-300
                  hover:bg-white/5
                "
                style={{
                  fontFamily: 'Inter, sans-serif',
                }}
              >
                Get in touch

                <ArrowUpRight
                  size={14}
                  strokeWidth={2}
                />
              </a>

              <button
                onClick={() =>
                  setIsMobileOpen(false)
                }
                className="text-white hover:opacity-70 transition-opacity"
                aria-label="Close menu"
              >
                <X size={24} strokeWidth={1.5} />
              </button>
            </div>

            <div className="mt-[85px] px-[10px] flex flex-col items-start gap-[22px]">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() =>
                    setIsMobileOpen(false)
                  }
                  className="
                    text-[#797A87]
                    font-normal
                    text-[23px]
                    leading-[26px]
                    no-underline
                    transition-all duration-300
                    hover:text-white
                  "
                  style={{
                    fontFamily: 'Inter, sans-serif',
                  }}
                >
                  {link.label === 'Companies'
                    ? 'Our companies'
                    : link.label === 'Ventures'
                    ? 'Venture'
                    : 'Join us'}
                </a>
              ))}
            </div>

            <div className="mt-[31px] px-[10px] flex gap-1">
              <button
                className="
                  w-[167px] h-8
                  flex items-center justify-center gap-1
                  px-4 py-2
                  rounded-[2px]
                  border border-white
                  bg-transparent
                  text-white
                  text-[13px]
                  leading-4
                  font-normal
                "
                style={{
                  fontFamily: 'Inter, sans-serif',
                }}
              >
                Inglés
              </button>

              <button
                className="
                  w-[167px] h-8
                  flex items-center justify-center gap-2
                  px-4 py-2
                  rounded-[2px]
                  border border-white/50
                  text-white
                  text-[13px]
                  leading-4
                  font-normal
                "
                style={{
                  fontFamily: 'Inter, sans-serif',
                  background:
                    'linear-gradient(269.79deg, rgba(242, 231, 201, 0.4) 18.11%, rgba(233, 201, 214, 0.4) 42.04%, rgba(214, 207, 234, 0.4) 71.95%, rgba(191, 215, 238, 0.4) 99.87%)',
                }}
              >
                Español
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}