import { Card as CardType } from "@/types/interfaces";

export default function CardImage({ card }: { card: CardType }) {
  return (
    <div className="max-w-[350px] p-3" data-test-id="search-card">
      <img
        src={card.attributes.assets[0].game_absolute_path}
        alt={`${card.attributes.name} card`}
      />
    </div>
  );
}
