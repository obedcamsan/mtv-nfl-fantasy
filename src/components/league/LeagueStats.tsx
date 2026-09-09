import { Stat } from "@/components/ui/Stat";
import styles from "./LeagueStats.module.css";

interface LeagueStatsProps {
  teamsCount: number;
  playersCount: number;
  rounds: number;
}

export function LeagueStats({ teamsCount, playersCount, rounds }: LeagueStatsProps) {
  return (
    <div className={styles.grid}>
      <Stat value={teamsCount} label="Teams" />
      <Stat value={playersCount} label="Players" />
      <Stat value={rounds} label="Rounds" />
      <Stat value={1} label="Champion" />
    </div>
  );
}
