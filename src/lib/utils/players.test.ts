import { describe, expect, it } from "vitest";
import { generatePlayerId, getPlayerImageUrl } from "./players";

describe("generatePlayerId", () => {
  it("builds a deterministic id from name, team, and position", () => {
    expect(generatePlayerId("J. Williams", "DAL", "RB")).toBe("j-williams-dal-rb");
  });

  it("disambiguates players with the same abbreviated name", () => {
    const a = generatePlayerId("J. Williams", "DAL", "RB");
    const b = generatePlayerId("J. Williams", "DET", "WR");
    expect(a).not.toBe(b);
  });
});

describe("getPlayerImageUrl", () => {
  it("returns null when no sleeperId is present", () => {
    expect(getPlayerImageUrl(null)).toBeNull();
  });

  it("builds the Sleeper CDN thumbnail url from a sleeperId", () => {
    expect(getPlayerImageUrl("4046")).toBe("https://sleepercdn.com/content/nfl/players/thumb/4046.jpg");
  });
});
