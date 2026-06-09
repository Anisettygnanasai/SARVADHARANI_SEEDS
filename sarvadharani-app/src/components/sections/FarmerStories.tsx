'use client';

import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { farmers } from '@/data/farmers';
import { TrendingUp, MapPin, Quote, ChevronLeft, ChevronRight } from 'lucide-react';

function FarmerCard({ farmer }: { farmer: (typeof farmers)[0] }) {
  return (
    <div className="flex-shrink-0 w-80 card-base p-6 mx-3 group hover:shadow-card-hover">
      <div className="flex items-center gap-4 mb-5">
        {/* Avatar */}
        <div
          className="w-14 h-14 rounded-full flex items-center justify-center text-white font-cormorant text-xl font-bold flex-shrink-0"
          style={{ background: 'linear-gradient(135deg, #3D6B4F, #52A370)' }}
        >
          {farmer.avatar}
        </div>
        <div>
          <div className="font-jakarta font-bold text-deep-forest">{farmer.name}</div>
          <div className="flex items-center gap-1 text-warm-gray">
            <MapPin size={11} />
            <span className="font-inter text-xs">{farmer.village}, {farmer.state}</span>
          </div>
        </div>
      </div>

      {/* Quote */}
      <div className="relative mb-5">
        <Quote size={20} className="text-paddy-gold opacity-40 mb-2" />
        <p className="font-inter text-sm text-warm-gray leading-relaxed italic line-clamp-3">
          {farmer.quote}
        </p>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-3 gap-3 pt-4 border-t border-paddy-gold-100">
        <div className="text-center">
          <div className="font-cormorant text-lg font-bold text-paddy-gold">{farmer.improvement}</div>
          <div className="font-inter text-[10px] text-warm-gray uppercase tracking-wide">Yield Gain</div>
        </div>
        <div className="text-center">
          <div className="font-cormorant text-lg font-bold text-natural-green">{farmer.acres}</div>
          <div className="font-inter text-[10px] text-warm-gray uppercase tracking-wide">Farm Size</div>
        </div>
        <div className="text-center">
          <div className="font-cormorant text-lg font-bold text-earth-brown">{farmer.income}</div>
          <div className="font-inter text-[10px] text-warm-gray uppercase tracking-wide">Income</div>
        </div>
      </div>

      {/* Variety Tag */}
      <div className="mt-4 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-paddy-gold-50 border border-paddy-gold-200">
        <TrendingUp size={11} className="text-paddy-gold" />
        <span className="font-inter text-xs font-semibold text-paddy-gold-600">{farmer.variety}</span>
      </div>
    </div>
  );
}

export function FarmerStories() {
  const headerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(headerRef, { once: true, margin: '-80px' });

  // Scrollable row ref
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScrollability = () => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 0);
    setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 4);
  };

  const scrollByAmount = (dir: 'left' | 'right') => {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollBy({ left: dir === 'right' ? 340 : -340, behavior: 'smooth' });
  };

  // Marquee rows (auto-scrolling)
  const row1 = [...farmers, ...farmers, ...farmers];
  const row2 = [...[...farmers].reverse(), ...[...farmers].reverse(), ...[...farmers].reverse()];

  return (
    <section id="farmers" className="section-padding bg-ivory overflow-hidden">
      <div className="section-container mb-16">
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center max-w-3xl mx-auto"
        >
          <span className="label-text">Real Farmer Voices</span>
          <span className="gold-divider mx-auto mt-3 mb-6 block" />
          <h2 className="section-heading mb-5">
            Stories of <span className="gradient-text">Transformation</span><br />
            from the Fields
          </h2>
          <p className="body-text text-lg">
            500+ farmers across Andhra Pradesh have experienced real yield improvement with Sarvadharani varieties. Every story here is from a real partner farmer.
          </p>
        </motion.div>
      </div>

      {/* ── Interactive Scrollable Row with Arrow Controls ── */}
      <div className="section-container mb-10">
        <div className="relative">
          {/* Left Arrow */}
          <button
            onClick={() => scrollByAmount('left')}
            aria-label="Scroll left"
            className={`absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 w-10 h-10 rounded-full shadow-lg flex items-center justify-center transition-all duration-300 ${
              canScrollLeft
                ? 'bg-white text-deep-forest hover:bg-paddy-gold hover:text-white cursor-pointer opacity-100'
                : 'bg-white/50 text-warm-gray cursor-default opacity-40 pointer-events-none'
            }`}
            style={{ boxShadow: '0 4px 20px rgba(107,76,42,0.15)' }}
          >
            <ChevronLeft size={20} />
          </button>

          {/* Scrollable Container */}
          <div
            ref={scrollRef}
            onScroll={checkScrollability}
            className="flex overflow-x-auto gap-0 pb-4 farmer-hscroll"
            style={{
              scrollbarWidth: 'thin',
              scrollbarColor: '#C8981E #f3ece0',
              WebkitOverflowScrolling: 'touch',
              msOverflowStyle: 'auto',
            }}
          >
            {farmers.map((farmer, i) => (
              <FarmerCard key={`scroll-${i}`} farmer={farmer} />
            ))}
          </div>

          {/* Right Arrow */}
          <button
            onClick={() => scrollByAmount('right')}
            aria-label="Scroll right"
            className={`absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 w-10 h-10 rounded-full shadow-lg flex items-center justify-center transition-all duration-300 ${
              canScrollRight
                ? 'bg-white text-deep-forest hover:bg-paddy-gold hover:text-white cursor-pointer opacity-100'
                : 'bg-white/50 text-warm-gray cursor-default opacity-40 pointer-events-none'
            }`}
            style={{ boxShadow: '0 4px 20px rgba(107,76,42,0.15)' }}
          >
            <ChevronRight size={20} />
          </button>
        </div>

        {/* Scroll hint text */}
        <p className="text-center font-inter text-xs text-warm-gray mt-3 opacity-60">
          ← Scroll or use arrows to explore all farmer stories →
        </p>
      </div>

      {/* ── Auto-Scrolling Marquee Row 1 — left ── */}
      <div className="relative mb-6 overflow-hidden">
        <div
          className="flex"
          style={{
            animation: 'marqueeLeft 50s linear infinite',
            width: 'max-content',
            willChange: 'transform',
          }}
        >
          {row1.map((farmer, i) => (
            <FarmerCard key={`r1-${i}`} farmer={farmer} />
          ))}
        </div>
      </div>

      {/* ── Auto-Scrolling Marquee Row 2 — right ── */}
      <div className="relative overflow-hidden">
        <div
          className="flex"
          style={{
            animation: 'marqueeRight 55s linear infinite',
            width: 'max-content',
            willChange: 'transform',
          }}
        >
          {row2.map((farmer, i) => (
            <FarmerCard key={`r2-${i}`} farmer={farmer} />
          ))}
        </div>
      </div>

      {/* CTA */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="text-center mt-14"
      >
        <p className="body-text mb-5">Ready to write your own success story?</p>
        <button
          onClick={() => { const el = document.querySelector('#contact'); el?.scrollIntoView({ behavior: 'smooth' }); }}
          className="btn-primary"
          id="farmer-stories-cta"
        >
          <span>Become a Partner Farmer</span>
        </button>
      </motion.div>
    </section>
  );
}
