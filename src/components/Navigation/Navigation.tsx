import React, { useState, useEffect } from 'react';
import styles from './Navigation.module.css';

interface NavigationProps {
  currentPage: 'home' | 'project' | 'about';
  onNavigate: (page: 'home' | 'project' | 'about') => void;
}

const Navigation: React.FC<NavigationProps> = ({ currentPage, onNavigate }) => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`${styles.header} ${isScrolled ? styles.scrolled : ''}`}>
      <div className={styles.container}>
        <button 
          className={styles.logo}
          onClick={() => onNavigate('home')}
          aria-label="Go to homepage"
        >
          A
        </button>

        <nav className={styles.nav}>
          <button
            className={`${styles.navLink} ${currentPage === 'home' ? styles.active : ''}`}
            onClick={() => onNavigate('home')}
          >
            Work
          </button>
          <button
            className={`${styles.navLink} ${currentPage === 'about' ? styles.active : ''}`}
            onClick={() => onNavigate('about')}
          >
            About
          </button>
          <a
            href="mailto:hello@example.com"
            className={styles.ctaLink}
          >
            Get in touch
          </a>
        </nav>
      </div>
    </header>
  );
};

export default Navigation;