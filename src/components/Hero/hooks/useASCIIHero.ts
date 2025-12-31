'use client';

import { useRef, useEffect, useState, type RefObject } from 'react';

/**
 * GPU-Accelerated ASCII Hero Background
 *
 * Optimizations:
 * 1. WebGL with all processing in fragment shader
 * 2. requestVideoFrameCallback for frame-accurate video sync
 * 3. NEAREST filtering on glyph atlas for crisp characters
 * 4. Minimal JS in render loop - just texture upload + draw call
 * 5. Video preload hints for faster startup
 * 6. Proper cleanup and resource management
 */

export interface ASCIIHeroState {
  fps: number;
  isReady: boolean;
  error: string | null;
}

interface Options {
  videoUrl: string;
  fontSize?: number;
  targetFps?: number;
}

const VERT_SRC = `
attribute vec2 a_pos;
varying vec2 v_uv;
void main() {
  gl_Position = vec4(a_pos, 0.0, 1.0);
  v_uv = a_pos * 0.5 + 0.5;
  v_uv.y = 1.0 - v_uv.y;
}`;

const FRAG_SRC = `
precision highp float;
uniform sampler2D u_video;
uniform sampler2D u_glyphs;
uniform vec2 u_gridSize;
uniform float u_glyphCount;
varying vec2 v_uv;

void main() {
  vec2 cell = floor(v_uv * u_gridSize);
  vec2 cellUV = (cell + 0.5) / u_gridSize;
  vec3 col = texture2D(u_video, cellUV).rgb;

  float lum = dot(col, vec3(0.2126, 0.7152, 0.0722));
  float idx = floor(lum * (u_glyphCount - 0.001));

  vec2 inCell = fract(v_uv * u_gridSize);
  float glyphU = (idx + inCell.x) / u_glyphCount;
  float alpha = texture2D(u_glyphs, vec2(glyphU, inCell.y)).a;

  vec3 qCol = floor(col * 16.0) / 16.0;
  vec3 bg = vec3(0.039);

  gl_FragColor = vec4(mix(bg, qCol, alpha), 1.0);
}`;

export function useASCIIHero(
  canvasRef: RefObject<HTMLCanvasElement | null>,
  options: Options
): ASCIIHeroState {
  const stateRef = useRef<{
    gl: WebGLRenderingContext | null;
    videoTex: WebGLTexture | null;
    video: HTMLVideoElement | null;
    gridSizeLoc: WebGLUniformLocation | null;
    running: boolean;
    raf: number;
    frameCount: number;
    fpsTime: number;
    lastVideoTime: number;
  }>({
    gl: null,
    videoTex: null,
    video: null,
    gridSizeLoc: null,
    running: false,
    raf: 0,
    frameCount: 0,
    fpsTime: 0,
    lastVideoTime: -1,
  });

  const [fps, setFps] = useState(0);
  const [isReady, setIsReady] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { videoUrl, fontSize = 10 } = options;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const s = stateRef.current;
    let initTimeout: ReturnType<typeof setTimeout> | undefined;
    let observer: ResizeObserver | undefined;
    let cancelled = false;

    // Defer heavy WebGL initialization to after First Contentful Paint
    const deferInit = (callback: () => void) => {
      if (typeof window !== 'undefined' && 'requestIdleCallback' in window) {
        (window as typeof window & { requestIdleCallback: (cb: () => void, opts?: { timeout: number }) => number })
          .requestIdleCallback(callback, { timeout: 200 });
      } else {
        initTimeout = setTimeout(callback, 50);
      }
    };

    deferInit(() => {
      if (cancelled) return;
    const cw = Math.round(fontSize * 0.6);
    const ch = Math.round(fontSize * 1.2);

    // WebGL setup
    const gl = canvas.getContext('webgl', {
      alpha: false,
      antialias: false,
      depth: false,
      stencil: false,
      preserveDrawingBuffer: false,
      powerPreference: 'high-performance',
      desynchronized: true,
    });

    if (!gl) {
      setError('WebGL not supported');
      return;
    }
    s.gl = gl;

    // Compile shaders
    const compile = (type: number, src: string) => {
      const sh = gl.createShader(type)!;
      gl.shaderSource(sh, src);
      gl.compileShader(sh);
      return sh;
    };

    const vs = compile(gl.VERTEX_SHADER, VERT_SRC);
    const fs = compile(gl.FRAGMENT_SHADER, FRAG_SRC);

    const prog = gl.createProgram()!;
    gl.attachShader(prog, vs);
    gl.attachShader(prog, fs);
    gl.linkProgram(prog);
    gl.useProgram(prog);

    // Fullscreen triangle (more efficient than quad)
    const posLoc = gl.getAttribLocation(prog, 'a_pos');
    const posBuf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, posBuf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([
      -1, -1, 3, -1, -1, 3
    ]), gl.STATIC_DRAW);
    gl.enableVertexAttribArray(posLoc);
    gl.vertexAttribPointer(posLoc, 2, gl.FLOAT, false, 0, 0);

    // Video texture
    const videoTex = gl.createTexture();
    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, videoTex);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    s.videoTex = videoTex;

    // Glyph atlas with NEAREST for crisp text
    const CHARS = ' .:-=+*#%@';
    const atlasW = cw * CHARS.length;
    const atlasCanvas = document.createElement('canvas');
    atlasCanvas.width = atlasW;
    atlasCanvas.height = ch;
    const actx = atlasCanvas.getContext('2d')!;
    actx.font = `${fontSize}px monospace`;
    actx.textBaseline = 'top';
    actx.fillStyle = '#fff';
    for (let i = 0; i < CHARS.length; i++) {
      actx.fillText(CHARS[i], i * cw, 0);
    }

    const glyphTex = gl.createTexture();
    gl.activeTexture(gl.TEXTURE1);
    gl.bindTexture(gl.TEXTURE_2D, glyphTex);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, atlasCanvas);

    // Uniforms
    gl.uniform1i(gl.getUniformLocation(prog, 'u_video'), 0);
    gl.uniform1i(gl.getUniformLocation(prog, 'u_glyphs'), 1);
    gl.uniform1f(gl.getUniformLocation(prog, 'u_glyphCount'), CHARS.length);
    s.gridSizeLoc = gl.getUniformLocation(prog, 'u_gridSize');

    // Video element
    const video = document.createElement('video');
    video.crossOrigin = 'anonymous';
    video.muted = true;
    video.loop = true;
    video.playsInline = true;
    video.preload = 'metadata'; // Load only metadata initially, not full video
    s.video = video;

    // Cached dimensions to avoid forced reflow from querying clientWidth/clientHeight
    let cachedWidth = 0;
    let cachedHeight = 0;

    // Apply cached dimensions to canvas (no layout queries)
    const applySize = () => {
      if (cachedWidth === 0 || cachedHeight === 0) return;
      if (canvas.width !== cachedWidth || canvas.height !== cachedHeight) {
        canvas.width = cachedWidth;
        canvas.height = cachedHeight;
        gl.viewport(0, 0, cachedWidth, cachedHeight);
        const cols = Math.floor(cachedWidth / cw);
        const rows = Math.floor(cachedHeight / ch);
        gl.uniform2f(s.gridSizeLoc, cols, rows);
      }
    };

    // Render frame
    const render = () => {
      if (!s.running || !s.video || !s.gl) return;

      // Only update texture if video time changed
      const vt = s.video.currentTime;
      if (vt !== s.lastVideoTime) {
        s.lastVideoTime = vt;
        gl.activeTexture(gl.TEXTURE0);
        gl.bindTexture(gl.TEXTURE_2D, s.videoTex);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, s.video);
      }

      gl.drawArrays(gl.TRIANGLES, 0, 3);
    };

    // Animation loop using requestVideoFrameCallback when available
    const hasRVFC = 'requestVideoFrameCallback' in HTMLVideoElement.prototype;

    const tick = (now: number) => {
      if (!s.running) return;

      s.frameCount++;
      if (now - s.fpsTime >= 1000) {
        setFps(s.frameCount);
        s.frameCount = 0;
        s.fpsTime = now;
      }

      applySize();
      render();

      if (!hasRVFC) {
        s.raf = requestAnimationFrame(tick);
      }
    };

    const videoFrameCallback = () => {
      if (!s.running) return;
      render();
      (video as HTMLVideoElement & { requestVideoFrameCallback: (cb: () => void) => number })
        .requestVideoFrameCallback(videoFrameCallback);
    };

    // Resize observer - caches dimensions to avoid forced reflow
    observer = new ResizeObserver((entries) => {
      const entry = entries[0];
      if (entry) {
        // Use contentRect to get dimensions without triggering layout
        cachedWidth = Math.round(entry.contentRect.width);
        cachedHeight = Math.round(entry.contentRect.height);
      }
    });
    observer.observe(canvas);

    // Video ready
    const onCanPlay = async () => {
      // Initial size from ResizeObserver should already be cached
      applySize();
      try {
        await video.play();
        s.running = true;
        setIsReady(true);
        canvas.dataset.visible = 'true';
        s.fpsTime = performance.now();

        if (hasRVFC) {
          // Use requestVideoFrameCallback for frame-accurate updates
          (video as HTMLVideoElement & { requestVideoFrameCallback: (cb: () => void) => number })
            .requestVideoFrameCallback(videoFrameCallback);
          // Still need rAF for FPS counter and applying size changes
          const fpsLoop = (now: number) => {
            if (!s.running) return;
            s.frameCount++;
            if (now - s.fpsTime >= 1000) {
              setFps(s.frameCount);
              s.frameCount = 0;
              s.fpsTime = now;
            }
            applySize();
            s.raf = requestAnimationFrame(fpsLoop);
          };
          s.raf = requestAnimationFrame(fpsLoop);
        } else {
          s.raf = requestAnimationFrame(tick);
        }
      } catch {
        setError('Playback failed');
      }
    };

    const onError = () => setError('Video load failed');

    video.addEventListener('canplay', onCanPlay, { once: true });
    video.addEventListener('error', onError);
    video.src = videoUrl;
    }); // End of deferInit callback

    return () => {
      cancelled = true;
      clearTimeout(initTimeout);
      s.running = false;
      cancelAnimationFrame(s.raf);
      observer?.disconnect();

      // Cleanup video
      if (s.video) {
        s.video.pause();
        s.video.src = '';
        s.video.load();
        s.video = null;
      }

      // Only cleanup if WebGL was initialized
      if (s.gl) {
        s.gl.getExtension('WEBGL_lose_context')?.loseContext();
        s.gl = null;
      }
    };
  }, [videoUrl, fontSize, canvasRef]);

  return { fps, isReady, error };
}
