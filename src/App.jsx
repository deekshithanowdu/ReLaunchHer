import React from "react";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "./context/ThemeContext";
import { AuthProvider } from "./context/AuthContext";
import { AppProvider } from "./context/AppContext";
import AppRoutes from "./routes/AppRoutes";
import MobileMenu from "./components/layout/MobileMenu";
import { useAuth } from "./context/AuthContext";

// Nested helper to conditionally render the mobile navigation bar
const AppWithMobileMenu = () => {
  const { isAuthenticated } = useAuth();
  return (
    <>
      <AppRoutes />
      {isAuthenticated && <MobileMenu />}
    </>
  );
};

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <AppProvider>
          <AppWithMobileMenu />
        </AppProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
