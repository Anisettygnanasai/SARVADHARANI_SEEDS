'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { GraduationCap, Briefcase } from 'lucide-react';

const founders = [
  {
    id: 'partner-balaji',
    name: 'INKULU BALAJI',
    role: 'Managing Partner',
    bio: 'Agriculture entrepreneur committed to advancing seed quality, farmer support, and sustainable agricultural development.',
    expertise: 'Seed Quality & Farmer Support',
    icon: '🌾',
    initials: 'IB',
    gradient: 'linear-gradient(135deg, #3D6B4F 0%, #52A370 100%)',
    phone: '+919381027593',
  },
  {
    id: 'partner-yogesh',
    name: 'JADDI YOGESH',
    role: 'Managing Partner',
    bio: 'Focused on seed marketing, operational excellence, and delivering trusted agricultural solutions to farming communities.',
    expertise: 'Seed Marketing & Operations',
    icon: '📊',
    initials: 'JY',
    gradient: 'linear-gradient(135deg, #C8981E 0%, #E8BE24 100%)',
    phone: '+918209574729',
  },
  {
    id: 'partner-akhil',
    name: 'VUDAMALA AKHIL',
    role: 'Managing Partner',
    bio: 'Dedicated to expanding agricultural innovation and strengthening farmer relationships through quality seed programs.',
    expertise: 'Agricultural Innovation',
    icon: '🤝',
    initials: 'VA',
    gradient: 'linear-gradient(135deg, #6B4C2A 0%, #9A6E40 100%)',
    phone: '+917288950911',
  },
];

export function OurFounders() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="founders" className="section-padding" style={{ background: 'linear-gradient(180deg, #F9F6EE 0%, #FDFAF4 100%)' }}>
      <div className="section-container">
        {/* Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="label-text">The Leadership</span>
          <span className="gold-divider mx-auto mt-3 mb-6 block" />
          <h2 className="section-heading mb-5">
            Meet Our <span className="gradient-text">Managing Partners</span>
          </h2>
          <p className="body-text text-lg">
            A dedicated team united by a single mission — to put the best quality seeds in every farmer&apos;s hands across India.
          </p>
        </motion.div>

        {/* Founders Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {founders.map((founder, i) => (
            <motion.div
              key={founder.id}
              id={founder.id}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: i * 0.15 }}
              className="group"
            >
              <div
                className="relative rounded-3xl overflow-hidden border border-paddy-gold-100 hover:border-paddy-gold-300 transition-all duration-500 hover:shadow-[0_24px_60px_rgba(107,76,42,0.15)]"
                style={{ background: '#F9F6EE' }}
              >
                {/* Top accent bar */}
                <div
                  className="h-2 w-full"
                  style={{ background: founder.gradient }}
                />

                <div className="p-8">
                  {/* Avatar */}
                  <div className="flex items-start justify-between mb-6">
                    <div
                      className="w-20 h-20 rounded-2xl flex items-center justify-center text-white font-cormorant text-3xl font-bold shadow-lg"
                      style={{ background: founder.gradient }}
                    >
                      {founder.initials}
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      <div
                        className="w-10 h-10 rounded-full flex items-center justify-center text-xl"
                        style={{ background: 'rgba(200,152,30,0.1)' }}
                      >
                        {founder.icon}
                      </div>
                      <a
                        href={`tel:${founder.phone}`}
                        aria-label={`Call ${founder.name}`}
                        className="w-8 h-8 rounded-full bg-natural-green flex items-center justify-center text-white hover:scale-110 transition-transform duration-200"
                      >
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                        </svg>
                      </a>
                    </div>
                  </div>

                  {/* Info */}
                  <h3 className="font-jakarta text-xl font-bold text-deep-forest mb-1 group-hover:text-paddy-gold-600 transition-colors duration-300">
                    {founder.name}
                  </h3>
                  <p className="font-inter text-sm font-semibold text-paddy-gold mb-4 tracking-wide">
                    {founder.role}
                  </p>

                  <p className="font-inter text-sm text-warm-gray leading-relaxed mb-5">
                    {founder.bio}
                  </p>

                  {/* Expertise badge */}
                  <div className="flex items-center gap-2 p-3 rounded-xl" style={{ background: 'rgba(200,152,30,0.06)', border: '1px solid rgba(200,152,30,0.15)' }}>
                    <GraduationCap size={14} className="text-paddy-gold flex-shrink-0" />
                    <span className="font-inter text-xs font-semibold text-paddy-gold-600">{founder.expertise}</span>
                  </div>
                </div>

                {/* Bottom hover glow */}
                <div
                  className="absolute bottom-0 left-0 right-0 h-1 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{ background: founder.gradient }}
                />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Founding story callout */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-16 text-center p-8 rounded-3xl border border-paddy-gold-200"
          style={{ background: 'linear-gradient(135deg, rgba(200,152,30,0.05), rgba(61,107,79,0.05))' }}
        >
          <div className="flex justify-center gap-3 mb-4">
            <Briefcase size={20} className="text-paddy-gold" />
          </div>
          <p className="font-cormorant text-2xl font-bold text-deep-forest mb-2">
            Founded in February 2024
          </p>
          <p className="body-text max-w-2xl mx-auto">
            Agricultural professionals from Rayagada, Odisha, joined forces to revolutionize seed production — combining science, field expertise, and an unmatched passion for farmers.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
