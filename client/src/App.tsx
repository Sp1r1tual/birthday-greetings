import { useState, useEffect } from "react";
import { SkeletonTheme } from "react-loading-skeleton";

import { useAudioContext } from "./contexts/AudioContext";

import { Opening } from "./components/Opening/Opening";
import { Hero } from "./components/Hero/Hero";
import { MangaSection } from "./components/MangaSection/MangaSection";
import { GreetingsSection } from "./components/GreetingsSection/GreetingsSection";
import { Stamp } from "./components/Stamp/Stamp";
import { Footer } from "./components/Footer/Footer";
import { MuteButton } from "./components/MuteButton/MuteButton";
import { ScrollToTopButton } from "./components/ScrollToTopButton/ScrollToTopButton";

import styles from "./App.module.css";

export const App = () => {
  const [opened, setOpened] = useState(false);
  const [showStamp, setShowStamp] = useState(false);
  const { muted, toggleMute, handleAudioStart, isTimeStop } = useAudioContext();

  useEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (!opened) return;
    window.scrollTo(0, 0);
    const t = setTimeout(() => setShowStamp(true), 1200);
    return () => clearTimeout(t);
  }, [opened]);

  const handleOpened = () => setOpened(true);

  return (
    <>
      <SkeletonTheme
        baseColor="var(--skeleton-base)"
        highlightColor="var(--skeleton-highlight)"
      >
        {!opened && (
          <Opening onDone={handleOpened} onAudioStart={handleAudioStart} />
        )}

        <div className={`${styles.root} ${isTimeStop ? styles.timeStop : ""}`}>
          <div className={styles.noise} aria-hidden />

          <MuteButton
            muted={muted}
            onToggle={toggleMute}
            isDisabled={isTimeStop}
          />

          <Hero />
          <MangaSection />
          <GreetingsSection />
          <Stamp show={showStamp} />
          <Footer />
          <ScrollToTopButton />
        </div>
      </SkeletonTheme>
    </>
  );
};
