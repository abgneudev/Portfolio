import React, { useState, useRef, useEffect } from 'react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
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
  color: string;
}

const cardsData: CardContent[] = [
  {
    id: 'design-systems',
    title: 'Design Systems',
    category: 'System Architecture',
    image: 'https://images.unsplash.com/photo-1569163139394-de4798907684?w=600&h=600&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1569163139394-de4798907684?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1559028012-481c04fa702d?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=800&h=600&fit=crop',
    ],
    description: 'Scalable design system architecture with reusable components and comprehensive documentation.',
    features: [
      'Component versioning',
      'Design token architecture',
      'Automated documentation',
      'Cross-platform support'
    ],
    specs: [
      { label: 'Components', value: '45+ patterns' },
      { label: 'Platforms', value: 'Web, iOS, Android' },
      { label: 'Framework', value: 'React + TypeScript' },
      { label: 'Coverage', value: '95% tested' }
    ],
    color: '#064e3b'
  },
  {
    id: 'accessibility',
    title: 'Accessibility',
    category: 'Inclusive Design',
    image: 'https://images.unsplash.com/photo-1508921340878-ba53e1f016ec?w=600&h=600&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1508921340878-ba53e1f016ec?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1516321497487-e288fb19713f?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=800&h=600&fit=crop',
    ],
    description: 'End-to-end accessibility solutions ensuring digital products are usable by everyone, with comprehensive testing and validation protocols.',
    features: [
      'ARIA pattern library',
      'Keyboard navigation flows',
      'Screen reader optimization',
      'Color contrast systems',
      'Focus management',
      'Assistive tech testing'
    ],
    specs: [
      { label: 'Compliance', value: 'WCAG 2.1 AA' },
      { label: 'Testing', value: 'Automated + Manual' },
      { label: 'Score', value: '100/100 Lighthouse' },
      { label: 'Coverage', value: 'Full stack' }
    ],
    color: '#0A0E13'
  },
  {
    id: 'research',
    title: 'User Research',
    category: 'Human-Centered Design',
    image: 'https://images.unsplash.com/photo-1531403009284-440f080d1e12?w=600&h=600&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1531403009284-440f080d1e12?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=600&fit=crop',
    ],
    description: 'Data-driven research methodologies combining qualitative insights with quantitative validation.',
    features: [
      'Mixed-methods research',
      'Journey mapping',
      'Usability testing',
      'Analytics integration'
    ],
    specs: [
      { label: 'Methods', value: 'Qual + Quant' },
      { label: 'Cadence', value: 'Bi-weekly' },
      { label: 'Sample', value: '5-8 users' },
      { label: 'Tools', value: 'Maze, Hotjar' }
    ],
    color: '#075985'
  },
  {
    id: 'ia',
    title: 'Information Architecture',
    category: 'Structure Design',
    image: 'https://images.unsplash.com/photo-1512758017271-d7b84c2113f1?w=600&h=600&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1512758017271-d7b84c2113f1?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1553877522-43269d4ea984?w=800&h=600&fit=crop',
    ],
    description: 'Strategic information architecture for complex digital products, optimizing findability.',
    features: [
      'Card sorting studies',
      'Navigation patterns',
      'Taxonomy development',
      'Search optimization'
    ],
    specs: [
      { label: 'Depth', value: '3 levels max' },
      { label: 'Success', value: '87% findability' },
      { label: 'Patterns', value: '12 templates' },
      { label: 'Testing', value: 'Tree testing' }
    ],
    color: '#581c87'
  },
  {
    id: 'prototyping',
    title: 'Rapid Prototyping',
    category: 'Innovation Lab',
    image: 'https://images.unsplash.com/photo-1598520106830-8c45c2035460?w=600&h=600&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1598520106830-8c45c2035460?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1594904351111-a072f80b1a71?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1590959651373-a3db0f38a961?w=800&h=600&fit=crop',
    ],
    description: 'High-velocity prototyping delivering production-ready interactive prototypes.',
    features: [
      'Interactive prototypes',
      'Micro-interactions',
      'Real data integration',
      'Device testing'
    ],
    specs: [
      { label: 'Fidelity', value: 'Production' },
      { label: 'Speed', value: '48-72 hours' },
      { label: 'Stack', value: 'React + Framer' },
      { label: 'Testing', value: 'Live sessions' }
    ],
    color: '#7c2d12'
  }
];

// Canvas component
const CanvasRevealEffect: React.FC<{
  isHovered: boolean;
  color: string;
  animationSpeed?: number;
  dotSize?: number;
}> = ({ isHovered, color, animationSpeed = 3, dotSize = 2 }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number | null>(null);
  const timeRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const updateCanvasSize = () => {
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width;
      canvas.height = rect.height;
    };

    updateCanvasSize();
    window.addEventListener('resize', updateCanvasSize);

    const animate = () => {
      if (!ctx || !canvas) return;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      if (isHovered) {
        timeRef.current += animationSpeed * 0.01;

        const cols = Math.floor(canvas.width / (dotSize * 10));
        const rows = Math.floor(canvas.height / (dotSize * 10));

        for (let i = 0; i < cols; i++) {
          for (let j = 0; j < rows; j++) {
            const x = i * dotSize * 10 + dotSize * 5;
            const y = j * dotSize * 10 + dotSize * 5;
            
            const distance = Math.sqrt(
              Math.pow(x - canvas.width / 2, 2) + 
              Math.pow(y - canvas.height / 2, 2)
            );
            
            const opacity = Math.sin(distance * 0.01 - timeRef.current) * 0.5 + 0.5;
            
            ctx.fillStyle = color + Math.floor(opacity * 255).toString(16).padStart(2, '0');
            ctx.beginPath();
            ctx.arc(x, y, dotSize, 0, Math.PI * 2);
            ctx.fill();
          }
        }
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', updateCanvasSize);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isHovered, color, animationSpeed, dotSize]);

  return <canvas ref={canvasRef} className={styles.canvas} />;
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
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);
  const expandedRef = useRef<HTMLDivElement>(null);
  const sliderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const indices: { [key: string]: number } = {};
    cardsData.forEach(card => {
      indices[card.id] = 0;
    });
    setCurrentImageIndex(indices);
  }, []);

  useEffect(() => {
    if (expandedCard) {
      setActiveTab(expandedCard);
    }
  }, [expandedCard]);

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
                onClick={() => handleCardClick(card.id)}
                onMouseEnter={() => setHoveredCard(card.id)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                {/* Corner icons */}
                <Icon className={`${styles.cornerIcon} ${styles.topLeft}`} />
                <Icon className={`${styles.cornerIcon} ${styles.topRight}`} />
                <Icon className={`${styles.cornerIcon} ${styles.bottomLeft}`} />
                <Icon className={`${styles.cornerIcon} ${styles.bottomRight}`} />

                <div className={styles.cardImage}>
                  <img 
                    src={card.image} 
                    alt={card.title} 
                    draggable="false"
                  />
                  <CanvasRevealEffect 
                    isHovered={hoveredCard === card.id}
                    color={card.color}
                    animationSpeed={3}
                    dotSize={2}
                  />
                  <div className={styles.cardOverlay} />
                  <div className={styles.cardContent}>
                    <p className={styles.cardCategory}>{card.category}</p>
                    <h3 className={styles.cardTitle}>{card.title}</h3>
                  </div>
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
                  <img 
                    src={activeCardData.gallery[currentImageIndex[activeTab || ''] || 0]} 
                    alt={activeCardData.title}
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
                </div>
              </div>

              {/* Details */}
              <div className={styles.detailsSection}>
                <div className={styles.detailsHeader}>
                  <p className={styles.detailCategory}>{activeCardData.category}</p>
                  <h2 className={styles.detailTitle}>{activeCardData.title}</h2>
                  <p className={styles.detailDescription}>{activeCardData.description}</p>
                </div>

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
    </div>
  );
};

export default ExpandableCards;