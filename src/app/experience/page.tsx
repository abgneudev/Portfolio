/* /app/experience/page.tsx */

import Footer from '@/components/layout/Footer/Footer'
import { Container } from '@/components/layout/Grid'
import { Navigation } from '@/components/layout/Navigation'

export default function Experience() {
  return (
    <>
      <Navigation />
      <Container>
        <div style={{ paddingTop: '100px', minHeight: '200vh' }}>
          <h1>Experience</h1>
          <p>This is the experience page.</p>
        </div>
      </Container>
      <Footer />
    </>
  )
}