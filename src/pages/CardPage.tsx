import CardAssociated from "@/components/CardAssociated";
import CardFull from "@/components/CardFull";
import { CardAttributes } from "@/types/interfaces";
import { getCard } from "@/utils/apiCalls";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CardActions from "@/components/CardActions";


export default function CardPage() {
  const { code } = useParams<{ code: string }>();
  const [card, setCard] = useState<CardAttributes | null>(null);

  useEffect(() => {
    if (!code) return;
    else getCard(code).then((data) => setCard(data.data.attributes));
  }, [code]);

  return (
    <div className="relative flex flex-col items-center">
      {!card ? (
        <p>Loading...</p>
      ) : (
        <>
          <div className="p-4 flex flex-col items-center md:flex-row md:items-start md:justify-center md:space-x-40">
            <CardFull card={card} />
            <div className="items-center md:ml-4 md:mt-0 mt-4">
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