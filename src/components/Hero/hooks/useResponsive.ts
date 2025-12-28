'use client';

import { useState, useEffect, useMemo, useRef } from 'react';
import { BREAKPOINTS, type BreakpointConfig } from '../constants';

export interface ResponsiveConfig extends BreakpointConfig {
  width: number;
  isMobile: boolean;
  isTablet: boolean;
}

/**
 * Custom hook for responsive breakpoint detection
 *
 * Returns current viewport configuration based on window width.
 * Uses the BREAKPOINTS config as single source of truth.
 * Throttles resize events for better performance.
 */
export function useResponsive(): ResponsiveConfig {
  const [width, setWidth] = useState(() =>
    typeof window !== 'undefined' ? window.innerWidth : 1920
  );
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const handleResize = () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => {
        setWidth(window.innerWidth);
      });
    };

    window.addEventListener('resize', handleResize, { passive: true });
    return () => {
      window.removeEventListener('resize', handleResize);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return useMemo(() => {
    const isMobile = width < (BREAKPOINTS.mobile.max ?? 640);
    const isTablet =
      width >= (BREAKPOINTS.tablet.min ?? 640) &&
      width < (BREAKPOINTS.tablet.max ?? 1024);

    const config = isMobile
      ? BREAKPOINTS.mobile
      : isTablet
        ? BREAKPOINTS.tablet
        : BREAKPOINTS.desktop;

    return {
      width,
      isMobile,
      isTablet,
      ...config
    };
  }, [width]);
}
