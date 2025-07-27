import React, { useRef, useEffect, useState } from 'react';
import styles from './ThreeDMarquee.module.css';

interface ThreeDMarqueeProps {
  images: string[];
  speed?: number;
  pauseOnHover?: boolean;
  reverse?: boolean;
  className?: string;
}

const ThreeDMarquee: React.FC<ThreeDMarqueeProps> = ({
  images,
  speed = 30,
  pauseOnHover = true,
  reverse = false,
  className = ''
}) => {
  const marqueeRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);

  // Triple images for smoother loop
  const duplicatedImages = [...images, ...images, ...images];

  useEffect(() => {
    const marquee = marqueeRef.current;
    if (!marquee) return;

    // Set CSS custom properties for animation
    marquee.style.setProperty('--marquee-duration', `${speed}s`);
    marquee.style.setProperty('--marquee-direction', reverse ? 'reverse' : 'normal');
  }, [speed, reverse]);

  return (
    <div className={`${styles.marqueeContainer} ${className}`}>
      <div className={styles.perspective}>
        <div 
          ref={marqueeRef}
          className={`${styles.marquee} ${isPaused ? styles.paused : ''}`}
        >
          <div className={styles.marqueeContent}>
            {duplicatedImages.map((image, index) => (
              <div
                key={index}
                className={styles.imageWrapper}
                onMouseEnter={() => pauseOnHover && setIsPaused(true)}
                onMouseLeave={() => pauseOnHover && setIsPaused(false)}
                style={{
                  '--item-index': index,
                  '--total-items': duplicatedImages.length
                } as React.CSSProperties}
              >
                <img
                  src={image}
                  alt={`Marquee item ${index}`}
                  className={styles.image}
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// Demo component with sample images
const ThreeDMarqueeSection: React.FC = () => {
  // Sample images - replace with your actual images
  const sampleImages = [
    'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=400&h=600&fit=crop',
    'https://images.unsplash.com/photo-1569163139394-de4798907684?w=400&h=600&fit=crop',
    'https://images.unsplash.com/photo-1559028012-481c04fa702d?w=400&h=600&fit=crop',
    'https://images.unsplash.com/photo-1618005198919-d3d4b5a92ead?w=400&h=600&fit=crop',
    'https://images.unsplash.com/photo-1563089145-599997674d42?w=400&h=600&fit=crop',
    'https://images.unsplash.com/photo-1611532736579-6b16e2b50449?w=400&h=600&fit=crop',
    'https://images.unsplash.com/photo-1617727553252-65863c156eb0?w=400&h=600&fit=crop',
    'https://images.unsplash.com/photo-1594736797933-d0501ba2fe65?w=400&h=600&fit=crop',
  ];

  return (
    <section className={styles.section}>
      <div className={styles.grid}>
        <div className={styles.headerSection}>
          <h2 className={styles.sectionTitle}>Featured Work Gallery</h2>
          <p className={styles.sectionDescription}>
            A continuous showcase of recent projects and design explorations
          </p>
        </div>
      </div>
      
      <div className={styles.marqueeWrapper}>
        <ThreeDMarquee
          images={sampleImages}
          speed={20}
          pauseOnHover={true}
        />
      </div>
    </section>
  );
};

export default ThreeDMarqueeSection;