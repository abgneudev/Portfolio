'use client';

import { memo, useState, useEffect, useCallback } from 'react';
import { BinaryReveal } from './BinaryReveal';
import styles from '../Hero.module.css';

interface ImageSliderProps {
  /** Array of image URLs to display */
  images: string[];
  /** Accent color for reveal animation and indicators */
  accent: string;
  /** Whether to show the binary reveal animation on mount */
  isNew?: boolean;
}

const SLIDE_INTERVAL = 3000;

/**
 * ImageSlider Component
 *
 * Displays a carousel of images with auto-advancement and manual navigation.
 * Optionally shows a binary reveal animation on initial load.
 *
 * @accessibility
 * - Navigation dots have aria-labels for screen readers
 * - Images have alt text for assistive technologies
 * - Focus visible indicators on interactive elements
 */
export const ImageSlider = memo(function ImageSlider({
  images,
  accent,
  isNew = false
}: ImageSliderProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showReveal, setShowReveal] = useState(isNew);
  const [imageVisible, setImageVisible] = useState(!isNew);

  const handleRevealComplete = useCallback(() => {
    setShowReveal(false);
    setImageVisible(true);
  }, []);

  const handleDotClick = useCallback((index: number) => {
    setCurrentIndex(index);
  }, []);

  // Auto-advance slides
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % images.length);
    }, SLIDE_INTERVAL);
    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div className={styles.imageSlider} role="region" aria-label="Image carousel">
      {showReveal && (
        <BinaryReveal accent={accent} onComplete={handleRevealComplete} />
      )}

      <img
        src={images[currentIndex]}
        alt={`Project showcase ${currentIndex + 1} of ${images.length}`}
        className={styles.sliderImage}
        style={{ opacity: imageVisible ? 1 : 0 }}
        loading="lazy"
      />

      <div
        className={styles.sliderGradient}
        style={{ opacity: imageVisible ? 1 : 0 }}
      >
        <div className={styles.sliderDots} role="tablist" aria-label="Slide navigation">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => handleDotClick(index)}
              className={styles.sliderDot}
              style={{
                backgroundColor: index === currentIndex
                  ? accent
                  : 'rgba(255,255,255,0.4)'
              }}
              role="tab"
              aria-selected={index === currentIndex}
              aria-label={`Go to slide ${index + 1}`}
              tabIndex={index === currentIndex ? 0 : -1}
            />
          ))}
        </div>
      </div>
    </div>
  );
});
