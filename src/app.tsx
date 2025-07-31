import { useEffect, useMemo, useState } from "react";
import Home from "./pages/home";
import { auth } from "./firebase";
import { onAuthStateChanged } from "firebase/auth";
import Login from "./components/login/login";
import {
  HomePageContextProvider,
  ICommonStore,
} from "./providers/app-provider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Loader from "./components/loader/loader";
import AuthContext from "./contexts/auth";
import { ThemeProvider } from "./providers/theme-provider";

const App = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const homePage = useMemo<ICommonStore>(
    () => ({
      authStore: new AuthContext(),
    }),
    [],
  );
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      homePage.authStore.setUser(user);
      setIsLoading(false);
    });
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
    <ThemeProvider>
      <HomePageContextProvider value={homePage}>
        <QueryClientProvider client={new QueryClient()}>
          <Home />
        </QueryClientProvider>
      </HomePageContextProvider>
    </ThemeProvider>
  );
};

export default App;
