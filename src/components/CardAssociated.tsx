import { CardAttributes } from "@/types/interfaces";
import { useNavigate } from "react-router-dom";

export default function CardAssociated({
  associatedCards,
}: {
  associatedCards: CardAttributes[];
}) {
  const navigate = useNavigate();

  const associatedCardElements = associatedCards.map((card) => (
    <img
      key={card.card_code}
      src={card.assets[0].gameAbsolutePath}
      alt={card.name}
      data-test-id="associated-card"
      className="h-auto w-48 rounded-lg drop-shadow-lg hover:cursor-pointer"
      onClick={() => navigate(`/card/${card.card_code}`)}
    />
  ));

  return (
    <div className="mt-8 w-full border-t border-border p-4">
      <h3 className="mb-4 text-2xl font-bold">RELATED CARDS</h3>
      <div className="flex gap-4 overflow-x-scroll">
        {associatedCardElements}
      </div>
    </div>
  );
}
