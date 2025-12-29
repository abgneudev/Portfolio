(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,13883,e=>{"use strict";let o=["water","hive","cell","shell","wood"],t={holdTime:4,transitionTime:1.5,get cycleTime(){return this.holdTime+this.transitionTime},get totalCycle(){return 5*this.cycleTime}},l=`
  attribute vec2 a_position;
  void main() { gl_Position = vec4(a_position, 0.0, 1.0); }
`,a=`
precision mediump float;

uniform vec2 uResolution;
uniform float uTime;
uniform float uPixelSize;
uniform float uSpeed;

#define PI 3.14159265359
#define TAU 6.28318530718

const vec3 BASE_WHITE = vec3(0.98, 0.98, 0.97);
const float BG_OPACITY = 0.6;

const vec3 WATER_BG_FULL = vec3(0.878, 0.949, 0.945);
const vec3 WATER_FG = vec3(0.502, 0.796, 0.769);
const vec3 WATER_ACCENT = vec3(0.0, 0.588, 0.533);

const vec3 HIVE_BG_FULL = vec3(1.0, 0.973, 0.882);
const vec3 HIVE_FG = vec3(1.0, 0.878, 0.510);
const vec3 HIVE_ACCENT = vec3(1.0, 0.757, 0.027);

const vec3 CELL_BG_FULL = vec3(0.945, 0.973, 0.914);
const vec3 CELL_FG = vec3(0.682, 0.835, 0.506);
const vec3 CELL_ACCENT = vec3(0.545, 0.765, 0.290);

const vec3 SHELL_BG_FULL = vec3(0.02, 0.02, 0.04);
const vec3 SHELL_FG = vec3(0.847, 0.373, 0.502);
const vec3 SHELL_ACCENT = vec3(0.592, 0.580, 0.949);

const vec3 WOOD_BG_FULL = vec3(0.937, 0.922, 0.914);
const vec3 WOOD_FG = vec3(0.737, 0.667, 0.643);
const vec3 WOOD_ACCENT = vec3(0.475, 0.333, 0.282);

const vec3 WATER_BG = mix(BASE_WHITE, WATER_BG_FULL, BG_OPACITY);
const vec3 HIVE_BG = mix(BASE_WHITE, HIVE_BG_FULL, BG_OPACITY);
const vec3 CELL_BG = mix(BASE_WHITE, CELL_BG_FULL, BG_OPACITY);
const vec3 SHELL_BG = SHELL_BG_FULL;
const vec3 WOOD_BG = mix(BASE_WHITE, WOOD_BG_FULL, BG_OPACITY);

float hash(float n) { return fract(sin(n) * 43758.5453); }

vec2 hash2(vec2 p) {
  return fract(sin(vec2(
    dot(p, vec2(127.1, 311.7)),
    dot(p, vec2(269.5, 183.3))
  )) * 43758.5453);
}

float waveInterference(vec2 p, float time) {
  float rotation = time * 0.08;
  float c = cos(rotation), s = sin(rotation);
  p = vec2(c * p.x - s * p.y, s * p.x + c * p.y);
  float wave = 0.0;
  wave += sin(length(p) * 22.0 - time * 0.4);
  wave += sin(length(p - vec2(0.3, 0.2)) * 20.0 - time * 0.35);
  wave += sin(length(p + vec2(0.2, 0.3)) * 24.0 - time * 0.45);
  wave = wave / 3.0;
  return wave * 0.04;
}

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
  float wallThickness = 0.05;
  float distToWall = 0.5 - hex;
  return (distToWall - wallThickness) / scale;
}

float voronoi(vec2 p, float time) {
  float scale = 4.0;
  p *= scale;
  vec2 n = floor(p);
  vec2 f = fract(p);
  float md = 1.0;
  vec2 mr = vec2(0.0);
  for (int j = -1; j <= 1; j++) {
    for (int i = -1; i <= 1; i++) {
      vec2 g = vec2(float(i), float(j));
      vec2 o = hash2(n + g);
      o = 0.5 + 0.4 * sin(time * 0.25 + TAU * o);
      vec2 r = g + o - f;
      float d = dot(r, r);
      if (d < md) {
        md = d;
        mr = r;
      }
    }
  }
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

float continuousSpiral(vec2 p, float time, float rotation) {
  float r = length(p);
  float theta = atan(p.y, p.x);
  float a = 0.005;
  float b = 0.12;
  float spiralTheta = log(max(r, 0.001) / a) / b;
  float spin = time * 2.4;
  float expand = time * 4.0;
  float arms = 3.0;
  float angleDiff = mod(theta + spin - (spiralTheta + expand) / arms + PI, TAU / arms) - PI / arms;
  float dist = abs(angleDiff) * r;
  float thickness = 0.015 + r * 0.02;
  return dist - thickness;
}

float concentricRings(vec2 p, float time, float rotation) {
  float r = length(p);
  float theta = atan(p.y, p.x);
  float wobble = 0.015 * sin(theta * 6.0 + rotation * 2.0)
               + 0.010 * sin(theta * 10.0 - rotation * 1.5)
               + 0.006 * sin(theta * 15.0 + rotation * 2.5);
  float pulse = time * 0.16;
  float adjustedR = r + wobble - pulse;
  float ringSpacing = 0.16;
  float ringWidth = 0.006;
  float ringDist = mod(adjustedR, ringSpacing);
  float toRing = min(ringDist, ringSpacing - ringDist) - ringWidth;
  return toRing;
}

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

vec2 morphingShape(vec2 p, float t) {
  float holdTime = 4.0;
  float transitionTime = 1.5;
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
  float d0 = waveInterference(p, t);
  float d1 = honeycomb(p, rotation * 0.5);
  float d2 = voronoi(p, t);
  float d3 = continuousSpiral(p, t, rotation);
  float d4 = concentricRings(p, t, rotation);
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
  vec2 shapeResult = morphingShape(cellCenter, time * 0.8);
  float shapeDist = shapeResult.x;
  float shapePhase = shapeResult.y;
  float shapeLayer = step(shapeDist, 0.0);
  float digit = shapeLayer > 0.5 ? digit1(digitUV) : digit0(digitUV);
  vec3 bgColor = getBackgroundColor(shapePhase);
  vec3 fgColor = getForegroundColor(shapePhase);
  vec3 digitColor0 = mix(bgColor, fgColor, 0.15);
  vec3 digitColor1 = mix(bgColor, fgColor, 0.64);
  float spaceBlend = smoothstep(2.5, 3.0, shapePhase) * (1.0 - smoothstep(3.0, 3.5, shapePhase));
  if (spaceBlend > 0.0) {
    vec3 nebulaPink = vec3(0.847, 0.373, 0.502);
    vec3 nebulaPurple = vec3(0.592, 0.580, 0.949);
    vec3 nebulaTeal = vec3(0.196, 0.451, 0.549);
    vec3 nebulaOrange = vec3(0.949, 0.576, 0.361);
    vec3 nebulaCoral = vec3(0.949, 0.439, 0.322);
    float angle = atan(cellCenter.y, cellCenter.x);
    float dist = length(cellCenter);
    float normalizedAngle = (angle + PI) / TAU;
    vec3 nebulaColor;
    float anglePos = normalizedAngle;
    if (anglePos < 0.15 || anglePos > 0.85) {
      float t = anglePos < 0.15 ? anglePos / 0.15 : (1.0 - anglePos) / 0.15;
      nebulaColor = mix(nebulaTeal, nebulaPurple, t);
    } else if (anglePos < 0.35) {
      float t = (anglePos - 0.15) / 0.2;
      nebulaColor = mix(nebulaPurple, nebulaPink, t);
    } else if (anglePos < 0.5) {
      float t = (anglePos - 0.35) / 0.15;
      nebulaColor = mix(nebulaPink, nebulaOrange, t);
    } else if (anglePos < 0.65) {
      float t = (anglePos - 0.5) / 0.15;
      nebulaColor = mix(nebulaOrange, nebulaCoral, t);
    } else if (anglePos < 0.85) {
      float t = (anglePos - 0.65) / 0.2;
      nebulaColor = mix(nebulaCoral, nebulaTeal, t);
    }
    float coreGlow = exp(-dist * 2.5) * 0.5;
    vec3 coreColor = mix(nebulaOrange, nebulaCoral, 0.5);
    nebulaColor = mix(nebulaColor, coreColor, coreGlow);
    float twinklePhase = hash(cellID.x * 127.1 + cellID.y * 311.7);
    float twinkleSpeed = 2.0 + twinklePhase * 3.0;
    float twinkle = 0.5 + 0.5 * sin(time * twinkleSpeed + twinklePhase * 6.28);
    twinkle = mix(0.4, 1.0, twinkle);
    if (shapeLayer > 0.5) {
      digitColor1 = mix(digitColor1, nebulaColor * twinkle, spaceBlend);
    } else {
      digitColor0 = mix(digitColor0, nebulaColor * 0.15, spaceBlend);
    }
    float starSeed = hash(cellID.x * 73.156 + cellID.y * 419.321);
    if (starSeed > 0.995) {
      float blinkOffset = hash(cellID.x * 231.7 + cellID.y * 157.3) * 10.0;
      float blinkSpeed = 1.0 + hash(cellID.y * 89.1 + cellID.x * 443.7) * 2.0;
      float blinkCycle = mod(time * blinkSpeed + blinkOffset, 3.0);
      float isOn = step(2.0, blinkCycle);
      vec3 starColor = vec3(1.0, 1.0, 1.0);
      float starIntensity = isOn * spaceBlend;
      digitColor0 = mix(digitColor0, starColor, starIntensity * 0.8);
      digitColor1 = mix(digitColor1, starColor, starIntensity);
    }
  }
  vec3 digitColor = mix(digitColor0, digitColor1, shapeLayer);
  vec3 color = mix(bgColor, digitColor, digit);
  gl_FragColor = vec4(color, 1.0);
}
`,i=null,r=null,n=null,c=null,s=40,f=1,m=1920,p=1080,d=0,h="water";function v(e,o,t){let l=e.createShader(o);return l?(e.shaderSource(l,t),e.compileShader(l),e.getShaderParameter(l,e.COMPILE_STATUS))?l:(console.error("Shader compile error:",e.getShaderInfoLog(l)),e.deleteShader(l),null):null}self.onmessage=e=>{let{data:g}=e;switch(g.type){case"init":{let{canvas:e,pixelSize:u,speed:b}=g;if(s=u,f=b,m=e.width,p=e.height,function(e){if(!(i=e.getContext("webgl",{antialias:!1,depth:!1,stencil:!1,preserveDrawingBuffer:!1})))return console.error("WebGL not supported in worker"),!1;let o=v(i,i.VERTEX_SHADER,l),t=v(i,i.FRAGMENT_SHADER,a);if(!o||!t||!(r=i.createProgram()))return!1;if(i.attachShader(r,o),i.attachShader(r,t),i.linkProgram(r),!i.getProgramParameter(r,i.LINK_STATUS))return console.error("Program link error:",i.getProgramInfoLog(r)),!1;i.useProgram(r),n={uResolution:i.getUniformLocation(r,"uResolution"),uTime:i.getUniformLocation(r,"uTime"),uPixelSize:i.getUniformLocation(r,"uPixelSize"),uSpeed:i.getUniformLocation(r,"uSpeed")};let c=new Float32Array([-1,-1,1,-1,-1,1,-1,1,1,-1,1,1]),s=i.createBuffer();i.bindBuffer(i.ARRAY_BUFFER,s),i.bufferData(i.ARRAY_BUFFER,c,i.STATIC_DRAW);let f=i.getAttribLocation(r,"a_position");return i.enableVertexAttribArray(f),i.vertexAttribPointer(f,2,i.FLOAT,!1,0,0),!0}(e)){let e,l,a;e=0,l=0,a=r=>{if(!i||!n){c=requestAnimationFrame(a);return}let v=.001*r;e++;let g=0;if(r-l>1e3&&(g=e,e=0,l=r),r-d>100){let{scene:e,progress:l}=function(e,l){let{holdTime:a,transitionTime:i,cycleTime:r,totalCycle:n}=t,c=(e+1)*l*.8%n;return{scene:o[Math.floor(c/r)%5],progress:c%r/r}}(v,f);e!==h&&(h=e,self.postMessage({type:"sceneUpdate",scene:e,progress:l,fps:g})),d=r}i.viewport(0,0,m,p),i.uniform2f(n.uResolution,m,p),i.uniform1f(n.uTime,v),i.uniform1f(n.uPixelSize,s),i.uniform1f(n.uSpeed,f),i.drawArrays(i.TRIANGLES,0,6),c=requestAnimationFrame(a)},c=requestAnimationFrame(a),self.postMessage({type:"ready"})}else self.postMessage({type:"error",message:"Failed to initialize WebGL"});break}case"update":void 0!==g.pixelSize&&(s=g.pixelSize),void 0!==g.speed&&(f=g.speed),void 0!==g.width&&(m=g.width),void 0!==g.height&&(p=g.height);break;case"stop":null!==c&&(cancelAnimationFrame(c),c=null)}},e.s([])}]);