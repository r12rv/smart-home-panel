import { configureStore, createSlice } from "@reduxjs/toolkit";
import { User as FirebaseUser } from "firebase/auth";

// Интерфейс состояния авторизации
interface AuthState {
  user: FirebaseUser | null;
  isLoading: boolean;
}

// Создание слайса для авторизации
const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    isLoading: true,
  } as AuthState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setIsLoading: (state, action) => {
      state.isLoading = action.payload;
    },
  },
});

// Экспорт действий
export const { setUser, setIsLoading } = authSlice.actions;

// Настройка Redux store
export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
  },
});

// Типы для использования в компонентах
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
