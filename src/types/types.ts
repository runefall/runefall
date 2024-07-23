export type DisplayMode = "image" | "text" | "full" | "list";

export type SortAttribute =
  | "name"
  | "card_type"
  | "cost"
  | "attack"
  | "health"
  | "set"
  | "rarity"
  | "region_refs"
  | "artist_name"
  | "card_code";

export type SortDirection = "auto" | "ascending" | "descending";

export type Rarity = "None" | "COMMON" | "RARE" | "EPIC" | "Champion";
