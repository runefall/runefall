import { ModeToggle } from "@/components/mode-toggle";
import NavSearchBar from "@/components/NavSearchBar/NavSearchBar";
import "./NavBar.css";

export default function NavBar() {
  return (
    <header className="nav-header">
      <ModeToggle />
      <h1>RUNEFALL</h1>
      <NavSearchBar />
    </header>
  );
}
