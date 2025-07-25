import React, { useState, useRef, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import styles from './ExpandableCards.module.css';

interface CardSpec {
  label: string;
  value: string;
}

interface CardContent {
  id: string;
  title: string;
  category: string;
  image: string;
  gallery: string[];
  description: string;
  features: string[];
  specs: CardSpec[];
}

interface DragState {
  isDragging: boolean;
  startX: number;
  scrollLeft: number;
  hasMoved: boolean;
}

const cardsData: CardContent[] = [
  {
    id: 'design-systems',
    title: 'Design Systems',
    category: 'System Architecture',
    image: 'https://images.unsplash.com/photo-1569163139394-de4798907684?w=800&h=1000&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1569163139394-de4798907684?w=1200&h=800&fit=crop',
      'https://images.unsplash.com/photo-1559028012-481c04fa702d?w=1200&h=800&fit=crop',
      'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=1200&h=800&fit=crop',
    ],
    description: 'Scalable design system architecture with reusable components, design tokens, and comprehensive documentation for consistent experiences.',
    features: [
      'Component versioning',
      'Design token architecture',
      'Storybook documentation'
    ],
    specs: [
      { label: 'Components', value: '45+ patterns' },
      { label: 'Tokens', value: 'Multi-platform support' },
      { label: 'Framework', value: 'React + TypeScript' }
    ]
  },
  {
    id: 'accessibility',
    title: 'Accessibility',
    category: 'Inclusive Design',
    image: 'https://images.unsplash.com/photo-1508921340878-ba53e1f016ec?w=800&h=1000&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1508921340878-ba53e1f016ec?w=1200&h=800&fit=crop',
      'https://images.unsplash.com/photo-1516321497487-e288fb19713f?w=1200&h=800&fit=crop',
      'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=1200&h=800&fit=crop',
    ],
    description: 'WCAG-compliant accessibility patterns ensuring digital experiences are usable by everyone, including keyboard navigation and screen reader support.',
    features: [
      'ARIA pattern library',
      'Keyboard navigation flows',
      'Screen reader optimization'
    ],
    specs: [
      { label: 'Compliance', value: 'WCAG 2.1 AA' },
      { label: 'Testing Tools', value: 'axe DevTools' },
      { label: 'Audit Score', value: '100/100' }
    ]
  },
  {
    id: 'research',
    title: 'User Research',
    category: 'Human-Centered Design',
    image: 'https://images.unsplash.com/photo-1531403009284-440f080d1e12?w=800&h=1000&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1531403009284-440f080d1e12?w=1200&h=800&fit=crop',
      'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=1200&h=800&fit=crop',
      'https://images.unsplash.com/photo-1552664730-d307ca884978?w=1200&h=800&fit=crop',
    ],
    description: 'Research-driven design process incorporating user interviews, usability testing, and data analytics to inform design decisions.',
    features: [
      'Mixed methods research',
      'Journey mapping tools',
      'Analytics integration'
    ],
    specs: [
      { label: 'Methods', value: 'Qual + Quant' },
      { label: 'Sample Size', value: '5-8 per round' },
      { label: 'Cadence', value: 'Bi-weekly testing' }
    ]
  },
  {
    id: 'ia',
    title: 'Information Architecture',
    category: 'Structure Design',
    image: 'https://images.unsplash.com/photo-1512758017271-d7b84c2113f1?w=800&h=1000&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1512758017271-d7b84c2113f1?w=1200&h=800&fit=crop',
      'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1200&h=800&fit=crop',
      'https://images.unsplash.com/photo-1553877522-43269d4ea984?w=1200&h=800&fit=crop',
    ],
    description: 'Strategic information architecture patterns for complex applications, featuring intuitive navigation systems and clear content hierarchies.',
    features: [
      'Card sorting methodologies',
      'Navigation pattern library',
      'Content taxonomy systems'
    ],
    specs: [
      { label: 'Nav Depth', value: '3 levels maximum' },
      { label: 'Categories', value: 'User-tested groupings' },
      { label: 'Patterns', value: '12 IA templates' }
    ]
  },
  {
    id: 'prototyping',
    title: 'Prototyping',
    category: 'Rapid Development',
    image: 'https://images.unsplash.com/photo-1598520106830-8c45c2035460?w=800&h=1000&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1598520106830-8c45c2035460?w=1200&h=800&fit=crop',
      'https://images.unsplash.com/photo-1594904351111-a072f80b1a71?w=1200&h=800&fit=crop',
      'https://images.unsplash.com/photo-1590959651373-a3db0f38a961?w=1200&h=800&fit=crop',
    ],
    description: 'High-fidelity prototyping workflows enabling rapid iteration and user testing with interactive, code-based prototypes.',
    features: [
      'Interactive prototypes',
      'Micro-interaction details',
      'Real data integration'
    ],
    specs: [
      { label: 'Fidelity', value: 'Production-ready' },
      { label: 'Tools', value: 'Figma + React' },
      { label: 'Turnaround', value: '48-72 hours' }
    ]
  }
];

const ExpandableCards: React.FC = () => {
  const [expandedCard, setExpandedCard] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<string | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState<{ [key: string]: number }>({});
  const expandedRef = useRef<HTMLDivElement>(null);
  const sliderRef = useRef<HTMLDivElement>(null);
  
  const dragState = useRef<DragState>({
    isDragging: false,
    startX: 0,
    scrollLeft: 0,
    hasMoved: false
  });

  useEffect(() => {
    const indices: { [key: string]: number } = {};
    cardsData.forEach(card => {
      indices[card.id] = 0;
    });
    setCurrentImageIndex(indices);
  }, []);

  // Set active tab when card expands
  useEffect(() => {
    if (expandedCard) {
      setActiveTab(expandedCard);
    }
  }, [expandedCard]);

  const handleMouseDown = (e: React.MouseEvent) => {
    const slider = sliderRef.current;
    if (!slider) return;
    dragState.current.isDragging = true;
    dragState.current.startX = e.pageX - slider.offsetLeft;
    dragState.current.scrollLeft = slider.scrollLeft;
    dragState.current.hasMoved = false;
    slider.classList.add(styles.dragging);
    window.addEventListener('mousemove', handleMouseMoveWindow);
    window.addEventListener('mouseup', handleMouseUpWindow);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!dragState.current.isDragging || !sliderRef.current) return;
    e.preventDefault();
    const slider = sliderRef.current;
    const x = e.pageX - slider.offsetLeft;
    const walk = (x - dragState.current.startX) * 2;
    slider.scrollLeft = dragState.current.scrollLeft - walk;
    if (Math.abs(x - dragState.current.startX) > 5) {
      dragState.current.hasMoved = true;
    }
  };

  const handleMouseMoveWindow = (e: MouseEvent) => {
    if (!dragState.current.isDragging || !sliderRef.current) return;
    e.preventDefault();
    const slider = sliderRef.current;
    const x = e.pageX - slider.offsetLeft;
    const walk = (x - dragState.current.startX) * 2;
    slider.scrollLeft = dragState.current.scrollLeft - walk;
    if (Math.abs(x - dragState.current.startX) > 5) {
      dragState.current.hasMoved = true;
    }
  };

  const handleMouseUp = () => {
    const slider = sliderRef.current;
    if (slider) {
      slider.classList.remove(styles.dragging);
    }
    dragState.current.isDragging = false;
    window.removeEventListener('mousemove', handleMouseMoveWindow);
    window.removeEventListener('mouseup', handleMouseUpWindow);
  };

  const handleMouseUpWindow = () => {
    handleMouseUp();
  };

  const handleMouseLeave = () => {
    if (dragState.current.isDragging) {
      handleMouseUp();
    }
  };

  const handleCardClick = (cardId: string) => {
    if (expandedCard === cardId) {
      setExpandedCard(null);
      setActiveTab(null);
    } else {
      setExpandedCard(cardId);
      setActiveTab(cardId);
      setTimeout(() => {
        expandedRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
    }
    dragState.current.hasMoved = false;
    dragState.current.isDragging = false;
  };

  const handleTabClick = (tabId: string) => {
    setActiveTab(tabId);
  };

  const handleImageNav = (cardId: string, direction: 'prev' | 'next') => {
    const card = cardsData.find(c => c.id === cardId);
    if (!card) return;
    
    const totalImages = card.gallery.length;
    
    setCurrentImageIndex(prev => ({
      ...prev,
      [cardId]: direction === 'next' 
        ? (prev[cardId] + 1) % totalImages
        : prev[cardId] === 0 ? totalImages - 1 : prev[cardId] - 1
    }));
  };

  const scrollSlider = (direction: 'left' | 'right') => {
    if (sliderRef.current) {
      const scrollAmount = sliderRef.current.clientWidth * 0.8;
      sliderRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  const activeCardData = activeTab ? cardsData.find(card => card.id === activeTab) : null;

  return (
    <div className={styles.container}>
      {/* Header */}
      <div className={styles.grid}>
        <div className={styles.headerSection}>
          <h2 className={styles.sectionTitle}>Explore my expertise</h2>
          {!expandedCard && (
            <div className={styles.sliderControls}>
              <button 
                className={styles.sliderArrow}
                onClick={() => scrollSlider('left')}
                aria-label="Scroll left"
              >
                <ChevronLeft size={24} />
              </button>
              <button 
                className={styles.sliderArrow}
                onClick={() => scrollSlider('right')}
                aria-label="Scroll right"
              >
                <ChevronRight size={24} />
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Cards Slider or Tabs */}
      {!expandedCard ? (
        <div 
          ref={sliderRef}
          className={styles.cardsSlider}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseLeave}
        >
          {cardsData.map((card) => (
            <div
              key={card.id}
              className={`${styles.card} ${expandedCard === card.id ? styles.active : ''}`}
              onClick={() => handleCardClick(card.id)}
            >
              <div className={styles.cardImage}>
                <img 
                  src={card.image} 
                  alt={card.title} 
                  draggable="false"
                />
                <div className={styles.cardOverlay} />
                <div className={styles.cardContent}>
                  <h3 className={styles.cardTitle}>{card.title}</h3>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className={styles.grid}>
          <div className={styles.tabNavigation}>
            <div className={styles.tabList}>
              {cardsData.map((card) => (
                <button
                  key={card.id}
                  className={`${styles.tabButton} ${activeTab === card.id ? styles.active : ''}`}
                  onClick={() => handleTabClick(card.id)}
                >
                  {card.title.toUpperCase()}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Expanded Section */}
      {expandedCard && activeCardData && (
        <div ref={expandedRef} className={styles.expandedSection}>
          <div className={styles.grid}>
            <div className={styles.expandedGrid}>
              {/* Gallery */}
              <div className={styles.gallerySection}>
                <div className={styles.mainImage}>
                  <img 
                    src={activeCardData.gallery[currentImageIndex[activeTab || ''] || 0]} 
                    alt={activeCardData.title}
                  />
                  
                  {/* Image counter */}
                  <div className={styles.imageCounter}>
                    {String(currentImageIndex[activeTab || ''] + 1 || 1).padStart(2, '0')}/{String(activeCardData.gallery.length).padStart(2, '0')}
                  </div>
                  
                  {activeCardData.gallery.length > 1 && (
                    <>
                      <button
                        className={`${styles.galleryNav} ${styles.prevButton}`}
                        onClick={(e) => {
                          e.stopPropagation();
                          if (activeTab) handleImageNav(activeTab, 'prev');
                        }}
                        aria-label="Previous image"
                      >
                        <ChevronLeft size={20} />
                      </button>
                      <button
                        className={`${styles.galleryNav} ${styles.nextButton}`}
                        onClick={(e) => {
                          e.stopPropagation();
                          if (activeTab) handleImageNav(activeTab, 'next');
                        }}
                        aria-label="Next image"
                      >
                        <ChevronRight size={20} />
                      </button>
                    </>
                  )}
                </div>
              </div>

              {/* Details */}
              <div className={styles.detailsSection}>
                <div className={styles.detailsHeader}>
                  <p className={styles.detailCategory}>{activeCardData.category}</p>
                  <h2 className={styles.detailTitle}>{activeCardData.title}</h2>
                  <p className={styles.detailDescription}>{activeCardData.description}</p>
                </div>

                <div className={styles.features}>
                  <h3 className={styles.featuresTitle}>Key Features</h3>
                  <ul className={styles.featuresList}>
                    {activeCardData.features.map((feature, index) => (
                      <li key={index}>{feature}</li>
                    ))}
                  </ul>
                </div>

                <div className={styles.specs}>
                  <h3 className={styles.specsTitle}>Specifications</h3>
                  <dl className={styles.specsList}>
                    {activeCardData.specs.map((spec, index) => (
                      <div key={index} className={styles.specItem}>
                        <dt>{spec.label}</dt>
                        <dd>{spec.value}</dd>
                      </div>
                    ))}
                  </dl>
                </div>

                <button className={styles.shopButton}>
                  Explore This Category
                </button>
              </div>
            </div>
          </div>

          <button
            className={styles.closeButton}
            onClick={(e) => {
              e.stopPropagation();
              setExpandedCard(null);
              setActiveTab(null);
            }}
            aria-label="Close"
          >
            ×
          </button>
        </div>
      )}
    </div>
  );
};

export default ExpandableCards;