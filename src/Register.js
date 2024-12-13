import React from "react";
import "./Register.css";
import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  //const [age, setAge] = useState("");
  const [contact, setContact] = useState("");
  //const [address, setAddress] = useState("");
  //const [role, setRole] = useState("");
  //const [gender, setGender] = useState("");
  //const [specialist_doctor, setSpecialist] = useState("");
  const navigate = useNavigate();
  const handleregister = async (e) => {
    e.preventDefault();
    const response = await axios.post(
      "http://localhost:8000/api/user/Register",
      {
        username,
        email,
        password,
        contact,
      }
    );
    if (response.data) {
      console.log(response.data);
      navigate("/");
    } else {
      alert("invalid cridencial");
      console.log(response.data.error);
    }
  };
  return (
    <div className="container">
      <form onSubmit={handleregister} id="RegistrationFom">
        <h3 className="heading">Registration</h3>

        <div className="form-row">
          <div className="form-group col-md-6">
            <label htmlFor="inputEmail4">UserName</label>
            <input
              type="text"
              className="form-control"
              id="inputEmail4"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="form-group col-md-6">
            <label htmlFor="inputCity">Mobile No</label>
            <input
              type="tel"
              className="form-control"
              id="inputCity"
              value={contact}
              onChange={(e) => setContact(e.target.value)}
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group col-md-6">
            <label htmlFor="inputEmail4">Email</label>
            <input
              type="email"
              className="form-control"
              id="inputEmail4"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="form-group col-md-6">
            <label htmlFor="inputPassword4">Password</label>
            <input
              type="password"
              className="form-control"
              id="inputPassword4"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </div>

        <button type="submit" className="btn btn-primary">
          Sign in
        </button>
        <p>
          if you alredy Registerd <Link to={"/"}>Login</Link>{" "}
        </p>
      </form>
    </div>
  );
}

export default Register;
