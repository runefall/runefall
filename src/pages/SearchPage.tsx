import CardDisplay from "@/components/display/CardDisplay";
import SearchFilter from "@/components/SearchFilter/SearchFilter";
import { Card as CardType } from "@/types/interfaces";
import {
  DisplayMode,
  Rarity,
  SortAttribute,
  SortDirection,
} from "@/types/types";
import { querySearch } from "@/utils/apiCalls";
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

export default function SearchPage() {
  const [searchParams] = useSearchParams();
  const [cards, setCards] = useState<CardType[]>([]);
  const [displayMode, setDisplayMode] = useState<DisplayMode>("image");
  const [sortAttribute, setSortAttribute] = useState<SortAttribute>("name");
  const [sortDirection, setSortDirection] = useState<SortDirection>("auto");
  const navigate = useNavigate();

  useEffect(() => {
    const query = searchParams.get("query");
    if (!query) return;

    setCards([]);
    querySearch(query).then((data: { data: CardType[] }) => {
      setCards(data.data);
    });
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
    case "region":
      cardsSorted = cards.sort((card1, card2) =>
        card1.attributes.region_refs
          .join(", ")
          .localeCompare(card2.attributes.region_refs.join(", ")),
      );

      if (sortDirection === "descending") cardsSorted = cardsSorted.reverse();
      break;
  }

  return (
    <>
      <SearchFilter
        displayMode={displayMode}
        setDisplayMode={setDisplayMode}
        sortAttribute={sortAttribute}
        setSortAttribute={setSortAttribute}
        sortDirection={sortDirection}
        setSortDirection={setSortDirection}
      />
      {cards.length === 0 ? (
        <div data-test-id="no-cards" className="m-8 w-auto text-center">
          No cards found with the specified search query.
        </div>
      ) : (
        <CardDisplay cards={cardsSorted} mode={displayMode} />
      )}
    </>
  );
}
