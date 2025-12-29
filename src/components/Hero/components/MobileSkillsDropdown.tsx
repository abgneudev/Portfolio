'use client';

import { useState, useRef, useEffect, memo } from 'react';
import { CloudinaryMedia } from '@/components/ui';
import { analytics } from '@/lib/analytics';
import { SKILLS, type SkillInfo } from './SkillsPanel';
import styles from '../Hero.module.css';

interface SceneColors {
  bg: string;
  fg: string;
  accent: string;
  text: string;
  textMuted: string;
}

interface MobileSkillsDropdownProps {
  sceneColors: SceneColors;
}

export const MobileSkillsDropdown = memo(function MobileSkillsDropdown({
  sceneColors
}: MobileSkillsDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedSkill, setSelectedSkill] = useState<SkillInfo | null>(null);
  const [imageIndex, setImageIndex] = useState(0);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [isOpen]);

  // Close dropdown on escape key
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      return () => document.removeEventListener('keydown', handleEscape);
    }
  }, [isOpen]);

  const handleSkillSelect = (skill: SkillInfo) => {
    analytics.trackMobileSkillSelect(skill.name);
    setSelectedSkill(skill);
    setImageIndex(0);
    setIsOpen(false);
  };

  const currentImage = selectedSkill?.images[imageIndex];

  return (
    <div className={styles.mobileSkillsDropdown}>
      {/* Dropdown trigger wrapper - constrains only the button */}
      <div className={styles.mobileSkillsDropdownTrigger} ref={dropdownRef}>
        {/* Custom Dropdown Trigger */}
        <button
          type="button"
          className={styles.mobileSkillsSelect}
          onClick={() => setIsOpen(!isOpen)}
          style={{
            color: selectedSkill ? sceneColors.text : sceneColors.textMuted,
            borderColor: sceneColors.textMuted
          }}
          aria-haspopup="listbox"
          aria-expanded={isOpen}
          aria-label="Select a skill to learn more"
        >
          <span>{selectedSkill?.name || 'How can I help?'}</span>
          <span
            className={styles.dropdownArrow}
            style={{ transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}
            aria-hidden="true"
          >
            ▼
          </span>
        </button>

        {/* Dropdown Menu */}
        {isOpen && (
          <ul
            className={styles.mobileSkillsMenu}
            role="listbox"
            style={{
              backgroundColor: sceneColors.bg,
              borderColor: sceneColors.textMuted
            }}
          >
            {SKILLS.map((skill) => (
              <li key={skill.name} role="option" aria-selected={selectedSkill?.name === skill.name}>
                <button
                  type="button"
                  className={`${styles.mobileSkillsMenuItem} ${selectedSkill?.name === skill.name ? styles.mobileSkillsMenuItemActive : ''}`}
                  onClick={() => handleSkillSelect(skill)}
                  style={{
                    color: selectedSkill?.name === skill.name ? sceneColors.text : sceneColors.textMuted
                  }}
                >
                  {skill.name}
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      {selectedSkill && (
        <div className={styles.mobileSkillDetails}>
          <h3
            className={styles.mobileSkillTitle}
            style={{ color: sceneColors.text }}
          >
            {selectedSkill.title}
          </h3>
          <p
            className={styles.mobileSkillDescription}
            style={{ color: sceneColors.textMuted }}
          >
            {selectedSkill.description}
          </p>

          <div className={styles.mobileSkillTags}>
            {selectedSkill.skills.map((skill) => (
              <span
                key={skill}
                className={styles.mobileSkillTag}
                style={{
                  backgroundColor: `${sceneColors.accent}20`,
                  color: sceneColors.text
                }}
              >
                {skill}
              </span>
            ))}
          </div>

          {currentImage && (
            <div className={styles.mobileSkillImageSection}>
              {selectedSkill.images.length > 1 && (
                <div className={styles.mobileSkillImageNav}>
                  {selectedSkill.images.map((img, idx) => (
                    <button
                      key={idx}
                      type="button"
                      className={`${styles.mobileSkillImageNavItem} ${idx === imageIndex ? styles.mobileSkillImageNavItemActive : ''}`}
                      onClick={() => setImageIndex(idx)}
                      style={{
                        color: idx === imageIndex ? sceneColors.text : sceneColors.textMuted
                      }}
                    >
                      {img.title}
                    </button>
                  ))}
                </div>
              )}
              <div className={styles.mobileSkillImageWrapper}>
                <CloudinaryMedia
                  publicId={currentImage.publicId}
                  alt={currentImage.alt}
                  aspectRatio="4:3"
                  width={400}
                  sizes="100vw"
                  className={styles.mobileSkillImage}
                  placeholder="blur"
                />
              </div>
              <p
                className={styles.mobileSkillCaption}
                style={{ color: sceneColors.textMuted }}
              >
                {currentImage.caption}
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
});
