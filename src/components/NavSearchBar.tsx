import { useState, useEffect } from "react";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { useNavigate, useSearchParams } from "react-router-dom";

export default function NavSearchBar() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("query");
  const [search, setSearch] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    if (query) {
      setSearch(query);
    } else {
      setSearch("");
    }
  }, [query]);

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
