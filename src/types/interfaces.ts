export interface Card {
  id: string;
  type: string;
  attributes: {
    assets: {
      gameAbsolutePath: string;
    }[];
    name: string;
    card_code: string;
  };
}
