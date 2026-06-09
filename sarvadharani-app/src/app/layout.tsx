import type { Metadata, Viewport } from 'next';
import { Cormorant_Garamond, Inter, Plus_Jakarta_Sans } from 'next/font/google';
import './globals.css';
import { SmoothScrollProvider } from '@/components/providers/SmoothScrollProvider';

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-cormorant',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-inter',
  display: 'swap',
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-jakarta',
  display: 'swap',
});

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#C8981E',
};

export const metadata: Metadata = {
  title: {
    default: 'Sarvadharani Seeds | Premium Rice Seed Processing & Marketing Company',
    template: '%s | Sarvadharani Seeds',
  },
  description:
    'Sarvadharani Seeds provides high-quality rice seeds, seed processing, and agricultural solutions to support farmers with reliable and high-yielding varieties. Based in Rayagada, Odisha.',
  keywords: [
    'Sarvadharani Seeds',
    'rice seed company Odisha',
    'rice seed processing Rayagada',
    'MTU-1001 rice variety',
    'MTU-1156 variety',
    'MTU-7029 paddy',
    'SUVARNA rice variety',
    'DHARANI rice',
    'MYTHRI variety',
    'LALIT rice seeds',
    'PRATHIBA variety',
    'high yield paddy seeds Odisha',
    'certified rice seeds Rayagada',
    'farmer seeds Kalyan Singpur',
    'seed processing agritech India',
    'agricultural seeds Odisha',
  ],
  authors: [{ name: 'Sarvadharani Seeds' }],
  creator: 'Sarvadharani Seeds',
  publisher: 'Sarvadharani Seeds',
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: 'https://sarvadharaniSeeds.com',
    siteName: 'Sarvadharani Seeds',
    title: 'Sarvadharani Seeds | Premium Rice Seed Processing & Marketing Company',
    description:
      'High-quality rice seed processing and marketing from Rayagada, Odisha. Trusted varieties for better productivity and sustainable agriculture.',
    images: [
      {
        url: '/images/hero.png',
        width: 1200,
        height: 630,
        alt: 'Sarvadharani Seeds — Premium Rice Seed Company, Rayagada, Odisha',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Sarvadharani Seeds | Premium Rice Seed Processing & Marketing',
    description: 'Delivering trusted rice seed varieties through quality processing, scientific standards, and farmer-focused innovation.',
    images: ['/images/hero.png'],
  },
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${inter.variable} ${jakarta.variable}`}
      suppressHydrationWarning
    >
      <body className="bg-ivory text-deep-forest antialiased">
        <SmoothScrollProvider>
          {children}
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
