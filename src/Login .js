// import React from "react";
// import { useState } from "react";

// import axios from "axios";
// import { Link, useNavigate } from "react-router-dom";
// import "./Login.css";
// function Login() {
//   const navigate = useNavigate();
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const handlelogin = async (e) => {
//     e.preventDefault();

//     try {
//       const response = await axios.post(
//         "http://localhost:8000/api/user/login",
//         {
//           email,
//           password,
//         }
//       );
//       const { token, user } = response.data;

//       localStorage.setItem("token", token);
//       console.log("login successful ", user);
//       if (user.Admin === true) {
//         navigate("/AdminHomepage");
//       } else {
//         navigate("/Property");
//       }
//     } catch (error) {
//       console.log("login fail", error);
//     }
//   };

//   return (
//     <div className="container containerr">
//       <form onSubmit={handlelogin}>
//         <h4 className="loginheding">Login</h4>

//         <div className="form-group">
//           <label for="exampleInputEmail1">Email address</label>
//           <input
//             type="email"
//             className="form-control"
//             id="exampleInputEmail1"
//             aria-describedby="emailHelp"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//           />
//         </div>
//         <div className="form-group">
//           <label for="exampleInputPassword1">Password</label>
//           <input
//             type="password"
//             className="form-control"
//             id="exampleInputPassword1"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//           />
//         </div>

//         <button type="submit" className="btn btn-primary">
//           Submit
//         </button>
//         <p>
//           if you not registerd <Link to={"/Register"}>Register</Link>
//         </p>
//       </form>
//     </div>
//   );
// }

// export default Login;

import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";
import { FaEnvelope, FaLock } from "react-icons/fa";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await axios.post("http://localhost:8000/api/user/login", {
        email,
        password,
      });

      const { token, user } = response.data;
      localStorage.setItem("token", token);
      console.log("Login successful", user);

      navigate(user.Admin ? "/AdminHomepage" : "/Property");
    } catch (err) {
      console.error("Login failed", err);
      setError("Invalid email or password. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleLogin}>
        <h2 className="login-heading">Login</h2>

        {error && <p className="error-message">{error}</p>}

        <div className="form-group">
          <label>Email address</label>
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

        <button type="submit" className="login-btn" disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>

        <p className="register-link">
          Not registered? <Link to="/Register">Create an account</Link>
        </p>
      </form>
    </div>
  );
}

export default Login;
