'use client';

import React, { useRef, useEffect } from 'react';
// @ts-expect-error - noisejs lacks TypeScript type definitions
import { Noise } from 'noisejs';

const AuroraBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const noise = useRef(new Noise(Math.random()));

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let t = 0;

    const SCALE = 0.25;          // 25 % resolution
    let lastW = 0;               // remember last real width

    const resizeCanvas = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;

      // Skip if only the height changed (mobile address bar toggle)
      if (w === lastW) return;

      lastW = w;
      canvas.width  = w * SCALE;
      canvas.height = h * SCALE;
      canvas.style.width  = '100%';
      canvas.style.height = '100%';
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);          // desktop
    window.addEventListener('orientationchange', resizeCanvas); // mobile

    let lastDraw = performance.now();
    const FRAME_INTERVAL = 1000 / 20; // ≈20 fps

    const draw = (now = performance.now()) => {
      if (now - lastDraw < FRAME_INTERVAL) {
        animationFrameId = requestAnimationFrame(draw);
        return;
      }
      lastDraw = now;

      const width  = canvas.width;
      const height = canvas.height;

      const imageData = ctx.createImageData(width, height);
      const data = imageData.data;

      for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
          const nx = x / width;
          const ny = y / height;
          const value = noise.current.simplex3(nx * 1.5, ny * 2, t);
          const intensity = Math.pow((value + 1) / 2, 3) * 1.5;

          const i = (y * width + x) * 4;
          data[i    ] = 180 + 75 * intensity;   // R
          data[i + 1] = 20  + 30 * intensity;   // G
          data[i + 2] = 100 + 120 * intensity;  // B
          data[i + 3] = intensity * 100;        // A
        }
      }

      ctx.putImageData(imageData, 0, 0);
      t += 0.003;
      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('orientationchange', resizeCanvas);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        zIndex: -1,
        width: '100%',
        height: '100%',
        backgroundColor: 'black',
        pointerEvents: 'none',          // just in case
      }}
    />
  );
};

export default AuroraBackground;
