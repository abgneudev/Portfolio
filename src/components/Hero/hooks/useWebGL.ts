'use client';

import { useRef, useEffect, useState, type RefObject } from 'react';
import { VERTEX_SHADER, FRAGMENT_SHADER } from '../constants';
import type { CanvasSize } from './useCanvasSize';

interface WebGLState {
  fps: number;
  time: number;
}

interface UniformLocations {
  resolution: WebGLUniformLocation | null;
  time: WebGLUniformLocation | null;
  pixelSize: WebGLUniformLocation | null;
  speed: WebGLUniformLocation | null;
}

/**
 * Creates and compiles a WebGL shader
 */
function createShader(
  gl: WebGLRenderingContext,
  type: number,
  source: string
): WebGLShader | null {
  const shader = gl.createShader(type);
  if (!shader) return null;

  gl.shaderSource(shader, source);
  gl.compileShader(shader);

  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    console.error('Shader compile error:', gl.getShaderInfoLog(shader));
    gl.deleteShader(shader);
    return null;
  }

  return shader;
}

/**
 * Custom hook for WebGL canvas rendering
 *
 * Manages WebGL context, shader program, and animation loop.
 * Defers initialization until after page is interactive to improve LCP.
 * Returns current FPS and time for external use.
 */
export function useWebGL(
  canvasRef: RefObject<HTMLCanvasElement | null>,
  pixelSize: number,
  speed: number,
  canvasSize: CanvasSize
): WebGLState {
  const glRef = useRef<WebGLRenderingContext | null>(null);
  const programRef = useRef<WebGLProgram | null>(null);
  const uniformsRef = useRef<UniformLocations | null>(null);
  const initializedRef = useRef(false);
  const fpsRef = useRef(0);
  const [fps, setFps] = useState(0);

  // Deferred WebGL initialization - runs after page is interactive
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || initializedRef.current) return;

    const initWebGL = () => {
      if (initializedRef.current) return;
      initializedRef.current = true;

      const gl = canvas.getContext('webgl', {
        antialias: false,
        depth: false,
        stencil: false,
        preserveDrawingBuffer: false,
      });
      if (!gl) {
        console.error('WebGL not supported');
        return;
      }

      glRef.current = gl;

      const vs = createShader(gl, gl.VERTEX_SHADER, VERTEX_SHADER);
      const fs = createShader(gl, gl.FRAGMENT_SHADER, FRAGMENT_SHADER);

      if (!vs || !fs) return;

      const program = gl.createProgram();
      if (!program) return;

      gl.attachShader(program, vs);
      gl.attachShader(program, fs);
      gl.linkProgram(program);

      if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
        console.error('Program link error:', gl.getProgramInfoLog(program));
        return;
      }

      programRef.current = program;

      gl.useProgram(program);
      uniformsRef.current = {
        resolution: gl.getUniformLocation(program, 'uResolution'),
        time: gl.getUniformLocation(program, 'uTime'),
        pixelSize: gl.getUniformLocation(program, 'uPixelSize'),
        speed: gl.getUniformLocation(program, 'uSpeed')
      };

      const positions = new Float32Array([
        -1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1
      ]);

      const buffer = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
      gl.bufferData(gl.ARRAY_BUFFER, positions, gl.STATIC_DRAW);

      const posLoc = gl.getAttribLocation(program, 'a_position');
      gl.enableVertexAttribArray(posLoc);
      gl.vertexAttribPointer(posLoc, 2, gl.FLOAT, false, 0, 0);
    };

    // Defer initialization until browser is idle or after short delay
    if ('requestIdleCallback' in window) {
      const idleId = requestIdleCallback(initWebGL, { timeout: 100 });
      return () => cancelIdleCallback(idleId);
    } else {
      const timeoutId = setTimeout(initWebGL, 50);
      return () => clearTimeout(timeoutId);
    }
  }, [canvasRef]);

  // Animation loop - separate from initialization
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

        // FPS counter - update ref, batch setState
        frameCount++;
        if (t - fpsTime > 1000) {
          fpsRef.current = frameCount;
          setFps(frameCount);
          frameCount = 0;
          fpsTime = t;
        }

        gl.viewport(0, 0, canvas.width, canvas.height);
        gl.uniform2f(uniforms.resolution, canvas.width, canvas.height);
        gl.uniform1f(uniforms.time, sec);
        gl.uniform1f(uniforms.pixelSize, pixelSize);
        gl.uniform1f(uniforms.speed, speed);
        gl.drawArrays(gl.TRIANGLES, 0, 6);
      }

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);
    return () => cancelAnimationFrame(animId);
  }, [canvasRef, pixelSize, speed, canvasSize]);

  return { fps, time: 0 };
}
