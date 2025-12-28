/**
 * WebGL Shaders for Hero Background
 * All patterns now SEAMLESSLY tile - no visible cell boundaries
 */

export const VERTEX_SHADER = `
  attribute vec2 a_position;
  void main() { gl_Position = vec4(a_position, 0.0, 1.0); }
`;

export const FRAGMENT_SHADER = `
precision mediump float;

uniform vec2 uResolution;
uniform float uTime;
uniform float uPixelSize;
uniform float uSpeed;

#define PI 3.14159265359
#define TAU 6.28318530718

float hash(float n) { return fract(sin(n) * 43758.5453); }

vec2 hash2(vec2 p) {
  return fract(sin(vec2(
    dot(p, vec2(127.1, 311.7)), 
    dot(p, vec2(269.5, 183.3))
  )) * 43758.5453);
}

// ═══════════════════════════════════════════════════════════════
// SHAPE 1: WAVE INTERFERENCE / RIPPLES
// Overlapping sine waves create natural interference pattern
// No cells - pure continuous math
// ═══════════════════════════════════════════════════════════════

float waveInterference(vec2 p, float time) {
  float rotation = time * 0.1;
  float c = cos(rotation), s = sin(rotation);
  p = vec2(c * p.x - s * p.y, s * p.x + c * p.y);
  
  // Multiple wave sources
  float wave = 0.0;
  
  // Source 1: origin
  wave += sin(length(p) * 25.0 - time * 0.5);
  
  // Source 2: offset
  wave += sin(length(p - vec2(0.3, 0.2)) * 22.0 - time * 0.4);
  
  // Source 3: another offset
  wave += sin(length(p + vec2(0.2, 0.3)) * 28.0 - time * 0.6);
  
  // Normalize and threshold
  wave = wave / 3.0;
  
  return wave * 0.04;  // Returns +/- values, threshold at 0
}

// ═══════════════════════════════════════════════════════════════
// SHAPE 2: HONEYCOMB (Already perfect)
// ═══════════════════════════════════════════════════════════════

float honeycomb(vec2 p, float rotation) {
  float c = cos(rotation), s = sin(rotation);
  p = vec2(c * p.x - s * p.y, s * p.x + c * p.y);

  float scale = 10.0;
  p *= scale;

  vec2 h = vec2(1.0, 1.73205);
  vec2 a = mod(p, h) - h * 0.5;
  vec2 b = mod(p - h * 0.5, h) - h * 0.5;

  vec2 gv = length(a) < length(b) ? a : b;

  float hex = max(abs(gv.x), abs(gv.x) * 0.5 + abs(gv.y) * 0.866);

  // Border dark, inside white: invert so walls are negative (dark)
  float wallThickness = 0.05;
  float distToWall = 0.5 - hex;  // Distance from edge
  return (distToWall - wallThickness) / scale;
}

// ═══════════════════════════════════════════════════════════════
// SHAPE 3: VORONOI (Optimized - two-pass 3x3)
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
      o = 0.5 + 0.4 * sin(time * 0.3 + TAU * o);

      vec2 r = g + o - f;
      float d = dot(r, r);

      if (d < md) {
        md = d;
        mr = r;
      }
    }
  }

  // Second pass: find distance to edge (3x3 is sufficient for most cases)
  md = 1.0;
  for (int j = -1; j <= 1; j++) {
    for (int i = -1; i <= 1; i++) {
      vec2 g = vec2(float(i), float(j));
      vec2 o = hash2(n + g);
      o = 0.5 + 0.4 * sin(time * 0.3 + TAU * o);
      vec2 r = g + o - f;

      if (dot(mr - r, mr - r) > 0.00001) {
        md = min(md, dot(0.5 * (mr + r), normalize(r - mr)));
      }
    }
  }

  return (md - 0.04) / scale;
}

// ═══════════════════════════════════════════════════════════════
// SHAPE 4: CONTINUOUS SPIRAL
// Single logarithmic spiral that spans entire viewport
// ═══════════════════════════════════════════════════════════════

float continuousSpiral(vec2 p, float time, float rotation) {
  // Center the spiral
  float r = length(p);
  float theta = atan(p.y, p.x);

  // Logarithmic spiral: map position to spiral space
  // r = a * e^(b * theta)  =>  theta = ln(r/a) / b
  float a = 0.005;
  float b = 0.12;

  // What theta would give us this radius on the spiral?
  float spiralTheta = log(max(r, 0.001) / a) / b;

  // Add spin rotation AND outward expansion
  float spin = time * 2.4;        // Rotation speed
  float expand = time * 4.0;      // Outward flow speed

  // How far is our actual angle from that spiral angle?
  // Use modulo to create multiple arms
  float arms = 3.0;
  float angleDiff = mod(theta + spin - (spiralTheta + expand) / arms + PI, TAU / arms) - PI / arms;

  // Convert angular difference to distance
  float dist = abs(angleDiff) * r;

  // Arm thickness
  float thickness = 0.015 + r * 0.02;

  return dist - thickness;
}

// ═══════════════════════════════════════════════════════════════
// SHAPE 5: CONCENTRIC RINGS (Continuous)
// Tree rings / topographic lines - no cell boundaries
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

  // Create rings using modulo
  float ringDist = mod(adjustedR, ringSpacing);

  // Distance to nearest ring edge
  float toRing = min(ringDist, ringSpacing - ringDist) - ringWidth;

  return toRing;
}

// ═══════════════════════════════════════════════════════════════
// SHAPE 6: DIAGONAL STRIPES
// Simple but effective - continuous diagonal lines
// ═══════════════════════════════════════════════════════════════

float diagonalStripes(vec2 p, float rotation) {
  float c = cos(rotation), s = sin(rotation);
  p = vec2(c * p.x - s * p.y, s * p.x + c * p.y);
  
  float spacing = 0.06;
  float width = 0.02;
  
  // Project onto diagonal
  float d = p.x + p.y;
  
  float stripeDist = mod(d, spacing);
  float toStripe = min(stripeDist, spacing - stripeDist) - width;
  
  return toStripe;
}

// ═══════════════════════════════════════════════════════════════
// SHAPE 7: DOT MATRIX (Seamless)
// Regular grid of dots - like halftone
// ═══════════════════════════════════════════════════════════════

float dotMatrix(vec2 p, float rotation) {
  float c = cos(rotation), s = sin(rotation);
  p = vec2(c * p.x - s * p.y, s * p.x + c * p.y);
  
  float scale = 12.0;
  p *= scale;
  
  // Simple grid
  vec2 cell = floor(p);
  vec2 local = fract(p) - 0.5;
  
  // Dot at center of each cell
  float dotSize = 0.3;
  float dist = length(local) - dotSize;
  
  return dist / scale;
}

// ═══════════════════════════════════════════════════════════════
// SHAPE 8: TRIANGULAR GRID
// Seamless triangle tessellation
// ═══════════════════════════════════════════════════════════════

float triangleGrid(vec2 p, float rotation) {
  float c = cos(rotation), s = sin(rotation);
  p = vec2(c * p.x - s * p.y, s * p.x + c * p.y);
  
  float scale = 12.0;
  p *= scale;
  
  // Triangular coordinates
  float x = p.x;
  float y = p.y * 1.1547;  // 2/sqrt(3)
  
  // Offset every other row
  float row = floor(y);
  x += mod(row, 2.0) * 0.5;
  
  // Get position in cell
  vec2 cell = vec2(floor(x), row);
  vec2 local = vec2(fract(x), fract(y)) - 0.5;
  
  // Triangle pointing up or down based on position
  float tri;
  if (mod(cell.x + cell.y, 2.0) < 1.0) {
    // Point up
    tri = max(abs(local.x) * 1.732 + local.y, -local.y * 2.0);
  } else {
    // Point down
    tri = max(abs(local.x) * 1.732 - local.y, local.y * 2.0);
  }
  
  // Return edge distance
  return (tri - 0.4) / scale;
}

// ═══════════════════════════════════════════════════════════════
// SHAPE MORPHING SYSTEM
// ═══════════════════════════════════════════════════════════════

vec2 morphingShape(vec2 p, float t) {
  float holdTime = 3.0;
  float transitionTime = 1.0;
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
  
  float rotation = t * 0.08;
  
  // All seamless patterns
  float d1 = waveInterference(p, t);
  float d2 = honeycomb(p, rotation * 0.5);
  float d3 = voronoi(p, t);
  float d4 = continuousSpiral(p, t, rotation);
  float d5 = concentricRings(p, t, rotation);
  
  // Blend between shapes
  float b1 = smoothstep(0.0, 1.0, shapePhase);
  float b2 = smoothstep(1.0, 2.0, shapePhase);
  float b3 = smoothstep(2.0, 3.0, shapePhase);
  float b4 = smoothstep(3.0, 4.0, shapePhase);
  float b5 = smoothstep(4.0, 5.0, shapePhase);
  
  float d = d1;
  d = mix(d, d2, b1);
  d = mix(d, d3, b2);
  d = mix(d, d4, b3);
  d = mix(d, d5, b4);
  d = mix(d, d1, b5);
  
  return vec2(d, shapePhase);
}

// ═══════════════════════════════════════════════════════════════
// DIGIT RENDERING
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

  // Morphing shape - seamless across viewport
  vec2 shapeResult = morphingShape(cellCenter, time * 0.9);
  float shapeDist = shapeResult.x;
  float shapeLayer = step(shapeDist, 0.0);

  float digit = shapeLayer > 0.5 ? digit1(digitUV) : digit0(digitUV);

  // Colors
  vec3 color0 = vec3(0.949, 0.949, 0.941);
  vec3 color1 = vec3(0.85, 0.87, 0.8);

  vec3 bgColor = vec3(0.90, 0.91, 0.89);
  vec3 digitColor = mix(color0, color1, shapeLayer);
  vec3 color = mix(bgColor, digitColor, digit);

  gl_FragColor = vec4(color, 1.0);
}
`;