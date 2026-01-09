/**
 * ASCII animation patterns for each stage
 * All patterns use consistent orbit angle calculation: orbitAngle = t * 0.3
 * Core 1 is at angle, Core 2 is at angle + PI
 */

import { fbm, smin, sdCircle } from './noise';

export type PatternFunction = (x: number, y: number, t: number) => number;
export type DynamicPatternFunction = (x: number, y: number, t: number, sep: number) => number;

export interface PatternContext {
  cols: number;
  rows: number;
  stage5StartTime: number;
}

// Separations for each stage (-1 to 5)
// Hero uses cols * 0.35 which is dynamic, so we handle it specially
export const STAGE_SEPARATIONS = [25, 18, 12, 8, 4, 0]; // stages 0-5

// Base two-core pattern that accepts separation as parameter
export function createDynamicTwoCorePattern(ctx: PatternContext): DynamicPatternFunction {
  return (x: number, y: number, t: number, sep: number) => {
    const cx = ctx.cols / 2, cy = ctx.rows / 2;
    const orbitAngle = t * 0.3;
    const selfRotation = t * 0.8;

    const c1x = cx + Math.cos(orbitAngle) * sep;
    const c1y = cy + Math.sin(orbitAngle) * sep * 0.4;
    const c2x = cx + Math.cos(orbitAngle + Math.PI) * sep;
    const c2y = cy + Math.sin(orbitAngle + Math.PI) * sep * 0.4;

    const d1 = Math.hypot(x - c1x, y - c1y);
    const d2 = Math.hypot(x - c2x, y - c2y);

    const pulse1 = 7 + 2 * Math.sin(t * 0.7);
    const pulse2 = 7 + 2 * Math.sin(t * 0.7 + 2);

    const core1 = Math.exp(-d1 / pulse1);
    const core2 = Math.exp(-d2 / pulse2);

    const a1 = Math.atan2(y - c1y, x - c1x);
    const a2 = Math.atan2(y - c2y, x - c2x);

    const spiral1 = Math.sin((a1 + selfRotation) * 4 - d1 * 0.3) * 0.3 * Math.exp(-d1 / 10);
    const spiral2 = Math.sin((a2 - selfRotation) * 4 + d2 * 0.3) * 0.3 * Math.exp(-d2 / 10);

    const bg = fbm(x * 0.03, y * 0.03, t * 0.05, 3) * 0.06;

    return core1 + spiral1 + core2 + spiral2 + bg;
  };
}

// STAGE 1: FIRST SYNC - Cores closer, waves reaching out
export function createPattern1(ctx: PatternContext): PatternFunction {
  return (x: number, y: number, t: number) => {
    const cx = ctx.cols / 2, cy = ctx.rows / 2;
    const sep = 18;
    const orbitAngle = t * 0.3;
    const selfRotation = t * 0.8;

    const c1x = cx + Math.cos(orbitAngle) * sep;
    const c1y = cy + Math.sin(orbitAngle) * sep * 0.4;
    const c2x = cx + Math.cos(orbitAngle + Math.PI) * sep;
    const c2y = cy + Math.sin(orbitAngle + Math.PI) * sep * 0.4;

    const d1 = Math.hypot(x - c1x, y - c1y);
    const d2 = Math.hypot(x - c2x, y - c2y);

    const a1 = Math.atan2(y - c1y, x - c1x);
    const a2 = Math.atan2(y - c2y, x - c2x);

    const coreBase1 = Math.exp(-d1 / 7);
    const coreBase2 = Math.exp(-d2 / 7);
    const spin1 = Math.sin((a1 + selfRotation) * 3) * 0.2 * Math.exp(-d1 / 8);
    const spin2 = Math.sin((a2 - selfRotation) * 3) * 0.2 * Math.exp(-d2 / 8);
    const core1 = coreBase1 + spin1;
    const core2 = coreBase2 + spin2;

    const wave1 = Math.sin(d1 * 0.35 - t * 2.5) * Math.exp(-d1 / 30) * 0.5;
    const wave2 = Math.sin(d2 * 0.35 - t * 2.5) * Math.exp(-d2 / 30) * 0.5;
    const interference = Math.max(0, wave1 + wave2);

    const dist = Math.hypot(x - cx, y - cy);
    const center = Math.exp(-dist / 15) * 0.3;

    const bg = fbm(x * 0.025, y * 0.025, t * 0.08, 3) * 0.05;

    return core1 + core2 + interference + center + bg;
  };
}

// STAGE 2: CALIBRATION - Two cores circling, testing boundaries
export function createPattern2(ctx: PatternContext): PatternFunction {
  return (x: number, y: number, t: number) => {
    const cx = ctx.cols / 2, cy = ctx.rows / 2;
    const sep = 12;
    const orbitAngle = t * 0.3;
    const selfRotation = t * 0.8;

    const c1x = cx + Math.cos(orbitAngle) * sep;
    const c1y = cy + Math.sin(orbitAngle) * sep * 0.4;
    const c2x = cx + Math.cos(orbitAngle + Math.PI) * sep;
    const c2y = cy + Math.sin(orbitAngle + Math.PI) * sep * 0.4;

    const d1 = Math.hypot(x - c1x, y - c1y);
    const d2 = Math.hypot(x - c2x, y - c2y);

    const a1 = Math.atan2(y - c1y, x - c1x);
    const a2 = Math.atan2(y - c2y, x - c2x);

    const pulse = 0.9 + 0.2 * Math.sin(t * 1.5);
    const spin1 = Math.sin((a1 + selfRotation) * 4) * 0.25 * Math.exp(-d1 / 6);
    const spin2 = Math.sin((a2 - selfRotation) * 4) * 0.25 * Math.exp(-d2 / 6);
    const core1 = Math.exp(-d1 / 5) * pulse + spin1;
    const core2 = Math.exp(-d2 / 5) * pulse + spin2;

    const ringRadius1 = 8 + 6 * Math.sin(t * 0.8);
    const ringRadius2 = 8 + 6 * Math.sin(t * 0.8 + Math.PI);

    const ring1 = Math.exp(-Math.pow(d1 - ringRadius1, 2) / 6) * 0.45;
    const ring2 = Math.exp(-Math.pow(d2 - ringRadius1, 2) / 6) * 0.45;
    const ring1b = Math.exp(-Math.pow(d1 - ringRadius2, 2) / 6) * 0.35;
    const ring2b = Math.exp(-Math.pow(d2 - ringRadius2, 2) / 6) * 0.35;

    const midX = (c1x + c2x) / 2, midY = (c1y + c2y) / 2;
    const distToMid = Math.hypot(x - midX, y - midY);
    const connectionGlow = Math.exp(-distToMid / 6) * 0.3 * (0.8 + 0.2 * Math.sin(t * 2));

    const minDist = Math.min(d1, d2);
    const interf = Math.exp(-minDist / 15) * 0.2;

    const n = fbm(x * 0.03, y * 0.03, t * 0.08, 3) * 0.25 + 0.75;

    return (core1 + core2 + ring1 + ring2 + ring1b + ring2b + connectionGlow + interf) * n;
  };
}

// STAGE 3: STABLE COUPLING - Tight synchronized orbit
export function createPattern3(ctx: PatternContext): PatternFunction {
  return (x: number, y: number, t: number) => {
    const cx = ctx.cols / 2, cy = ctx.rows / 2;
    const sep = 8;
    const orbitAngle = t * 0.3;
    const selfRotation = t * 0.8;

    const c1x = cx + Math.cos(orbitAngle) * sep;
    const c1y = cy + Math.sin(orbitAngle) * sep;
    const c2x = cx + Math.cos(orbitAngle + Math.PI) * sep;
    const c2y = cy + Math.sin(orbitAngle + Math.PI) * sep;

    const d1 = Math.hypot(x - c1x, y - c1y);
    const d2 = Math.hypot(x - c2x, y - c2y);

    const a1 = Math.atan2(y - c1y, x - c1x);
    const a2 = Math.atan2(y - c2y, x - c2x);

    const breathe = Math.sin(t * 1.2);
    const coreSize = 6 + breathe * 1.5;
    const spin1 = Math.sin((a1 + selfRotation) * 5) * 0.2 * Math.exp(-d1 / 7);
    const spin2 = Math.sin((a2 - selfRotation) * 5) * 0.2 * Math.exp(-d2 / 7);
    const core1 = Math.exp(-d1 / coreSize) * 1.1 + spin1;
    const core2 = Math.exp(-d2 / coreSize) * 1.1 + spin2;

    const dist = Math.hypot(x - cx, y - cy);

    const ringPhase = dist * 0.3 - t * 1.5;
    const rings = Math.pow(Math.sin(ringPhase) * 0.5 + 0.5, 2) * Math.exp(-dist / 25) * 0.4;

    const center = Math.exp(-dist / 12) * 0.6;

    const pAngle = Math.atan2(y - cy, x - cx);
    const trail = (Math.exp(-Math.abs(Math.sin(pAngle - orbitAngle)) * 3) +
                   Math.exp(-Math.abs(Math.sin(pAngle - orbitAngle - Math.PI)) * 3)) *
                  Math.exp(-Math.abs(dist - sep) / 5) * 0.3;

    const n = fbm(x * 0.035, y * 0.035, t * 0.08, 4) * 0.4 + 0.6;

    return (core1 + core2 + rings + center + trail) * n;
  };
}

// STAGE 4: SYMBIOSIS - Cores merged into one blob
export function createPattern4(ctx: PatternContext): PatternFunction {
  return (x: number, y: number, t: number) => {
    const cx = ctx.cols / 2, cy = ctx.rows / 2;
    const sep = 4;
    const orbitAngle = t * 0.3;
    const selfRotation = t * 0.8;

    const wobble = 2;
    const c1x = cx + Math.cos(orbitAngle) * sep + Math.sin(t * 0.5) * wobble;
    const c1y = cy + Math.sin(orbitAngle) * sep + Math.cos(t * 0.7) * wobble * 0.5;
    const c2x = cx + Math.cos(orbitAngle + Math.PI) * sep + Math.sin(t * 0.5 + 2) * wobble;
    const c2y = cy + Math.sin(orbitAngle + Math.PI) * sep + Math.cos(t * 0.7 + 2) * wobble * 0.5;

    const r = 9 + Math.sin(t * 0.8) * 2;

    const sdf1 = sdCircle(x, y, c1x, c1y, r);
    const sdf2 = sdCircle(x, y, c2x, c2y, r);
    const merged = smin(sdf1, sdf2, 10);

    const inside = Math.max(0, 1 - merged / 5);
    const edge = Math.exp(-Math.abs(merged) / 3) * 0.4;

    const internalNoise = fbm(x * 0.08 + t * 0.1, y * 0.08, t * 0.12, 5) * 0.5 + 0.5;

    const dist = Math.hypot(x - cx, y - cy);
    const angle = Math.atan2(y - cy, x - cx);
    const veins = Math.pow(Math.sin((angle + selfRotation) * 6 + dist * 0.2) * 0.5 + 0.5, 4);

    const glow = Math.exp(-Math.max(0, merged) / 12) * 0.3;

    return inside * internalNoise + edge + inside * veins * 0.3 + glow;
  };
}

// STAGE 5: PROPAGATION - Core with arms, waves, expanding nodes
export function createPattern5(ctx: PatternContext): PatternFunction {
  return (x: number, y: number, t: number) => {
    const cx = ctx.cols / 2, cy = ctx.rows / 2;
    const dx = x - cx, dy = y - cy;
    const dist = Math.hypot(dx, dy);
    const angle = Math.atan2(dy, dx);

    const localT = t - ctx.stage5StartTime;

    const corePulse = 0.7 + Math.sin(t * 2) * 0.3;
    const core = Math.exp(-dist / 6) * corePulse;

    const armCount = 6;
    const armAngle = angle * armCount / (Math.PI * 2);
    const arms = Math.pow(Math.cos(armAngle * Math.PI) * 0.5 + 0.5, 4);
    const armFade = Math.exp(-dist / 45) * (1 - Math.exp(-dist / 8));

    const waveRadius = (localT * 4) % 50;
    const wave = Math.exp(-Math.pow(dist - waveRadius, 2) / 6) * 0.7;

    let nodes = 0;
    const ring1Dist = 14;
    for (let i = 0; i < 3; i++) {
      const na = (Math.PI * 2 / 3) * i + t * 0.2;
      nodes += Math.exp(-Math.hypot(x - (cx + Math.cos(na) * ring1Dist), y - (cy + Math.sin(na) * ring1Dist)) / 3.5);
    }
    const ring2Dist = 24;
    for (let i = 0; i < 6; i++) {
      const na = (Math.PI * 2 / 6) * i + t * 0.12 + 0.3;
      nodes += Math.exp(-Math.hypot(x - (cx + Math.cos(na) * ring2Dist), y - (cy + Math.sin(na) * ring2Dist)) / 3);
    }
    const ring3Dist = 36;
    for (let i = 0; i < 9; i++) {
      const na = (Math.PI * 2 / 9) * i + t * 0.08 + 0.6;
      nodes += Math.exp(-Math.hypot(x - (cx + Math.cos(na) * ring3Dist), y - (cy + Math.sin(na) * ring3Dist)) / 2.5);
    }

    const threads = Math.sin(angle * 12 + dist * 0.15 - t * 0.5) * 0.5 + 0.5;
    const threadMask = Math.exp(-dist / 50) * (1 - Math.exp(-dist / 8)) * 0.3;

    const n = fbm(x * 0.03, y * 0.03, t * 0.08, 3) * 0.5 + 0.5;

    return (core + arms * armFade * 0.6 + wave + nodes * 0.6 + threads * threadMask) * n;
  };
}

// Factory to create all patterns (stages 1-5 only, hero/stage0 use dynamic pattern)
export function createPatterns(ctx: PatternContext): PatternFunction[] {
  return [
    createPattern1(ctx),  // index 0 -> stage 1
    createPattern2(ctx),  // index 1 -> stage 2
    createPattern3(ctx),  // index 2 -> stage 3
    createPattern4(ctx),  // index 3 -> stage 4
    createPattern5(ctx),  // index 4 -> stage 5
  ];
}
