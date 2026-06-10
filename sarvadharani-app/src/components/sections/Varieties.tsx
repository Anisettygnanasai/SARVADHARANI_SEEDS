'use client';

import { useState, useRef } from 'react';
import Image from 'next/image';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { X, ChevronRight, CheckCircle2, MapPin, Clock, Wheat, Shield } from 'lucide-react';
import { varieties, type RiceVariety } from '@/data/varieties';
import { useRouter } from 'next/navigation';
import { fadeUp, staggerContainer, modalVariants, backdropVariants } from '@/lib/animations';

function RadialProgress({ value, color }: { value: number; color: string }) {
  const r = 28;
  const circ = 2 * Math.PI * r;
  const offset = circ - (value / 100) * circ;
  return (
    <svg width="72" height="72" viewBox="0 0 72 72" className="-rotate-90">
      <circle cx="36" cy="36" r={r} fill="none" stroke="#F5EDE4" strokeWidth="5" />
      <motion.circle
        cx="36" cy="36" r={r} fill="none"
        stroke={color} strokeWidth="5"
        strokeLinecap="round"
        strokeDasharray={circ}
        initial={{ strokeDashoffset: circ }}
        animate={{ strokeDashoffset: offset }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
      />
    </svg>
  );
}

function VarietyCard({ variety }: { variety: RiceVariety }) {
  const router = useRouter();
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });
  const [hovered, setHovered] = useState(false);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientY - rect.top) / rect.height - 0.5) * 12;
    const y = -((e.clientX - rect.left) / rect.width - 0.5) * 12;
    setTilt({ x, y });
  };
  const resetTilt = () => setTilt({ x: 0, y: 0 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className="perspective-1000 cursor-pointer"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => { setHovered(false); resetTilt(); }}
      onMouseMove={handleMouseMove}
      onClick={() => router.push(`/products/${variety.id}`)}
      id={`variety-card-${variety.id}`}
    >
      <motion.div
        className="card-base overflow-hidden transform-style-3d"
        animate={{ rotateX: tilt.x, rotateY: tilt.y, scale: hovered ? 1.03 : 1 }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* Image */}
        <div className="relative h-32 md:h-56 overflow-hidden">
          <Image
            src={variety.image}
            alt={variety.name}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-110"
            style={{ transform: hovered ? 'scale(1.08)' : 'scale(1)', transition: 'transform 0.7s ease' }}
            sizes="(max-width: 768px) 100vw, 33vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

          {/* Badge */}
          {variety.badge && (
            <div
              className="absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-bold font-inter text-white"
              style={{ background: variety.available ? variety.color : '#6B4C2A' }}
            >
              {variety.badge}
            </div>
          )}

          {/* Shimmer on hover */}
          {hovered && (
            <motion.div
              initial={{ opacity: 0, x: '-100%' }}
              animate={{ opacity: 1, x: '200%' }}
              transition={{ duration: 0.7 }}
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12 pointer-events-none"
            />
          )}
        </div>

        {/* Content */}
        <div className="p-4 md:p-6">
          <h3
            className="font-cormorant text-xl md:text-2xl font-bold mb-0.5 md:mb-1 tracking-tight"
            style={{ color: variety.color }}
          >
            {variety.name}
          </h3>
          <p className="font-inter text-[10px] md:text-xs text-warm-gray mb-3 md:mb-4 italic">{variety.tagline}</p>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 gap-2 md:gap-3 mb-3 md:mb-5">
            <div className="flex items-center gap-2">
              <Clock size={13} className="text-paddy-gold flex-shrink-0" />
              <span className="font-inter text-[10px] md:text-xs text-deep-forest/70">{variety.duration}</span>
            </div>
            <div className="flex items-center gap-2">
              <Wheat size={13} className="text-natural-green flex-shrink-0" />
              <span className="font-inter text-[10px] md:text-xs text-deep-forest/70">{variety.yieldPotential}</span>
            </div>
            <div className="flex items-center gap-2">
              <Shield size={13} className="text-earth-brown flex-shrink-0" />
              <span className="font-inter text-[10px] md:text-xs text-deep-forest/70 truncate">{variety.grainType}</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin size={13} className="text-paddy-gold flex-shrink-0" />
              <span className="font-inter text-[10px] md:text-xs text-deep-forest/70 truncate">
                {variety.suitableRegions.length}+ Regions
              </span>
            </div>
          </div>

          {/* Explore CTA */}
          <motion.div
            className="flex items-center gap-2 font-jakarta text-sm font-semibold"
            style={{ color: variety.color }}
            animate={{ x: hovered ? 4 : 0 }}
            transition={{ duration: 0.2 }}
          >
            Explore Variety
            <ChevronRight size={16} />
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
}

function VarietyModal({ variety, onClose }: { variety: RiceVariety; onClose: () => void }) {
  const [activeTab, setActiveTab] = useState<'overview' | 'metrics' | 'benefits' | 'faq'>('overview');
  const tabs = ['overview', 'metrics', 'benefits', 'faq'] as const;

  return (
    <motion.div
      variants={backdropVariants}
      initial="hidden" animate="visible" exit="hidden"
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        variants={modalVariants}
        initial="hidden" animate="visible" exit="exit"
        className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-3xl bg-ivory shadow-premium"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header Image */}
        <div className="relative h-64 overflow-hidden rounded-t-3xl">
          <Image src={variety.image} alt={variety.name} fill className="object-cover" sizes="800px" />
          <div className="absolute inset-0 bg-gradient-to-t from-deep-forest/80 via-transparent to-transparent" />
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/40 transition-colors"
            id="modal-close"
          >
            <X size={18} />
          </button>
          <div className="absolute bottom-6 left-6">
            {variety.badge && (
              <span className="px-3 py-1 rounded-full text-xs font-bold text-white bg-paddy-gold mb-2 inline-block">
                {variety.badge}
              </span>
            )}
            <h2 className="font-cormorant text-4xl font-bold text-white">{variety.name}</h2>
            <p className="font-inter text-sm text-white/80 italic mt-1">{variety.tagline}</p>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-paddy-gold-100 px-6 pt-4 gap-1">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 text-sm font-semibold font-jakarta capitalize rounded-t-lg transition-colors ${
                activeTab === tab
                  ? 'text-paddy-gold border-b-2 border-paddy-gold -mb-px bg-paddy-gold-50'
                  : 'text-warm-gray hover:text-deep-forest'
              }`}
              id={`modal-tab-${tab}`}
            >
              {tab === 'faq' ? 'FAQ' : tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="p-6">
          <AnimatePresence mode="wait">
            {activeTab === 'overview' && (
              <motion.div key="overview" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <p className="body-text mb-6">{variety.longDescription}</p>
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { label: 'Duration', value: variety.duration },
                    { label: 'Yield Potential', value: variety.yieldPotential },
                    { label: 'Grain Type', value: variety.grainType },
                    { label: 'Disease Resistance', value: variety.diseaseResistance },
                  ].map((stat) => (
                    <div key={stat.label} className="p-4 rounded-xl bg-rice-white border border-paddy-gold-100">
                      <div className="label-text mb-1">{stat.label}</div>
                      <div className="font-jakarta font-bold text-deep-forest">{stat.value}</div>
                    </div>
                  ))}
                </div>
                <div className="mt-4 p-4 rounded-xl bg-natural-green-50 border border-natural-green-100">
                  <div className="label-text text-natural-green mb-2">Suitable Regions</div>
                  <div className="flex flex-wrap gap-2">
                    {variety.suitableRegions.map((r) => (
                      <span key={r} className="px-3 py-1 bg-white rounded-full text-xs font-medium font-inter text-natural-green-700 border border-natural-green-200">
                        {r}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
            {activeTab === 'metrics' && (
              <motion.div key="metrics" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <div className="grid grid-cols-2 gap-6 mb-6">
                  {[
                    { label: 'Yield', value: variety.stats.yield },
                    { label: 'Disease Resistance', value: variety.stats.diseaseResistance },
                    { label: 'Early Maturity', value: variety.stats.maturity },
                    { label: 'Grain Quality', value: variety.stats.quality },
                  ].map((stat) => (
                    <div key={stat.label} className="flex items-center gap-4 p-4 rounded-xl bg-rice-white">
                      <div className="relative flex items-center justify-center">
                        <RadialProgress value={stat.value} color="#C8981E" />
                        <span className="absolute font-bold text-sm text-deep-forest">{stat.value}</span>
                      </div>
                      <div>
                        <div className="font-jakarta font-semibold text-sm text-deep-forest">{stat.label}</div>
                        <div className="font-inter text-xs text-warm-gray">Score /100</div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="space-y-3">
                  {variety.performanceMetrics.map((m) => (
                    <div key={m.label} className="flex items-start gap-4 p-4 rounded-xl border border-paddy-gold-100 bg-rice-white">
                      <div className="flex-1">
                        <div className="label-text mb-0.5">{m.label}</div>
                        <div className="font-jakarta font-bold text-lg text-deep-forest">{m.value}</div>
                        <div className="font-inter text-xs text-warm-gray">{m.detail}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
            {activeTab === 'benefits' && (
              <motion.div key="benefits" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <h3 className="font-jakarta font-bold text-lg text-deep-forest mb-4">Key Benefits</h3>
                <div className="space-y-3 mb-6">
                  {variety.keyBenefits.map((b) => (
                    <div key={b} className="flex items-start gap-3 p-3 rounded-xl bg-natural-green-50 border border-natural-green-100">
                      <CheckCircle2 size={18} className="text-natural-green-500 flex-shrink-0 mt-0.5" />
                      <span className="font-inter text-sm text-deep-forest">{b}</span>
                    </div>
                  ))}
                </div>
                <h3 className="font-jakarta font-bold text-lg text-deep-forest mb-4">Farmer Benefits</h3>
                <div className="space-y-3">
                  {variety.farmerBenefits.map((b) => (
                    <div key={b} className="flex items-start gap-3 p-3 rounded-xl bg-paddy-gold-50 border border-paddy-gold-100">
                      <CheckCircle2 size={18} className="text-paddy-gold flex-shrink-0 mt-0.5" />
                      <span className="font-inter text-sm text-deep-forest">{b}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
            {activeTab === 'faq' && (
              <motion.div key="faq" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <div className="space-y-4">
                  {variety.faq.map((f, i) => (
                    <details key={i} className="group rounded-xl border border-paddy-gold-100 overflow-hidden">
                      <summary className="flex items-center justify-between p-4 cursor-pointer bg-rice-white hover:bg-paddy-gold-50 transition-colors font-jakarta font-semibold text-deep-forest">
                        {f.question}
                        <ChevronRight size={16} className="text-paddy-gold group-open:rotate-90 transition-transform" />
                      </summary>
                      <div className="p-4 border-t border-paddy-gold-100 body-text text-sm">
                        {f.answer}
                      </div>
                    </details>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </motion.div>
  );
}

export function Varieties() {
  const [selected, setSelected] = useState<RiceVariety | null>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const isHeaderInView = useInView(headerRef, { once: true, margin: '-80px' });

  return (
    <section id="varieties" className="section-padding bg-rice-white">
      <div className="section-container">
        {/* Header */}
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 40 }}
          animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="label-text">Our Portfolio</span>
          <span className="gold-divider mx-auto mt-3 mb-6 block" />
          <h2 className="section-heading mb-5">
            Rice Varieties Engineered<br />
            <span className="gradient-text">for Exceptional Harvests</span>
          </h2>
          <p className="body-text text-lg">
            Each variety is the result of years of scientific research, field trials, and farmer collaboration — crafted to maximize yield, quality, and resilience.
          </p>
        </motion.div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {varieties.map((v) => (
            <VarietyCard key={v.id} variety={v} />
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mt-14"
        >
          <p className="body-text mb-5">Interested in our upcoming varieties?</p>
          <button
            onClick={() => { const el = document.querySelector('#contact'); el?.scrollIntoView({ behavior: 'smooth' }); }}
            className="btn-primary"
            id="varieties-contact-cta"
          >
            <span>Register Your Interest</span>
          </button>
        </motion.div>
      </div>

      {/* Variety Modal */}
      <AnimatePresence>
        {selected && <VarietyModal variety={selected} onClose={() => setSelected(null)} />}
      </AnimatePresence>
    </section>
  );
}
