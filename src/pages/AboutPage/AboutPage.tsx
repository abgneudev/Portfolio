import { useState, useEffect, useRef } from 'react';
import styles from './AboutPage.module.css';

const About = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isInView, setIsInView] = useState(false);
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const timelineRef = useRef<HTMLDivElement | null>(null);
  const timelineItemRefs = useRef<Array<HTMLElement | null>>([]);

  const timelineData = [
    {
      year: "2024",
      title: "Senior Full Stack Developer",
      content: {
        description: "Led development of enterprise web applications using React, Node.js, and cloud technologies. Mentored junior developers and implemented best practices for code quality and performance.",
        achievements: [
          "Architected and deployed 5 major applications",
          "Improved application performance by 40%",
          "Led a team of 4 developers",
          "Implemented CI/CD pipelines"
        ],
        images: [
          { src: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=500&h=300&fit=crop", alt: "Code on computer screen" },
          { src: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=500&h=300&fit=crop", alt: "Team collaboration" },
          { src: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=500&h=300&fit=crop", alt: "Data visualization" },
          { src: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=500&h=300&fit=crop", alt: "Web development setup" }
        ]
      }
    },
    {
      year: "2022-2023",
      title: "Frontend Developer & UI/UX Designer",
      content: {
        description: "Specialized in creating beautiful, accessible user interfaces with modern frameworks. Collaborated closely with design teams to bring innovative concepts to life.",
        achievements: [
          "Designed and developed 15+ responsive websites",
          "Improved user engagement by 60%",
          "Created comprehensive design system",
          "Implemented accessibility standards (WCAG 2.1)"
        ],
        images: [
          { src: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=500&h=300&fit=crop", alt: "UI design mockups" },
          { src: "https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?w=500&h=300&fit=crop", alt: "Design tools and sketches" },
          { src: "https://images.unsplash.com/photo-1559028006-448665bd7c7f?w=500&h=300&fit=crop", alt: "Mobile app design" },
          { src: "https://images.unsplash.com/photo-1512486130939-2c4f79935e4f?w=500&h=300&fit=crop", alt: "Creative workspace" }
        ]
      }
    },
    {
      year: "Current Projects",
      title: "Open Source & Learning",
      content: {
        description: "Actively contributing to open source projects and staying current with emerging technologies in web development.",
        achievements: [
          "Contributing to React ecosystem projects",
          "Building developer tools and libraries",
          "Writing technical blog posts",
          "Mentoring through coding bootcamps",
          "Exploring AI/ML integration in web apps"
        ],
        images: [
          { src: "https://images.unsplash.com/photo-1618477247222-acbdb0e159b3?w=500&h=300&fit=crop", alt: "Open source code" },
          { src: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=500&h=300&fit=crop", alt: "Learning and collaboration" },
          { src: "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=500&h=300&fit=crop", alt: "Tech conference" },
          { src: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=500&h=300&fit=crop", alt: "Modern development tools" }
        ]
      }
    }
  ];

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current || !timelineRef.current) return;

      const sectionRect = sectionRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      // Check if section is in view
      const sectionInView = sectionRect.top < windowHeight && sectionRect.bottom > 0;
      setIsInView(sectionInView);

      if (sectionInView) {
        // Calculate timeline progress
        const timelineRect = timelineRef.current.getBoundingClientRect();
        const timelineStart = timelineRect.top + window.scrollY;
        const timelineHeight = timelineRect.height;
        const scrolled = window.scrollY + windowHeight / 2 - timelineStart;
        const progress = Math.max(0, Math.min(100, (scrolled / timelineHeight) * 100));
        setScrollProgress(progress);

        // Find which timeline item is most visible
        let newActiveIndex = 0;
        let maxVisibility = 0;

        timelineItemRefs.current.forEach((ref, index) => {
          if (ref) {
            const rect = ref.getBoundingClientRect();
            const itemCenter = rect.top + rect.height / 2;
            const windowCenter = windowHeight / 2;
            const distance = Math.abs(itemCenter - windowCenter);
            const visibility = Math.max(0, windowHeight - distance);
            
            if (visibility > maxVisibility) {
              maxVisibility = visibility;
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
    <div ref={sectionRef} className={styles.aboutSection}>
      <div className={styles.aboutContainer}>
        {/* Left side - Timeline items */}
        <div className={styles.leftPanel}>
          <header className={styles.aboutHeader}>
            <h1>About Me</h1>
            <p>My journey as a developer and the milestones that shaped my career</p>
          </header>
          
          <section className={styles.timeline} role="region" aria-label="Career timeline" ref={timelineRef}>
            <div className={styles.timelineLine} aria-hidden="true">
              <div 
                className={styles.timelineProgress} 
                style={{ height: `${scrollProgress}%` }}
              />
            </div>
            
            {timelineData.map((item, index) => (
              <article 
                key={index} 
                ref={el => { timelineItemRefs.current[index] = el; }}
                className={`${styles.timelineItem} ${activeIndex === index ? styles.active : ''}`}
              >
                <div className={styles.timelineMarker} aria-hidden="true">
                  <span className={styles.timelineDot}></span>
                </div>
                <div className={styles.timelineContent}>
                  <header className={styles.timelineHeader}>
                    <time className={styles.timelineYear}>{item.year}</time>
                    <h2 className={styles.timelineTitle}>{item.title}</h2>
                  </header>
                  <div className={styles.timelineBody}>
                    <p className={styles.timelineDescription}>{item.content.description}</p>
                    <section className={styles.achievements}>
                      <h3 className={styles.achievementsTitle}>Key Achievements</h3>
                      <ul className={styles.achievementsList}>
                        {item.content.achievements.map((achievement, idx) => (
                          <li key={idx} className={styles.achievementItem}>
                            <span className={styles.achievementIcon} aria-hidden="true">✓</span>
                            {achievement}
                          </li>
                        ))}
                      </ul>
                    </section>
                    <div className={styles.imageGrid} role="img" aria-label={`Gallery for ${item.title}`}>
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
        <div className={`${styles.rightPanel} ${isInView ? styles.sticky : ''}`}>
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
  );
};

export default About;