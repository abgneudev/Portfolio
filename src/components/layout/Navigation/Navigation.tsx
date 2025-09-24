'use client'

import React, { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import styles from './Navigation.module.css'
import { Container, Grid, GridItem } from '@/components/layout/Grid'

interface NavigationProps {
  currentPage?: 'home' | 'work' | 'experience' | 'about'
  onNavigate?: (page: string) => void
}

export function Navigation({ 
  currentPage = 'home', 
  onNavigate = () => {} 
}: NavigationProps) {
  const [isVisible, setIsVisible] = useState(false)
  const [isHidden, setIsHidden] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const lastScrollY = useRef(0)
  const ticking = useRef(false)

  useEffect(() => {
    const updateScrollDirection = () => {
      const scrollY = window.scrollY
      
      // Show navbar when at the very top
      if (scrollY < 10) {
        setIsVisible(false)
        setIsHidden(false)
      }
      // Hide when scrolling down
      else if (scrollY > lastScrollY.current && scrollY > 100) {
        setIsVisible(false)
        setIsHidden(true)
      }
      // Show when scrolling up
      else if (scrollY < lastScrollY.current) {
        setIsVisible(true)
        setIsHidden(false)
      }
      
      lastScrollY.current = scrollY
      ticking.current = false
    }

    const onScroll = () => {
      if (!ticking.current) {
        window.requestAnimationFrame(updateScrollDirection)
        ticking.current = true
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (typeof window !== 'undefined') {
      if (mobileMenuOpen) {
        document.body.style.overflow = 'hidden'
      } else {
        document.body.style.overflow = ''
      }
    }
  }, [mobileMenuOpen])

  return (
    <header 
      className={`${styles.header} ${isVisible ? styles.visible : ''} ${isHidden ? styles.hidden : ''}`}
    >
      <Container>
        <Grid>
          <GridItem span={2} smSpan={2} lgSpan={3}>
            <button 
              className={styles.logoButton}
              onClick={() => onNavigate('home')}
              aria-label="Go to homepage"
            >
              <Image
                src="https://res.cloudinary.com/dbvfgfqqh/image/upload/v1754659011/ab_logo_rbvao6.png"
                alt="Logo"
                className={styles.logoImage}
                width={120}
                height={120}
                priority
              />
            </button>
          </GridItem>
          
          <GridItem span={2} smSpan={6} lgSpan={9}>
            <div className={styles.navContent}>
              {/* Desktop Navigation */}
              <nav className={styles.desktopNav}>
                <button
                  className={`${styles.navLink} ${currentPage === 'work' ? styles.active : ''}`}
                  onClick={() => onNavigate('work')}
                >
                  Work
                </button>
                <button
                  className={`${styles.navLink} ${currentPage === 'experience' ? styles.active : ''}`}
                  onClick={() => onNavigate('experience')}
                >
                  Experience
                </button>
                <button
                  className={`${styles.navLink} ${currentPage === 'about' ? styles.active : ''}`}
                  onClick={() => onNavigate('about')}
                >
                  About
                </button>
                
                {/* Contact Button */}
                <div className={styles.contactButton} role="group" aria-label="Get in Touch">
                  <span className={styles.contactLabel}>Get in Touch</span>
                  <div className={styles.contactIcons}>
                    <a
                      href="mailto:gupta.abhinav0210@gmail.com"
                      className={styles.iconLink}
                      aria-label="Email"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" 
                          stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </a>
                    <a
                      href="https://github.com/abgneudev"
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.iconLink}
                      aria-label="GitHub"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.08 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.56-1.11-4.56-4.93 0-1.09.39-1.99 1.03-2.69-.1-.25-.45-1.27.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.37.2 2.39.1 2.64.64.7 1.03 1.6 1.03 2.69 0 3.83-2.34 4.68-4.57 4.93.36.31.68.92.68 1.85v2.74c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0012 2z"/>
                      </svg>
                    </a>
                    <a
                      href="https://www.instagram.com/abdesiigns/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.iconLink}
                      aria-label="Instagram"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" strokeWidth="2"/>
                        <circle cx="12" cy="12" r="3.5" stroke="currentColor" strokeWidth="2"/>
                        <circle cx="17.5" cy="6.5" r="1" fill="currentColor"/>
                      </svg>
                    </a>
                    <a
                      href="https://www.linkedin.com/in/abhinavgupta0210/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.iconLink}
                      aria-label="LinkedIn"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z" 
                          fill="currentColor"/>
                        <circle cx="4" cy="4" r="2" fill="currentColor"/>
                      </svg>
                    </a>
                  </div>
                </div>
              </nav>

                {/* Mobile Hamburger - only one instance, inside navContent */}
                <button
                  className={styles.hamburger}
                  aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
                  aria-expanded={mobileMenuOpen}
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                >
                  <span className={styles.hamburgerBox}>
                    <span className={styles.hamburgerInner}></span>
                  </span>
                </button>
            </div>
          </GridItem>
        </Grid>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className={styles.mobileNav}>
            <button
              className={`${styles.mobileLink} ${currentPage === 'work' ? styles.active : ''}`}
              onClick={() => { setMobileMenuOpen(false); onNavigate('work'); }}
            >
              Work
            </button>
            <button
              className={`${styles.mobileLink} ${currentPage === 'experience' ? styles.active : ''}`}
              onClick={() => { setMobileMenuOpen(false); onNavigate('experience'); }}
            >
              Experience
            </button>
            <button
              className={`${styles.mobileLink} ${currentPage === 'about' ? styles.active : ''}`}
              onClick={() => { setMobileMenuOpen(false); onNavigate('about'); }}
            >
              About
            </button>
            <div className={styles.mobileSocials}>
              <a
                href="mailto:gupta.abhinav0210@gmail.com"
                className={styles.mobileSocialIcon}
                aria-label="Email"
                onClick={() => setMobileMenuOpen(false)}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" 
                    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </a>
              <a
                href="https://github.com/abgneudev"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.mobileSocialIcon}
                aria-label="GitHub"
                onClick={() => setMobileMenuOpen(false)}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.08 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.56-1.11-4.56-4.93 0-1.09.39-1.99 1.03-2.69-.1-.25-.45-1.27.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.37.2 2.39.1 2.64.64.7 1.03 1.6 1.03 2.69 0 3.83-2.34 4.68-4.57 4.93.36.31.68.92.68 1.85v2.74c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0012 2z"/>
                </svg>
              </a>
              <a
                href="https://www.instagram.com/abdesiigns/"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.mobileSocialIcon}
                aria-label="Instagram"
                onClick={() => setMobileMenuOpen(false)}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" strokeWidth="2"/>
                  <circle cx="12" cy="12" r="3.5" stroke="currentColor" strokeWidth="2"/>
                  <circle cx="17.5" cy="6.5" r="1" fill="currentColor"/>
                </svg>
              </a>
              <a
                href="https://www.linkedin.com/in/abhinavgupta0210/"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.mobileSocialIcon}
                aria-label="LinkedIn"
                onClick={() => setMobileMenuOpen(false)}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z" 
                    fill="currentColor"/>
                  <circle cx="4" cy="4" r="2" fill="currentColor"/>
                </svg>
              </a>
            </div>
          </div>
        )}
      </Container>
    </header>
  )
}