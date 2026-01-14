import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const Login = ({ setUser }) => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", formData);
      const userData = res.data.user || { name: formData.email.split("@")[0] }; // fallback
      setUser(userData);
      setMessage("✅ Login successful!");
      setTimeout(() => navigate("/"), 1200);
    } catch (err) {
      setMessage(err.response?.data?.message || "❌ Invalid credentials");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <h2>Login</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
        <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} required />
        <button type="submit" style={styles.button} disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>

      {message && <p style={message.includes("✅") ? styles.success : styles.error}>{message}</p>}

      <p>
        Don’t have an account? <Link to="/signup">Sign Up</Link>
      </p>
    </div>
  );
};

const styles = {
  container: { maxWidth: "400px", margin: "80px auto", textAlign: "center" },
  form: { display: "flex", flexDirection: "column", gap: "12px" },
  button: { background: "#28a745", color: "white", padding: "10px", border: "none", borderRadius: "5px" },
  success: { color: "green", fontWeight: "bold" },
  error: { color: "red", fontWeight: "bold" },
};

export default Login;
