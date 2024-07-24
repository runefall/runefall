import Footer from "@/components/Footer";
import NavBar from "@/components/NavBar";
import ThemeProvider from "@/components/ThemeProvider";
import { Route, Routes, useLocation } from "react-router-dom";
import CardPage from "./pages/CardPage";
import HomePage from "./pages/HomePage";
import SearchPage from "./pages/SearchPage";
import SyntaxPage from "./pages/SyntaxPage";

function App() {
  const location = useLocation();
  const { pathname } = location;

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <div className="flex min-h-screen flex-col">
        {pathname !== "/" && <NavBar />}
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/search" element={<SearchPage />} />
            <Route path="/card/:code" element={<CardPage />} />
            <Route path="/syntax" element={<SyntaxPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </ThemeProvider>
  );
}

export default App;
