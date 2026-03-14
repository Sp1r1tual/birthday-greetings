import { useState, useLayoutEffect, useRef } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

import { useAudioContext } from "@/contexts/AudioContext";
import { DECOR } from "@/common/constants/assets";

import { CONTENT } from "@/common/constants/content";

import styles from "./styles/Hero.module.css";

export const Hero = () => {
  const { isTimeStop } = useAudioContext();
  const [isLoaded, setIsLoaded] = useState(false);
  const heroRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    if (heroRef.current) {
      heroRef.current.style.height = `${window.innerHeight}px`;
    }
  }, []);

  const bannerSrc = isTimeStop ? DECOR.easterEgg : DECOR.poster;

  return (
    <section ref={heroRef} className={styles.hero}>
      <div className={styles.speedLines} aria-hidden />
      <img src={DECOR.emoji} className={styles.sfxLeft} alt="" aria-hidden />
      <img src={DECOR.emoji} className={styles.sfxRight} alt="" aria-hidden />
      <img
        src={DECOR.balloons}
        className={styles.decorBalloons}
        alt=""
        aria-hidden
      />
      <img
        src={DECOR.present}
        className={styles.decorPresent}
        alt=""
        aria-hidden
      />

      <div className={styles.heroInner}>
        <p className={styles.heroEyebrow}>{CONTENT.HERO.EYEBROW}</p>
        <h1 className={styles.heroTitle}>
          <span className={styles.heroLine1}>{CONTENT.HERO.TITLE_L1}</span>
          <span className={styles.heroLine2}>{CONTENT.HERO.TITLE_L2}</span>
        </h1>
        <p className={styles.heroSub}>{CONTENT.HERO.SUBTITLE}</p>

        {!isLoaded && (
          <div className={styles.heroSkeleton}>
            <Skeleton height="100%" />
          </div>
        )}

        <img
          src={bannerSrc}
          className={styles.heroBannerImg}
          alt={CONTENT.HERO.BANNER_ALT}
          onLoad={() => setIsLoaded(true)}
          style={{ display: isLoaded ? "block" : "none" }}
        />
      </div>
    </section>
  );
};
