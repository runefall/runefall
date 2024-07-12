import { Input } from "@/components/ui/input";
import { useEffect, useRef, useState } from "react";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

export default function HomePage() {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const searchBar = useRef<HTMLInputElement>(null);

  useEffect(() => {
    searchBar.current?.focus();
  }, []);

  return (
    <div className="flex h-screen flex-col items-center justify-center bg-gradient-to-b from-blue-900 to-blue-700 p-5">
      <h1
        data-test-id="home-slogan"
        className="mb-8 text-center text-4xl text-white"
      >
        <b className="font-bold">Runefall</b> is a powerful{" "}
        <b className="font-bold">Legends of Runeterra</b> card search
      </h1>
      <div className="relative w-full max-w-[600px]">
        <FaMagnifyingGlass
          size={"1.5rem"}
          className="absolute left-4 top-1/2 -translate-y-1/2"
        />
        <Input
          ref={searchBar}
          data-test-id="home-search-bar"
          className="h-16 w-full rounded-none pl-12 text-xl"
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onKeyDown={(e) => {
            if (e.code == "Enter")
              navigate(`/search?query=${encodeURIComponent(search.trim())}`);
          }}
        />
      </div>
    </div>
  );
}