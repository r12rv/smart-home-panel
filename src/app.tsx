import { useEffect, useState } from "react";
import Home from "./pages/home";
import { auth } from './firebase';
import { onAuthStateChanged } from "firebase/auth";
import Login from "./components/login/login";

const App = () => {
  const [user, setUser] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user: any) => {
      setUser(user);
      setIsLoading(false);
    });
    return () => unsubscribe();
  }, []);
  if (isLoading) {
    return (
      <div className="h-full w-full bg-gray-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }
  if (!user) return <Login onLogin={() => setUser(auth.currentUser)} />;
  return <Home/>;
};

export default App;
