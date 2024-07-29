import { Card as CardType } from "@/types/interfaces";
import { SortMode } from "@/types/types";
import { TbDeviceIpadQuestion } from "react-icons/tb";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
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
  const navigate = useNavigate();

  if (loading) {
    return (
      <div
        data-test-id="no-cards"
        className="flex flex-1 items-center justify-center"
      >
        Loading ...
      </div>
    );
  } else if (cards.length === 0) {
    return (
      <div
        data-test-id="no-cards"
        className="flex min-h-[500px] flex-1 items-center justify-center"
      >
        <div className="flex max-w-lg flex-col items-center gap-4 rounded-lg p-6 text-center shadow-[0_0_15px_5px] shadow-shadow">
          <TbDeviceIpadQuestion
            size="150px"
            className="text-muted-foreground"
          />
          <h2 className="text-xl font-semibold">No cards found</h2>
          <p>
            Your search didn’t match any cards. Adjust your terms or try one of
            the links below:
          </p>
          <div className="flex gap-4">
            <Button variant="outline" onClick={() => navigate("/")}>
              Go back
            </Button>
            <Button variant="outline" onClick={() => navigate("/syntax")}>
              Syntax Guide
            </Button>
          </div>
        </div>
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
