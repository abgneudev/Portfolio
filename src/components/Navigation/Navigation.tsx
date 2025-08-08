import React, { useState, useEffect, useRef } from 'react';
import styles from './Navigation.module.css';

interface NavigationProps {
  currentPage: 'home' | 'project' | 'about';
  onNavigate: (page: 'home' | 'project' | 'about') => void;
}

const Navigation: React.FC<NavigationProps> = ({ currentPage, onNavigate }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
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
              className={styles.logoNameButton}
              onClick={() => onNavigate('home')}
              aria-label="Go to homepage"
            >
              <div className={styles.logo}>
                <img 
                  src="https://res.cloudinary.com/dbvfgfqqh/image/upload/v1753429538/ab_logo_rbvao6.png" 
                  alt="Logo" 
                  className={styles.logoImage}
                />
              </div>
              <span className={styles.logoName}>Abhinav Gupta</span>
            </button>
          </div>

          {/* Desktop Nav */}
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
            
            {/* Modern Expanding Contact Button */}
            <div className={styles.contactMenu} role="group" aria-label="Get in Touch">
              <span className={styles.contactLabel}>Get in Touch</span>
              <div className={styles.contactIcons}>
                <a
                  href="mailto:gupta.abhinav0210@gmail.com"
                  className={styles.contactIconLink}
                  aria-label="Email"
                  title="Email"
                  onClick={(e) => e.stopPropagation()}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                    <path d="M4 6h16a1 1 0 011 1v10a1 1 0 01-1 1H4a1 1 0 01-1-1V7a1 1 0 011-1zm0 0l8 6 8-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </a>
                <a
                  href="https://github.com/abgneudev"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.contactIconLink}
                  aria-label="GitHub"
                  title="GitHub"
                  onClick={(e) => e.stopPropagation()}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                    <path d="M12 2C6.477 2 2 6.477 2 12a10 10 0 006.838 9.488c.5.092.682-.217.682-.482 0-.237-.01-1.024-.014-1.859-2.782.604-3.369-1.183-3.369-1.183-.455-1.155-1.11-1.463-1.11-1.463-.908-.62.069-.607.069-.607 1.004.071 1.532 1.032 1.532 1.032.892 1.53 2.341 1.088 2.91.833.091-.647.35-1.088.636-1.338-2.221-.253-4.555-1.111-4.555-4.945 0-1.092.39-1.987 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.269 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.295 2.748-1.026 2.748-1.026.546 1.378.202 2.397.1 2.65.64.701 1.028 1.596 1.028 2.688 0 3.842-2.337 4.688-4.566 4.936.359.31.678.92.678 1.855 0 1.338-.012 2.417-.012 2.744 0 .268.18.58.688.48A10.002 10.002 0 0022 12c0-5.523-4.477-10-10-10z" fill="currentColor"/>
                  </svg>
                </a>
                <a
                  href="https://www.instagram.com/abdesiigns/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.contactIconLink}
                  aria-label="Instagram"
                  title="Instagram"
                  onClick={(e) => e.stopPropagation()}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                    <rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" strokeWidth="2"/>
                    <circle cx="12" cy="12" r="3.5" stroke="currentColor" strokeWidth="2"/>
                    <circle cx="17.5" cy="6.5" r="1" fill="currentColor"/>
                  </svg>
                </a>
                <a
                  href="https://www.linkedin.com/in/abhinavgupta0210/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.contactIconLink}
                  aria-label="LinkedIn"
                  title="LinkedIn"
                  onClick={(e) => e.stopPropagation()}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                    <rect x="2" y="2" width="20" height="20" rx="4" stroke="currentColor" strokeWidth="2" fill="none"/>
                    <text x="12" y="12" textAnchor="middle" fontFamily="Arial, Helvetica, sans-serif" fontWeight="bold" fontSize="11" fill="currentColor" dominantBaseline="middle">in</text>
                  </svg>
                </a>
              </div>
            </div>
          </nav>

          {/* Hamburger for mobile */}
          <button
            className={styles.hamburger}
            aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-menu"
            onClick={() => setMobileMenuOpen((open) => !open)}
          >
            <span className={styles.hamburgerBox}>
              <span className={styles.hamburgerInner}></span>
            </span>
          </button>

          {/* Mobile Menu Overlay */}
          {mobileMenuOpen && (
            <div className={styles.mobileMenuOverlay} id="mobile-menu" role="menu">
              <nav className={styles.mobileNav}>
                <button
                  className={`${styles.navLink} ${currentPage === 'home' ? styles.active : ''}`}
                  onClick={() => { setMobileMenuOpen(false); onNavigate('home'); }}
                  role="menuitem"
                >
                  Work
                </button>
                <button
                  className={`${styles.navLink} ${currentPage === 'about' ? styles.active : ''}`}
                  onClick={() => { setMobileMenuOpen(false); onNavigate('about'); }}
                  role="menuitem"
                >
                  About
                </button>
                <a
                  href="mailto:gupta.abhinav0210@gmail.com"
                  className={styles.ctaLink}
                  role="menuitem"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Get in Touch
                </a>
              </nav>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navigation;