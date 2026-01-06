'use client';

import { useState } from 'react';

interface PronunciationButtonProps {
  styles: {
    readonly [key: string]: string;
  };
}

export function PronunciationButton({ styles }: PronunciationButtonProps) {
  const [isPlaying, setIsPlaying] = useState(false);

  const playPronunciation = () => {
    if (isPlaying) return;
    if (typeof window === 'undefined' || !window.speechSynthesis) return;

    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance('Abhinav');
    utterance.rate = 0.8;
    utterance.pitch = 1;

    utterance.onstart = () => setIsPlaying(true);
    utterance.onend = () => setIsPlaying(false);
    utterance.onerror = () => setIsPlaying(false);

    setIsPlaying(true);
    window.speechSynthesis.speak(utterance);
  };

  return (
    <button
      type="button"
      className={`${styles.pronunciationBtn} ${isPlaying ? styles.playing : ''}`}
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
  );
}
