import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Globe, ArrowUpRight, Menu, X } from 'lucide-react';

const navLinks = [
  { label: 'Our companies', href: '#companies' },
  { label: 'Venture', href: '#venture' },
  { label: 'Join us', href: '#join' },
];

const navDropdown = [
  { label: 'Home', href: '#hero' },
  { label: 'The story', href: '#companies' },
  { label: 'Our vision', href: '#join' },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isPastHero, setIsPastHero] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [activeDropdownItem, setActiveDropdownItem] = useState(null);

  const activeDropdownStyle = {
    background:
      'linear-gradient(269.79deg, #F2E7C9 18.11%, #E9C9D6 42.04%, #D6CFEA 71.95%, #BFD7EE 99.87%)',
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setIsScrolled(scrollY > 50);
      setIsPastHero(scrollY > window.innerHeight * 0.8);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const textColor = 'text-white';
  const textColorHover = 'hover:text-white';
  const logoColor = 'text-white';

  const navBackgroundClass = isScrolled
    ? isPastHero
      ? 'glass shadow-lg shadow-black/30 border border-white/20'
      : 'bg-white/60 backdrop-blur-xl border border-white/20 shadow-lg shadow-black/5'
    : isPastHero
      ? 'bg-white/[0.04] backdrop-blur-sm border border-white/20'
      : 'bg-black/[0.04] backdrop-blur-sm border border-white/20';

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled ? 'py-2 px-3 md:px-6' : 'py-4 px-4 md:px-8'
      }`}
    >
      <div
        className={`mx-auto max-w-[1500px] flex items-center justify-between rounded-[8px] px-5 md:px-7 py-2.5 md:py-3 transition-all duration-500 ${navBackgroundClass}`}
      >
        {/* Logo + Dropdown */}
        <div className="flex items-center relative">
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className={`flex items-center gap-2 ${logoColor} hover:opacity-70 transition-all duration-300`}
          >
            <img
              src="/images/wowinx.png"
              alt="wowinx"
              className="h-6 w-auto object-contain"
            />
            <ChevronDown
              size={13}
              className={`transition-transform duration-300 ${
                isDropdownOpen ? 'rotate-180' : ''
              } text-white`}
            />
          </button>

          {/* ✅ DROPDOWN ONLY FIX HERE (5px gap added) */}
          <AnimatePresence>
            {isDropdownOpen && (
              <motion.div
                initial={{ opacity: 0, y: 8, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 8, scale: 0.96 }}
                transition={{ duration: 0.2 }}
                className={`absolute top-full left-0 mt-[5px]
                  w-[528px] max-w-[calc(100vw-2rem)] h-[219px]
                  rounded-[6px] p-4 shadow-2xl shadow-black/40
                  transition-all duration-500 ${navBackgroundClass}`}
              >
                <div className="grid h-full gap-4 md:grid-cols-[180px_1fr] items-center">
                  <div className="space-y-3">
                    {navDropdown.map((item) => {
                      const isActive = activeDropdownItem === item.label;

                      return (
                        <a
                          key={item.label}
                          href={item.href}
                          onClick={(e) => {
                            e.preventDefault();
                            setActiveDropdownItem(item.label);
                          }}
                          className={`block rounded-[6px] px-4 py-3 text-sm font-medium transition-all duration-200 ${
                            isActive
                              ? 'text-black'
                              : 'text-white/80 hover:text-white'
                          }`}
                          style={isActive ? activeDropdownStyle : undefined}
                        >
                          {item.label}
                        </a>
                      );
                    })}
                  </div>

                  <div className="overflow-hidden rounded-[6px] bg-[#111110] shadow-sm shadow-black/20">
                    <img
                      src="/images/c7e65d987f08961585c06a72e5f0c3f28b4caeee.png"
                      alt="Dropdown preview"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Desktop Nav Links */}
        <div className="hidden md:flex items-center gap-7">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className={`text-[13px] ${textColor} ${textColorHover} transition-colors duration-300 font-medium`}
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Right Side */}
        <div className="hidden md:flex items-center gap-4">
          <button className={`flex items-center gap-1 text-[13px] ${textColor} font-medium`}>
            <Globe size={13} className="text-white" />
            <span className="text-white">EN</span>
            <ChevronDown size={11} className="text-white" />
          </button>

          <a
            href="#contact"
            className={`flex items-center gap-1.5 px-5 py-2 text-[13px] font-semibold transition-all duration-300 ${
              isPastHero
                ? 'bg-white/90 text-black border border-white/20 hover:bg-white'
                : 'bg-white/5 text-white border border-white/20 hover:bg-white/10'
            }`}
          >
            Get in touch
            <ArrowUpRight size={13} strokeWidth={2.5} />
          </a>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden text-white"
          onClick={() => setIsMobileOpen(!isMobileOpen)}
        >
          {isMobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden mt-2 mx-2 bg-black/30 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden"
          >
            <div className="p-6 flex flex-col gap-4">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="text-lg text-white"
                  onClick={() => setIsMobileOpen(false)}
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