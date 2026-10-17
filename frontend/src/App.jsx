import { Show, SignInButton, SignUpButton, UserButton } from "@clerk/react";
import { Button } from "@heroui/react";
import { WallpaperProvider } from "./context/WallpaperContext.jsx";
import { ThemeProvider } from "./context/ThemeContext.jsx";
import Chatpage from "./pages/Chatpage.jsx";
import Authpage from "./pages/Authpage.jsx";
import { Route, Routes, Navigate } from "react-router";
import { useAuth } from "@clerk/react";
function App() {
  const { isLoaded, isSignedIn } = useAuth();
  if (!isLoaded) return <div>Loading...</div>;
  return (
    <ThemeProvider>
      <WallpaperProvider>
        <Routes>
          <Route
            path="/"
            element={
              isSignedIn ? <Chatpage /> : <Navigate to={"/auth"} replace />
            }
          />
          <Route
            path="/auth"
            element={
              !isSignedIn ? (
                <Authpage />
              ) : (
                <Navigate to={"/"} replace></Navigate>
              )
            }
          />
        </Routes>
      </WallpaperProvider>
    </ThemeProvider>
  );
}

export default App;
