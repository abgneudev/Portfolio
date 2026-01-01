'use client';

import { useRef, useState } from 'react';
import dynamic from 'next/dynamic';
import { useResponsive, useASCIIHero } from './hooks';
import { HeroHeader, MobileSkillsDropdown } from './components';
import styles from './Hero.module.css';

// Lazy load SkillsPanel - only loads when user clicks "How can I help?"
const SkillsPanel = dynamic(
  () => import('./components/SkillsPanel').then(mod => ({ default: mod.SkillsPanel })),
  { ssr: false }
);

// Video URL for ASCII background
const ASCII_VIDEO_URL = 'https://res.cloudinary.com/dbvfgfqqh/video/upload/v1767211706/recording_rope3y.mp4';

/**
 * Hero Component
 *
 * Full-screen hero section featuring:
 * - ASCII art video background animation
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
  // Use a fixed fontSize to prevent WebGL reinitialization on resize
  // The ASCII effect will adapt via the grid size calculation
  const { fps } = useASCIIHero(canvasRef, {
    videoUrl: ASCII_VIDEO_URL,
    fontSize: 6,
    targetFps: 15,
  });
  const [skillsPanelOpen, setSkillsPanelOpen] = useState(false);
  const [mobileSkillSelected, setMobileSkillSelected] = useState(false);

  // Blur background when either desktop panel is open or mobile skill is selected
  const shouldBlurBackground = skillsPanelOpen || mobileSkillSelected;

  return (
    <section
      className={styles.hero}
      aria-label="Hero section"
      id="hero"
    >
      {/* Skip Link for keyboard navigation */}
      <a href="#main-content" className={styles.skipLink}>
        Skip to main content
      </a>

      {/* ASCII Art Background Layer */}
      <canvas
        ref={canvasRef}
        className={`${styles.asciiBackground} ${shouldBlurBackground ? styles.asciiBackgroundBlurred : ''}`}
        aria-hidden="true"
      />

      {/* Mobile Layout */}
      {responsive.isMobile && (
        <div className={styles.mobileLayout}>
          <div className={styles.mobileHeader}>
            <HeroHeader isMobile={true} />
            <MobileSkillsDropdown onSkillSelect={setMobileSkillSelected} />
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
            />
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
        <div className={styles.fpsCounter} aria-hidden="true">
          {fps} FPS
        </div>
      )}

    </section>
  );
}
