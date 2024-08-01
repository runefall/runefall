import BackToTopButton from "@/components/BackToTopButton";
import CardDisplay from "@/components/display/CardDisplay";
import SearchFilter from "@/components/SearchFilter/SearchFilter";
import { Card as CardType, FilterState } from "@/types/interfaces";
import { querySearch } from "@/utils/apiCalls";
import {
  isSortAttributeType,
  isSortDirectionType,
  isSortModeType,
} from "@/utils/isType";
import { parseQuery } from "@/utils/parse";
import { calculateRarity } from "@/utils/rarity";
import { useScrollToTop } from "@/utils/useScrollToTop";
import { useEffect, useRef, useState } from "react";
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
  const loading = useRef(true);
  const navigate = useNavigate();
  const { showBoundary } = useErrorBoundary();
  const { sortMode, sortAttribute, sortDirection } = filterState;

  function handleFilterState(action: { type: string; value: string }) {
    switch (action.type) {
      case "sortMode":
        searchParams.set("mode", action.value);
        break;
      case "sortAttribute":
        searchParams.set("attribute", action.value);
        break;
      case "sortDirection":
        searchParams.set("direction", action.value);
    }
    searchParams.sort();
    setSearchParams(searchParams);
  }

  useEffect(() => {
    const query = searchParams.get("query");
    if (!query) return;

    const parsedQuery = parseQuery(query);

    const sortModeParam = searchParams.get("mode") || "";
    const sortMode = isSortModeType(parsedQuery.mode)
      ? parsedQuery.mode
      : isSortModeType(sortModeParam)
        ? sortModeParam
        : "image";

    const sortAttributeParam = searchParams.get("mode") || "";
    const sortAttribute = isSortAttributeType(parsedQuery.attribute)
      ? parsedQuery.attribute
      : isSortModeType(sortAttributeParam)
        ? sortAttributeParam
        : "name";

    const sortDirectionParam = searchParams.get("direction") || "";
    const sortDirection = isSortDirectionType(parsedQuery.direction)
      ? parsedQuery.direction
      : isSortModeType(sortDirectionParam)
        ? sortDirectionParam
        : "name";

    setFilterState({ sortMode, sortAttribute, sortDirection } as FilterState);

    setCards([]);
    loading.current = true;
    querySearch(query)
      .then((data: { data: CardType[] }) => {
        setCards(data.data);
        loading.current = false;
      })
      .catch(showBoundary);
  }, [searchParams]);

  if (cards.length === 1) {
    const { card_code } = cards[0].attributes;
    navigate(`/card/${card_code}`, { replace: true });
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
      cardsSorted = cards.sort(
        (card1, card2) =>
          calculateRarity(card1.attributes.rarity) -
          calculateRarity(card2.attributes.rarity),
      );
      if (sortDirection === "descending") cardsSorted = cardsSorted.reverse();
      break;
  }

  const parse = parseQuery(searchParams.get("query") || "");
  return (
    <div className="flex flex-1 flex-col">
      <SearchFilter
        filterState={filterState}
        setFilterState={handleFilterState}
        disableSortMode={isSortModeType(parse.mode)}
        disableSortAttribute={isSortAttributeType(parse.attribute)}
        disableSortDirection={isSortDirectionType(parse.direction)}
      />
      <CardDisplay
        cards={cardsSorted}
        mode={sortMode}
        loading={loading.current}
      />
      <BackToTopButton show={(() => useScrollToTop())()} />
    </div>
  );
}
