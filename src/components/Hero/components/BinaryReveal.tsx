'use client';

import { memo, useState, useEffect, useCallback } from 'react';
import styles from '../Hero.module.css';

interface BinaryRevealProps {
  /** Accent color for the binary text glow */
  accent: string;
  /** Callback when reveal animation completes */
  onComplete: () => void;
}

interface Cell {
  id: number;
  char: '0' | '1';
  x: number;
  y: number;
  opacity: number;
  offsetX: number;
  offsetY: number;
}

const GRID_COLS = 24;
const GRID_ROWS = 16;
const TOTAL_CELLS = GRID_COLS * GRID_ROWS;

/**
 * BinaryReveal Component
 *
 * Displays a grid of binary digits (0s and 1s) that fills in progressively,
 * then glitches before completing. Used as a reveal animation for images.
 *
 * @accessibility
 * - Decorative animation, does not convey essential information
 * - Automatically removes itself from DOM when complete
 */
export const BinaryReveal = memo(function BinaryReveal({
  accent,
  onComplete
}: BinaryRevealProps) {
  const [cells, setCells] = useState<Cell[]>([]);
  const [phase, setPhase] = useState<'forming' | 'glitch' | 'done'>('forming');

  const handleComplete = useCallback(() => {
    onComplete();
  }, [onComplete]);

  useEffect(() => {
    // Create randomized fill order
    const fillOrder = Array.from({ length: TOTAL_CELLS }, (_, i) => i)
      .sort(() => Math.random() - 0.5);

    const batchSize = Math.ceil(TOTAL_CELLS / 10);
    let batch = 0;
    let glitchCount = 0;

    const fillInterval = setInterval(() => {
      const end = Math.min((batch + 1) * batchSize, TOTAL_CELLS);
      const newCells: Cell[] = fillOrder.slice(0, end).map(i => ({
        id: i,
        char: Math.random() > 0.5 ? '1' : '0',
        x: i % GRID_COLS,
        y: Math.floor(i / GRID_COLS),
        opacity: 0.3 + Math.random() * 0.7,
        offsetX: 0,
        offsetY: 0,
      }));
      setCells(newCells);
      batch++;

      if (batch >= 10) {
        clearInterval(fillInterval);
        setPhase('glitch');

        const glitchInterval = setInterval(() => {
          setCells(prev => prev.map(cell => ({
            ...cell,
            char: Math.random() > 0.5 ? '1' : '0',
            opacity: Math.random(),
            offsetX: (Math.random() - 0.5) * 10,
            offsetY: (Math.random() - 0.5) * 10,
          })));
          glitchCount++;

          if (glitchCount >= 5) {
            clearInterval(glitchInterval);
            setPhase('done');
            setTimeout(handleComplete, 50);
          }
        }, 20);
      }
    }, 20);

    return () => clearInterval(fillInterval);
  }, [handleComplete]);

  if (phase === 'done') return null;

  return (
    <div
      className={styles.binaryReveal}
      style={{
        gridTemplateColumns: `repeat(${GRID_COLS}, 1fr)`,
        gridTemplateRows: `repeat(${GRID_ROWS}, 1fr)`,
      }}
      aria-hidden="true"
    >
      {cells.map(cell => (
        <span
          key={cell.id}
          className={styles.binaryCell}
          style={{
            color: accent,
            opacity: cell.opacity,
            transform: `translate(${cell.offsetX}px, ${cell.offsetY}px)`,
            textShadow: `0 0 6px ${accent}, 0 0 12px ${accent}`,
          }}
        >
          {cell.char}
        </span>
      ))}
    </div>
  );
});
