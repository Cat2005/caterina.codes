'use client';

import React, { useRef, useEffect, useState } from 'react';
// @ts-expect-error - noisejs lacks TypeScript type definitions
import { Noise } from 'noisejs';

const AuroraBackground: React.FC = () => {
  const [isReady, setIsReady] = useState(false);

  

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const noise     = useRef(new Noise(Math.random()));

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId = 0;
    let t                = 0;

    const SCALE = 0.25;
    let lastW   = 0;

    let imageData: ImageData;

    const resizeCanvas = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;

      if (w === lastW) return;
      lastW = w;

      canvas.width  = w * SCALE;
      canvas.height = h * SCALE;
      canvas.style.width  = '100%';
      canvas.style.height = '100%';

      imageData = ctx.createImageData(canvas.width, canvas.height);
    };

    resizeCanvas();
    window.addEventListener('resize',            resizeCanvas);
    window.addEventListener('orientationchange', resizeCanvas);

    let lastDraw = performance.now();
    const FRAME_INTERVAL = 1000 / 20; // ≈20 fps

    const draw = (now = performance.now()) => {
      if (now - lastDraw < FRAME_INTERVAL) {
        animationFrameId = requestAnimationFrame(draw);
        return;
      }
      lastDraw = now;

      const { width, height } = canvas;
      const data = imageData.data;

      for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
          const nx = x / width;
          const ny = y / height;
          const value     = noise.current.simplex3(nx * 1.5, ny * 2, t);
          const intensity = Math.pow((value + 1) / 2, 3) * 1.5;

          const i = (y * width + x) * 4;
          data[i    ] = 180 + 75 * intensity;  // R
          data[i + 1] = 20  + 30 * intensity;  // G
          data[i + 2] = 100 + 120 * intensity; // B
          data[i + 3] =        100 * intensity; // A
        }
      }

      ctx.putImageData(imageData, 0, 0);

      if (!isReady) setIsReady(true);

      t += 0.003;
      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize',            resizeCanvas);
      window.removeEventListener('orientationchange', resizeCanvas);
    };
  }, [isReady]);

  return (
    <>
      <div
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: -2,
          backgroundColor: '#000000', 
          // --- Debugging Background ---
          background:
         

            // Bright Red Top-Left
            'radial-gradient(ellipse at 10% 15%, #341128  0%, transparent 25% 50%),' +
            // Bright Green Top-Right
            'radial-gradient(ellipse at 73% 16%, #341128  0%, transparent 25% 20%),' +

            'radial-gradient(ellipse at 50% 40%, #2D0F22  0%, transparent 25% 20%),' +
            // Bright Blue Bottom-Left
            'radial-gradient(ellipse at 22% 92%, #341128  0%, transparent 25% 50%),' +
            // Yellow Bottom-Right
            'radial-gradient(ellipse at 83% 73%, #351129  0%, transparent 25% 50%),' +
            // Magenta Center
            'radial-gradient(ellipse at 22% 33%, #2D0F22  0%, transparent 20% 40%),' +
            '#000000',
          // --- End Debugging Background ---
          transition: 'opacity 400ms ease',
          opacity: isReady ? 0 : 1, // Should be 1 initially
          pointerEvents: 'none',
        }}
      />

      <canvas
        ref={canvasRef}
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: -1,
          width: '100%',
          height: '100%',
          background: '#000000',
          pointerEvents: 'none',
          transition: 'opacity 400ms ease',
          opacity: isReady ? 1 : 0,
        }}
      />
    </>
  );
};

export default AuroraBackground;
