'use client';

import { useState, useRef, useEffect, memo } from 'react';
import { CloudinaryMedia } from '@/components/ui';
import { analytics } from '@/lib/analytics';
import { SKILLS, type SkillInfo } from './SkillsPanel';
import styles from '../Hero.module.css';

interface MobileSkillsDropdownProps {
  onSkillSelect?: (hasSelection: boolean) => void;
}

export const MobileSkillsDropdown = memo(function MobileSkillsDropdown({ onSkillSelect }: MobileSkillsDropdownProps) {
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
    onSkillSelect?.(true);
  };

  const handleClearSelection = () => {
    setSelectedSkill(null);
    setImageIndex(0);
    setIsOpen(false);
    onSkillSelect?.(false);
  };

  const currentImage = selectedSkill?.images[imageIndex];

  return (
    <div className={styles.mobileSkillsDropdown}>
      {/* Dropdown trigger wrapper - constrains only the button */}
      <div className={styles.mobileSkillsDropdownTrigger} ref={dropdownRef}>
        {/* Custom Dropdown Trigger */}
        <button
          type="button"
          className={`${styles.mobileSkillsSelect} ${selectedSkill ? styles.mobileSkillsSelectActive : ''}`}
          onClick={() => setIsOpen(!isOpen)}
          aria-haspopup="listbox"
          aria-expanded={isOpen}
          aria-label="Select a skill to learn more"
        >
          <span>{selectedSkill?.name || 'How can I help?'}</span>
          <span
            className={`${styles.dropdownArrow} ${isOpen ? styles.dropdownArrowOpen : ''}`}
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
          >
            {SKILLS.map((skill) => (
              <li key={skill.name} role="option" aria-selected={selectedSkill?.name === skill.name}>
                <button
                  type="button"
                  className={`${styles.mobileSkillsMenuItem} ${selectedSkill?.name === skill.name ? styles.mobileSkillsMenuItemActive : ''}`}
                  onClick={() => handleSkillSelect(skill)}
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
          <button
            type="button"
            className={styles.mobileSkillClose}
            onClick={handleClearSelection}
            aria-label="Close skill details"
          >
            ✕
          </button>
          <h3 className={styles.mobileSkillTitle}>
            {selectedSkill.title}
          </h3>
          <p className={styles.mobileSkillDescription}>
            {selectedSkill.description}
          </p>

          <div className={styles.mobileSkillTags}>
            {selectedSkill.skills.map((skill) => (
              <span
                key={skill}
                className={styles.mobileSkillTag}
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
              <p className={styles.mobileSkillCaption}>
                {currentImage.caption}
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
});
