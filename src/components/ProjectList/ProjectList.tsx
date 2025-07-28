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
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
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

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
  };

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
        if (i === 1) {
          return {
            ...p,
            title: 'Vino Social',
            category: 'MOBILE APP DESIGN',
            thumbnail: 'https://res.cloudinary.com/dbvfgfqqh/image/upload/v1753607070/wine2_awu0gc.gif'
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
      'Vino Social': {
        outcome: 'Designed 30+ screens for a wine discovery social platform with Harvard MBA grad',
        challenge: 'Wine enthusiasts lacked a Goodreads-style platform to discover, rate, and share wine experiences',
        role: 'Product Designer',
        duration: '2 months',
        keyMetric: '30+',
        keyMetricLabel: 'Screens Designed',
        technologies: ['Figma', 'Prototyping', 'User Research', 'UI/UX']
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

  // Get tooltip text based on active project
  const getTooltipText = () => {
    if (activeIndex === 0) {
      return 'View live website ↗';
    } else if (activeIndex === 1) {
      return 'Open interactive prototype ↗';
    }
    return 'View project';
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
                    {`${index + 1}/${patchedProjects.length}`}
                  </span>

                  {/* Text overlay positioned outside/above laptop */}
                  <div className={styles.imageOverlay}>
                    <p className={styles.overlayCategory}>{patchedProjects[activeIndex]?.category}</p>
                  </div>
                        
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
            
            {/* Conditional rendering: Laptop for first project, Mobile for second */}
            {activeIndex === 1 ? (
              // Mobile phone frame
              <div className={styles.mobileFrame}>
                <div 
                  className={styles.mobileScreen}
                  onMouseMove={handleMouseMove}
                  onMouseEnter={() => setIsHovering(true)}
                  onMouseLeave={() => setIsHovering(false)}
                >
                  <a
                    href="https://www.figma.com/proto/KctXQSYE4LA9EKBHL4wypA/Winesy?page-id=0%3A1&node-id=148-98&starting-point-node-id=359%3A461&t=0nHl7uQwQ0k9tEvI-1&scaling=scale-down&content-scaling=fixed"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img 
                      key={activeIndex}
                      src={patchedProjects[activeIndex]?.thumbnail} 
                      alt={patchedProjects[activeIndex]?.title}
                      className={styles.projectImage}
                    />
                  </a>
                  {/* Cursor-following tooltip */}
                  {isHovering && (
                    <span 
                      className={styles.tooltip}
                      style={{
                        left: `${mousePosition.x}px`,
                        top: `${mousePosition.y - 30}px`,
                        transform: 'translateX(-50%)'
                      }}
                    >
                      {getTooltipText()}
                    </span>
                  )}
                </div>
              </div>
            ) : (
              // Laptop frame with screen
              <div className={styles.laptopFrame}>
                <div 
                  className={styles.laptopScreen}
                  onMouseMove={handleMouseMove}
                  onMouseEnter={() => setIsHovering(true)}
                  onMouseLeave={() => setIsHovering(false)}
                >
                  {activeIndex === 0 ? (
                    <a
                      href="https://iembraceland.com/"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <img 
                        key={activeIndex}
                        src={patchedProjects[activeIndex]?.thumbnail} 
                        alt={patchedProjects[activeIndex]?.title}
                        className={styles.projectImage}
                      />
                    </a>
                  ) : (
                    <img 
                      key={activeIndex}
                      src={patchedProjects[activeIndex]?.thumbnail} 
                      alt={patchedProjects[activeIndex]?.title}
                      className={styles.projectImage}
                    />
                  )}
                  {/* Cursor-following tooltip */}
                  {isHovering && (
                    <span 
                      className={styles.tooltip}
                      style={{
                        left: `${mousePosition.x}px`,
                        top: `${mousePosition.y - 30}px`,
                        transform: 'translateX(-50%)'
                      }}
                    >
                      {getTooltipText()}
                    </span>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectList;