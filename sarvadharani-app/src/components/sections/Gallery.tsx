'use client';

import { useState, useRef } from 'react';
import Image from 'next/image';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, ZoomIn } from 'lucide-react';

const categories = ['All', 'Research Fields', 'Rice Crops', 'Farmers', 'Seed Processing', 'Events'];

const galleryItems = [
  { id: 1, src: '/images/hero.png', alt: 'Aerial view of rice paddy fields', category: 'Research Fields', tall: true },
  { id: 2, src: '/images/variety-pratiba.png', alt: 'PRATIBA variety close-up', category: 'Rice Crops', tall: false },
  { id: 3, src: '/images/variety-lalit.png', alt: 'LALIT variety panicle', category: 'Rice Crops', tall: false },
  { id: 4, src: '/images/variety-dharani.png', alt: 'DHARANI trial field', category: 'Research Fields', tall: true },
  { id: 5, src: '/images/variety-annapurna.png', alt: 'ANNAPURNA variety grains', category: 'Rice Crops', tall: false },
  { id: 6, src: '/images/variety-sridhanya.png', alt: 'SRI DHANYA premium grain', category: 'Rice Crops', tall: false },
  { id: 7, src: '/images/hero.png', alt: 'Farmer training session', category: 'Farmers', tall: false },
  { id: 8, src: '/images/variety-pratiba.png', alt: 'Seed processing facility', category: 'Seed Processing', tall: true },
  { id: 9, src: '/images/variety-lalit.png', alt: 'Field day event', category: 'Events', tall: false },
  { id: 10, src: '/images/hero.png', alt: 'Research team in field', category: 'Research Fields', tall: false },
  { id: 11, src: '/images/variety-dharani.png', alt: 'Farmer success story', category: 'Farmers', tall: false },
  { id: 12, src: '/images/variety-annapurna.png', alt: 'Annual seed festival', category: 'Events', tall: true },
];

export function Gallery() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(headerRef, { once: true, margin: '-80px' });

  const filtered = activeCategory === 'All'
    ? galleryItems
    : galleryItems.filter(g => g.category === activeCategory);

  const openLightbox = (idx: number) => setLightboxIndex(idx);
  const closeLightbox = () => setLightboxIndex(null);
  const prevImage = () => setLightboxIndex(i => i !== null ? (i - 1 + filtered.length) % filtered.length : null);
  const nextImage = () => setLightboxIndex(i => i !== null ? (i + 1) % filtered.length : null);

  return (
    <section id="gallery" className="section-padding bg-rice-white overflow-hidden">
      <div className="section-container">
        {/* Header */}
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center max-w-3xl mx-auto mb-14"
        >
          <span className="label-text">Visual Story</span>
          <span className="gold-divider mx-auto mt-3 mb-6 block" />
          <h2 className="section-heading mb-5">
            Life at <span className="gradient-text">Sarvadharani</span>
          </h2>
          <p className="body-text text-lg">
            From laboratory to field, from seedling to harvest — a visual journey through our world.
          </p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {categories.map((cat) => (
            <motion.button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              className={`relative px-5 py-2.5 rounded-full font-jakarta text-sm font-semibold transition-all duration-300 ${
                activeCategory === cat
                  ? 'text-white'
                  : 'text-warm-gray bg-white border border-paddy-gold-100 hover:border-paddy-gold-300 hover:text-paddy-gold'
              }`}
              id={`gallery-filter-${cat.toLowerCase().replace(' ', '-')}`}
            >
              {activeCategory === cat && (
                <motion.div
                  layoutId="active-filter"
                  className="absolute inset-0 rounded-full"
                  style={{ background: 'linear-gradient(135deg, #C8981E, #E8BE24)' }}
                />
              )}
              <span className="relative z-10">{cat}</span>
            </motion.button>
          ))}
        </motion.div>

        {/* Masonry Grid */}
        <motion.div layout className="masonry-grid">
          <AnimatePresence>
            {filtered.map((item, i) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1], delay: i * 0.04 }}
                style={{ willChange: 'transform, opacity' }}
                className="masonry-item group relative rounded-2xl overflow-hidden cursor-pointer"
                onClick={() => openLightbox(i)}
                id={`gallery-item-${item.id}`}
              >
                <div className={`relative w-full ${item.tall ? 'h-72 md:h-96' : 'h-52 md:h-64'}`}>
                  <Image
                    src={item.src}
                    alt={item.alt}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    sizes="(max-width: 768px) 50vw, 25vw"
                  />
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-deep-forest/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  {/* Zoom icon */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                      <ZoomIn size={20} className="text-white" />
                    </div>
                  </div>

                  {/* Caption */}
                  <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                    <p className="font-inter text-xs text-white/90">{item.alt}</p>
                    <span className="font-inter text-[10px] text-paddy-gold font-semibold uppercase tracking-wide">
                      {item.category}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxIndex !== null && filtered[lightboxIndex] && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[150] bg-black/95 flex items-center justify-center"
            onClick={closeLightbox}
          >
            {/* Close */}
            <button
              onClick={closeLightbox}
              className="absolute top-6 right-6 w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors z-10"
              id="lightbox-close"
            >
              <X size={20} />
            </button>

            {/* Prev */}
            <button
              onClick={(e) => { e.stopPropagation(); prevImage(); }}
              className="absolute left-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors z-10"
              id="lightbox-prev"
            >
              <ChevronLeft size={24} />
            </button>

            {/* Image */}
            <motion.div
              key={lightboxIndex}
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.92, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="relative w-full max-w-4xl mx-16 aspect-[4/3] rounded-2xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={filtered[lightboxIndex].src}
                alt={filtered[lightboxIndex].alt}
                fill
                className="object-contain"
                sizes="90vw"
              />
            </motion.div>

            {/* Caption */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-center">
              <p className="font-inter text-sm text-white/80">{filtered[lightboxIndex].alt}</p>
              <span className="font-inter text-xs text-paddy-gold font-semibold">
                {lightboxIndex + 1} / {filtered.length}
              </span>
            </div>

            {/* Next */}
            <button
              onClick={(e) => { e.stopPropagation(); nextImage(); }}
              className="absolute right-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors z-10"
              id="lightbox-next"
            >
              <ChevronRight size={24} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
