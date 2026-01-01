"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import styles from "./page.module.css";
import AboutShowcase from "@/components/AboutShowcase";

const LinkedInIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
);

const GitHubIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
  </svg>
);

const InstagramIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
  </svg>
);

const EmailIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
  </svg>
);

const LocationIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
  </svg>
);

export default function About() {
  const [isPlaying, setIsPlaying] = useState(false);

  const playPronunciation = () => {
    if (isPlaying) return;
    if (typeof window === "undefined" || !window.speechSynthesis) return;

    // Cancel any ongoing speech
    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance("Abhinav");
    utterance.rate = 0.8;
    utterance.pitch = 1;

    utterance.onstart = () => setIsPlaying(true);
    utterance.onend = () => setIsPlaying(false);
    utterance.onerror = () => setIsPlaying(false);

    setIsPlaying(true);
    window.speechSynthesis.speak(utterance);
  };

  return (
    <main id="main-content" className={styles.aboutPage}>
      {/* Left Pane - Fixed with image and footer text */}
      <aside className={styles.leftPane}>
        {/* Back button */}
        <Link href="/" className={styles.backLink}>
          <span aria-hidden="true">←</span> Home
        </Link>

        {/* Profile image - tall rectangle */}
        <div className={styles.imageWrapper}>
          <Image
            src="https://res.cloudinary.com/dbvfgfqqh/image/upload/v1766970599/portfoliopic_ag6pi0.png"
            alt="Abhinav Gupta"
            width={280}
            height={373}
            className={styles.profileImage}
            priority
          />
        </div>

        {/* Name and title below image */}
        <div className={styles.identity}>
          <div className={styles.nameRow}>
            <h1 className={styles.name}>Abhinav Gupta</h1>
            <button
              type="button"
              className={`${styles.pronunciationBtn} ${isPlaying ? styles.playing : ""}`}
              onClick={playPronunciation}
              aria-label="Listen to pronunciation: uh-bhee-nuhv"
              tabIndex={0}
            >
              <svg
                className={styles.speakerIcon}
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
                <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path>
              </svg>
              <span className={styles.pronunciationTooltip}>/uh-bhee-nuhv/</span>
            </button>
            <button
              type="button"
              className={styles.meaningBtn}
              aria-label="Name meaning"
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path>
                <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path>
              </svg>
              <span className={styles.meaningTooltip}>
                <strong>Abhinav</strong> — &quot;Novel&quot; or &quot;Innovative&quot; in Sanskrit
              </span>
            </button>
          </div>
          <p className={styles.title}>Product Design Engineer</p>
          <nav className={styles.socialLinks} aria-label="Social links">
            <div className={styles.socialIconWrapper}>
              <a
                href="https://www.linkedin.com/in/abhinavgupta0210/"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.socialIcon}
                aria-label="LinkedIn"
              >
                <LinkedInIcon />
              </a>
              <div className={styles.socialTooltip}>
                <span>LinkedIn</span>
              </div>
            </div>
            <div className={styles.socialIconWrapper}>
              <a
                href="https://github.com/abgneudev"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.socialIcon}
                aria-label="GitHub"
              >
                <GitHubIcon />
              </a>
              <div className={styles.socialTooltip}>
                <span>GitHub</span>
              </div>
            </div>
            <div className={styles.socialIconWrapper}>
              <a
                href="https://www.instagram.com/abdesiigns"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.socialIcon}
                aria-label="Instagram"
              >
                <InstagramIcon />
              </a>
              <div className={styles.socialTooltip}>
                <span>Instagram</span>
              </div>
            </div>
            <div className={styles.socialIconWrapper}>
              <a
                href="mailto:gupta.abhinav0210@gmail.com"
                className={styles.socialIcon}
                aria-label="Email"
              >
                <EmailIcon />
              </a>
              <div className={styles.socialTooltip}>
                <span>Email</span>
              </div>
            </div>
          </nav>
        </div>

        {/* Location at bottom left */}
        <footer className={styles.leftPaneFooter}>
          <p className={styles.location}>
            <LocationIcon />
            <span>Boston (EST/EDT)</span>
          </p>
        </footer>
      </aside>

      {/* Right Pane - Scrollable content */}
      <div className={styles.rightPane}>
        <div className={styles.rightContent}>
          {/* About section */}
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>About</h2>
            <div className={styles.sectionContent}>
              <p>
                I excel at blending design thinking with engineering to create products that are not only visually engaging but also functionally robust.
              </p>
              <p>
                Three years across enterprise financial systems, startups at Harvard Innovation Labs, and global nonprofit campaigns taught me that context is everything. Great design isn&apos;t just about aesthetics but also solving business problems with technical precision.
              </p>
              <p>
                Like wind, my process is defined by adaptability. It is shaped by the environment it touches, navigating technical constraints to find the most direct path from idea to execution.
              </p>
              <p>
                My approach is simple: Research deeply. Remove friction. Ship solutions.
              </p>
              <p>
                As a Product Design Engineer, I treat code as a design tool, eliminating handoffs and translation gaps to ensure that the final product is accessible, scalable, and exactly as intended.
              </p>
            </div>
          </section>

          {/* Experience section */}
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>Experience</h2>
            <ul className={styles.list}>
              <li className={styles.listItem}>
                <a
                  href="https://innovationlabs.harvard.edu/venture/embrace"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.experienceLink}
                >
                  <span className={styles.experienceText}>iEmbrace LLC, Harvard Innovation Labs <span className={styles.role}>— Frontend Engineer Intern</span></span>
                  <span className={styles.experiencePreview}>
                    <Image
                      src="https://res.cloudinary.com/dbvfgfqqh/image/upload/v1767240365/iembrace_lmb7nn.png"
                      alt="iEmbrace website preview"
                      width={200}
                      height={120}
                      className={styles.previewImage}
                    />
                  </span>
                  <span className={styles.duration}>4 months</span>
                </a>
              </li>
              <li className={styles.listItem}>
                <a
                  href="https://www.northeastern.edu/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.experienceLink}
                >
                  <span className={styles.experienceText}>Northeastern University <span className={styles.role}>— Graduate Assistant, Web Design & UX</span></span>
                  <span className={styles.experiencePreview}>
                    <Image
                      src="https://res.cloudinary.com/dbvfgfqqh/image/upload/v1767240365/northeastern_kqv8uc.png"
                      alt="Northeastern University website preview"
                      width={200}
                      height={120}
                      className={styles.previewImage}
                    />
                  </span>
                  <span className={styles.duration}>6 months</span>
                </a>
              </li>
              <li className={styles.listItem}>
                <a
                  href="https://www.wipro.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.experienceLink}
                >
                  <span className={styles.experienceText}>Wipro Ltd. <span className={styles.role}>— User Experience Engineer</span></span>
                  <span className={styles.experiencePreview}>
                    <Image
                      src="https://res.cloudinary.com/dbvfgfqqh/image/upload/v1767240365/wipro_u5ufq8.png"
                      alt="Wipro website preview"
                      width={200}
                      height={120}
                      className={styles.previewImage}
                    />
                  </span>
                  <span className={styles.duration}>2 years</span>
                </a>
              </li>
              <li className={styles.listItem}>
                <span className={styles.experienceText}>Freelance <span className={styles.role}>— UX/UI Designer</span></span>
                <span className={styles.duration}>~3 years</span>
              </li>
            </ul>
          </section>

          {/* Personal Showcase */}
          <AboutShowcase />

          {/* Page Footer */}
          <footer className={styles.pageFooter}>
            <p className={styles.copyright}>
              &copy; {new Date().getFullYear()} Abhinav Gupta. All rights reserved.
            </p>
            <p className={styles.builtWith}>
              Custom built with Next.js, TypeScript & CSS Modules.
            </p>
          </footer>

        </div>
      </div>
    </main>
  );
}