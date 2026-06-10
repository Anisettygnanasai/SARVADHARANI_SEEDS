'use client';

import Image from 'next/image';
import heroImg from '../../../public/images/logo-cropped.png';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowDown, Leaf, FlaskConical } from 'lucide-react';
import { RiceParticles } from '@/components/ui/RiceParticles';
import { wordReveal, fadeUp, staggerContainer } from '@/lib/animations';

const headline = 'Growing Stronger Harvests for Tomorrow';
const words = headline.split(' ');

const stats = [
  { value: '9+', label: 'Reliable Varieties' },
  { value: '100%', label: 'Quality Focus' },
  { value: '100%', label: 'Scientific Processing' },
  { value: '100%', label: 'Farmer-Centric' },
];

export function Hero() {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 1000], [0, 200]);
  const opacity = useTransform(scrollY, [0, 500], [1, 0]);

  const scrollToNext = () => {
    const el = document.querySelector('#story');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="hero"
      className="relative min-h-[100dvh] flex flex-col justify-center overflow-hidden bg-black"
    >
      {/* Hero Background Image - Logo Watermark */}
      <motion.div 
        className="absolute inset-0 z-0 flex items-end justify-center pb-20 lg:pb-0 lg:items-center lg:justify-end lg:pr-20 pointer-events-none"
        style={{ y, opacity }}
      >
        <div className="relative w-[90%] h-[60%] sm:w-[80%] sm:h-[80%] md:w-[800px] md:h-[800px] opacity-[0.08] lg:opacity-20 mix-blend-screen translate-y-10 lg:translate-y-0">
          <Image
            src={heroImg}
            alt="Sarvadharani Seeds Background"
            fill
            priority
            className="object-contain"
            sizes="(max-width: 768px) 90vw, 800px"
          />
        </div>
        {/* Dark overlay to ensure text legibility */}
        <div className="absolute inset-0 bg-black/40 lg:bg-black/20" />
      </motion.div>

      {/* Glowing atmospheric effects */}
      <div className="absolute inset-0 pointer-events-none z-0" aria-hidden="true">
        <motion.div
          className="absolute top-1/4 left-1/4 w-[20rem] lg:w-[40rem] h-[20rem] lg:h-[40rem] rounded-full mix-blend-screen"
          style={{ background: 'radial-gradient(circle, rgba(200,152,30,0.15) 0%, transparent 70%)' }}
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-[15rem] lg:w-[30rem] h-[15rem] lg:h-[30rem] rounded-full mix-blend-screen"
          style={{ background: 'radial-gradient(circle, rgba(61,107,79,0.15) 0%, transparent 70%)' }}
          animate={{ scale: [1.2, 1, 1.2], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
        />
      </div>

      {/* Particles customized for dark theme */}
      <div className="opacity-60">
        <RiceParticles />
      </div>

      {/* Main Content */}
      <div className="relative z-10 section-container pt-28 sm:pt-32 pb-24 w-full">
        <div className="max-w-4xl">
          {/* Eyebrow label */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-wrap items-center gap-3 mb-6"
          >
            <span className="font-inter text-[10px] sm:text-xs font-semibold tracking-[0.2em] uppercase text-paddy-gold-200">
              Est. 2024 · Rayagada, Odisha
            </span>
            <span className="hidden sm:block w-8 sm:w-12 h-px bg-paddy-gold-200/50" />
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10">
              <Leaf size={12} className="text-paddy-gold-200" />
              <span className="font-inter text-[10px] sm:text-xs text-white font-medium">
                Premium Rice Seeds
              </span>
            </div>
          </motion.div>

          {/* Animated Headline */}
          <h1 className="font-cormorant text-[2.75rem] sm:text-5xl md:text-6xl lg:text-[5.5rem] leading-[1.1] font-bold text-white mb-5 sm:mb-6 tracking-tight drop-shadow-xl text-balance">
            {words.map((word, i) => (
              <span key={i} className="inline-block overflow-hidden mr-[0.25em] last:mr-0 py-1">
                <motion.span
                  className="inline-block"
                  custom={i}
                  variants={wordReveal}
                  initial="hidden"
                  animate="visible"
                >
                  {word === 'Tomorrow\'s' || word === 'Harvests' || word === 'Tomorrow' ? (
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-paddy-gold-200 via-paddy-gold to-paddy-gold-600">
                      {word}
                    </span>
                  ) : (
                    word
                  )}
                </motion.span>
              </span>
            ))}
          </h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="font-jakarta text-base sm:text-lg lg:text-2xl text-ivory/90 max-w-2xl mb-8 sm:mb-10 leading-relaxed font-normal drop-shadow-md"
          >
            Delivering trusted rice seed varieties through quality processing, scientific standards, and farmer-focused innovation.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.1, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4 mb-12 sm:mb-16"
          >
            <motion.button
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => {
                const el = document.querySelector('#varieties');
                el?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 sm:py-4 bg-paddy-gold text-white font-jakarta text-sm sm:text-base font-semibold rounded-full hover:bg-paddy-gold-400 transition-colors shadow-[0_0_40px_rgba(200,152,30,0.3)] hover:shadow-[0_0_60px_rgba(200,152,30,0.5)]"
              id="hero-cta-varieties"
            >
              <Leaf size={16} />
              Explore Varieties
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => {
                const el = document.querySelector('#contact');
                el?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 sm:py-4 bg-white/10 backdrop-blur-sm text-white border border-white/30 font-jakarta text-sm sm:text-base font-semibold rounded-full hover:bg-white/20 transition-colors shadow-lg"
              id="hero-cta-contact"
            >
              <FlaskConical size={16} className="text-paddy-gold-200" />
              Contact Us
            </motion.button>
          </motion.div>

          {/* Stats Bar */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-2 lg:grid-cols-4 gap-y-6 gap-x-4 sm:gap-6 lg:gap-8 border-t border-white/20 pt-6 sm:pt-8"
          >
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                variants={fadeUp}
                className="text-left"
              >
                <div className="font-cormorant text-2xl sm:text-3xl lg:text-4xl font-bold text-white leading-none mb-1 sm:mb-2 drop-shadow-md">
                  {stat.value}
                </div>
                <div className="font-inter text-[10px] sm:text-xs lg:text-sm text-ivory/80 font-semibold tracking-wide uppercase">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8 }}
        onClick={scrollToNext}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 group hidden lg:flex"
        aria-label="Scroll to next section"
        id="hero-scroll-indicator"
      >
        <span className="text-[10px] font-inter tracking-[0.2em] uppercase text-white/60 group-hover:text-paddy-gold transition-colors">
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="w-10 h-10 rounded-full border border-white/20 bg-black/40 backdrop-blur-sm flex items-center justify-center group-hover:border-paddy-gold/50 group-hover:bg-paddy-gold/10 transition-all"
        >
          <ArrowDown size={16} className="text-white/90 group-hover:text-paddy-gold transition-colors" />
        </motion.div>
      </motion.button>

      {/* Smooth transition to light section below */}
      <div className="absolute bottom-0 left-0 right-0 h-20 sm:h-32 bg-gradient-to-t from-[#FDFAF4] to-transparent z-10 pointer-events-none" aria-hidden="true" />
    </section>
  );
}
