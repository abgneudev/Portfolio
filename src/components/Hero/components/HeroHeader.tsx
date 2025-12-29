'use client';

import { memo } from 'react';
import Link from 'next/link';
import { analytics } from '@/lib/analytics';
import styles from '../Hero.module.css';

// Social media icons as inline SVGs
const LinkedInIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
);

const GitHubIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
  </svg>
);

const InstagramIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
  </svg>
);

const EmailIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
  </svg>
);

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
          {/* Social Links */}
          <nav className={styles.socialLinks} aria-label="Social links">
            <Link
              href="/about"
              className={styles.socialLinkText}
              style={{ color: mutedColor }}
              onClick={analytics.trackAboutMe}
            >
              About Me
            </Link>
            <span className={styles.socialDivider} style={{ color: mutedColor }}>|</span>
            <div className={styles.socialIconWrapper}>
              <a
                href="https://www.linkedin.com/in/abhinavgupta0210/"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.socialIcon}
                style={{ color: mutedColor }}
                aria-label="LinkedIn"
                onClick={analytics.trackLinkedIn}
              >
                <LinkedInIcon />
              </a>
              <div className={styles.socialTooltip}>
                <span>LinkedIn</span>
              </div>
            </div>
            <div className={styles.socialIconWrapper}>
              <a
                href="https://github.com/abgneudev"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.socialIcon}
                style={{ color: mutedColor }}
                aria-label="GitHub"
                onClick={analytics.trackGitHub}
              >
                <GitHubIcon />
              </a>
              <div className={styles.socialTooltip}>
                <span>GitHub</span>
              </div>
            </div>
            <div className={styles.socialIconWrapper}>
              <a
                href="https://www.instagram.com/abdesiigns"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.socialIcon}
                style={{ color: mutedColor }}
                aria-label="Instagram"
                onClick={analytics.trackInstagram}
              >
                <InstagramIcon />
              </a>
              <div className={styles.socialTooltip}>
                <span>Instagram</span>
              </div>
            </div>
            <div className={styles.socialIconWrapper}>
              <a
                href="mailto:gupta.abhinav0210@gmail.com"
                className={styles.socialIcon}
                style={{ color: mutedColor }}
                aria-label="Email"
                onClick={analytics.trackEmail}
              >
                <EmailIcon />
              </a>
              <div className={styles.socialTooltip}>
                <span>Email</span>
              </div>
            </div>
          </nav>
        </div>
          <p
            className={styles.heroDescription}
            style={{
              color: mutedColor,
              fontSize: isMobile ? '11px' : '12px'
            }}
          >
            I bridge the gap between design and development to ship production-grade UI with high velocity and design fidelity.
          </p>


        {/* How can I help? (Desktop only, hidden when panel is open) */}
        {!isMobile && onSkillsClick && !skillsPanelOpen && (
          <div className={styles.skillsTriggerWrapper}>
            <button
              type="button"
              className={styles.skillsTrigger}
              onClick={() => {
                analytics.trackHowCanIHelp();
                onSkillsClick();
              }}
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
              onClick={analytics.trackViewWork}
            >
              {isMobile ? 'Work' : 'View Work'}
            </button>
            {!isMobile && (
              <div className={styles.ctaTooltip}>
                <span style={{ color: '#FFFFFF' }}>Case Studies</span>
              </div>
            )}
          </div>
          <div className={styles.ctaWrapper}>
            <button
              type="button"
              className={styles.ctaSecondary}
              style={{
                color: mutedColor,
                borderColor: borderColor,
                '--hover-bg': sceneColors.text === '#FFFFFF' ? sceneColors.fg : sceneColors.text,
                '--hover-border': sceneColors.text === '#FFFFFF' ? sceneColors.fg : sceneColors.text
              } as React.CSSProperties}
              onClick={() => {
                analytics.trackResume();
                window.open('https://drive.google.com/file/d/18ga1iRzZ8qmfpBasr6hgX651MTAB-fBa/view?usp=sharing', '_blank');
              }}
            >
              {isMobile ? 'CV' : <>Resume <span aria-hidden="true">↓</span></>}
            </button>
            {!isMobile && (
              <div className={styles.ctaTooltip}>
                <span style={{ color: '#FFFFFF' }}>Download Resume PDF</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
});
