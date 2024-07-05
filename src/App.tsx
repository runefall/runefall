import NavBar from "@/components/NavBar/NavBar";
import { ThemeProvider } from "@/components/theme-provider";
import { BrowserRouter } from "react-router-dom";

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <BrowserRouter>
        <NavBar />
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
