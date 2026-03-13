import styles from "./styles/MuteButton.module.css";

interface IMuteButtonProps {
  muted: boolean;
  onToggle: () => void;
}

export const MuteButton = ({ muted, onToggle }: IMuteButtonProps) => {
  return (
    <button
      className={styles.muteBtn}
      onClick={onToggle}
      aria-label={muted ? "Увімкнути музику" : "Вимкнути музику"}
      title={muted ? "Увімкнути музику" : "Вимкнути музику"}
    >
      {muted ? "🔇" : "🔊"}
    </button>
  );
};
