import { LoadingScreen } from '@/components/layout/LoadingScreen';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Hero } from '@/components/sections/Hero';
import dynamic from 'next/dynamic';

const CompanyStory = dynamic(() => import('@/components/sections/CompanyStory').then(mod => mod.CompanyStory));
const OurFounders = dynamic(() => import('@/components/sections/OurFounders').then(mod => mod.OurFounders));
const Varieties = dynamic(() => import('@/components/sections/Varieties').then(mod => mod.Varieties));
const Research = dynamic(() => import('@/components/sections/Research').then(mod => mod.Research));
const FarmerStories = dynamic(() => import('@/components/sections/FarmerStories').then(mod => mod.FarmerStories));
const WhyUs = dynamic(() => import('@/components/sections/WhyUs').then(mod => mod.WhyUs));
const ImpactNumbers = dynamic(() => import('@/components/sections/ImpactNumbers').then(mod => mod.ImpactNumbers));
const Sustainability = dynamic(() => import('@/components/sections/Sustainability').then(mod => mod.Sustainability));
const Gallery = dynamic(() => import('@/components/sections/Gallery').then(mod => mod.Gallery));
const Contact = dynamic(() => import('@/components/sections/Contact').then(mod => mod.Contact));
import { WhatsAppButton } from '@/components/ui/WhatsAppButton';
import { CustomCursor } from '@/components/ui/CustomCursor';

export default function HomePage() {
  return (
    <>
      <CustomCursor />
      <LoadingScreen />
      <Navbar />
      <main>
        <Hero />
        <CompanyStory />
        <OurFounders />
        <Varieties />
        <Research />
        <FarmerStories />
        <WhyUs />
        <ImpactNumbers />
        <Sustainability />
        <Gallery />
        <Contact />
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
