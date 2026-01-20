import { useState } from "react";
import "../styles/pages/Auth.css";

function RegisterPage({ setCurrentPage }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleRegister = async () => {
    setMessage("");

    if (!name || !email || !password) {
      setMessage("⚠️ All fields are required");
      return;
    }

    try {
      const response = await fetch("http://localhost:8080/users/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Registration failed");
      }

      setMessage("✅ Registration successful. Please login.");

      // go to login after short delay
      setTimeout(() => {
        setCurrentPage("login");
      }, 800);
    } catch (err) {
      console.error("REGISTER ERROR ❌", err);
      setMessage("❌ Registration failed. Email may already exist.");
    }
  };

  return (
    <div className="auth-container">
      <h2 className="auth-title">📝 Register</h2>

      <div className="auth-field">
        <label>Name</label>
        <input
          type="text"
          placeholder="Enter your full name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>

      <div className="auth-field">
        <label>Email</label>
        <input
          type="email"
          placeholder="Enter email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      <div className="auth-field">
        <label>Password</label>
        <input
          type="password"
          placeholder="Enter password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      <button className="auth-button" onClick={handleRegister}>
        Register
      </button>

      <p className="auth-switch">
        Already have an account?{" "}
        <span onClick={() => setCurrentPage("login")}>
          Login
        </span>
      </p>

      {message && <p className="auth-message">{message}</p>}
    </div>
  );
}

export default RegisterPage;
