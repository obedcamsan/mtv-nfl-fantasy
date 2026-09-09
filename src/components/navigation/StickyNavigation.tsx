import { Container } from "@/components/layout/Container";
import styles from "./StickyNavigation.module.css";

const LINKS = [
  { href: "#teams", label: "Teams" },
  { href: "#first-round", label: "Round 1" },
  { href: "#rosters", label: "Rosters" },
  { href: "#draft-board", label: "Draft Board" },
];

export function StickyNavigation() {
  return (
    <nav className={styles.nav} aria-label="Navegación principal">
      <Container>
        <div className={styles.bar}>
          <a href="#top" className={styles.wordmark}>
            MTV<span className={styles.wordmarkAccent}>LEAGUE</span>
          </a>

          <ul className={styles.links}>
            {LINKS.map((link) => (
              <li key={link.href}>
                <a href={link.href} className={styles.link}>
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </nav>
  );
}
