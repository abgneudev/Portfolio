'use client';

import { useState, memo } from 'react';
import { CloudinaryMedia } from '@/components/ui';
import styles from '../Hero.module.css';

interface ImageInfo {
  publicId: string;
  alt: string;
  title: string;
  caption: string;
}

interface SkillInfo {
  name: string;
  title: string;
  description: string;
  tools: string[];
  images: ImageInfo[];
}

const SKILLS: SkillInfo[] = [
  {
    name: 'UI/UX Design',
    title: 'Designing intuitive experiences',
    description: 'Creating interfaces that balance aesthetics with usability. I focus on user flows, information architecture, and visual hierarchy.',
    tools: ['Figma', 'Framer', 'Principle'],
    images: [
      { publicId: 'v1753782203/handsketch_hq7ogw.jpg', alt: 'Wireframe sketch', title: 'User Interviews', caption: 'Early wireframe explorations' },
      { publicId: 'v1753782203/handsketch_hq7ogw.jpg', alt: 'High fidelity mockup', title: 'Product Design', caption: 'Final design iteration' },
      { publicId: 'v1753782203/handsketch_hq7ogw.jpg', alt: 'Journey map', title: 'Journey Mapping', caption: 'User journey visualization' }
    ]
  },
  {
    name: 'Frontend Development',
    title: 'Building performant interfaces',
    description: 'Modern React patterns with server components, optimistic updates, and seamless data fetching.',
    tools: ['TypeScript', 'Next.js', 'Tailwind'],
    images: [
      { publicId: 'v1755074594/hackwin_q1xfde.png', alt: 'Hackathon winning project', title: 'Hackathon Win', caption: 'Award-winning project showcase' }
    ]
  },
  {
    name: 'Accessibility',
    title: 'Inclusive by default',
    description: 'WCAG compliance, semantic HTML, keyboard navigation, and screen reader support.',
    tools: ['axe', 'NVDA', 'VoiceOver'],
    images: [
      { publicId: 'v1753782203/handsketch_hq7ogw.jpg', alt: 'Accessibility audit', title: 'Auditing', caption: 'axe DevTools audit results' },
      { publicId: 'v1753782203/handsketch_hq7ogw.jpg', alt: 'Screen reader testing', title: 'Screen Readers', caption: 'VoiceOver navigation flow' }
    ]
  },
  {
    name: 'Side Hacks',
    title: 'Experiments & explorations',
    description: 'Building tools, games, and utilities that scratch my own itch.',
    tools: ['React', 'Node.js', 'WebGL'],
    images: [
      { publicId: 'v1753782203/handsketch_hq7ogw.jpg', alt: 'Side project', title: 'WebGL Shaders', caption: 'Shader experiment' },
      { publicId: 'v1753782203/handsketch_hq7ogw.jpg', alt: 'Game prototype', title: 'Game Dev', caption: 'Canvas game prototype' }
    ]
  }
];

interface SkillsPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SkillsPanel = memo(function SkillsPanel({ isOpen, onClose }: SkillsPanelProps) {
  const [activeSkill, setActiveSkill] = useState<SkillInfo>(SKILLS[0]);
  const [imageIndex, setImageIndex] = useState(0);

  const handleSkillChange = (skill: SkillInfo) => {
    setActiveSkill(skill);
    setImageIndex(0);
  };

  const currentImage = activeSkill.images[imageIndex];

  if (!isOpen) return null;

  return (
    <aside
      className={styles.skillsPanel}
      role="dialog"
      aria-label="Skills and expertise"
    >
      {/* Glass backdrop */}
      <div className={styles.skillsPanelBackdrop} onClick={onClose} />

      {/* Panel content */}
      <div className={styles.skillsPanelContent}>
        {/* Left pane - Skills list */}
        <nav className={styles.skillsPanelNav} aria-label="Skills list">
          <ul className={styles.skillsPanelList}>
            {SKILLS.map((skill) => (
              <li key={skill.name}>
                <button
                  type="button"
                  className={`${styles.skillsPanelItem} ${activeSkill.name === skill.name ? styles.skillsPanelItemActive : ''}`}
                  onClick={() => handleSkillChange(skill)}
                  aria-current={activeSkill.name === skill.name ? 'true' : undefined}
                >
                  {skill.name}
                </button>
              </li>
            ))}
          </ul>

          <button
            type="button"
            className={styles.skillsPanelClose}
            onClick={onClose}
            aria-label="Close skills panel"
          >
            Close
          </button>
        </nav>

        {/* Right pane - Skill slider */}
        <div className={styles.skillsPanelSlider}>
          <article
            key={activeSkill.name}
            className={styles.skillsPanelSlide}
          >
            <div className={styles.skillsPanelMeta}>
              <h2 className={styles.skillsPanelHeading}>{activeSkill.title}</h2>
              <p className={styles.skillsPanelDescription}>{activeSkill.description}</p>

              <div className={styles.skillsPanelTools}>
                <span className={styles.skillsPanelToolsLabel}>Tools:</span>
                <ul className={styles.skillsPanelToolsList}>
                  {activeSkill.tools.map((tool) => (
                    <li key={tool} className={styles.skillsPanelTool}>{tool}</li>
                  ))}
                </ul>
              </div>
            </div>

            <div className={styles.skillsPanelImageSlider}>
              {activeSkill.images.length > 1 && (
                <nav className={styles.skillsPanelImageNav}>
                  {activeSkill.images.map((img, idx) => (
                    <button
                      key={idx}
                      type="button"
                      className={`${styles.skillsPanelImageNavItem} ${idx === imageIndex ? styles.skillsPanelImageNavItemActive : ''}`}
                      onClick={() => setImageIndex(idx)}
                    >
                      {img.title}
                    </button>
                  ))}
                </nav>
              )}
              <div className={styles.skillsPanelImageWrapper} key={`${activeSkill.name}-${imageIndex}`}>
                <CloudinaryMedia
                  publicId={currentImage.publicId}
                  alt={currentImage.alt}
                  aspectRatio="16:9"
                  width={800}
                  sizes="(max-width: 768px) 100vw, 60vw"
                  className={styles.skillsPanelImage}
                  placeholder="blur"
                />
              </div>
              <p className={styles.skillsPanelCaption}>{currentImage.caption}</p>
            </div>
          </article>
        </div>
      </div>
    </aside>
  );
});
