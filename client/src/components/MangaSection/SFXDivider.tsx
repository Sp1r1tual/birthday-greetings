import styles from "./styles/MangaSection.module.css";

interface ISFXDividerProps {
  text: string;
  delay?: string;
}

export const SFXDivider = ({ text, delay = "0.4s" }: ISFXDividerProps) => {
  return (
    <div
      className={styles.sfxDivider}
      data-reveal
      data-reveal-class={styles.sfxLinesVisible}
    >
      <span
        className={`${styles.sfxDividerText} ${styles.sfxHidden}`}
        data-reveal
        data-reveal-class={styles.sfxVisible}
        data-reveal-delay={delay}
      >
        {text}
      </span>
    </div>
  );
};
