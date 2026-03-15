import { useEffect, useState, useRef } from "react";

import styles from "./styles/ScrollToTopButton.module.css";

export const ScrollToTopButton = () => {
  const [showTop, setShowTop] = useState(false);
  const btnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const footer = document.querySelector("footer");

    const handleUpdate = () => {
      const scrollY = window.scrollY;
      setShowTop(scrollY > 300);

      if (footer && btnRef.current) {
        const footerRect = footer.getBoundingClientRect();
        const visibleHeight = Math.max(0, window.innerHeight - footerRect.top);
        btnRef.current.style.setProperty("--footer-offset", `${visibleHeight}px`);
      }
    };

    window.addEventListener("scroll", handleUpdate, { passive: true });
    window.addEventListener("resize", handleUpdate);
    handleUpdate();

    return () => {
      window.removeEventListener("scroll", handleUpdate);
      window.removeEventListener("resize", handleUpdate);
    };
  }, []);

  return (
    <button
      ref={btnRef}
      className={`${styles.toTopBtn} ${showTop ? styles.toTopBtnVisible : ""}`}
      onClick={() => {
        if (navigator.vibrate) navigator.vibrate([50, 30, 50]);
        window.scrollTo({ top: 0, behavior: "smooth" });
      }}
      aria-label="Нагору"
    >
      ↑
    </button>
  );
};
