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

  // Enhanced project data mapping - customize based on your projects
  const getProjectEnhancements = (project: Project) => {
    type Enhancement = {
      outcome: string;
      challenge: string;
      role: string;
      duration: string;
      keyMetric: string;
      keyMetricLabel: string;
    };
    const enhancements: Record<string, Enhancement> = {
      'Quantum Finance': {
        outcome: 'Increased mobile banking adoption by 127%',
        challenge: 'Lost 3M+ Gen-Z users yearly to competitors',
        role: 'Lead Designer',
        duration: '6 months',
        keyMetric: '$8.2M',
        keyMetricLabel: 'Revenue Impact'
      },
      'Artisan Market': {
        outcome: 'Boosted artisan sales by 89%',
        challenge: 'Local artisans struggled against e-commerce giants',
        role: 'Design Lead',
        duration: '4 months',
        keyMetric: '2,400',
        keyMetricLabel: 'Artisans Onboarded'
      }
    };
    
    return enhancements[project.title] || null;
  };

  return (
    <div ref={sectionRef} className={styles.projectListSection}>
      <div className={styles.projectListContainer}>
        {/* Left side - Project items */}
        <div className={styles.leftPanel}>
          {projects.map((project, index) => {
            const enhancements = getProjectEnhancements(project);
            
            return (
              <div
                key={project.id}
                ref={el => { projectRefs.current[index] = el!; }}
                className={`${styles.projectItem} ${activeIndex === index ? styles.active : ''}`}
              >
                <div className={styles.projectContent}>
                  {/* Minimal project number */}
                  <span className={styles.projectNumber} style={{ 
                    fontSize: '12px',
                    opacity: 0.4,
                    marginBottom: '24px'
                  }}>
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  
                  {/* Category - smaller, lighter */}
                  <p className={styles.projectCategory} style={{
                    fontSize: '12px',
                    opacity: 0.6,
                    marginBottom: '12px'
                  }}>
                    {project.category}
                  </p>
                  
                  {/* Title remains prominent */}
                  <h2 className={styles.projectTitle}>{project.title}</h2>
                  
                  {/* Enhanced description with outcome + challenge */}
                  <div style={{ marginBottom: '32px' }}>
                    {enhancements ? (
                      <>
                        <p style={{ 
                          fontSize: '20px',
                          fontWeight: '500',
                          color: '#1a1a1a',
                          lineHeight: '1.4',
                          marginBottom: '8px'
                        }}>
                          {enhancements.outcome}
                        </p>
                        <p style={{ 
                          fontSize: '16px',
                          color: '#666',
                          lineHeight: '1.5'
                        }}>
                          {enhancements.challenge}
                        </p>
                      </>
                    ) : (
                      <p className={styles.projectDescription}>{project.description}</p>
                    )}
                  </div>
                  
                  {/* Streamlined metrics with hierarchy */}
                  <div style={{ 
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr',
                    gap: '32px',
                    marginBottom: '32px'
                  }}>
                    {/* Primary metric - larger */}
                    <div>
                      <span style={{
                        display: 'block',
                        fontSize: '36px',
                        fontWeight: '300',
                        color: '#0066ff',
                        lineHeight: '1',
                        marginBottom: '4px'
                      }}>
                        {project.metrics?.primary.value}
                      </span>
                      <span style={{
                        fontSize: '13px',
                        color: '#666',
                        letterSpacing: '0.02em'
                      }}>
                        {project.metrics?.primary.label}
                      </span>
                    </div>
                    
                    {/* Secondary metric or key impact */}
                    {enhancements && enhancements.keyMetric ? (
                      <div>
                        <span style={{
                          display: 'block',
                          fontSize: '36px',
                          fontWeight: '300',
                          color: '#0066ff',
                          lineHeight: '1',
                          marginBottom: '4px'
                        }}>
                          {enhancements.keyMetric}
                        </span>
                        <span style={{
                          fontSize: '13px',
                          color: '#666',
                          letterSpacing: '0.02em'
                        }}>
                          {enhancements.keyMetricLabel}
                        </span>
                      </div>
                    ) : project.metrics?.secondary && (
                      <div>
                        <span style={{
                          display: 'block',
                          fontSize: '36px',
                          fontWeight: '300',
                          color: '#0066ff',
                          lineHeight: '1',
                          marginBottom: '4px'
                        }}>
                          {project.metrics.secondary.value}
                        </span>
                        <span style={{
                          fontSize: '13px',
                          color: '#666',
                          letterSpacing: '0.02em'
                        }}>
                          {project.metrics.secondary.label}
                        </span>
                      </div>
                    )}
                  </div>
                  
                  {/* Subtle metadata */}
                  {enhancements && (
                    <div style={{ 
                      display: 'flex',
                      gap: '24px',
                      marginBottom: '40px',
                      fontSize: '13px',
                      color: '#666',
                      opacity: 0.8
                    }}>
                      <span>{enhancements.role}</span>
                      <span>•</span>
                      <span>{enhancements.duration}</span>
                    </div>
                  )}
                  
                  {/* Clean CTAs */}
                  <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
                    <button 
                      className={styles.viewProject}
                      onClick={() => onProjectClick(project.id)}
                      style={{
                        background: '#0066ff',
                        color: 'white',
                        border: 'none',
                        padding: '14px 28px',
                        fontSize: '15px',
                        fontWeight: '500',
                        cursor: 'pointer',
                        borderRadius: '4px',
                        transition: 'all 0.2s'
                      }}
                    >
                      View Case Study →
                    </button>
                    
                    <a 
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        console.log('Download deck for', project.title);
                      }}
                      style={{ 
                        color: '#0066ff',
                        fontSize: '14px',
                        textDecoration: 'none',
                        opacity: 0.8,
                        transition: 'opacity 0.2s'
                      }}
                      onMouseEnter={(e) => e.currentTarget.style.opacity = '1'}
                      onMouseLeave={(e) => e.currentTarget.style.opacity = '0.8'}
                    >
                      Download deck (PDF)
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
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