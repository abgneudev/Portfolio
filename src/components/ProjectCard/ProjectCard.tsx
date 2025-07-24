import React from 'react';
import type { Project } from '../../types';
import styles from './ProjectCard.module.css';

interface ProjectCardProps {
  project: Project;
  index: number;
  onClick: () => void;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, index, onClick }) => {
  return (
    <article className={styles.projectCard} onClick={onClick}>
      <span className={styles.index}>{String(index + 1).padStart(2, '0')}</span>
      <h3>{project.title}</h3>
      <p>{project.category}</p>
    </article>
  );
};

export default ProjectCard;