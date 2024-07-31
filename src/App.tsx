import Footer from "@/components/Footer";
import NavBar from "@/components/NavBar";
import ThemeProvider from "@/components/ThemeProvider";
import { ErrorBoundary } from "react-error-boundary";
import { Route, Routes, useLocation } from "react-router-dom";
import AboutPage from "./pages/AboutPage";
import CardPage from "./pages/CardPage";
import FallBackPage from "./pages/FallBackPage.tsx";
import HomePage from "./pages/HomePage";
import SearchPage from "./pages/SearchPage";
import SetPage from "./pages/SetPage.tsx";
import SyntaxPage from "./pages/SyntaxPage";

function App() {
  const location = useLocation();
  const { pathname } = location;

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <ErrorBoundary FallbackComponent={FallBackPage}>
        <div className="flex min-h-screen flex-col">
          {pathname !== "/" && <NavBar />}
          <main className="flex flex-1 flex-col">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/search" element={<SearchPage />} />
              <Route path="/card/:code" element={<CardPage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/sets" element={<SetPage />} />
              <Route path="/syntax" element={<SyntaxPage />} />
              <Route path="/random" element={<div>Random</div>} />
            </Routes>
          </main>
          <Footer />
        </div>
      </ErrorBoundary>
    </ThemeProvider>
  );
}

export default App;
