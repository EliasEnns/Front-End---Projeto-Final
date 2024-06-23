import { useContext, createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";


const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const storedToken = localStorage.getItem("site");
    if (storedToken) {
      setToken(storedToken);
      // Optionally, you can fetch user info using the token here
    }
  }, []);

  const loginAction = async (data) => {
    try {
      const response = await fetch("http://localhost:3000/users");
      const users = await response.json();
      const user = users.find(
        (u) => u.username === data.username && u.password === data.password
      );

      if (!user) {
        throw new Error("Invalid credentials");
      }

      // Mock token (in real-world scenario, use JWT or similar)
      const token = `mock_token_${user.id}`;

      setUser({ username: user.username, name: user.name });
      setToken(token);
      localStorage.setItem("site", token);
      navigate("/dashboard");
    } catch (err) {
      console.error(err.message);
    }
  };

  const logOut = () => {
    setUser(null);
    setToken("");
    localStorage.removeItem("site");
    navigate("/login");
  };

  return (
    <AuthContext.Provider value={{ token, user, loginAction, logOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

export const useAuth = () => {
  return useContext(AuthContext);
};