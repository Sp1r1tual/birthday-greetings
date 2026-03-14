import { useState, useCallback } from "react";

import { useAppDispatch } from "@/store/hooks";
import { sendGreeting } from "@/store/greetings/greetingsThunks";
import { CONTENT } from "@/common/constants/content";

import styles from "./styles/GreetingsSection.module.css";

interface IGreetingsFormProps {
  isSending: boolean;
  serverError: string | null;
  onSuccess: (id: string) => void;
}

export const GreetingsForm = ({
  isSending,
  serverError,
  onSuccess,
}: IGreetingsFormProps) => {
  const dispatch = useAppDispatch();
  const [name, setName] = useState("");
  const [city, setCity] = useState("");
  const [greetings, setGreetings] = useState("");
  const [errors, setErrors] = useState({
    name: false,
    city: false,
    greetings: false,
  });

  const handleSign = useCallback(async () => {
    if (navigator.vibrate) navigator.vibrate([50, 30, 50]);

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
      onSuccess(result.payload._id);
      setName("");
      setCity("");
      setGreetings("");
      setErrors({ name: false, city: false, greetings: false });
    }
  }, [name, city, greetings, dispatch, onSuccess]);

  const { FORM } = CONTENT.GREETINGS;

  return (
    <div className={styles.greetingsForm}>
      <div className={styles.greetingsRow}>
        <div className={styles.greetingsField}>
          <label htmlFor="greetings-name" className={styles.greetingsLabel}>
            {FORM.NAME_LABEL}
          </label>
          <input
            id="greetings-name"
            name="greetings-name"
            className={`${styles.greetingsInput} ${errors.name ? styles.inputError : ""}`}
            type="text"
            placeholder={FORM.NAME_PLACEHOLDER}
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
            {FORM.CITY_LABEL}
          </label>
          <input
            id="greetings-city"
            name="greetings-city"
            className={`${styles.greetingsInput} ${errors.city ? styles.inputError : ""}`}
            type="text"
            placeholder={FORM.CITY_PLACEHOLDER}
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
          {FORM.WISH_LABEL}
        </label>
        <textarea
          id="greetings-wish"
          name="greetings-wish"
          className={`${styles.greetingsTextarea} ${errors.greetings ? styles.inputError : ""}`}
          placeholder={FORM.WISH_PLACEHOLDER}
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

      {serverError && <p className={styles.serverError}>{serverError}</p>}

      <button
        className={styles.greetingsButton}
        onClick={handleSign}
        disabled={isSending}
      >
        {isSending ? FORM.SENDING_BTN : FORM.SUBMIT_BTN}
      </button>
    </div>
  );
};
