import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Signup.css"; // Import CSS file

function Signup() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  function handleSubmit(event) {
    event.preventDefault();

    axios
      .post("https://covid-jw9g.onrender.com/signup", {
        email,
        username,
        password,
      })
      .then((res) => {
        alert("Account created successfully!");
        navigate("/");
      })
      .catch((err) => {
        console.error("Signup failed:", err);
        alert("Error creating account. Please try again.");
      });
  }

  return (
    <div className="sign">
      <div className="outlet">
        <form onSubmit={handleSubmit}>
          <div className="item">
            <h1>Create Account</h1>

            <label htmlFor="email">
              <b>Email</b>
            </label>
            <input
              type="email"
              id="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <label htmlFor="username">
              <b>Username</b>
            </label>
            <input
              type="text"
              id="username"
              placeholder="Enter username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />

            <label htmlFor="password">
              <b>Password</b>
            </label>
            <input
              type="password"
              id="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <button id="create-btn" type="submit">
              Create Account
            </button>

            <p>Already have an account?</p>
            <Link to="/login">
              <button id="login-btn">Login</button>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Signup;
