import { CardAttributes } from "@/types/interfaces";

export default function CardImage({ card }: { card: CardAttributes }) {
  return (
    <div data-test-id="search-card">
      <img src={card.assets[0].gameAbsolutePath} alt={`${card.name} card`} />
    </div>
  );
}
