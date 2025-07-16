import { useEffect, useMemo, useState } from "react";
import { Provider, useSelector, useDispatch } from "react-redux";
import Home from "./pages/home";
import { auth } from "./firebase";
import { onAuthStateChanged } from "firebase/auth";
import Login from "./components/login/login";
import { HomePageContextProvider, ICommonStore } from "./provider";
import ThemeContext from "./contexts/theme";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Loader from "./components/loader/loader";
import AuthContext from "./contexts/auth";

const App = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const homePage = useMemo<ICommonStore>(
    () => ({
      themeStore: new ThemeContext(),
      authStore: new AuthContext(),
    }),
    [],
  );
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      homePage.authStore.setUser(user);
      setIsLoading(false);
    });
    homePage.themeStore.setPreferedTheme();
    return () => unsubscribe();
  }, []);
  if (isLoading) {
    return <Loader />;
  }
  if (!homePage.authStore.user)
    return (
      <Login onLogin={() => homePage.authStore.setUser(auth.currentUser)} />
    );
  return (
    <HomePageContextProvider value={homePage}>
      <QueryClientProvider client={new QueryClient()}>
        <Home />
      </QueryClientProvider>
    </HomePageContextProvider>
  );
};

export default App;
