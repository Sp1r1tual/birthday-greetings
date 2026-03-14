import styles from "./styles/MuteButton.module.css";

interface IMuteButtonProps {
  muted: boolean;
  onToggle: () => void;
  isDisabled?: boolean;
}

export const MuteButton = ({
  muted,
  onToggle,
  isDisabled,
}: IMuteButtonProps) => {
  return (
    <button
      className={`${styles.muteBtn} ${isDisabled ? styles.disabled : ""}`}
      onClick={onToggle}
      disabled={isDisabled}
      aria-label={muted ? "Увімкнути музику" : "Вимкнути музику"}
      title={muted ? "Увімкнути музику" : "Вимкнути музику"}
    >
      {muted ? "🔇" : "🔊"}
    </button>
  );
};
