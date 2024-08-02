import { CardAttributes } from "@/types/interfaces";
import { useState } from "react";
import { Button } from "./ui/button";

interface CardActionsProps {
  card: CardAttributes;
}

export default function CardActions({ card }: CardActionsProps) {
  const [notification, setNotification] = useState<string | null>(null);

  const handleCopyRawText = () => {
    const cardText = `
      ${card.name}
      ${card.cost}
      ${card.card_type} / ${card.supertype} / ${card.set}
      ${card.keywords.join(", ")}
      ${card.description_raw}
      ${card.levelup_description_raw && `Level Up: ${card.levelup_description_raw}`}
      ${card.flavor_text && `Flavor Text: ${card.flavor_text}`}
      ${card.attack} | ${card.health}
      Artist: ${card.artist_name}
      Card Code: ${card.card_code}
    `.trim();
    navigator.clipboard.writeText(cardText).then(() => {
      setNotification("Card details copied to clipboard!");
      setTimeout(() => setNotification(null), 3000);
    });
  };

  const handleCopyRawJson = () => {
    navigator.clipboard.writeText(JSON.stringify(card, null, 2)).then(() => {
      setNotification("Raw JSON copied to clipboard!");
      setTimeout(() => setNotification(null), 3000);
    });
  };

  const handleViewCard = () => {
    window.open(`https://lor.gg/card/${card.card_code}`, "_blank");
  };

  return (
    <div className="flex w-full max-w-xs flex-col gap-2 px-4">
      {notification && (
        <div className="fixed right-0 top-0 mr-4 mt-4 rounded bg-green-500 p-2 text-white shadow-md">
          {notification}
        </div>
      )}
      <Button
        onClick={handleCopyRawText}
        data-cy="copy-raw-text"
        variant="outline"
        className="border-foreground"
      >
        Copy Raw Text
      </Button>
      <Button
        onClick={handleCopyRawJson}
        data-cy="copy-raw-json"
        variant="outline"
        className="mb-8 border-foreground"
      >
        Copy Raw JSON
      </Button>
      <Button
        onClick={handleViewCard}
        data-cy="view-card"
        variant="outline"
        className="border-foreground"
      >
        View Card on LOR.gg
      </Button>
      <a
        href={card.assets[0].game_absolute_path}
        target="_blank"
        rel="noopener noreferrer"
        data-cy="download-card-image"
      >
        <Button className="w-full border-foreground" variant="outline">
          Download Card Image
        </Button>
      </a>
      <a
        href={card.assets[0].full_absolute_path}
        target="_blank"
        rel="noopener noreferrer"
        data-cy="download-full-art"
      >
        <Button className="w-full border-foreground" variant="outline">
          Download Full Art
        </Button>
      </a>
    </div>
  );
}
