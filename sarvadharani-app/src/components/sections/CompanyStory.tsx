'use client';

import { useRef, useState, useEffect } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { timeline, TimelineMilestone } from '@/data/timeline';
import { fadeUp, staggerContainer } from '@/lib/animations';
import { X } from 'lucide-react';

export function CompanyStory() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [selectedTimelineItem, setSelectedTimelineItem] = useState<TimelineMilestone | null>(null);

  return (
    <section id="story" className="section-padding bg-ivory overflow-hidden">
      <div className="section-container">
        {/* Section Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center max-w-3xl mx-auto mb-20"
        >
          <span className="label-text">Our Journey</span>
          <span className="gold-divider mx-auto mt-3 mb-6 block" />
          <h2 className="section-heading mb-5">
            From a Bold Vision to<br />
            <span className="gradient-text">500+ Farmer Partnerships</span>
          </h2>
          <p className="body-text text-lg">
            Sarvadharani Seeds is a dedicated seed processing and marketing company committed to providing high-quality agricultural seeds to farmers. Our mission is to empower farming communities with reliable, high-yielding, and scientifically processed seeds that contribute to better productivity and sustainable agriculture.
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line for desktop */}
          <div
            className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2"
            style={{ background: 'linear-gradient(180deg, transparent, #C8981E 10%, #C8981E 90%, transparent)' }}
          />

          <div className="hidden lg:block space-y-0">
            {timeline.map((item, i) => (
              <TimelineCard key={`timeline-${i}`} item={item} index={i} />
            ))}
          </div>

          {/* Mobile Timeline */}
          <div className="lg:hidden mt-8 border-l border-paddy-gold-200 ml-4 pl-0 space-y-0">
            {timeline.map((item, i) => (
              <button 
                key={`mobile-tl-${i}`} 
                onClick={() => setSelectedTimelineItem(item)}
                className="w-full text-left relative active:bg-paddy-gold-50 transition-colors h-[76px] flex items-center group"
              >
                <div className="absolute -left-[5px] top-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full bg-paddy-gold" />
                <div className="pl-6">
                  <div className="font-cormorant text-paddy-gold font-bold text-sm mb-0.5">{item.year}</div>
                  <h3 className="font-jakarta text-[15px] font-bold text-deep-forest leading-tight pr-4">{item.title}</h3>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      <AnimatePresence>
        {selectedTimelineItem && (
          <TimelineBottomSheet 
            item={selectedTimelineItem} 
            onClose={() => setSelectedTimelineItem(null)} 
          />
        )}
      </AnimatePresence>
    </section>
  );
}

function TimelineBottomSheet({ item, onClose }: { item: TimelineMilestone, onClose: () => void }) {
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = 'unset'; };
  }, []);

  return (
    <motion.div 
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="fixed inset-0 z-[200] bg-black/60 lg:hidden"
      onClick={onClose}
    >
      <motion.div
        initial={{ y: '100%' }} animate={{ y: 0 }} exit={{ y: '100%' }}
        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
        className="absolute bottom-0 left-0 right-0 bg-ivory rounded-t-[20px] p-6 pb-10 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="w-12 h-1 bg-paddy-gold-200 rounded-full mx-auto mb-6" />
        <div className="flex justify-between items-start mb-4">
          <div className="pr-4">
            <span className="font-cormorant text-paddy-gold font-bold text-lg">{item.year}</span>
            <h3 className="font-jakarta text-xl font-bold text-deep-forest mt-1">{item.title}</h3>
          </div>
          <button onClick={onClose} className="p-2 -mr-2 bg-white rounded-full text-deep-forest flex-shrink-0 shadow-sm border border-paddy-gold-100">
            <X size={20} />
          </button>
        </div>
        <p className="font-inter text-warm-gray text-sm leading-relaxed mb-4">
          {item.description}
        </p>
        <div className="inline-flex items-center gap-2 p-3 rounded-xl bg-paddy-gold-50 border border-paddy-gold-100">
          <span className="font-inter text-xs font-semibold text-paddy-gold-600">
            {item.highlight}
          </span>
        </div>
      </motion.div>
    </motion.div>
  );
}

function TimelineCard({
  item,
  index,
}: {
  item: (typeof timeline)[0];
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  const isEven = index % 2 === 0;
  const isFuture = item.isFuture;

  return (
    <div
      ref={ref}
      className={`relative flex flex-col lg:flex-row lg:items-center gap-8 lg:gap-0 mb-12 lg:mb-20 ${
        isEven ? '' : 'lg:flex-row-reverse'
      }`}
    >
      {/* Content Card */}
      <motion.div
        initial={{ opacity: 0, x: isEven ? -60 : 60 }}
        animate={isInView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
        className={`lg:w-[46%] ${isEven ? 'lg:pr-16' : 'lg:pl-16'}`}
      >
        <div
          className={`p-8 group transition-shadow duration-500 rounded-3xl ${
            isFuture
              ? 'border-2 border-dashed border-paddy-gold-200 bg-ivory/80'
              : 'card-base hover:shadow-card-hover'
          }`}
        >
          {/* Icon */}
          <div className="text-4xl mb-4">{item.icon}</div>

          {/* Year Badge */}
          <div className="flex items-center gap-2 mb-4">
            <div
              className={`inline-block px-3 py-1 rounded-full text-xs font-semibold font-inter tracking-wider border ${
                isFuture
                  ? 'bg-transparent text-warm-gray border-paddy-gold-200 italic'
                  : 'bg-paddy-gold-50 text-paddy-gold border-paddy-gold-200'
              }`}
            >
              {item.year}
            </div>
            {isFuture && (
              <div className="inline-block px-2 py-0.5 rounded-full text-xs font-bold font-inter tracking-wider bg-paddy-gold text-white">
                Our Vision
              </div>
            )}
          </div>

          <h3 className="font-jakarta text-xl font-bold text-deep-forest mb-3 group-hover:text-paddy-gold-600 transition-colors">
            {item.title}
          </h3>
          <p className="body-text mb-5 text-sm">{item.description}</p>

          {/* Highlight */}
          <div
            className={`flex items-center gap-3 p-3 rounded-xl border ${
              isFuture
                ? 'bg-paddy-gold-50 border-paddy-gold-200'
                : 'bg-natural-green-50 border-natural-green-100'
            }`}
          >
            <span
              className="flex-shrink-0 w-1.5 h-10 rounded-full"
              style={{ background: isFuture ? '#C8981E' : '#3D6B4F' }}
            />
            <p
              className={`font-inter text-sm font-semibold ${
                isFuture ? 'text-paddy-gold-600' : 'text-natural-green-700'
              }`}
            >
              {item.highlight}
            </p>
          </div>
        </div>
      </motion.div>

      {/* Center Dot */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={isInView ? { scale: 1, opacity: 1 } : {}}
        transition={{ duration: 0.5, ease: [0.34, 1.56, 0.64, 1], delay: 0.2 }}
        className="hidden lg:flex absolute left-1/2 -translate-x-1/2 w-14 h-14 rounded-full items-center justify-center z-10"
        style={{
          background: isFuture ? '#FDF8E7' : 'white',
          boxShadow: isFuture
            ? '0 0 0 4px #E8BE24, 0 8px 24px rgba(200,152,30,0.2)'
            : '0 0 0 4px #C8981E, 0 8px 24px rgba(200,152,30,0.3)',
        }}
      >
        <span className="font-cormorant text-xs font-bold text-paddy-gold leading-none text-center">
          {item.year.slice(0, 4).slice(2)}
        </span>
      </motion.div>

      {/* Empty space on other side */}
      <div className="hidden lg:block lg:w-[46%]" />
    </div>
  );
}



