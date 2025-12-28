import { DEFAULT_CONTEXT_OPTIONS, type WebGLContextOptions } from './types';

/**
 * Creates a WebGL context with optimized settings
 */
export function createWebGLContext(
  canvas: HTMLCanvasElement,
  options?: WebGLContextOptions
): WebGLRenderingContext | null {
  const opts = { ...DEFAULT_CONTEXT_OPTIONS, ...options };

  const gl = canvas.getContext('webgl', opts) as WebGLRenderingContext | null;
  if (!gl) {
    console.error('WebGL not supported');
    return null;
  }

  return gl;
}

/**
 * Checks if WebGL is supported in the current browser
 */
export function isWebGLSupported(): boolean {
  if (typeof window === 'undefined') return false;

  try {
    const canvas = document.createElement('canvas');
    return !!(
      canvas.getContext('webgl') ||
      canvas.getContext('experimental-webgl')
    );
  } catch {
    return false;
  }
}