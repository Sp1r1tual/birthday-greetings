import { useRef, useState, useEffect } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

import { PHOTOS, DECOR } from "@/common/constants/assets";
import { useAudioContext } from "@/contexts/AudioContext";

import styles from "./styles/MangaSection.module.css";

export const MangaSection = () => {
  const { playZaWarudo, isTimeStop, isSfxPlaying } = useAudioContext();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const noiseRef = useRef<number | null>(null);
  const [cooldownDuration, setCooldownDuration] = useState<string>("4s");
  const [loadedImages, setLoadedImages] = useState<Record<number, boolean>>({});

  const handleImageLoad = (index: number) => {
    setLoadedImages((prev) => ({ ...prev, [index]: true }));
  };

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

  const playNoise = (duration: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    canvas.style.opacity = "1";
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const w = canvas.width;
    const h = canvas.height;
    const imageData = ctx.createImageData(w, h);
    const data = imageData.data;

    const draw = () => {
      for (let i = 0; i < data.length; i += 4) {
        const v = Math.random() * 255;
        data[i] = v;
        data[i + 1] = v;
        data[i + 2] = v;
        data[i + 3] = 180;
      }
      ctx.putImageData(imageData, 0, 0);
      noiseRef.current = requestAnimationFrame(draw);
    };

    draw();

    setTimeout(() => {
      if (noiseRef.current) cancelAnimationFrame(noiseRef.current);
      canvas.style.opacity = "0";
    }, duration);
  };

  const handleDioClick = () => {
    if (isSfxPlaying) return;
    const duration = isTimeStop ? 1500 : 5000;
    setCooldownDuration(isTimeStop ? "1.5s" : "5s");

    document.body.style.overflow = "hidden";
    setTimeout(() => {
      document.body.style.overflow = "";
    }, duration);

    playNoise(duration);
    playZaWarudo();
  };

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

      <div className={styles.sectionLabel}>◆ ХРОНІКИ ГЕРОЯ ◆</div>

      <img
        src={DECOR.cake}
        className={styles.decorFloatCake}
        alt=""
        aria-hidden
      />
      <img
        src={DECOR.balloons}
        className={styles.decorFloatBalloons}
        alt=""
        aria-hidden
      />
      <img src={DECOR.hats} className={styles.decorFloatA} alt="" aria-hidden />
      <img
        src={DECOR.balloons}
        className={styles.decorFloatB}
        alt=""
        aria-hidden
      />
      <img
        src={DECOR.greetings}
        className={styles.decorFloatC}
        alt=""
        aria-hidden
      />
      <img
        src={DECOR.dio}
        className={`${styles.decorFloatD} ${isTimeStop ? styles.dioActive : ""} ${isSfxPlaying ? styles.dioDisabled : ""}`}
        alt="Dio"
        title={isSfxPlaying ? "" : "Za Warudo!!!"}
        onClick={handleDioClick}
        style={{ cursor: isSfxPlaying ? "default" : "pointer" }}
      />
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
          <div className={`${styles.panel} ${styles.mPhoto} ${styles.mSpan2}`}>
            {!loadedImages[0] && (
              <div className={styles.panelSkeleton}>
                <Skeleton height="100%" />
              </div>
            )}
            <img
              src={PHOTOS[0]}
              alt="фото 1"
              className={styles.panelImg}
              onLoad={() => handleImageLoad(0)}
              style={{ opacity: loadedImages[0] ? 1 : 0 }}
            />
            <div className={styles.panelNum}>01</div>
          </div>
          <div className={`${styles.panel} ${styles.mText}`}>
            <div className={styles.chLabel}>Глава I</div>
            <p className={styles.mHeadline}>
              ГОЛОВНИЙ
              <br />
              ГЕРОЙ
            </p>
            <div className={styles.bubble}>
              Багато років тому народилася людина, яка з часом стала невід'ємною
              частиною нашого життя. І ми щасливі, що знаємо її вже так давно.
            </div>
            <p className={styles.sfx}>ドドド</p>
          </div>
        </div>

        <div className={styles.mRow}>
          <div
            className={`${styles.panel} ${styles.mText} ${styles.mTextDark}`}
          >
            <div className={styles.chLabel}>Глава II</div>
            <p className={styles.mHeadline}>
              РІВЕНЬ:
              <br />
              СЕНЬЙОР
            </p>
            <div className={`${styles.bubble} ${styles.bubbleR}`}>
              Може написати складний компонент з першого разу. Але не буде —
              треба спочатку переписати архітектуру.
            </div>
          </div>
          <div className={`${styles.panel} ${styles.mPhoto}`}>
            {!loadedImages[1] && (
              <div className={styles.panelSkeleton}>
                <Skeleton height="100%" />
              </div>
            )}
            <img
              src={PHOTOS[1]}
              alt="фото 2"
              className={styles.panelImg}
              onLoad={() => handleImageLoad(1)}
              style={{ opacity: loadedImages[1] ? 1 : 0 }}
            />
            <div className={styles.panelNum}>02</div>
          </div>
          <div className={`${styles.panel} ${styles.mPhoto}`}>
            {!loadedImages[2] && (
              <div className={styles.panelSkeleton}>
                <Skeleton height="100%" />
              </div>
            )}
            <img
              src={PHOTOS[2]}
              alt="фото 3"
              className={styles.panelImg}
              onLoad={() => handleImageLoad(2)}
              style={{ opacity: loadedImages[2] ? 1 : 0 }}
            />
            <div className={styles.panelCaption}>404: bugs not found</div>
          </div>
        </div>

        <div className={styles.sfxDivider}>
          <span className={styles.sfxDividerText}>★ BIRTHDAY!!! ★</span>
        </div>

        <div className={styles.mRow}>
          <div className={`${styles.panel} ${styles.mPhoto}`}>
            {!loadedImages[3] && (
              <div className={styles.panelSkeleton}>
                <Skeleton height="100%" />
              </div>
            )}
            <img
              src={PHOTOS[3]}
              alt="фото 4"
              className={styles.panelImg}
              onLoad={() => handleImageLoad(3)}
              style={{ opacity: loadedImages[3] ? 1 : 0 }}
            />
            <div className={styles.panelBadge}>★</div>
          </div>
          <div className={`${styles.panel} ${styles.mPhoto}`}>
            {!loadedImages[4] && (
              <div className={styles.panelSkeleton}>
                <Skeleton height="100%" />
              </div>
            )}
            <img
              src={PHOTOS[4]}
              alt="фото 5"
              className={styles.panelImg}
              onLoad={() => handleImageLoad(4)}
              style={{ opacity: loadedImages[4] ? 1 : 0 }}
            />
            <div className={styles.panelCaption}>Enjoying life</div>
          </div>
          <div
            className={`${styles.panel} ${styles.mText} ${styles.mTextPurple}`}
          >
            <div className={styles.chLabel}>Глава III</div>
            <p className={styles.mHeadline}>
              ONE MORE
              <br />
              SPIN !!!
            </p>
            <div className={styles.bubble}>
              «Ще один промпт — і я пофікшу цей баг!»
            </div>
            <p className={styles.sfx}>ゴゴゴ</p>
          </div>
        </div>

        <div className={styles.mRow}>
          <div
            className={`${styles.panel} ${styles.mText} ${styles.mTextGold}`}
          >
            <div className={styles.chLabel}>Глава IV</div>
            <p className={styles.mHeadline}>
              GIT
              <br />
              PUSH -F
            </p>
            <div className={`${styles.bubble} ${styles.bubbleGold}`}>
              «Не питай що там було в продакшні. Просто знай — виправили»
            </div>
            <p className={styles.sfx}>！！！</p>
          </div>
          <div className={`${styles.panel} ${styles.mPhoto} ${styles.mSpan2}`}>
            {!loadedImages[5] && (
              <div className={styles.panelSkeleton}>
                <Skeleton height="100%" />
              </div>
            )}
            <img
              src={PHOTOS[5]}
              alt="фото 6"
              className={styles.panelImg}
              onLoad={() => handleImageLoad(5)}
              style={{ opacity: loadedImages[5] ? 1 : 0 }}
            />
            <div className={styles.panelNum}>06</div>
          </div>
        </div>

        <div className={styles.mRow}>
          <div className={`${styles.panel} ${styles.mPhoto} ${styles.mTall}`}>
            {!loadedImages[6] && (
              <div className={styles.panelSkeleton}>
                <Skeleton height="100%" />
              </div>
            )}
            <img
              src={PHOTOS[6]}
              alt="фото 7"
              className={styles.panelImg}
              onLoad={() => handleImageLoad(6)}
              style={{ opacity: loadedImages[6] ? 1 : 0 }}
            />
            <div className={styles.panelNum}>07</div>
          </div>
          <div
            className={`${styles.panel} ${styles.mText} ${styles.mTextFinal}`}
          >
            <div className={styles.chLabel}>Фінальна глава</div>
            <p className={styles.mHeadlineLg}>
              З ДНЕМ
              <br />
              НАРОДЖЕННЯ!
            </p>
            <div className={`${styles.bubble} ${styles.bubbleFinal}`}>
              Бажаємо тобі щастя, здоров'я і яскравих моментів щодня. Тепла в
              душі, маленьких чудес і моментів, які запам'ятаються назавжди, і
              щоб серце завжди знаходило привід для посмішки - навіть коли
              телефон розрядився посеред гемного REELS PULL.
            </div>
            <p className={styles.sfx}>ハッピー</p>
          </div>
        </div>

        <div className={`${styles.panel} ${styles.mEpilogue}`}>
          {!loadedImages[7] && (
            <div className={styles.panelSkeleton}>
              <Skeleton height="100%" />
            </div>
          )}
          <img
            src={PHOTOS[7]}
            alt="фото 8"
            className={styles.panelImg}
            onLoad={() => handleImageLoad(7)}
            style={{ opacity: loadedImages[7] ? 1 : 0 }}
          />
          <div className={styles.epilogueOverlay}>
            <p className={styles.epilogueText}>Продовження слідує...</p>
            <p className={styles.epilogueSub}>
              — кінець першого тому — підпишись щоб не пропустити наступний —
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
