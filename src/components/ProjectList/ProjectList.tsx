import React from 'react';
import type { Project } from '../../types';
import styles from './ProjectList.module.css';

interface ProjectListProps {
  projects: Project[];
  onProjectClick: (projectId: string) => void;
}

const ProjectList: React.FC<ProjectListProps> = ({ projects, onProjectClick }) => {
  return (
    <section className={styles.projectSection}>
      <div className={styles.container}>
        <header className={styles.sectionHeader}>
          <span className={styles.label}>Selected Work</span>
          <h2 className={styles.sectionTitle}>
            Crafting experiences that matter
          </h2>
        </header>

        <div className={styles.projectGrid}>
          {projects.map((project, index) => (
            <article 
              key={project.id}
              className={styles.projectCard}
              onClick={() => onProjectClick(project.id)}
            >
              <div className={styles.projectImage}>
                <img src={project.thumbnail} alt={project.title} />
                <div className={styles.projectOverlay}>
                  <span className={styles.viewProject}>View Project</span>
                </div>
              </div>
              
              <div className={styles.projectInfo}>
                <div className={styles.projectMeta}>
                  <span className={styles.projectIndex}>
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <span className={styles.projectYear}>{project.year}</span>
                </div>
                
                <h3 className={styles.projectTitle}>{project.title}</h3>
                <p className={styles.projectCategory}>{project.category}</p>
                
                <div className={styles.projectMetrics}>
                  <div className={styles.metric}>
                    <span className={styles.metricValue} style={{ color: project.color }}>
                      {project.metrics.primary.value}
                    </span>
                    <span className={styles.metricLabel}>
                      {project.metrics.primary.label}
                    </span>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectList;