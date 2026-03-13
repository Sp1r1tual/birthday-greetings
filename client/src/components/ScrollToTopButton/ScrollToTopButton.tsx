import { useEffect, useState } from "react";

import styles from "./styles/ScrollToTopButton.module.css";

export const ScrollToTopButton = () => {
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 300);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <button
      className={`${styles.toTopBtn} ${showTop ? styles.toTopBtnVisible : ""}`}
      onClick={() => {
        if (navigator.vibrate) navigator.vibrate(30);
        window.scrollTo({ top: 0, behavior: "smooth" });
      }}
      aria-label="Нагору"
    >
      ↑
    </button>
  );
};
