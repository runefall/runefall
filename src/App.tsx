import Footer from "@/components/Footer";
import NavBar from "@/components/NavBar";
import { ThemeProvider } from "@/components/theme-provider";
import { useState } from "react";
import { Route, Routes, useLocation } from "react-router-dom";

import CardPage from "./pages/CardPage";
import HomePage from "./pages/HomePage";
import SearchPage from "./pages/SearchPage";

function App() {
  const location = useLocation();
  const { pathname } = location;

  const [query, setQuery] = useState("");

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <div className="flex min-h-screen flex-col">
        {pathname !== "/" && <NavBar queryHandler={setQuery} />}
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/search" element={<SearchPage query={query} />} />
            <Route path="/card/:code" element={<CardPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </ThemeProvider>
  );
}

export default App;
