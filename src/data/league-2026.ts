import type { FantasyTeam, League, Player, Position } from "@/types/league";
import { normalizeDraftPicks, type RawDraftPick } from "@/lib/draft/normalize";
import { generatePlayerId } from "@/lib/utils/players";

export const teams: FantasyTeam[] = [
  {
    id: "raizsonica",
    slug: "raizsonica",
    draftPosition: 1,
    name: "Raizsonica",
    manager: "MikeMawi",
  },
  {
    id: "jackass",
    slug: "jackass",
    draftPosition: 2,
    name: "Jackass",
    manager: "Captbocanegra93",
  },
  {
    id: "morgendorffer",
    slug: "morgendorffer",
    draftPosition: 3,
    name: "Morgendorffer",
    manager: "MauriMaldonado",
  },
  {
    id: "mills-lanes-referees",
    slug: "mills-lanes-referees",
    draftPosition: 4,
    name: "Mills Lane's Referees",
    manager: "GodslambCS93",
  },
  {
    id: "xzibit",
    slug: "xzibit",
    draftPosition: 5,
    name: "Xzibit",
    manager: "Navatars",
  },
  {
    id: "omg-they-nixed-kenny",
    slug: "omg-they-nixed-kenny",
    draftPosition: 6,
    name: "OMG! They Nixed Kenny!",
    manager: "marky177",
  },
  {
    id: "mueble-o-algo",
    slug: "mueble-o-algo",
    draftPosition: 7,
    name: "Mueble O'Algo",
    manager: "FerRoz",
  },
  {
    id: "ridiculousness",
    slug: "ridiculousness",
    draftPosition: 8,
    name: "Ridiculousness",
    manager: "March83",
  },
  {
    id: "hijos-de-puta",
    slug: "hijos-de-puta",
    draftPosition: 9,
    name: "HIJOS DE PUTA",
    manager: "DaveTheBrewer",
  },
  {
    id: "knoxvilles-bigredrockets",
    slug: "knoxvilles-bigredrockets",
    draftPosition: 10,
    name: "Knoxville's BigRedRockets",
    manager: "andres3gtz",
  },
];

/** [displayPick, playerDisplayName, position, nflTeam] as delivered by the league. */
type SourcePick = [string, string, Position, string];

const rosterSource: Record<string, SourcePick[]> = {
  raizsonica: [
    ["1.01", "J. Gibbs", "RB", "DET"],
    ["2.10", "B. Bowers", "TE", "LV"],
    ["3.01", "A. Jeanty", "RB", "LV"],
    ["4.10", "D. Maye", "QB", "NE"],
    ["5.01", "L. McConkey", "WR", "LAC"],
    ["6.10", "Houston Texans", "DEF", "HOU"],
    ["7.01", "M. Evans", "WR", "SF"],
    ["8.10", "B. Nix", "QB", "DEN"],
    ["9.01", "J. Dobbins", "RB", "DEN"],
    ["10.10", "M. Wilson", "WR", "ARI"],
    ["11.01", "K. Fairbairn", "K", "HOU"],
    ["12.10", "H. Henry", "TE", "NE"],
    ["13.01", "S. Diggs", "WR", "WAS"],
    ["14.10", "T. Tucker", "WR", "LV"],
  ],
  jackass: [
    ["1.02", "P. Nacua", "WR", "LAR"],
    ["2.09", "J. Allen", "QB", "BUF"],
    ["3.02", "G. Pickens", "WR", "DAL"],
    ["4.09", "T. Etienne", "RB", "NO"],
    ["5.02", "B. Aubrey", "K", "DAL"],
    ["6.09", "Q. Judkins", "RB", "CLE"],
    ["7.02", "T. Kraft", "TE", "GB"],
    ["8.09", "Seattle Seahawks", "DEF", "SEA"],
    ["9.02", "P. Washington", "WR", "JAX"],
    ["10.09", "J. Ferguson", "TE", "DAL"],
    ["11.02", "P. Mahomes", "QB", "KC"],
    ["12.09", "J. Tyson", "WR", "NO"],
    ["13.02", "K. Monangai", "RB", "CHI"],
    ["14.09", "J. Downs", "WR", "IND"],
  ],
  morgendorffer: [
    ["1.03", "B. Robinson", "RB", "ATL"],
    ["2.08", "O. Hampton", "RB", "LAC"],
    ["3.03", "A. Brown", "WR", "NE"],
    ["4.08", "R. Rice", "WR", "KC"],
    ["5.03", "C. Loveland", "TE", "CHI"],
    ["6.08", "J. Burrow", "QB", "CIN"],
    ["7.03", "T. McLaurin", "WR", "WAS"],
    ["8.08", "R. Odunze", "WR", "CHI"],
    ["9.03", "B. Thomas", "WR", "JAX"],
    ["10.08", "C. Hubbard", "RB", "CAR"],
    ["11.03", "B. Corum", "RB", "LAR"],
    ["12.08", "H. Mevis", "K", "LAR"],
    ["13.03", "M. Lemon", "WR", "PHI"],
    ["14.08", "Detroit Lions", "DEF", "DET"],
  ],
  "mills-lanes-referees": [
    ["1.04", "J. Chase", "WR", "CIN"],
    ["2.07", "K. Williams", "RB", "LAR"],
    ["3.04", "J. Williams", "RB", "DAL"],
    ["4.07", "S. LaPorta", "TE", "DET"],
    ["5.04", "D. Adams", "WR", "LAR"],
    ["6.07", "J. Price", "RB", "SEA"],
    ["7.04", "J. Williams", "WR", "DET"],
    ["8.07", "T. Pollard", "RB", "TEN"],
    ["9.04", "C. Sutton", "WR", "DEN"],
    ["10.07", "D. Kincaid", "TE", "BUF"],
    ["11.04", "M. Stafford", "QB", "LAR"],
    ["12.07", "C. Boswell", "K", "PIT"],
    ["13.04", "New England Patriots", "DEF", "NE"],
    ["14.07", "J. Mason", "RB", "MIN"],
  ],
  xzibit: [
    ["1.05", "J. Taylor", "RB", "IND"],
    ["2.06", "J. Jefferson", "WR", "MIN"],
    ["3.05", "N. Collins", "WR", "HOU"],
    ["4.06", "J. Waddle", "WR", "DEN"],
    ["5.05", "T. McMillan", "WR", "CAR"],
    ["6.06", "D. Montgomery", "RB", "HOU"],
    ["7.05", "T. Warren", "TE", "IND"],
    ["8.06", "R. Harvey", "RB", "DEN"],
    ["9.05", "R. Dowdle", "RB", "PIT"],
    ["10.06", "C. Godwin", "WR", "TB"],
    ["11.05", "T. Kelce", "TE", "KC"],
    ["12.06", "J. Herbert", "QB", "LAC"],
    ["13.05", "Baltimore Ravens", "DEF", "BAL"],
    ["14.06", "H. Butker", "K", "KC"],
  ],
  "omg-they-nixed-kenny": [
    ["1.06", "J. Cook", "RB", "BUF"],
    ["2.05", "S. Barkley", "RB", "PHI"],
    ["3.06", "T. McBride", "TE", "ARI"],
    ["4.05", "T. Higgins", "WR", "CIN"],
    ["5.06", "Z. Flowers", "WR", "BAL"],
    ["6.05", "C. Skattebo", "RB", "NYG"],
    ["7.06", "J. Jacobs", "RB", "GB"],
    ["8.05", "L. Burden", "WR", "CHI"],
    ["9.06", "J. Hurts", "QB", "PHI"],
    ["10.05", "Denver Broncos", "DEF", "DEN"],
    ["11.06", "A. Pierce", "WR", "IND"],
    ["12.05", "J. Myers", "K", "SEA"],
    ["13.06", "J. Brooks", "RB", "CAR"],
    ["14.05", "T. Lawrence", "QB", "JAX"],
  ],
  "mueble-o-algo": [
    ["1.07", "C. McCaffrey", "RB", "SF"],
    ["2.04", "D. London", "WR", "ATL"],
    ["3.07", "C. Olave", "WR", "NO"],
    ["4.04", "B. Irving", "RB", "TB"],
    ["5.07", "D. Samuel", "WR", "SF"],
    ["6.04", "K. Murray", "QB", "MIN"],
    ["7.07", "G. Kittle", "TE", "SF"],
    ["8.04", "R. Stevenson", "RB", "NE"],
    ["9.07", "Los Angeles Rams", "DEF", "LAR"],
    ["10.04", "C. Little", "K", "JAX"],
    ["11.07", "J. Addison", "WR", "MIN"],
    ["12.04", "B. Allen", "RB", "NYJ"],
    ["13.07", "Q. Johnston", "WR", "LAC"],
    ["14.04", "B. Young", "QB", "CAR"],
  ],
  ridiculousness: [
    ["1.08", "J. Smith-Njigba", "WR", "SEA"],
    ["2.03", "D. Henry", "RB", "BAL"],
    ["3.08", "D. Smith", "WR", "PHI"],
    ["4.03", "D. Swift", "RB", "CHI"],
    ["5.08", "D. Schultz", "TE", "HOU"],
    ["6.03", "C. Watson", "WR", "GB"],
    ["7.08", "J. Warren", "RB", "PIT"],
    ["8.03", "X. Worthy", "WR", "KC"],
    ["9.08", "D. Prescott", "QB", "DAL"],
    ["10.03", "Philadelphia Eagles", "DEF", "PHI"],
    ["11.08", "K. Gainwell", "RB", "TB"],
    ["12.03", "J. Bates", "K", "DET"],
    ["13.08", "R. Doubs", "WR", "NE"],
    ["14.03", "M. Andrews", "TE", "BAL"],
  ],
  "hijos-de-puta": [
    ["1.09", "A. St. Brown", "WR", "DET"],
    ["2.02", "D. Achane", "RB", "MIA"],
    ["3.09", "K. Walker", "RB", "KC"],
    ["4.02", "L. Jackson", "QB", "BAL"],
    ["5.09", "E. Egbuka", "WR", "TB"],
    ["6.02", "G. Wilson", "WR", "NYJ"],
    ["7.09", "H. Fannin", "TE", "CLE"],
    ["8.02", "T. Henderson", "RB", "NE"],
    ["9.09", "J. Dart", "QB", "NYG"],
    ["10.02", "D. Metcalf", "WR", "PIT"],
    ["11.09", "D. Stribling", "WR", "SF"],
    ["12.02", "D. Goedert", "TE", "PHI"],
    ["13.09", "Pittsburgh Steelers", "DEF", "PIT"],
    ["14.02", "W. Reichard", "K", "MIN"],
  ],
  "knoxvilles-bigredrockets": [
    ["1.10", "C. Lamb", "WR", "DAL"],
    ["2.01", "C. Brown", "RB", "CIN"],
    ["3.10", "M. Nabers", "WR", "NYG"],
    ["4.01", "B. Hall", "RB", "NYJ"],
    ["5.10", "J. Love", "RB", "ARI"],
    ["6.01", "D. Moore", "WR", "BUF"],
    ["7.10", "B. Tuten", "RB", "JAX"],
    ["8.01", "C. Williams", "QB", "CHI"],
    ["9.10", "K. Pitts", "TE", "ATL"],
    ["10.01", "M. Harrison", "WR", "ARI"],
    ["11.10", "C. Tate", "WR", "TEN"],
    ["12.01", "C. Dicker", "K", "LAC"],
    ["13.10", "Green Bay Packers", "DEF", "GB"],
    ["14.01", "J. Daniels", "QB", "WAS"],
  ],
};

/**
 * Sleeper avatar ids, keyed by our internal player id (name+team+position —
 * see generatePlayerId), sourced from the league's Sleeper draft export.
 * Team defenses aren't included: Sleeper's export uses different team-name
 * conventions for DEF entries and DEF cards never show a photo anyway
 * (see DefenseCard).
 */
const SLEEPER_AVATAR_IDS: Record<string, string> = {
  "j-gibbs-det-rb": "9221", // J. Gibbs
  "b-bowers-lv-te": "11604", // B. Bowers
  "a-jeanty-lv-rb": "12527", // A. Jeanty
  "d-maye-ne-qb": "11564", // D. Maye
  "l-mcconkey-lac-wr": "11635", // L. McConkey
  "m-evans-sf-wr": "2216", // M. Evans
  "b-nix-den-qb": "11563", // B. Nix
  "j-dobbins-den-rb": "6806", // J. Dobbins
  "m-wilson-ari-wr": "10232", // M. Wilson
  "k-fairbairn-hou-k": "3451", // K. Fairbairn
  "h-henry-ne-te": "3214", // H. Henry
  "s-diggs-was-wr": "2449", // S. Diggs
  "t-tucker-lv-wr": "10213", // T. Tucker
  "p-nacua-lar-wr": "9493", // P. Nacua
  "j-allen-buf-qb": "4984", // J. Allen
  "g-pickens-dal-wr": "8137", // G. Pickens
  "t-etienne-no-rb": "7543", // T. Etienne
  "b-aubrey-dal-k": "11533", // B. Aubrey
  "q-judkins-cle-rb": "12512", // Q. Judkins
  "t-kraft-gb-te": "9484", // T. Kraft
  "p-washington-jax-wr": "9487", // P. Washington
  "j-ferguson-dal-te": "8110", // J. Ferguson
  "p-mahomes-kc-qb": "4046", // P. Mahomes
  "j-tyson-no-wr": "13281", // J. Tyson
  "k-monangai-chi-rb": "12534", // K. Monangai
  "j-downs-ind-wr": "9500", // J. Downs
  "b-robinson-atl-rb": "9509", // B. Robinson
  "o-hampton-lac-rb": "12507", // O. Hampton
  "a-brown-ne-wr": "5859", // A. Brown
  "r-rice-kc-wr": "10229", // R. Rice
  "c-loveland-chi-te": "12517", // C. Loveland
  "j-burrow-cin-qb": "6770", // J. Burrow
  "t-mclaurin-was-wr": "5927", // T. McLaurin
  "r-odunze-chi-wr": "11620", // R. Odunze
  "b-thomas-jax-wr": "11631", // B. Thomas
  "c-hubbard-car-rb": "7594", // C. Hubbard
  "b-corum-lar-rb": "11586", // B. Corum
  "h-mevis-lar-k": "12015", // H. Mevis
  "m-lemon-phi-wr": "13294", // M. Lemon
  "j-chase-cin-wr": "7564", // J. Chase
  "k-williams-lar-rb": "8150", // K. Williams
  "j-williams-dal-rb": "7588", // J. Williams (Javonte)
  "s-laporta-det-te": "10859", // S. LaPorta
  "d-adams-lar-wr": "2133", // D. Adams
  "j-price-sea-rb": "13286", // J. Price
  "j-williams-det-wr": "8148", // J. Williams (Jameson)
  "t-pollard-ten-rb": "5967", // T. Pollard
  "c-sutton-den-wr": "5045", // C. Sutton
  "d-kincaid-buf-te": "10236", // D. Kincaid
  "m-stafford-lar-qb": "421", // M. Stafford
  "c-boswell-pit-k": "1945", // C. Boswell
  "j-mason-min-rb": "8408", // J. Mason
  "j-taylor-ind-rb": "6813", // J. Taylor
  "j-jefferson-min-wr": "6794", // J. Jefferson
  "n-collins-hou-wr": "7569", // N. Collins
  "j-waddle-den-wr": "7526", // J. Waddle
  "t-mcmillan-car-wr": "12526", // T. McMillan
  "d-montgomery-hou-rb": "5892", // D. Montgomery
  "t-warren-ind-te": "12518", // T. Warren
  "r-harvey-den-rb": "12489", // R. Harvey
  "r-dowdle-pit-rb": "7021", // R. Dowdle
  "c-godwin-tb-wr": "4037", // C. Godwin
  "t-kelce-kc-te": "1466", // T. Kelce
  "j-herbert-lac-qb": "6797", // J. Herbert
  "h-butker-kc-k": "4227", // H. Butker
  "j-cook-buf-rb": "8138", // J. Cook
  "s-barkley-phi-rb": "4866", // S. Barkley
  "t-mcbride-ari-te": "8130", // T. McBride
  "t-higgins-cin-wr": "6801", // T. Higgins
  "z-flowers-bal-wr": "9997", // Z. Flowers
  "c-skattebo-nyg-rb": "12481", // C. Skattebo
  "j-jacobs-gb-rb": "5850", // J. Jacobs
  "l-burden-chi-wr": "12519", // L. Burden
  "j-hurts-phi-qb": "6904", // J. Hurts
  "a-pierce-ind-wr": "8142", // A. Pierce
  "j-myers-sea-k": "2747", // J. Myers
  "j-brooks-car-rb": "11583", // J. Brooks
  "t-lawrence-jax-qb": "7523", // T. Lawrence
  "c-mccaffrey-sf-rb": "4034", // C. McCaffrey
  "d-london-atl-wr": "8112", // D. London
  "c-olave-no-wr": "8144", // C. Olave
  "b-irving-tb-rb": "11584", // B. Irving
  "d-samuel-sf-wr": "5872", // D. Samuel
  "k-murray-min-qb": "5849", // K. Murray
  "g-kittle-sf-te": "4217", // G. Kittle
  "r-stevenson-ne-rb": "7611", // R. Stevenson
  "c-little-jax-k": "11786", // C. Little
  "j-addison-min-wr": "9756", // J. Addison
  "b-allen-nyj-rb": "11576", // B. Allen
  "q-johnston-lac-wr": "9754", // Q. Johnston
  "b-young-car-qb": "9228", // B. Young
  "j-smith-njigba-sea-wr": "9488", // J. Smith-Njigba
  "d-henry-bal-rb": "3198", // D. Henry
  "d-smith-phi-wr": "7525", // D. Smith
  "d-swift-chi-rb": "6790", // D. Swift
  "d-schultz-hou-te": "5001", // D. Schultz
  "c-watson-gb-wr": "8167", // C. Watson
  "j-warren-pit-rb": "8228", // J. Warren
  "x-worthy-kc-wr": "11624", // X. Worthy
  "d-prescott-dal-qb": "3294", // D. Prescott
  "k-gainwell-tb-rb": "7567", // K. Gainwell
  "j-bates-det-k": "11539", // J. Bates
  "r-doubs-ne-wr": "8121", // R. Doubs
  "m-andrews-bal-te": "5012", // M. Andrews
  "a-st-brown-det-wr": "7547", // A. St. Brown
  "d-achane-mia-rb": "9226", // D. Achane
  "k-walker-kc-rb": "8151", // K. Walker
  "l-jackson-bal-qb": "4881", // L. Jackson
  "e-egbuka-tb-wr": "12514", // E. Egbuka
  "g-wilson-nyj-wr": "8146", // G. Wilson
  "h-fannin-cle-te": "12506", // H. Fannin
  "t-henderson-ne-rb": "12529", // T. Henderson
  "j-dart-nyg-qb": "12508", // J. Dart
  "d-metcalf-pit-wr": "5846", // D. Metcalf
  "d-stribling-sf-wr": "13417", // D. Stribling
  "d-goedert-phi-te": "5022", // D. Goedert
  "w-reichard-min-k": "11792", // W. Reichard
  "c-lamb-dal-wr": "6786", // C. Lamb
  "c-brown-cin-rb": "9224", // C. Brown
  "m-nabers-nyg-wr": "11632", // M. Nabers
  "b-hall-nyj-rb": "8155", // B. Hall
  "j-love-ari-rb": "13287", // J. Love
  "d-moore-buf-wr": "4983", // D. Moore
  "b-tuten-jax-rb": "12490", // B. Tuten
  "c-williams-chi-qb": "11560", // C. Williams
  "k-pitts-atl-te": "7553", // K. Pitts
  "m-harrison-ari-wr": "11628", // M. Harrison
  "c-tate-ten-wr": "13279", // C. Tate
  "c-dicker-lac-k": "8259", // C. Dicker
  "j-daniels-was-qb": "11566", // J. Daniels
};

const playersById = new Map<string, Player>();
const rawPicks: RawDraftPick[] = [];

for (const team of teams) {
  const sourcePicks = rosterSource[team.id];

  for (const [displayPick, displayName, position, nflTeam] of sourcePicks) {
    const playerId = generatePlayerId(displayName, nflTeam, position);

    if (!playersById.has(playerId)) {
      playersById.set(playerId, {
        id: playerId,
        sleeperId: SLEEPER_AVATAR_IDS[playerId] ?? null,
        displayName,
        position,
        nflTeam,
      });
    }

    rawPicks.push({ displayPick, teamId: team.id, playerId });
  }
}

export const players: Player[] = Array.from(playersById.values());

export const picks = normalizeDraftPicks(rawPicks, teams.length);

export const league: League = {
  id: "mtv-league-2026",
  name: "MTV League",
  season: 2026,
  rounds: 14,
  teams,
  players,
  picks,
};
