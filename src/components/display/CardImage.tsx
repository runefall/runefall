import { CardAttributes } from "@/types/interfaces";

export default function CardImage({ card }: { card: CardAttributes }) {
  // charles please think of something better later
  return (
    <div data-test-id="search-card">
      <img
        src={card.assets[0].gameAbsolutePath.replace("http", "https")}
        alt={`${card.name} card`}
      />
    </div>
  );
}
