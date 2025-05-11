'use client';

import React, { useRef, useEffect } from 'react';
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

    const resizeCanvas = () => {
        const SCALE = 0.25; // 25% resolution

        canvas.width = window.innerWidth * SCALE;
        canvas.height = window.innerHeight * SCALE;
        
        canvas.style.width = '100%';
        canvas.style.height = '100%';
        
      
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    let lastDraw = performance.now();
    const FRAME_INTERVAL = 1000 / 20; // ~20fps

    const draw = (now = performance.now()) => {
        if (now - lastDraw < FRAME_INTERVAL) {
            requestAnimationFrame(draw);
            return;
          }
          lastDraw = now;
      const width = canvas.width;
      const height = canvas.height;
      const imageData = ctx.createImageData(width, height);
      const data = imageData.data;

      for (let y = 0; y < height; y ++) {
        for (let x = 0; x < width; x ++) {
          const nx = x / width;
          const ny = y / height;
          // control the shape of aurora (x and y to elognate horizontally)
          const value = noise.current.simplex3(nx * 1.5, ny * 2, t);

          // Curved intensity for softer edges
          const intensity = Math.pow((value + 1) / 2, 3);

          // Aurora colors 
          const r = 180 + 75 * intensity; // pinkish red
          const g = 20 + 30 * intensity;  // hint of purple
          const b = 100 + 120 * intensity; // deep magenta-violet

          const i = (y * width + x) * 4;

          // write to pixel color buffer
          data[i] = r;
          data[i + 1] = g;
          data[i + 2] = b;
          data[i + 3] = intensity * 100; // semi-transparent
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
      }}
    />
  );
};

export default AuroraBackground;
