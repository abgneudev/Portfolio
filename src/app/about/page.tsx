/* /app/about/page.tsx */

import Footer from '@/components/layout/Footer/Footer'
import { Container } from '@/components/layout/Grid'
import { Navigation } from '@/components/layout/Navigation'
import { AboutHero } from '@/components/about/AboutHero'
import WorkShowcase from '@/components/about/WorkShowcase'
import styles from './about.module.css'

export default function About() {
  return (
    <>
      <Navigation />
      <AboutHero />
      <WorkShowcase />
      <Footer />
    </>
  )
}