
import React, { useEffect, useState } from 'react';
import styles from './Hero.module.css';

const Hero: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section className={styles.hero}>
      <div className={styles.container}>
        <div className={styles.heroContent}>
          <h1 className={`${styles.heroTitle} ${isVisible ? styles.visible : ''}`}>
            <span className={styles.titleLine}>A new future</span>
            <span className={styles.titleLine}>for digital design</span>
          </h1>
          
          <p className={`${styles.heroDescription} ${isVisible ? styles.visible : ''}`}>
            At the intersection of technology and human experience, I craft digital products 
            that transform how businesses connect with their users. Currently shaping the 
            future of enterprise software at Scale.
          </p>

          <div className={`${styles.heroMeta} ${isVisible ? styles.visible : ''}`}>
            <div className={styles.availability}>
              <span className={styles.dot}></span>
              <span>Available for select projects</span>
            </div>
          </div>
        </div>

        {/* Floating elements */}
        <div className={styles.floatingElements}>
          <div className={`${styles.floatingShape} ${styles.shape1}`}></div>
          <div className={`${styles.floatingShape} ${styles.shape2}`}></div>
          <div className={`${styles.floatingShape} ${styles.shape3}`}></div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className={styles.scrollHint}>
        <span>Scroll to explore</span>
        <div className={styles.scrollLine}></div>
      </div>
    </section>
  );
};

export default Hero;