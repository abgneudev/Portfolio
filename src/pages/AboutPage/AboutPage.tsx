import { useState, useEffect, useRef } from 'react';
import styles from './AboutPage.module.css';

const About = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeIndex, setActiveIndex] = useState(0);
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const timelineRef = useRef<HTMLDivElement | null>(null);
  const timelineItemRefs = useRef<(HTMLDivElement | null)[]>([]);

  const timelineData = [
    {
      year: '2025',
      title: 'Product Designer & Frontend Engineer',
      subtitle: 'iEmbrace, Harvard Innovation Labs',
      content: {
        description:
          'Leading design and development for AI-powered wellness platform, transforming user research into accessible, high-performing digital experiences that drive measurable business outcomes.',
        achievements: [
          'Achieved 100/100 WCAG audit score, expanding market reach to users with disabilities',
          'Reduced design-to-code handoff time by 40% through React component system',
          'Increased user engagement through multi-sensory microinteractions',
          'Synthesized feedback from 17 beta testers to optimize information architecture',
        ],
        metrics: {
          primary: { value: '100%', label: 'Accessibility Score' },
          secondary: { value: '40%', label: 'Faster Handoff' },
        },
        images: [
          {
            src: 'https://images.unsplash.com/photo-1517292987719-0369a794ec0f?w=500&h=300&fit=crop',
            alt: 'Accessible design system',
          },
          {
            src: 'https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=500&h=300&fit=crop',
            alt: 'Component architecture',
          },
          {
            src: 'https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?w=500&h=300&fit=crop',
            alt: 'User research synthesis',
          },
          {
            src: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=500&h=300&fit=crop',
            alt: 'Team collaboration',
          },
        ],
      },
    },
    {
      year: '2021-2023',
      title: 'UX Designer & Engineer',
      subtitle: 'Wipro Ltd. (UBS Client)',
      content: {
        description:
          'Transformed enterprise financial systems serving 5,000+ wealth managers at UBS, streamlining complex workflows and reducing operational inefficiencies through data-driven design decisions.',
        achievements: [
          'Reduced average search time by 2 minutes for 5,000 wealth managers',
          'Led requirements gathering for $30M Azure cloud development projects',
          'Automated visualization workflows, saving 5 hours weekly per manager',
          'Managed cross-functional teams across 3 concurrent enterprise projects',
        ],
        metrics: {
          primary: { value: '$30M', label: 'Project Value' },
          secondary: { value: '5,000', label: 'Users Impacted' },
        },
        images: [
          {
            src: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=500&h=300&fit=crop',
            alt: 'Financial dashboards',
          },
          {
            src: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=500&h=300&fit=crop',
            alt: 'Data visualization',
          },
          {
            src: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=500&h=300&fit=crop',
            alt: 'Enterprise UX',
          },
          {
            src: 'https://images.unsplash.com/photo-1553877522-43269d4ea984?w=500&h=300&fit=crop',
            alt: 'Agile workflow',
          },
        ],
      },
    },
    {
      year: '2019-Present',
      title: 'Design Leadership & Innovation',
      subtitle: 'Freelance & Community Impact',
      content: {
        description:
          'Driving design excellence through education, hackathons, and strategic consulting. From winning AWS competitions to scaling UNICEF initiatives reaching 8 million children.',
        achievements: [
          'AWS Women in AI Hackathon Impact Award Winner (2025)',
          'Scaled design system for UNICEF campaign reaching 8M children',
          'Mentored 120+ designers on visual design and problem-solving',
          'Increased client inquiries by 35% through strategic redesigns',
          'Built AI learning assistant using LLM + RAG architecture',
        ],
        metrics: {
          primary: { value: '8M', label: 'Lives Impacted' },
          secondary: { value: '120+', label: 'Designers Mentored' },
        },
        images: [
          {
            src: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=500&h=300&fit=crop',
            alt: 'Hackathon victory',
          },
          {
            src: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=500&h=300&fit=crop',
            alt: 'Design workshops',
          },
          {
            src: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=500&h=300&fit=crop',
            alt: 'Leadership summit',
          },
          {
            src: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=500&h=300&fit=crop',
            alt: 'Community impact',
          },
        ],
      },
    },
  ];

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current || !timelineRef.current) return;

      const sectionRect = sectionRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // Check if section is in view
      const sectionInView = sectionRect.top < windowHeight && sectionRect.bottom > 0;
      if (sectionInView) {
        // Calculate timeline progress based on viewport center
        const timelineRect = timelineRef.current.getBoundingClientRect();
        const viewportCenter = windowHeight / 2;
        
        // Calculate how far the viewport center has traveled through the timeline
        const timelineTop = timelineRect.top;
        const totalHeight = timelineRect.height;
        
        // Progress is 0% when viewport center is at timeline top
        // Progress is 100% when viewport center is at timeline bottom
        const progressPixels = viewportCenter - timelineTop;
        const progress = Math.max(0, Math.min(100, (progressPixels / totalHeight) * 100));
        setScrollProgress(progress);

        // Find which timeline item is most visible
        let newActiveIndex = 0;
        let minDistance = Infinity;

        timelineItemRefs.current.forEach((ref, index) => {
          if (ref) {
            const rect = ref.getBoundingClientRect();
            const itemCenter = rect.top + rect.height / 2;
            const distance = Math.abs(itemCenter - viewportCenter);

            if (distance < minDistance) {
              minDistance = distance;
              newActiveIndex = index;
            }
          }
        });

        setActiveIndex(newActiveIndex);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check initial position

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <>
      <div ref={sectionRef} className={styles.aboutSection}>
        <div className={styles.aboutContainer}>
          {/* Left side - Timeline items */}
          <div className={styles.leftPanel}>
            <header className={styles.aboutHeader}>
              <h1>About Me</h1>
              <p>
                Product designer with 4 years of experience transforming complex problems into elegant, 
                accessible solutions that drive measurable business impact.
              </p>
            </header>

            <section
              className={styles.timeline}
              role="region"
              aria-label="Career timeline"
              ref={timelineRef}
            >
              <div className={styles.timelineLine} aria-hidden="true">
                <div
                  className={styles.timelineProgress}
                  style={{ height: `${scrollProgress}%` }}
                />
              </div>

              {timelineData.map((item, index) => (
                <article
                  key={index}
                  ref={el => {
                    timelineItemRefs.current[index] = el as HTMLDivElement | null;
                  }}
                  className={`${styles.timelineItem} ${activeIndex === index ? styles.active : ''}`}
                >
                  <div className={styles.timelineMarker} aria-hidden="true">
                    <span className={styles.timelineDot}></span>
                  </div>
                  <div className={styles.timelineContent}>
                    <header className={styles.timelineHeader}>
                      <h2 className={styles.timelineTitle}>{item.title}</h2>
                      <p className={styles.timelineSubtitle}>{item.subtitle}</p>
                    </header>
                    <div className={styles.timelineBody}>
                      <p className={styles.timelineDescription}>{item.content.description}</p>
                      {item.content.metrics && (
                        <div className={styles.metricsRow}>
                          <div className={styles.metric}>
                            <span className={styles.metricValue}>{item.content.metrics.primary.value}</span>
                            <span className={styles.metricLabel}>{item.content.metrics.primary.label}</span>
                          </div>
                          <div className={styles.metric}>
                            <span className={styles.metricValue}>{item.content.metrics.secondary.value}</span>
                            <span className={styles.metricLabel}>{item.content.metrics.secondary.label}</span>
                          </div>
                        </div>
                      )}
                      <section className={styles.achievements}>
                        <h3 className={styles.achievementsTitle}>Key Achievements</h3>
                        <ul className={styles.achievementsList}>
                          {item.content.achievements.map((achievement, idx) => (
                            <li key={idx} className={styles.achievementItem}>
                              <span className={styles.achievementIcon} aria-hidden="true">
                                ✓
                              </span>
                              {achievement}
                            </li>
                          ))}
                        </ul>
                      </section>
                      <div
                        className={styles.imageGrid}
                        role="img"
                        aria-label={`Gallery for ${item.title}`}
                      >
                        {item.content.images.map((image, idx) => (
                          <img
                            key={idx}
                            src={image.src}
                            alt={image.alt}
                            className={styles.timelineImage}
                            loading="lazy"
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </section>
          </div>
          {/* Right side - Sticky year display */}
          <div className={styles.rightPanel}>
            <div className={styles.yearDisplay}>
              <div className={styles.yearWrapper}>
                <span className={styles.yearText}>
                  {timelineData[activeIndex]?.year}
                </span>
                <span className={styles.yearSubtext}>
                  {timelineData[activeIndex]?.title}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default About;