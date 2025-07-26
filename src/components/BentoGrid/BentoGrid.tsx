import React, { useState } from 'react';
import './BentoGrid.css';

const BentoGrid = () => {
  const [activeSlide, setActiveSlide] = useState(0);
  
  const slides = [
    {
      title: "HELLO, I AM ABHINAV",
      subtitle: "A PRODUCT DESIGNER",
      description: "who creates WCAG-compliant, responsive digital experiences through design systems and ships high-fidelity designs in code.",
      question: "What does accessible design look like?"
    },
    {
      title: "DESIGN TO CODE",
      subtitle: "SEAMLESSLY",
      description: "Eliminating handoff friction through collaborative workflows and architecting scalable components for AI-powered applications.",
      question: "How to bridge design and development?"
    },
    {
      title: "RESEARCH DRIVEN",
      subtitle: "DESIGN DECISIONS",
      description: "Transforming user research into testable prototypes, driving measurable improvements in adoption and engagement.",
      question: "What makes design impactful?"
    }
  ];

  return (
    <section className="bento-section">
      <div className="container">
        <div className="bento-grid">
          {/* Card 1 - Main intro with slider */}
          <div className="bento-card bento-card--intro">
            <div className="card-illustration">
              <img src="https://res.cloudinary.com/dbvfgfqqh/image/upload/v1753485189/display_skkp8r.png" alt="" />
              <div className="illustration-dots">
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>
            <div className="card-content">
              <h1 className="main-title">
                {slides[activeSlide].title.split(' ').map((word, i) => (
                  <span key={i}>
                    {word === 'ABHINAV' ? <span className="highlight">{word}</span> : word}{' '}
                  </span>
                ))}
              </h1>
              <h2 className="main-subtitle">{slides[activeSlide].subtitle}</h2>
              <p className="main-description">{slides[activeSlide].description}</p>
              <p className="main-question">{slides[activeSlide].question}</p>
              
              <div className="slider-dots">
                {slides.map((_, index) => (
                  <button
                    key={index}
                    className={`dot ${index === activeSlide ? 'active' : ''}`}
                    onClick={() => setActiveSlide(index)}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Card 2 - Featured message */}
          <div className="bento-card bento-card--message">
            <div className="message-content">
              <h3 className="message-title">100% WCAG</h3>
              <h3 className="message-title large">ACCESSIBILITY SCORE.</h3>
            </div>
          </div>

          {/* Card 3 - Phone mockup */}
          <div className="bento-card bento-card--phone">
            <div className="phone-mockup">
              <div className="phone-frame">
                <img src="https://res.cloudinary.com/dbvfgfqqh/image/upload/v1753485189/display_skkp8r.png" alt="Profile" />
              </div>
            </div>
          </div>

          {/* Card 4 - Magic message */}
          <div className="bento-card bento-card--magic">
            <div className="card-illustration-small">
              <img src="https://res.cloudinary.com/dbvfgfqqh/image/upload/v1753485189/display_skkp8r.png" alt="" />
              <div className="adobe-badge">
                MS-IS<br/>Northeastern<br/>University
              </div>
            </div>
            <div className="magic-content">
              <h3 className="magic-title">4 YEARS EXPERIENCE.</h3>
              <h3 className="magic-title large">DESIGN + CODE.</h3>
            </div>
          </div>

          {/* Card 5 - Award - Bottom spanning card */}
          <div className="bento-card bento-card--easter">
            <div className="easter-content">
              <h3 className="easter-title">AWS HACKATHON</h3>
              <h3 className="easter-title large">IMPACT AWARD</h3>
              <h3 className="easter-title large">WINNER 2025.</h3>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BentoGrid;