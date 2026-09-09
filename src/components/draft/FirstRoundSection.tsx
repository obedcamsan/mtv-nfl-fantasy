import { HorizontalScroller } from "@/components/ui/HorizontalScroller";
import { FirstRoundCard } from "./FirstRoundCard";
import type { DraftPick, FantasyTeam, Player } from "@/types/league";
import styles from "./FirstRoundSection.module.css";

interface FirstRoundSectionProps {
  picks: DraftPick[];
  teams: FantasyTeam[];
  players: Player[];
}

export function FirstRoundSection({ picks, teams, players }: FirstRoundSectionProps) {
  if (picks.length === 0) {
    return <p className="text-body">La primera ronda aún no está disponible.</p>;
  }

  const teamsById = new Map(teams.map((team) => [team.id, team]));
  const playersById = new Map(players.map((player) => [player.id, player]));

  return (
    <HorizontalScroller ariaLabel="Selecciones de la primera ronda">
      {picks.map((pick, index) => {
        const team = teamsById.get(pick.teamId);
        const player = playersById.get(pick.playerId);
        if (!team || !player) return null;

        return (
          <div key={pick.id} className={styles.item}>
            <FirstRoundCard pick={pick} player={player} team={team} priority={index < 5} />
          </div>
        );
      })}
    </HorizontalScroller>
  );
}
