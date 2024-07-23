import CardDisplay from "@/components/display/CardDisplay";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
      <div className="border-b border-border bg-secondary p-2">
        <div className="flex max-w-7xl items-center justify-center gap-4">
          <Select
            value={displayMode}
            onValueChange={(value: DisplayMode) => setDisplayMode(value)}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Search Attribute" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="image">Image Only</SelectItem>
              <SelectItem value="text">Text Only</SelectItem>
              <SelectItem value="list">List Mode</SelectItem>
              <SelectItem value="full">Full Display</SelectItem>
            </SelectContent>
          </Select>
          {"filtered by"}
          <Select
            value={sortAttribute}
            onValueChange={(value: SortAttribute) => setSortAttribute(value)}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Search Attribute" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="card_code">Card Code</SelectItem>
              <SelectItem value="name">Name</SelectItem>
              <SelectItem value="cost">Cost</SelectItem>
              <SelectItem value="health">Health</SelectItem>
              <SelectItem value="attack">Attack</SelectItem>
              <SelectItem value="card_type">Type</SelectItem>
              <SelectItem value="rarity">Rarity</SelectItem>
              <SelectItem value="region">Region</SelectItem>
              <SelectItem value="artist_name">Artist Name</SelectItem>
              <SelectItem value="set">Set</SelectItem>
            </SelectContent>
          </Select>
          {":"}
          <Select
            value={sortDirection}
            onValueChange={(value: SortDirection) => setSortDirection(value)}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Display Mode" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="auto">Auto</SelectItem>
              <SelectItem value="ascending">Ascending</SelectItem>
              <SelectItem value="descending">Descending</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

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
