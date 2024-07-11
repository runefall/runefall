import Card from "@/components/Card";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function SearchPage({ query } : { query: string }) {
  interface Card {
    id: string;
    type: string;
    attributes: {
      assets: {
        gameAbsolutePath: string
      }[];
      name: string;
      card_code: string;
    }
  }

  const [cards, setCards] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    navigate(`/search?query=${query}`);
    const host = import.meta.env.PROD ? "https://runefall.netlify.app" : "http://localhost:3000";
    
    fetch(
      `${host}/api/v1/cards/search?query=${query}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
      },
    })
      .then((response) => response.json())
      .then((json) => setCards(json.data));
  }, [query]);


  return (
    <div className="grid gap-2 justify-center grid-cols-[repeat(auto-fill,minmax(200px,1fr))] justify-items-center m-4">
      {
        cards.map((card: Card, i) => (
          <Link to={`/card/${card.attributes.card_code}`} key={i}>
            <Card {...card} />
          </Link>
        ))
      }
    </div>
  );
}
