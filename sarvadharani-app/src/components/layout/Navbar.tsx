'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { Menu, X, ChevronDown } from 'lucide-react';
import { useRouter } from 'next/navigation';

const navLinks = [
  { label: 'Home', href: '#hero' },
  { label: 'Our Story', href: '#story' },
  { label: 'Partners', href: '#founders' },
  {
    label: 'Varieties',
    href: '#varieties',
    children: [
      { label: 'MTU-1001', href: '/products/mtu-1001' },
      { label: 'MTU-1156', href: '/products/mtu-1156' },
      { label: 'MTU-1153', href: '/products/mtu-1153' },
      { label: 'MTU-7029', href: '/products/mtu-7029' },
      { label: 'SUVARNA', href: '/products/suvarna' },
      { label: 'DHARANI', href: '/products/dharani' },
      { label: 'MYTHRI', href: '/products/mythri' },
      { label: 'LALIT', href: '/products/lalit' },
      { label: 'PRATHIBA', href: '/products/prathiba' },
    ],
  },
  { label: 'Research', href: '#research' },
  { label: 'Sustainability', href: '#sustainability' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'Contact', href: '#contact' },
];

const SocialInstagram = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="0.5" fill="currentColor"/></svg>;
const SocialYoutube = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.95 1.95C5.12 20 12 20 12 20s6.88 0 8.59-.47a2.78 2.78 0 0 0 1.95-1.95A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z"/><polygon fill="white" points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02"/></svg>;

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const { scrollYProgress } = useScroll();
  const progressWidth = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);
  const dropdownTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 60);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (href: string) => {
    setIsMobileOpen(false);
    if (href.startsWith('#')) {
      if (window.location.pathname !== '/') {
        router.push(`/${href}`);
      } else {
        const el = document.querySelector(href);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      router.push(href);
    }
  };

  const handleDropdownEnter = (label: string) => {
    if (dropdownTimeout.current) clearTimeout(dropdownTimeout.current);
    setActiveDropdown(label);
  };

  const handleDropdownLeave = () => {
    dropdownTimeout.current = setTimeout(() => setActiveDropdown(null), 150);
  };

  return (
    <>
      {/* Scroll Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-0.5 z-[100] origin-left"
        style={{
          width: progressWidth,
          background: 'linear-gradient(90deg, #C8981E, #E8BE24)',
        }}
      />

      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? 'bg-ivory/90 backdrop-blur-xl border-b border-paddy-gold-200/50 shadow-[0_2px_30px_rgba(107,76,42,0.08)]'
            : 'bg-transparent'
        }`}
      >
        <div className="section-container">
          <div className="flex items-center justify-between h-16 md:h-24">
            {/* Logo */}
            <button
              onClick={() => handleNavClick('#hero')}
              className="flex items-center gap-2 group"
              id="nav-logo"
            >
              <div className="relative w-16 h-16 md:w-24 md:h-24 flex-shrink-0 transition-transform duration-300 group-hover:scale-105">
                <Image
                  src="/images/logo-cropped.png"
                  alt="Sarvadharani Seeds Logo"
                  fill
                  className="object-contain drop-shadow-md"
                  priority
                />
              </div>
            </button>

            {/* Desktop Nav */}
            <div className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => (
                <div
                  key={link.label}
                  className="relative"
                  onMouseEnter={() => link.children && handleDropdownEnter(link.label)}
                  onMouseLeave={() => link.children && handleDropdownLeave()}
                >
                  <button
                    onClick={() => !link.children && handleNavClick(link.href)}
                    className={`flex items-center gap-1 px-4 py-2 font-jakarta text-sm font-semibold transition-colors duration-200 rounded-full ${
                      isScrolled 
                        ? 'text-deep-forest hover:text-paddy-gold hover:bg-paddy-gold-50' 
                        : 'text-white/90 hover:text-white hover:bg-white/10'
                    }`}
                    id={`nav-${link.label.toLowerCase().replace(' ', '-')}`}
                  >
                    {link.label}
                    {link.children && (
                      <ChevronDown
                        size={14}
                        className={`transition-transform duration-200 ${
                          activeDropdown === link.label ? 'rotate-180' : ''
                        }`}
                      />
                    )}
                  </button>

                  {/* Dropdown */}
                  <AnimatePresence>
                    {link.children && activeDropdown === link.label && (
                      <motion.div
                        initial={{ opacity: 0, y: 8, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 8, scale: 0.95 }}
                        transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                        className="absolute top-full left-0 mt-2 w-48 bg-ivory/95 backdrop-blur-xl border border-white/20 rounded-2xl overflow-hidden shadow-premium py-2"
                      >
                        {link.children.map((child) => (
                           <button
                            key={child.label}
                            onClick={() => { handleNavClick(child.href); setActiveDropdown(null); }}
                            className="w-full text-left px-4 py-2.5 font-inter text-sm text-deep-forest/80 hover:text-paddy-gold hover:bg-paddy-gold-50 transition-colors"
                          >
                            {child.label}
                          </button>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>

            {/* CTA + Mobile Toggle */}
            <div className="flex items-center gap-3">
              <div className={`hidden lg:flex items-center gap-2 mr-2 transition-colors ${isScrolled ? 'text-deep-forest/60' : 'text-white/80'}`}>
                <a href="https://www.instagram.com/sarvadharani_seeds" target="_blank" rel="noopener noreferrer" className={`p-2 transition-colors ${isScrolled ? 'hover:text-[#E1306C]' : 'hover:text-white'}`} aria-label="Instagram">
                  <SocialInstagram />
                </a>
                <a href="https://youtube.com/@sarvadharaniseeds" target="_blank" rel="noopener noreferrer" className={`p-2 transition-colors ${isScrolled ? 'hover:text-[#FF0000]' : 'hover:text-white'}`} aria-label="YouTube">
                  <SocialYoutube />
                </a>
              </div>
              <button
                onClick={() => handleNavClick('#contact')}
                className="hidden lg:flex btn-primary text-sm py-2.5 px-5 shadow-lg"
                id="nav-cta"
              >
                <span>Explore Varieties</span>
              </button>
              <button
                onClick={() => setIsMobileOpen(!isMobileOpen)}
                className={`lg:hidden p-1.5 md:p-2 rounded-xl transition-colors ${isScrolled ? 'text-deep-forest hover:bg-paddy-gold-50' : 'text-white hover:bg-white/20'}`}
                aria-label="Toggle mobile menu"
                id="nav-mobile-toggle"
              >
                {isMobileOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-40 bg-ivory flex flex-col pt-24"
          >
            <div className="section-container flex-1 flex flex-col justify-center gap-2">
              {navLinks.map((link, i) => (
                <motion.button
                  key={link.label}
                  initial={{ opacity: 0, x: 40 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.06, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  onClick={() => handleNavClick(link.href)}
                  className="text-left py-4 border-b border-paddy-gold-100 font-cormorant text-3xl font-bold text-deep-forest hover:text-paddy-gold transition-colors"
                >
                  {link.label}
                </motion.button>
              ))}
              <motion.button
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: navLinks.length * 0.06 + 0.1, duration: 0.4 }}
                onClick={() => handleNavClick('#contact')}
                className="mt-8 btn-primary w-full justify-center text-base py-4"
              >
                <span>Talk to Experts</span>
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
