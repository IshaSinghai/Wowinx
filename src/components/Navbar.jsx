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
    : 'bg-black/[0.04] backdrop-blur-sm border border-white/10';

  return (
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
        className={`mx-auto max-w-[1500px] flex items-center justify-between rounded-[10px] px-5 md:px-7 py-3 transition-all duration-500 ${navBackgroundClass}`}
      >
        <div className="relative flex items-center">
          <button
            onClick={() =>
              setIsDropdownOpen(!isDropdownOpen)
            }
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
                className={`
                  absolute top-full left-0 mt-4 md:mt-5
                  w-[95vw]
                  sm:w-[520px]
                  md:w-[620px]
                  max-w-[95vw]
                  rounded-[12px]
                  overflow-hidden
                  border border-white/10
                  shadow-2xl shadow-black/40
                  backdrop-blur-2xl
                  bg-black/30
                  text-white
                `}
              >
                <div className="grid grid-cols-1 md:grid-cols-[190px_1fr] gap-5 p-5">
                  <div className="flex flex-col gap-2">
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

        <button
          className="md:hidden text-white"
          onClick={() =>
            setIsMobileOpen(!isMobileOpen)
          }
        >
          {isMobileOpen ? (
            <X size={24} />
          ) : (
            <Menu size={24} />
          )}
        </button>
      </div>

      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            initial={{
              opacity: 0,
              height: 0,
            }}
            animate={{
              opacity: 1,
              height: 'auto',
            }}
            exit={{
              opacity: 0,
              height: 0,
            }}
            className="
              md:hidden
              mt-2
              mx-2
              rounded-2xl
              overflow-hidden
              border border-white/10
              bg-black/30
              backdrop-blur-2xl
            "
          >
            <div className="p-6 flex flex-col gap-5">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="text-white text-lg"
                  onClick={() =>
                    setIsMobileOpen(false)
                  }
                >
                  {link.label}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}