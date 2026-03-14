import { CONTENT } from "@/common/constants/content";
import styles from "./styles/Footer.module.css";

export const Footer = () => {
  return (
    <footer className={styles.footer}>
      <p>{CONTENT.FOOTER.CHRONICLES}</p>

      <div className={styles.linksWrapper}>
        <p className={styles.footerSub}>{CONTENT.FOOTER.SUBTITLE}</p>

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
