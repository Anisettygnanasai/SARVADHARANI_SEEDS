'use client';

import Image from 'next/image';
import heroImg from '../../../public/images/hero.png';
import { motion } from 'framer-motion';
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

function AnimatedRiceStalks() {
  const stalks = [
    { left: '5%', delay: 0, scale: 0.8 },
    { left: '12%', delay: 0.5, scale: 1.1 },
    { left: '85%', delay: 0.3, scale: 0.9 },
    { left: '92%', delay: 0.8, scale: 1.0 },
    { left: '78%', delay: 0.2, scale: 0.7 },
  ];

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
      {stalks.map((stalk, i) => (
        <motion.div
          key={i}
          className="absolute bottom-0"
          style={{ left: stalk.left, transformOrigin: 'bottom center' }}
          animate={{ rotate: [-2, 2, -2] }}
          transition={{
            duration: 5 + i * 0.7,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: stalk.delay,
          }}
        >
          <svg
            width={60 * stalk.scale}
            height={200 * stalk.scale}
            viewBox="0 0 60 200"
            fill="none"
            className="opacity-20"
          >
            <line x1="30" y1="200" x2="30" y2="20" stroke="#3D6B4F" strokeWidth="3" strokeLinecap="round"/>
            {[40, 60, 80, 100, 120].map((y, j) => (
              <ellipse
                key={j}
                cx={j % 2 === 0 ? 18 : 42}
                cy={y}
                rx="12"
                ry="5"
                fill="#C8981E"
                opacity={0.6 + j * 0.06}
                transform={`rotate(${j % 2 === 0 ? -25 : 25}, ${j % 2 === 0 ? 18 : 42}, ${y})`}
              />
            ))}
          </svg>
        </motion.div>
      ))}
    </div>
  );
}

export function Hero() {
  const scrollToNext = () => {
    const el = document.querySelector('#story');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col justify-center overflow-hidden"
      style={{
        background: 'linear-gradient(150deg, #FDFAF4 0%, #EDF5F0 40%, #F5EDE4 70%, #FDFAF4 100%)',
      }}
    >
      {/* Hero Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src={heroImg}
          alt="Lush rice paddy fields — Sarvadharani Seeds"
          fill
          priority
          placeholder="blur"
          className="object-cover opacity-20"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-ivory/60 via-transparent to-ivory/80" />
      </div>

      {/* Particles */}
      <RiceParticles />

      {/* Rice Stalks Decoration */}
      <AnimatedRiceStalks />

      {/* Floating orbs */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <motion.div
          className="absolute top-1/4 right-1/4 w-96 h-96 rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(200,152,30,0.08) 0%, transparent 70%)' }}
          animate={{ scale: [1, 1.3, 1], opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute bottom-1/3 left-1/4 w-80 h-80 rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(61,107,79,0.08) 0%, transparent 70%)' }}
          animate={{ scale: [1.2, 1, 1.2], opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
        />
      </div>

      {/* Main Content */}
      <div className="relative z-10 section-container pt-32 pb-20">
        <div className="max-w-5xl">
          {/* Eyebrow label */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="flex items-center gap-3 mb-8"
          >
            <span className="label-text">Est. 2024 · Rayagada, Odisha</span>
            <span className="w-8 h-px bg-paddy-gold opacity-60" />
            <div className="flex items-center gap-1.5">
              <Leaf size={12} className="text-natural-green" />
              <span className="font-inter text-xs text-natural-green font-medium">
                Premium Rice Seeds
              </span>
            </div>
          </motion.div>

          {/* Animated Headline */}
          <h1 className="display-heading mb-6 overflow-hidden">
            {words.map((word, i) => (
              <span key={i} className="inline-block overflow-hidden mr-[0.25em] last:mr-0">
                <motion.span
                  className="inline-block"
                  custom={i}
                  variants={wordReveal}
                  initial="hidden"
                  animate="visible"
                >
                  {word === 'Tomorrow\'s' || word === 'Harvest' ? (
                    <span className="gradient-text">{word}</span>
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
            className="font-jakarta text-xl lg:text-2xl text-deep-forest/70 max-w-2xl mb-10 leading-relaxed font-medium"
          >
            Delivering trusted rice seed varieties through quality processing, scientific standards, and farmer-focused innovation.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.1, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-wrap gap-4 mb-16"
          >
            <motion.button
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => {
                const el = document.querySelector('#varieties');
                el?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="btn-primary text-base px-8 py-4"
              id="hero-cta-varieties"
            >
              <span className="flex items-center gap-2">
                <Leaf size={16} />
                Explore Varieties
              </span>
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => {
                const el = document.querySelector('#contact');
                el?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="btn-secondary text-base px-8 py-4"
              id="hero-cta-contact"
            >
              <span className="flex items-center gap-2">
                <FlaskConical size={16} />
                Contact Us
              </span>
            </motion.button>
          </motion.div>

          {/* Stats Bar */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 border-t border-paddy-gold-100 pt-8"
          >
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                variants={fadeUp}
                className="text-center lg:text-left"
              >
                <div className="font-cormorant text-3xl lg:text-4xl font-bold text-paddy-gold leading-none mb-1">
                  {stat.value}
                </div>
                <div className="font-inter text-sm text-warm-gray">{stat.label}</div>
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
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 scroll-indicator hover:text-paddy-gold transition-colors"
        aria-label="Scroll to next section"
        id="hero-scroll-indicator"
      >
        <span className="text-[10px] tracking-widest uppercase">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="w-px h-10 bg-gradient-to-b from-paddy-gold to-transparent mx-auto mt-2"
        />
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut', delay: 0.2 }}
        >
          <ArrowDown size={14} className="mx-auto text-paddy-gold" />
        </motion.div>
      </motion.button>

      {/* Decorative bottom curve */}
      <div className="absolute bottom-0 left-0 right-0 z-0" aria-hidden="true">
        <svg viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
          <path d="M0 80V40C360 0 720 0 1080 40C1260 60 1380 80 1440 80H0Z" fill="#FDFAF4" opacity="0.5"/>
        </svg>
      </div>
    </section>
  );
}
