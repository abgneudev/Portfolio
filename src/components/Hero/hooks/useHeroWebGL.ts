'use client';

import { useRef, useEffect, useState, type RefObject } from 'react';
import {
  createWebGLContext,
  createProgram,
  getUniformLocations,
  createFullscreenQuad,
  type WebGLState,
} from '@/lib/webgl';
import { VERTEX_SHADER, FRAGMENT_SHADER, SCENE_TIMING, SCENE_ORDER, type SceneName } from '../constants';
import type { WindowSize } from '@/hooks';

type HeroUniforms = 'uResolution' | 'uTime' | 'uPixelSize' | 'uSpeed';

export interface HeroWebGLState extends WebGLState {
  currentScene: SceneName;
  sceneProgress: number; // 0-1 progress within current scene (including transition)
}

/**
 * Check if OffscreenCanvas is supported for WebGL
 */
function supportsOffscreenCanvas(): boolean {
  if (typeof window === 'undefined') return false;
  if (!('OffscreenCanvas' in window)) return false;

  try {
    const testCanvas = new OffscreenCanvas(1, 1);
    const ctx = testCanvas.getContext('webgl');
    return ctx !== null;
  } catch {
    return false;
  }
}

/**
 * Calculates the current scene based on time
 * Must match the shader's morphingShape timing logic
 * Text color offset: changes 1 second earlier than the shader transition
 */
function calculateCurrentScene(timeSeconds: number, speed: number): { scene: SceneName; progress: number } {
  const TEXT_COLOR_OFFSET = 1.0; // Text changes 1 second before shader
  const t = (timeSeconds + TEXT_COLOR_OFFSET) * speed * 0.8; // Match shader's time * 0.8 multiplier
  const { holdTime, transitionTime, cycleTime, totalCycle } = SCENE_TIMING;

  const cyclePos = t % totalCycle;
  const shapeIndex = Math.floor(cyclePos / cycleTime);
  const withinCycle = cyclePos % cycleTime;

  let transitionProgress = 0;
  if (withinCycle > holdTime) {
    transitionProgress = (withinCycle - holdTime) / transitionTime;
    transitionProgress = Math.min(1, Math.max(0, transitionProgress));
  }

  const sceneIndex = shapeIndex % 5;
  const scene = SCENE_ORDER[sceneIndex];
  const progress = (withinCycle / cycleTime);

  return { scene, progress };
}

/**
 * Hero-specific WebGL hook for animated shader background
 *
 * Performance optimization: Uses OffscreenCanvas + Web Worker when supported
 * to move all shader computation off the main thread. Falls back to main thread
 * rendering for unsupported browsers.
 *
 * Exposes current scene for UI color synchronization.
 */
export function useHeroWebGL(
  canvasRef: RefObject<HTMLCanvasElement | null>,
  pixelSize: number,
  speed: number,
  canvasSize: WindowSize
): HeroWebGLState {
  const workerRef = useRef<Worker | null>(null);
  const glRef = useRef<WebGLRenderingContext | null>(null);
  const uniformsRef = useRef<Record<HeroUniforms, WebGLUniformLocation | null> | null>(null);
  const initializedRef = useRef(false);
  const useWorkerRef = useRef(false);
  const [fps, setFps] = useState(0);
  const [currentScene, setCurrentScene] = useState<SceneName>('water');
  const [sceneProgress, setSceneProgress] = useState(0);

  // Initialize WebGL (worker or main thread)
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || initializedRef.current) return;

    const initWithWorker = () => {
      if (initializedRef.current) return;

      // Try to use OffscreenCanvas + Worker
      if (supportsOffscreenCanvas()) {
        try {
          const offscreen = canvas.transferControlToOffscreen();

          // Create worker
          const worker = new Worker(
            new URL('../../../workers/heroWebGL.worker.ts', import.meta.url),
            { type: 'module' }
          );

          worker.onmessage = (e) => {
            const { data } = e;
            if (data.type === 'sceneUpdate') {
              setCurrentScene(data.scene);
              setSceneProgress(data.progress);
              if (data.fps > 0) setFps(data.fps);
            } else if (data.type === 'ready') {
              initializedRef.current = true;
              useWorkerRef.current = true;
            } else if (data.type === 'error') {
              console.warn('Worker WebGL failed, falling back to main thread');
              worker.terminate();
              initMainThread();
            }
          };

          worker.postMessage(
            {
              type: 'init',
              canvas: offscreen,
              pixelSize,
              speed,
            },
            [offscreen]
          );

          workerRef.current = worker;
          return;
        } catch (err) {
          console.warn('OffscreenCanvas setup failed, using main thread:', err);
        }
      }

      // Fallback to main thread
      initMainThread();
    };

    const initMainThread = () => {
      if (initializedRef.current) return;
      initializedRef.current = true;
      useWorkerRef.current = false;

      const gl = createWebGLContext(canvas);
      if (!gl) return;

      glRef.current = gl;

      const program = createProgram(gl, VERTEX_SHADER, FRAGMENT_SHADER);
      if (!program) return;

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
      const idleId = requestIdleCallback(initWithWorker, { timeout: 100 });
      return () => cancelIdleCallback(idleId);
    } else {
      const timeoutId = setTimeout(initWithWorker, 50);
      return () => clearTimeout(timeoutId);
    }
  }, [canvasRef, pixelSize, speed]);

  // Send updates to worker when props change
  useEffect(() => {
    if (workerRef.current && useWorkerRef.current) {
      workerRef.current.postMessage({
        type: 'update',
        pixelSize,
        speed,
        width: canvasSize.width,
        height: canvasSize.height,
      });
    }
  }, [pixelSize, speed, canvasSize]);

  // Main thread animation loop (only when not using worker)
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    let animId: number;
    let frameCount = 0;
    let fpsTime = 0;
    let lastSceneUpdate = 0;

    const render = (t: number) => {
      // Skip if using worker
      if (useWorkerRef.current) {
        return;
      }

      const gl = glRef.current;
      const uniforms = uniformsRef.current;

      if (gl && uniforms) {
        const sec = t * 0.001;

        frameCount++;
        if (t - fpsTime > 1000) {
          setFps(frameCount);
          frameCount = 0;
          fpsTime = t;
        }

        // Update scene state less frequently (every 100ms) to avoid excessive re-renders
        if (t - lastSceneUpdate > 100) {
          const { scene, progress } = calculateCurrentScene(sec, speed);
          setCurrentScene(scene);
          setSceneProgress(progress);
          lastSceneUpdate = t;
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

  // Cleanup worker on unmount
  useEffect(() => {
    return () => {
      if (workerRef.current) {
        workerRef.current.postMessage({ type: 'stop' });
        workerRef.current.terminate();
      }
    };
  }, []);

  return { fps, time: 0, currentScene, sceneProgress };
}
