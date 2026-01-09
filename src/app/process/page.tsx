"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import Link from "next/link";
import { analytics } from "@/lib/analytics";
import { stages, timelineStages } from "./lib/data";
import { useProcessAnimation } from "./hooks/useProcessAnimation";
import styles from "./page.module.css";

export default function ProcessPage() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  // -1 = hero, 0-5 = stages
  const [currentStage, setCurrentStage] = useState(-1);

  // Animation refs
  const transitioningRef = useRef(false);
  const scrollAccRef = useRef(0);
  const timeRef = useRef(0);
  const targetStageRef = useRef(-1);
  const stage5StartTimeRef = useRef(0);

  const isHero = currentStage === -1;
  const displayStage = Math.max(0, currentStage);
  const stage = stages[displayStage];

  // Use the animation hook
  useProcessAnimation(canvasRef, {
    time: timeRef,
    targetStage: targetStageRef,
    stage5StartTime: stage5StartTimeRef,
  });

  const goToStage = useCallback((nextStage: number) => {
    if (nextStage >= -1 && nextStage < stages.length && !transitioningRef.current) {
      targetStageRef.current = nextStage;
      setCurrentStage(nextStage);
      transitioningRef.current = true;
      if (nextStage >= 0) {
        analytics.trackProcessStage(stages[nextStage].name);
      }
      setTimeout(() => {
        transitioningRef.current = false;
      }, 800);
    }
  }, []);

  const handleDiveDeeper = useCallback(() => {
    goToStage(0);
    analytics.trackProcessStage("hero_dive_deeper");
  }, [goToStage]);


  // Navigation handlers - always active
  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      if (transitioningRef.current) return;

      scrollAccRef.current += e.deltaY;
      if (Math.abs(scrollAccRef.current) > 50) {
        const direction = scrollAccRef.current > 0 ? 1 : -1;
        goToStage(currentStage + direction);
        scrollAccRef.current = 0;
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (transitioningRef.current) return;
      if (["ArrowDown", " ", "ArrowRight"].includes(e.key)) {
        e.preventDefault();
        goToStage(currentStage + 1);
      } else if (["ArrowUp", "ArrowLeft"].includes(e.key)) {
        e.preventDefault();
        goToStage(currentStage - 1);
      }
    };

    let touchY = 0;
    const handleTouchStart = (e: TouchEvent) => {
      touchY = e.touches[0].clientY;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (transitioningRef.current) return;
      const delta = touchY - e.touches[0].clientY;
      if (Math.abs(delta) > 40) {
        const direction = delta > 0 ? 1 : -1;
        goToStage(currentStage + direction);
        touchY = e.touches[0].clientY;
      }
    };

    window.addEventListener("wheel", handleWheel, { passive: false });
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("touchmove", handleTouchMove, { passive: true });

    return () => {
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", handleTouchMove);
    };
  }, [currentStage, goToStage]);

  return (
    <main className={styles.page}>
      <div className={styles.noise} aria-hidden="true" />
      <canvas ref={canvasRef} className={styles.canvas} aria-hidden="true" />

      {/* Hero Section */}
      {isHero && (
        <div className={styles.hero}>
          <nav className={styles.heroNav}>
            <Link href="/" className={styles.backLink}>← Home</Link>
          </nav>

          <div className={styles.heroContent}>
            <h1 className={styles.heroTitle}>My Design Process</h1>
            <p className={styles.heroSubtitle}>
              A framework for building products that feel like extensions of the user&apos;s mind
            </p>

            <div className={styles.timeline}>
              {timelineStages.map((item, i) => (
                <div key={item.num} className={styles.timelineItem}>
                  <div className={styles.timelineNode}>
                    <span className={styles.timelineNumber}>{item.num}</span>
                  </div>
                  {i < timelineStages.length - 1 && (
                    <div className={styles.timelineLine} />
                  )}
                  <span className={styles.timelineLabel}>{item.label}</span>
                </div>
              ))}
            </div>

            <button
              type="button"
              className={styles.diveCta}
              onClick={handleDiveDeeper}
            >
              Dive deeper
              <span className={styles.diveArrow}>↓</span>
            </button>
          </div>
        </div>
      )}

      {/* Main Content */}
      {!isHero && (
        <div className={styles.layout}>
          <div className={styles.columnLeft}>
            <nav className={styles.navLinks}>
              <Link href="/" className={styles.backLink}>← Home</Link>
            </nav>

            <div className={styles.designFor}>
              <span className={styles.label}>I Design For</span>
              <h2 className={styles.designGoal}>{stage.designFor}</h2>
              <ul className={styles.taskList}>
                {stage.tasks.map((task, i) => (
                  <li key={i}>{task}</li>
                ))}
              </ul>
            </div>

            <div className={styles.outcomes}>
              <span className={styles.label}>Outcomes Tracked</span>
              <ul className={styles.outcomeList}>
                {stage.outcomes.map((outcome, i) => (
                  <li key={i}>{outcome}</li>
                ))}
              </ul>
            </div>
          </div>

          <div className={styles.columnCenter}>
            <blockquote className={styles.question}>{stage.question}</blockquote>
          </div>

          <div className={styles.columnRight}>
            <div className={styles.stageInfo}>
              <h1 className={styles.stageName}>{stage.name}</h1>
              <p className={styles.subtitle}>{stage.subtitle}</p>
            </div>

            <div className={styles.progress}>
              <span className={styles.counter}>
                <strong>{displayStage + 1}</strong>/{stages.length}
              </span>
              <div className={styles.progressWrapper}>
                <div
                  className={styles.progressBar}
                  role="progressbar"
                  aria-valuenow={displayStage + 1}
                  aria-valuemin={1}
                  aria-valuemax={stages.length}
                >
                  {stages.map((_, i) => (
                    <span
                      key={i}
                      className={`${styles.segment} ${i <= displayStage ? styles.filled : ""}`}
                    />
                  ))}
                </div>
                <ul className={styles.stageNav}>
                  {stages.map((s, i) => (
                    <li key={i}>
                      <button
                        type="button"
                        className={`${styles.stageNavItem} ${i === displayStage ? styles.stageNavActive : ""}`}
                        onClick={() => goToStage(i)}
                      >
                        <span className={styles.stageNavNumber}>{i + 1}</span>
                        <span className={styles.stageNavName}>{s.name}</span>
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
