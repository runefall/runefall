import CardAssociated from "@/components/CardAssociated";
import CardFull from "@/components/CardFull";
import { CardAttributes } from "@/types/interfaces";
import { getCard } from "@/utils/apiCalls";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function CardPage() {
  const { code } = useParams<{ code: string }>();
  const [card, setCard] = useState<CardAttributes | null>(null);

  useEffect(() => {
    if (!code) return;
    else getCard(code).then(setCard);
  }, [code]);

  return (
    <div className="relative flex flex-col items-center">
      {!card ? (
        <p>Loading...</p>
      ) : (
        <>
          <div className="p-4">
            <CardFull card={card} />
          </div>
          {card.associated_cards.length !== 0 && (
            <CardAssociated associatedCards={card.associated_cards} />
          )}
        </>
      )}
    </div>
  );
}
