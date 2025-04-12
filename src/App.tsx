import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import "./App.css";
import { ThemeProvider } from "./components/theme-provider";
import MagicLinkAuth from "./pages/MagicLinkAuth";
import { MagicLinkVerification } from './components/MagicLinkVerification';
import { ProtectedRoute } from './components/ProtectedRoute';
import Dashboard from './pages/Dashboard';
import Generator from './pages/Generator';
import Index from './pages/Index';

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Router>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/auth" element={<MagicLinkAuth />} />
          <Route path="/verify" element={<MagicLinkVerification />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/generator"
            element={
              <ProtectedRoute>
                <Generator />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
