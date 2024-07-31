import { useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
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
  itemsPerPage = 20
}: {
  mode: SortMode;
  cards: CardType[];
  itemsPerPage?: number;
}) {
  const [displayedCards, setDisplayedCards] = useState<CardType[]>([]);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    setDisplayedCards(cards.slice(0, itemsPerPage));
    setHasMore(cards.length > itemsPerPage);
  }, [cards]);

  const fetchMoreData = () => {
    const currentLength = displayedCards.length;
    const newLength = currentLength + itemsPerPage;
    const newCards = cards.slice(0, newLength);
    setDisplayedCards(newCards);
    setHasMore(newLength < cards.length);
  };

  switch (mode) {
    default:
    case "image":
      return (
        <InfiniteScroll
          dataLength={displayedCards.length}
          next={fetchMoreData}
          hasMore={hasMore}
          loader={<h4>Loading...</h4>}
          endMessage={
            <p style={{ textAlign: 'center' }}>
              <b>Yay! You have seen it all</b>
            </p>
          }
        >
          <div className="m-4 grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] justify-center justify-items-center gap-4">
            {displayedCards.map((card, index) => (
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
          dataLength={displayedCards.length}
          next={fetchMoreData}
          hasMore={hasMore}
          loader={<h4>Loading...</h4>}
          endMessage={
            <p style={{ textAlign: 'center' }}>
              <b>Yay! You have seen it all</b>
            </p>
          }
        >
          <div className="m-4 grid grid-cols-[repeat(auto-fill,minmax(350px,1fr))] justify-center justify-items-center gap-2 gap-x-4 gap-y-8">
            {displayedCards.map((card, index) => (
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
          <CardList cards={displayedCards} />
        </div>
      );
    case "full":
      return (
        <InfiniteScroll
          dataLength={displayedCards.length}
          next={fetchMoreData}
          hasMore={hasMore}
          loader={<h4>Loading...</h4>}
          endMessage={
            <p style={{ textAlign: 'center' }}>
              <b>Yay! You have seen it all</b>
            </p>
          }
        >
          <div>
            {displayedCards.map((card, index) => (
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
