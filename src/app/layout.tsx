/*import './styles/reset.css'
import './styles/tokens.css'
import './styles/typography.css'
import './styles/colors.css'
import './globals.css'
import { openSans, robotoMono } from './fonts'layout.tsx */

import './styles/reset.css'
import './styles/tokens.css'
import './styles/typography.css'
import './styles/colors.css'
import './globals.css'
import { openSans, robotoMono } from './fonts'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${openSans.variable} ${robotoMono.variable}`}>
      <body suppressHydrationWarning>{children}</body>
    </html>
  )
}