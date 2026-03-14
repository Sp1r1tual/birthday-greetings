import { useRef, useState, useEffect, Fragment } from "react";
import "react-loading-skeleton/dist/skeleton.css";

import { useScrollReveal } from "@/hooks/useScrollReveal";
import { useMangaNoise } from "@/hooks/useMangaNoise";

import { PHOTOS, DECOR } from "@/common/constants/assets";
import { CONTENT } from "@/common/constants/content";
import { useAudioContext } from "@/contexts/AudioContext";

import { MangaPhotoPanel } from "./MangaPhotoPanel";
import { MangaTextPanel } from "./MangaTextPanel";
import { SFXDivider } from "./SFXDivider";

import styles from "./styles/MangaSection.module.css";

export const MangaSection = () => {
  const { playZaWarudo, isTimeStop, isSfxPlaying } = useAudioContext();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { playNoise } = useMangaNoise(canvasRef);
  const [cooldownDuration, setCooldownDuration] = useState<string>("4s");
  const [loadedImages, setLoadedImages] = useState<Record<number, boolean>>({});

  const handleImageLoad = (index: number) => {
    setLoadedImages((prev) => ({ ...prev, [index]: true }));
  };

  useScrollReveal();

  useEffect(() => {
    const handleResize = () => {
      const canvas = canvasRef.current;
      if (canvas) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleDioClick = () => {
    if (isSfxPlaying) return;
    const duration = isTimeStop ? 2500 : 5500;
    setCooldownDuration(isTimeStop ? "2.5s" : "5.5s");

    document.body.style.overflow = "hidden";
    setTimeout(() => {
      document.body.style.overflow = "";
    }, isTimeStop ? 1700 : 5500);

    playNoise(duration);
    playZaWarudo();
  };

  const renderTitle = (title: string) => {
    return title.split("\n").map((line, i, arr) => (
      <Fragment key={i}>
        {line}
        {i < arr.length - 1 && <br />}
      </Fragment>
    ));
  };

  const { MANGA } = CONTENT;

  return (
    <section className={styles.mangaSection}>
      <canvas
        ref={canvasRef}
        width={window.innerWidth}
        height={window.innerHeight}
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 9999,
          opacity: 0,
          pointerEvents: "none",
          transition: "opacity 0.3s ease",
        }}
      />

      <div
        className={`${styles.sectionLabel} ${styles.revealHidden}`}
        data-reveal
        data-reveal-class={styles.revealVisible}
      >
        {MANGA.SECTION_LABEL}
      </div>

      <div
        className={`${styles.decorFloatCake} ${styles.decorItem} ${styles.decorHidden}`}
        data-reveal
        data-reveal-class={styles.decorVisible}
      >
        <img src={DECOR.cake} alt="" aria-hidden style={{ width: "100%" }} />
      </div>
      <div
        className={`${styles.decorFloatBalloons} ${styles.decorItem} ${styles.decorHidden}`}
        data-reveal
        data-reveal-class={styles.decorVisible}
      >
        <img
          src={DECOR.balloons}
          alt=""
          aria-hidden
          style={{ width: "100%" }}
        />
      </div>
      <div className={styles.decorFloatA}>
        <img src={DECOR.hats} alt="" aria-hidden style={{ width: "100%" }} />
      </div>
      <div className={styles.decorFloatB}>
        <img
          src={DECOR.balloons}
          alt=""
          aria-hidden
          style={{ width: "100%" }}
        />
      </div>
      <div
        className={`${styles.decorFloatC} ${styles.decorItem} ${styles.decorHidden}`}
        data-reveal
        data-reveal-class={styles.decorVisible}
      >
        <img
          src={DECOR.greetings}
          alt=""
          aria-hidden
          style={{ width: "100%" }}
        />
      </div>
      <div
        className={`${styles.decorFloatD} ${styles.decorItem} ${styles.decorHidden}`}
        data-reveal
        data-reveal-class={styles.decorVisible}
      >
        <img
          src={DECOR.dio}
          className={`${isTimeStop ? styles.dioActive : ""} ${isSfxPlaying ? styles.dioDisabled : ""}`}
          alt="Dio"
          title={isSfxPlaying ? "" : "Za Warudo!!!"}
          onClick={handleDioClick}
          style={{
            cursor: isSfxPlaying ? "default" : "pointer",
            width: "100%",
          }}
        />
      </div>
      {isSfxPlaying && (
        <div className={styles.dioCooldown}>
          <div
            className={styles.dioCooldownBar}
            style={{ animationDuration: cooldownDuration }}
          />
        </div>
      )}

      <div className={styles.mosaic}>
        <div className={styles.mRow}>
          <MangaPhotoPanel
            src={PHOTOS[0]}
            index={0}
            isLoaded={loadedImages[0]}
            onLoad={handleImageLoad}
            className={styles.mSpan2}
            num="01"
          />
          <MangaTextPanel
            chapter={MANGA.CHAPTER_1.LABEL}
            headline={renderTitle(MANGA.CHAPTER_1.TITLE)}
            bubble={MANGA.CHAPTER_1.BUBBLE}
            sfx={MANGA.CHAPTER_1.SFX}
            delay="0.2s"
          />
        </div>

        <div className={styles.mRow}>
          <MangaTextPanel
            chapter={MANGA.CHAPTER_2.LABEL}
            headline={renderTitle(MANGA.CHAPTER_2.TITLE)}
            bubble={MANGA.CHAPTER_2.BUBBLE}
            className={styles.mTextDark}
            bubbleClassName={styles.bubbleR}
          />
          <MangaPhotoPanel
            src={PHOTOS[1]}
            index={1}
            isLoaded={loadedImages[1]}
            onLoad={handleImageLoad}
            delay="0.15s"
            num="02"
          />
          <MangaPhotoPanel
            src={PHOTOS[2]}
            index={2}
            isLoaded={loadedImages[2]}
            onLoad={handleImageLoad}
            delay="0.3s"
            caption="404: bugs not found"
          />
        </div>

        <SFXDivider text={MANGA.DIVIDER} />

        <div className={styles.mRow}>
          <MangaPhotoPanel
            src={PHOTOS[3]}
            index={3}
            isLoaded={loadedImages[3]}
            onLoad={handleImageLoad}
            badge="★"
          />
          <MangaPhotoPanel
            src={PHOTOS[4]}
            index={4}
            isLoaded={loadedImages[4]}
            onLoad={handleImageLoad}
            delay="0.15s"
            caption="Enjoying life"
          />
          <MangaTextPanel
            chapter={MANGA.CHAPTER_3.LABEL}
            headline={renderTitle(MANGA.CHAPTER_3.TITLE)}
            bubble={MANGA.CHAPTER_3.BUBBLE}
            className={styles.mTextPurple}
            sfx={MANGA.CHAPTER_3.SFX}
            delay="0.3s"
          />
        </div>

        <div className={styles.mRow}>
          <MangaTextPanel
            chapter={MANGA.CHAPTER_4.LABEL}
            headline={renderTitle(MANGA.CHAPTER_4.TITLE)}
            bubble={MANGA.CHAPTER_4.BUBBLE}
            className={styles.mTextGold}
            bubbleClassName={styles.bubbleGold}
            sfx={MANGA.CHAPTER_4.SFX}
          />
          <MangaPhotoPanel
            src={PHOTOS[5]}
            index={5}
            isLoaded={loadedImages[5]}
            onLoad={handleImageLoad}
            className={styles.mSpan2}
            delay="0.2s"
            num="06"
          />
        </div>

        <div className={styles.mRow}>
          <MangaPhotoPanel
            src={PHOTOS[6]}
            index={6}
            isLoaded={loadedImages[6]}
            onLoad={handleImageLoad}
            className={styles.mTall}
            delay="0.25s"
            num="07"
          />
          <MangaTextPanel
            chapter={MANGA.CHAPTER_FINAL.LABEL}
            headline={renderTitle(MANGA.CHAPTER_FINAL.TITLE)}
            bubble={MANGA.CHAPTER_FINAL.BUBBLE}
            className={styles.mTextFinal}
            bubbleClassName={styles.bubbleFinal}
            sfx={MANGA.CHAPTER_FINAL.SFX}
            isLarge
          />
        </div>

        <MangaPhotoPanel
          src={PHOTOS[7]}
          index={7}
          isLoaded={loadedImages[7]}
          onLoad={handleImageLoad}
          className={styles.mEpilogue}
        >
          <div className={styles.epilogueOverlay}>
            <p className={styles.epilogueText}>{MANGA.EPILOGUE.TITLE}</p>
            <p className={styles.epilogueSub}>{MANGA.EPILOGUE.SUBTITLE}</p>
          </div>
        </MangaPhotoPanel>
      </div>
    </section>
  );
};
