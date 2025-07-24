import { createContext, useContext } from "react";
import AuthContext from "../contexts/auth";

export interface ICommonStore {
  authStore: AuthContext;
}

export const HomePageContext = createContext<ICommonStore>({} as any);

export const HomePageContextProvider = HomePageContext.Provider;
export const useHomePageContext = () => useContext(HomePageContext);
