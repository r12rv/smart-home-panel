import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";

function Login({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      onLogin();
    } catch (err) {
      setError(err.message);
    }
  };

  const createUser = () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log("successful", userCredential);
      })
      .catch((error) => {
        console.warn("error");
      });
  };

  return (
    <div className="min-h-screen flex-grow bg-gray-900 text-white flex items-center justify-center">
      <div className="bg-gray-800 p-6 rounded-lg">
        <h2 className="text-2xl mb-4">Login</h2>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          className="bg-gray-700 p-2 rounded mb-2 w-full"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className="bg-gray-700 p-2 rounded mb-2 w-full"
        />
        {error && <p className="text-red-500">{error}</p>}
        <div className="flex gap-4">
          <button
            onClick={handleLogin}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
          >
            Login
          </button>
          <button
            onClick={createUser}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
          >
            Sing up
          </button>
        </div>
      </div>
    </div>
  );
}
export default Login;
