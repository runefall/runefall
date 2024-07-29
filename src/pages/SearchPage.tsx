import InfiniteScroll from 'react-infinite-scroll-component';
import CardDisplay from "@/components/display/CardDisplay";
import SearchFilter from "@/components/SearchFilter/SearchFilter";
import { Card as CardType, FilterState } from "@/types/interfaces";
import { Rarity, SortAttribute, SortDirection, SortMode } from "@/types/types";
import { querySearch } from "@/utils/apiCalls";
import { useEffect, useState } from "react";
import { useErrorBoundary } from "react-error-boundary";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Button } from '@/components/ui/button';


export default function SearchPage() {
  const [searchParams] = useSearchParams();
  const [cards, setCards] = useState<CardType[]>([]);
  const { showBoundary } = useErrorBoundary();
  const [filterState, setFilterState] = useState<FilterState>({
    sortMode: "image",
    sortAttribute: "name",
    sortDirection: "auto",
  });
  const [displayedCards, setDisplayedCards] = useState<CardType[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const [showTopButton, setShowTopButton] = useState(false);
  const navigate = useNavigate();
  const { sortMode, sortAttribute, sortDirection } = filterState;

  function handleFilterState(action: { type: string; value: string }) {
    switch (action.type) {
      case "sortMode":
        setFilterState((prevState) => ({
          ...prevState,
          sortMode: action.value as SortMode,
        }));
        break;
      case "sortDirection":
        setFilterState((prevState) => ({
          ...prevState,
          sortDirection: action.value as SortDirection,
        }));
        break;
      case "sortAttribute":
        setFilterState((prevState) => ({
          ...prevState,
          sortAttribute: action.value as SortAttribute,
        }));
        break;
    }
  }

  useEffect(() => {
    const query = searchParams.get("query");
    if (!query) return;

    setCards([]);
    querySearch(query)
      .then((data: { data: CardType[] }) => {
        setCards(data.data);
        setDisplayedCards(data.data.slice(0, 20)); // Initially display the first 20 cards
        setHasMore(data.data.length > 20);
      })
      .catch(showBoundary);
  }, [searchParams]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleScroll = () => {
    if (window.scrollY > 200) {
      setShowTopButton(true);
    } else {
      setShowTopButton(false);
    }
  };

  const fetchMoreData = () => {
    const currentLength = displayedCards.length;
    const newLength = currentLength + 20;
    const newCards = cards.slice(0, newLength);
    setDisplayedCards(newCards);
    setHasMore(newLength < cards.length);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (cards.length === 1) {
    const { card_code } = cards[0].attributes;
    navigate(`/card/${card_code}`);
  }

  let cardsSorted = displayedCards.sort((card1, card2) =>
    card1.attributes.name.localeCompare(card2.attributes.name)
  );
  switch (sortAttribute) {
    case "name":
    case "card_type":
    case "set":
    case "artist_name":
    case "card_code":
    default:
      cardsSorted = displayedCards.sort((card1, card2) =>
        card1.attributes[sortAttribute].localeCompare(
          card2.attributes[sortAttribute]
        )
      );

      if (sortDirection === "descending") cardsSorted = cardsSorted.reverse();
      break;
    case "region_refs":
      cardsSorted = displayedCards.sort((card1, card2) =>
        card1.attributes[sortAttribute]
          .join(", ")
          .localeCompare(card2.attributes[sortAttribute].join(", "))
      );

      if (sortDirection === "descending") cardsSorted = cardsSorted.reverse();
      break;
    case "attack":
    case "cost":
    case "health":
      cardsSorted = displayedCards.sort(
        (card1, card2) =>
          card1.attributes[sortAttribute] - card2.attributes[sortAttribute]
      );

      if (sortDirection === "descending") cardsSorted = cardsSorted.reverse();
      break;
    case "rarity":
      cardsSorted = displayedCards.sort((card1, card2) => {
        function calculateRarity(rarity: Rarity) {
          switch (rarity.toUpperCase()) {
            default:
            case "NONE":
              return 0;
            case "COMMON":
              return 1;
            case "RARE":
              return 2;
            case "EPIC":
              return 3;
            case "CHAMPION":
              return 4;
          }
        }

        return (
          calculateRarity(card1.attributes.rarity) -
          calculateRarity(card2.attributes.rarity)
        );
      });

      if (sortDirection === "descending") cardsSorted = cardsSorted.reverse();
      break;
  }

  return (
    <>
      <SearchFilter
        filterState={filterState}
        setFilterState={handleFilterState}
      />
      {cards.length === 0 ? (
        <div data-test-id="no-cards" className="m-8 w-auto text-center">
          No cards found with the specified search query.
        </div>
      ) : (
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
          <CardDisplay cards={cardsSorted} mode={sortMode} />
        </InfiniteScroll>
      )}
      {showTopButton && (
        <Button
          data-test-id="back-to-top-button"
          onClick={scrollToTop} 
          className="fixed bottom-4 right-4 p-2"
        >
          Back to Top
        </Button>
      )}
    </>
  );
}
