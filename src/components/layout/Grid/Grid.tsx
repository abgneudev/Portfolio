/* /app/components/layout/Grid/Grid.tsx */

import styles from './Grid.module.css'
import { ReactNode } from 'react'

interface GridProps {
  children: ReactNode
  className?: string
}

interface GridItemProps {
  children: ReactNode
  className?: string
  span?: number
  smSpan?: number
  mdSpan?: number
  lgSpan?: number
  xlSpan?: number
}

export function Container({ children, className = '' }: GridProps) {
  return (
    <div className={`${styles.container} ${className}`}>
      {children}
    </div>
  )
}

export function Grid({ children, className = '' }: GridProps) {
  return (
    <div className={`${styles.grid} ${className}`}>
      {children}
    </div>
  )
}

export function GridItem({ 
  children, 
  className = '',
  span = 4,
  smSpan,
  mdSpan,
  lgSpan,
  xlSpan
}: GridItemProps) {
  const classes = [
    styles[`span${span}`],
    smSpan && styles[`sm-span${smSpan}`],
    mdSpan && styles[`md-span${mdSpan}`],
    lgSpan && styles[`lg-span${lgSpan}`],
    xlSpan && styles[`xl-span${xlSpan}`],
    className
  ].filter(Boolean).join(' ')

  return (
    <div className={classes}>
      {children}
    </div>
  )
}