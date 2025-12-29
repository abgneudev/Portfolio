'use client';

import { useState, memo } from 'react';
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
  const [selectedSkill, setSelectedSkill] = useState<SkillInfo | null>(null);
  const [imageIndex, setImageIndex] = useState(0);

  const handleSkillChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const skillName = e.target.value;
    if (skillName === '') {
      setSelectedSkill(null);
      setImageIndex(0);
    } else {
      const skill = SKILLS.find(s => s.name === skillName);
      if (skill) {
        analytics.trackMobileSkillSelect(skill.name);
        setSelectedSkill(skill);
        setImageIndex(0);
      }
    }
  };

  const currentImage = selectedSkill?.images[imageIndex];

  return (
    <div className={styles.mobileSkillsDropdown}>
      <select
        className={styles.mobileSkillsSelect}
        value={selectedSkill?.name || ''}
        onChange={handleSkillChange}
        style={{
          color: selectedSkill ? sceneColors.text : sceneColors.textMuted,
          borderColor: sceneColors.textMuted
        }}
        aria-label="Select a skill to learn more"
      >
        <option value="">How can I help?</option>
        {SKILLS.map((skill) => (
          <option key={skill.name} value={skill.name}>
            {skill.name}
          </option>
        ))}
      </select>

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
                  aspectRatio="16:9"
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
