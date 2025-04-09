import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Index from "./pages/Index";
import { ThemeProvider } from "./components/theme-provider";
import Generator from "./pages/Generator";

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/generator" element={<Generator />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
