'use client';

import { useMemo } from 'react';
import { SKILLS, type Skill } from '../constants';
import type { ResponsiveConfig } from './useResponsive';

export interface VisibleCard {
  skill: Skill;
  style: {
    left: string;
    bottom: string;
    opacity: number;
    transition: string;
  };
}

/**
 * Custom hook for calculating visible skill cards
 *
 * Uses spatial indexing concepts for efficient card positioning.
 * Performs frustum culling to only process visible cards.
 */
export function useVisibleCards(
  time: number,
  responsive: ResponsiveConfig
): VisibleCard[] {
  return useMemo(() => {
    const { cardSpacing, maxVisible, bottomPos, yScale, width, isMobile } = responsive;
    const totalWidth = SKILLS.length * cardSpacing;
    const scrollSpeed = 25;
    const offset = (time * scrollSpeed) % totalWidth;
    const viewportLimit = isMobile ? width : 1000;

    const cards: VisibleCard[] = [];

    // O(n) single pass with early termination potential
    for (let i = 0; i < SKILLS.length && cards.length < maxVisible; i++) {
      const skill = SKILLS[i];
      const baseX = i * cardSpacing;
      let xPos = baseX - offset + (isMobile ? 50 : 200);

      // Wrap around (modular arithmetic)
      if (xPos < -300) xPos += totalWidth;
      if (xPos > totalWidth) xPos -= totalWidth;

      // Frustum culling - only process visible cards
      if (xPos > -250 && xPos < viewportLimit) {
        // Use precomputed yOffset from SKILLS data
        const yOffset = skill.yOffset * yScale;

        // Compute opacity with branch-free math
        const fadeIn = Math.min(1, Math.max(0, xPos / 50));
        const fadeOut = Math.min(1, Math.max(0, (viewportLimit - xPos) / 200));
        const opacity = xPos < 50 ? fadeIn : xPos > (viewportLimit - 200) ? fadeOut : 1;

        cards.push({
          skill,
          style: {
            left: `${xPos}px`,
            bottom: `${bottomPos + yOffset}px`,
            opacity,
            transition: 'opacity 0.2s ease'
          }
        });
      }
    }

    return cards;
  }, [time, responsive]);
}
