import CardDisplay from "@/components/display/CardDisplay";
import SearchFilter from "@/components/SearchFilter/SearchFilter";
import { Card as CardType, FilterState } from "@/types/interfaces";
import { querySearch } from "@/utils/apiCalls";
import { isSortAttributeType, isSortDirectionType, isSortModeType } from "@/utils/isType";
import { calculateRarity } from "@/utils/rarity";
import { useEffect, useState } from "react";
import { useErrorBoundary } from "react-error-boundary";
import { useNavigate, useSearchParams } from "react-router-dom";
import BackToTopButton from "@/components/BackToTopButton";

export default function SearchPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [cards, setCards] = useState<CardType[]>([]);
  const [filterState, setFilterState] = useState<FilterState>({
    sortMode: "image",
    sortAttribute: "name",
    sortDirection: "auto",
  });
  const [showTopButton, setShowTopButton] = useState(false);
  const navigate = useNavigate();
  const { showBoundary } = useErrorBoundary();
  const { sortMode, sortAttribute, sortDirection } = filterState;

  function handleFilterState(action: { type: string; value: string }) {
    const newParams = new URLSearchParams(searchParams.toString());
    switch (action.type) {
      case "sortMode":
        newParams.set("mode", action.value);
        break;
      case "sortAttribute":
        newParams.set("attribute", action.value);
        break;
      case "sortDirection":
        newParams.set("direction", action.value);
        break;
    }
    newParams.sort();
    setSearchParams(newParams);
  }

  useEffect(() => {
    const query = searchParams.get("query");
    if (!query) return;

    setFilterState((prevState) => {
      const sortModeParam = searchParams.get("mode") || "";
      const sortAttributeParam = searchParams.get("attribute") || "";
      const sortDirectionParam = searchParams.get("direction") || "";

      return {
        ...prevState,
        sortMode: isSortModeType(sortModeParam) ? sortModeParam : "image",
        sortAttribute: isSortAttributeType(sortAttributeParam)
          ? sortAttributeParam
          : "name",
        sortDirection: isSortDirectionType(sortDirectionParam)
          ? sortDirectionParam
          : "auto",
      } as FilterState;
    });

    setCards([]);
    querySearch(query)
      .then((data: { data: CardType[] }) => {
        const sortedCards = sortCards(data.data, sortAttribute, sortDirection);
        setCards(sortedCards);
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

  const sortCards = (cardsToSort: CardType[], attribute: string, direction: string): CardType[] => {
    let sortedCards = [...cardsToSort];

    switch (attribute) {
      case "name":
      case "card_type":
      case "set":
      case "artist_name":
      case "card_code":
        sortedCards = sortedCards.sort((card1, card2) =>
          card1.attributes[attribute].localeCompare(card2.attributes[attribute])
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
        sortedCards = sortedCards.sort(
          (card1, card2) =>
            calculateRarity(card1.attributes.rarity) -
            calculateRarity(card2.attributes.rarity)
        );
        break;
      default:
        break;
    }

    if (direction === "descending") sortedCards.reverse();

    return sortedCards;
  };

  useEffect(() => {
    const sortedCards = sortCards(cards, sortAttribute, sortDirection);
    setCards(sortedCards);
  }, [sortAttribute, sortDirection]);

  if (cards.length === 1) {
    const { card_code } = cards[0].attributes;
    navigate(`/card/${card_code}`);
  }

  return (
    <>
      <SearchFilter filterState={filterState} setFilterState={handleFilterState} />
      {cards.length === 0 ? (
        <div data-test-id="no-cards" className="m-8 w-auto text-center">
          No cards found with the specified search query.
        </div>
      ) : (
        <CardDisplay
          cards={cards}
          mode={sortMode}
        />
      )}
      <BackToTopButton show={showTopButton} />
    </>
  );
}
