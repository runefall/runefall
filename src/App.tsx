import Footer from "@/components/Footer/Footer";
import NavBar from "@/components/NavBar/NavBar";
import { ThemeProvider } from "@/components/theme-provider";
import { BrowserRouter } from "react-router-dom";
import "./App.css";

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <BrowserRouter>
        <NavBar />
        <div className="main-div">test</div>
        <Footer />
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
