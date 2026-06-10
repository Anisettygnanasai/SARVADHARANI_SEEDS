'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { timeline } from '@/data/timeline';
import { fadeUp, staggerContainer } from '@/lib/animations';

export function CompanyStory() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

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
          {/* Vertical line */}
          <div
            className="absolute left-4 lg:left-1/2 top-0 bottom-0 w-px lg:-translate-x-1/2"
            style={{ background: 'linear-gradient(180deg, transparent, #C8981E 10%, #C8981E 90%, transparent)' }}
          />

          <div className="space-y-8 lg:space-y-0">
            {timeline.map((item, i) => (
              <TimelineCard key={`timeline-${i}`} item={item} index={i} />
            ))}
          </div>

        </div>
      </div>
    </section>
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
        className={`w-full lg:w-[46%] pl-10 lg:pl-0 ${isEven ? 'lg:pr-16' : 'lg:pl-16'}`}
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
        className="flex absolute left-4 lg:left-1/2 -translate-x-1/2 top-8 lg:top-auto w-8 h-8 lg:w-14 lg:h-14 rounded-full items-center justify-center z-10"
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



