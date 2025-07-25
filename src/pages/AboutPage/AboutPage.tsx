import React from 'react';
import styles from './AboutPage.module.css';

const AboutPage: React.FC = () => {
  return (
    <div className={styles.aboutPage}>
      <div className="grid">
        <div style={{ gridColumn: '2 / span 10', width: '100%' }}>
          <h1>About</h1>
          <p>About page content goes here.</p>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;