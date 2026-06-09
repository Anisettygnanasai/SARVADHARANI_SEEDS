'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Microscope, FlaskConical, Sprout, ShieldCheck, Award, ArrowRight } from 'lucide-react';

const steps = [
  {
    icon: Microscope,
    title: 'Genetic Research',
    desc: 'Identification of superior genetic traits using advanced molecular markers and genomic sequencing for targeted trait improvement.',
    color: '#C8981E',
    bg: '#FDF8E7',
    stat: '500+',
    statLabel: 'Genetic Lines Studied',
  },
  {
    icon: FlaskConical,
    title: 'Laboratory Development',
    desc: 'Controlled hybridization and in-vitro selection under sterile laboratory conditions — combining modern breeding science with practical agronomy expertise.',
    color: '#3D6B4F',
    bg: '#EDF5F0',
    stat: '2+',
    statLabel: 'Seasons of Trials',
  },
  {
    icon: Sprout,
    title: 'Field Trials',
    desc: 'Multi-location, multi-season trials across AP agro-climatic zones to validate performance consistency and confirm superiority before farmer release.',
    color: '#6B4C2A',
    bg: '#F5EDE4',
    stat: '3+',
    statLabel: 'Trial Zones',
  },
  {
    icon: ShieldCheck,
    title: 'Quality Assurance',
    desc: 'Rigorous quality checks — germination rate, genetic purity, seed health, and physical parameters — certified to ICAR standards.',
    color: '#C8981E',
    bg: '#FDF8E7',
    stat: '99.5%',
    statLabel: 'Germination Rate',
  },
  {
    icon: Award,
    title: 'Certified Release',
    desc: 'Government notified and certified varieties released to farmers through authorized seed dealers with full technical support.',
    color: '#3D6B4F',
    bg: '#EDF5F0',
    stat: '100%',
    statLabel: 'Certified Seed',
  },
];

const researchHighlights = [
  { value: '2+', label: 'Seasons Tested', color: '#C8981E' },
  { value: '6+', label: 'Varieties Released', color: '#3D6B4F' },
  { value: '98%+', label: 'Germination Rate', color: '#6B4C2A' },
  { value: '3', label: 'States Covered', color: '#C8981E' },
];

export function Research() {
  const headerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(headerRef, { once: true, margin: '-80px' });

  return (
    <section id="research" className="section-padding overflow-hidden" style={{ background: 'linear-gradient(180deg, #FDFAF4 0%, #F5EDE4 100%)' }}>
      <div className="section-container">
        {/* Header */}
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center max-w-3xl mx-auto mb-20"
        >
          <span className="label-text">Science Behind the Seed</span>
          <span className="gold-divider mx-auto mt-3 mb-6 block" />
          <h2 className="section-heading mb-5">
            Research-First DNA.
            <br /><span className="gradient-text">From Day One.</span>
          </h2>
          <p className="body-text text-lg">
            Every variety we release has been tested for 2+ seasons across multiple locations before it reaches a single farmer&apos;s field. Science is not a marketing word here — it is our operating principle.
          </p>
        </motion.div>

        {/* Research Highlights */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {researchHighlights.map((h, i) => (
            <motion.div
              key={h.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="text-center p-6 rounded-2xl glass border border-paddy-gold-100"
            >
              <div
                className="font-cormorant text-4xl lg:text-5xl font-bold mb-2"
                style={{ color: h.color }}
              >
                {h.value}
              </div>
              <div className="font-inter text-sm text-warm-gray">{h.label}</div>
            </motion.div>
          ))}
        </div>

        {/* Process Steps */}
        <div className="relative">
          {/* Connector line on desktop */}
          <div className="hidden lg:block absolute top-12 left-0 right-0 h-0.5"
            style={{ background: 'linear-gradient(90deg, transparent, #C8981E 20%, #C8981E 80%, transparent)' }}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
            {steps.map((step, i) => (
              <ProcessStep key={step.title} step={step} index={i} />
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mt-20 rounded-3xl overflow-hidden"
          style={{ background: 'linear-gradient(135deg, #1A3526 0%, #3D6B4F 100%)' }}
        >
          <div className="p-10 lg:p-14 flex flex-col lg:flex-row items-center justify-between gap-8">
            <div>
              <h3 className="font-cormorant text-3xl lg:text-4xl font-bold text-white mb-3">
                Partner With Our Research Team
              </h3>
              <p className="font-inter text-white/70 text-base max-w-lg">
                Seed companies, agri-institutions, and progressive farmers — collaborate with our scientists for variety development and field validation.
              </p>
            </div>
            <motion.button
              whileHover={{ scale: 1.05, x: 4 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => { const el = document.querySelector('#contact'); el?.scrollIntoView({ behavior: 'smooth' }); }}
              className="flex items-center gap-3 px-8 py-4 rounded-full bg-paddy-gold text-white font-jakarta font-bold text-base flex-shrink-0 hover:bg-paddy-gold-400 transition-colors"
              id="research-cta"
            >
              Connect With Us
              <ArrowRight size={18} />
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function ProcessStep({ step, index }: { step: typeof steps[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-40px' });
  const Icon = step.icon;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.12, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className="relative flex flex-col items-center text-center group"
    >
      {/* Step Number + Icon */}
      <div className="relative mb-6 z-10">
        <motion.div
          className="w-24 h-24 rounded-full flex items-center justify-center shadow-card-hover"
          style={{ background: step.bg, border: `2px solid ${step.color}22` }}
          whileHover={{ scale: 1.1, rotate: 5 }}
          transition={{ type: 'spring', stiffness: 300 }}
        >
          <Icon size={36} style={{ color: step.color }} />
        </motion.div>
        <div
          className="absolute -top-2 -right-2 w-7 h-7 rounded-full flex items-center justify-center text-white text-xs font-bold font-jakarta"
          style={{ background: step.color }}
        >
          {index + 1}
        </div>
      </div>

      <h3 className="font-jakarta font-bold text-base text-deep-forest mb-2 group-hover:text-paddy-gold transition-colors">
        {step.title}
      </h3>
      <p className="font-inter text-xs text-warm-gray leading-relaxed mb-4">
        {step.desc}
      </p>
      <div className="mt-auto">
        <div className="font-cormorant text-2xl font-bold" style={{ color: step.color }}>
          {step.stat}
        </div>
        <div className="font-inter text-xs text-warm-gray">{step.statLabel}</div>
      </div>
    </motion.div>
  );
}
