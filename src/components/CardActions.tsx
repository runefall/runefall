import { useState } from "react";
import { CardAttributes } from "@/types/interfaces";

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
    <div className="flex flex-col gap-2 mt-4 -ml-40 pl-4">
      {notification && (
        <div className="fixed top-0 right-0 mt-4 mr-4 p-2 bg-green-500 text-white rounded shadow-md">
          {notification}
        </div>
      )}
      <button
        className="w-full max-w-[300px] bg-blue-500 text-white py-2 px-6 rounded-md hover:bg-blue-600"
        onClick={handleCopyRawText}
        data-cy="copy-raw-text"
      >
        Copy Raw Text
      </button>
      <button
        className="w-full max-w-[300px] bg-blue-500 text-white py-2 px-6 rounded-md hover:bg-blue-600"
        onClick={handleCopyRawJson}
        data-cy="copy-raw-json"
      >
        Copy Raw JSON
      </button>
      <button
        className="w-full max-w-[300px] bg-blue-500 text-white py-2 px-6 rounded-md hover:bg-blue-600"
        onClick={handleViewCard}
        data-cy="view-card"
      >
        View Card on LOR.gg
      </button>
      <a
        href={card.assets[0].game_absolute_path}
        target="_blank"
        rel="noopener noreferrer"
        className="w-full max-w-[300px] bg-blue-500 text-white py-2 px-6 rounded-md hover:bg-blue-600 text-center"
        data-cy="download-card-image"
      >
        Download Card Image
      </a>
      <a
        href={card.assets[0].full_absolute_path}
        target="_blank"
        rel="noopener noreferrer"
        className="w-full max-w-[300px] bg-blue-500 text-white py-2 px-6 rounded-md hover:bg-blue-600 text-center"
        data-cy="download-full-art"
      >
        Download Full Art
      </a>
    </div>
  );
}
