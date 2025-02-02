// import React from "react";
// import "./Register.css";
// import { useState } from "react";
// import axios from "axios";
// import { Link, useNavigate } from "react-router-dom";
// function Register() {
//   const [username, setUsername] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [contact, setContact] = useState("");

//   const navigate = useNavigate();
//   const handleregister = async (e) => {
//     e.preventDefault();
//     const response = await axios.post(
//       "http://localhost:8000/api/user/Register",
//       {
//         username,
//         email,
//         password,
//         contact,
//       }
//     );
//     if (response.data) {
//       console.log(response.data);
//       navigate("/");
//     } else {
//       alert("invalid cridencial");
//       console.log(response.data.error);
//     }
//   };
//   return (
//     <div className="container">
//       <form onSubmit={handleregister} id="RegistrationFom">
//         <h3 className="heading">Registration</h3>

//         <div className="form-row">
//           <div className="form-group col-md-6">
//             <label htmlFor="inputEmail4">UserName</label>
//             <input
//               type="text"
//               className="form-control"
//               id="inputEmail4"
//               value={username}
//               onChange={(e) => setUsername(e.target.value)}
//             />
//           </div>
//           <div className="form-group col-md-6">
//             <label htmlFor="inputCity">Mobile No</label>
//             <input
//               type="tel"
//               className="form-control"
//               id="inputCity"
//               value={contact}
//               onChange={(e) => setContact(e.target.value)}
//             />
//           </div>
//         </div>

//         <div className="form-row">
//           <div className="form-group col-md-6">
//             <label htmlFor="inputEmail4">Email</label>
//             <input
//               type="email"
//               className="form-control"
//               id="inputEmail4"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//             />
//           </div>
//           <div className="form-group col-md-6">
//             <label htmlFor="inputPassword4">Password</label>
//             <input
//               type="password"
//               className="form-control"
//               id="inputPassword4"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//             />
//           </div>
//         </div>

//         <button type="submit" className="btn btn-primary">
//           Sign in
//         </button>
//         <p>
//           if you alredy Registerd <Link to={"/"}>Login</Link>{" "}
//         </p>
//       </form>
//     </div>
//   );
// }

// export default Register;

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
      const response = await axios.post("http://localhost:8000/api/user/Register", {
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
