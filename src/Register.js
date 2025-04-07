
import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "./Register.css";
import { FaUser, FaEnvelope, FaLock, FaPhone } from "react-icons/fa";

function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [contact, setContact] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await axios.post("https://realestate-back-x6dl.onrender.com/api/user/Register", {
        username,
        email,
        password,
        contact,
      });

      if (response.data) {
        console.log("Registration Successful", response.data);
        navigate("/");
      }
    } catch (err) {
      console.error("Registration Failed", err);
      setError("Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-container">
      <form className="register-form" onSubmit={handleRegister}>
        <h2 className="register-heading">Register</h2>

        {error && <p className="error-message">{error}</p>}

        <div className="form-group">
          <label>Username</label>
          <div className="input-icon">
            <FaUser className="icon" />
            <input
              type="text"
              placeholder="Enter your name"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
        </div>

        <div className="form-group">
          <label>Mobile No</label>
          <div className="input-icon">
            <FaPhone className="icon" />
            <input
              type="tel"
              placeholder="Enter your mobile no."
              value={contact}
              onChange={(e) => setContact(e.target.value)}
              required
            />
          </div>
        </div>

        <div className="form-group">
          <label>Email</label>
          <div className="input-icon">
            <FaEnvelope className="icon" />
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
        </div>

        <div className="form-group">
          <label>Password</label>
          <div className="input-icon">
            <FaLock className="icon" />
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
        </div>

        <button type="submit" className="register-btn" disabled={loading}>
          {loading ? "Registering..." : "Sign Up"}
        </button>

        <p className="login-link">
          Already registered? <Link to="/">Login here</Link>
        </p>
      </form>
    </div>
  );
}

export default Register;
