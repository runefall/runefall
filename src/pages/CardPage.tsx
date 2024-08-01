import {
  default as CardActions,
  default as CardActions,
} from "@/components/CardActions";
import CardAssociated from "@/components/CardAssociated";
import CardFull from "@/components/display/CardFull";
import { CardAttributes } from "@/types/interfaces";
import { getCard } from "@/utils/apiCalls";
import { useEffect, useState } from "react";
import { useErrorBoundary } from "react-error-boundary";
import { useParams } from "react-router-dom";

export default function CardPage() {
  const { code } = useParams<{ code: string }>();
  const [card, setCard] = useState<CardAttributes | null>(null);
  const { showBoundary } = useErrorBoundary();

  useEffect(() => {
    if (code) {
      getCard(code)
        .then((data) => setCard(data.data.attributes))
        .catch(showBoundary);
    }
  }, [code]);

  return (
    <div className="relative flex flex-col items-center">
      {!card ? (
        <p>Loading...</p>
      ) : (
        <>
          <div className="flex flex-col items-center p-4 md:flex-row md:items-start md:justify-center md:space-x-40">
            <CardFull card={card} />
            <div className="mt-4 items-center md:ml-4 md:mt-0">
              <CardActions card={card} />
            </div>
          </div>
          {card.associated_cards.length !== 0 && (
            <CardAssociated associatedCards={card.associated_cards} />
          )}
        </>
      )}
    </div>
  );
}
