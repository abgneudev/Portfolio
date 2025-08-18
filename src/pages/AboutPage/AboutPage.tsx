import { useState } from 'react';
import AboutShowcase from '../../components/AboutShowcase/AboutShowcase';
import styles from './AboutPage.module.css';

const About = () => {
  const [isPlaying, setIsPlaying] = useState(false);

  const playPronunciation = () => {
    setIsPlaying(true);
    
    // Using the Web Speech API for pronunciation
    const utterance = new SpeechSynthesisUtterance('Abhinav');
    utterance.rate = 0.8; // Slower rate for clarity
    utterance.pitch = 1;
    utterance.volume = 1;
    
    // Optional: Set specific voice if you want consistency
    const voices = window.speechSynthesis.getVoices();
    const englishVoice = voices.find(voice => 
      voice.lang.startsWith('en') && voice.name.includes('Google') // Prefer Google voices if available
    ) || voices.find(voice => voice.lang.startsWith('en'));
    
    if (englishVoice) {
      utterance.voice = englishVoice;
    }
    
    utterance.onend = () => {
      setIsPlaying(false);
    };
    
    window.speechSynthesis.cancel(); // Cancel any ongoing speech
    window.speechSynthesis.speak(utterance);
  };



  return (
    <>
      <div className={styles.aboutSection}>
        {/* Hero Section */}
        <section className={styles.heroSection}>
          <div className={styles.heroContainer}>
            <div className={styles.heroImageWrapper}>
              <img 
                src="https://res.cloudinary.com/dbvfgfqqh/image/upload/v1754637891/portfoliopic_ag6pi0.png"
                alt="Portfolio photograph"
                className={styles.heroImage}
                loading="eager"
              />
            </div>
            <div className={styles.heroContent}>
              <h1 className={styles.heroTitle}>
                <span className={styles.nameInline}>
                  Hey, I'm Abhinav!
                  <button
                    className={styles.bookIcon}
                    type="button"
                    aria-label="Meaning of the name Abhinav"
                    tabIndex={0}
                  >
                    <span aria-hidden="true">📖</span>
                    <span className={styles.bookTooltip} role="tooltip">
                      Abhinav means new, original, and innovative in Sanskrit
                    </span>
                  </button>
                </span>
                <div className={styles.pronunciationWrapper}>
                  <button
                    className={`${styles.pronunciationButton} ${isPlaying ? styles.playing : ''}`}
                    onClick={playPronunciation}
                    aria-label="Listen to pronunciation: uh-bee-nahv"
                    type="button"
                    tabIndex={0}
                  >
                    <svg
                      className={styles.speakerIcon}
                      width="16"
                      height="16"
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
                    <span className={styles.pronunciationText}>/uh-bee-nahv/</span>
                  </button>
                </div>
              </h1>
                <div className={styles.philosophyText}>
                    <em>I design and build digital experiences that are accessible and scalable.</em>
                    <em>Four years across enterprise, startups, and nonprofits - from UNICEF campaigns reaching millions to financial systems managing billions to Harvard Innovation Labs building what's next - taught me that great design isn't universal. It's contextual. The key is listening and knowing which solution fits each moment.</em>
                    <em>I like to think about design the way I think about wind - shaped by everything it touches, adapting to contexts, finding paths of least resistance.</em>
                    <em>My approach is simple: Research deeply. Remove friction. Ship solutions. As both designer and developer, I see the entire landscape - from user needs to technical constraints. No handoffs, no translation gaps. Just ideas becoming real.</em>
                    <em>I'm here to create mindful digital experiences that help us better understand ourselves <br /> and the world around us.</em>
                </div>
            </div>
          </div>
        </section>

  {/* Showcase Section */}
  <AboutShowcase />

  {/* Timeline moved to Experience page */}
      </div>
    </>
  );
};

export default About;