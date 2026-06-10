'use client';

import { useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { farmers } from '@/data/farmers';
import { TrendingUp, MapPin, Quote, ChevronLeft, ChevronRight, X } from 'lucide-react';

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
  const [selectedFarmer, setSelectedFarmer] = useState<(typeof farmers)[0] | null>(null);

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

      {/* ── Interactive Scrollable Row with Arrow Controls (Desktop) ── */}
      <div className="section-container mb-10 hidden lg:block">
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

      {/* ── Auto-Scrolling Marquee Row 1 — left (Desktop) ── */}
      <div className="relative mb-6 overflow-hidden hidden lg:block">
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

      {/* ── Auto-Scrolling Marquee Row 2 — right (Desktop) ── */}
      <div className="relative overflow-hidden hidden lg:block">
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

      {/* ── Mobile Farmer Directory ── */}
      <div className="section-container lg:hidden">
        <div className="space-y-3">
          {farmers.map((farmer, i) => (
            <motion.div
              key={`mobile-farmer-${i}`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-20px' }}
              transition={{ delay: i * 0.05, duration: 0.4 }}
              onClick={() => setSelectedFarmer(farmer)}
              className="flex items-center justify-between p-4 bg-white rounded-2xl shadow-sm border border-paddy-gold-100 active:scale-[0.98] transition-transform"
            >
              <div className="flex items-center gap-3">
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center text-white font-cormorant text-lg font-bold flex-shrink-0"
                  style={{ background: 'linear-gradient(135deg, #3D6B4F, #52A370)' }}
                >
                  {farmer.avatar}
                </div>
                <div>
                  <div className="font-jakarta font-bold text-deep-forest text-sm">{farmer.name}</div>
                  <div className="flex items-center gap-1 text-warm-gray mt-0.5">
                    <MapPin size={10} />
                    <span className="font-inter text-xs">{farmer.village}, {farmer.state}</span>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="font-inter text-[10px] text-paddy-gold font-bold uppercase tracking-wide">Tap to View</div>
                <ChevronRight size={16} className="text-paddy-gold-300 ml-auto mt-0.5" />
              </div>
            </motion.div>
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

      {/* Mobile Modal */}
      <AnimatePresence>
        {selectedFarmer && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm lg:hidden flex items-end justify-center"
            onClick={() => setSelectedFarmer(null)}
          >
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full bg-ivory rounded-t-[20px] pb-8 shadow-2xl relative"
            >
              <div className="sticky top-0 px-5 pt-4 pb-2 flex justify-between items-start z-10">
                <div className="absolute top-2 left-1/2 -translate-x-1/2 w-12 h-1 bg-paddy-gold-200 rounded-full" />
                <h3 className="font-cormorant text-xl font-bold text-deep-forest mt-2">Farmer Story</h3>
                <button
                  onClick={() => setSelectedFarmer(null)}
                  className="p-2 -mr-2 bg-white rounded-full text-deep-forest shadow-sm border border-paddy-gold-100 mt-0"
                >
                  <X size={18} />
                </button>
              </div>

              <div className="px-5 pb-5">
                <div className="flex items-center gap-3 mb-5">
                  <div
                    className="w-14 h-14 rounded-full flex items-center justify-center text-white font-cormorant text-xl font-bold flex-shrink-0 shadow-sm"
                    style={{ background: 'linear-gradient(135deg, #3D6B4F, #52A370)' }}
                  >
                    {selectedFarmer.avatar}
                  </div>
                  <div>
                    <div className="font-jakarta text-lg font-bold text-deep-forest">{selectedFarmer.name}</div>
                    <div className="flex items-center gap-1 text-warm-gray">
                      <MapPin size={12} />
                      <span className="font-inter text-sm">{selectedFarmer.village}, {selectedFarmer.state}</span>
                    </div>
                  </div>
                </div>

                <div className="relative mb-5 bg-white p-4 rounded-2xl border border-paddy-gold-100 shadow-sm">
                  <Quote size={20} className="text-paddy-gold opacity-30 absolute -top-2 -left-1" />
                  <p className="font-inter text-xs text-deep-forest/80 leading-relaxed italic relative z-10">
                    "{selectedFarmer.quote}"
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-2 mb-5">
                  <div className="bg-natural-green-50 rounded-xl p-3 text-center">
                    <div className="font-cormorant text-xl font-bold text-natural-green mb-0.5">{selectedFarmer.acres}</div>
                    <div className="font-inter text-[10px] text-natural-green-700 uppercase tracking-wide">Farm Size</div>
                  </div>
                  <div className="bg-paddy-gold-50 rounded-xl p-3 text-center">
                    <div className="font-cormorant text-xl font-bold text-paddy-gold mb-0.5">{selectedFarmer.improvement}</div>
                    <div className="font-inter text-[10px] text-paddy-gold-600 uppercase tracking-wide">Yield Gain</div>
                  </div>
                </div>

                <div className="flex items-center justify-between p-3 bg-earth-brown/5 rounded-xl border border-earth-brown/10 mb-5">
                  <span className="font-inter text-xs font-semibold text-earth-brown">Additional Income</span>
                  <span className="font-cormorant text-lg font-bold text-earth-brown">{selectedFarmer.income}</span>
                </div>

                <div className="flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl bg-paddy-gold text-white shadow-md">
                  <TrendingUp size={14} />
                  <span className="font-inter text-xs font-semibold">Variety Used: {selectedFarmer.variety}</span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
