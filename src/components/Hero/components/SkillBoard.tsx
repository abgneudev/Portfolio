'use client';

import { memo, useState, useMemo, useCallback, type CSSProperties } from 'react';
import { COLORS, type Skill } from '../constants';
import styles from '../Hero.module.css';

interface SkillBoardProps {
  /** Skill data to display */
  skill: Skill;
  /** Position and opacity styles */
  style: CSSProperties;
  /** Whether this card is currently selected */
  isActive: boolean;
  /** Click handler for card selection */
  onClick: () => void;
  /** Whether to use mobile-optimized sizing */
  isMobile: boolean;
}

/**
 * SkillBoard Component
 *
 * Displays a skill card with name, description, and proficiency bar.
 * Supports hover states, active selection, and keyboard navigation.
 *
 * @accessibility
 * - Keyboard accessible via tabindex and keydown handler
 * - Uses button role for interactive semantics
 * - Focus visible via browser defaults
 * - Tooltip provides additional context on hover
 */
export const SkillBoard = memo(function SkillBoard({
  skill,
  style,
  isActive,
  onClick,
  isMobile
}: SkillBoardProps) {
  const [isHovered, setIsHovered] = useState(false);

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onClick();
    }
  }, [onClick]);

  const handleMouseEnter = useCallback(() => setIsHovered(true), []);
  const handleMouseLeave = useCallback(() => setIsHovered(false), []);

  const cardStyle = useMemo((): CSSProperties => ({
    ...style,
    backgroundColor: isActive
      ? skill.theme.bg
      : isHovered
        ? skill.theme.bg
        : COLORS.light.cardBg,
    padding: isMobile ? '10px 12px' : '12px 16px',
    borderRadius: '4px',
    minWidth: isMobile ? '140px' : '180px',
    maxWidth: isMobile ? '160px' : 'none',
    border: isActive
      ? `2px solid ${skill.theme.accent}`
      : isHovered
        ? `2px solid ${skill.theme.accent}80`
        : '2px solid transparent',
    boxShadow: isActive
      ? `0 0 20px ${skill.theme.accent}40`
      : isHovered
        ? `0 0 15px ${skill.theme.accent}30`
        : 'none',
    transform: isHovered && !isActive ? 'scale(1.05)' : 'scale(1)',
  }), [style, isActive, isHovered, skill.theme, isMobile]);

  return (
    <div
      className={styles.skillBoard}
      style={cardStyle}
      onClick={onClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onKeyDown={handleKeyDown}
      role="button"
      tabIndex={0}
      aria-pressed={isActive}
      aria-label={`${skill.name}: ${skill.desc}. Proficiency ${skill.score}%`}
    >
      {/* Hover Tooltip */}
      {isHovered && !isActive && (
        <div
          className={styles.skillTooltip}
          style={{ backgroundColor: skill.theme.accent }}
          aria-hidden="true"
        >
          Preview
          <span
            className={styles.tooltipArrow}
            style={{ backgroundColor: skill.theme.accent }}
          />
        </div>
      )}

      {/* Skill Name */}
      <div
        className={styles.skillName}
        style={{ fontSize: isMobile ? '11px' : '13px' }}
      >
        {skill.name}
      </div>

      {/* Skill Description */}
      <div
        className={styles.skillDesc}
        style={{ fontSize: isMobile ? '9px' : '10px' }}
      >
        {skill.desc}
      </div>

      {/* Proficiency Bar */}
      <div className={styles.skillProgress}>
        <div
          className={styles.skillProgressTrack}
          style={{ height: isMobile ? '3px' : '4px' }}
        >
          <div
            className={styles.skillProgressFill}
            style={{ width: `${skill.score}%` }}
            role="progressbar"
            aria-valuenow={skill.score}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-label={`${skill.name} proficiency`}
          />
        </div>
        <span
          className={styles.skillScore}
          style={{ fontSize: isMobile ? '9px' : '10px' }}
        >
          {skill.score}%
        </span>
      </div>
    </div>
  );
});
