import { useState, useEffect, useCallback, useRef } from "react";

import {
  STEPS,
  EPISODE_NUM,
  SERIES_JP,
  SERIES_UA,
  STUDIO,
  EPISODE_TITLES,
  PARTICLES,
  STREAKS,
} from "@/common/constants/opening";

import subBassSfx from "@/assets/music/sub_bass_sfx.wav";
import clickSfx from "@/assets/music/click.wav";

import styles from "./styles/Opening.module.css";

interface IAnimeOpeningProps {
  onDone: () => void;
  onAudioStart: () => void;
}

export const Opening = ({ onDone, onAudioStart }: IAnimeOpeningProps) => {
  const [step, setStep] = useState(0);
  const [pct, setPct] = useState(0);
  const [flash, setFlash] = useState(false);
  const [exiting, setExiting] = useState(false);
  const [titleText, setTitleText] = useState("");
  const typingRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const typeTitle = useCallback((target: string) => {
    if (typingRef.current) clearTimeout(typingRef.current);
    setTitleText("");
    let i = 0;
    const tick = () => {
      i++;
      setTitleText(target.slice(0, i));
      if (i < target.length) {
        typingRef.current = setTimeout(tick, 40 + Math.random() * 30);
      }
    };
    typingRef.current = setTimeout(tick, 120);
  }, []);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  useEffect(() => {
    typeTitle(EPISODE_TITLES[0]);
    return () => {
      if (typingRef.current) clearTimeout(typingRef.current);
    };
  }, [typeTitle]);

  useEffect(() => {
    if (step === 0) return;
    const target = STEPS[step - 1].pct;
    let current = step === 1 ? 0 : STEPS[step - 2].pct;
    const interval = setInterval(() => {
      current += 1;
      setPct(current);
      if (current >= target) clearInterval(interval);
    }, 8);
    return () => clearInterval(interval);
  }, [step]);

  const handleClick = useCallback(() => {
    if (exiting) return;

    if (navigator.vibrate) {
      navigator.vibrate(30);
    }

    const nextStep = step + 1;
    if (nextStep > 3) return;

    const click = new Audio(clickSfx);
    click.volume = 0.5;
    click.play().catch(() => {});

    setFlash(true);
    setTimeout(() => setFlash(false), 300);

    if (nextStep === 3) {
      onAudioStart();
    }

    setStep(nextStep);
    typeTitle(EPISODE_TITLES[nextStep]);

    if (nextStep === 3) {
      const sfx = new Audio(subBassSfx);
      sfx.volume = 0.7;
      sfx.play().catch(() => {});

      setTimeout(() => {
        setExiting(true);
        setTimeout(onDone, 650);
      }, 1100);
    }
  }, [step, exiting, onDone, onAudioStart, typeTitle]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Enter" || e.key === " ") handleClick();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [handleClick]);

  const currentStatus = step > 0 ? STEPS[step - 1].status : "ОЧІКУВАННЯ...";
  const titleDone = titleText === EPISODE_TITLES[Math.min(step, 3)];

  return (
    <div
      className={`${styles.overlay} ${exiting ? styles.overlayExit : ""}`}
      onClick={handleClick}
      role="button"
      tabIndex={0}
      aria-label="Натисни щоб продовжити"
    >
      <div className={styles.cornerTL} />
      <div className={styles.cornerTR} />
      <div className={styles.cornerBL} />
      <div className={styles.cornerBR} />

      <div className={styles.particles} aria-hidden>
        {PARTICLES.map((p) => (
          <div
            key={p.id}
            className={styles.particle}
            style={{
              top: p.top,
              left: p.left,
              ["--size" as string]: p.size,
              ["--color" as string]: p.color,
              ["--op" as string]: p.op,
              ["--dur" as string]: p.dur,
              ["--delay" as string]: p.delay,
              ["--drift" as string]: p.drift,
              ["--drift2" as string]: p.drift2,
            }}
          />
        ))}
      </div>

      <div aria-hidden>
        {STREAKS.map((s) => (
          <div
            key={s.id}
            className={styles.speedStreak}
            style={{
              top: s.top,
              ["--w" as string]: s.w,
              ["--color" as string]: s.color,
              ["--dur" as string]: s.dur,
              ["--delay" as string]: s.delay,
            }}
          />
        ))}
      </div>

      <div className={styles.sideTextLeft} aria-hidden>
        バースデー・スペシャル
      </div>
      <div className={styles.sideTextRight} aria-hidden>
        第一話・新章開幕
      </div>

      {flash && <div className={styles.clickFlash} aria-hidden />}

      <div className={styles.content}>
        <p className={styles.studio}>{STUDIO}</p>
        <p className={styles.seriesJp}>{SERIES_JP}</p>
        <p className={styles.seriesTitle}>{SERIES_UA}</p>

        <div className={styles.divider} />

        <div className={styles.episodeRow}>
          <span className={styles.episodeLabel}>ЕПІЗОД</span>
          <span className={styles.episodeNum}>{EPISODE_NUM}</span>
        </div>

        <p
          className={`${styles.episodeTitle} ${titleDone ? styles.episodeTitleDone : ""}`}
        >
          {titleText}
        </p>

        <div className={styles.progressWrap}>
          <div className={styles.progressTrack}>
            <div className={styles.progressFill} style={{ width: `${pct}%` }} />
          </div>
          <div className={styles.progressMeta}>
            <span className={styles.progressPct}>{pct}%</span>
            <span className={styles.progressStatus}>{currentStatus}</span>
          </div>
        </div>

        <div
          className={`${styles.clickHint} ${step >= 3 ? styles.clickHintHide : ""}`}
        >
          <p className={styles.clickHintText}>
            {step === 0
              ? "Очікується активність..."
              : step < 3
                ? "Продовжити"
                : "Відкриття.."}
          </p>

          <div className={styles.clickDots}>
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className={`${styles.clickDot} ${i < step ? styles.clickDotFilled : ""}`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
