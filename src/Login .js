import React from "react";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Login.css";
function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handlelogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:8000/api/user/login",
        {
          email,
          password,
        }
      );
      const { token, user } = response.data;

      localStorage.setItem("token", token);
      console.log("login successful ", user);
      if (user.Admin === true) {
        navigate("/Admin");
      } else {
        navigate("/UserHomepage");
      }
    } catch (error) {
      console.log("login fail", error);
    }
  };

  return (
    <div className="container containerr">
      <form onSubmit={handlelogin}>
        <h4 className="loginheding">Login</h4>

        <div className="form-group">
          <label for="exampleInputEmail1">Email address</label>
          <input
            type="email"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label for="exampleInputPassword1">Password</label>
          <input
            type="password"
            className="form-control"
            id="exampleInputPassword1"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Submit
        </button>
        <p>
          {/* if you not registerd <Link to={"/register"}>Register</Link> */}
        </p>
      </form>
    </div>
  );
}

export default Login;
