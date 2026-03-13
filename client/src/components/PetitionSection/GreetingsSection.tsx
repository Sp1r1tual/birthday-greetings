import { useState, useRef, useEffect, useCallback } from "react";

import { GreetingsSkeleton } from "./GreetingsSkeleton";

import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  fetchGreetings,
  sendGreeting,
} from "@/store/greetings/greetingsThunks";
import {
  selectGreetings,
  selectIsSending,
  selectGreetingsError,
  selectIsLoading,
} from "@/store/greetings/selectors";

import { formatGreetingsTime } from "@/common/utils/formatGreetingsTime";
import { formatGreetingsCount } from "@/common/utils/formatGreetingsCount";
import { DECOR } from "@/common/constants/assets";

import styles from "./styles/GreetingsSection.module.css";

export const GreetingsSection = () => {
  const dispatch = useAppDispatch();
  const signatures = useAppSelector(selectGreetings);
  const isLoading = useAppSelector(selectIsLoading);
  const isSending = useAppSelector(selectIsSending);
  const serverError = useAppSelector(selectGreetingsError);

  const [name, setName] = useState("");
  const [city, setCity] = useState("");
  const [greetings, setGreetings] = useState("");
  const [newSigId, setNewSigId] = useState<string | null>(null);
  const [errors, setErrors] = useState({
    name: false,
    city: false,
    greetings: false,
  });

  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const sigsEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    dispatch(fetchGreetings());
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [dispatch]);

  const handleSign = useCallback(async () => {
    if (navigator.vibrate) navigator.vibrate(30);

    const trimmedName = name.trim();
    const trimmedCity = city.trim();
    const trimmedGreetings = greetings.trim();

    const newErrors = {
      name: !trimmedName,
      city: !trimmedCity,
      greetings: !trimmedGreetings,
    };
    setErrors(newErrors);
    if (newErrors.name || newErrors.city || newErrors.greetings) return;

    const result = await dispatch(
      sendGreeting({
        name: trimmedName,
        city: trimmedCity,
        greetings: trimmedGreetings,
      }),
    );

    if (sendGreeting.fulfilled.match(result)) {
      setNewSigId(result.payload._id);
      setName("");
      setCity("");
      setGreetings("");
      setErrors({ name: false, city: false, greetings: false });
      setTimeout(
        () => sigsEndRef.current?.scrollIntoView({ behavior: "smooth" }),
        100,
      );
      if (timerRef.current) clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => setNewSigId(null), 2000);
    }
  }, [name, city, greetings, dispatch]);

  return (
    <section className={styles.greetingsSection}>
      <div className={styles.sectionLabel}>◆ КНИГА ПОБАЖАНЬ ◆</div>

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

        <h2 className={styles.greetingsTitle}>ЗАЛИШ ПОБАЖАННЯ</h2>
        <p className={styles.greetingsSub}>
          Твій запис стане частиною цієї глави назавжди
        </p>

        <div className={styles.greetingsForm}>
          <div className={styles.greetingsRow}>
            <div className={styles.greetingsField}>
              <label htmlFor="greetings-name" className={styles.greetingsLabel}>
                ІМ'Я
              </label>
              <input
                id="greetings-name"
                name="greetings-name"
                className={`${styles.greetingsInput} ${errors.name ? styles.inputError : ""}`}
                type="text"
                placeholder="Як тебе звати?"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  if (errors.name) setErrors((p) => ({ ...p, name: false }));
                }}
                maxLength={40}
              />
            </div>
            <div className={styles.greetingsField}>
              <label htmlFor="greetings-city" className={styles.greetingsLabel}>
                МІСТО
              </label>
              <input
                id="greetings-city"
                name="greetings-city"
                className={`${styles.greetingsInput} ${errors.city ? styles.inputError : ""}`}
                type="text"
                placeholder="Звідки ти?"
                value={city}
                onChange={(e) => {
                  setCity(e.target.value);
                  if (errors.city) setErrors((p) => ({ ...p, city: false }));
                }}
                maxLength={30}
              />
            </div>
          </div>

          <div className={styles.greetingsField}>
            <label htmlFor="greetings-wish" className={styles.greetingsLabel}>
              ПОБАЖАННЯ
            </label>
            <textarea
              id="greetings-wish"
              name="greetings-wish"
              className={`${styles.greetingsTextarea} ${errors.greetings ? styles.inputError : ""}`}
              placeholder="Напиши щось особливе для іменинника..."
              value={greetings}
              onChange={(e) => {
                setGreetings(e.target.value);
                if (errors.greetings)
                  setErrors((p) => ({ ...p, greetings: false }));
              }}
              maxLength={200}
              rows={3}
            />
            <div className={styles.wishCounter}>{greetings.length}/200</div>
          </div>

          {serverError && !isLoading && (
            <p className={styles.serverError}>{serverError}</p>
          )}

          <button
            className={styles.greetingsButton}
            onClick={handleSign}
            disabled={isSending}
          >
            {isSending ? "НАДСИЛАННЯ..." : "НАДІСЛАТИ ★"}
          </button>
        </div>

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
            ? "Йде завантаження..."
            : formatGreetingsCount(signatures.length)}
        </p>
      </div>
    </section>
  );
};
