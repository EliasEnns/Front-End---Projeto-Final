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

      setUser({ id: user.id, username: user.username, name: user.name });
      setToken(token);
      localStorage.setItem("site", token);
      navigate("/");
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

  const deleteUserAction = async () => {
    try {
      if (!user) {
        throw new Error("User not found");
      }
      const response = await fetch(`http://localhost:3000/users/${user?.id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete user");
      }

      setUser(null);
      setToken("");
      localStorage.removeItem("site");
      navigate("/login");
    } catch (err) {
      console.error(err.message);
    }
  };

  const registerAction = async (data) => {
    try {
      // Check if username already exists
      const existingUserResponse = await fetch("http://localhost:3000/users");
      const existingUsers = await existingUserResponse.json();
      const isUsernameTaken = existingUsers.some(
        (u) => u.username === data.username
      );
      if (isUsernameTaken) {
        throw new Error("Username already in use");
      }

      const response = await fetch("http://localhost:3000/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Registration failed");
      }

      const user = await response.json();

      // Mock token (in real-world scenario, use JWT or similar)
      const token = `mock_token_${user.id}`;

      setUser({ id: user.id, username: user.username });
      setToken(token);
      localStorage.setItem("site", token);
      navigate("/");
    } catch (err) {
      console.error(err.message);
    }
  };

  const editUsernameAction = async (newUsername) => {
    try {
      const response = await fetch("http://localhost:3000/users");
      const users = await response.json();
      const currentUser = users.find((u) => u.id === user?.id);

      // Check if username already exists
      const isUsernameTaken = users.some(
        (u) => u.username === newUsername && u.id !== user?.id
      );
      if (isUsernameTaken) {
        throw new Error("Username already in use");
      }

      const editResponse = await fetch(`http://localhost:3000/users/${currentUser?.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username: newUsername }),
      });

      if (!editResponse.ok) {
        throw new Error("Failed to edit username");
      }

      setUser((prevUser) => ({ ...prevUser, username: newUsername }));
    } catch (err) {
      console.error(err.message);
    }
  };

  const editPasswordAction = async (newPassword) => {
    try {
      const response = await fetch(`http://localhost:3000/users/${user?.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ password: newPassword }),
      });

      if (!response.ok) {
        throw new Error("Failed to edit password");
      }
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        token,
        user,
        setUser,
        setToken,
        loginAction,
        logOut,
        registerAction,
        deleteUserAction,
        editUsernameAction,
        editPasswordAction,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

export const useAuth = () => {
  return useContext(AuthContext);
};
