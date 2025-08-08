import React, { useRef, useEffect, useState, useCallback, useMemo } from 'react';
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

// Memoized slide component to prevent unnecessary re-renders
const SlideCard = React.memo<{
  slide: SlideContent;
  index: number;
  cardClass: string;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}>(({ slide, index, cardClass, onMouseEnter, onMouseLeave }) => (
  <div
    key={`${slide.id}-${index}`}
    className={cardClass}
    onMouseEnter={onMouseEnter}
    onMouseLeave={onMouseLeave}
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
          decoding="async"
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
));

SlideCard.displayName = 'SlideCard';

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
  const [isVisible, setIsVisible] = useState(false); // Start with false
  const observerRef = useRef<IntersectionObserver | null>(null);
  const visibilityTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Default slides
  const defaultTopSlides: SlideContent[] = useMemo(() => [
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
  ], []);

  const defaultBottomSlides: SlideContent[] = useMemo(() => [
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
  ], []);

  const topSlides = topRowSlides || defaultTopSlides;
  const bottomSlides = bottomRowSlides || defaultBottomSlides;

  // Reduce to 2x duplication for better performance (still seamless)
  const duplicatedTopSlides = useMemo(() => 
    isVisible ? [...topSlides, ...topSlides] : topSlides,
    [topSlides, isVisible]
  );
  
  const duplicatedBottomSlides = useMemo(() => 
    isVisible ? [...bottomSlides, ...bottomSlides] : bottomSlides,
    [bottomSlides, isVisible]
  );

  // Memoized event handlers
  const handleMouseEnter = useCallback(() => {
    if (pauseOnHover) setIsPaused(true);
  }, [pauseOnHover]);

  const handleMouseLeave = useCallback(() => {
    if (pauseOnHover) setIsPaused(false);
  }, [pauseOnHover]);

  // Optimized Intersection Observer with debouncing
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleIntersection = (entries: IntersectionObserverEntry[]) => {
      // Clear any existing timeout
      if (visibilityTimeoutRef.current) {
        clearTimeout(visibilityTimeoutRef.current);
      }

      // Debounce the visibility change
      visibilityTimeoutRef.current = setTimeout(() => {
        entries.forEach((entry) => {
          if (entry.isIntersecting !== isVisible) {
            setIsVisible(entry.isIntersecting);
          }
        });
      }, 100); // 100ms debounce
    };

    observerRef.current = new IntersectionObserver(handleIntersection, {
      threshold: 0, // Simpler threshold
      rootMargin: '200px 0px' // Start animations earlier
    });

    observerRef.current.observe(container);

    return () => {
      if (visibilityTimeoutRef.current) {
        clearTimeout(visibilityTimeoutRef.current);
      }
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, []); // Remove isVisible dependency

  // Apply animation states with RAF for smoother updates
  useEffect(() => {
    const updateAnimations = () => {
      const topMarquee = topMarqueeRef.current;
      const bottomMarquee = bottomMarqueeRef.current;
      
      if (topMarquee) {
        topMarquee.style.setProperty('--marquee-duration', `${speed}s`);
        topMarquee.style.animationPlayState = (!isVisible || isPaused) ? 'paused' : 'running';
      }
      if (bottomMarquee) {
        bottomMarquee.style.setProperty('--marquee-duration', `${speed * 1.2}s`);
        bottomMarquee.style.animationPlayState = (!isVisible || isPaused) ? 'paused' : 'running';
      }
    };

    // Use requestAnimationFrame for smoother updates
    const rafId = requestAnimationFrame(updateAnimations);
    return () => cancelAnimationFrame(rafId);
  }, [speed, isVisible, isPaused]);

  // Preload images when component mounts
  useEffect(() => {
    const preloadImages = () => {
      const allImages = [...topSlides, ...bottomSlides].slice(0, 6); // Preload first 6 images
      allImages.forEach(slide => {
        const img = new Image();
        img.src = slide.image;
      });
    };

    // Delay preloading slightly to not interfere with initial render
    const timeoutId = setTimeout(preloadImages, 1000);
    return () => clearTimeout(timeoutId);
  }, [topSlides, bottomSlides]);

  return (
    <div className={styles['demo-container']}>
      <div ref={containerRef} className={`${styles['slider-container']} ${className}`}>
        <div className={styles['slider-wrapper']}>
          {/* Bottom row - moving right (now on top) */}
          <div className={`${styles['slider-row']} ${styles['bottom-row']}`}>
            <div 
              ref={bottomMarqueeRef}
              className={`${styles.marquee} ${isPaused || !isVisible ? styles.paused : ''}`}
            >
              <div className={`${styles['marquee-content']} ${styles['marquee-right']}`}>
                {duplicatedBottomSlides.map((slide, index) => (
                  <SlideCard
                    key={`bottom-${slide.id}-${index}`}
                    slide={slide}
                    index={index}
                    cardClass={`${styles['slide-card']} ${styles['slide-card-desktop']}`}
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Top row - moving left (now on bottom) */}
          <div className={`${styles['slider-row']} ${styles['top-row']}`}>
            <div 
              ref={topMarqueeRef}
              className={`${styles.marquee} ${isPaused || !isVisible ? styles.paused : ''}`}
            >
              <div className={`${styles['marquee-content']} ${styles['marquee-left']}`}>
                {duplicatedTopSlides.map((slide, index) => (
                  <SlideCard
                    key={`top-${slide.id}-${index}`}
                    slide={slide}
                    index={index}
                    cardClass={`${styles['slide-card']} ${styles['slide-card-instagram']}`}
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                  />
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