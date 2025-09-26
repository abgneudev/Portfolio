import styles from './HomeHero.module.css'
import { Container } from '../layout/Grid/Grid'

export default function HomeHero() {
  return (
    <section className={styles.heroSection}>
      <Container>
        <div className={styles.heroGrid}>
          {/* Main heading - takes up left side on desktop */}
          <div className={styles.headingColumn}>
            <h1 className={styles.heroHeading}>
              I help engineering teams achieve pixel-perfect products without sacrificing speed or quality to handoff
            </h1>
          </div>

          {/* Right content - professional info */}
          <div className={styles.infoColumn}>
            <div className={styles.currentRole}>
              <p className={styles.roleText}>
                Currently a Product Designer and Frontend engineer at
              </p>
              <p className={styles.company}>
                <a href="https://innovationlabs.harvard.edu/venture/embrace" target="_blank" rel="noopener noreferrer" className={styles.companyLink}>
                  iEmbrace
                </a>
                , Harvard Innovation Labs
              </p>
              <p className={styles.description}>
                revolutionizing meditation by integrating AI and multi-sensory experiences
              </p>
            </div>
            
            <a 
              href="/resume.pdf" 
              className={styles.resumeButton}
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className={styles.resumeText}>VIEW RESUME</span>
              <svg 
                className={styles.downloadIcon} 
                width="20" 
                height="20" 
                viewBox="0 0 20 20" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg"
              >
                <path 
                  d="M4 12L16 12M13 9L16 12L13 15" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                />
              </svg>
            </a>
          </div>
        </div>
      </Container>
    </section>
  )
}