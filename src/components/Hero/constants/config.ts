/**
 * Hero Configuration
 *
 * Responsive breakpoints and color scheme configuration.
 */

export interface BreakpointConfig {
  max?: number;
  min?: number;
  pixelSize: number;
  cardSpacing: number;
  maxVisible: number;
  bottomPos: number;
  yScale: number;
}

// Major third ratio (1.25) - matches typography scale for system-wide harmony
const RATIO = 1.25;

export const BREAKPOINTS: Record<string, BreakpointConfig> = {
  mobile: {
    max: 640,
    pixelSize: 110,                         // Increased for better density/readability
    cardSpacing: Math.round(200 / (RATIO * RATIO)),  // 128
    maxVisible: 2,
    bottomPos: Math.round(180 / (RATIO * RATIO)),    // 115
    yScale: Math.round(20 / (RATIO * RATIO))         // 13
  },
  tablet: {
    min: 640,
    max: 1024,
    pixelSize: 104,                         // 130 / 1.25
    cardSpacing: Math.round(200 / RATIO),   // 160
    maxVisible: 3,
    bottomPos: Math.round(180 / RATIO),     // 144
    yScale: Math.round(20 / RATIO)          // 16
  },
  desktop: {
    min: 1024,
    pixelSize: 130,                         // anchor
    cardSpacing: 200,                       // anchor
    maxVisible: 3,
    bottomPos: 180,                         // anchor
    yScale: 20                              // anchor
  }
};

export const COLORS = {
  light: {
    text: '#403C3A',
    textMuted: '#8C8987',
    bg: '#F2ECE9',
    cardBg: '#403C3A'
  },
  dark: {
    text: '#F2ECE9',
    textMuted: '#D9D2CC',
    border: '#595552'
  }
} as const;
