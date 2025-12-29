(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,33525,(e,t,o)=>{"use strict";Object.defineProperty(o,"__esModule",{value:!0}),Object.defineProperty(o,"warnOnce",{enumerable:!0,get:function(){return r}});let r=e=>{}},30662,e=>{"use strict";let t=`
  attribute vec2 a_position;
  void main() { gl_Position = vec4(a_position, 0.0, 1.0); }
`,o=`
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
`;e.s(["FRAGMENT_SHADER",0,o,"SCENE_COLORS",0,{water:{bg:"#EDF7F6",fg:"#80CBC4",accent:"#00796B",text:"#00413A",textMuted:"#00695C"},hive:{bg:"#FDFAF2",fg:"#FFE082",accent:"#FFC107",text:"#5D4037",textMuted:"#8D6E63"},cell:{bg:"#F6FAF3",fg:"#AED581",accent:"#558B2F",text:"#2E5A1C",textMuted:"#4E7A2D"},shell:{bg:"#050508",fg:"#D95F80",accent:"#9794F2",text:"#FFFFFF",textMuted:"rgba(255, 255, 255, 0.7)",nebula:{pink:"#D95F80",purple:"#9794F2",teal:"#32738C",orange:"#F2935C",coral:"#F27052"}},wood:{bg:"#F5F3F2",fg:"#BCAAA4",accent:"#795548",text:"#3E2723",textMuted:"#8D6E63"}},"SCENE_ORDER",0,["water","hive","cell","shell","wood"],"SCENE_TIMING",0,{holdTime:4,transitionTime:1.5,get cycleTime(){return this.holdTime+this.transitionTime},get totalCycle(){return 5*this.cycleTime}},"VERTEX_SHADER",0,t])},79474,(e,t,o)=>{"use strict";var r=e.r(71645).__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;o.c=function(e){return r.H.useMemoCache(e)}},932,(e,t,o)=>{"use strict";t.exports=e.r(79474)},98183,(e,t,o)=>{"use strict";Object.defineProperty(o,"__esModule",{value:!0});var r={assign:function(){return c},searchParamsToUrlQuery:function(){return a},urlQueryToSearchParams:function(){return i}};for(var n in r)Object.defineProperty(o,n,{enumerable:!0,get:r[n]});function a(e){let t={};for(let[o,r]of e.entries()){let e=t[o];void 0===e?t[o]=r:Array.isArray(e)?e.push(r):t[o]=[e,r]}return t}function l(e){return"string"==typeof e?e:("number"!=typeof e||isNaN(e))&&"boolean"!=typeof e?"":String(e)}function i(e){let t=new URLSearchParams;for(let[o,r]of Object.entries(e))if(Array.isArray(r))for(let e of r)t.append(o,l(e));else t.set(o,l(r));return t}function c(e,...t){for(let o of t){for(let t of o.keys())e.delete(t);for(let[t,r]of o.entries())e.append(t,r)}return e}},95057,(e,t,o)=>{"use strict";Object.defineProperty(o,"__esModule",{value:!0});var r={formatUrl:function(){return i},formatWithValidation:function(){return s},urlObjectKeys:function(){return c}};for(var n in r)Object.defineProperty(o,n,{enumerable:!0,get:r[n]});let a=e.r(90809)._(e.r(98183)),l=/https?|ftp|gopher|file/;function i(e){let{auth:t,hostname:o}=e,r=e.protocol||"",n=e.pathname||"",i=e.hash||"",c=e.query||"",s=!1;t=t?encodeURIComponent(t).replace(/%3A/i,":")+"@":"",e.host?s=t+e.host:o&&(s=t+(~o.indexOf(":")?`[${o}]`:o),e.port&&(s+=":"+e.port)),c&&"object"==typeof c&&(c=String(a.urlQueryToSearchParams(c)));let u=e.search||c&&`?${c}`||"";return r&&!r.endsWith(":")&&(r+=":"),e.slashes||(!r||l.test(r))&&!1!==s?(s="//"+(s||""),n&&"/"!==n[0]&&(n="/"+n)):s||(s=""),i&&"#"!==i[0]&&(i="#"+i),u&&"?"!==u[0]&&(u="?"+u),n=n.replace(/[?#]/g,encodeURIComponent),u=u.replace("#","%23"),`${r}${s}${n}${u}${i}`}let c=["auth","hash","host","hostname","href","path","pathname","port","protocol","query","search","slashes"];function s(e){return i(e)}},18581,(e,t,o)=>{"use strict";Object.defineProperty(o,"__esModule",{value:!0}),Object.defineProperty(o,"useMergedRef",{enumerable:!0,get:function(){return n}});let r=e.r(71645);function n(e,t){let o=(0,r.useRef)(null),n=(0,r.useRef)(null);return(0,r.useCallback)(r=>{if(null===r){let e=o.current;e&&(o.current=null,e());let t=n.current;t&&(n.current=null,t())}else e&&(o.current=a(e,r)),t&&(n.current=a(t,r))},[e,t])}function a(e,t){if("function"!=typeof e)return e.current=t,()=>{e.current=null};{let o=e(t);return"function"==typeof o?o:()=>e(null)}}("function"==typeof o.default||"object"==typeof o.default&&null!==o.default)&&void 0===o.default.__esModule&&(Object.defineProperty(o.default,"__esModule",{value:!0}),Object.assign(o.default,o),t.exports=o.default)},18967,(e,t,o)=>{"use strict";Object.defineProperty(o,"__esModule",{value:!0});var r={DecodeError:function(){return v},MiddlewareNotFoundError:function(){return E},MissingStaticPage:function(){return y},NormalizeError:function(){return b},PageNotFoundError:function(){return C},SP:function(){return g},ST:function(){return m},WEB_VITALS:function(){return a},execOnce:function(){return l},getDisplayName:function(){return f},getLocationOrigin:function(){return s},getURL:function(){return u},isAbsoluteUrl:function(){return c},isResSent:function(){return p},loadGetInitialProps:function(){return h},normalizeRepeatedSlashes:function(){return d},stringifyError:function(){return P}};for(var n in r)Object.defineProperty(o,n,{enumerable:!0,get:r[n]});let a=["CLS","FCP","FID","INP","LCP","TTFB"];function l(e){let t,o=!1;return(...r)=>(o||(o=!0,t=e(...r)),t)}let i=/^[a-zA-Z][a-zA-Z\d+\-.]*?:/,c=e=>i.test(e);function s(){let{protocol:e,hostname:t,port:o}=window.location;return`${e}//${t}${o?":"+o:""}`}function u(){let{href:e}=window.location,t=s();return e.substring(t.length)}function f(e){return"string"==typeof e?e:e.displayName||e.name||"Unknown"}function p(e){return e.finished||e.headersSent}function d(e){let t=e.split("?");return t[0].replace(/\\/g,"/").replace(/\/\/+/g,"/")+(t[1]?`?${t.slice(1).join("?")}`:"")}async function h(e,t){let o=t.res||t.ctx&&t.ctx.res;if(!e.getInitialProps)return t.ctx&&t.Component?{pageProps:await h(t.Component,t.ctx)}:{};let r=await e.getInitialProps(t);if(o&&p(o))return r;if(!r)throw Object.defineProperty(Error(`"${f(e)}.getInitialProps()" should resolve to an object. But found "${r}" instead.`),"__NEXT_ERROR_CODE",{value:"E394",enumerable:!1,configurable:!0});return r}let g="undefined"!=typeof performance,m=g&&["mark","measure","getEntriesByName"].every(e=>"function"==typeof performance[e]);class v extends Error{}class b extends Error{}class C extends Error{constructor(e){super(),this.code="ENOENT",this.name="PageNotFoundError",this.message=`Cannot find module for page: ${e}`}}class y extends Error{constructor(e,t){super(),this.message=`Failed to load static file for page: ${e} ${t}`}}class E extends Error{constructor(){super(),this.code="ENOENT",this.message="Cannot find the middleware module"}}function P(e){return JSON.stringify({message:e.message,stack:e.stack})}},73668,(e,t,o)=>{"use strict";Object.defineProperty(o,"__esModule",{value:!0}),Object.defineProperty(o,"isLocalURL",{enumerable:!0,get:function(){return a}});let r=e.r(18967),n=e.r(52817);function a(e){if(!(0,r.isAbsoluteUrl)(e))return!0;try{let t=(0,r.getLocationOrigin)(),o=new URL(e,t);return o.origin===t&&(0,n.hasBasePath)(o.pathname)}catch(e){return!1}}},84508,(e,t,o)=>{"use strict";Object.defineProperty(o,"__esModule",{value:!0}),Object.defineProperty(o,"errorOnce",{enumerable:!0,get:function(){return r}});let r=e=>{}},22016,(e,t,o)=>{"use strict";Object.defineProperty(o,"__esModule",{value:!0});var r={default:function(){return v},useLinkStatus:function(){return C}};for(var n in r)Object.defineProperty(o,n,{enumerable:!0,get:r[n]});let a=e.r(90809),l=e.r(43476),i=a._(e.r(71645)),c=e.r(95057),s=e.r(8372),u=e.r(18581),f=e.r(18967),p=e.r(5550);e.r(33525);let d=e.r(91949),h=e.r(73668),g=e.r(9396);function m(e){return"string"==typeof e?e:(0,c.formatUrl)(e)}function v(t){var o;let r,n,a,[c,v]=(0,i.useOptimistic)(d.IDLE_LINK_STATUS),C=(0,i.useRef)(null),{href:y,as:E,children:P,prefetch:_=null,passHref:S,replace:T,shallow:x,scroll:F,onClick:O,onMouseEnter:L,onTouchStart:A,legacyBehavior:w=!1,onNavigate:R,ref:I,unstable_dynamicOnHover:k,...B}=t;r=P,w&&("string"==typeof r||"number"==typeof r)&&(r=(0,l.jsx)("a",{children:r}));let N=i.default.useContext(s.AppRouterContext),D=!1!==_,G=!1!==_?null===(o=_)||"auto"===o?g.FetchStrategy.PPR:g.FetchStrategy.Full:g.FetchStrategy.PPR,{href:j,as:U}=i.default.useMemo(()=>{let e=m(y);return{href:e,as:E?m(E):e}},[y,E]);if(w){if(r?.$$typeof===Symbol.for("react.lazy"))throw Object.defineProperty(Error("`<Link legacyBehavior>` received a direct child that is either a Server Component, or JSX that was loaded with React.lazy(). This is not supported. Either remove legacyBehavior, or make the direct child a Client Component that renders the Link's `<a>` tag."),"__NEXT_ERROR_CODE",{value:"E863",enumerable:!1,configurable:!0});n=i.default.Children.only(r)}let M=w?n&&"object"==typeof n&&n.ref:I,W=i.default.useCallback(e=>(null!==N&&(C.current=(0,d.mountLinkInstance)(e,j,N,G,D,v)),()=>{C.current&&((0,d.unmountLinkForCurrentNavigation)(C.current),C.current=null),(0,d.unmountPrefetchableInstance)(e)}),[D,j,N,G,v]),H={ref:(0,u.useMergedRef)(W,M),onClick(t){w||"function"!=typeof O||O(t),w&&n.props&&"function"==typeof n.props.onClick&&n.props.onClick(t),!N||t.defaultPrevented||function(t,o,r,n,a,l,c){if("undefined"!=typeof window){let s,{nodeName:u}=t.currentTarget;if("A"===u.toUpperCase()&&((s=t.currentTarget.getAttribute("target"))&&"_self"!==s||t.metaKey||t.ctrlKey||t.shiftKey||t.altKey||t.nativeEvent&&2===t.nativeEvent.which)||t.currentTarget.hasAttribute("download"))return;if(!(0,h.isLocalURL)(o)){a&&(t.preventDefault(),location.replace(o));return}if(t.preventDefault(),c){let e=!1;if(c({preventDefault:()=>{e=!0}}),e)return}let{dispatchNavigateAction:f}=e.r(99781);i.default.startTransition(()=>{f(r||o,a?"replace":"push",l??!0,n.current)})}}(t,j,U,C,T,F,R)},onMouseEnter(e){w||"function"!=typeof L||L(e),w&&n.props&&"function"==typeof n.props.onMouseEnter&&n.props.onMouseEnter(e),N&&D&&(0,d.onNavigationIntent)(e.currentTarget,!0===k)},onTouchStart:function(e){w||"function"!=typeof A||A(e),w&&n.props&&"function"==typeof n.props.onTouchStart&&n.props.onTouchStart(e),N&&D&&(0,d.onNavigationIntent)(e.currentTarget,!0===k)}};return(0,f.isAbsoluteUrl)(U)?H.href=U:w&&!S&&("a"!==n.type||"href"in n.props)||(H.href=(0,p.addBasePath)(U)),a=w?i.default.cloneElement(n,H):(0,l.jsx)("a",{...B,...H,children:r}),(0,l.jsx)(b.Provider,{value:c,children:a})}e.r(84508);let b=(0,i.createContext)(d.IDLE_LINK_STATUS),C=()=>(0,i.useContext)(b);("function"==typeof o.default||"object"==typeof o.default&&null!==o.default)&&void 0===o.default.__esModule&&(Object.defineProperty(o.default,"__esModule",{value:!0}),Object.assign(o.default,o),t.exports=o.default)}]);