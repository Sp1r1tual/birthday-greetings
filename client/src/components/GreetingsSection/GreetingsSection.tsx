import { useState, useRef, useEffect, useCallback } from "react";

import { GreetingsSkeleton } from "./GreetingsSkeleton";
import { GreetingsForm } from "./GreetingsForm";

import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchGreetings } from "@/store/greetings/greetingsThunks";
import {
  selectGreetings,
  selectIsSending,
  selectGreetingsError,
  selectIsLoading,
  selectIsFallback,
} from "@/store/greetings/selectors";

import { formatGreetingsTime } from "@/common/utils/formatGreetingsTime";
import { formatGreetingsCount } from "@/common/utils/formatGreetingsCount";
import { DECOR } from "@/common/constants/assets";

import { CONTENT } from "@/common/constants/content";

import styles from "./styles/GreetingsSection.module.css";

export const GreetingsSection = () => {
  const dispatch = useAppDispatch();
  const signatures = useAppSelector(selectGreetings);
  const isLoading = useAppSelector(selectIsLoading);
  const isSending = useAppSelector(selectIsSending);
  const isFallback = useAppSelector(selectIsFallback);
  const serverError = useAppSelector(selectGreetingsError);

  const [newSigId, setNewSigId] = useState<string | null>(null);

  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const sigsEndRef = useRef<HTMLDivElement | null>(null);
  const sectionRef = useRef<HTMLElement | null>(null);
  const alertShownRef = useRef(false);

  useEffect(() => {
    dispatch(fetchGreetings());
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [dispatch]);

  // Алерт про відключену БД — лише коли секція потрапила в поле зору
  useEffect(() => {
    const el = sectionRef.current;
    if (!isFallback || alertShownRef.current || !el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !alertShownRef.current) {
          alertShownRef.current = true;
          observer.disconnect();
          alert(CONTENT.GREETINGS.DB_OFFLINE_ALERT);
        }
      },
      { threshold: 0.3 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [isFallback]);

  const handleSuccess = useCallback(
    (id: string) => {
      setNewSigId(id);
      setTimeout(
        () => sigsEndRef.current?.scrollIntoView({ behavior: "smooth" }),
        100,
      );
      if (timerRef.current) clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => setNewSigId(null), 2000);
    },
    [setNewSigId],
  );

  return (
    <section ref={sectionRef} className={styles.greetingsSection}>
      <div className={styles.sectionLabel}>{CONTENT.GREETINGS.SECTION_LABEL}</div>

      <div className={styles.greetingsBox}>
        <img
          src={DECOR.balloons}
          className={styles.greetingsDecorL}
          alt=""
          aria-hidden
        />
        <img
          src={DECOR.hats}
          className={styles.greetingsDecorR}
          alt=""
          aria-hidden
        />

        <h2 className={styles.greetingsTitle}>{CONTENT.GREETINGS.TITLE}</h2>
        <p className={styles.greetingsSub}>
          {CONTENT.GREETINGS.SUBTITLE}
        </p>

        <GreetingsForm
          isSending={isSending}
          serverError={serverError}
          onSuccess={handleSuccess}
        />

        <div className={styles.signaturesGrid}>
          {isLoading ? (
            <GreetingsSkeleton />
          ) : (
            signatures.map((sig, i) => (
              <div
                key={sig._id}
                className={`${styles.sigCard} ${sig._id === newSigId ? styles.newSig : ""}`}
              >
                <div className={styles.sigCardHeader}>
                  <span className={styles.sigNum}>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className={styles.sigName}>{sig.name}</span>
                  <span className={styles.sigCity}>· {sig.city}</span>
                  <span className={styles.sigTime}>
                    {formatGreetingsTime(sig.createdAt)}
                  </span>
                </div>
                <p className={styles.sigWish}>{sig.greetings}</p>
              </div>
            ))
          )}
          <div ref={sigsEndRef} />
        </div>

        <p className={styles.sigCount}>
          {isLoading
            ? CONTENT.GREETINGS.COUNT_LOADING
            : formatGreetingsCount(signatures.length)}
        </p>
      </div>
    </section>
  );
};
