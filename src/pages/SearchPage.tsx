import CardSearchImage from "@/components/CardImage";
import { Card as CardType } from "@/types/interfaces";
import { querySearch } from "@/utils/apiCalls";
import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";

export default function SearchPage() {
  const [searchParams] = useSearchParams();
  const [cards, setCards] = useState<CardType[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const query = searchParams.get("query");
    if (!query) return;

    querySearch(query).then((data) => {
      if (data.data) {
        setError(null);
        setCards(data.data);
      } else {
        setError(data.error);
      }
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

  const content = () => {
    if (error) {
      return (
        <div data-test-id="no-cards" className="m-8 w-auto text-center">
          {error}
        </div>
      );
    } else if (cards.length === 0) {
      return (
        <div data-test-id="no-cards" className="m-8 w-auto text-center">
          No cards found with the specified search query.
        </div>
      );
    } else {
      return (
        <div className="m-4 grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] justify-center justify-items-center gap-2">
          {cardElements}
        </div>
      );
    }
  };

  return <>{content()}</>;
}
