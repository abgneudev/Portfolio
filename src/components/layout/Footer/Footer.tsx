'use client'

import React from 'react';
import styles from './Footer.module.css';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  // Arrow icon component
  const ArrowIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M7 17L17 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M7 7H17V17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );

  return (
    <footer className={styles.footer}>
      <div className={styles.footerContainer}>
        {/* Main CTA Section */}
        <div className={styles.ctaSection}>
          <h2 className={styles.ctaTitle}>
            <span className={styles.titleLine}>Let&apos;s create</span>
            <span className={styles.titleLine}>something amazing</span>
          </h2>
          <a href="mailto:gupta.abhinav0210@gmail.com" className={styles.ctaEmail}>
            <span className={styles.emailText}>gupta.abhinav0210@gmail.com</span>
            <span className={styles.emailIcon}>
              <ArrowIcon />
            </span>
          </a>
        </div>

        {/* Links Grid */}
        <div className={styles.linksGrid}>
          <div className={styles.linkColumn}>
            <h3 className={styles.columnTitle}>Connect</h3>
            <nav className={styles.linkList}>
              <a 
                href="https://www.linkedin.com/in/abhinavgupta0210/" 
                target="_blank" 
                rel="noopener noreferrer"
                className={styles.footerLink}
              >
                <span className={styles.linkLabel}>LinkedIn</span>
                <span className={styles.linkArrow}>
                  <ArrowIcon />
                </span>
              </a>
              <a 
                href="https://www.instagram.com/abdesiigns/?hl=en" 
                target="_blank" 
                rel="noopener noreferrer"
                className={styles.footerLink}
              >
                <span className={styles.linkLabel}>Instagram</span>
                <span className={styles.linkArrow}>
                  <ArrowIcon />
                </span>
              </a>
              <a 
                href="https://github.com/abgneudev"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.footerLink}
              >
                <span className={styles.linkLabel}>GitHub</span>
                <span className={styles.linkArrow}>
                  <ArrowIcon />
                </span>
              </a>
            </nav>
          </div>

          <div className={styles.linkColumn}>
            <h3 className={styles.columnTitle}>Explore</h3>
            <nav className={styles.linkList}>
              <a href="#work" className={styles.footerLink}>
                <span className={styles.linkLabel}>Work</span>
                <span className={styles.linkArrow}>
                  <ArrowIcon />
                </span>
              </a>
              <a href="#about" className={styles.footerLink}>
                <span className={styles.linkLabel}>About</span>
                <span className={styles.linkArrow}>
                  <ArrowIcon />
                </span>
              </a>
              <a href="/resume.pdf" download className={styles.footerLink}>
                <span className={styles.linkLabel}>Resume</span>
                <span className={styles.linkArrow}>
                  <ArrowIcon />
                </span>
              </a>
            </nav>
          </div>

          <div className={styles.linkColumn}>
            <h3 className={styles.columnTitle}>Currently</h3>
            <div className={styles.statusInfo}>
              <div className={styles.availability}>
                <span className={styles.statusDot}></span>
                <span className={styles.statusText}>Available for projects</span>
              </div>
              <div className={styles.timezone}>
                <span className={styles.timezoneLabel}>Boston, MA</span>
                <span className={styles.timezoneTime}>EST</span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className={styles.footerBottom}>
          <div className={styles.copyright}>
            <p>&copy; {currentYear} Abhinav Gupta</p>
            <span className={styles.separator}>•</span>
            <p>Custom Built with &#128153; using Figma, React, AI</p>
          </div>
          <div className={styles.footerMeta}>
            <button className={styles.scrollTop} onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
              <span>Back to top</span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path d="M12 19V5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M5 12L12 5L19 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;