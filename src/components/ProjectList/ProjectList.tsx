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
  // Patch: Set thumbnail for first project
  const getPatchedProjects = (projects: Project[]) => {
    if (projects.length > 0) {
      projects = projects.map((p, i) => {
        if (i === 0) {
          return { 
            ...p, 
            thumbnail: 'https://res.cloudinary.com/dbvfgfqqh/image/upload/v1753595773/iemb_1_cbhloc.gif',
            category: 'FRONTEND ENGINEERING',
            title: 'Embrace Landing Page'
          };
        }
        return p;
      });
    }
    return projects;
  };

  const patchedProjects = getPatchedProjects(projects);

  const getProjectEnhancements = (project: Project) => {
    type Enhancement = {
      outcome: string;
      challenge: string;
      role: string;
      duration: string;
      keyMetric: string;
      keyMetricLabel: string;
      technologies?: string[];
    };
    const enhancements: Record<string, Enhancement> = {
      'Embrace Landing Page': {
        outcome: 'Enhanced landing page accessibility with WCAG-compliant semantic structures',
        challenge: 'Needed to balance inclusive design with high-conversion UI/UX for diverse users',
        role: 'Product Designer & Frontend Engineer',
        duration: 'Jul 2025 - Present',
        keyMetric: '100%',
        keyMetricLabel: 'WCAG Compliance',
        technologies: ['React', 'CSS', 'Figma', 'Semantic HTML']
      },
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
          {patchedProjects.map((project, index) => {
            const enhancements = getProjectEnhancements(project);
            
            return (
              <div
                key={project.id}
                ref={el => { projectRefs.current[index] = el!; }}
                className={`${styles.projectItem} ${activeIndex === index ? styles.active : ''}`}
              >
                <div className={styles.projectContent}>
                  {/* Minimal project number */}
                  <span className={styles.projectNumber}>
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  
                  {/* Enhanced description with outcome + challenge */}
                  <div className={styles.projectDetails}>
                    {enhancements ? (
                      <>
                        <h2 className={styles.projectOutcome}>
                          {enhancements.outcome}
                        </h2>

                        {/* Subtle metadata */}
                        {enhancements && (
                          <div className={styles.projectMeta}>
                            <span>{enhancements.role}</span>
                            <span className={styles.separator}>•</span>
                            <span>{enhancements.duration}</span>
                          </div>
                        )}

                        {enhancements.technologies && (
                          <div className={styles.techStack}>
                            {enhancements.technologies.map((tech, idx) => (
                              <span key={idx} className={styles.techTag}>
                                {tech}
                              </span>
                            ))}
                          </div>
                        )}

                        <p className={styles.projectChallenge}>
                          {enhancements.challenge}
                        </p>
                      </>
                    ) : (
                      <p className={styles.projectDescription}>{project.description}</p>
                    )}
                  </div>
                  
                  {/* Streamlined metrics with hierarchy */}
                  <div className={styles.metricsGrid}>
                    {/* Primary metric - larger */}
                    <div className={styles.metricItem}>
                      <span className={styles.metricValue}>
                        {project.metrics?.primary.value}
                      </span>
                      <span className={styles.metricLabel}>
                        {project.metrics?.primary.label}
                      </span>
                    </div>
                    
                    {/* Secondary metric or key impact */}
                    {enhancements && enhancements.keyMetric ? (
                      <div className={styles.metricItem}>
                        <span className={styles.metricValue}>
                          {enhancements.keyMetric}
                        </span>
                        <span className={styles.metricLabel}>
                          {enhancements.keyMetricLabel}
                        </span>
                      </div>
                    ) : project.metrics?.secondary && (
                      <div className={styles.metricItem}>
                        <span className={styles.metricValue}>
                          {project.metrics.secondary.value}
                        </span>
                        <span className={styles.metricLabel}>
                          {project.metrics.secondary.label}
                        </span>
                      </div>
                    )}
                  </div>
                
                  
                  {/* Clean CTAs */}
                  <div className={styles.ctaGroup}>
                    <button 
                      className={styles.viewProject}
                      onClick={() => onProjectClick(project.id)}
                    >
                      View Case Study →
                    </button>
                    
                    <a 
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        console.log('Download deck for', project.title);
                      }}
                      className={styles.downloadLink}
                    >
                      Download deck (PDF)
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Right side - Sticky image with gradient background */}
        <div className={`${styles.rightPanel} ${isInView ? styles.sticky : ''}`}>
          <div className={styles.imageWrapper}>
            {/* Text overlay positioned outside/above laptop */}
            <div className={styles.imageOverlay}>
              <p className={styles.overlayCategory}>{patchedProjects[activeIndex]?.category}</p>
              <h3 className={styles.overlayTitle}>{patchedProjects[activeIndex]?.title}</h3>
            </div>
            
            {/* Laptop frame with screen */}
            <div className={styles.laptopFrame}>
              <div className={styles.laptopScreen}>
                <img 
                  key={activeIndex}
                  src={patchedProjects[activeIndex]?.thumbnail} 
                  alt={patchedProjects[activeIndex]?.title}
                  className={styles.projectImage}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectList;