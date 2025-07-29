import React, { useState } from 'react';
import styles from './CaseStudy.module.css';

interface CaseStudyProps {
  type?: 'embrace' | 'vino' | 'stopwatch';
}

const CaseStudy: React.FC<CaseStudyProps> = () => {
  const [activeAccordion, setActiveAccordion] = useState<string | null>(null);

  const toggleAccordion = (accordionId: string) => {
    setActiveAccordion(activeAccordion === accordionId ? null : accordionId);
  };

  return (
    <div className={styles.caseStudy}>

      {/* Hero Section */}
      <section className={styles.heroSection}>
        <div className={styles.container}>
          <div className={styles.heroContent}>
            <h1 className={styles.projectTitle}>STOPWATCH</h1>
            <p className={styles.heroDescription}>
              Designed to lighten your mental load.<br/>
              Just press play—the stopwatch blocks distractive apps, tracks progress, and keeps you motivated with positive reinforcement.
            </p>
            <div className={styles.tags}>
              <span className={styles.tag}>PRODUCT DESIGN</span>
              <span className={styles.tag}>UX RESEARCH</span>
              <span className={styles.tag}>CONCEPT</span>
              <span className={styles.tag}>SOLO</span>
              <span className={styles.tag}>FIGMA</span>
            </div>
          </div>
          <div className={styles.heroImageSection}>
            <div className={styles.heroImage}>
              <img 
                src="https://res.cloudinary.com/dbvfgfqqh/image/upload/v1753804136/Group_987_ue57nh.png" 
                alt="Productivity app interface"
              />
            </div>
            <h2 className={styles.heroTagline}>
              Start effortlessly.<br/>
              Block distractions.<br/>
              Boost productivity.
            </h2>
          </div>
        </div>
      </section>

      {/* Full Width Image */}
      <section className={styles.fullWidthSection}>
        <div className={styles.fullWidthImage}>
          <img 
            src="https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=1600&h=240&fit=crop" 
            alt="Workspace overview"
          />
        </div>
      </section>

      {/* Problem Section */}
      <section className={styles.problemSection}>
        <div className={styles.container}>
          <div className={styles.problemGrid}>
            <div className={styles.problemLeft}>
              <div className={styles.sectionHeader}>
                <span className={styles.sectionLabel}>PROBLEM</span>
                <span className={styles.divider}>|</span>
                <span className={styles.sectionLabelLight}>SOLUTION</span>
              </div>
              <h3 className={styles.problemTitle}>
                Distractions break flow. Deadlines. To-dos piling up.
              </h3>
              <p className={styles.problemDescription}>
                Multiple deadlines lead to stress. Manually organizing and planning tasks is hard. 
                Notifications and social media distractions interrupt constantly, adding to the stress.
              </p>

              <div className={styles.insightCard}>
                <div className={styles.insightHeader}>
                  <span className={styles.insightLabel}>RESEARCH INSIGHT</span>
                </div>
                <div className={styles.insightContent}>
                  <p>
                    On average, we <strong>lose 2 hours</strong> daily to distractions and spend another 
                    23 minutes regaining focus, <strong>doubling</strong> our chances of making errors.
                  </p>
                </div>
                <div className={styles.insightFooter}>
                  Source: Research Papers, Articles, Reports
                </div>
              </div>
                            
              <div className={styles.walkingFigure}>
                <img src="https://res.cloudinary.com/dbvfgfqqh/image/upload/v1753803827/binder_p72z2s.png" alt="Walking figure" />
              </div>
            </div>

            <div className={styles.problemRight}>
              <div className={styles.phoneWireframe}>
                <img 
                  src="https://res.cloudinary.com/dbvfgfqqh/image/upload/v1753802207/Solution_Frame_dxkohr.png" 
                  alt="Phone wireframe solution"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Sections */}
      <section className={styles.featureSection}>
        <div className={styles.container}>
          <div className={styles.featureGrid}>
            <div className={styles.featureImage}>
              <img 
                src="https://images.unsplash.com/photo-1531403009284-440f080d1e12?w=672&h=560&fit=crop" 
                alt="Getting started interface"
              />
            </div>
            <div className={styles.featureContent}>
              <span className={styles.featureLabel}>getting started</span>
              <h3 className={styles.featureTitle}>FASTER TASK INITIATION</h3>
              <p className={styles.featureDescription}>
                Designed to lighten your mental load.<br/>
                Just press play—the stopwatch blocks distractive apps, tracks progress, 
                and keeps you motivated with positive reinforcement.
              </p>
              <div className={styles.featureTags}>
                <div 
                  className={`${styles.researchTag} ${activeAccordion === 'getting-started-research' ? styles.active : ''}`}
                  onClick={() => toggleAccordion('getting-started-research')}
                >
                  <div className={styles.tagHeader}>
                    <span>RESEARCH INSIGHT</span>
                    <div className={styles.accordionArrow}>›</div>
                  </div>
                  {activeAccordion === 'getting-started-research' && (
                    <div className={styles.accordionContent}>
                      <div className={styles.imageSlider}>
                        <img src="https://images.unsplash.com/photo-1553877522-43269d4ea984?w=500&h=200&fit=crop" alt="Research insight 1" />
                      </div>
                      <p className={styles.accordionText}>
                        Users spend an average of 23 minutes refocusing after each distraction, 
                        leading to significant productivity loss throughout the day.
                      </p>
                    </div>
                  )}
                </div>
                <div 
                  className={`${styles.designTag} ${activeAccordion === 'getting-started-design' ? styles.active : ''}`}
                  onClick={() => toggleAccordion('getting-started-design')}
                >
                  <div className={styles.tagHeader}>
                    <span>DESIGN DECISIONS</span>
                    <div className={styles.accordionArrow}>›</div>
                  </div>
                  {activeAccordion === 'getting-started-design' && (
                    <div className={styles.accordionContent}>
                      <div className={styles.imageSlider}>
                        <img src="https://images.unsplash.com/photo-1559028012-481c04fa702d?w=500&h=200&fit=crop" alt="Design decision 1" />
                      </div>
                      <p className={styles.accordionText}>
                        One-tap start functionality reduces cognitive load and eliminates 
                        decision fatigue when beginning focused work sessions.
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.featureSection}>
        <div className={styles.container}>
          <div className={styles.featureGridReverse}>
            <div className={styles.featureImage}>
              <img 
                src="https://images.unsplash.com/photo-1551434678-e076c223a692?w=672&h=560&fit=crop" 
                alt="Progress tracking interface"
              />
            </div>
            <div className={styles.featureContent}>
              <span className={styles.featureLabel}>Making Progress</span>
              <h3 className={styles.featureTitle}>EASIER TRACKING</h3>
              <p className={styles.featureDescription}>
                Designed to lighten your mental load.<br/>
                Just press play—the stopwatch blocks distractive apps, tracks progress, 
                and keeps you motivated with positive reinforcement.
              </p>
              <div className={styles.featureTags}>
                <div 
                  className={`${styles.researchTag} ${activeAccordion === 'progress-research' ? styles.active : ''}`}
                  onClick={() => toggleAccordion('progress-research')}
                >
                  <div className={styles.tagHeader}>
                    <span>RESEARCH INSIGHT</span>
                    <div className={styles.accordionArrow}>›</div>
                  </div>
                  {activeAccordion === 'progress-research' && (
                    <div className={styles.accordionContent}>
                      <div className={styles.imageSlider}>
                        <img src="https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=500&h=200&fit=crop" alt="Research insight 2" />
                      </div>
                      <p className={styles.accordionText}>
                        Visual progress indicators increase task completion rates by 32% 
                        and boost user motivation throughout work sessions.
                      </p>
                    </div>
                  )}
                </div>
                <div 
                  className={`${styles.designTag} ${activeAccordion === 'progress-design' ? styles.active : ''}`}
                  onClick={() => toggleAccordion('progress-design')}
                >
                  <div className={styles.tagHeader}>
                    <span>DESIGN DECISIONS</span>
                    <div className={styles.accordionArrow}>›</div>
                  </div>
                  {activeAccordion === 'progress-design' && (
                    <div className={styles.accordionContent}>
                      <div className={styles.imageSlider}>
                        <img src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=500&h=200&fit=crop" alt="Design decision 2" />
                      </div>
                      <p className={styles.accordionText}>
                        Real-time progress visualization with milestone markers helps users 
                        maintain focus and celebrate small wins throughout their session.
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.featureSection}>
        <div className={styles.container}>
          <div className={styles.featureGrid}>
            <div className={styles.featureImage}>
              <img 
                src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=672&h=560&fit=crop" 
                alt="Energy check interface"
              />
            </div>
            <div className={styles.featureContent}>
              <span className={styles.featureLabel}>energy check</span>
              <h3 className={styles.featureTitle}>IMPULSE DECAY & MIND BOOSTERS</h3>
              <p className={styles.featureDescription}>
                Designed to lighten your mental load.<br/>
                Just press play—the stopwatch blocks distractive apps, tracks progress, 
                and keeps you motivated with positive reinforcement.
              </p>
              <div className={styles.featureTags}>
                <div 
                  className={`${styles.researchTag} ${activeAccordion === 'energy-research' ? styles.active : ''}`}
                  onClick={() => toggleAccordion('energy-research')}
                >
                  <div className={styles.tagHeader}>
                    <span>RESEARCH INSIGHT</span>
                    <div className={styles.accordionArrow}>›</div>
                  </div>
                  {activeAccordion === 'energy-research' && (
                    <div className={styles.accordionContent}>
                      <div className={styles.imageSlider}>
                        <img src="https://images.unsplash.com/photo-1506784983877-45594efa4cbe?w=500&h=200&fit=crop" alt="Research insight 3" />
                      </div>
                      <p className={styles.accordionText}>
                        Energy levels fluctuate in 90-minute cycles. Strategic breaks 
                        aligned with these ultradian rhythms improve sustained performance.
                      </p>
                    </div>
                  )}
                </div>
                <div 
                  className={`${styles.designTag} ${activeAccordion === 'energy-design' ? styles.active : ''}`}
                  onClick={() => toggleAccordion('energy-design')}
                >
                  <div className={styles.tagHeader}>
                    <span>DESIGN DECISIONS</span>
                    <div className={styles.accordionArrow}>›</div>
                  </div>
                  {activeAccordion === 'energy-design' && (
                    <div className={styles.accordionContent}>
                      <div className={styles.imageSlider}>
                        <img src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=500&h=200&fit=crop" alt="Design decision 3" />
                      </div>
                      <p className={styles.accordionText}>
                        Smart break reminders with energizing micro-activities help users 
                        maintain peak performance throughout extended work sessions.
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.featureSection}>
        <div className={styles.container}>
          <div className={styles.featureGridReverse}>
            <div className={styles.featureImage}>
              <img 
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=672&h=560&fit=crop" 
                alt="Rewards interface"
              />
            </div>
            <div className={styles.featureContent}>
              <span className={styles.featureLabel}>wrapping up</span>
              <h3 className={styles.featureTitle}>REWARDS FOR WORK DONE</h3>
              <p className={styles.featureDescription}>
                Designed to lighten your mental load.<br/>
                Just press play—the stopwatch blocks distractive apps, tracks progress, 
                and keeps you motivated with positive reinforcement.
              </p>
              <div className={styles.featureTags}>
                <div 
                  className={`${styles.researchTag} ${activeAccordion === 'rewards-research' ? styles.active : ''}`}
                  onClick={() => toggleAccordion('rewards-research')}
                >
                  <div className={styles.tagHeader}>
                    <span>RESEARCH INSIGHT</span>
                    <div className={styles.accordionArrow}>›</div>
                  </div>
                  {activeAccordion === 'rewards-research' && (
                    <div className={styles.accordionContent}>
                      <div className={styles.imageSlider}>
                        <img src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=500&h=200&fit=crop" alt="Research insight 4" />
                      </div>
                      <p className={styles.accordionText}>
                        Immediate positive reinforcement increases habit formation by 
                        40% and creates lasting behavioral change in productivity patterns.
                      </p>
                    </div>
                  )}
                </div>
                <div 
                  className={`${styles.designTag} ${activeAccordion === 'rewards-design' ? styles.active : ''}`}
                  onClick={() => toggleAccordion('rewards-design')}
                >
                  <div className={styles.tagHeader}>
                    <span>DESIGN DECISIONS</span>
                    <div className={styles.accordionArrow}>›</div>
                  </div>
                  {activeAccordion === 'rewards-design' && (
                    <div className={styles.accordionContent}>
                      <div className={styles.imageSlider}>
                        <img src="https://images.unsplash.com/photo-1552664730-d307ca884978?w=500&h=200&fit=crop" alt="Design decision 4" />
                      </div>
                      <p className={styles.accordionText}>
                        Celebration animations and achievement tracking create positive 
                        associations with task completion, reinforcing productive behaviors.
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CaseStudy;