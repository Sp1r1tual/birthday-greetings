import { useState } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

import { useAudioContext } from "@/contexts/AudioContext";
import { DECOR } from "@/common/constants/assets";

import styles from "./styles/Hero.module.css";

export const Hero = () => {
  const { isTimeStop } = useAudioContext();
  const [isLoaded, setIsLoaded] = useState(false);

  const bannerSrc = isTimeStop ? DECOR.easterEgg : DECOR.poster;

  return (
    <section className={styles.hero}>
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
        <p className={styles.heroEyebrow}>★ СПЕЦІАЛЬНИЙ ВИПУСК ★</p>
        <h1 className={styles.heroTitle}>
          <span className={styles.heroLine1}>3 ДНЕМ</span>
          <span className={styles.heroLine2}>НАРОДЖЕННЯ!</span>
        </h1>
        <p className={styles.heroSub}>
          Сьогодні свій день святкує особлива людина — і це зовсім не
          перебільшення
        </p>

        {!isLoaded && (
          <div className={styles.heroSkeleton}>
            <Skeleton height="100%" />
          </div>
        )}

        <img
          src={bannerSrc}
          className={styles.heroBannerImg}
          alt="Happy Birthday"
          onLoad={() => setIsLoaded(true)}
          style={{ display: isLoaded ? "block" : "none" }}
        />
      </div>
    </section>
  );
};
