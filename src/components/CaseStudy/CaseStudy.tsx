import React from 'react';
import './CaseStudy.module.css';

const CaseStudy: React.FC = () => {
  return (
    <div className="case-study">
      {/* Productivity Section */}
      <section className="productivity-section">
        <div className="container">
          <div className="content-grid">
            <div className="text-content">
              <h3 className="section-label">productivity</h3>
              <p className="description">
                Transform your work with the tools productivity apps, habits programs, and design
                that drives real results-overcome blocks transform your habits and tasks,
                and unlock your productivity potential.
              </p>
            </div>
            <div className="image-placeholder">
              <img 
                src="https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=600&h=400&fit=crop" 
                alt="Productivity workspace"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <h1>
            Start effortlessly.<br />
            Block distractions.<br />
            Boost productivity.
          </h1>
        </div>
      </section>

      {/* Instructions Section */}
      <section className="instructions-section">
        <div className="container">
          <h3 className="section-label">productivity</h3>
          <div className="instructions-grid">
            <div className="instructions-content">
              <h2>Instructions break free. Goodness. To-dos efficiency.</h2>
              <p className="instructions-text">
                On the mobile app you can strike. No effort organizing it by setting up
                productivity. Set up productivity timer there always for you to do!
              </p>
              
              <div className="steps">
                <div className="step-item">
                  <div className="step-icon">
                    <span>📱</span>
                  </div>
                  <div className="step-content">
                    <h4>Download the productivity app</h4>
                    <p>
                      Start mobile and work on incoming.<br />
                      One click (using the app button).
                    </p>
                  </div>
                </div>
                
                <div className="step-item">
                  <div className="step-icon">
                    <span>⚡</span>
                  </div>
                  <div className="step-content">
                    <h4>Set goals on the Doshi Project 12%</h4>
                    <p>
                      High achiever and want to upgrade,<br />
                      then click and read file work efficiently.<br />
                      Learn: Let Doshi Project accelerate.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="figure-illustration">
                <img 
                  src="https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=150&h=150&fit=crop" 
                  alt="Person walking"
                />
              </div>
            </div>
            
            <div className="phone-mockup">
              <div className="phone-frame">
                <div className="phone-screen">
                  <div className="app-header">
                    <div className="user-avatar"></div>
                    <div className="user-info">
                      <div className="user-name"></div>
                      <div className="user-status"></div>
                    </div>
                  </div>
                  
                  <div className="timer-display">
                    <div className="time">00:16</div>
                    <div className="dots">
                      <span></span>
                      <span></span>
                      <span></span>
                    </div>
                  </div>
                  
                  <div className="task-list">
                    <div className="task-item"></div>
                    <div className="task-item"></div>
                    <div className="task-item"></div>
                  </div>
                  
                  <div className="action-buttons">
                    <div className="action-btn"></div>
                    <div className="action-btn"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Partner Activities Section */}
      <section className="partner-section">
        <div className="container">
          <div className="partner-grid">
            <div className="partner-image">
              <img 
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600&h=400&fit=crop" 
                alt="Team collaboration"
              />
            </div>
            <div className="partner-content">
              <span className="partner-label">2.7k Peps Challenge</span>
              <h2>FOSTER YOUR ACTIVITIES</h2>
              <p>
                Designed to improve outcomes and culture.<br />
                Use them for clubs, communities, volunteer organizations, schools, therapy<br />
                programs, and any other small-to-medium sized groups and classes.
              </p>
              
              <div className="feature-item">
                <div className="check-icon">✓</div>
                <span>Specific impact</span>
              </div>
              
              <div className="learn-more">
                <span>Learn more about </span>
                <div className="arrow-icon"></div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CaseStudy;