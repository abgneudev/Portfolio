/**
 * Web Worker for Hero WebGL Rendering
 *
 * Moves all shader computation off the main thread to eliminate
 * Total Blocking Time impact on Lighthouse scores.
 */

import { VERTEX_SHADER, FRAGMENT_SHADER, SCENE_TIMING, SCENE_ORDER, type SceneName } from '../components/Hero/constants/shaders';

interface InitMessage {
  type: 'init';
  canvas: OffscreenCanvas;
  pixelSize: number;
  speed: number;
}

interface UpdateMessage {
  type: 'update';
  pixelSize?: number;
  speed?: number;
  width?: number;
  height?: number;
}

interface StopMessage {
  type: 'stop';
}

type WorkerMessage = InitMessage | UpdateMessage | StopMessage;

interface SceneUpdate {
  type: 'sceneUpdate';
  scene: SceneName;
  progress: number;
  fps: number;
}

let gl: WebGLRenderingContext | null = null;
let program: WebGLProgram | null = null;
let uniforms: {
  uResolution: WebGLUniformLocation | null;
  uTime: WebGLUniformLocation | null;
  uPixelSize: WebGLUniformLocation | null;
  uSpeed: WebGLUniformLocation | null;
} | null = null;

let animationId: number | null = null;
let currentPixelSize = 40;
let currentSpeed = 1.0;
let canvasWidth = 1920;
let canvasHeight = 1080;
let lastSceneUpdate = 0;
let currentScene: SceneName = 'water';

function createShader(gl: WebGLRenderingContext, type: number, source: string): WebGLShader | null {
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

function calculateCurrentScene(timeSeconds: number, speed: number): { scene: SceneName; progress: number } {
  const TEXT_COLOR_OFFSET = 1.0;
  const t = (timeSeconds + TEXT_COLOR_OFFSET) * speed * 0.8;
  const { holdTime, transitionTime, cycleTime, totalCycle } = SCENE_TIMING;

  const cyclePos = t % totalCycle;
  const shapeIndex = Math.floor(cyclePos / cycleTime);
  const withinCycle = cyclePos % cycleTime;

  const sceneIndex = shapeIndex % 5;
  const scene = SCENE_ORDER[sceneIndex];
  const progress = withinCycle / cycleTime;

  return { scene, progress };
}

function initWebGL(canvas: OffscreenCanvas): boolean {
  gl = canvas.getContext('webgl', {
    antialias: false,
    depth: false,
    stencil: false,
    preserveDrawingBuffer: false,
  });

  if (!gl) {
    console.error('WebGL not supported in worker');
    return false;
  }

  const vs = createShader(gl, gl.VERTEX_SHADER, VERTEX_SHADER);
  const fs = createShader(gl, gl.FRAGMENT_SHADER, FRAGMENT_SHADER);

  if (!vs || !fs) return false;

  program = gl.createProgram();
  if (!program) return false;

  gl.attachShader(program, vs);
  gl.attachShader(program, fs);
  gl.linkProgram(program);

  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    console.error('Program link error:', gl.getProgramInfoLog(program));
    return false;
  }

  gl.useProgram(program);

  uniforms = {
    uResolution: gl.getUniformLocation(program, 'uResolution'),
    uTime: gl.getUniformLocation(program, 'uTime'),
    uPixelSize: gl.getUniformLocation(program, 'uPixelSize'),
    uSpeed: gl.getUniformLocation(program, 'uSpeed'),
  };

  // Create fullscreen quad
  const positions = new Float32Array([
    -1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1
  ]);

  const buffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
  gl.bufferData(gl.ARRAY_BUFFER, positions, gl.STATIC_DRAW);

  const posLoc = gl.getAttribLocation(program, 'a_position');
  gl.enableVertexAttribArray(posLoc);
  gl.vertexAttribPointer(posLoc, 2, gl.FLOAT, false, 0, 0);

  return true;
}

function startRenderLoop() {
  let frameCount = 0;
  let fpsTime = 0;

  const render = (t: number) => {
    if (!gl || !uniforms) {
      animationId = requestAnimationFrame(render);
      return;
    }

    const sec = t * 0.001;

    // FPS counter
    frameCount++;
    let fps = 0;
    if (t - fpsTime > 1000) {
      fps = frameCount;
      frameCount = 0;
      fpsTime = t;
    }

    // Update scene state less frequently (every 100ms)
    if (t - lastSceneUpdate > 100) {
      const { scene, progress } = calculateCurrentScene(sec, currentSpeed);

      // Only send message if scene changed
      if (scene !== currentScene) {
        currentScene = scene;
        self.postMessage({
          type: 'sceneUpdate',
          scene,
          progress,
          fps,
        } as SceneUpdate);
      }
      lastSceneUpdate = t;
    }

    gl.viewport(0, 0, canvasWidth, canvasHeight);
    gl.uniform2f(uniforms.uResolution, canvasWidth, canvasHeight);
    gl.uniform1f(uniforms.uTime, sec);
    gl.uniform1f(uniforms.uPixelSize, currentPixelSize);
    gl.uniform1f(uniforms.uSpeed, currentSpeed);
    gl.drawArrays(gl.TRIANGLES, 0, 6);

    animationId = requestAnimationFrame(render);
  };

  animationId = requestAnimationFrame(render);
}

function stopRenderLoop() {
  if (animationId !== null) {
    cancelAnimationFrame(animationId);
    animationId = null;
  }
}

self.onmessage = (e: MessageEvent<WorkerMessage>) => {
  const { data } = e;

  switch (data.type) {
    case 'init': {
      const { canvas, pixelSize, speed } = data;
      currentPixelSize = pixelSize;
      currentSpeed = speed;
      canvasWidth = canvas.width;
      canvasHeight = canvas.height;

      if (initWebGL(canvas)) {
        startRenderLoop();
        self.postMessage({ type: 'ready' });
      } else {
        self.postMessage({ type: 'error', message: 'Failed to initialize WebGL' });
      }
      break;
    }

    case 'update': {
      if (data.pixelSize !== undefined) currentPixelSize = data.pixelSize;
      if (data.speed !== undefined) currentSpeed = data.speed;
      if (data.width !== undefined) canvasWidth = data.width;
      if (data.height !== undefined) canvasHeight = data.height;
      break;
    }

    case 'stop': {
      stopRenderLoop();
      break;
    }
  }
};
