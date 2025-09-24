/* /app/page.tsx */

import { Container } from '@/components/layout/Grid'
import { Navigation } from '@/components/layout/Navigation'

export default function Home() {
  return (
    <>
      <Navigation />
      <Container>
        <div style={{ paddingTop: '100px', minHeight: '200vh' }}>
        </div>
      </Container>
    </>
  )
}