import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { varieties } from '@/data/varieties';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { CheckCircle2, ChevronRight, Clock, Shield, Wheat, ArrowLeft } from 'lucide-react';
import { Metadata } from 'next';

interface Props {
  params: {
    id: string;
  };
}

export function generateMetadata({ params }: Props): Metadata {
  const variety = varieties.find((v) => v.id === params.id);
  if (!variety) return { title: 'Product Not Found' };
  
  return {
    title: `${variety.name} | Sarvadharani Seeds`,
    description: variety.longDescription,
  };
}

export function generateStaticParams() {
  return varieties.map((variety) => ({
    id: variety.id,
  }));
}

export default function ProductPage({ params }: Props) {
  const variety = varieties.find((v) => v.id === params.id);

  if (!variety) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-rice-white selection:bg-paddy-gold selection:text-white">
      <Navbar />
      
      {/* Hero Banner */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden bg-deep-forest">
        <div className="absolute inset-0 opacity-20">
          <Image
            src={variety.image}
            alt={variety.name}
            fill
            className="object-cover blur-sm"
            priority
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-deep-forest via-deep-forest/80 to-transparent" />
        
        <div className="container mx-auto px-4 relative z-10">
          <Link href="/#varieties" className="inline-flex items-center gap-2 text-white/60 hover:text-white mb-8 transition-colors">
            <ArrowLeft size={16} />
            <span className="font-inter text-sm font-medium">Back to Varieties</span>
          </Link>
          
          <div className="max-w-4xl">
            {variety.badge && (
              <span className="inline-block px-4 py-1.5 rounded-full bg-paddy-gold text-white text-sm font-bold font-inter mb-6">
                {variety.badge}
              </span>
            )}
            <h1 className="font-cormorant text-5xl lg:text-7xl font-bold text-white mb-6 leading-tight">
              {variety.name}
            </h1>
            <p className="font-jakarta text-xl lg:text-3xl text-white/90 font-medium mb-4">
              {variety.tagline}
            </p>
            <p className="font-inter text-lg text-white/70 max-w-2xl leading-relaxed">
              {variety.description}
            </p>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-20 bg-rice-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            
            {/* Left Column - Details */}
            <div className="lg:col-span-7 space-y-12">
              <div>
                <h2 className="font-jakarta text-3xl font-bold text-deep-forest mb-6">Overview</h2>
                <p className="body-text text-lg leading-relaxed">{variety.longDescription}</p>
              </div>

              {/* Quick Stats Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {[
                  { label: 'Duration', value: variety.duration, icon: Clock },
                  { label: 'Segment', value: variety.segment, icon: Shield },
                  { label: 'Yield', value: variety.yieldPotential, icon: Wheat },
                  { label: 'Grain', value: variety.grainType, icon: ChevronRight },
                ].map((stat, i) => (
                  <div key={i} className="p-4 rounded-2xl bg-ivory border border-paddy-gold-100 flex flex-col items-center text-center">
                    <stat.icon size={24} className="text-paddy-gold mb-3" />
                    <div className="font-jakarta font-bold text-deep-forest mb-1">{stat.value}</div>
                    <div className="font-inter text-xs text-warm-gray uppercase tracking-wider">{stat.label}</div>
                  </div>
                ))}
              </div>

              {/* Benefits */}
              <div>
                <h2 className="font-jakarta text-3xl font-bold text-deep-forest mb-6">Key Benefits</h2>
                <div className="grid sm:grid-cols-2 gap-4">
                  {variety.keyBenefits.map((benefit, i) => (
                    <div key={i} className="flex items-start gap-3 p-4 rounded-xl bg-natural-green-50 border border-natural-green-100">
                      <CheckCircle2 className="text-natural-green flex-shrink-0 mt-0.5" size={20} />
                      <span className="font-inter text-deep-forest leading-relaxed">{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              <div>
                <h2 className="font-jakarta text-3xl font-bold text-deep-forest mb-6">Farmer Advantages</h2>
                <div className="space-y-3">
                  {variety.farmerBenefits.map((benefit, i) => (
                    <div key={i} className="flex items-center gap-3 p-4 rounded-xl bg-paddy-gold-50 border border-paddy-gold-100">
                      <CheckCircle2 className="text-paddy-gold flex-shrink-0" size={20} />
                      <span className="font-inter font-medium text-deep-forest">{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>

            </div>

            {/* Right Column - Image Gallery & Sticky CTA */}
            <div className="lg:col-span-5">
              <div className="sticky top-32 space-y-8">
                {/* Image Gallery */}
                <div className="relative aspect-[4/5] rounded-3xl overflow-hidden shadow-premium group">
                  <Image
                    src={variety.image}
                    alt={`${variety.name} Product View`}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 border border-black/10 rounded-3xl pointer-events-none" />
                </div>
                
                {/* Contact CTA */}
                <div className="bg-ivory rounded-3xl p-8 border border-paddy-gold-100 shadow-sm text-center">
                  <h3 className="font-cormorant text-2xl font-bold text-deep-forest mb-3">Interested in {variety.name}?</h3>
                  <p className="font-inter text-deep-forest/70 mb-6">Contact our agricultural experts for pricing and availability in your region.</p>
                  <Link 
                    href="/#contact"
                    className="btn-primary w-full justify-center"
                  >
                    <span>Talk to Experts</span>
                  </Link>
                  <p className="font-inter text-xs text-warm-gray mt-4">Available across {variety.suitableRegions.join(', ')}</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>
      
      <Footer />
    </main>
  );
}
