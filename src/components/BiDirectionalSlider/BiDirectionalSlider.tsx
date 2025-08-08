import React, { useRef, useEffect, useState } from 'react';
import styles from './BiDirectionalSlider.module.css';

interface SlideContent {
  id: number;
  image: string;
  title: string;
  description: string;
  category?: string;
  gradient?: string;
}

interface BiDirectionalSliderProps {
  topRowSlides?: SlideContent[];
  bottomRowSlides?: SlideContent[];
  speed?: number;
  pauseOnHover?: boolean;
  className?: string;
}

const BiDirectionalSlider: React.FC<BiDirectionalSliderProps> = ({
  topRowSlides,
  bottomRowSlides,
  speed = 30,
  pauseOnHover = true,
  className = ''
}) => {
  const topMarqueeRef = useRef<HTMLDivElement>(null);
  const bottomMarqueeRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  // Default slides
  const defaultTopSlides: SlideContent[] = [
    {
      id: 1,
      image: 'https://res.cloudinary.com/dbvfgfqqh/image/upload/v1754541590/health_w2am5f.png',
      title: 'Health',
      description: '',
      category: '',
      gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
    },
    {
      id: 2,
      image: 'https://res.cloudinary.com/dbvfgfqqh/image/upload/v1754541591/fall_hcaly3.jpg',
      title: 'Fall',
      description: '',
      category: '',
      gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)'
    },
    {
      id: 3,
      image: 'https://res.cloudinary.com/dbvfgfqqh/image/upload/v1754541591/mlk_khdeba.png',
      title: 'MLK',
      description: '',
      category: '',
      gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)'
    },
    {
      id: 4,
      image: 'https://res.cloudinary.com/dbvfgfqqh/image/upload/v1754541591/gendergap_x3apcd.png',
      title: 'Gender Gap',
      description: '',
      category: '',
      gradient: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)'
    },
    {
      id: 5,
      image: 'https://res.cloudinary.com/dbvfgfqqh/image/upload/v1754541590/garbage_nzw3bu.png',
      title: 'Garbage',
      description: '',
      category: '',
      gradient: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)'
    },
    {
      id: 6,
      image: 'https://res.cloudinary.com/dbvfgfqqh/image/upload/v1754541590/flower_vdrmme.jpg',
      title: 'Flower',
      description: '',
      category: '',
      gradient: 'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)'
    },
    {
      id: 7,
      image: 'https://res.cloudinary.com/dbvfgfqqh/image/upload/v1754541590/circle_bzhh0q.png',
      title: 'Circle',
      description: '',
      category: '',
      gradient: 'linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)'
    },
    {
      id: 8,
      image: 'https://res.cloudinary.com/dbvfgfqqh/image/upload/v1754541590/hospital_t3bzzx.png',
      title: 'Hospital',
      description: '',
      category: '',
      gradient: 'linear-gradient(135deg, #fbc2eb 0%, #a6c1ee 100%)'
    }
  ];

  const defaultBottomSlides: SlideContent[] = [
    {
      id: 9,
      image: 'https://res.cloudinary.com/dbvfgfqqh/image/upload/v1754639400/therapy_f2bril.png',
      title: 'Therapy',
      description: '',
      category: '',
      gradient: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)'
    },
    {
      id: 10,
      image: 'https://res.cloudinary.com/dbvfgfqqh/image/upload/v1754639414/grinding_q07kbk.png',
      title: 'Grinding',
      description: '',
      category: '',
      gradient: 'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)'
    },
    {
      id: 11,
      image: 'https://res.cloudinary.com/dbvfgfqqh/image/upload/v1754639425/grammarly_djs11m.png',
      title: 'Grammarly',
      description: '',
      category: '',
      gradient: 'linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)'
    },
    {
      id: 12,
      image: 'https://res.cloudinary.com/dbvfgfqqh/image/upload/v1754639435/ai_ed40h2.png',
      title: 'AI',
      description: '',
      category: '',
      gradient: 'linear-gradient(135deg, #fbc2eb 0%, #a6c1ee 100%)'
    },
    {
      id: 13,
      image: 'https://res.cloudinary.com/dbvfgfqqh/image/upload/v1754639448/prototype_z63xhh.png',
      title: 'Prototype',
      description: '',
      category: '',
      gradient: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)'
    }
  ];

  const topSlides = topRowSlides || defaultTopSlides;
  const bottomSlides = bottomRowSlides || defaultBottomSlides;

  // Triple slides for seamless loop (reduce when not visible for performance)
  const slidesMultiplier = isVisible ? 3 : 1;
  const duplicatedTopSlides = Array(slidesMultiplier).fill(topSlides).flat();
  const duplicatedBottomSlides = Array(slidesMultiplier).fill(bottomSlides).flat();

  // Intersection Observer to pause animations when not visible
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsVisible(entry.isIntersecting);
        });
      },
      {
        threshold: 0.1,
        rootMargin: '50px'
      }
    );

    observer.observe(container);

    return () => {
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    const topMarquee = topMarqueeRef.current;
    const bottomMarquee = bottomMarqueeRef.current;
    
    if (topMarquee) {
      topMarquee.style.setProperty('--marquee-duration', `${speed}s`);
      // Pause animation when not visible
      if (!isVisible || isPaused) {
        topMarquee.style.animationPlayState = 'paused';
      } else {
        topMarquee.style.animationPlayState = 'running';
      }
    }
    if (bottomMarquee) {
      bottomMarquee.style.setProperty('--marquee-duration', `${speed * 1.2}s`);
      // Pause animation when not visible
      if (!isVisible || isPaused) {
        bottomMarquee.style.animationPlayState = 'paused';
      } else {
        bottomMarquee.style.animationPlayState = 'running';
      }
    }
  }, [speed, isVisible, isPaused]);

  return (
    <div className={styles['demo-container']}>
      <div ref={containerRef} className={`${styles['slider-container']} ${className}`}>
        <div className={styles['slider-wrapper']}>
          {/* Bottom row - moving right (now on top) */}
          <div className={`${styles['slider-row']} ${styles['bottom-row']}`}>
          <div 
            ref={bottomMarqueeRef}
            className={`${styles.marquee} ${isPaused || !isVisible ? 'paused' : ''}`}
          >
            <div className={`${styles['marquee-content']} ${styles['marquee-right']}`}>
              {duplicatedBottomSlides.map((slide, index) => (
                <div
                  key={`${slide.id}-${index}`}
                  className={`${styles['slide-card']} ${styles['slide-card-desktop']}`}
                  onMouseEnter={() => pauseOnHover && setIsPaused(true)}
                  onMouseLeave={() => pauseOnHover && setIsPaused(false)}
                  style={{
                    '--card-gradient': slide.gradient || 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
                  } as React.CSSProperties}
                >
                  <div className={styles['card-inner']}>
                    <div className={styles['card-image-wrapper']}>
                      <img
                        src={slide.image}
                        alt={slide.title}
                        className={styles['card-image']}
                        loading="lazy"
                      />
                      <div className={styles['card-overlay']} />
                    </div>
                    <div className={styles['card-content']}>
                      {slide.category && (
                        <span className={styles['card-category']}>{slide.category}</span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Top row - moving left (now on bottom) */}
        <div className={`${styles['slider-row']} ${styles['top-row']}`}>
          <div 
            ref={topMarqueeRef}
            className={`${styles.marquee} ${isPaused || !isVisible ? 'paused' : ''}`}
          >
            <div className={`${styles['marquee-content']} ${styles['marquee-left']}`}>
              {duplicatedTopSlides.map((slide, index) => (
                <div
                  key={`${slide.id}-${index}`}
                  className={`${styles['slide-card']} ${styles['slide-card-instagram']}`}
                  onMouseEnter={() => pauseOnHover && setIsPaused(true)}
                  onMouseLeave={() => pauseOnHover && setIsPaused(false)}
                  style={{
                    '--card-gradient': slide.gradient || 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
                  } as React.CSSProperties}
                >
                  <div className={styles['card-inner']}>
                    <div className={styles['card-image-wrapper']}>
                      <img
                        src={slide.image}
                        alt={slide.title}
                        className={styles['card-image']}
                        loading="lazy"
                      />
                      <div className={styles['card-overlay']} />
                    </div>
                    <div className={styles['card-content']}>
                      {slide.category && (
                        <span className={styles['card-category']}>{slide.category}</span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
};

export default BiDirectionalSlider;