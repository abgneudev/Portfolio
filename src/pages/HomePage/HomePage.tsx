import React, { useState, useEffect } from 'react';
import ExpandableCards from '../../components/ExpandableCards/ExpandableCards';
import ProjectList from '../../components/ProjectList/ProjectList';
import type { Project } from '../../types';
import styles from './HomePage.module.css';

interface HomePageProps {
  onProjectClick: (projectId: string) => void;
}

const HomePage: React.FC<HomePageProps> = ({ onProjectClick }) => {
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [text, setText] = useState('');
  const [delta, setDelta] = useState(100);

  const roles = ['Product Designer', 'Frontend Developer', 'Information Architect'];
  
  useEffect(() => {
    const ticker = setInterval(() => {
      tick();
    }, delta);

    return () => clearInterval(ticker);
  }, [text, isDeleting, currentRoleIndex]);

  const tick = () => {
    const currentRole = roles[currentRoleIndex];
    const updatedText = isDeleting 
      ? currentRole.substring(0, text.length - 1)
      : currentRole.substring(0, text.length + 1);

    setText(updatedText);

    if (!isDeleting && updatedText === currentRole) {
      setIsDeleting(true);
      setDelta(2000); // Pause at full text
    } else if (isDeleting && updatedText === '') {
      setIsDeleting(false);
      setCurrentRoleIndex((prev) => (prev + 1) % roles.length);
      setDelta(500); // Pause before typing next
    } else {
      setDelta(isDeleting ? 50 : 100); // Typing speed
    }
  };

  // Enhanced project data with better placeholders
  const enhancedProjects: Project[] = [
    {
      id: 'fintech-redesign',
      title: 'Quantum Finance',
      category: 'Fintech Platform',
      year: '2024',
      description: 'Reimagining digital banking for the next generation',
      thumbnail: 'https://images.unsplash.com/photo-1563986768494-4dee2763ff3f?w=800&h=600&fit=crop&q=80',
      metrics: {
        primary: { value: '+127%', label: 'User Growth' },
        secondary: { value: '4.9', label: 'App Rating' }
      },
      details: {
        hero: '',
        challenge: '',
        approach: '',
        outcome: '',
        gallery: [],
        tools: ['Figma', 'React', 'TypeScript'],
        duration: '4 months',
        role: 'Lead Designer'
      },
      color: '#7C3AED'
    },
    {
      id: 'ecommerce-platform',
      title: 'Artisan Market',
      category: 'E-commerce',
      year: '2024',
      description: 'Connecting artisans with conscious consumers',
      thumbnail: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=600&fit=crop&q=80',
      metrics: {
        primary: { value: '+89%', label: 'Conversion Rate' },
        secondary: { value: '$3.2M', label: 'GMV Increase' }
      },
      details: {
        hero: '',
        challenge: '',
        approach: '',
        outcome: '',
        gallery: [],
        tools: ['Figma', 'Shopify', 'React'],
        duration: '3 months',
        role: 'Product Designer'
      },
      color: '#10B981'
    },
    {
      id: 'saas-dashboard',
      title: 'Analytics Pro',
      category: 'SaaS Platform',
      year: '2023',
      description: 'Making data insights accessible to everyone',
      thumbnail: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop&q=80',
      metrics: {
        primary: { value: '68%', label: 'Task Efficiency' },
        secondary: { value: '92%', label: 'User Satisfaction' }
      },
      details: {
        hero: '',
        challenge: '',
        approach: '',
        outcome: '',
        gallery: [],
        tools: ['Figma', 'Vue.js', 'D3.js'],
        duration: '6 months',
        role: 'Design Lead'
      },
      color: '#F59E0B'
    }
  ];

  return (
    <div className={styles.homePage}>
      {/* Hero Section */}
      <section className={`${styles.section} ${styles.sectionHero}`} aria-label="Introductory summary">
        <div className={styles.grid}>
          <div className={styles.colCentered}>
            <h1 className={styles.heroTitle}>
              Hello, I'm Abhinav — <span className={styles.typingText}>{text}<span className={styles.cursor}>|</span></span>
            </h1>
            <p className={styles.heroSubtitle}>
              I design accessible digital experiences that scale. <br />
              Currently at <a href="https://iembraceland.com/" target="_blank" rel="noopener noreferrer" className={styles.highlight}>iEmbrace, Harvard Innovation Labs</a> where I'm building design systems, writing production-ready code, and designing calming experiences for mental wellness through meditation and sound.
            </p>
            <button className={styles.heroButton} onClick={() => onProjectClick('fintech-redesign')}>
              VIEW MY WORK
            </button>
          </div>
        </div>
      </section>

      {/* Skills/Expertise Section */}
      <section aria-label="Expertise" className={`${styles.section} ${styles.sectionDark}`}>
        <ExpandableCards />
      </section>

      {/* Projects Section */}
      <section aria-label="Projects" className={styles.section}>
        <ProjectList 
          projects={enhancedProjects} 
          onProjectClick={onProjectClick}
        />
      </section>

    </div>
  );
};

export default HomePage;