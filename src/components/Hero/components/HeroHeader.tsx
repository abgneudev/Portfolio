'use client';

import { memo } from 'react';
import styles from '../Hero.module.css';

interface SceneColors {
  bg: string;
  fg: string;
  accent: string;
  text: string;
  textMuted: string;
}

interface HeroHeaderProps {
  /** Whether to use mobile layout */
  isMobile: boolean;
  /** Callback to open skills panel */
  onSkillsClick?: () => void;
  /** Whether skills panel is open */
  skillsPanelOpen?: boolean;
  /** Scene-based colors from the shader */
  sceneColors: SceneColors;
}

/**
 * HeroHeader Component
 *
 * Displays the hero section header with name, title, and call-to-action buttons.
 * Colors are driven by the current shader scene for a cohesive experience.
 *
 * @accessibility
 * - Semantic heading hierarchy (h1 for name)
 * - Buttons have visible focus indicators
 * - Expandable details section is keyboard accessible
 */
export const HeroHeader = memo(function HeroHeader({
  isMobile,
  onSkillsClick,
  skillsPanelOpen,
  sceneColors
}: HeroHeaderProps) {
  // Use scene colors for theming
  const textColor = sceneColors.text;
  const mutedColor = sceneColors.textMuted;
  const buttonBg = sceneColors.accent;
  const borderColor = sceneColors.textMuted;

  return (
    <header className={styles.heroHeader}>
      <div className={isMobile ? styles.headerMobile : styles.headerDesktop}>
        {/* Identity Section */}
        <div className={styles.identity}>
          <h1
            className={styles.heroName}
            style={{
              color: textColor,
              fontSize: isMobile ? '16px' : '18px'
            }}
          >
            Abhinav Gupta
          </h1>
          <p
            className={styles.heroTitle}
            style={{
              color: mutedColor,
              fontSize: isMobile ? '12px' : '14px'
            }}
          >
            Product Design Engineer
          </p>
          <p
            className={styles.heroDescription}
            style={{
              color: mutedColor,
              fontSize: isMobile ? '11px' : '12px'
            }}
          >
            I bridge the gap between design and development to ship production-grade UI with high velocity and design fidelity.
          </p>
        </div>

        {/* How can I help? (Desktop only, hidden when panel is open) */}
        {!isMobile && onSkillsClick && !skillsPanelOpen && (
          <div className={styles.skillsTriggerWrapper}>
            <button
              type="button"
              className={styles.skillsTrigger}
              onClick={onSkillsClick}
              style={{ color: mutedColor }}
            >
              How can I help? <span aria-hidden="true">→</span>
            </button>
            <div className={styles.skillsTooltip}>
              <span>Preview</span>
            </div>
          </div>
        )}

        {/* CTA Buttons */}
        <div className={styles.ctaButtons}>
          <div className={styles.ctaWrapper}>
            <button
              type="button"
              className={styles.ctaPrimary}
              style={{
                backgroundColor: buttonBg,
                color: '#FFFFFF'
              }}
            >
              {isMobile ? 'Work' : 'View Work'}
            </button>
            {!isMobile && (
              <div className={styles.ctaTooltip}>
                <span>Case Studies</span>
              </div>
            )}
          </div>
          <div className={styles.ctaWrapper}>
            <button
              type="button"
              className={styles.ctaSecondary}
              style={{
                color: mutedColor,
                borderColor: borderColor
              }}
              onClick={() => window.open('https://drive.google.com/file/d/18ga1iRzZ8qmfpBasr6hgX651MTAB-fBa/view?usp=sharing', '_blank')}
            >
              {isMobile ? 'CV' : <>Resume <span aria-hidden="true">↓</span></>}
            </button>
            {!isMobile && (
              <div className={styles.ctaTooltip}>
                <span>Download Resume PDF</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
});
