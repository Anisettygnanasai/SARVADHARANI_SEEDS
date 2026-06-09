'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

export function LoadingScreen() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Total duration ~1.5s (1000ms hold + 500ms exit animation)
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1200);

    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
          className="fixed inset-0 z-[200] flex flex-col items-center justify-center"
          style={{ background: 'linear-gradient(135deg, #FDFAF4 0%, #F5EDE4 100%)' }}
        >
          {/* Main Logo */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, ease: [0.34, 1.56, 0.64, 1] }}
            className="relative w-32 h-32 md:w-40 md:h-40"
          >
            <Image
              src="/images/sarvadharani-logo.jpg"
              alt="Sarvadharani Seeds Logo"
              fill
              className="object-contain rounded-2xl shadow-xl bg-white"
              priority
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
