import Card from "@/components/Card";
import { Card as CardType } from "@/types/interfaces";
import { queryCard } from "@/utils/apiCalls";
import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";

export default function SearchPage() {
  const [searchParams] = useSearchParams();
  const [cards, setCards] = useState([]);

  useEffect(() => {
    const query = searchParams.get("query");
    if (!query) return;

    queryCard(query).then((data) => {
      setCards(data.data);
    });
  }, [searchParams]);

  const cardElements = cards.map((card: CardType, i) => (
    <Link to={`/card/${card.attributes.card_code}`} key={i}>
      <Card {...card} />
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
