import CardDisplay from "@/components/display/CardDisplay";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card as CardType } from "@/types/interfaces";
import { DisplayMode } from "@/types/types";
import { querySearch } from "@/utils/apiCalls";
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

export default function SearchPage() {
  const [searchParams] = useSearchParams();
  const [cards, setCards] = useState<CardType[]>([]);
  const [displayType, setDisplayType] = useState<DisplayMode>("image");
  const navigate = useNavigate();

  useEffect(() => {
    const query = searchParams.get("query");
    if (!query) return;

    querySearch(query).then((data: { data: CardType[] }) => {
      setCards(data.data);
    });
  }, [searchParams]);

  if (cards.length === 1) {
    const { card_code } = cards[0].attributes;
    navigate(`/card/${card_code}`);
  }

  const cardsSorted = cards.sort((card1, card2) =>
    card1.attributes.name.localeCompare(card2.attributes.name),
  );

  return (
    <>
      <Select
        value={displayType}
        onValueChange={(value: DisplayMode) => setDisplayType(value)}
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Display Mode" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="image">Image Only</SelectItem>
          <SelectItem value="text">Text Only</SelectItem>
          <SelectItem value="list">List Mode</SelectItem>
          <SelectItem value="full">Full Display</SelectItem>
        </SelectContent>
      </Select>
      {cards.length === 0 ? (
        <div data-test-id="no-cards" className="m-8 w-auto text-center">
          No cards found with the specified search query.
        </div>
      ) : (
        <CardDisplay cards={cardsSorted} mode={displayType} />
      )}
    </>
  );
}
