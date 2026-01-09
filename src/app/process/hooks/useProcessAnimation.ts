/**
 * Custom hook for managing the ASCII canvas animation
 * Hero is stage -1, stages are 0-5
 * Hero and stage 0 use dynamic separation, stages 1-5 use fixed patterns
 */

import { useEffect, useRef, MutableRefObject } from 'react';
import { smoothstep, lerp } from '../lib/noise';
import {
  createPatterns,
  createDynamicTwoCorePattern,
  PatternFunction,
  DynamicPatternFunction,
  STAGE_SEPARATIONS
} from '../lib/patterns';

interface AnimationRefs {
  time: MutableRefObject<number>;
  targetStage: MutableRefObject<number>; // -1 = hero, 0-5 = stages
  stage5StartTime: MutableRefObject<number>;
}

const CELL = 10;
const ASCII = " .·:░▒▓█";
const TRANSITION_DURATION = 0.6;
const FRAME_TIME = 1 / 60;

export function useProcessAnimation(
  canvasRef: MutableRefObject<HTMLCanvasElement | null>,
  refs: AnimationRefs
) {
  const patternsRef = useRef<PatternFunction[] | null>(null);
  const dynamicPatternRef = useRef<DynamicPatternFunction | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let cols = 0, rows = 0;
    let heroSep = 0;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      cols = Math.ceil(canvas.width / CELL);
      rows = Math.ceil(canvas.height / CELL);
      heroSep = cols * 0.35;
      ctx.font = "11px 'Doto', monospace";
      ctx.textBaseline = "middle";
      ctx.textAlign = "center";

      // Recreate patterns with new dimensions
      const patternCtx = {
        cols,
        rows,
        stage5StartTime: refs.stage5StartTime.current,
      };
      patternsRef.current = createPatterns(patternCtx);
      dynamicPatternRef.current = createDynamicTwoCorePattern(patternCtx);
    };

    resize();
    window.addEventListener("resize", resize);

    let currentDisplayStage = -1;
    let lastTargetStage = -1;
    let morphProgress = 1;
    let animationId: number;

    // Get separation for a stage (-1 = hero, 0-5 = stages)
    const getSeparation = (stage: number): number => {
      if (stage === -1) return heroSep;
      return STAGE_SEPARATIONS[stage];
    };

    const animate = () => {
      refs.time.current += 0.025;

      const targetStage = refs.targetStage.current;

      // Detect stage change and start transition
      if (targetStage !== lastTargetStage) {
        currentDisplayStage = lastTargetStage;

        // Track when stage 5 starts
        if (targetStage === 5) {
          refs.stage5StartTime.current = refs.time.current;
        }

        lastTargetStage = targetStage;
        morphProgress = 0;
      }

      // Progress the transition
      if (morphProgress < 1) {
        morphProgress += FRAME_TIME / TRANSITION_DURATION;
        if (morphProgress >= 1) {
          morphProgress = 1;
          currentDisplayStage = targetStage;
        }
      }

      const blend = smoothstep(morphProgress);

      ctx.fillStyle = "#070707";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const patterns = patternsRef.current;
      const dynamicPattern = dynamicPatternRef.current;
      if (!patterns || !dynamicPattern) return;

      const fromStage = currentDisplayStage;
      const toStage = targetStage;

      for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
          let value: number;

          // Determine which pattern to use for "from" and "to"
          const fromUsesDynamic = fromStage <= 0;
          const toUsesDynamic = toStage <= 0;

          if (morphProgress < 1 && fromStage !== toStage) {
            // We're transitioning
            let fromValue: number;
            let toValue: number;

            if (fromUsesDynamic && toUsesDynamic) {
              // Both use dynamic pattern - interpolate separation for smooth core movement
              const fromSep = getSeparation(fromStage);
              const toSep = getSeparation(toStage);
              const currentSep = lerp(fromSep, toSep, blend);
              value = dynamicPattern(x, y, refs.time.current, currentSep);
            } else {
              // Mixed transition - blend between pattern values
              // Get "from" value
              if (fromUsesDynamic) {
                const fromSep = getSeparation(fromStage);
                fromValue = dynamicPattern(x, y, refs.time.current, fromSep);
              } else {
                const fromIndex = fromStage - 1;
                fromValue = patterns[fromIndex](x, y, refs.time.current);
              }

              // Get "to" value
              if (toUsesDynamic) {
                const toSep = getSeparation(toStage);
                toValue = dynamicPattern(x, y, refs.time.current, toSep);
              } else {
                const toIndex = toStage - 1;
                toValue = patterns[toIndex](x, y, refs.time.current);
              }

              // Blend between them
              value = fromValue * (1 - blend) + toValue * blend;
            }
          } else {
            // Not transitioning, just show target stage
            if (toUsesDynamic) {
              const sep = getSeparation(toStage);
              value = dynamicPattern(x, y, refs.time.current, sep);
            } else {
              const toIndex = toStage - 1;
              value = patterns[toIndex](x, y, refs.time.current);
            }
          }

          value = Math.max(0, Math.min(1, value));
          const charIdx = Math.floor(value * (ASCII.length - 1));

          if (charIdx > 0) {
            const hue = 220 + value * 15;
            const sat = 70 + value * 20;
            const light = 30 + value * 40;
            const alpha = 0.3 + value * 0.7;
            ctx.fillStyle = `hsla(${hue}, ${sat}%, ${light}%, ${alpha})`;
            ctx.fillText(ASCII[charIdx], x * CELL + CELL / 2, y * CELL + CELL / 2);
          }
        }
      }

      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationId);
    };
  }, [canvasRef, refs]);
}
