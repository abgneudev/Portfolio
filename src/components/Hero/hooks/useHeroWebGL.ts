'use client';

import { useRef, useEffect, useState, type RefObject } from 'react';
import {
  createWebGLContext,
  createProgram,
  getUniformLocations,
  createFullscreenQuad,
  type WebGLState,
} from '@/lib/webgl';
import { VERTEX_SHADER, FRAGMENT_SHADER } from '../constants';
import type { WindowSize } from '@/hooks';

type HeroUniforms = 'uResolution' | 'uTime' | 'uPixelSize' | 'uSpeed';

/**
 * Hero-specific WebGL hook for animated shader background
 *
 * Uses shared WebGL utilities from lib/webgl.
 * Defers initialization until after page is interactive to improve LCP.
 */
export function useHeroWebGL(
  canvasRef: RefObject<HTMLCanvasElement | null>,
  pixelSize: number,
  speed: number,
  canvasSize: WindowSize
): WebGLState {
  const glRef = useRef<WebGLRenderingContext | null>(null);
  const programRef = useRef<WebGLProgram | null>(null);
  const uniformsRef = useRef<Record<HeroUniforms, WebGLUniformLocation | null> | null>(null);
  const initializedRef = useRef(false);
  const fpsRef = useRef(0);
  const [fps, setFps] = useState(0);

  // Deferred WebGL initialization
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || initializedRef.current) return;

    const initWebGL = () => {
      if (initializedRef.current) return;
      initializedRef.current = true;

      const gl = createWebGLContext(canvas);
      if (!gl) return;

      glRef.current = gl;

      const program = createProgram(gl, VERTEX_SHADER, FRAGMENT_SHADER);
      if (!program) return;

      programRef.current = program;
      gl.useProgram(program);

      uniformsRef.current = getUniformLocations<HeroUniforms>(gl, program, [
        'uResolution',
        'uTime',
        'uPixelSize',
        'uSpeed',
      ]);

      const buffer = createFullscreenQuad(gl);
      if (!buffer) return;

      const posLoc = gl.getAttribLocation(program, 'a_position');
      gl.enableVertexAttribArray(posLoc);
      gl.vertexAttribPointer(posLoc, 2, gl.FLOAT, false, 0, 0);
    };

    // Defer initialization until browser is idle
    if ('requestIdleCallback' in window) {
      const idleId = requestIdleCallback(initWebGL, { timeout: 100 });
      return () => cancelIdleCallback(idleId);
    } else {
      const timeoutId = setTimeout(initWebGL, 50);
      return () => clearTimeout(timeoutId);
    }
  }, [canvasRef]);

  // Animation loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    let animId: number;
    let frameCount = 0;
    let fpsTime = 0;

    const render = (t: number) => {
      const gl = glRef.current;
      const uniforms = uniformsRef.current;

      if (gl && uniforms) {
        const sec = t * 0.001;

        frameCount++;
        if (t - fpsTime > 1000) {
          fpsRef.current = frameCount;
          setFps(frameCount);
          frameCount = 0;
          fpsTime = t;
        }

        gl.viewport(0, 0, canvas.width, canvas.height);
        gl.uniform2f(uniforms.uResolution, canvas.width, canvas.height);
        gl.uniform1f(uniforms.uTime, sec);
        gl.uniform1f(uniforms.uPixelSize, pixelSize);
        gl.uniform1f(uniforms.uSpeed, speed);
        gl.drawArrays(gl.TRIANGLES, 0, 6);
      }

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);
    return () => cancelAnimationFrame(animId);
  }, [canvasRef, pixelSize, speed, canvasSize]);

  return { fps, time: 0 };
}