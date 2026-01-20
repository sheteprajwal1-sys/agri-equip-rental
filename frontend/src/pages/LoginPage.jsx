import { useState } from "react";
import "../styles/pages/Auth.css";

function LoginPage({ setIsLoggedIn, setCurrentPage, setUser }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setMessage("");

    if (!email || !password) {
      setMessage("⚠️ Please enter email and password");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("http://localhost:8080/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error("Invalid credentials");
      }

      const result = await response.json();
      console.log("LOGIN RESPONSE ✅", result);

    
      const loggedInUser = {
        name: result.name,     
        email: result.email,
        role: result.role,    
      };

      localStorage.setItem("token", result.token);
      localStorage.setItem("user", JSON.stringify(loggedInUser));

      setUser(loggedInUser);
      setIsLoggedIn(true);

      //ROLE BASED REDIRECT
      if (loggedInUser.role === "ADMIN") {
        setCurrentPage("admin");
      } else {
        setCurrentPage("equipment");
      }

    } catch (error) {
      console.error("LOGIN ERROR ❌", error);
      setMessage("❌ Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <h2 className="auth-title">🔐 Login</h2>

      <div className="auth-field">
        <label>Email</label>
        <input
          type="email"
          placeholder="Enter email"
          value={email}
           autoComplete="off"
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      <div className="auth-field">
        <label>Password</label>
        <input
          type="password"
          placeholder="Enter password"
          value={password}
          autoComplete="new-password" 
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      <button
        className="auth-button"
        onClick={handleLogin}
        disabled={loading}
      >
        {loading ? "Logging in..." : "Login"}
      </button>

      <p className="auth-switch">
        Don’t have an account?{" "}
        <span onClick={() => setCurrentPage("register")}>
          Register
        </span>
      </p>

      {message && <p className="auth-message">{message}</p>}
    </div>
  );
}

export default LoginPage;
