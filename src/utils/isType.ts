import { SortAttribute, SortDirection, SortMode } from "@/types/types";

export function isSortDirectionType(
  keyInput: string,
): keyInput is SortDirection {
  return ["auto", "ascending", "descending"].includes(keyInput);
}

export function isSortModeType(keyInput: string): keyInput is SortMode {
  return ["image", "text", "full", "list"].includes(keyInput);
}

export function isSortAttributeType(
  keyInput: string,
): keyInput is SortAttribute {
  return [
    "name",
    "card_type",
    "cost",
    "attack",
    "health",
    "set",
    "rarity",
    "region_refs",
    "artist_name",
    "card_code",
  ].includes(keyInput);
}
