import React, { useState } from 'react';
import styles from './WorkWithMe.module.css';

// Work collaboration pictures data
const workSlides = [
  [
    {
      id: 'w1',
      image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800',
      caption: 'collaborative brainstorming',
      size: 'large'
    },
    {
      id: 'w2', 
      image: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=800',
      caption: 'whiteboard sessions',
      size: 'medium'
    },
    {
      id: 'w3',
      image: 'https://images.unsplash.com/photo-1553028826-f4804a6dba3b?w=800',
      caption: 'code reviews',
      size: 'small'
    }
  ],
  [
    {
      id: 'w4',
      image: 'https://images.unsplash.com/photo-1515378960530-7c0da6231fb1?w=800',
      caption: 'remote collaboration',
      size: 'medium'
    },
    {
      id: 'w5',
      image: 'https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=800',
      caption: 'design sprints',
      size: 'large'
    },
    {
      id: 'w6',
      image: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=800',
      caption: 'team celebrations',
      size: 'small'
    }
  ],
  [
    {
      id: 'w7',
      image: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=800',
      caption: 'knowledge sharing',
      size: 'small'
    },
    {
      id: 'w8',
      image: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=800',
      caption: 'strategy sessions',
      size: 'large'
    },
    {
      id: 'w9',
      image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800',
      caption: 'user research',
      size: 'medium'
    }
  ]
];

const WorkWithMe: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const handlePrevSlide = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    
    setTimeout(() => {
      setCurrentSlide((prev) => (prev === 0 ? workSlides.length - 1 : prev - 1));
    }, 200);
    
    setTimeout(() => {
      setIsAnimating(false);
    }, 800);
  };

  const handleNextSlide = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    
    setTimeout(() => {
      setCurrentSlide((prev) => (prev === workSlides.length - 1 ? 0 : prev + 1));
    }, 200);
    
    setTimeout(() => {
      setIsAnimating(false);
    }, 800);
  };

  return (
    <section className={styles.workSection}>
      <div className={styles.container}>
        {/* Section Title */}
        <div className={styles.header}>
          <h2 className={styles.title}>
            What working with me looks like
          </h2>
          <p className={styles.subtitle}>
            Collaboration, creativity, and continuous improvement
          </p>
        </div>

        {/* Main Slider Area */}
        <div className={styles.sliderWrapper}>
          {/* Navigation Arrows */}
          <button 
            className={`${styles.navArrow} ${styles.navArrowLeft}`}
            onClick={handlePrevSlide}
            aria-label="Previous slide"
            disabled={isAnimating}
          >
            <span className={styles.arrowLine}></span>
            <span className={styles.arrowHead}></span>
          </button>

          <button 
            className={`${styles.navArrow} ${styles.navArrowRight}`}
            onClick={handleNextSlide}
            aria-label="Next slide"
            disabled={isAnimating}
          >
            <span className={styles.arrowLine}></span>
            <span className={styles.arrowHead}></span>
          </button>

          {/* Slides Container */}
          <div className={styles.slidesContainer}>
            <div 
              className={`${styles.slideGrid} ${isAnimating ? styles.animating : ''}`}
              data-slide={currentSlide}
            >
              {workSlides[currentSlide].map((item, index) => (
                <div
                  key={item.id}
                  className={`${styles.gridItem} ${styles[item.size]} ${styles[`position${index}`]}`}
                  style={{
                    '--delay': `${index * 0.15}s`,
                    '--random-rotate': `${index % 2 === 0 ? -2 + index : 2 - index}deg`
                  } as React.CSSProperties}
                >
                  <div className={styles.imageContainer}>
                    <img
                      src={item.image}
                      alt={item.caption}
                      className={styles.image}
                      loading={currentSlide === 0 ? 'eager' : 'lazy'}
                    />
                    <div className={styles.imageOverlay} />
                  </div>
                  <span className={styles.caption}>
                    {item.caption}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Progress Dots */}
          <div className={styles.dots}>
            {workSlides.map((_, index) => (
              <button
                key={index}
                className={`${styles.dot} ${index === currentSlide ? styles.dotActive : ''}`}
                onClick={() => {
                  if (!isAnimating) {
                    setIsAnimating(true);
                    setTimeout(() => {
                      setCurrentSlide(index);
                    }, 200);
                    setTimeout(() => {
                      setIsAnimating(false);
                    }, 800);
                  }
                }}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default WorkWithMe;