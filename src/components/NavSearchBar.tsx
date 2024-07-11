import { useState } from "react";
import { FaMagnifyingGlass } from "react-icons/fa6";

export default function NavSearchBar({
  queryHandler,
}: {
  queryHandler: (query: string) => void;
}) {
  const [search, setSearch] = useState("");

  function handleSearch(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      queryHandler(search);
    }
  }

  return (
    <div className="relative flex flex-1">
      <FaMagnifyingGlass
        className="absolute left-2 top-1/2 -translate-y-1/2"
        color="black"
      />
      <input
        className="flex-1 pl-8 text-black"
        type="text"
        placeholder="Search"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        onKeyDown={handleSearch}
      />
    </div>
  );
}
