import CardDisplay from "@/components/display/CardDisplay";
import SearchFilter from "@/components/SearchFilter/SearchFilter";
import { Card as CardType, FilterState } from "@/types/interfaces";
import { Rarity, SortAttribute, SortDirection, SortMode } from "@/types/types";
import { querySearch } from "@/utils/apiCalls";
import { useEffect, useState } from "react";
import { useErrorBoundary } from "react-error-boundary";
import { useNavigate, useSearchParams } from "react-router-dom";
import BackToTopButton from "@/components/ui/BackToTopButton";

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
        const sortedCards = sortCards(data.data, sortAttribute, sortDirection);
        setCards(sortedCards);
        setDisplayedCards(sortedCards.slice(0, 20));
        setHasMore(sortedCards.length > 20);
      })
      .catch(showBoundary);
  }, [searchParams]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleScroll = () => {
    if (window.scrollY > 400) {
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

  const sortCards = (cardsToSort: CardType[], attribute: SortAttribute, direction: SortDirection): CardType[] => {
    let sortedCards = [...cardsToSort];

    switch (attribute) {
      case "name":
      case "card_type":
      case "set":
      case "artist_name":
      case "card_code":
      default:
        sortedCards = sortedCards.sort((card1, card2) =>
          card1.attributes[attribute].localeCompare(
            card2.attributes[attribute]
          )
        );
        break;
      case "region_refs":
        sortedCards = sortedCards.sort((card1, card2) =>
          card1.attributes[attribute]
            .join(", ")
            .localeCompare(card2.attributes[attribute].join(", "))
        );
        break;
      case "attack":
      case "cost":
      case "health":
        sortedCards = sortedCards.sort(
          (card1, card2) =>
            card1.attributes[attribute] - card2.attributes[attribute]
        );
        break;
      case "rarity":
        sortedCards = sortedCards.sort((card1, card2) => {
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
        break;
    }

    if (direction === "descending") sortedCards.reverse();

    return sortedCards;
  };

  useEffect(() => {
    const sortedCards = sortCards(cards, sortAttribute, sortDirection);
    setDisplayedCards(sortedCards.slice(0, displayedCards.length));
  }, [sortAttribute, sortDirection]);

  if (cards.length === 1) {
    const { card_code } = cards[0].attributes;
    navigate(`/card/${card_code}`);
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
        <CardDisplay
          cards={displayedCards}
          mode={sortMode}
          fetchMoreData={fetchMoreData}
          hasMore={hasMore}
        />
      )}
      <BackToTopButton show={showTopButton} />
    </>
  );
}
