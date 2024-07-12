import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./CardPage.css";
import { CardAttributes, Card } from "@/types/types";

interface CardResponse {
  data: {
    attributes: CardAttributes;
  };
}

export default function CardPage() {
  const { code } = useParams<{ code: string }>();
  const [card, setCard] = useState<CardAttributes | null>(null);

  useEffect(() => {
    async function fetchCard() {
      try {
        const response = await fetch(`http://127.0.0.1:3000/api/v1/cards/${code}`); // Swap to https://runefall-69209e0b8bce.herokuapp.com/api/v1/cards/${code} when working
        const data: CardResponse = await response.json();
        setCard(data.data.attributes);
      } catch (error) {
        console.error("Error fetching card data:", error);
      }
    }

    fetchCard();
  }, [code]);

  if (!card) return <div>Loading...</div>;

  const formatLegality = (format: string) =>
    card.formats.includes(format) ? "bg-green-500" : "bg-gray-500";

  return (
    <div className="flex flex-col items-center p-4 bg-gray-900 min-h-screen">
      <div className="card-container bg-gray-800 p-6 rounded-lg shadow-md flex flex-col md:flex-row relative max-w-screen-lg mx-auto">
        <div className="md:hidden mb-4">
          <img
            src={card.assets[0].game_absolute_path}
            alt={card.name}
            className="card-image mx-auto"
          />
        </div>
        <div className="card-details max-w-sm mx-auto md:ml-4.5 mt-4 md:mt-0">
          <div className="mb-4 w-full flex items-center border-t border-gray-700 pt-4">
            <span className="card-cost rounded-full">{card.cost}</span>
            <h2 className="text-xl mx-4">{card.name}</h2>
          </div>
          <div className="mb-4 w-full border-t border-gray-700 pt-4">
            <p>{`${card.card_type} / ${card.supertype} / ${card.set}`} {/* Set is wrong. What is "foundations"? */}</p>
          </div>
          <div className="mb-4 w-full border-t border-gray-700 pt-4">
            <p>Keywords: {card.keywords.join(", ")}</p>
          </div>
          <div className="mb-4 w-full border-t border-gray-700 pt-4">
            <p>{card.description_raw}</p>
            {card.levelup_description && <p>Level Up: {card.levelup_description_raw}</p>}
            <p>{card.flavor_text}</p>
          </div>
          <div className="mb-4 w-full flex border-t border-gray-700 pt-4">
            <h3 className="text-lg mr-2">Attack: {card.attack}</h3>
            <h3 className="text-lg">Health: {card.health}</h3>
          </div>
          <div className="mb-4 w-full border-t border-gray-700 pt-4">
            <p>Artist: {card.artist_name}</p>
          </div>
          <div className="mb-4 w-full border-t border-gray-700 pt-4">
            <p>Card Code: {card.card_code}</p>
          </div>
          <div className="mb-4 w-full border-t border-gray-700 pt-4">
            <h3 className="text-lg">Modes</h3>
            <div className="flex flex-col gap-2 w-full">
              {["Standard", "Eternal", "Commons Only"].map((format) => (
                <div key={format} className="flex items-center">
                  <span className={`px-2 py-1 rounded text-xs text-white mr-2 ${formatLegality(format)}`}>
                    {card.formats.includes(format) ? "Legal" : "Not Legal"}
                  </span>
                  <span>{format}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="hidden md:block">
          <img
            src={card.assets[0].game_absolute_path}
            alt={card.name}
            className="card-image absolute md:-left-40 top-0 md:top-auto md:transform md:translate-y-[-5%] md:translate-x-[-20%]"
          />
        </div>
      </div>
      {card.associated_cards.length > 0 && (
        <>
          <hr className="border-t border-gray-700 my-8 w-full" />
          <div className="related-cards mt-8 w-full">
            <h3 className="related-cards-title">RELATED CARDS</h3>
            <div className="flex gap-4 overflow-x-auto">
              {card.associated_cards.map((associatedCard: Card) => (
                <div key={associatedCard.card_code} className="related-card">
                  <img
                    src={associatedCard.assets[0].game_absolute_path}
                    alt={associatedCard.name}
                    className="w-24 h-auto rounded-lg shadow-md"
                  />
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
