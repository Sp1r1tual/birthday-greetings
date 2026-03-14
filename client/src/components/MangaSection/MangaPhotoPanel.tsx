import Skeleton from "react-loading-skeleton";

import styles from "./styles/MangaSection.module.css";

interface IMangaPhotoPanelProps {
  src: string;
  index: number;
  isLoaded: boolean;
  onLoad: (index: number) => void;
  className?: string;
  delay?: string;
  num?: string;
  caption?: string;
  badge?: string;
  children?: React.ReactNode;
}

export const MangaPhotoPanel = ({
  src,
  index,
  isLoaded,
  onLoad,
  className = "",
  delay = "0s",
  num,
  caption,
  badge,
  children,
}: IMangaPhotoPanelProps) => {
  return (
    <div
      className={`${styles.panel} ${styles.mPhoto} ${className} ${styles.revealHidden}`}
      data-reveal
      data-reveal-class={styles.revealVisible}
      data-reveal-delay={delay}
    >
      {!isLoaded && (
        <div className={styles.panelSkeleton}>
          <Skeleton height="100%" />
        </div>
      )}
      <img
        src={src}
        alt={`фото ${index + 1}`}
        className={styles.panelImg}
        onLoad={() => onLoad(index)}
        style={{ opacity: isLoaded ? 1 : 0 }}
      />
      {num && <div className={styles.panelNum}>{num}</div>}
      {caption && <div className={styles.panelCaption}>{caption}</div>}
      {badge && <div className={styles.panelBadge}>{badge}</div>}
      {children}
    </div>
  );
};
