'use client';

import { useRef, useEffect, useState } from 'react';
import { motion, useInView } from 'framer-motion';

const stats = [
  { value: 9,   suffix: '+',   label: 'Reliable Varieties',    desc: 'High-yielding and scientifically processed',   color: '#C8981E' },
  { value: 100,  suffix: '%',  label: 'Quality Focus',       desc: 'Rigorous processing and quality control',       color: '#3D6B4F' },
  { value: 100, suffix: '%',   label: 'Farmer-Centric',        desc: 'Solutions focused on farmer success',           color: '#C8981E' },
  { value: 100,   suffix: '%',    label: 'Scientific',          desc: 'Processing and agricultural standards',          color: '#3D6B4F' },
];

function CountUp({ target, suffix, color, isTriggered }: {
  target: number;
  suffix: string;
  color: string;
  isTriggered: boolean;
}) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isTriggered) return;
    let startTime: number | null = null;
    const duration = 2000;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(animate);
      else setCount(target);
    };

    requestAnimationFrame(animate);
  }, [isTriggered, target]);

  return (
    <span style={{ color }}>
      {count.toLocaleString()}{suffix}
    </span>
  );
}

export function ImpactNumbers() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section
      id="impact"
      className="relative section-padding overflow-hidden"
      style={{ background: 'linear-gradient(135deg, #1A3526 0%, #2E5340 50%, #1A3526 100%)' }}
    >
      {/* Decorative elements */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        {/* Gold orbs */}
        <motion.div
          className="absolute top-0 right-0 w-96 h-96 rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(200,152,30,0.15) 0%, transparent 70%)' }}
          animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute bottom-0 left-0 w-80 h-80 rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(200,152,30,0.1) 0%, transparent 70%)' }}
          animate={{ scale: [1.2, 1, 1.2], opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
        />

        {/* Grain pattern overlay */}
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: 'repeating-linear-gradient(45deg, #C8981E 0px, #C8981E 1px, transparent 1px, transparent 30px), repeating-linear-gradient(-45deg, #C8981E 0px, #C8981E 1px, transparent 1px, transparent 30px)',
          }}
        />
      </div>

      <div className="section-container relative z-10" ref={ref}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center max-w-2xl mx-auto mb-20"
        >
          <span className="label-text text-paddy-gold-300">Our Impact</span>
          <span className="mx-auto mt-3 mb-6 block w-12 h-0.5 bg-paddy-gold" />
          <h2 className="section-heading text-white mb-4">
            Every Number is a<br />
            <span style={{ color: '#E8BE24' }}>Farmer&apos;s Story</span>
          </h2>
          <p className="font-inter text-white/60 text-lg">
            Born in 2024 with a clear mission — every metric we track points to farmer prosperity.
          </p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{ delay: i * 0.15, duration: 0.8, ease: [0.34, 1.56, 0.64, 1] }}
              className="text-center group"
            >
              <motion.div
                className="relative inline-block p-8 rounded-3xl"
                style={{
                  background: 'rgba(255,255,255,0.05)',
                  border: `1px solid ${stat.color}30`,
                  backdropFilter: 'blur(10px)',
                }}
                whileHover={{
                  scale: 1.06,
                  borderColor: `${stat.color}80`,
                  background: 'rgba(255,255,255,0.08)',
                }}
                transition={{ duration: 0.3 }}
              >
                {/* Glow ring on hover */}
                <div
                  className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{ boxShadow: `0 0 40px ${stat.color}30` }}
                />

                <div className="stat-number text-5xl lg:text-6xl mb-3 relative z-10">
                  <CountUp
                    target={stat.value}
                    suffix={stat.suffix}
                    color={stat.color}
                    isTriggered={isInView}
                  />
                </div>
                <div className="font-jakarta font-bold text-white text-lg mb-1">
                  {stat.label}
                </div>
                <div className="font-inter text-white/50 text-sm">{stat.desc}</div>
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Quote */}
        <motion.blockquote
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.8, duration: 1 }}
          className="text-center mt-20 max-w-2xl mx-auto"
        >
          <p className="font-cormorant text-2xl lg:text-3xl italic text-white/80 leading-relaxed">
            &ldquo;We believe that quality seeds are the foundation of successful farming, and we strive to support farmers with products they can trust. We are working towards building a stronger agricultural future by delivering excellence, innovation, and value.&rdquo;
          </p>
          <footer className="mt-4 font-inter text-sm text-paddy-gold-300">
            — INKULU BALAJI, Managing Partner, Sarvadharani Seeds
          </footer>
        </motion.blockquote>
      </div>
    </section>
  );
}
