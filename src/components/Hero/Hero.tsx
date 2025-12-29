'use client';

import { useRef, useState, useMemo } from 'react';
import { SCENE_COLORS, type SceneName } from './constants';
import { useResponsive, useCanvasSize, useHeroWebGL } from './hooks';
import { HeroHeader, SkillsPanel, MobileSkillsDropdown } from './components';
import styles from './Hero.module.css';

/**
 * Get scene-specific colors for UI elements
 */
function getSceneColors(scene: SceneName) {
  return SCENE_COLORS[scene];
}

/**
 * Hero Component
 *
 * Full-screen hero section featuring:
 * - WebGL shader background with 5 nature-inspired animated scenes
 * - Dynamic color theming that syncs with current shader scene
 * - Animated skill cards that scroll horizontally
 * - Interactive skill selection with image carousel
 * - Responsive layout for mobile, tablet, and desktop
 *
 * Scenes cycle through: Water, Hive, Cell, Shell, Wood
 * Each scene has its own color palette that affects all text elements
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
  const { fps, currentScene } = useHeroWebGL(canvasRef, responsive.pixelSize, 1.0, canvasSize);
  const [skillsPanelOpen, setSkillsPanelOpen] = useState(false);

  // Get current scene colors
  const sceneColors = useMemo(() => getSceneColors(currentScene), [currentScene]);

  return (
    <section
      className={styles.hero}
      style={{ backgroundColor: sceneColors.bg }}
      aria-label="Hero section"
      id="hero"
    >
      {/* Skip Link for keyboard navigation */}
      <a href="#main-content" className={styles.skipLink}>
        Skip to main content
      </a>

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
            <HeroHeader
              isMobile={true}
              sceneColors={sceneColors}
            />
            <MobileSkillsDropdown sceneColors={sceneColors} />
          </div>
          <div className={styles.mobileSpacer} />
        </div>
      )}

      {/* Desktop Layout */}
      {!responsive.isMobile && (
        <div className={styles.desktopLayout}>
          <div className={styles.desktopHeader}>
            <HeroHeader
              isMobile={false}
              onSkillsClick={() => setSkillsPanelOpen(true)}
              skillsPanelOpen={skillsPanelOpen}
              sceneColors={sceneColors}
            />
          </div>
        </div>
      )}

      {/* Metrics (Desktop only, bottom left) */}
      {!responsive.isMobile && (
        <div className={styles.metrics} aria-label="Key metrics">
          <div className={styles.metricItem}>
            <span className={styles.metricValue} style={{ color: sceneColors.text }}>60%</span>
            <span className={styles.metricLabel} style={{ color: sceneColors.textMuted }}>Faster Delivery</span>
          </div>
          <div className={styles.metricItem}>
            <span className={styles.metricValue} style={{ color: sceneColors.text }}>4.5%</span>
            <span className={styles.metricLabel} style={{ color: sceneColors.textMuted }}>Click Through Rate</span>
          </div>
          <div className={styles.metricItem}>
            <span className={styles.metricValue} style={{ color: sceneColors.text }}>90+</span>
            <span className={styles.metricLabel} style={{ color: sceneColors.textMuted }}>Lighthouse Scores</span>
          </div>
        </div>
      )}

      {/* Skills Panel (slides in from right) */}
      <SkillsPanel
        isOpen={skillsPanelOpen}
        onClose={() => setSkillsPanelOpen(false)}
      />

      {/* FPS Counter (development only) */}
      {process.env.NODE_ENV === 'development' && (
        <div
          className={styles.fpsCounter}
          style={{ color: sceneColors.textMuted }}
          aria-hidden="true"
        >
          {fps} FPS
        </div>
      )}

    </section>
  );
}
