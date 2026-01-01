"use client";

import Link from "next/link";
import styles from "./page.module.css";

// Projects data
const projects = [
  {
    id: "women-ai-hackathon",
    title: "Impact Award Winner",
    description: "Women in AI Hackathon 2025",
    image: "https://res.cloudinary.com/dbvfgfqqh/image/upload/v1767250238/Gemini_Generated_Image_arknpkarknpkarkn_ztz39f.png",
    url: "https://drive.google.com/file/d/1TjLhD22M1GVnUqNRx21IK8mz1EgxK-1d/view",
    tags: ["Hackathon", "AI", "Award Winner"],
  },
  {
    id: "review-app",
    title: "Wine Review Sharing App",
    description: "Review sharing mobile app at Harvard Innovation Labs",
    image: "https://res.cloudinary.com/dbvfgfqqh/image/upload/v1767249826/Gemini_Generated_Image_nvdarfnvdarfnvda_ez1jwp.png",
    url: "https://www.figma.com/proto/KctXQSYE4LA9EKBHL4wypA/Winesy?page-id=0%3A1&node-id=148-98&starting-point-node-id=359%3A461&t=0nHl7uQwQ0k9tEvI-1",
    tags: ["UI Design", "Figma", "Mobile", "Prototyping"],
  },
  {
    id: "designathon",
    title: "Landing Page Design",
    description: "Bentley University x IxDF Designathon",
    image: "https://res.cloudinary.com/dbvfgfqqh/image/upload/v1767247555/Screenshot_2026-01-01_010507_oaorxx.png",
    url: "https://prototypefortheplanet.framer.website/",
    tags: ["Web Design", "Landing Page", "Designathon"],
  },
  {
    id: "lab-results",
    title: "LabResults",
    description: "Redesigning Epic's lab results user experience",
    image: "https://res.cloudinary.com/dbvfgfqqh/image/upload/v1767250655/Gemini_Generated_Image_h53dwzh53dwzh53d_qs4sfk.png",
    url: "https://lab-results-dusky.vercel.app/results",
    tags: ["Health Tech", "WCAG 2.1", "Next.js", "Mobile-First"],
  },
];

// Case study data
const caseStudies = [
  {
    id: "iembrace",
    title: "Product Design Engineering for Wellness Experiences",
    subtitle: "",
    organization: "iEmbrace LLC, Harvard Innovation Labs",
    appStoreUrl: "https://apps.apple.com/us/app/embrace-mindful-moments/id6740446690",
    description:
      "Transformed a meditation app in 30 days as a solo designer-developer with zero handoff. I led end-to-end product design and pixel-perfect frontend engineering.",
    tags: [
      "Product Design",
      "Mobile Development",
      "Flutter",
      "UX Research",
      "Design Systems",
      "AI Features",
    ],
    metrics: [
      {
        label: "Cycle Time Reduction",
        value: "60%",
      },
      {
        label: "Features Shipped",
        value: "26",
      },
      {
        label: "App Store CTR",
        value: "4.5%",
      },
      {
        label: "WCAG Violations Fixed",
        value: "6",
      },
    ],
    embedUrl:
      "https://embed.figma.com/slides/EHFp5dMUGBrtJiwjS1KtTf/iEmbrace?node-id=1-303&embed-host=share",
    highlights: [
      "Established consistent weekly release cadence",
      "AI-powered conversational UI for sensitive data input",
      "Dark mode discovery for reduced cognitive load",
    ],
  },
];

export default function WorkPage() {
  return (
    <div className={styles.workPage}>
      {/* Content Area - Left Pane + Right Pane */}
      <main id="main-content" className={styles.contentArea}>
        {/* Left Pane - Metadata */}
        <aside className={styles.leftPane}>
          <Link href="/" className={styles.backLink}>
            <span aria-hidden="true">←</span> Home
          </Link>

          {caseStudies.map((study) => (
            <div key={study.id} className={styles.caseStudyMeta}>
              {/* Organization & App Store Link */}
              <div className={styles.orgRow}>
                <span className={styles.organization}>{study.organization}</span>
                {study.appStoreUrl && (
                  <a
                    href={study.appStoreUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.appStoreLink}
                  >
                    <span className={styles.appStoreLinkText}>App Store</span>
                    <span className={styles.appStoreLinkArrow} aria-hidden="true">↗</span>
                  </a>
                )}
              </div>

              {/* Title */}
              <h1 className={styles.caseStudyTitle}>{study.title}</h1>
              {study.subtitle && <p className={styles.caseStudySubtitle}>{study.subtitle}</p>}

              {/* Tags */}
              <div className={styles.tags}>
                {study.tags.map((tag) => (
                  <span key={tag} className={styles.tag}>
                    {tag}
                  </span>
                ))}
              </div>

              {/* Description */}
              <p className={styles.description}>{study.description}</p>

              {/* Impact Metrics */}
              <div className={styles.metricsSection}>
                <h3 className={styles.sectionLabel}>Impact</h3>
                <div className={styles.metricsGrid}>
                  {study.metrics.map((metric) => (
                    <div key={metric.label} className={styles.metricCard}>
                      <span className={styles.metricValue}>{metric.value}</span>
                      <span className={styles.metricLabel}>{metric.label}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Key Highlights */}
              <div className={styles.highlightsSection}>
                <h3 className={styles.sectionLabel}>Highlights</h3>
                <ul className={styles.highlightsList}>
                  {study.highlights.map((highlight) => (
                    <li key={highlight} className={styles.highlight}>
                      {highlight}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </aside>

        {/* Right Pane - Presentation */}
        <div className={styles.rightPane}>
          {caseStudies.map((study) => (
            <div key={study.id} className={styles.embedWrapper}>
              <iframe
                className={styles.embed}
                src={study.embedUrl}
                title={`${study.title} Case Study Presentation`}
                allowFullScreen
              />
            </div>
          ))}
        </div>
      </main>

      {/* Projects Section */}
      <section className={styles.projectsSection}>
        <h2 className={styles.projectsSectionTitle}>Other Projects</h2>
        <div className={styles.projectsGrid}>
          {projects.map((project) => (
            <a
              key={project.id}
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.projectCard}
            >
              <div className={styles.projectImageWrapper}>
                {project.image.startsWith("http") ? (
                  <img
                    src={project.image}
                    alt={project.title}
                    className={styles.projectImage}
                  />
                ) : (
                  <div className={styles.projectImagePlaceholder}>
                    <span className={styles.projectImageText}>Image</span>
                  </div>
                )}
              </div>
              <div className={styles.projectContent}>
                <h3 className={styles.projectTitle}>
                  {project.title}
                  <span className={styles.projectLinkArrow} aria-hidden="true">↗</span>
                </h3>
                <p className={styles.projectDescription}>{project.description}</p>
                <div className={styles.projectTags}>
                  {project.tags.map((tag) => (
                    <span key={tag} className={styles.projectTag}>
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* Full Width Footer */}
      <footer className={styles.pageFooter}>
        <p className={styles.copyright}>
          &copy; {new Date().getFullYear()} Abhinav Gupta
        </p>
        <p className={styles.builtWith}>
          Custom built using Next.js, TypeScript & CSS Modules
        </p>
      </footer>
    </div>
  );
}
