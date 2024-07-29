import CardDisplay from "@/components/display/CardDisplay";
import SearchFilter from "@/components/SearchFilter/SearchFilter";
import { Card as CardType, FilterState } from "@/types/interfaces";
import { Rarity } from "@/types/types";
import { querySearch } from "@/utils/apiCalls";
import {
  isSortAttributeType,
  isSortDirectionType,
  isSortModeType,
} from "@/utils/isType";
import { useEffect, useState } from "react";
import { useErrorBoundary } from "react-error-boundary";
import { useNavigate, useSearchParams } from "react-router-dom";

export default function SearchPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [cards, setCards] = useState<CardType[]>([]);
  const [filterState, setFilterState] = useState<FilterState>({
    sortMode: "image",
    sortAttribute: "name",
    sortDirection: "auto",
  });
  const navigate = useNavigate();
  const { showBoundary } = useErrorBoundary();
  const { sortMode, sortAttribute, sortDirection } = filterState;

  function handleFilterState(action: { type: string; value: string }) {
    switch (action.type) {
      case "sortMode":
        searchParams.set("mode", action.value);
        setSearchParams(searchParams);
        break;
      case "sortAttribute":
        searchParams.set("attribute", action.value);
        setSearchParams(searchParams);
        break;
      case "sortDirection":
        searchParams.set("direction", action.value);
        setSearchParams(searchParams);
    }
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
        setCards(data.data);
      })
      .catch(showBoundary);
  }, [searchParams]);

  if (cards.length === 1) {
    const { card_code } = cards[0].attributes;
    navigate(`/card/${card_code}`);
  }

  let cardsSorted = cards.sort((card1, card2) =>
    card1.attributes.name.localeCompare(card2.attributes.name),
  );
  switch (sortAttribute) {
    case "name":
    case "card_type":
    case "set":
    case "artist_name":
    case "card_code":
    default:
      cardsSorted = cards.sort((card1, card2) =>
        card1.attributes[sortAttribute].localeCompare(
          card2.attributes[sortAttribute],
        ),
      );

      if (sortDirection === "descending") cardsSorted = cardsSorted.reverse();
      break;
    case "region_refs":
      cardsSorted = cards.sort((card1, card2) =>
        card1.attributes[sortAttribute]
          .join(", ")
          .localeCompare(card2.attributes[sortAttribute].join(", ")),
      );

      if (sortDirection === "descending") cardsSorted = cardsSorted.reverse();
      break;
    case "attack":
    case "cost":
    case "health":
      cardsSorted = cards.sort(
        (card1, card2) =>
          card1.attributes[sortAttribute] - card2.attributes[sortAttribute],
      );

      if (sortDirection === "descending") cardsSorted = cardsSorted.reverse();
      break;
    case "rarity":
      cardsSorted = cards.sort((card1, card2) => {
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
        <CardDisplay cards={cardsSorted} mode={sortMode} />
      )}
    </>
  );
}
