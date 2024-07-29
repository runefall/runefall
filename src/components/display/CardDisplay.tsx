import { Card as CardType } from "@/types/interfaces";
import { SortMode } from "@/types/types";
import { Link } from "react-router-dom";
import CardFull from "./CardFull";
import CardImage from "./CardImage";
import CardList from "./CardList";
import CardText from "./CardText";

export default function CardDisplay({
  mode,
  cards,
  loading = false,
}: {
  mode: SortMode;
  cards: CardType[];
  loading?: boolean;
}) {
  if (loading) {
    return (
      <div data-test-id="no-cards" className="m-8 w-auto text-center">
        Loading ...
      </div>
    );
  } else if (cards.length === 0) {
    return (
      <div data-test-id="no-cards" className="m-8 w-auto text-center">
        No cards found with the specified search query.
      </div>
    );
  }

  switch (mode) {
    default:
    case "image":
      const imageElements = cards.map((card, index) => (
        <Link to={`/card/${card.attributes.card_code}`} key={index}>
          <CardImage card={card.attributes} />
        </Link>
      ));

      return (
        <div className="m-4 grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] justify-center justify-items-center gap-4">
          {imageElements}
        </div>
      );
    case "text":
      const textElements = cards.map((card, index) => (
        <Link
          to={`/card/${card.attributes.card_code}`}
          key={index}
          className="flex w-full justify-center"
        >
          <CardText card={card.attributes} />
        </Link>
      ));

      return (
        <div className="m-4 grid grid-cols-[repeat(auto-fill,minmax(350px,1fr))] justify-center justify-items-center gap-2 gap-x-4 gap-y-8">
          {textElements}
        </div>
      );
    case "list":
      return (
        <div className="flex overflow-x-scroll lg:justify-center">
          <CardList cards={cards} />
        </div>
      );
    case "full":
      const fullElements = cards.map((card, index) => (
        <div
          key={index}
          className="relative flex w-full flex-col items-center border-b border-border p-12"
        >
          <CardFull card={card.attributes} />
        </div>
      ));

      return <div>{fullElements}</div>;
  }
}
