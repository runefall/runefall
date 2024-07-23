import { Card as CardType } from "@/types/interfaces";
import { DisplayMode } from "@/types/types";
import { Link } from "react-router-dom";
import CardFull from "./CardFull";
import CardImage from "./CardImage";
import CardList from "./CardList";
import CardText from "./CardText";

export default function CardDisplay({
  mode,
  cards,
}: {
  mode: DisplayMode;
  cards: CardType[];
}) {
  switch (mode) {
    default:
    case "image":
      return (
        <div className="m-4 grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] justify-center justify-items-center gap-4">
          {cards.map((card, index) => (
            <Link to={`/card/${card.attributes.card_code}`} key={index}>
              <CardImage card={card.attributes} />
            </Link>
          ))}
        </div>
      );
    case "text":
      return (
        <div className="m-4 grid grid-cols-[repeat(auto-fill,minmax(350px,1fr))] justify-center justify-items-center gap-2 gap-x-4 gap-y-8">
          {cards.map((card, index) => (
            <Link
              to={`/card/${card.attributes.card_code}`}
              key={index}
              className="w-full"
            >
              <CardText card={card.attributes} />
            </Link>
          ))}
        </div>
      );
    case "list":
      return (
        <div className="flex justify-center">
          <CardList cards={cards} />
        </div>
      );
    case "full":
      return (
        <div>
          {cards.map((card, index) => (
            <Link
              to={`/card/${card.attributes.card_code}`}
              key={index}
              className="relative flex w-full flex-col items-center border-b border-border p-12"
            >
              <CardFull card={card.attributes} />
            </Link>
          ))}
        </div>
      );
  }
}
