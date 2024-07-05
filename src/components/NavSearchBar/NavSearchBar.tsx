import { useState } from "react";
import { FaMagnifyingGlass } from "react-icons/fa6";
import "./NavSearchBar.css";

export default function NavSearchBar() {
  const [search, setSearch] = useState("");

  function handleSearch(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      console.log("Search for:", search);
    }
  }

  return (
    <div className="nav-search-container">
      <FaMagnifyingGlass color="black" />
      <input
        type="text"
        placeholder="Search"
        value={search}
        id="nav-search-bar"
        onChange={(e) => setSearch(e.target.value)}
        onKeyDown={handleSearch}
      />
    </div>
  );
}
