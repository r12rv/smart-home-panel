import { createContext, useContext } from "react";
import ThemeContext from "./contexts/theme";
import AuthContext from "./contexts/auth";

export interface ICommonStore {
  themeStore: ThemeContext;
  authStore: AuthContext;
}

export const HomePageContext = createContext<ICommonStore>({} as any);

export const HomePageContextProvider = HomePageContext.Provider;
export const useHomePageContext = () => useContext(HomePageContext);
