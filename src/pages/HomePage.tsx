import { useState } from "react";
import { useNavigate } from "react-router-dom";
//import React from "react";


export default function HomePage() {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  return (
    <div className="flex h-screen flex-col items-center justify-center bg-blue-900">
      <h1 id="test">This block for testing purposes. Delete later.</h1> {/* Added to pass auto Cypress testing */}
      <h1 className="text-center text-4xl text-white">
        <b className="font-bold">Runefall</b> is a powerful{" "}
        <b className="font-bold">Legends of Runeterra</b> card search
      </h1>
      <input
        className="bg-black text-white"
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        onKeyDown={(e) => {
          if (e.code == "Enter") {
            navigate(`/search?query=${search}`);
          }
        }}
      />
    </div>
  );
}
