import ModeToggle from "@/components/ModeToggle";
import NavSearchBar from "@/components/NavSearchBar";
import { Link } from "react-router-dom";

export default function NavBar() {
  return (
    <header className="bg-blue-900">
      <div className="flex max-w-screen-xl gap-4 px-8 py-4">
        <Link to="/">
          <h1 className="text-4xl font-bold text-white">RUNEFALL</h1>
        </Link>
        <NavSearchBar />
        <ModeToggle />
      </div>
    </header>
  );
}
