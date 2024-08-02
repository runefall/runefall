export type SortMode = "image" | "text" | "full" | "list";

export type SortAttribute =
  | "name"
  | "card_type"
  | "cost"
  | "attack"
  | "health"
  | "set"
  | "rarity"
  | "region"
  | "artist_name"
  | "card_code";

export type SortDirection = "auto" | "ascending" | "descending";

export type Rarity = "None" | "COMMON" | "RARE" | "EPIC" | "Champion";
