import React, { useState, useEffect, useRef } from 'react';
import type { Project } from '../../types';
import styles from './ProjectList.module.css';

interface ProjectListProps {
  projects: Project[];
  onProjectClick: (projectId: string) => void;
}

const ProjectList: React.FC<ProjectListProps> = ({ projects, onProjectClick }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isInView, setIsInView] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const projectRefs = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;

      const sectionRect = sectionRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      // Check if section is in view
      const sectionInView = sectionRect.top < windowHeight && sectionRect.bottom > 0;
      setIsInView(sectionInView);

      if (sectionInView) {
        // Find which project is most visible
        let newActiveIndex = 0;
        let maxVisibility = 0;

        projectRefs.current.forEach((ref, index) => {
          if (ref) {
            const rect = ref.getBoundingClientRect();
            const visibility = Math.max(0, 
              Math.min(rect.bottom, windowHeight) - Math.max(rect.top, 0)
            );
            
            if (visibility > maxVisibility) {
              maxVisibility = visibility;
              newActiveIndex = index;
            }
          }
        });

        setActiveIndex(newActiveIndex);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check initial position

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div ref={sectionRef} className={styles.projectListSection}>
      <div className={styles.projectListContainer}>
        {/* Left side - Project items */}
        <div className={styles.leftPanel}>
          {projects.map((project, index) => (
            <div
              key={project.id}
              ref={el => { projectRefs.current[index] = el!; }}
              className={`${styles.projectItem} ${activeIndex === index ? styles.active : ''}`}
            >
              <div className={styles.projectContent}>
                <span className={styles.projectNumber}>
                  {String(index + 1).padStart(2, '0')}
                </span>
                <p className={styles.projectCategory}>{project.category}</p>
                <h2 className={styles.projectTitle}>{project.title}</h2>
                <p className={styles.projectDescription}>{project.description}</p>
                <div className={styles.projectMetrics}>
                  <div className={styles.metric}>
                    <span className={styles.metricValue}>{project.metrics?.primary.value}</span>
                    <span className={styles.metricLabel}>{project.metrics?.primary.label}</span>
                  </div>
                  {project.metrics?.secondary && (
                    <div className={styles.metric}>
                      <span className={styles.metricValue}>{project.metrics.secondary.value}</span>
                      <span className={styles.metricLabel}>{project.metrics.secondary.label}</span>
                    </div>
                  )}
                </div>
                <button 
                  className={styles.viewProject}
                  onClick={() => onProjectClick(project.id)}
                >
                  View Project →
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Right side - Sticky image */}
        <div className={`${styles.rightPanel} ${isInView ? styles.sticky : ''}`}>
          <div className={styles.imageWrapper}>
            <img 
              key={activeIndex}
              src={projects[activeIndex]?.thumbnail} 
              alt={projects[activeIndex]?.title}
              className={styles.projectImage}
            />
            <div className={styles.imageOverlay}>
              <p className={styles.overlayCategory}>{projects[activeIndex]?.category}</p>
              <h3 className={styles.overlayTitle}>{projects[activeIndex]?.title}</h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectList;