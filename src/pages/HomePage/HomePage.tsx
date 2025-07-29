import React, { useState, useEffect } from 'react';
import ExpandableCards from '../../components/ExpandableCards/ExpandableCards';
import ProjectList from '../../components/ProjectList/ProjectList';
import type { Project } from '../../types';
import styles from './HomePage.module.css';

interface HomePageProps {
  onProjectClick: (projectId: string) => void;
  onNavigate?: (page: 'home' | 'project' | 'about', projectId?: string) => void;
}

const HomePage: React.FC<HomePageProps> = ({ onProjectClick, onNavigate }) => {
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
      setDelta(isDeleting ? 24 : 40); // Typing speed
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

  const logos = [
    { id: 'iembrace', src: 'https://res.cloudinary.com/dbvfgfqqh/image/upload/v1753608755/hil_ss2qfh.png', alt: 'Harvard Innovation Labs' },
    { id: 'northeastern', src: 'https://res.cloudinary.com/dbvfgfqqh/image/upload/v1753608755/Northeastern_nwhyj7.png', alt: 'Northeastern University' },
    { id: 'wipro', src: 'https://res.cloudinary.com/dbvfgfqqh/image/upload/v1753608755/wipro_xh8uq3.png', alt: 'Wipro' },
    { id: 'unicef', src: 'https://res.cloudinary.com/dbvfgfqqh/image/upload/v1753608755/UNICEF-Logo_pcvi1l.png', alt: 'UNICEF' },
    { id: 'aiesec', src: 'https://res.cloudinary.com/dbvfgfqqh/image/upload/v1753612220/AIESEC-Logo_mevf7y.png', alt: 'AIESEC' },
  ];

  // Duplicate logos array to create seamless loop
  const duplicatedLogos = [...logos, ...logos];

  return (
    <div className={styles.homePage}>
      {/* Hero Section */}
      <section className={`${styles.section} ${styles.sectionHero}`} aria-label="Introductory summary">
        <div className={styles.grid}>
          <div className={styles.colCentered}>
            <p className={styles.currentPosition}>
              Abhinav is a Product Designer at <a href="https://iembraceland.com/" target="_blank" rel="noopener noreferrer" className={styles.highlight}>iEmbrace, Harvard Innovation Labs</a> designing accessible digital experiences that scale.
            </p>

            {/* Logo Slider - Inside Hero Section */}
            <div className={styles.logoSliderSection} aria-label="Partner organizations">
              <span className={styles.logoSectionTitle}>Previously with:</span>
              <div className={styles.sliderContainer}>
                <div className={styles.sliderWrapper}>
                  <div className={styles.sliderTrack}>
                    {duplicatedLogos.map((logo, index) => {
                      let href = '';
                      switch (logo.id) {
                        case 'iembrace':
                          href = 'https://innovationlabs.harvard.edu/';
                          break;
                        case 'northeastern':
                          href = 'https://www.northeastern.edu/';
                          break;
                        case 'wipro':
                          href = 'https://www.wipro.com/';
                          break;
                        case 'unicef':
                          href = 'https://www.unicef.org/sustainable-development-goals';
                          break;
                        case 'aiesec':
                          href = 'https://aiesec.org/';
                          break;
                        default:
                          href = '#';
                      }
                      return (
                        <div
                          key={`${logo.id}-${index}`}
                          className={styles.logoItem}
                        >
                          <a
                            href={href}
                            target="_blank"
                            rel="noopener noreferrer"
                            tabIndex={0}
                          >
                            <img
                              src={logo.src}
                              alt={logo.alt}
                              className={styles.logoImage}
                            />
                          </a>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>

            <a
              className={styles.heroCtaButton}
              href="https://drive.google.com/file/d/1lVBPVZxY09ObA0ZXOy8_Y1NeXszIqF1h/view?usp=sharing"
              target="_blank"
              rel="noopener noreferrer"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', textDecoration: 'none' }}
            >
              <span>Download Resume</span>
              <svg width="18" height="18" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <path d="M10 3v10m0 0l-4-4m4 4l4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <rect x="4" y="15" width="12" height="2" rx="1" fill="currentColor"/>
              </svg>
            </a>
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
          onNavigate={onNavigate}
        />
      </section>

    </div>
  );
};

export default HomePage;