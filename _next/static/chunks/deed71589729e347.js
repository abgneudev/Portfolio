(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,30662,e=>{"use strict";let o=`
  attribute vec2 a_position;
  void main() { gl_Position = vec4(a_position, 0.0, 1.0); }
`,t=`
precision mediump float;

uniform vec2 uResolution;
uniform float uTime;
uniform float uPixelSize;
uniform float uSpeed;

#define PI 3.14159265359
#define TAU 6.28318530718

// ═══════════════════════════════════════════════════════════════
// SCENE COLOR PALETTES (RGB normalized)
// Each scene has: background, foreground (digit color), accent
// Backgrounds are at 60% opacity (40% less) blended with white base
// ═══════════════════════════════════════════════════════════════

// Base white for mixing (to achieve 40% less opacity effect)
const vec3 BASE_WHITE = vec3(0.98, 0.98, 0.97);
const float BG_OPACITY = 0.6; // 40% less = 60% opacity

// Scene 0: Water - Teal mist (softened)
const vec3 WATER_BG_FULL = vec3(0.878, 0.949, 0.945);   // #E0F2F1
const vec3 WATER_FG = vec3(0.502, 0.796, 0.769);        // #80CBC4
const vec3 WATER_ACCENT = vec3(0.0, 0.588, 0.533);      // #00968F

// Scene 1: Hive - Warm amber (softened)
const vec3 HIVE_BG_FULL = vec3(1.0, 0.973, 0.882);      // #FFF8E1
const vec3 HIVE_FG = vec3(1.0, 0.878, 0.510);           // #FFE082
const vec3 HIVE_ACCENT = vec3(1.0, 0.757, 0.027);       // #FFC107

// Scene 2: Cell - Fresh green (softened)
const vec3 CELL_BG_FULL = vec3(0.945, 0.973, 0.914);    // #F1F8E9
const vec3 CELL_FG = vec3(0.682, 0.835, 0.506);         // #AED581
const vec3 CELL_ACCENT = vec3(0.545, 0.765, 0.290);     // #8BC34A

// Scene 3: Shell - Nebula space theme (inspired by hourglass nebula)
// Colors: Pink #D95F80, Purple #9794F2, Teal #32738C, Orange #F2935C, Coral #F27052
const vec3 SHELL_BG_FULL = vec3(0.02, 0.02, 0.04);      // Deep space black
const vec3 SHELL_FG = vec3(0.847, 0.373, 0.502);        // #D95F80 - Nebula pink
const vec3 SHELL_ACCENT = vec3(0.592, 0.580, 0.949);    // #9794F2 - Purple glow

// Scene 4: Wood - Earthy taupe (softened)
const vec3 WOOD_BG_FULL = vec3(0.937, 0.922, 0.914);    // #EFEBE9
const vec3 WOOD_FG = vec3(0.737, 0.667, 0.643);         // #BCAAA4
const vec3 WOOD_ACCENT = vec3(0.475, 0.333, 0.282);     // #795548

// Pre-compute softened backgrounds (60% of original color + 40% white)
// Exception: Shell uses full dark color for space theme
const vec3 WATER_BG = mix(BASE_WHITE, WATER_BG_FULL, BG_OPACITY);
const vec3 HIVE_BG = mix(BASE_WHITE, HIVE_BG_FULL, BG_OPACITY);
const vec3 CELL_BG = mix(BASE_WHITE, CELL_BG_FULL, BG_OPACITY);
const vec3 SHELL_BG = SHELL_BG_FULL;  // Full dark for space theme
const vec3 WOOD_BG = mix(BASE_WHITE, WOOD_BG_FULL, BG_OPACITY);

float hash(float n) { return fract(sin(n) * 43758.5453); }

vec2 hash2(vec2 p) {
  return fract(sin(vec2(
    dot(p, vec2(127.1, 311.7)),
    dot(p, vec2(269.5, 183.3))
  )) * 43758.5453);
}

// ═══════════════════════════════════════════════════════════════
// SCENE 0: WATER - Wave Interference Ripples
// Overlapping sine waves create natural interference pattern
// Animation: Slow rotation of wave sources
// ═══════════════════════════════════════════════════════════════

float waveInterference(vec2 p, float time) {
  // Subtle slow rotation
  float rotation = time * 0.08;
  float c = cos(rotation), s = sin(rotation);
  p = vec2(c * p.x - s * p.y, s * p.x + c * p.y);

  // Multiple wave sources creating interference
  float wave = 0.0;

  // Source 1: origin
  wave += sin(length(p) * 22.0 - time * 0.4);

  // Source 2: offset
  wave += sin(length(p - vec2(0.3, 0.2)) * 20.0 - time * 0.35);

  // Source 3: another offset
  wave += sin(length(p + vec2(0.2, 0.3)) * 24.0 - time * 0.45);

  // Normalize
  wave = wave / 3.0;

  return wave * 0.04;
}

// ═══════════════════════════════════════════════════════════════
// SCENE 1: HIVE - Rotating Honeycomb
// Perfect hexagonal tessellation
// Animation: Slow rotation (rotation param, not time)
// ═══════════════════════════════════════════════════════════════

float honeycomb(vec2 p, float rotation) {
  // Slow rotation - rotation is pre-calculated as time * 0.08
  float c = cos(rotation), s = sin(rotation);
  p = vec2(c * p.x - s * p.y, s * p.x + c * p.y);

  float scale = 10.0;
  p *= scale;

  vec2 h = vec2(1.0, 1.73205);
  vec2 a = mod(p, h) - h * 0.5;
  vec2 b = mod(p - h * 0.5, h) - h * 0.5;

  vec2 gv = length(a) < length(b) ? a : b;

  float hex = max(abs(gv.x), abs(gv.x) * 0.5 + abs(gv.y) * 0.866);

  float wallThickness = 0.05;
  float distToWall = 0.5 - hex;
  return (distToWall - wallThickness) / scale;
}

// ═══════════════════════════════════════════════════════════════
// SCENE 2: CELL - Voronoi (Cell biology simulation)
// Organic cell-like patterns
// Animation: Cell centers slowly drift
// ═══════════════════════════════════════════════════════════════

float voronoi(vec2 p, float time) {
  float scale = 4.0;
  p *= scale;

  vec2 n = floor(p);
  vec2 f = fract(p);

  float md = 1.0;
  vec2 mr = vec2(0.0);

  // First pass: find nearest cell center
  for (int j = -1; j <= 1; j++) {
    for (int i = -1; i <= 1; i++) {
      vec2 g = vec2(float(i), float(j));
      vec2 o = hash2(n + g);
      // Slow organic drift
      o = 0.5 + 0.4 * sin(time * 0.25 + TAU * o);

      vec2 r = g + o - f;
      float d = dot(r, r);

      if (d < md) {
        md = d;
        mr = r;
      }
    }
  }

  // Second pass: find distance to edge
  md = 1.0;
  for (int j = -1; j <= 1; j++) {
    for (int i = -1; i <= 1; i++) {
      vec2 g = vec2(float(i), float(j));
      vec2 o = hash2(n + g);
      o = 0.5 + 0.4 * sin(time * 0.25 + TAU * o);
      vec2 r = g + o - f;

      if (dot(mr - r, mr - r) > 0.00001) {
        md = min(md, dot(0.5 * (mr + r), normalize(r - mr)));
      }
    }
  }

  return (md - 0.04) / scale;
}

// ═══════════════════════════════════════════════════════════════
// SCENE 3: SHELL - Logarithmic Spiral
// Golden ratio geometry
// Animation: Spiral rotation and outward expansion
// ═══════════════════════════════════════════════════════════════

float continuousSpiral(vec2 p, float time, float rotation) {
  float r = length(p);
  float theta = atan(p.y, p.x);

  // Logarithmic spiral parameters
  float a = 0.005;
  float b = 0.12;

  float spiralTheta = log(max(r, 0.001) / a) / b;

  // Add spin rotation AND outward expansion
  float spin = time * 2.4;
  float expand = time * 4.0;

  float arms = 3.0;
  float angleDiff = mod(theta + spin - (spiralTheta + expand) / arms + PI, TAU / arms) - PI / arms;

  float dist = abs(angleDiff) * r;

  // Arm thickness
  float thickness = 0.015 + r * 0.02;

  return dist - thickness;
}

// ═══════════════════════════════════════════════════════════════
// SCENE 4: WOOD - Concentric Rings
// Tree rings / dendrochronology
// Animation: Rings slowly expand outward
// ═══════════════════════════════════════════════════════════════

float concentricRings(vec2 p, float time, float rotation) {
  float r = length(p);
  float theta = atan(p.y, p.x);

  // Organic wobble based on angle - faster animation
  float wobble = 0.015 * sin(theta * 6.0 + rotation * 2.0)
               + 0.010 * sin(theta * 10.0 - rotation * 1.5)
               + 0.006 * sin(theta * 15.0 + rotation * 2.5);

  // Outward pulse - rings expand over time
  float pulse = time * 0.16;

  float adjustedR = r + wobble - pulse;

  // Ring parameters
  float ringSpacing = 0.16;
  float ringWidth = 0.006;

  float ringDist = mod(adjustedR, ringSpacing);
  float toRing = min(ringDist, ringSpacing - ringDist) - ringWidth;

  return toRing;
}

// ═══════════════════════════════════════════════════════════════
// COLOR INTERPOLATION FUNCTIONS
// ═══════════════════════════════════════════════════════════════

vec3 getBackgroundColor(float phase) {
  float p = mod(phase, 5.0);

  vec3 c0 = WATER_BG;
  vec3 c1 = HIVE_BG;
  vec3 c2 = CELL_BG;
  vec3 c3 = SHELL_BG;
  vec3 c4 = WOOD_BG;

  vec3 color = c0;
  color = mix(color, c1, smoothstep(0.0, 1.0, p));
  color = mix(color, c2, smoothstep(1.0, 2.0, p));
  color = mix(color, c3, smoothstep(2.0, 3.0, p));
  color = mix(color, c4, smoothstep(3.0, 4.0, p));
  color = mix(color, c0, smoothstep(4.0, 5.0, p));

  return color;
}

vec3 getForegroundColor(float phase) {
  float p = mod(phase, 5.0);

  vec3 c0 = WATER_FG;
  vec3 c1 = HIVE_FG;
  vec3 c2 = CELL_FG;
  vec3 c3 = SHELL_FG;
  vec3 c4 = WOOD_FG;

  vec3 color = c0;
  color = mix(color, c1, smoothstep(0.0, 1.0, p));
  color = mix(color, c2, smoothstep(1.0, 2.0, p));
  color = mix(color, c3, smoothstep(2.0, 3.0, p));
  color = mix(color, c4, smoothstep(3.0, 4.0, p));
  color = mix(color, c0, smoothstep(4.0, 5.0, p));

  return color;
}

// ═══════════════════════════════════════════════════════════════
// SHAPE MORPHING SYSTEM
// 5 scenes with smooth transitions
// ═══════════════════════════════════════════════════════════════

vec2 morphingShape(vec2 p, float t) {
  float holdTime = 4.0;      // Hold each scene for 4 seconds
  float transitionTime = 1.5; // Smooth 1.5s transition
  float cycleTime = holdTime + transitionTime;
  float numShapes = 5.0;
  float totalCycle = cycleTime * numShapes;

  float cyclePos = mod(t, totalCycle);
  float shapeIndex = floor(cyclePos / cycleTime);
  float withinCycle = mod(cyclePos, cycleTime);

  float transitionProgress = 0.0;
  if (withinCycle > holdTime) {
    transitionProgress = (withinCycle - holdTime) / transitionTime;
    transitionProgress = smoothstep(0.0, 1.0, transitionProgress);
  }
  float shapePhase = shapeIndex + transitionProgress;

  // Pre-calculate rotation for honeycomb (matches original working code)
  float rotation = t * 0.08;

  // All 5 seamless patterns
  float d0 = waveInterference(p, t);
  float d1 = honeycomb(p, rotation * 0.5);  // Pass rotation, not raw time
  float d2 = voronoi(p, t);
  float d3 = continuousSpiral(p, t, rotation);
  float d4 = concentricRings(p, t, rotation);

  // Blend between shapes
  float b1 = smoothstep(0.0, 1.0, shapePhase);
  float b2 = smoothstep(1.0, 2.0, shapePhase);
  float b3 = smoothstep(2.0, 3.0, shapePhase);
  float b4 = smoothstep(3.0, 4.0, shapePhase);
  float b5 = smoothstep(4.0, 5.0, shapePhase);

  float d = d0;
  d = mix(d, d1, b1);
  d = mix(d, d2, b2);
  d = mix(d, d3, b3);
  d = mix(d, d4, b4);
  d = mix(d, d0, b5);

  return vec2(d, shapePhase);
}

// ═══════════════════════════════════════════════════════════════
// DIGIT RENDERING (0 and 1)
// ═══════════════════════════════════════════════════════════════

float digit0(vec2 p) {
  vec2 c = (p - vec2(2.0, 2.5)) / vec2(1.3, 2.0);
  float outer = length(c) - 1.0;
  float inner = length(c) - 0.5;
  return 1.0 - smoothstep(-0.15, 0.15, max(outer, -inner));
}

float digit1(vec2 p) {
  float d = 1000.0;
  vec2 barP = p - vec2(2.0, 2.5);
  d = min(d, max(abs(barP.x) - 0.35, abs(barP.y) - 2.2));
  vec2 slantP = p - vec2(1.3, 4.0);
  d = min(d, max(abs(slantP.x + slantP.y * 0.5) - 0.25, abs(slantP.y) - 0.6));
  vec2 baseP = p - vec2(2.0, 0.35);
  d = min(d, max(abs(baseP.x) - 1.0, abs(baseP.y) - 0.35));
  return 1.0 - smoothstep(-0.15, 0.2, d);
}

// ═══════════════════════════════════════════════════════════════
// MAIN
// ═══════════════════════════════════════════════════════════════

void main() {
  vec2 uv = gl_FragCoord.xy / uResolution;
  float aspect = uResolution.x / uResolution.y;
  vec2 st = (uv - 0.5) * vec2(aspect, 1.0);

  float cellSize = uPixelSize;
  vec2 cellUV = st * cellSize;
  vec2 cellID = floor(cellUV);
  vec2 cellLocal = fract(cellUV);
  vec2 digitUV = cellLocal * 5.0;
  vec2 cellCenter = (cellID + 0.5) / cellSize;

  float time = uTime * uSpeed;

  // Get morphing shape and current phase
  vec2 shapeResult = morphingShape(cellCenter, time * 0.8);
  float shapeDist = shapeResult.x;
  float shapePhase = shapeResult.y;
  float shapeLayer = step(shapeDist, 0.0);

  // Select digit based on shape
  float digit = shapeLayer > 0.5 ? digit1(digitUV) : digit0(digitUV);

  // Get scene-specific colors
  vec3 bgColor = getBackgroundColor(shapePhase);
  vec3 fgColor = getForegroundColor(shapePhase);

  // Slightly different shade for 0s vs 1s for depth
  vec3 digitColor0 = mix(bgColor, fgColor, 0.15);  // 0s: subtle tint
  vec3 digitColor1 = mix(bgColor, fgColor, 0.64);  // 1s: full foreground

  // Space scene (shell/spiral): Nebula colors spreading from center
  // Colors: Pink #D95F80, Purple #9794F2, Teal #32738C, Orange #F2935C, Coral #F27052
  // Precise timing: fully active at phase 3.0, fade out completely by 3.5 (before wood transition shows)
  float spaceBlend = smoothstep(2.5, 3.0, shapePhase) * (1.0 - smoothstep(3.0, 3.5, shapePhase));
  if (spaceBlend > 0.0) {
    // Nebula color palette
    vec3 nebulaPink = vec3(0.847, 0.373, 0.502);    // #D95F80
    vec3 nebulaPurple = vec3(0.592, 0.580, 0.949);  // #9794F2
    vec3 nebulaTeal = vec3(0.196, 0.451, 0.549);    // #32738C
    vec3 nebulaOrange = vec3(0.949, 0.576, 0.361);  // #F2935C
    vec3 nebulaCoral = vec3(0.949, 0.439, 0.322);   // #F27052

    // Calculate angle and distance from center for color distribution
    float angle = atan(cellCenter.y, cellCenter.x);
    float dist = length(cellCenter);

    // Normalize angle to 0-1 range
    float normalizedAngle = (angle + PI) / TAU;

    // Create nebula color gradient based on angle (like hourglass nebula)
    // Left side: orange/coral, Center: bright core, Right side: teal/purple
    vec3 nebulaColor;
    float anglePos = normalizedAngle;

    // Create smooth color transitions around the circle
    // 0.0 = right, 0.25 = top, 0.5 = left, 0.75 = bottom
    if (anglePos < 0.15 || anglePos > 0.85) {
      // Right side - Teal to Purple
      float t = anglePos < 0.15 ? anglePos / 0.15 : (1.0 - anglePos) / 0.15;
      nebulaColor = mix(nebulaTeal, nebulaPurple, t);
    } else if (anglePos < 0.35) {
      // Top right - Purple to Pink
      float t = (anglePos - 0.15) / 0.2;
      nebulaColor = mix(nebulaPurple, nebulaPink, t);
    } else if (anglePos < 0.5) {
      // Top left - Pink to Orange
      float t = (anglePos - 0.35) / 0.15;
      nebulaColor = mix(nebulaPink, nebulaOrange, t);
    } else if (anglePos < 0.65) {
      // Left - Orange to Coral (warm center)
      float t = (anglePos - 0.5) / 0.15;
      nebulaColor = mix(nebulaOrange, nebulaCoral, t);
    } else if (anglePos < 0.85) {
      // Bottom - Coral back to Teal
      float t = (anglePos - 0.65) / 0.2;
      nebulaColor = mix(nebulaCoral, nebulaTeal, t);
    }

    // Intensity falloff from center (brighter at center like nebula core)
    float coreGlow = exp(-dist * 2.5) * 0.5;
    vec3 coreColor = mix(nebulaOrange, nebulaCoral, 0.5); // Warm bright core
    nebulaColor = mix(nebulaColor, coreColor, coreGlow);

    // Add twinkling effect for nebula colors
    float twinklePhase = hash(cellID.x * 127.1 + cellID.y * 311.7);
    float twinkleSpeed = 2.0 + twinklePhase * 3.0;
    float twinkle = 0.5 + 0.5 * sin(time * twinkleSpeed + twinklePhase * 6.28);
    twinkle = mix(0.4, 1.0, twinkle);

    // Apply nebula colors to digits - override completely during space scene
    if (shapeLayer > 0.5) {
      digitColor1 = mix(digitColor1, nebulaColor * twinkle, spaceBlend);
    } else {
      // Subtle nebula tint for 0s too
      digitColor0 = mix(digitColor0, nebulaColor * 0.15, spaceBlend);
    }

    // Random blinking stars overlay - bright white 1s that blink randomly
    // Only ~5% of cells become stars, blinking on/off
    float starSeed = hash(cellID.x * 73.156 + cellID.y * 419.321);
    if (starSeed > 0.995) {  // Only 5% of cells are stars
      // Each star has unique blink timing and duration
      float blinkOffset = hash(cellID.x * 231.7 + cellID.y * 157.3) * 10.0;
      float blinkSpeed = 1.0 + hash(cellID.y * 89.1 + cellID.x * 443.7) * 2.0;  // 1-3 second cycle

      // Sharp on/off blink pattern (not smooth sine)
      float blinkCycle = mod(time * blinkSpeed + blinkOffset, 3.0);  // 3 second total cycle
      float isOn = step(2.0, blinkCycle);  // On for last 1 second of cycle

      // Make stars bright white and override digit color when blinking
      vec3 starColor = vec3(1.0, 1.0, 1.0);  // Pure white

      // Apply star to both 0s and 1s when star is "on"
      float starIntensity = isOn * spaceBlend;
      digitColor0 = mix(digitColor0, starColor, starIntensity * 0.8);
      digitColor1 = mix(digitColor1, starColor, starIntensity);
    }
  }

  vec3 digitColor = mix(digitColor0, digitColor1, shapeLayer);
  vec3 color = mix(bgColor, digitColor, digit);

  gl_FragColor = vec4(color, 1.0);
}
`;e.s(["FRAGMENT_SHADER",0,t,"SCENE_COLORS",0,{water:{bg:"#EDF7F6",fg:"#80CBC4",accent:"#00796B",text:"#00413A",textMuted:"#00695C"},hive:{bg:"#FDFAF2",fg:"#FFE082",accent:"#FFC107",text:"#5D4037",textMuted:"#8D6E63"},cell:{bg:"#F6FAF3",fg:"#AED581",accent:"#558B2F",text:"#2E5A1C",textMuted:"#4E7A2D"},shell:{bg:"#050508",fg:"#D95F80",accent:"#9794F2",text:"#FFFFFF",textMuted:"rgba(255, 255, 255, 0.7)",nebula:{pink:"#D95F80",purple:"#9794F2",teal:"#32738C",orange:"#F2935C",coral:"#F27052"}},wood:{bg:"#F5F3F2",fg:"#BCAAA4",accent:"#795548",text:"#3E2723",textMuted:"#8D6E63"}},"SCENE_ORDER",0,["water","hive","cell","shell","wood"],"SCENE_TIMING",0,{holdTime:4,transitionTime:1.5,get cycleTime(){return this.holdTime+this.transitionTime},get totalCycle(){return 5*this.cycleTime}},"VERTEX_SHADER",0,o])},13883,e=>{"use strict";var o=e.i(30662);let t=null,a=null,l=null,i=null,r=40,n=1,s=1920,c=1080,f=0,p="water";function d(e,o,t){let a=e.createShader(o);return a?(e.shaderSource(a,t),e.compileShader(a),e.getShaderParameter(a,e.COMPILE_STATUS))?a:(console.error("Shader compile error:",e.getShaderInfoLog(a)),e.deleteShader(a),null):null}self.onmessage=e=>{let{data:m}=e;switch(m.type){case"init":{let{canvas:e,pixelSize:g,speed:h}=m;if(r=g,n=h,s=e.width,c=e.height,function(e){if(!(t=e.getContext("webgl",{antialias:!1,depth:!1,stencil:!1,preserveDrawingBuffer:!1})))return console.error("WebGL not supported in worker"),!1;let i=d(t,t.VERTEX_SHADER,o.VERTEX_SHADER),r=d(t,t.FRAGMENT_SHADER,o.FRAGMENT_SHADER);if(!i||!r||!(a=t.createProgram()))return!1;if(t.attachShader(a,i),t.attachShader(a,r),t.linkProgram(a),!t.getProgramParameter(a,t.LINK_STATUS))return console.error("Program link error:",t.getProgramInfoLog(a)),!1;t.useProgram(a),l={uResolution:t.getUniformLocation(a,"uResolution"),uTime:t.getUniformLocation(a,"uTime"),uPixelSize:t.getUniformLocation(a,"uPixelSize"),uSpeed:t.getUniformLocation(a,"uSpeed")};let n=new Float32Array([-1,-1,1,-1,-1,1,-1,1,1,-1,1,1]),s=t.createBuffer();t.bindBuffer(t.ARRAY_BUFFER,s),t.bufferData(t.ARRAY_BUFFER,n,t.STATIC_DRAW);let c=t.getAttribLocation(a,"a_position");return t.enableVertexAttribArray(c),t.vertexAttribPointer(c,2,t.FLOAT,!1,0,0),!0}(e)){let e,a,d;e=0,a=0,d=m=>{if(!t||!l){i=requestAnimationFrame(d);return}let g=.001*m;e++;let h=0;if(m-a>1e3&&(h=e,e=0,a=m),m-f>100){let{scene:e,progress:t}=function(e,t){let{holdTime:a,transitionTime:l,cycleTime:i,totalCycle:r}=o.SCENE_TIMING,n=(e+1)*t*.8%r,s=Math.floor(n/i);return{scene:o.SCENE_ORDER[s%5],progress:n%i/i}}(g,n);e!==p&&(p=e,self.postMessage({type:"sceneUpdate",scene:e,progress:t,fps:h})),f=m}t.viewport(0,0,s,c),t.uniform2f(l.uResolution,s,c),t.uniform1f(l.uTime,g),t.uniform1f(l.uPixelSize,r),t.uniform1f(l.uSpeed,n),t.drawArrays(t.TRIANGLES,0,6),i=requestAnimationFrame(d)},i=requestAnimationFrame(d),self.postMessage({type:"ready"})}else self.postMessage({type:"error",message:"Failed to initialize WebGL"});break}case"update":void 0!==m.pixelSize&&(r=m.pixelSize),void 0!==m.speed&&(n=m.speed),void 0!==m.width&&(s=m.width),void 0!==m.height&&(c=m.height);break;case"stop":null!==i&&(cancelAnimationFrame(i),i=null)}},e.s([])}]);