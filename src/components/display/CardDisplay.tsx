import { Card as CardType } from "@/types/interfaces";
import { SortMode } from "@/types/types";
import { Link } from "react-router-dom";
import InfiniteScroll from 'react-infinite-scroll-component';
import CardFull from "./CardFull";
import CardImage from "./CardImage";
import CardList from "./CardList";
import CardText from "./CardText";

export default function CardDisplay({
  mode,
  cards,
  fetchMoreData,
  hasMore
}: {
  mode: SortMode;
  cards: CardType[];
  fetchMoreData: () => void;
  hasMore: boolean;
}) {
  switch (mode) {
    default:
    case "image":
      return (
        <InfiniteScroll
          dataLength={cards.length}
          next={fetchMoreData}
          hasMore={hasMore}
          loader={<h4>Loading...</h4>}
        >
          <div className="m-4 grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] justify-center justify-items-center gap-4">
            {cards.map((card, index) => (
              <Link to={`/card/${card.attributes.card_code}`} key={index}>
                <CardImage card={card.attributes} />
              </Link>
            ))}
          </div>
        </InfiniteScroll>
      );
    case "text":
      return (
        <InfiniteScroll
          dataLength={cards.length}
          next={fetchMoreData}
          hasMore={hasMore}
          loader={<h4>Loading...</h4>}
        >
          <div className="m-4 grid grid-cols-[repeat(auto-fill,minmax(350px,1fr))] justify-center justify-items-center gap-2 gap-x-4 gap-y-8">
            {cards.map((card, index) => (
              <Link
                to={`/card/${card.attributes.card_code}`}
                key={index}
                className="flex w-full justify-center"
              >
                <CardText card={card.attributes} />
              </Link>
            ))}
          </div>
        </InfiniteScroll>
      );
    case "list":
      return (
        <div className="flex overflow-x-scroll lg:justify-center">
          <CardList cards={cards} />
        </div>
      );
    case "full":
      return (
        <InfiniteScroll
          dataLength={cards.length}
          next={fetchMoreData}
          hasMore={hasMore}
          loader={<h4>Loading...</h4>}
        >
          <div>
            {cards.map((card, index) => (
              <div
                key={index}
                className="relative flex w-full flex-col items-center border-b border-border p-12"
              >
                <CardFull card={card.attributes} />
              </div>
            ))}
          </div>
        </InfiniteScroll>
      );
  }
}
