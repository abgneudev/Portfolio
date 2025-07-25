import React from 'react';
import styles from './Footer.module.css';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className="grid">
        <div className={styles.footerContent}>
          <div className={styles.footerMain}>
            <h3 className={styles.footerTitle}>Let's work together</h3>
            <a href="mailto:hello@example.com" className={styles.footerEmail}>
              hello@example.com
            </a>
          </div>

          <div className={styles.footerLinks}>
            <div className={styles.linkGroup}>
              <h4>Connect</h4>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">LinkedIn</a>
              <a href="https://dribbble.com" target="_blank" rel="noopener noreferrer">Dribbble</a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">Twitter</a>
            </div>
            <div className={styles.linkGroup}>
              <h4>Work</h4>
              <a href="/resume.pdf" download>Download Resume</a>
              <a href="#projects">View Projects</a>
              <a href="#process">Design Process</a>
            </div>
          </div>
        </div>

        <div className={styles.footerBottom}>
          <p>&copy; {currentYear} Abhinav. All rights reserved.</p>
          <p className={styles.location}>
            <span className={styles.dot}></span>
            Based in  Boston, MA
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;