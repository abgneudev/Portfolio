'use client';

import { useRef, useState } from 'react';
import { COLORS } from './constants';
import { useResponsive, useCanvasSize, useHeroWebGL } from './hooks';
import { HeroHeader, SkillsPanel } from './components';
import styles from './Hero.module.css';

/**
 * Hero Component
 *
 * Full-screen hero section featuring:
 * - WebGL shader background with parallax binary landscape
 * - Animated skill cards that scroll horizontally
 * - Interactive skill selection with image carousel
 * - Responsive layout for mobile, tablet, and desktop
 *
 * @accessibility
 * - Landmark region with aria-label for screen readers
 * - Skip link target for keyboard navigation
 * - Reduced motion support via CSS
 * - Semantic HTML structure with proper headings
 */
export default function Hero() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const responsive = useResponsive();
  const canvasSize = useCanvasSize();
  const { fps } = useHeroWebGL(canvasRef, responsive.pixelSize, 1.0, canvasSize);
  const [skillsPanelOpen, setSkillsPanelOpen] = useState(false);

  const bgColor = COLORS.light.bg;

  return (
    <section
      className={styles.hero}
      style={{ backgroundColor: bgColor }}
      aria-label="Hero section"
      id="hero"
    >
      {/* WebGL Canvas Layer */}
      <canvas
        ref={canvasRef}
        width={canvasSize.width}
        height={canvasSize.height}
        className={styles.canvas}
        aria-hidden="true"
      />

      {/* Mobile Layout */}
      {responsive.isMobile && (
        <div className={styles.mobileLayout}>
          <div className={styles.mobileHeader}>
            <HeroHeader isMobile={true} />
          </div>
          <div className={styles.mobileSpacer} />
        </div>
      )}

      {/* Desktop Layout */}
      {!responsive.isMobile && (
        <div className={styles.desktopLayout}>
          <div className={styles.desktopHeader}>
            <HeroHeader isMobile={false} onSkillsClick={() => setSkillsPanelOpen(true)} skillsPanelOpen={skillsPanelOpen} />
          </div>
        </div>
      )}

      {/* Metrics (Desktop only, bottom left) */}
      {!responsive.isMobile && (
        <div className={styles.metrics} aria-label="Key metrics">
          <div className={styles.metricItem}>
            <span className={styles.metricValue}>60%</span>
            <span className={styles.metricLabel}>Faster Delivery</span>
          </div>
          <div className={styles.metricItem}>
            <span className={styles.metricValue}>4.5%</span>
            <span className={styles.metricLabel}>Click Through Rate</span>
          </div>
          <div className={styles.metricItem}>
            <span className={styles.metricValue}>90+</span>
            <span className={styles.metricLabel}>Lighthouse Scores</span>
          </div>
        </div>
      )}

      {/* Skills Panel (slides in from right) */}
      <SkillsPanel
        isOpen={skillsPanelOpen}
        onClose={() => setSkillsPanelOpen(false)}
      />

      {/* FPS Counter (development aid) */}
      <div
        className={styles.fpsCounter}
        style={{ color: 'rgba(64,60,58,0.4)' }}
        aria-hidden="true"
      >
        {fps} FPS
      </div>

    </section>
  );
}
