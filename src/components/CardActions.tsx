import { CardAttributes } from "@/types/interfaces";

interface CardActionsProps {
  card: CardAttributes;
}

export default function CardActions({ card }: CardActionsProps) {
  const handleCopyRawText = () => {
    navigator.clipboard.writeText(card.description_raw).then(() => {
      alert("Raw text copied to clipboard!");
    });
  };

  const handleCopyRawJson = () => {
    navigator.clipboard.writeText(JSON.stringify(card, null, 2)).then(() => {
      alert("Raw JSON copied to clipboard!");
    });
  };

  const handleViewCard = () => {
    window.open(`https://lor.gg/card/${card.card_code}`, "_blank");
  };

  const handleDownloadImage = () => {
    const link = document.createElement("a");
    link.href = card.assets[0].game_absolute_path;
    link.download = `${card.name}.png`;
    link.click();
  };

  const handleDownloadFullArt = () => {
    const link = document.createElement("a");
    link.href = card.assets[0].full_absolute_path;
    link.download = `${card.name}_full.png`;
    link.click();
  };

  return (
    <div className="flex flex-col gap-2 mt-4">
      <button
        className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
        onClick={handleCopyRawText}
        data-cy="copy-raw-text"
      >
        Copy Raw Text
      </button>
      <button
        className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
        onClick={handleCopyRawJson}
        data-cy="copy-raw-json"
      >
        Copy Raw JSON
      </button>
      <button
        className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
        onClick={handleViewCard}
        data-cy="view-card"
      >
        View Card on LOR.gg
      </button>
      <button
        className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
        onClick={handleDownloadImage}
        data-cy="download-card-image"
      >
        Download Card Image
      </button>
      <button
        className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
        onClick={handleDownloadFullArt}
        data-cy="download-full-art"
      >
        Download Full Art
      </button>
    </div>
  );
}