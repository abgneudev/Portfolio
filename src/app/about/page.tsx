/* /app/about/page.tsx */

import Footer from '@/components/layout/Footer/Footer'
import { Container } from '@/components/layout/Grid'
import { Navigation } from '@/components/layout/Navigation'
import { AboutHero } from '@/components/about/AboutHero'
import styles from './about.module.css'

export default function About() {
  return (
    <>
      <Navigation />
      <AboutHero />
      <Container>
        <div className={styles.content}>
          <p>This is the about page.</p>
        </div>
      </Container>
      <Footer />
    </>
  )
}