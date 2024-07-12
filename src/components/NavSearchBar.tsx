import { useState } from "react";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

export default function NavSearchBar() {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  return (
    <div className="relative flex flex-1">
      <FaMagnifyingGlass
        className="absolute left-2 top-1/2 -translate-y-1/2"
        color="black"
      />
      <input
        data-test-id="nav-search-bar-input"
        className="flex-1 pl-8 text-black"
        type="text"
        placeholder="Search"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") navigate(`/search?query=${search}`);
        }}
      />
    </div>
  );
}
