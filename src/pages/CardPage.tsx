import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
//import Footer from "@/components/Footer"; // Already renders, figuring out if I need to add a declarions file later and adjust main rendering. not prio, just annoying to see
import { cn } from "@/lib/utils";
import "./CardPage.css";
//import React from "react";

interface Card {
  id: number;
  name: string;
  descriptionRaw: string;
  attack: number;
  cost: number;
  health: number;
  flavorText: string;
  artistName: string;
  cardCode: string;
  collectible: boolean;
  set: string;
  assets: {
    gameAbsolutePath: string;
    fullAbsolutePath: string;
  }[];
  formats: string[];
}

export default function CardPage() {
  const { code } = useParams();
  const [card, setCard] = useState<Card | null>(null);

  useEffect(() => {
    async function fetchCard() {
      try {
        const response = await fetch(`http://127.0.0.1:3000/api/v1/cards/${code}`);
        const data = await response.json();
        setCard(data.data.attributes);
      } catch (error) {
        console.error("Error fetching card data:", error);
      }
    }

    fetchCard();
  }, [code]);

  if (!card) return <div>Loading...</div>;

  return (
    <div className="flex flex-col items-center p-4">
      <h1 className="card-title">{card.name}</h1>
      <div className="card-container">
        <img
          src={card.assets[0].gameAbsolutePath}
          alt={card.name}
          className="card-image"
        />
        <div className="card-details">
          <div className="mb-4">
            <h2 className="text-xl">{card.name}</h2>
            <p>{card.descriptionRaw}</p>
          </div>
          <div className="mb-4">
            <h3 className="text-lg">Attack: {card.attack}</h3>
            <h3 className="text-lg">Cost: {card.cost}</h3>
            <h3 className="text-lg">Health: {card.health}</h3>
          </div>
          <div className="mb-4">
            <p>{card.flavorText}</p>
            <p>Illustration by {card.artistName}</p>
            <p>Card Code: {card.cardCode}</p>
          </div>
          <div className="mb-4">
            <h3 className="text-lg">Modes</h3>
            <div className="flex gap-2">
              {card.formats.map((format) => (
                <span
                  key={format}
                  className={cn(
                    "px-2 py-1 rounded",
                    format === "Standard"
                      ? "bg-green-500"
                      : format === "Eternal"
                      ? "bg-red-500"
                      : "bg-blue-500"
                  )}
                >
                  {format}
                </span>
              ))}
            </div>
          </div>
          <div className="button-group">
            <button className="action-button">Copy raw text(Add fetches for these dont forget)</button>
            <button className="action-button">Copy raw JSON</button>
            <button className="action-button">View Card on LOR.gg</button>
            <button className="action-button">Download Card image</button>
            <button className="action-button">Download Full Art</button>
          </div>
        </div>
      </div>
    </div>
  );
}
