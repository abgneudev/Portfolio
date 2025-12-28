'use client';

import { useState, useEffect, useRef } from 'react';

export interface WindowSize {
  width: number;
  height: number;
}

/**
 * Generic hook for window size with throttled resize handling
 *
 * @param options.throttle - Whether to throttle resize events with RAF (default: true)
 * @param options.dpr - Device pixel ratio multiplier (default: 1)
 * @param options.maxDpr - Maximum DPR to apply (default: 2)
 */
export function useWindowSize(options?: {
  throttle?: boolean;
  dpr?: boolean;
  maxDpr?: number;
}): WindowSize {
  const { throttle = true, dpr = false, maxDpr = 2 } = options ?? {};

  const [size, setSize] = useState<WindowSize>(() => {
    if (typeof window === 'undefined') return { width: 1920, height: 1080 };
    const multiplier = dpr ? Math.min(window.devicePixelRatio || 1, maxDpr) : 1;
    return {
      width: Math.floor(window.innerWidth * multiplier),
      height: Math.floor(window.innerHeight * multiplier),
    };
  });

  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const update = () => {
      const multiplier = dpr ? Math.min(window.devicePixelRatio || 1, maxDpr) : 1;
      setSize({
        width: Math.floor(window.innerWidth * multiplier),
        height: Math.floor(window.innerHeight * multiplier),
      });
    };

    const handleResize = () => {
      if (throttle) {
        if (rafRef.current) cancelAnimationFrame(rafRef.current);
        rafRef.current = requestAnimationFrame(update);
      } else {
        update();
      }
    };

    window.addEventListener('resize', handleResize, { passive: true });
    return () => {
      window.removeEventListener('resize', handleResize);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [throttle, dpr, maxDpr]);

  return size;
}