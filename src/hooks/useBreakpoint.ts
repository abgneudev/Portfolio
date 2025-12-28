'use client';

import { useState, useEffect, useMemo, useRef } from 'react';

export interface Breakpoints {
  sm: number;
  md: number;
  lg: number;
  xl: number;
}

export interface BreakpointState {
  width: number;
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
  breakpoint: 'sm' | 'md' | 'lg' | 'xl';
}

const DEFAULT_BREAKPOINTS: Breakpoints = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
};

/**
 * Generic hook for responsive breakpoint detection
 *
 * @param breakpoints - Custom breakpoint values (optional)
 */
export function useBreakpoint(breakpoints?: Partial<Breakpoints>): BreakpointState {
  const bp = { ...DEFAULT_BREAKPOINTS, ...breakpoints };

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
    const isMobile = width < bp.sm;
    const isTablet = width >= bp.sm && width < bp.lg;
    const isDesktop = width >= bp.lg;

    let breakpoint: 'sm' | 'md' | 'lg' | 'xl' = 'sm';
    if (width >= bp.xl) breakpoint = 'xl';
    else if (width >= bp.lg) breakpoint = 'lg';
    else if (width >= bp.md) breakpoint = 'md';

    return {
      width,
      isMobile,
      isTablet,
      isDesktop,
      breakpoint,
    };
  }, [width, bp.sm, bp.md, bp.lg, bp.xl]);
}