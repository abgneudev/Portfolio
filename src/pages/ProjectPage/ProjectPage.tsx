import React from 'react';
import type { Project } from '../../types/index';
import styles from './ProjectPage.module.css';

interface ProjectPageProps {
  project: Project;
  onBack: () => void;
}

const ProjectPage: React.FC<ProjectPageProps> = ({ project, onBack }) => {
  return (
    <div className={styles.projectPage}>
      <div className="grid">
        <div style={{ gridColumn: '2 / span 10', width: '100%' }}>
          <button onClick={onBack}>Back to projects</button>
          <h1>{project.title}</h1>
          <p>{project.description}</p>
        </div>
      </div>
    </div>
  );
};

export default ProjectPage;