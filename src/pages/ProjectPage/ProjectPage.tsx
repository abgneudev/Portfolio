import React from 'react';
import CaseStudy from '../../components/CaseStudy/CaseStudy';
import styles from './ProjectPage.module.css';
import type { Project } from '../../types/index';

interface ProjectPageProps {
  project?: Project;
  projectId?: string;
  onBack: () => void;
}

const ProjectPage: React.FC<ProjectPageProps> = ({ project, projectId, onBack }) => {
  // Map project IDs to case study types
  const projectMapping: Record<string, 'embrace' | 'vino' | 'stopwatch'> = {
    'embrace-landing': 'embrace',
    'vino-social': 'vino',
    'stopwatch-pro': 'stopwatch',
    'fintech-redesign': 'embrace',
    'ecommerce-platform': 'vino',
    'saas-dashboard': 'stopwatch'
  };

  // Check if this is a case study project
  const caseStudyType = projectId ? projectMapping[projectId] : null;

  // If it's a case study project, render the CaseStudy component
  if (caseStudyType) {
    return <CaseStudy />;
  }

  // If this is the generic case study route
  if (projectId === 'case-study') {
    return <CaseStudy />;
  }

  // Otherwise, render the regular project page
  if (!project) {
    return (
      <div className={styles.projectPage}>
        <div className={styles.container}>
          <button onClick={onBack} className={styles.backButton}>
            ← Back to projects
          </button>
          <p>Project not found</p>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.projectPage}>
      <div className={styles.container}>
        {/* Back button */}
        <div style={{ marginBottom: '40px' }}>
          <button
            onClick={(e) => { e.preventDefault(); onBack(); }}
            className={styles.backButton}
            aria-label={`Back to Home and Projects from ${project.title}`}
          >
            ← Home / Projects / {project.title}
          </button>
        </div>
        {/* Main Content */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: '32px' }}>
          <div style={{ gridColumn: 'span 12' }}>
            {/* Header */}
            <div className={styles.hero}>
              <h1 className={styles.title}>
                {project.title || 'productivity'}
              </h1>
              <div className={styles.projectMeta}>
                <span className={styles.category}>
                  ET Transform your PM
                </span>
                <button
                  className={styles.tag}
                  onClick={(e) => { e.preventDefault(); /* TODO: handle contact action or navigation */ }}
                  aria-label="Get in touch"
                >
                  Get in touch →
                </button>
              </div>
              <p className={styles.subtitle}>
                Transform your work with the tools productivity apps, habits programs, and design that drives real results-overcome blocks transform your habits and tasks, and unlock productivity potential.
              </p>
            </div>
            {/* Hero Image */}
            <div className={styles.heroImage}>
              <img 
                src={project.thumbnail || 'https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=1600&h=800&fit=crop'} 
                alt={project.title}
              />
            </div>
            {/* Two Column Section */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '80px', marginBottom: '120px' }}>
              <div>
                <h2 className={styles.sectionTitle}>
                  Start effortlessly.<br />
                  Block distractions.<br />
                  Boost productivity.
                </h2>
              </div>
              <div>
                <h3 className={styles.problemTitle}>
                  productivity<br />
                  Instructions break free. Goodness. To-dos efficiency.
                </h3>
                <p className={styles.problemText}>
                  On the mobile app you can strike. No effort organizing it by setting up productivity. Set up productivity timer there always for you to do!
                </p>
              </div>
            </div>
            {/* Footer with icon */}
            <div style={{ display: 'flex', justifyContent: 'center', marginTop: '80px' }}>
              <div style={{ width: '60px', height: '60px', backgroundColor: '#6B46C1', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <span style={{ color: 'white', fontSize: '24px' }}>📋</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectPage;