'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Droplets, Sprout, Leaf, GraduationCap } from 'lucide-react';

const topics = [
  {
    icon: Droplets,
    title: 'Water Conservation',
    desc: 'Our varieties require up to 30% less irrigation water through deeper root systems and efficient water-use genetics. This conserves precious groundwater resources and reduces energy costs for farmers.',
    metric: '30%',
    metricLabel: 'Less water required',
    color: '#3D6B4F',
    bg: 'linear-gradient(135deg, #EDF5F0, #D5E9DC)',
    accent: '#3D6B4F',
    decoration: (
      <svg className="absolute bottom-0 right-0 opacity-10 w-32 h-32" viewBox="0 0 100 100">
        <circle cx="50" cy="80" r="40" fill="#3D6B4F"/>
        <ellipse cx="50" cy="40" rx="12" ry="30" fill="#3D6B4F"/>
      </svg>
    ),
  },
  {
    icon: Sprout,
    title: 'Seed Innovation',
    desc: 'By packing more genetic potential into every seed, we help farmers produce more food per unit of land — reducing agricultural expansion pressure on natural ecosystems and forests.',
    metric: '40%',
    metricLabel: 'Higher yield density',
    color: '#C8981E',
    bg: 'linear-gradient(135deg, #FDF8E7, #FAF0C3)',
    accent: '#C8981E',
    decoration: (
      <svg className="absolute bottom-0 right-0 opacity-10 w-32 h-32" viewBox="0 0 100 100">
        <ellipse cx="50" cy="70" rx="8" ry="25" fill="#C8981E"/>
        <circle cx="50" cy="35" r="20" fill="#C8981E"/>
      </svg>
    ),
  },
  {
    icon: Leaf,
    title: 'Soil Health',
    desc: 'Our compact-root varieties reduce soil compaction. Combined with our farmer training on minimum tillage practices, Sarvadharani farmers build healthier, more productive soils over time.',
    metric: '25%',
    metricLabel: 'Improvement in soil OC',
    color: '#6B4C2A',
    bg: 'linear-gradient(135deg, #F5EDE4, #E8D5C2)',
    accent: '#6B4C2A',
    decoration: (
      <svg className="absolute bottom-0 right-0 opacity-10 w-32 h-32" viewBox="0 0 100 100">
        <rect x="10" y="60" width="80" height="30" rx="4" fill="#6B4C2A"/>
        <path d="M20 60 Q30 20 50 30 Q70 40 80 60Z" fill="#6B4C2A"/>
      </svg>
    ),
  },
  {
    icon: GraduationCap,
    title: 'Farmer Education',
    desc: 'Through our growing farmer education initiative, we run field demonstration days, variety trials, and direct agronomy advisory sessions for our partner farmers across Andhra Pradesh.',
    metric: 'Free',
    metricLabel: 'Advisory for all partner farmers',
    color: '#3D6B4F',
    bg: 'linear-gradient(135deg, #EDF5F0, #D5E9DC)',
    accent: '#3D6B4F',
    decoration: (
      <svg className="absolute bottom-0 right-0 opacity-10 w-32 h-32" viewBox="0 0 100 100">
        <polygon points="50,10 90,80 10,80" fill="#3D6B4F"/>
      </svg>
    ),
  },
];

export function Sustainability() {
  const headerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(headerRef, { once: true, margin: '-80px' });

  return (
    <section id="sustainability" className="section-padding overflow-hidden" style={{ background: '#FDFAF4' }}>
      <div className="section-container">
        {/* Header */}
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center max-w-3xl mx-auto mb-20"
        >
          <span className="label-text">Our Commitment</span>
          <span className="gold-divider mx-auto mt-3 mb-6 block" />
          <h2 className="section-heading mb-5">
            Farming That Nourishes<br />
            <span className="gradient-text">the Earth as It Feeds the World</span>
          </h2>
          <p className="body-text text-lg">
            True agricultural progress means leaving the land better than we found it. Every Sarvadharani variety is designed with ecological responsibility at its core.
          </p>
        </motion.div>

        {/* Topics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {topics.map((topic, i) => (
            <SustainabilityCard key={topic.title} topic={topic} index={i} />
          ))}
        </div>

        {/* Bottom pledge */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mt-20 text-center max-w-2xl mx-auto"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-natural-green-50 border border-natural-green-200 mb-6">
            <Leaf size={14} className="text-natural-green" />
            <span className="font-inter text-sm font-semibold text-natural-green">
              Committed to Carbon-Neutral Seed Production by 2030
            </span>
          </div>
          <p className="body-text">
            We are actively working toward carbon-neutral operations across our seed processing and R&D facilities. Our sustainability roadmap includes renewable energy adoption, packaging reduction, and farmer carbon sequestration programs.
          </p>
        </motion.div>
      </div>
    </section>
  );
}

function SustainabilityCard({ topic, index }: { topic: typeof topics[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });
  const Icon = topic.icon;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="relative overflow-hidden rounded-3xl p-8 group"
      style={{ background: topic.bg }}
    >
      {/* SVG Decoration */}
      {topic.decoration}

      {/* Icon */}
      <motion.div
        className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6 bg-white/60 backdrop-blur-sm"
        whileHover={{ rotate: 10, scale: 1.1 }}
        transition={{ type: 'spring', stiffness: 300 }}
      >
        <Icon size={28} style={{ color: topic.color }} />
      </motion.div>

      {/* Metric */}
      <div className="mb-4">
        <span className="font-cormorant text-5xl font-bold" style={{ color: topic.color }}>
          {topic.metric}
        </span>
        <p className="font-inter text-xs font-semibold text-warm-gray uppercase tracking-wide mt-1">
          {topic.metricLabel}
        </p>
      </div>

      <h3 className="font-jakarta font-bold text-xl text-deep-forest mb-3 group-hover:text-paddy-gold transition-colors">
        {topic.title}
      </h3>
      <p className="font-inter text-sm text-warm-gray leading-relaxed relative z-10">
        {topic.desc}
      </p>

      {/* Bottom accent bar */}
      <motion.div
        className="absolute bottom-0 left-0 h-1 rounded-b-3xl"
        style={{ background: topic.accent }}
        initial={{ width: 0 }}
        animate={isInView ? { width: '100%' } : {}}
        transition={{ delay: index * 0.1 + 0.4, duration: 1, ease: [0.16, 1, 0.3, 1] }}
      />
    </motion.div>
  );
}
