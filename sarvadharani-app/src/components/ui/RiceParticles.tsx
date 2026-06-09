'use client';

import { useEffect, useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
  wobble: number;
  wobbleSpeed: number;
  color: string;
}

export function RiceParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let particles: Particle[] = [];
    const COLORS = ['#C8981E', '#E8BE24', '#3D6B4F', '#52A370', '#A37818'];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const spawnParticles = () => {
      particles = Array.from({ length: 60 }, () => ({
        x: Math.random() * canvas.width,
        y: canvas.height + Math.random() * 100,
        vx: (Math.random() - 0.5) * 0.4,
        vy: -(Math.random() * 0.6 + 0.2),
        size: Math.random() * 5 + 2,
        opacity: Math.random() * 0.5 + 0.1,
        wobble: Math.random() * Math.PI * 2,
        wobbleSpeed: (Math.random() - 0.5) * 0.02,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
      }));
    };
    spawnParticles();

    const drawRiceGrain = (
      ctx: CanvasRenderingContext2D,
      x: number,
      y: number,
      size: number,
      rotation: number,
      color: string,
      opacity: number
    ) => {
      ctx.save();
      ctx.globalAlpha = opacity;
      ctx.translate(x, y);
      ctx.rotate(rotation);
      ctx.beginPath();
      ctx.ellipse(0, 0, size * 0.35, size, 0, 0, Math.PI * 2);
      const grad = ctx.createLinearGradient(-size * 0.35, -size, size * 0.35, size);
      grad.addColorStop(0, color);
      grad.addColorStop(0.5, color + 'CC');
      grad.addColorStop(1, color + '44');
      ctx.fillStyle = grad;
      ctx.fill();
      ctx.restore();
    };

    let t = 0;
    const animate = () => {
      if (!canvas || !ctx) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      t += 0.008;

      particles.forEach((p) => {
        p.x += p.vx + Math.sin(t + p.wobble) * 0.3;
        p.y += p.vy;
        p.wobble += p.wobbleSpeed;

        if (p.y < -20) {
          p.y = canvas.height + 10;
          p.x = Math.random() * canvas.width;
        }

        const rotation = Math.atan2(p.vy, p.vx + Math.sin(t + p.wobble) * 0.3) + Math.PI / 2;
        drawRiceGrain(ctx, p.x, p.y, p.size, rotation, p.color, p.opacity);
      });

      animRef.current = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="particle-canvas"
      aria-hidden="true"
    />
  );
}
