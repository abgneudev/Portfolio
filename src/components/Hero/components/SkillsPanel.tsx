'use client';

import { useState, memo } from 'react';
import { CloudinaryMedia } from '@/components/ui';
import { analytics } from '@/lib/analytics';
import styles from '../Hero.module.css';

export interface ImageInfo {
  publicId: string;
  alt: string;
  title: string;
  caption: string;
}

export interface SkillInfo {
  name: string;
  title: string;
  description: string;
  skills: string[];
  images: ImageInfo[];
}

export const SKILLS: SkillInfo[] = [
  {
    name: 'Frontend Engineering',
    title: 'Production-ready execution',
    description: 'I eliminate the design-to-code gap by engineering pixel-perfect interfaces directly in React and Flutter. I focus on component reusability and performance, shipping high-fidelity UI that functions as well as it looks.',
    skills: ['TypeScript', 'React', 'Next.js', 'Flutter', 'Tailwind CSS'],
    images: [
      { publicId: 'v1755074582/hack_dtm0q6.png', alt: 'Hackathon coding session with developers working in a room with large screens displaying code while a team member presents', title: 'Engineering', caption: 'Collaborting with Product Managers, Developers, Founders at Harvard Innovation Labs' }
    ]
  },
  {
    name: 'Product Design',
    title: 'Systems that scale',
    description: 'I create scalable design systems using tokens and atomic components that translate cleanly into code. My work prioritizes logical structure and maintainability, ensuring the final product matches the design intent without friction.',
    skills: ['Figma', 'Design Systems', 'Information Architecture', 'Interaction Design'],
    images: [
      { publicId: 'v1766960197/bpl_sovi44.png', alt: 'Team collaboration session with three people discussing design work around a table with laptops in a modern office space', title: 'Product Design', caption: 'Designing website for Bentley University x IxDF Designathon focused on Sustainability' }
    ]
  },
  {
    name: 'Accessibility',
    title: 'Inclusive by default',
    description: 'I engineer for inclusivity by treating WCAG guidelines as a core architectural requirement. My approach uses semantic HTML and rigorous testing to ensure seamless navigation and usability for assistive technology users.',
    skills: ['WCAG 2.2 AA', 'Semantic HTML', 'axe DevTools', 'Assistive Tech'],
    images: [
      { publicId: 'v1766964645/accessibility_pj5yw0.png', alt: 'Accessibility audit dashboard showing WCAG compliance scores and testing results', title: 'Auditing', caption: '' }
    ]
  },
  {
    name: 'Side Hacks',
    title: 'Full-stack intelligence',
    description: 'I extend my capabilities to the backend by architecting RAG-powered tools and integrating LLMs. Using Python and modern data stacks, I rapidly turn complex concepts into functional, intelligent applications.',
    skills: ['Python', 'FastAPI', 'RAG Architecture', 'Vector DBs', 'LLM Integration'],
    images: [
      { publicId: 'v1755074594/hackwin_q1xfde.png', alt: 'Hackathon winning team of four people on stage receiving an award at a Women in AI hackathon event', title: 'AI Integration', caption: 'Impact Award Winner at Women in AI Hackathon, AWS. Developed an AI-powered Influencer Management System.' }
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
    analytics.trackSkillTab(skill.name);
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
                <ul className={styles.skillsPanelToolsList}>
                  {activeSkill.skills.map((skill) => (
                    <li key={skill} className={styles.skillsPanelTool}>{skill}</li>
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
