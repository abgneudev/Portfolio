'use client';

import { memo } from 'react';
import { COLORS, type Skill } from '../constants';
import styles from '../Hero.module.css';

interface HeroHeaderProps {
  /** Currently active skill (for theming) */
  activeSkill?: Skill | null;
  /** Whether to use mobile layout */
  isMobile: boolean;
  /** Callback to open skills panel */
  onSkillsClick?: () => void;
  /** Whether skills panel is open */
  skillsPanelOpen?: boolean;
}

/**
 * HeroHeader Component
 *
 * Displays the hero section header with name, title, and call-to-action buttons.
 * Adapts colors based on active skill theme.
 *
 * @accessibility
 * - Semantic heading hierarchy (h1 for name)
 * - Buttons have visible focus indicators
 * - Expandable details section is keyboard accessible
 */
export const HeroHeader = memo(function HeroHeader({
  activeSkill,
  isMobile,
  onSkillsClick,
  skillsPanelOpen
}: HeroHeaderProps) {
  const textColor = activeSkill ? COLORS.dark.text : COLORS.light.text;
  const mutedColor = activeSkill ? COLORS.dark.textMuted : COLORS.light.textMuted;
  const buttonBg = activeSkill ? activeSkill.theme.accent : COLORS.light.cardBg;
  const borderColor = activeSkill ? COLORS.dark.border : COLORS.dark.textMuted;

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
                color: COLORS.dark.text
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
