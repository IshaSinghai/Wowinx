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
  { label: 'Companies', href: '#companies' },
  { label: 'Ventures', href: '#VentureScreen' },
  { label: 'Join us', href: '#JoinUsScreen' },
];

const navDropdown = [
  { label: 'Home', href: '#hero' },
  { label: 'The story', href: '#story' },
  { label: 'Our vision', href: '#OurVisionPage' },
];

const navDropdownImages = {
  Home: '/images/HomepageWomen.png',
  'The story': '/images/VR.png',
  'Our vision': '/images/Women.png',
};

const mobileDropdownImages = [
  navDropdownImages['Home'],
  navDropdownImages['The story'],
  navDropdownImages['Our vision'],
];

const labelStyle = {
  fontSize: '13px',
  color: '#E7E7EA',
  fontFamily: 'Inter, sans-serif',
  marginBottom: '8px',
  display: 'block',
};

export default function Navbar({
  currentPage,
  setCurrentPage,
}) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isPastHero, setIsPastHero] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [activeDropdownItem, setActiveDropdownItem] =
    useState('Home');

  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    whoAmI: '',
    email: '',
    message: '',
  });

  const handleChange = (e) => {
    setForm((f) => ({
      ...f,
      [e.target.name]: e.target.value,
    }));
  };

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
    : 'bg-[#0e0e0e]/40 backdrop-blur-xl border border-white/10';

  const dropdownBgStyle = isScrolled
    ? isPastHero
      ? { backgroundColor: 'rgba(0,0,0,0.85)' }
      : { backgroundColor: 'rgba(255,255,255,0.12)' }
    : isPastHero
    ? { backgroundColor: 'rgba(43,43,43,0.75)' }
    : { backgroundColor: 'rgba(14,14,14,0.85)' };

  const handleNavClick = (link) => {
    if (link.label === 'Companies') {
      setCurrentPage('companies');
      setIsMobileOpen(false);
      window.history.replaceState(null, '', '#companies');
      window.scrollTo(0, 0);
      return;
    }

    if (link.label === 'Ventures') {
      setCurrentPage('VentureScreen');
      setIsMobileOpen(false);
      window.history.replaceState(null, '', '#VentureScreen');
      window.scrollTo(0, 0);
      return;
    }

    if (link.label === 'Join us') {
      setCurrentPage('joinUs');
      setIsMobileOpen(false);
      setIsDropdownOpen(false);
      window.history.replaceState(null, '', '#JoinUsScreen');

      setTimeout(() => {
        document.querySelector('#JoinUsScreen')?.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        });
      }, 60);

      return;
    }

    if (link.href && link.href.startsWith('#')) {
      setCurrentPage('home');
      window.history.replaceState(null, '', link.href);

      setTimeout(() => {
        document.querySelector(link.href)?.scrollIntoView({
          behavior: 'smooth',
        });
      }, 60);

      setIsMobileOpen(false);
      return;
    }

    window.history.replaceState(null, '', link.href || '');
    setIsMobileOpen(false);
  };

  const handleDropdownClick = (e, item) => {
    e.preventDefault();

    setActiveDropdownItem(item.label);
    setIsDropdownOpen(false);
    setIsMobileOpen(false);

    if (item.label === 'Our vision') {
      setCurrentPage('OurVisionPage');
      window.history.replaceState(null, '', '#OurVisionPage');
      window.scrollTo(0, 0);
      return;
    }

    if (item.label === 'The story') {
      setCurrentPage('story');
      window.history.replaceState(null, '', '#story');
      window.scrollTo(0, 0);
      return;
    }

    setCurrentPage('home');
    window.history.replaceState(null, '', item.href);

    setTimeout(() => {
      document.querySelector(item.href)?.scrollIntoView({
        behavior: 'smooth',
      });
    }, 60);
  };

  return (
    <>
      {/* Navbar */}
      <motion.nav
        initial={{
          y: -100,
          opacity: 0,
        }}
        animate={{
          y: 0,
          opacity: 1,
        }}
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
          {/* Logo */}
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
                  transition={{
                    duration: 0.2,
                  }}
                  style={{
                    ...dropdownBgStyle,
                    backdropFilter: 'blur(24px)',
                    WebkitBackdropFilter: 'blur(24px)',
                  }}
                  className="
                    absolute top-full left-0 mt-4 md:mt-5
                    w-[95vw] sm:w-[520px] md:w-[620px]
                    max-w-[95vw] md:max-w-none
                    rounded-[4px] md:rounded-[12px]
                    overflow-hidden
                    border border-white/10
                    shadow-2xl shadow-black/40
                    text-white isolate
                  "
                >
                  {/* Mobile */}
                  <div className="md:hidden px-3 pt-12 pb-8">
                    <div className="flex flex-col gap-5">
                      {navDropdown.map((item) => (
                        <a
                          key={item.label}
                          href={item.href}
                          onClick={(e) =>
                            handleDropdownClick(e, item)
                          }
                          className="text-white text-[26px] leading-[28px] font-normal no-underline"
                          style={{
                            fontFamily:
                              'PP Neue Montreal, sans-serif',
                          }}
                        >
                          {item.label}
                        </a>
                      ))}
                    </div>

                    <div className="mt-[72px] flex w-full max-w-[340px] gap-2">
                      {mobileDropdownImages.map((src, index) => (
                        <img
                          key={src}
                          src={src}
                          alt={`Dropdown preview ${index + 1}`}
                          className="w-[100px] h-[224px] object-cover rounded-[4px] block"
                          style={{
                            objectPosition:
                              index === 2
                                ? 'left center'
                                : 'center center',
                          }}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Desktop */}
                  <div className="hidden md:grid grid-cols-[190px_1fr] gap-5 p-5">
                    <div className="flex flex-col gap-2">
                      {navDropdown.map((item) => {
                        const isActive =
                          activeDropdownItem === item.label;

                        return (
                          <a
                            key={item.label}
                            href={item.href}
                            onClick={(e) =>
                              handleDropdownClick(e, item)
                            }
                            onMouseEnter={() =>
                              setActiveDropdownItem(item.label)
                            }
                            className={`
                              px-4 py-3 rounded-lg text-sm font-medium
                              transition-all duration-300 hover:bg-white/5
                              ${
                                isActive
                                  ? 'bg-gradient-to-r from-[#F2E7C9] via-[#E9C9D6] via-[#D6CFEA] to-[#BFD7EE] bg-clip-text text-transparent'
                                  : 'text-white/80 hover:text-white'
                              }
                            `}
                          >
                            {item.label}
                          </a>
                        );
                      })}
                    </div>

                    <div
                      className="overflow-hidden bg-black rounded-[1.29px]"
                      style={{
                        width: '100%',
                        height: 260,
                      }}
                    >
                      <img
                        src={
                          navDropdownImages[activeDropdownItem] ||
                          navDropdownImages['Home']
                        }
                        alt="Dropdown preview"
                        className="w-full h-full block"
                        style={{
                          objectFit:
                            activeDropdownItem === 'Our vision' ||
                            activeDropdownItem === 'The story'
                              ? 'contain'
                              : 'cover',
                          objectPosition: 'center center',
                        }}
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
              <button
                key={link.label}
                onClick={() => handleNavClick(link)}
                className={`text-[13px] transition-colors duration-300 font-medium bg-transparent border-none cursor-pointer p-0 ${
                  (currentPage === 'companies' &&
                    link.label === 'Companies') ||
                  (currentPage === 'VentureScreen' &&
                    link.label === 'Ventures')
                    ? 'text-white'
                    : 'text-white hover:text-white/80'
                }`}
              >
                {link.label}
              </button>
            ))}
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-4">
            <button className="flex items-center gap-1 text-[13px] text-white font-medium">
              <Globe size={13} />
              <span>EN</span>
              <ChevronDown size={11} />
            </button>

            <button
              onClick={() => setIsContactOpen(true)}
              className={`
                flex items-center gap-1.5 px-5 py-2
                text-[13px] font-semibold rounded-lg
                transition-all duration-300
                ${
                  isPastHero
                    ? 'bg-white text-black hover:bg-white/90'
                    : 'bg-white/10 text-white hover:bg-white/20 border border-white/10'
                }
              `}
            >
              Get in touch

              <ArrowUpRight size={13} strokeWidth={2.5} />
            </button>
          </div>

          {/* Mobile */}
          <button
            className="md:hidden text-white"
            onClick={() => {
              setIsDropdownOpen(false);
              setIsMobileOpen(!isMobileOpen);
            }}
          >
            {isMobileOpen ? <X size={24} /> : <Menu size={24} />}
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
              <button
                onClick={() => {
                  setIsMobileOpen(false);
                  setIsContactOpen(true);
                }}
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

                <ArrowUpRight size={14} strokeWidth={2} />
              </button>

              <button
                onClick={() => setIsMobileOpen(false)}
                className="text-white hover:opacity-70 transition-opacity"
                aria-label="Close menu"
              >
                <X size={24} strokeWidth={1.5} />
              </button>
            </div>

            <div className="mt-[85px] px-[10px] flex flex-col items-start gap-[22px]">
              {navLinks.map((link) => (
                <button
                  key={link.label}
                  onClick={() => handleNavClick(link)}
                  className="
                    text-[#797A87]
                    font-normal
                    text-[23px]
                    leading-[26px]
                    no-underline
                    transition-all duration-300
                    hover:text-white
                    bg-transparent
                    border-none
                    cursor-pointer
                    p-0
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
                </button>
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

      {/* Contact Drawer */}
      <AnimatePresence>
        {isContactOpen && (
          <>
            {/* Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{
                duration: 0.25,
              }}
              onClick={() => setIsContactOpen(false)}
              className="fixed inset-0 z-[1000] bg-black/55 backdrop-blur-[8px]"
            />

            {/* Drawer */}
            <motion.div
              initial={{
                x: '100%',
              }}
              animate={{
                x: 0,
              }}
              exit={{
                x: '100%',
              }}
              transition={{
                duration: 0.35,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="fixed top-0 right-0 z-[1001] h-screen overflow-y-auto"
              style={{
                width: '612px',
                maxWidth: '100vw',
                background: '#111116',
                borderLeft: '1px solid rgba(255,255,255,0.08)',
              }}
            >
              <div className="contact-wrapper">
                {/* Close */}
                <button
                  onClick={() => setIsContactOpen(false)}
                  style={{
                    position: 'absolute',
                    top: '20px',
                    right: '20px',
                    background: 'transparent',
                    border: 'none',
                    color: '#fff',
                    cursor: 'pointer',
                    padding: 0,
                  }}
                >
                  <X size={24} strokeWidth={1.8} />
                </button>

                {/* Heading */}
                <h2 className="contact-title">Contact</h2>

                {/* Form */}
                <form
                  className="contact-form"
                  onSubmit={(e) => {
                    e.preventDefault();

                    const subject = encodeURIComponent(
                      `New Contact Form Submission`
                    );

                    const body = encodeURIComponent(`
First Name: ${form.firstName}
Last Name: ${form.lastName}
Who Am I: ${form.whoAmI}
Email: ${form.email}

Message:
${form.message}
                      `);

                    window.location.href = `mailto:hi@wowinx.com?subject=${subject}&body=${body}`;
                  }}
                >
                  <div className="contact-row">
                    <div>
                      <label style={labelStyle}>First name</label>

                      <input
                        type="text"
                        name="firstName"
                        value={form.firstName}
                        onChange={handleChange}
                        required
                        className="contact-input"
                      />
                    </div>

                    <div>
                      <label style={labelStyle}>Last name</label>

                      <input
                        type="text"
                        name="lastName"
                        value={form.lastName}
                        onChange={handleChange}
                        required
                        className="contact-input"
                      />
                    </div>
                  </div>

                  <div>
                    <label style={labelStyle}>Who am I ?</label>

                    <select
                      name="whoAmI"
                      value={form.whoAmI}
                      onChange={handleChange}
                      required
                      className="contact-input"
                      style={{
                        appearance: 'none',
                        backgroundImage:
                          "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='14' height='14' viewBox='0 0 24 24' fill='none' stroke='white' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E\")",
                        backgroundRepeat: 'no-repeat',
                        backgroundPosition: 'right 14px center',
                        paddingRight: '40px',
                      }}
                    >
                      <option value="" disabled>
                        Select
                      </option>

                      <option value="Founder">Founder</option>
                      <option value="Customer">Customer</option>
                      <option value="Company">Company</option>
                      <option value="Investor">Investor</option>
                      <option value="Media">Media</option>
                    </select>
                  </div>

                  <div>
                    <label style={labelStyle}>Email</label>

                    <input
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      required
                      className="contact-input"
                    />
                  </div>

                  <div>
                    <label style={labelStyle}>Message (Optional)</label>

                    <textarea
                      name="message"
                      value={form.message}
                      onChange={handleChange}
                      placeholder="Describe your project..."
                      className="contact-input"
                      style={{
                        minHeight: '140px',
                        paddingTop: '14px',
                        resize: 'none',
                      }}
                    />
                  </div>

                  <button type="submit" className="contact-submit">
                    Send form ↗
                  </button>
                </form>
              </div>

              <style>{`
                .contact-wrapper {
                  min-height: 100%;
                  padding: 80px;
                  display: flex;
                  flex-direction: column;
                  box-sizing: border-box;
                }

                .contact-title {
                  font-family: 'PP Neue Montreal', sans-serif;
                  font-weight: 500;
                  font-size: 48px;
                  line-height: 56px;
                  letter-spacing: -0.01em;
                  color: #fff;
                  margin: 0 0 40px;
                }

                .contact-form {
                  width: 100%;
                  max-width: 452px;
                  display: flex;
                  flex-direction: column;
                  gap: 18px;
                }

                .contact-row {
                  display: grid;
                  grid-template-columns: 1fr 1fr;
                  gap: 16px;
                }

                .contact-input {
                  width: 100%;
                  height: 40px;
                  border-radius: 1.5px;
                  border: 1px solid rgba(255,255,255,0.18);
                  background: transparent;
                  color: #fff;
                  font-size: 14px;
                  font-family: Inter, sans-serif;
                  padding: 0 12px;
                  outline: none;
                  box-sizing: border-box;
                  transition: all 0.25s ease;
                }

                .contact-input:focus {
                  border: 1px solid transparent;
                  background:
                    linear-gradient(#111116, #111116) padding-box,
                    linear-gradient(
                      269.79deg,
                      #F2E7C9 18.11%,
                      #E9C9D6 42.04%,
                      #D6CFEA 71.95%,
                      #BFD7EE 99.87%
                    ) border-box;
                }

                .contact-input::placeholder {
                  color: rgba(255,255,255,0.28);
                }

                .contact-submit {
                  width: 140px;
                  height: 40px;
                  border-radius: 2px;
                  border: 1px solid rgba(255,255,255,0.7);
                  background: transparent;
                  color: #fff;
                  font-size: 14px;
                  font-weight: 500;
                  font-family: Inter, sans-serif;
                  display: flex;
                  align-items: center;
                  justify-content: center;
                  gap: 6px;
                  cursor: pointer;
                  margin-top: 4px;
                  transition: all 0.25s ease;
                }

                .contact-submit:hover {
                  background: rgba(255,255,255,0.06);
                }

                @media (max-width: 768px) {
                  .contact-wrapper {
                    padding: 72px 28px 32px;
                  }

                  .contact-title {
                    font-size: 32px;
                    line-height: 38px;
                    margin-bottom: 32px;
                  }

                  .contact-form {
                    max-width: 100%;
                    gap: 16px;
                  }

                  .contact-row {
                    grid-template-columns: 1fr;
                    gap: 16px;
                  }

                  .contact-submit {
                    width: 100%;
                    margin-top: 10px;
                  }
                }
              `}</style>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}