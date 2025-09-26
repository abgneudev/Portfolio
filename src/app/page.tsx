/* /app/page.tsx */

import Footer from '@/components/layout/Footer/Footer'
import { Navigation } from '@/components/layout/Navigation'
import { HomeHero } from '@/components/home'

export default function Home() {
  return (
    <>
      <Navigation />
      <HomeHero />
      <Footer />
    </>
  )
}