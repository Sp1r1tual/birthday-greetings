import { DECOR } from "@/common/constants/assets";

import styles from "./styles/Stamp.module.css";

interface IStampProps {
  show: boolean;
}

export const Stamp = ({ show }: IStampProps) => {
  if (!show) return null;

  return (
    <div className={styles.stampWrapper}>
      <div className={styles.stamp}>
        <img src={DECOR.cake} className={styles.stampCake} alt="" aria-hidden />
        <span>З ДНЕМ НАРОДЖЕННЯ!</span>
      </div>
    </div>
  );
};
