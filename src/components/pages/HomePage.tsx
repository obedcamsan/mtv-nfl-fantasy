import { AppShell } from "@/components/layout/AppShell";
import { Section } from "@/components/layout/Section";
import { SectionHeader } from "@/components/layout/SectionHeader";
import { LeagueHero } from "@/components/league/LeagueHero";
import { LeagueStats } from "@/components/league/LeagueStats";
import { TeamsGrid } from "@/components/league/TeamsGrid";
import { ErrorState } from "@/components/league/ErrorState";
import { FirstRoundSection } from "@/components/draft/FirstRoundSection";
import { DraftBoard } from "@/components/draft/DraftBoard";
import { FranchiseGrid } from "@/components/teams/FranchiseGrid";
import { Skeleton } from "@/components/ui/Skeleton";
import { useDraft } from "@/hooks/useDraft";
import styles from "./HomePage.module.css";

export function HomePage() {
  const { league, picks, firstRound, board, loading, error, refetch } = useDraft();

  if (error) {
    return (
      <AppShell>
        <Section>
          <ErrorState onRetry={refetch} />
        </Section>
      </AppShell>
    );
  }

  if (loading || !league) {
    return (
      <AppShell>
        <Section>
          <div className={styles.loadingStack}>
            <Skeleton height="4rem" width="60%" />
            <Skeleton height="1.5rem" width="40%" />
            <Skeleton height="220px" />
          </div>
        </Section>
      </AppShell>
    );
  }

  const teamsCount = league.teams.length;
  const playersCount = picks.length;

  return (
    <AppShell>
      <LeagueHero teamsCount={teamsCount} playersCount={playersCount} rounds={league.rounds} />

      <Section>
        <SectionHeader eyebrow="The League" title={`${teamsCount} EQUIPOS ENTRARON AL DRAFT.`} />
        <LeagueStats teamsCount={teamsCount} playersCount={playersCount} rounds={league.rounds} />
      </Section>

      <Section id="teams">
        <SectionHeader
          eyebrow="Franchises"
          title="LOS EQUIPOS"
          description="Diez managers. Diez estrategias distintas. Un solo Draft."
        />
        <TeamsGrid teams={league.teams} picks={picks} players={league.players} />
      </Section>

      <Section id="first-round">
        <SectionHeader eyebrow="On the Clock" title="THE FIRST ROUND" />
        <FirstRoundSection picks={firstRound} teams={league.teams} players={league.players} />
      </Section>

      <Section id="rosters">
        <SectionHeader eyebrow="Rosters" title="CADA FRANQUICIA, PICK POR PICK" />
        <FranchiseGrid teams={league.teams} picks={picks} players={league.players} />
      </Section>

      <Section id="draft-board">
        <SectionHeader
          eyebrow="The Board"
          title="DRAFT BOARD"
          description={`${league.rounds} rondas × ${teamsCount} draft slots.`}
        />
        <DraftBoard board={board} teams={league.teams} players={league.players} />
      </Section>

      <Section bleed>
        <div className={styles.finalSection}>
          <div className={styles.finalInner}>
            <p className={`text-display-md ${styles.finalKicker}`}>140 PICKS LATER...</p>
            <h2 className={`text-display-lg ${styles.finalTitle}`}>THE ROSTERS ARE SET.</h2>

            <p className={`text-body ${styles.finalCopy}`}>
              El Draft terminó.
              <br />
              Las estrategias están definidas.
              <br />
              Los sleepers fueron encontrados.
              <br />
              Las estrellas ya tienen dueño.
              <br />
              Ahora cada touchdown, cada recepción, cada yarda y cada field goal empieza a contar.
            </p>

            <div className={styles.finalClose}>
              <p className={`text-display-md ${styles.finalWordmark}`}>MTV LEAGUE NFL FANTASY 2026</p>
              <p className="text-body">
                {teamsCount} equipos.
                <br />
                {league.rounds} semanas de decisiones.
                <br />
                Un solo campeón.
              </p>
              <p className={`text-display-lg ${styles.finalCta}`}>LET THE GAMES BEGIN.</p>
            </div>
          </div>
        </div>
      </Section>
    </AppShell>
  );
}
