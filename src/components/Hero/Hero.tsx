import React, { useEffect, useState } from 'react';
import styles from './Hero.module.css';

interface Slide {
  id: number;
  title: string[];
  description: string;
  image: string;
  color: string;
}

const slides: Slide[] = [
  {
    id: 1,
    title: ['Crafting digital', 'experiences'],
    description: 'I design products that bridge the gap between human needs and business goals, creating meaningful connections through thoughtful interfaces.',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1600&h=900&fit=crop&q=80',
    color: '#7C3AED'
  },
  {
    id: 2,
    title: ['Building scalable', 'design systems'],
    description: 'From component libraries to comprehensive guidelines, I create design systems that empower teams to build consistent, beautiful products.',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1600&h=900&fit=crop&q=80',
    color: '#10B981'
  },
  {
    id: 3,
    title: ['Driving business', 'through design'],
    description: 'I transform complex business challenges into elegant solutions that users love and stakeholders trust.',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1600&h=900&fit=crop&q=80',
    color: '#F59E0B'
  }
];

const Hero: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isVisible, setIsVisible] = useState(false);


  useEffect(() => {
    setIsVisible(true);
  }, []);

  // Auto-play slider
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);



  return (
    <section className={styles.hero}>
      {/* Background Images */}
      <div className={styles.backgroundSlider}>
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`${styles.backgroundImage} ${
              index === currentSlide ? styles.active : ''
            }`}
            style={{
              backgroundImage: `url(${slide.image})`,
            }}
          >
            <div className={styles.overlay} />
          </div>
        ))}
      </div>

      {/* Content */}
      <div className={styles.container}>
        <div className={styles.heroContent}>
          {slides.map((slide, index) => (
            <div
              key={slide.id}
              className={`${styles.slideContent} ${
                index === currentSlide ? styles.active : ''
              }`}
            >
              <h1 className={`${styles.heroTitle} ${isVisible ? styles.visible : ''}`}>
                {slide.title.map((line, i) => (
                  <span key={i} className={styles.titleLine}>
                    {line}
                  </span>
                ))}
              </h1>
              
              <p className={`${styles.heroDescription} ${isVisible ? styles.visible : ''}`}>
                {slide.description}
              </p>

              <div className={`${styles.heroMeta} ${isVisible ? styles.visible : ''}`}>
                <div className={styles.availability}>
                  <span className={styles.dot} style={{ background: slide.color }}></span>
                  <span>Available for select projects</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Remove slider navigation completely - we have the counter */}
      </div>

      {/* Slide Counter */}
      <div className={styles.slideCounter}>
        <span className={styles.currentSlide}>{String(currentSlide + 1).padStart(2, '0')}</span>
        <span className={styles.separator}>/</span>
        <span className={styles.totalSlides}>{String(slides.length).padStart(2, '0')}</span>
      </div>

      {/* Scroll Hint */}
      <div className={styles.scrollHint}>
        <span>Scroll to explore</span>
        <div className={styles.scrollLine}></div>
      </div>
    </section>
  );
};

export default Hero;