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
  rarity: string;
  supertype: string;
  card_type: string;
  collectible: boolean;
  set: string;
  associated_card_refs: string[];
  regions: string[];
  region_refs: string[];
  keywords: string[];
  keyword_refs: string[];
  formats: string[];
  format_refs: string[];
  assets: CardAsset[];
  associated_cards: AssociatedCard[];
}

export interface CardAsset {
  game_absolute_path: string;
  full_absolute_path: string;
}

export interface AssociatedCard {
  id: string;
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
  rarity: string;
  supertype: string;
  card_type: string;
  collectible: boolean;
  set: string;
  associated_card_refs: string[];
  regions: string[];
  region_refs: string[];
  keywords: string[];
  keyword_refs: string[];
  formats: string[];
  format_refs: string[];
  assets: CardAsset[];
  associated_cards: AssociatedCard[];
}
