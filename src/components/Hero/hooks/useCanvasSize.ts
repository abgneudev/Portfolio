'use client';

import { useState, useEffect, useRef } from 'react';

export interface CanvasSize {
  width: number;
  height: number;
}

/**
 * Custom hook for canvas size with device pixel ratio support
 *
 * Returns canvas dimensions adjusted for high-DPI displays.
 * Caps DPR at 1.5 for performance. Throttles resize events.
 */
export function useCanvasSize(): CanvasSize {
  const [size, setSize] = useState<CanvasSize>(() => {
    if (typeof window === 'undefined') return { width: 1920, height: 1080 };
    // Start with lower resolution for faster initial paint
    return {
      width: window.innerWidth,
      height: window.innerHeight
    };
  });
  const rafRef = useRef<number | null>(null);
  const initializedRef = useRef(false);

  useEffect(() => {
    const update = () => {
      // Cap DPR at 1.5 for better performance (vs 2)
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      setSize({
        width: Math.floor(window.innerWidth * dpr),
        height: Math.floor(window.innerHeight * dpr)
      });
    };

    // Defer high-DPR update until after initial paint
    if (!initializedRef.current) {
      initializedRef.current = true;
      requestAnimationFrame(() => {
        requestAnimationFrame(update);
      });
    }

    const handleResize = () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(update);
    };

    window.addEventListener('resize', handleResize, { passive: true });
    return () => {
      window.removeEventListener('resize', handleResize);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return size;
}
