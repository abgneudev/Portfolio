import styles from './ExperiencePage.module.css';
import { useState, useEffect, useRef } from 'react';

const ExperiencePage = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeIndex, setActiveIndex] = useState(0);
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const timelineRef = useRef<HTMLDivElement | null>(null);
  const timelineItemRefs = useRef<(HTMLDivElement | null)[]>([]);

  const timelineData = [
    {
      year: '2025-Present',
      title: 'Product Designer & Frontend Engineer',
      subtitle: 'iEmbrace LLC, Harvard Innovation Labs',
      content: {
        description:
          'Leading design and development for AI-powered wellness platform at Harvard Innovation Labs, creating WCAG-compliant, responsive digital experiences through design systems and pattern libraries.',
        achievements: [
          'Achieved 100/100 WCAG audit score, elevating accessibility and usability for all users',
          'Reduced design-to-code handoff time by converting 8 UI frames into 9 React components',
          'Amplified engagement through CSS animations and synchronized multi-sensory microinteractions',
          'Synthesized feedback from 17 beta testers to improve information architecture and UX writing',
          'Conducted competitive analysis of 5 wellness apps to inform design decisions',
        ],
        metrics: {
          primary: { value: '100/100', label: 'Accessibility Score' },
          secondary: { value: '17', label: 'Beta Testers' },
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
      year: '2024',
      title: 'Web Design & UX Engineering Assistant',
      subtitle: 'Northeastern University, College of Engineering',
      content: {
        description:
          'Course assistant establishing design standards and advocating for design systems, helping 37 students implement scalable design patterns and achieve inclusive, user-centered experiences.',
        achievements: [
          'Prepared design specifications and wireframes for 17 assignments with HCD principles',
          'Conducted design reviews on 500+ interfaces for WCAG AA compliance',
          'Achieved 95% student success rate in creating inclusive, user-centered experiences',
          'Guided implementation of CSS Grid/Flexbox layouts and design tokens',
          'Delivered workshops on CSS animations, micro-interactions, and dynamic form validation',
        ],
        metrics: {
          primary: { value: '500+', label: 'Interfaces Reviewed' },
          secondary: { value: '95%', label: 'Student Success Rate' },
        },
        images: [
          {
            src: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=500&h=300&fit=crop',
            alt: 'Design workshops',
          },
          {
            src: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=500&h=300&fit=crop',
            alt: 'Student mentoring',
          },
          {
            src: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=500&h=300&fit=crop',
            alt: 'Design reviews',
          },
          {
            src: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=500&h=300&fit=crop',
            alt: 'Teaching design systems',
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
          'Led requirements gathering for 41 Azure cloud projects worth ~$30M',
          'Consolidated 28 filters into 19 categories in financial management system',
          'Automated visualization workflows, saving 5 hours weekly per manager',
          'Managed cross-functional collaboration across 3 concurrent projects',
          'Designed test scenarios for 50+ user interaction patterns',
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
      year: '2020-2023',
      title: 'UX/UI Designer',
      subtitle: 'Freelance & Community Impact',
      content: {
        description:
          'Delivered impactful design solutions across various industries, from AI consultancy websites to hackathon platforms, while driving design excellence through community leadership.',
        achievements: [
          'AWS Women in AI Hackathon Impact Award Winner (2025)',
          'Designed landing page driving 100+ registrations for Bentley x IxDF hackathon',
          'Increased AI consultancy service inquiries by 35% through strategic redesign',
          'Identified 19 critical UX issues in crypto marketplace heuristic evaluation',
          'Created 3 modular website templates cutting development time by 1 week',
          'Built AI learning assistant using LLM + RAG architecture (CourseGPT)',
        ],
        metrics: {
          primary: { value: '35%', label: 'Inquiry Increase' },
          secondary: { value: '100+', label: 'Registrations' },
        },
        images: [
          {
            src: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=500&h=300&fit=crop',
            alt: 'Hackathon victory',
          },
          {
            src: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=500&h=300&fit=crop',
            alt: 'Design consulting',
          },
          {
            src: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=500&h=300&fit=crop',
            alt: 'Client projects',
          },
          {
            src: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=500&h=300&fit=crop',
            alt: 'Web design',
          },
        ],
      },
    },
    {
      year: '2019-2021',
      title: 'Graphic Designer',
      subtitle: 'AIESEC, Manipal',
      content: {
        description:
          'Led creative direction for India\'s largest youth organization, scaling design impact from local committees to national campaigns reaching millions of children through UNICEF initiatives.',
        achievements: [
          'Scaled design system for UNICEF campaign reaching 8 million children',
          'Led 9-member team to develop social media design system with reusable templates',
          'Designed 10+ strategic proposals securing partnerships with Fortune 500 companies',
          'Mentored 120+ committee members on visual design and creative problem-solving',
          'Enabled 20+ entities to create content for World\'s Largest Lesson campaign',
          'Supported programs impacting 20,000+ youth annually',
        ],
        metrics: {
          primary: { value: '8M', label: 'Children Reached' },
          secondary: { value: '120+', label: 'Members Mentored' },
        },
        images: [
          {
            src: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=500&h=300&fit=crop',
            alt: 'UNICEF campaign',
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
            alt: 'Team collaboration',
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
        const timelineTop = timelineRect.top;
        const totalHeight = timelineRect.height;
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
    handleScroll();
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className={styles.experienceSection}>
      {/* Header Section */}
      <div className={styles.headerSection}>
        <div className={styles.headerContainer}>
          <div className={styles.headerContent}>
            <h2 className={styles.sectionTitle}>Experience Timeline</h2>
            <p className={styles.sectionDescription}>
              Four years of transforming complex problems into elegant, 
              accessible solutions that drive measurable business impact.
            </p>
            <a
              href="/resume.pdf"
              className={styles.resumeButton}
              target="_blank"
              rel="noopener noreferrer"
            >
              <span>Download Resume</span>
              <svg 
                className={styles.downloadIcon} 
                width="16" 
                height="16" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2"
                strokeLinecap="round" 
                strokeLinejoin="round"
              >
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                <polyline points="7 10 12 15 17 10"/>
                <line x1="12" y1="15" x2="12" y2="3"/>
              </svg>
            </a>
          </div>
        </div>
      </div>

      {/* Timeline Section */}
      <section ref={sectionRef} className={styles.timelineSection}>
        <div className={styles.timelineContainer}>
          {/* Left Panel - Timeline Items */}
          <div className={styles.leftPanel}>
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
                      <span className={styles.timelineYear}>{item.year}</span>
                      <h3 className={styles.timelineTitle}>{item.title}</h3>
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
                        <h4 className={styles.achievementsTitle}>Key Achievements</h4>
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

          {/* Right Panel - Sticky Year Display */}
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
      </section>
    </div>
  );
};

export default ExperiencePage;