import styles from "./styles/Footer.module.css";

export const Footer = () => {
  return (
    <footer className={styles.footer}>
      <p>BIRTHDAY CHRONICLES · VOL.1 · СПЕЦІАЛЬНИЙ ВИПУСК</p>

      <div className={styles.linksWrapper}>
        <p className={styles.footerSub}>Продовження y наступній главі ↓</p>

        <a
          className={styles.footerLink}
          href="https://github.com/Sp1r1tual/birthday-greetings"
          target="_blank"
          rel="noopener noreferrer"
        >
          Відкритий код на GitHub
        </a>
      </div>
    </footer>
  );
};
