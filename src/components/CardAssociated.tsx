import { CardAttributes } from "@/types/interfaces";
import { Link } from "react-router-dom";

export default function CardAssociated({
  associatedCards,
}: {
  associatedCards: CardAttributes[];
}) {
  const associatedCardElements = associatedCards.map((card) => (
    <Link
      key={card.card_code}
      className="related-card"
      to={`/card/${card.card_code}`}
    >
      <img
        src={card.assets[0].gameAbsolutePath}
        alt={card.name}
        className="h-auto w-48 rounded-lg drop-shadow-lg"
      />
    </Link>
  ));

  return (
    <div className="mt-8 w-full border-t border-border p-4">
      <h3 className="mb-4 text-2xl font-bold">RELATED CARDS</h3>
      <div className="flex gap-4 overflow-x-auto">{associatedCardElements}</div>
    </div>
  );
}
