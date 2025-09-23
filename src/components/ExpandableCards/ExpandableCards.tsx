import React, { useState, useRef, useEffect } from 'react';
import { ChevronLeft, ChevronRight, X, Maximize2, Minimize2 } from 'lucide-react';
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
  galleryTitles?: string[];
  description: string;
  features: string[];
  specs: CardSpec[];
  color: string;
}

const cardsData: CardContent[] = [
  {
    id: 'research',
    title: 'User Research',
    category: 'Discovering Human Truths',
    image: 'https://res.cloudinary.com/dbvfgfqqh/image/upload/f_auto,q_auto,w_640,h_880,c_fill/v1753671143/research_rx2ayp.png',
    gallery: [
      'https://res.cloudinary.com/dbvfgfqqh/image/upload/f_auto,q_auto/v1753678165/int_fspdg0.gif',
      'https://res.cloudinary.com/dbvfgfqqh/image/upload/f_auto,q_auto/v1753674606/EmpathyMap_paguq5.png',
      'https://res.cloudinary.com/dbvfgfqqh/image/upload/f_auto,q_auto/v1753675101/persona_ay0lhm.png',
      'https://res.cloudinary.com/dbvfgfqqh/image/upload/f_auto,q_auto/v1753675685/cjm_xbcz40.png',
    ],
    galleryTitles: [
      'User Interviews',
      'Empathy Mapping',
      'User Personas',
      'Customer Journey Maps'
    ],
    description: 'Uncovering the "why" behind user behavior through empathetic inquiry and rigorous analysis, transforming assumptions into actionable insights.',
    features: [
      'Ethnographic field studies',
      'Behavioral pattern analysis',
      'Journey orchestration',
      'Emotional resonance mapping',
      'Co-creation workshops',
      'Contextual deep dives'
    ],
    specs: [
      { label: 'Methods', value: '15+ techniques' },
      { label: 'Participants', value: '500+ interviewed' },
      { label: 'Impact', value: '40% better retention' },
      { label: 'Insights', value: 'Weekly synthesis' }
    ],
    color: '#075985'
  },
  {
    id: 'visual-design',
    title: 'Visual Design',
    category: 'Crafting Emotional Experiences',
    image: 'https://res.cloudinary.com/dbvfgfqqh/image/upload/f_auto,q_auto,w_640,h_880,c_fill/v1753672061/color_i7ynme.png',
    gallery: [
      'https://res.cloudinary.com/dbvfgfqqh/image/upload/f_auto,q_auto/v1753773089/responsive-ezgif.com-video-to-gif-converter_ezinzt.gif',
      'https://res.cloudinary.com/dbvfgfqqh/image/upload/v1753785069/designsys_aimiwf.png',
      'https://res.cloudinary.com/dbvfgfqqh/image/upload/f_auto,q_auto/v1753772466/webError-UI_inryab.png',
      'https://res.cloudinary.com/dbvfgfqqh/image/upload/f_auto,q_auto/v1753771918/Moodboard_wpzsct.png',
      'https://res.cloudinary.com/dbvfgfqqh/image/upload/v1753782203/handsketch_hq7ogw.jpg',
    ],
    galleryTitles: [
      'Responsive Design',
      'Design System',
      'Wireframes',
      'Moodboards',
      'Hand Sketches'
    ],
    description: 'Weaving visual narratives that spark joy and drive action, where every pixel serves a purpose and beauty meets function.',
    features: [
      'Systematic design languages',
      'Motion choreography',
      'Brand soul expression',
      'Micro-interaction poetry',
      'Data storytelling',
      'Sensory design systems'
    ],
    specs: [
      { label: 'Components', value: '200+ patterns' },
      { label: 'Brands', value: '15+ evolved' },
      { label: 'Consistency', value: '98% harmony' },
      { label: 'Reach', value: 'Omnichannel' }
    ],
    color: '#064e3b'
  },
  {
    id: 'accessibility',
    title: 'Accessibility',
    category: 'Design Without Barriers',
    image: 'https://res.cloudinary.com/dbvfgfqqh/image/upload/f_auto,q_auto,w_640,h_880,c_fill/v1753671724/accessibility_pj5yw0.png',
    gallery: [
      'https://res.cloudinary.com/dbvfgfqqh/image/upload/v1753774437/Screenshot_2025-07-29_033338_uqqsen.png',
      'https://res.cloudinary.com/dbvfgfqqh/image/upload/v1753774606/Screenshot_2025-07-29_033614_i84ltf.png',
      'https://res.cloudinary.com/dbvfgfqqh/image/upload/v1753775328/Group_2_udwnmo.png',
    ],
    galleryTitles: [
      'Color Contrast Ratios',
      'Keyboard Navigation',
      'Screen Reader Labels'
    ],
    description: 'Championing digital equality by designing experiences that adapt to every human, not the other way around.',
    features: [
      'Beyond compliance design',
      'Assistive tech innovation',
      'Cognitive load optimization',
      'Multi-sensory experiences',
      'Inclusive design sprints',
      'Empathy-driven solutions'
    ],
    specs: [
      { label: 'Standards', value: 'WCAG 2.1 AAA' },
      { label: 'Testing', value: 'Real users first' },
      { label: 'Score', value: '100% accessible' },
      { label: 'Impact', value: '2M+ served' }
    ],
    color: '#0A0E13'
  },
  {
    id: 'information-architecture',
    title: 'Information Architecture',
    category: 'Wayfinding for Digital Spaces',
    image: 'https://res.cloudinary.com/dbvfgfqqh/image/upload/f_auto,q_auto,w_640,h_880,c_fill/v1753672700/IA_qtey5i.png',
    gallery: [
      'https://res.cloudinary.com/dbvfgfqqh/image/upload/v1753777569/Screenshot_2025-07-29_042238_fgaybw.png',
      'https://res.cloudinary.com/dbvfgfqqh/image/upload/v1753777810/Screenshot_2025-07-29_042946_v0dcsr.png',
      'https://images.unsplash.com/photo-1553877522-43269d4ea984?w=800&h=600&fit=crop&auto=format&q=80',
    ],
    galleryTitles: [
      'Site Mapping',
      'Process Engineering',
      'Content Taxonomy'
    ],
    description: 'Building invisible bridges between intention and action, creating spaces where users find what they need before they know they need it.',
    features: [
      'Intuitive taxonomies',
      'Predictive navigation',
      'Content ecosystems',
      'Mental model alignment',
      'Findability optimization',
      'Semantic architectures'
    ],
    specs: [
      { label: 'Findability', value: '92% first try' },
      { label: 'Simplicity', value: '3 clicks max' },
      { label: 'Scale', value: '10K+ pages' },
      { label: 'Clarity', value: '0 dead ends' }
    ],
    color: '#92400e'
  },
  {
    id: 'testing',
    title: 'Usability Testing',
    category: 'Validating with Real Humans',
    image: 'https://images.unsplash.com/photo-1516321497487-e288fb19713f?w=640&h=880&fit=crop&auto=format&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1516321497487-e288fb19713f?w=800&h=600&fit=crop&auto=format&q=80',
      'https://images.unsplash.com/photo-1551434678-e076c223a692?w=800&h=600&fit=crop&auto=format&q=80',
      'https://images.unsplash.com/photo-1573164713988-8665fc963095?w=800&h=600&fit=crop&auto=format&q=80',
    ],
    galleryTitles: [
      'A/B Testing Results',
      'Heat Map Analysis',
      'User Session Recordings'
    ],
    description: 'Transforming assumptions into certainty through rapid experimentation, where every failure is a stepping stone to breakthrough experiences.',
    features: [
      'Guerrilla testing tactics',
      'Remote observation labs',
      'Rapid prototype cycles',
      'Biometric analysis',
      'A/B testing at scale',
      'Continuous discovery'
    ],
    specs: [
      { label: 'Coverage', value: '95% features' },
      { label: 'Velocity', value: '48hr cycles' },
      { label: 'Success', value: '87% task rate' },
      { label: 'Learning', value: 'Daily insights' }
    ],
    color: '#7c2d12'
  },
  {
    id: 'leadership',
    title: 'Design Leadership',
    category: 'Cultivating Creative Excellence',
    image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=640&h=880&fit=crop&auto=format&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&h=600&fit=crop&auto=format&q=80',
      'https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=800&h=600&fit=crop&auto=format&q=80',
      'https://images.unsplash.com/photo-1521737852567-6949f3f9f2b5?w=800&h=600&fit=crop&auto=format&q=80',
    ],
    galleryTitles: [
      'Team Workshops',
      'Design Strategy Sessions',
      'Mentorship Programs'
    ],
    description: 'Orchestrating design excellence through visionary thinking and compassionate mentorship, turning creative teams into innovation powerhouses.',
    features: [
      'Design vision crafting',
      'Culture transformation',
      'Talent amplification',
      'Strategic storytelling',
      'Innovation frameworks',
      'Executive influence'
    ],
    specs: [
      { label: 'Teams', value: '50+ designers' },
      { label: 'Mentored', value: '25+ careers' },
      { label: 'Impact', value: '$50M+ value' },
      { label: 'Culture', value: 'Design-led orgs' }
    ],
    color: '#581c87'
  }
];

// Image preloader component with fit option
const ImagePreloader: React.FC<{ 
  src: string; 
  alt: string; 
  className?: string;
  objectFit?: 'cover' | 'contain';
}> = ({ src, alt, className, objectFit = 'cover' }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  return (
    <div className={`${styles.imageWrapper} ${isLoaded ? styles.loaded : ''}`}>
      {!isLoaded && !hasError && (
        <div className={styles.imagePlaceholder}>
          <div className={styles.imageLoader} />
        </div>
      )}
      <img 
        src={src} 
        alt={alt}
        className={className}
        style={{ objectFit }}
        onLoad={() => setIsLoaded(true)}
        onError={() => setHasError(true)}
        loading="lazy"
        draggable="false"
      />
    </div>
  );
};

// Corner icon
const Icon: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth="1.5"
    stroke="currentColor"
    className={className}
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m6-6H6" />
  </svg>
);

const ExpandableCards: React.FC = () => {
  const [expandedCard, setExpandedCard] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<string | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState<{ [key: string]: number }>({});
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const expandedRef = useRef<HTMLDivElement>(null);
  const sliderRef = useRef<HTMLDivElement>(null);

  // Initialize image indices
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

  // Preload expanded images when a card is hovered
  useEffect(() => {
    if (hoveredCard) {
      const card = cardsData.find(c => c.id === hoveredCard);
      if (card) {
        card.gallery.forEach(url => {
          const img = new Image();
          img.src = url;
        });
      }
    }
  }, [hoveredCard]);

  // Handle escape key for fullscreen
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isFullscreen) {
        setIsFullscreen(false);
      }
    };
    
    if (isFullscreen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    
    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = '';
    };
  }, [isFullscreen]);

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

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
  };

  const scrollSlider = (direction: 'left' | 'right') => {
    if (sliderRef.current) {
      const scrollAmount = 344; // Card width + gap
      sliderRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  const activeCardData = activeTab ? cardsData.find(card => card.id === activeTab) : null;

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        {/* Header */}
        <div className={styles.headerSection}>
          <h2 className={styles.sectionTitle}>Core Competencies</h2>
          {!expandedCard && (
            <div className={styles.sliderControls}>
              <button 
                className={styles.sliderArrow}
                onClick={() => scrollSlider('left')}
                aria-label="Previous"
              >
                <ChevronLeft size={16} />
              </button>
              <button 
                className={styles.sliderArrow}
                onClick={() => scrollSlider('right')}
                aria-label="Next"
              >
                <ChevronRight size={16} />
              </button>
            </div>
          )}
        </div>

        {/* Cards or Tabs */}
        {!expandedCard ? (
          <div 
            ref={sliderRef}
            className={styles.cardsSlider}
          >
            {cardsData.map((card) => (
                <div
                  key={card.id}
                  className={styles.card}
                  role="button"
                  tabIndex={0}
                  aria-pressed={expandedCard === card.id}
                  aria-expanded={expandedCard === card.id}
                  onClick={() => handleCardClick(card.id)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      handleCardClick(card.id);
                    }
                  }}
                  onMouseMove={(e) => handleMouseMove(e)}
                  onMouseEnter={() => setHoveredCard(card.id)}
                  onMouseLeave={() => setHoveredCard(null)}
                >
                {/* Corner icons */}
                <Icon className={`${styles.cornerIcon} ${styles.topLeft}`} />
                <Icon className={`${styles.cornerIcon} ${styles.topRight}`} />
                <Icon className={`${styles.cornerIcon} ${styles.bottomLeft}`} />
                <Icon className={`${styles.cornerIcon} ${styles.bottomRight}`} />

                <div className={styles.cardImage}>
                  <ImagePreloader 
                    src={card.image} 
                    alt={card.title}
                  />
                  <div className={styles.cardOverlay} />
                  <div className={styles.cardContent}>
                    <h3 className={styles.cardTitle}>{card.title}</h3>
                  </div>
                  {/* Tooltip on hover */}
                  {hoveredCard === card.id && (
                    <span 
                      className={styles.cardTooltip}
                      style={{
                        left: `${mousePosition.x}px`,
                        top: `${mousePosition.y - 30}px`,
                        transform: 'translateX(-50%)'
                      }}
                    >
                      Quick view
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className={styles.tabNavigation}>
            <div className={styles.tabList}>
              {cardsData.map((card) => (
                <button
                  key={card.id}
                  className={`${styles.tabButton} ${activeTab === card.id ? styles.active : ''}`}
                  onClick={() => handleTabClick(card.id)}
                >
                  {card.title}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Expanded Content */}
        {expandedCard && activeCardData && (
          <div ref={expandedRef} className={styles.expandedSection}>
            <div className={styles.expandedContent}>
              {/* Gallery */}
              <div className={styles.gallerySection}>
                <div className={styles.mainImage}>
                  <ImagePreloader 
                    src={activeCardData.gallery[currentImageIndex[activeTab || ''] || 0]} 
                    alt={activeCardData.title}
                    objectFit="contain"
                  />
                  
                  <div className={styles.imageCounter}>
                    {currentImageIndex[activeTab || ''] + 1} / {activeCardData.gallery.length}
                  </div>
                  
                  {activeCardData.gallery.length > 1 && (
                    <>
                      <button
                        className={`${styles.galleryNav} ${styles.prevButton}`}
                        onClick={() => activeTab && handleImageNav(activeTab, 'prev')}
                        aria-label="Previous"
                      >
                        <ChevronLeft size={16} />
                      </button>
                      <button
                        className={`${styles.galleryNav} ${styles.nextButton}`}
                        onClick={() => activeTab && handleImageNav(activeTab, 'next')}
                        aria-label="Next"
                      >
                        <ChevronRight size={16} />
                      </button>
                    </>
                  )}
                  
                  {/* Fullscreen button */}
                  <button
                    className={styles.fullscreenButton}
                    onClick={() => setIsFullscreen(true)}
                    aria-label="View fullscreen"
                  >
                    <Maximize2 size={16} />
                  </button>
                </div>
                {activeCardData.galleryTitles && (
                  <p className={styles.imageTitle}>
                    {activeCardData.galleryTitles[currentImageIndex[activeTab || ''] || 0]}
                  </p>
                )}
              </div>

              {/* Details */}
              <div className={styles.detailsSection}>
                <div className={styles.detailsHeader}>
                  <p className={styles.detailCategory}>{activeCardData.category}</p>
                  <h2 className={styles.detailTitle}>{activeCardData.title}</h2>
                  <p className={styles.detailDescription}>{activeCardData.description}</p>
                </div>

                <div className={styles.infoContainer}>
                  <div className={styles.infoSection}>
                    <h3 className={styles.infoTitle}>Key Features</h3>
                    <ul className={styles.featuresList}>
                      {activeCardData.features.map((feature, index) => (
                        <li key={index}>{feature}</li>
                      ))}
                    </ul>
                  </div>

                  <div className={styles.infoSection}>
                    <h3 className={styles.infoTitle}>Specifications</h3>
                    <div className={styles.specsList}>
                      {activeCardData.specs.map((spec, index) => (
                        <div key={index} className={styles.specItem}>
                          <span className={styles.specLabel}>{spec.label}</span>
                          <span className={styles.specValue}>{spec.value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <button
              className={styles.closeButton}
              onClick={() => {
                setExpandedCard(null);
                setActiveTab(null);
              }}
              aria-label="Close"
            >
              <X size={16} />
            </button>
          </div>
        )}  
      </div>

      {/* Fullscreen overlay */}
      {isFullscreen && activeCardData && (
        <div className={styles.fullscreenOverlay} onClick={() => setIsFullscreen(false)}>
          <div className={styles.fullscreenContent} onClick={(e) => e.stopPropagation()}>
            <ImagePreloader 
              src={activeCardData.gallery[currentImageIndex[activeTab || ''] || 0]} 
              alt={activeCardData.title}
              className={styles.fullscreenImage}
              objectFit="contain"
            />
            
            {activeCardData.gallery.length > 1 && (
              <>
                <button
                  className={`${styles.galleryNav} ${styles.prevButton}`}
                  onClick={() => activeTab && handleImageNav(activeTab, 'prev')}
                  aria-label="Previous"
                >
                  <ChevronLeft size={20} />
                </button>
                <button
                  className={`${styles.galleryNav} ${styles.nextButton}`}
                  onClick={() => activeTab && handleImageNav(activeTab, 'next')}
                  aria-label="Next"
                >
                  <ChevronRight size={20} />
                </button>
              </>
            )}
            
            <button
              className={styles.fullscreenCloseButton}
              onClick={() => setIsFullscreen(false)}
              aria-label="Exit fullscreen"
            >
              <Minimize2 size={20} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ExpandableCards;