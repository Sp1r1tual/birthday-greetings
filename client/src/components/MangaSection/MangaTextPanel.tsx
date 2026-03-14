import type { ReactNode } from "react";

import styles from "./styles/MangaSection.module.css";

interface IMangaTextPanelProps {
  chapter: string;
  headline: ReactNode;
  bubble: string;
  sfx?: string;
  className?: string;
  bubbleClassName?: string;
  delay?: string;
  isLarge?: boolean;
}

export const MangaTextPanel = ({
  chapter,
  headline,
  bubble,
  sfx,
  className = "",
  bubbleClassName = "",
  delay = "0s",
  isLarge = false,
}: IMangaTextPanelProps) => {
  return (
    <div
      className={`${styles.panel} ${styles.mText} ${className} ${styles.revealHidden}`}
      data-reveal
      data-reveal-class={styles.revealVisible}
      data-reveal-delay={delay}
    >
      <div className={styles.chLabel}>{chapter}</div>
      <p className={isLarge ? styles.mHeadlineLg : styles.mHeadline}>
        {headline}
      </p>
      <div className={`${styles.bubble} ${bubbleClassName}`}>{bubble}</div>
      {sfx && <p className={styles.sfx}>{sfx}</p>}
    </div>
  );
};
