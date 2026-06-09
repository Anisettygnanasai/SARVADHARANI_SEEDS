'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Send, Leaf } from 'lucide-react';

// Inline SVG social icons
const SocialFacebook = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>;
const SocialTwitter = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M4 4l11.733 16H20L8.267 4H4z"/><path d="M4 20l6.768-6.768M20 4l-6.768 6.768" stroke="currentColor" strokeWidth="1.5"/></svg>;
const SocialInstagram = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="0.5" fill="currentColor"/></svg>;
const SocialYoutube = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.95 1.95C5.12 20 12 20 12 20s6.88 0 8.59-.47a2.78 2.78 0 0 0 1.95-1.95A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z"/><polygon fill="white" points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02"/></svg>;
const SocialLinkedin = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>;

const quickLinks = [
  { label: 'Home', href: '#hero' },
  { label: 'Our Story', href: '#story' },
  { label: 'Research', href: '#research' },
  { label: 'Sustainability', href: '#sustainability' },
  { label: 'Gallery', href: '#gallery' },
];

const productLinks = [
  { label: 'MTU-1001', href: '#varieties' },
  { label: 'MTU-1156', href: '#varieties' },
  { label: 'MTU-1153', href: '#varieties' },
  { label: 'MTU-7029', href: '#varieties' },
  { label: 'SUVARNA', href: '#varieties' },
  { label: 'DHARANI', href: '#varieties' },
  { label: 'MYTHRI', href: '#varieties' },
  { label: 'LALIT', href: '#varieties' },
  { label: 'PRATHIBA', href: '#varieties' },
];

const companyLinks = [
  { label: 'About Us', href: '#story' },
  { label: 'Farmer Success Program', href: '#farmers' },
  { label: 'Dealer Partnership', href: '#contact' },
  { label: 'Careers', href: '#contact' },
  { label: 'Contact Us', href: '#contact' },
];

const socials = [
  { icon: SocialInstagram, label: 'Instagram', href: 'https://www.instagram.com/sarvadharani_seeds' },
  { icon: SocialYoutube, label: 'YouTube', href: 'https://youtube.com/@sarvadharaniseeds' },
];

export function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
    }
  };

  const scrollTo = (href: string) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer
      className="relative overflow-hidden"
      style={{ background: 'linear-gradient(160deg, #0F2218 0%, #1A3526 40%, #0F2218 100%)' }}
      role="contentinfo"
    >
      {/* Top gold border */}
      <div className="h-px" style={{ background: 'linear-gradient(90deg, transparent, #C8981E, transparent)' }} />

      {/* Decorative rice stalks */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <svg className="absolute right-0 top-0 h-full opacity-5 w-64" viewBox="0 0 200 600" fill="none">
          {[100, 150, 200, 250, 300, 350].map((y, i) => (
            <ellipse key={i} cx={i % 2 === 0 ? 80 : 120} cy={y} rx="22" ry="9" fill="#C8981E"
              transform={`rotate(${i % 2 === 0 ? -20 : 20}, ${i % 2 === 0 ? 80 : 120}, ${y})`} />
          ))}
          <line x1="100" y1="600" x2="100" y2="60" stroke="#3D6B4F" strokeWidth="3" strokeLinecap="round" />
        </svg>
      </div>

      <div className="section-container relative z-10 pt-16 pb-8">
        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-white/10">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            {/* Logo */}
            <div className="mb-6">
              <div className="relative w-24 h-24 md:w-32 md:h-32 flex-shrink-0 bg-white rounded-xl overflow-hidden p-2">
                <Image
                  src="/images/sarvadharani-logo.jpg"
                  alt="Sarvadharani Seeds Logo"
                  fill
                  className="object-contain p-2"
                />
              </div>
            </div>

            <p className="font-inter text-sm text-white/50 leading-relaxed mb-6 max-w-xs">
              Premium rice seeds for India&apos;s heartland. Research-first, farmer-first — built in Rayagada, Odisha.
            </p>

            {/* Startup badges */}
            <div className="flex flex-wrap gap-2 mb-6">
              {['Est. 2024', 'Rayagada, Odisha', 'Farmer-First'].map((badge) => (
                <span key={badge} className="px-3 py-1 rounded-full border border-paddy-gold/30 text-paddy-gold font-inter text-[10px] font-semibold tracking-wide">
                  {badge}
                </span>
              ))}
            </div>

            {/* Social Icons */}
            <div className="flex gap-3">
              {socials.map((s) => {
                const Icon = s.icon;
                return (
                  <motion.a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.15, y: -3 }}
                    whileTap={{ scale: 0.9 }}
                    className="w-9 h-9 rounded-xl bg-white/8 border border-white/10 flex items-center justify-center text-white/60 hover:text-paddy-gold hover:border-paddy-gold/40 transition-colors"
                    aria-label={s.label}
                    id={`footer-social-${s.label.toLowerCase()}`}
                  >
                    <Icon />
                  </motion.a>
                );
              })}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-jakarta font-bold text-sm text-white mb-5 uppercase tracking-wider">Quick Links</h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <button
                    onClick={() => scrollTo(link.href)}
                    className="font-inter text-sm text-white/50 hover:text-paddy-gold transition-colors flex items-center gap-1.5 group"
                    id={`footer-link-${link.label.toLowerCase().replace(' ', '-')}`}
                  >
                    <span className="w-0 group-hover:w-3 h-px bg-paddy-gold transition-all duration-300 overflow-hidden" />
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Products */}
          <div>
            <h3 className="font-jakarta font-bold text-sm text-white mb-5 uppercase tracking-wider">Varieties</h3>
            <ul className="space-y-3">
              {productLinks.map((link) => (
                <li key={link.label}>
                  <button
                    onClick={() => scrollTo(link.href)}
                    className="font-inter text-sm text-white/50 hover:text-paddy-gold transition-colors text-left group flex items-start gap-1.5"
                  >
                    <span className="w-0 group-hover:w-3 h-px bg-paddy-gold transition-all duration-300 overflow-hidden mt-2 flex-shrink-0" />
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="font-jakarta font-bold text-sm text-white mb-5 uppercase tracking-wider">Stay Updated</h3>
            <p className="font-inter text-xs text-white/40 mb-4 leading-relaxed">
              Get agronomy tips, new variety launches, and farmer success stories delivered to your inbox.
            </p>

            {subscribed ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex items-center gap-2 text-natural-green-400"
              >
                <Leaf size={16} />
                <span className="font-inter text-sm font-semibold">You&apos;re subscribed!</span>
              </motion.div>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-2" id="footer-newsletter-form">
                <div className="relative">
                  <input
                    id="footer-email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your@email.com"
                    required
                    className="w-full px-4 py-3 rounded-xl bg-white/8 border border-white/15 text-white placeholder-white/30 font-inter text-sm focus:outline-none focus:border-paddy-gold/50 transition-colors"
                  />
                </div>
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="w-full flex items-center justify-center gap-2 py-3 rounded-xl font-jakarta font-semibold text-sm text-white transition-colors"
                  style={{ background: 'linear-gradient(135deg, #C8981E, #E8BE24)' }}
                  id="footer-subscribe-btn"
                >
                  <Send size={14} />
                  Subscribe
                </motion.button>
              </form>
            )}

            {/* Company Links */}
            <div className="mt-8">
              <h3 className="font-jakarta font-bold text-sm text-white mb-4 uppercase tracking-wider">Company</h3>
              <ul className="space-y-3">
                {companyLinks.map((link) => (
                  <li key={link.label}>
                    <button
                      onClick={() => scrollTo(link.href)}
                      className="font-inter text-sm text-white/50 hover:text-paddy-gold transition-colors flex items-center gap-1.5 group"
                    >
                      <span className="w-0 group-hover:w-3 h-px bg-paddy-gold transition-all duration-300 overflow-hidden" />
                      {link.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="font-inter text-xs text-white/30 text-center md:text-left">
            © {new Date().getFullYear()} Sarvadharani Seeds. All rights reserved. Rayagada, Odisha, India.
          </p>
          <div className="flex items-center gap-6">
            {['Privacy Policy', 'Terms of Use', 'Sitemap'].map((item) => (
              <button
                key={item}
                className="font-inter text-xs text-white/30 hover:text-white/60 transition-colors"
              >
                {item}
              </button>
            ))}
          </div>
        </div>

        {/* Made with love */}
        <div className="text-center mt-6">
          <p className="font-inter text-[10px] text-white/20 flex items-center justify-center gap-1.5">
            Crafted with <span className="text-paddy-gold">♥</span> for Indian farmers
          </p>
        </div>
      </div>
    </footer>
  );
}
