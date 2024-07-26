import { CardAttributes } from "@/types/interfaces";

export default function CardImage({ card }: { card: CardAttributes }) {
  return (
    <div data-test-id="card-image">
      <img src={card.assets[0].game_absolute_path} alt={`${card.name} card`} />
    </div>
  );
}
