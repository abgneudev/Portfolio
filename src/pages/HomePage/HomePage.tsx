import React from 'react';
import Hero from '../../components/Hero/Hero';
import ProjectList from '../../components/ProjectList/ProjectList';
import type { Project } from '../../types';
import styles from './HomePage.module.css';


interface HomePageProps {
  onProjectClick: (projectId: string) => void;
}

const HomePage: React.FC<HomePageProps> = ({ onProjectClick }) => {
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
      <Hero />
      <ProjectList 
        projects={enhancedProjects} 
        onProjectClick={onProjectClick}
      />
      
      {/* Services Section */}
      <section className={styles.servicesSection}>
        <div className={styles.container}>
          <header className={styles.sectionHeader}>
            <span className={styles.label}>Services</span>
            <h2 className={styles.sectionTitle}>How I can help</h2>
          </header>
          
          <div className={styles.servicesGrid}>
            <article className={styles.serviceCard}>
              <div className={styles.serviceIcon}>
                <svg viewBox="0 0 48 48" fill="none">
                  <circle cx="24" cy="24" r="20" stroke="currentColor" strokeWidth="1.5"/>
                  <path d="M24 14V34M14 24H34" stroke="currentColor" strokeWidth="1.5"/>
                </svg>
              </div>
              <h3>Product Strategy</h3>
              <p>Defining product vision and roadmaps that align user needs with business objectives</p>
            </article>

            <article className={styles.serviceCard}>
              <div className={styles.serviceIcon}>
                <svg viewBox="0 0 48 48" fill="none">
                  <rect x="8" y="8" width="32" height="32" rx="16" stroke="currentColor" strokeWidth="1.5"/>
                  <circle cx="24" cy="24" r="8" stroke="currentColor" strokeWidth="1.5"/>
                </svg>
              </div>
              <h3>User Experience</h3>
              <p>Creating intuitive interfaces through research, prototyping, and iterative design</p>
            </article>

            <article className={styles.serviceCard}>
              <div className={styles.serviceIcon}>
                <svg viewBox="0 0 48 48" fill="none">
                  <rect x="12" y="12" width="10" height="10" stroke="currentColor" strokeWidth="1.5"/>
                  <rect x="26" y="12" width="10" height="10" stroke="currentColor" strokeWidth="1.5"/>
                  <rect x="12" y="26" width="10" height="10" stroke="currentColor" strokeWidth="1.5"/>
                  <rect x="26" y="26" width="10" height="10" stroke="currentColor" strokeWidth="1.5"/>
                </svg>
              </div>
              <h3>Design Systems</h3>
              <p>Building scalable component libraries that ensure consistency across products</p>
            </article>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className={styles.ctaSection}>
        <div className={styles.container}>
          <div className={styles.ctaContent}>
            <h2>Let's create something extraordinary</h2>
            <p>I'm always excited to collaborate on projects that push boundaries and create meaningful impact.</p>
            <a href="mailto:hello@example.com" className={styles.ctaButton}>
              Start a conversation
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M7 13L13 7M13 7H7M13 7V13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;