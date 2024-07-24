import CardSearchImage from "@/components/CardImage";
import { Card as CardType } from "@/types/interfaces";
import { querySearch } from "@/utils/apiCalls";
import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { useErrorBoundary } from "react-error-boundary";


export default function SearchPage() {
  const [searchParams] = useSearchParams();
  const [cards, setCards] = useState<CardType[]>([]);
  const {showBoundary} = useErrorBoundary()

  useEffect(() => {
    const query = searchParams.get("query");
    if (!query) return;

    querySearch(query)
    .then((data) => {
      setCards(data.data);
    }).catch((error) => {
      showBoundary(error)
    });
  }, [searchParams]);

  const cardElements = cards
    .sort((card1, card2) =>
      card1.attributes.name.localeCompare(card2.attributes.name),
    )
    .map((card, index) => (
      <Link to={`/card/${card.attributes.card_code}`} key={index}>
        <CardSearchImage card={card} />
      </Link>
    ));

  return (
    <>
      {cards.length === 0 ? (
        <div data-test-id="no-cards" className="m-8 w-auto text-center">
          No cards found with the specified search query.
        </div>
      ) : (
        <div className="m-4 grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] justify-center justify-items-center gap-2">
          {cardElements}
        </div>
      )}
    </>
  );
}
