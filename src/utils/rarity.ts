import { Rarity } from "@/types/types";

export function calculateRarity(rarity: Rarity) {
  switch (rarity.toUpperCase()) {
    default:
    case "NONE":
      return 0;
    case "COMMON":
      return 1;
    case "RARE":
      return 2;
    case "EPIC":
      return 3;
    case "CHAMPION":
      return 4;
  }
}
