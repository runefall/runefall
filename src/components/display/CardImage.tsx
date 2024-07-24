import { CardAttributes } from "@/types/interfaces";

export default function CardImage({ card }: { card: CardAttributes }) {
  // charles please think of something better later
  return (
    <div data-test-id="card-image">
      <img src={card.assets[0].game_absolute_path} alt={`${card.name} card`} />
    </div>
  );
}
