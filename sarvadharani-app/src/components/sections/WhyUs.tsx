'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { TrendingUp, Shield, FlaskConical, CheckCircle2, Users, Leaf, Zap } from 'lucide-react';

const advantages = [
  {
    icon: TrendingUp,
    title: 'Higher Yield',
    desc: 'Our varieties consistently deliver 40–90% higher yield than traditional seeds through advanced genetic optimization.',
    stat: '85%',
    statDesc: 'Average yield improvement',
    color: '#C8981E',
    bg: '#FDF8E7',
  },
  {
    icon: Shield,
    title: 'Disease Resistance',
    desc: 'Built-in resistance to blast, BLB, and sheath blight — reducing pesticide costs by up to 60% per season.',
    stat: '60%',
    statDesc: 'Reduction in pesticide cost',
    color: '#3D6B4F',
    bg: '#EDF5F0',
  },
  {
    icon: FlaskConical,
    title: 'Research-First DNA',
    desc: 'We do not release a variety until it has passed 2+ seasons of field trials. Every seed in our portfolio is proven before it reaches your field.',
    stat: '2+',
    statDesc: 'Seasons of trials before release',
    color: '#6B4C2A',
    bg: '#F5EDE4',
  },
  {
    icon: CheckCircle2,
    title: 'Field Tested',
    desc: 'Multi-location, multi-season trials across 8 agro-climatic zones ensure consistent performance under real field conditions.',
    stat: '50+',
    statDesc: 'Trial locations nationwide',
    color: '#C8981E',
    bg: '#FDF8E7',
  },
  {
    icon: Users,
    title: 'Farmer Trusted',
    desc: '500+ farmer partners rely on Sarvadharani Seeds. Every farmer who tries us and returns the next season is our most powerful endorsement.',
    stat: '500+',
    statDesc: 'Active farmer partners in AP',
    color: '#3D6B4F',
    bg: '#EDF5F0',
  },
  {
    icon: Leaf,
    title: 'Sustainable Farming',
    desc: 'Our varieties are designed for lower input requirements — less water, fewer pesticides, healthier soil over time.',
    stat: '30%',
    statDesc: 'Lower water requirement',
    color: '#6B4C2A',
    bg: '#F5EDE4',
  },
];

const comparison = [
  { label: 'Yield Improvement', sarvadharani: 90, traditional: 0 },
  { label: 'Disease Resistance', sarvadharani: 88, traditional: 35 },
  { label: 'Milling Recovery', sarvadharani: 85, traditional: 55 },
  { label: 'Farmer Support', sarvadharani: 100, traditional: 10 },
  { label: 'Grain Quality Score', sarvadharani: 92, traditional: 60 },
];

export function WhyUs() {
  const headerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(headerRef, { once: true, margin: '-80px' });

  return (
    <section id="why-us" className="section-padding bg-rice-white">
      <div className="section-container">
        {/* Header */}
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center max-w-3xl mx-auto mb-20"
        >
          <span className="label-text">The Sarvadharani Advantage</span>
          <span className="gold-divider mx-auto mt-3 mb-6 block" />
          <h2 className="section-heading mb-5">
            Why <span className="gradient-text">500+ Farmers</span><br />
            Choose Sarvadharani Seeds
          </h2>
          <p className="body-text text-lg">
            It&apos;s not just seeds — it&apos;s a complete ecosystem of research, support, and farmer success that sets us apart.
          </p>
        </motion.div>

        {/* Advantages Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-24">
          {advantages.map((adv, i) => (
            <AdvantageCard key={adv.title} adv={adv} index={i} />
          ))}
        </div>

        {/* Comparison Chart */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl mx-auto"
        >
          <div className="text-center mb-12">
            <span className="label-text">Head to Head</span>
            <h3 className="section-heading mt-3 text-3xl">
              Sarvadharani vs Traditional Varieties
            </h3>
          </div>

          <div className="space-y-6">
            {comparison.map((item, i) => (
              <ComparisonBar key={item.label} item={item} index={i} />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function AdvantageCard({ adv, index }: { adv: typeof advantages[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-40px' });
  const Icon = adv.icon;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.08, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className="card-base p-7 group hover:shadow-card-hover"
    >
      <motion.div
        className="w-14 h-14 rounded-2xl flex items-center justify-center mb-5"
        style={{ background: adv.bg }}
        whileHover={{ rotate: 8, scale: 1.1 }}
        transition={{ type: 'spring', stiffness: 300 }}
      >
        <Icon size={26} style={{ color: adv.color }} />
      </motion.div>

      <h3 className="font-jakarta font-bold text-lg text-deep-forest mb-2 group-hover:text-paddy-gold transition-colors">
        {adv.title}
      </h3>
      <p className="body-text text-sm mb-5">{adv.desc}</p>

      <div className="pt-4 border-t border-paddy-gold-100">
        <span className="font-cormorant text-3xl font-bold" style={{ color: adv.color }}>
          {adv.stat}
        </span>
        <p className="font-inter text-xs text-warm-gray mt-0.5">{adv.statDesc}</p>
      </div>
    </motion.div>
  );
}

function ComparisonBar({ item, index }: { item: typeof comparison[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -30 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ delay: index * 0.1, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className="group"
    >
      <div className="flex items-center justify-between mb-2">
        <span className="font-jakarta font-semibold text-sm text-deep-forest">{item.label}</span>
        <div className="flex items-center gap-4 text-xs font-inter">
          <span className="flex items-center gap-1 text-paddy-gold font-bold">
            <Zap size={11} /> {item.sarvadharani}%
          </span>
          <span className="text-warm-gray">{item.traditional}%</span>
        </div>
      </div>
      <div className="relative h-3 bg-earth-brown-100 rounded-full overflow-hidden">
        {/* Traditional bar */}
        <motion.div
          className="absolute inset-y-0 left-0 rounded-full opacity-30"
          style={{ background: '#8A8070' }}
          initial={{ width: 0 }}
          animate={isInView ? { width: `${item.traditional}%` } : {}}
          transition={{ delay: index * 0.1 + 0.2, duration: 1, ease: [0.16, 1, 0.3, 1] }}
        />
        {/* Sarvadharani bar */}
        <motion.div
          className="absolute inset-y-0 left-0 rounded-full"
          style={{ background: 'linear-gradient(90deg, #C8981E, #E8BE24)' }}
          initial={{ width: 0 }}
          animate={isInView ? { width: `${item.sarvadharani}%` } : {}}
          transition={{ delay: index * 0.1 + 0.4, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        />
      </div>
      <div className="flex justify-between mt-1">
        <span className="font-inter text-[10px] text-paddy-gold font-semibold">Sarvadharani</span>
        <span className="font-inter text-[10px] text-warm-gray">Traditional</span>
      </div>
    </motion.div>
  );
}
