import React, { useRef, useEffect, useState } from 'react';
import styles from './ThreeDMarquee.module.css';

interface CardContent {
  image: string;
  title: string;
  description: string;
  tags?: string[];
}

interface ThreeDMarqueeProps {
  cards: CardContent[];
  speed?: number;
  pauseOnHover?: boolean;
  reverse?: boolean;
  className?: string;
}

const ThreeDMarquee: React.FC<ThreeDMarqueeProps> = ({
  cards,
  speed = 30,
  pauseOnHover = true,
  reverse = false,
  className = ''
}) => {
  const marqueeRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);
  const [flippedCards, setFlippedCards] = useState<Set<number>>(new Set());

  // Triple cards for smoother loop
  const duplicatedCards = [...cards, ...cards, ...cards];

  useEffect(() => {
    const marquee = marqueeRef.current;
    if (!marquee) return;

    // Set CSS custom properties for animation
    marquee.style.setProperty('--marquee-duration', `${speed}s`);
    marquee.style.setProperty('--marquee-direction', reverse ? 'reverse' : 'normal');
  }, [speed, reverse]);

  const handleFlip = (index: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setFlippedCards(prev => {
      const newSet = new Set(prev);
      if (newSet.has(index)) {
        newSet.delete(index);
      } else {
        newSet.add(index);
      }
      return newSet;
    });
  };

  return (
    <div className={`${styles.marqueeContainer} ${className}`}>
      <div className={styles.perspective}>
        <div 
          ref={marqueeRef}
          className={`${styles.marquee} ${isPaused ? styles.paused : ''}`}
        >
          <div className={styles.marqueeContent}>
            {duplicatedCards.map((card, index) => (
              <div
                key={index}
                className={styles.cardWrapper}
                onMouseEnter={() => pauseOnHover && setIsPaused(true)}
                onMouseLeave={() => pauseOnHover && setIsPaused(false)}
                style={{
                  '--item-index': index,
                  '--total-items': duplicatedCards.length
                } as React.CSSProperties}
              >
                <div className={`${styles.card} ${flippedCards.has(index) ? styles.flipped : ''}`}>
                  {/* Front of card */}
                  <div className={styles.cardFront}>
                    <img
                      src={card.image}
                      alt={card.title}
                      className={styles.image}
                      loading="lazy"
                    />
                    <button
                      className={styles.flipButton}
                      onClick={(e) => handleFlip(index, e)}
                      aria-label="Flip card"
                    >
                      <img
                        src="images/repeat.png"
                        alt="Flip"
                        style={{ width: 22, height: 22, objectFit: 'contain', display: 'block' }}
                      />
                    </button>
                  </div>
                  
                  {/* Back of card */}
                  <div className={styles.cardBack}>
                    <div className={styles.cardContent}>
                      <h3 className={styles.cardTitle}>{card.title}</h3>
                      <p className={styles.cardDescription}>{card.description}</p>
                      {card.tags && (
                        <div className={styles.cardTags}>
                          {card.tags.map((tag, tagIndex) => (
                            <span key={tagIndex} className={styles.tag}>{tag}</span>
                          ))}
                        </div>
                      )}
                    </div>
                    <button
                      className={styles.flipButton}
                      onClick={(e) => handleFlip(index, e)}
                      aria-label="Flip card back"
                    >
                      <img
                        src="images/repeat.png"
                        alt="Flip"
                        style={{ width: 22, height: 22, objectFit: 'contain', display: 'block' }}
                      />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// Demo component with sample content
const ThreeDMarqueeSection: React.FC = () => {
  // Sample cards with front images and back content
  const sampleCards: CardContent[] = [
    {
      image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=400&h=600&fit=crop',
      title: 'Modern Architecture',
      description: 'Exploring minimalist design principles in contemporary urban spaces.',
      tags: ['Architecture', 'Minimal', 'Urban']
    },
    {
      image: 'https://images.unsplash.com/photo-1569163139394-de4798907684?w=400&h=600&fit=crop',
      title: 'Digital Art',
      description: 'Pushing boundaries with generative algorithms and creative coding.',
      tags: ['Digital', 'Generative', 'Code']
    },
    {
      image: 'https://images.unsplash.com/photo-1559028012-481c04fa702d?w=400&h=600&fit=crop',
      title: 'Brand Identity',
      description: 'Crafting unique visual languages for forward-thinking companies.',
      tags: ['Branding', 'Identity', 'Design']
    },
    {
      image: 'https://images.unsplash.com/photo-1618005198919-d3d4b5a92ead?w=400&h=600&fit=crop',
      title: 'UI/UX Design',
      description: 'Creating intuitive interfaces that delight users at every touchpoint.',
      tags: ['UI', 'UX', 'Product']
    },
    {
      image: 'https://images.unsplash.com/photo-1563089145-599997674d42?w=400&h=600&fit=crop',
      title: 'Motion Graphics',
      description: 'Bringing static designs to life through thoughtful animation.',
      tags: ['Motion', 'Animation', '3D']
    },
    {
      image: 'https://images.unsplash.com/photo-1611532736579-6b16e2b50449?w=400&h=600&fit=crop',
      title: 'Typography',
      description: 'Experimenting with letterforms to communicate emotion and meaning.',
      tags: ['Type', 'Lettering', 'Font']
    },
    {
      image: 'https://images.unsplash.com/photo-1617727553252-65863c156eb0?w=400&h=600&fit=crop',
      title: 'Illustration',
      description: 'Hand-crafted visuals that tell stories and spark imagination.',
      tags: ['Illustration', 'Art', 'Visual']
    },
    {
      image: 'https://images.unsplash.com/photo-1594736797933-d0501ba2fe65?w=400&h=600&fit=crop',
      title: 'Photography',
      description: 'Capturing moments that reveal the beauty in everyday life.',
      tags: ['Photo', 'Visual', 'Story']
    },
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
          cards={sampleCards}
          speed={20}
          pauseOnHover={true}
        />
      </div>
    </section>
  );
};

export default ThreeDMarqueeSection;