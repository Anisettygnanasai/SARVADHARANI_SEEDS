'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const rawX = useMotionValue(-100);
  const rawY = useMotionValue(-100);

  // Smooth spring for the trailing ring
  const springConfig = { stiffness: 180, damping: 20, mass: 0.5 };
  const ringX = useSpring(rawX, springConfig);
  const ringY = useSpring(rawY, springConfig);

  useEffect(() => {
    // Only show on non-touch devices
    if (window.matchMedia('(hover: none)').matches) return;

    const handleMouseMove = (e: MouseEvent) => {
      rawX.set(e.clientX);
      rawY.set(e.clientY);
      setIsVisible(true);
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    const addHoverListeners = () => {
      const interactiveEls = document.querySelectorAll(
        'a, button, [role="button"], input, textarea, select, .cursor-pointer'
      );
      interactiveEls.forEach((el) => {
        el.addEventListener('mouseenter', () => setIsHovering(true));
        el.addEventListener('mouseleave', () => setIsHovering(false));
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    // Add hover listeners after DOM is ready
    addHoverListeners();

    // Re-add on DOM mutations (for dynamically added elements)
    const observer = new MutationObserver(addHoverListeners);
    observer.observe(document.body, { childList: true, subtree: true });

    // Add global cursor: none CSS
    document.documentElement.style.cursor = 'none';

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      observer.disconnect();
      document.documentElement.style.cursor = '';
    };
  }, [rawX, rawY]);

  // Don't render on mobile/touch
  if (typeof window !== 'undefined' && window.matchMedia('(hover: none)').matches) {
    return null;
  }

  return (
    <>
      {/* Dot — follows cursor directly */}
      <motion.div
        ref={cursorRef}
        className="fixed top-0 left-0 pointer-events-none z-[999]"
        style={{
          x: rawX,
          y: rawY,
          translateX: '-50%',
          translateY: '-50%',
        }}
      >
        <motion.div
          animate={{
            scale: isHovering ? 0.5 : 1,
            opacity: isVisible ? 1 : 0,
          }}
          transition={{ duration: 0.15 }}
          className="w-3 h-3 rounded-full"
          style={{ background: '#C8981E' }}
        />
      </motion.div>

      {/* Ring — follows with spring lag */}
      <motion.div
        ref={ringRef}
        className="fixed top-0 left-0 pointer-events-none z-[998]"
        style={{
          x: ringX,
          y: ringY,
          translateX: '-50%',
          translateY: '-50%',
        }}
      >
        <motion.div
          animate={{
            scale: isHovering ? 2.5 : 1,
            opacity: isVisible ? 1 : 0,
            borderColor: isHovering ? 'rgba(200,152,30,0.5)' : 'rgba(200,152,30,0.4)',
          }}
          transition={{ duration: 0.25 }}
          className="w-8 h-8 rounded-full border-2"
          style={{ borderColor: 'rgba(200,152,30,0.4)' }}
        />
      </motion.div>
    </>
  );
}
