import React, { useState, useEffect, useRef } from 'react';
import styles from './Navigation.module.css';

interface NavigationProps {
  currentPage: 'home' | 'project' | 'about';
  onNavigate: (page: 'home' | 'project' | 'about') => void;
}

const Navigation: React.FC<NavigationProps> = ({ currentPage, onNavigate }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const lastScrollY = useRef(0);
  const ticking = useRef(false);

  useEffect(() => {
    const updateScrollDirection = () => {
      const scrollY = window.scrollY;
      
      // Show navbar when at the very top
      if (scrollY < 10) {
        setIsVisible(false);
        setIsHidden(false);
      }
      // Hide when scrolling down
      else if (scrollY > lastScrollY.current && scrollY > 100) {
        setIsVisible(false);
        setIsHidden(true);
      }
      // Show when scrolling up
      else if (scrollY < lastScrollY.current) {
        setIsVisible(true);
        setIsHidden(false);
      }
      
      lastScrollY.current = scrollY;
      ticking.current = false;
    };

    const onScroll = () => {
      if (!ticking.current) {
        window.requestAnimationFrame(updateScrollDirection);
        ticking.current = true;
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header 
      className={`${styles.header} ${isVisible ? styles.visible : ''} ${isHidden ? styles.hidden : ''}`}
    >
      <div className={styles.grid}>
        <div className={styles.navContainer}>
          <div className={styles.logoNameWrapper}>
            <button 
              className={styles.logo}
              onClick={() => onNavigate('home')}
              aria-label="Go to homepage"
              style={{ padding: 0, background: 'none', border: 'none' }}
            >
              <img 
                src="https://res.cloudinary.com/dbvfgfqqh/image/upload/v1753429538/ab_logo_rbvao6.png" 
                alt="Logo" 
                style={{ 
                  height: '100%', 
                  width: '100%', 
                  objectFit: 'contain', 
                  display: 'block'
                }} 
              />
            </button>
            <span className={styles.logoName}>Abhinav Gupta</span>
          </div>

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
      </div>
    </header>
  );
};

export default Navigation;