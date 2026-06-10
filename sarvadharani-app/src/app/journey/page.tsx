'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { timeline } from '@/data/timeline';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { ChevronDown } from 'lucide-react';
import Link from 'next/link';

export default function JourneyPage() {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const toggleExpand = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <main className="min-h-screen bg-ivory">
      <Navbar />
      
      <section className="pt-32 pb-20 px-4 md:px-8 max-w-3xl mx-auto">
        <div className="mb-12 text-center">
          <h1 className="font-cormorant text-4xl md:text-5xl font-bold text-deep-forest mb-4">Our Journey</h1>
          <p className="font-inter text-warm-gray">The story of Sarvadharani Seeds</p>
        </div>

        <div className="relative">
          {/* Vertical Center Line */}
          <div className="absolute left-[15px] md:left-1/2 top-0 bottom-0 w-0.5 bg-paddy-gold-200 md:-translate-x-1/2" />

          <div className="space-y-6">
            {timeline.map((item, i) => {
              const isExpanded = expandedIndex === i;
              const isEven = i % 2 === 0;

              return (
                <div key={i} className={`relative flex flex-col md:flex-row ${isEven ? 'md:flex-row-reverse' : ''} md:items-center`}>
                  
                  {/* Timeline Dot */}
                  <div className="absolute left-[11px] md:left-1/2 top-6 w-2.5 h-2.5 rounded-full bg-paddy-gold md:-translate-x-1/2 z-10 ring-4 ring-ivory" />

                  <div className={`ml-10 md:ml-0 md:w-1/2 ${isEven ? 'md:pl-8' : 'md:pr-8 text-left md:text-right'}`}>
                    <button 
                      onClick={() => toggleExpand(i)}
                      className="w-full text-left bg-white rounded-2xl p-5 shadow-sm border border-paddy-gold-100 hover:shadow-md transition-shadow active:scale-[0.98] transform relative overflow-hidden"
                    >
                      <div className={`flex items-center justify-between gap-4 ${isEven ? '' : 'md:flex-row-reverse'}`}>
                        <div>
                          <span className="font-cormorant text-paddy-gold font-bold text-lg">{item.year}</span>
                          <h3 className="font-jakarta text-deep-forest font-bold text-lg mt-1">{item.title}</h3>
                        </div>
                        <ChevronDown 
                          size={20} 
                          className={`text-paddy-gold transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`}
                        />
                      </div>

                      <AnimatePresence>
                        {isExpanded && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="overflow-hidden"
                          >
                            <div className="pt-4 mt-4 border-t border-paddy-gold-100">
                              <div className="text-3xl mb-3 text-left md:text-center">{item.icon}</div>
                              <p className="font-inter text-sm text-deep-forest/80 leading-relaxed text-left">
                                {item.description}
                              </p>
                              <div className="mt-4 p-3 rounded-xl bg-paddy-gold-50 border border-paddy-gold-100 inline-block">
                                <span className="font-inter text-xs font-semibold text-paddy-gold-600">
                                  {item.highlight}
                                </span>
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="mt-16 text-center">
          <Link href="/" className="btn-primary inline-flex">
            <span>Back to Home</span>
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  );
}
