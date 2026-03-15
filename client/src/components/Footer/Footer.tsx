import { CONTENT } from "@/common/constants/content";

import gmailIcon from "@/assets/contacts/gmail-svgrepo-com.svg";
import telegramIcon from "@/assets/contacts/telegram-svgrepo-com.svg";

import styles from "./styles/Footer.module.css";

export const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.topSection}>
        <p className={styles.chronicles}>{CONTENT.FOOTER.CHRONICLES}</p>
        <p className={styles.footerSub}>{CONTENT.FOOTER.SUBTITLE}</p>
      </div>

      <div className={styles.bottomSection}>
        <div className={styles.contactWrapper}>
          <p className={styles.contactTitle}>Замовити персоналізоване привітання:</p>
          <div className={styles.contactIcons}>
            <a
              href="https://t.me/Sp1r1tual5"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.contactLink}
              title="Telegram"
            >
              <img src={telegramIcon} alt="Telegram" className={styles.icon} />
              <span className={styles.contactName}>Telegram</span>
            </a>
            <a
              href="mailto:andrii0383@gmail.com"
              className={styles.contactLink}
              title="Email"
            >
              <img src={gmailIcon} alt="Email" className={styles.icon} />
              <span className={styles.contactName}>Gmail</span>
            </a>
          </div>
        </div>

        <a
          className={styles.footerLink}
          href="https://github.com/Sp1r1tual/birthday-greetings"
          target="_blank"
          rel="noopener noreferrer"
        >
          {CONTENT.FOOTER.GITHUB_LINK}
        </a>
      </div>
    </footer>
  );
};
