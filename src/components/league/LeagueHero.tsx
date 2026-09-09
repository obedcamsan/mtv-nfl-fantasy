import { Container } from "@/components/layout/Container";
import { NoiseOverlay } from "@/components/ui/NoiseOverlay";
import styles from "./LeagueHero.module.css";

interface LeagueHeroProps {
  teamsCount: number;
  playersCount: number;
  rounds: number;
}

export function LeagueHero({ teamsCount, playersCount, rounds }: LeagueHeroProps) {
  return (
    <section className={styles.hero} aria-labelledby="hero-title">
      <NoiseOverlay />
      <div className={styles.field} aria-hidden="true" />

      <Container>
        <div className={styles.inner}>
          <p className={`text-eyebrow ${styles.eyebrow}`}>Draft Headquarters &middot; 2026</p>

          <h1 id="hero-title" className={`text-display-hero ${styles.title}`}>
            MTV LEAGUE
            <span className={styles.titleAccent}>NFL FANTASY</span>
            <span className={styles.titleYear}>2026</span>
          </h1>

          <p className={styles.tagline}>
            THE DRAFT IS OVER.
            <br />
            THE SEASON BEGINS.
          </p>

          <p className={`text-body ${styles.summary}`}>
            {teamsCount} equipos &middot; {playersCount} jugadores &middot; {rounds} rondas &middot; 1 campeón
          </p>

          <a href="#teams" className={styles.cta}>
            VER LOS EQUIPOS ↓
          </a>
        </div>
      </Container>
    </section>
  );
}
