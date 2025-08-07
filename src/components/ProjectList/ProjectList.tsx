import React, { useState, useEffect, useRef } from 'react';
import type { Project } from '../../types';
import styles from './ProjectList.module.css';

interface ProjectListProps {
  projects: Project[];
  onProjectClick: (projectId: string) => void;
  onNavigate?: (page: 'home' | 'project' | 'about', projectId?: string) => void;
}

const ProjectList: React.FC<ProjectListProps> = ({ projects, onProjectClick, onNavigate }) => {
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

  // Handle navigation to case study
  const handleViewCaseStudy = (projectId: string) => {
    if (onNavigate) {
      // Navigate to project page with the specific project ID
      onNavigate('project', projectId);
    } else {
      // Fallback to onProjectClick if onNavigate is not provided
      onProjectClick(projectId);
    }
  };

  // Enhanced project data mapping - customize based on your projects
  // Patch: Set thumbnail for first project
  const getPatchedProjects = (projects: Project[]) => {
    if (projects.length > 0) {
      projects = projects.map((p, i) => {
        if (i === 0) {
          return { 
            ...p,
            id: 'embrace-landing', // Set specific ID for navigation
            thumbnail: 'https://res.cloudinary.com/dbvfgfqqh/image/upload/v1753595773/iemb_1_cbhloc.gif',
            category: 'FRONTEND ENGINEERING',
            title: 'Embrace Landing Page'
          };
        }
        if (i === 1) {
          return {
            ...p,
            id: 'vino-social', // Set specific ID for navigation
            title: 'Vino Social',
            category: 'MOBILE APP DESIGN',
            thumbnail: 'https://res.cloudinary.com/dbvfgfqqh/image/upload/v1753607070/wine2_awu0gc.gif'
          };
        }
        if (i === 2) {
          return {
            ...p,
            id: 'stopwatch-pro', // Set specific ID for navigation
            title: 'Stopwatch Pro',
            category: 'MOBILE APP DESIGN',
            thumbnail: 'https://res.cloudinary.com/dbvfgfqqh/image/upload/v1753795209/prod_guapwd.gif'
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
      'Stopwatch Pro': {
        outcome: 'Designed a productivity stopwatch that helps young professionals boost focus',
        challenge: 'Young professionals struggled with distractions and lack of feedback while working, leading to poor time management',
        role: 'Product Designer & UX Researcher',
        duration: '2 months',
        keyMetric: '87%',
        keyMetricLabel: 'Reduced Cognitive Load',
        technologies: ['Figma', 'MS Office Suite', 'Adobe Firefly', 'User Research']
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
    } else if (activeIndex === 2) {
      return 'View case study ↗';
    }
    return 'View project';
  };

  // Determine if current project should use mobile frame
  const shouldUseMobileFrame = (index: number) => {
    return index === 1 || index === 2; // 2nd and 3rd projects
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

                  {/* Mobile image - shows only on mobile */}
                  <div className={styles.mobileImageWrapper}>
                    {shouldUseMobileFrame(index) ? (
                      <div className={styles.mobileFrame}>
                        <div className={styles.mobileScreen}>
                          {index === 1 ? (
                            <a
                              href="https://www.figma.com/proto/KctXQSYE4LA9EKBHL4wypA/Winesy?page-id=0%3A1&node-id=148-98&starting-point-node-id=359%3A461&t=0nHl7uQwQ0k9tEvI-1&scaling=scale-down&content-scaling=fixed"
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <img 
                                src={project.thumbnail} 
                                alt={project.title}
                                className={styles.projectImage}
                              />
                            </a>
                          ) : index === 2 ? (
                            <a
                              href="https://www.figma.com/proto/s2VkZLohw7I5X4Ua5RBAU5/Stopwatch?page-id=1%3A2&node-id=63-116&p=f&viewport=666%2C384%2C0.16&t=HTnQJyOp3xs21Jp0-1&scaling=scale-down&content-scaling=fixed&starting-point-node-id=63%3A116"
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <img 
                                src={project.thumbnail} 
                                alt={project.title}
                                className={styles.projectImage}
                              />
                            </a>
                          ) : (
                            <img 
                              src={project.thumbnail} 
                              alt={project.title}
                              className={styles.projectImage}
                            />
                          )}
                        </div>
                      </div>
                    ) : (
                      <div className={styles.laptopFrame}>
                        <div className={styles.laptopScreen}>
                          {index === 0 ? (
                            <a
                              href="https://iembraceland.com/"
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <img 
                                src={project.thumbnail} 
                                alt={project.title}
                                className={styles.projectImage}
                              />
                            </a>
                          ) : (
                            <img 
                              src={project.thumbnail} 
                              alt={project.title}
                              className={styles.projectImage}
                            />
                          )}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Text overlay positioned outside/above laptop */}
                  <div className={styles.imageOverlay}>
                    <p className={styles.overlayCategory}>{project.category}</p>
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
                      onClick={() => handleViewCaseStudy(project.id)}
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
            
            {/* Conditional rendering: Laptop for first project, Mobile for second and third */}
            {shouldUseMobileFrame(activeIndex) ? (
              // Mobile phone frame
              <div className={styles.mobileFrame}>
                <div 
                  className={styles.mobileScreen}
                  onMouseMove={handleMouseMove}
                  onMouseEnter={() => setIsHovering(true)}
                  onMouseLeave={() => setIsHovering(false)}
                >
                  {activeIndex === 1 ? (
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
                  ) : activeIndex === 2 ? (
                    // For 3rd project (Stopwatch Pro)
                    <a
                      href="https://www.figma.com/proto/s2VkZLohw7I5X4Ua5RBAU5/Stopwatch?page-id=1%3A2&node-id=63-116&p=f&viewport=666%2C384%2C0.16&t=HTnQJyOp3xs21Jp0-1&scaling=scale-down&content-scaling=fixed&starting-point-node-id=63%3A116"
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
                      onClick={() => handleViewCaseStudy(patchedProjects[activeIndex].id)}
                      style={{ cursor: 'pointer' }}
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
                      onClick={() => handleViewCaseStudy(patchedProjects[activeIndex].id)}
                      style={{ cursor: 'pointer' }}
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