import { useEffect, useState } from "react";
import Home from "./pages/home";
import { auth } from './firebase';
import { onAuthStateChanged } from "firebase/auth";
import Login from "./components/login/login";

const App = () => {
  const [user, setUser] = useState<any>(null);
  useEffect(() => {
    onAuthStateChanged(auth, (user: any) => setUser(user));
  }, []);
  if (!user) return <Login onLogin={() => setUser(auth.currentUser)} />;
  return <Home/>
}

export default App;
