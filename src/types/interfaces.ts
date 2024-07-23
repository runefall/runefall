import { DisplayMode, Rarity, SortAttribute, SortDirection } from "./types";

export interface Card {
  id: string;
  type: string;
  attributes: CardAttributes;
}

export interface CardAttributes {
  name: string;
  card_code: string;
  description: string;
  description_raw: string;
  levelup_description: string;
  levelup_description_raw: string;
  flavor_text: string;
  artist_name: string;
  attack: number;
  cost: number;
  health: number;
  spell_speed: string;
  rarity: Rarity;
  supertype: string;
  card_type: string;
  collectible: boolean;
  set: string;
  associated_card_refs: string[];
  regions: string[];
  region_refs: string[];
  keywords: string[];
  keyword_refs: string[];
  formats: string[] | null;
  format_refs: string[];
  assets: {
    game_absolute_path: string;
    full_absolute_path: string;
  }[];
  associated_cards: CardAttributes[];
}

export interface FilterState {
  displayMode: DisplayMode;
  sortAttribute: SortAttribute;
  sortDirection: SortDirection;
}
