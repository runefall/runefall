import ModeToggle from "@/components/ModeToggle";
import NavSearchBar from "@/components/NavSearchBar";
import { Link } from "react-router-dom";

export default function NavBar() {
  return (
    <header className="flex justify-center bg-blue-900">
      <div className="flex max-w-screen-xl flex-1 gap-4 px-8 py-4">
        <Link className="hidden md:block" to="/" data-test-id="nav-logo">
          <h1 className="text-4xl font-bold text-white">RUNEFALL</h1>
        </Link>
        <NavSearchBar />
        <ModeToggle />
      </div>
    </header>
  );
}
