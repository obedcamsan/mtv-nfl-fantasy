import { Container } from "./Container";
import styles from "./Footer.module.css";

export function Footer() {
  return (
    <footer className={styles.footer}>
      <Container>
        <div className={styles.row}>
          <span className={styles.wordmark}>MTV LEAGUE</span>
          <p className={styles.copy}>NFL Fantasy 2026 &middot; Draft Headquarters</p>
        </div>
      </Container>
    </footer>
  );
}
