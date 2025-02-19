import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./Login.css"; // Import the CSS file
import backgroundImage from "./assest/1663.jpg"; // Ensure this path is correct

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  function handleSubmit(event) {
    event.preventDefault();

    axios
      .post("https://covid-jw9g.onrender.com/", { username, password })
      .then((res) => {
        if (res.data === "fail") {
          alert("Invalid username or password");
        } else {
          if (
            res.data[0].username === "admin" &&
            res.data[0].password === 12345
          ) {
            navigate("/adminhome");
          } else {
            updateUserStatus();
            navigate("/home");
          }
        }
      })
      .catch(() => {
        alert("Login failed. Please try again.");
      });
  }

  function updateUserStatus() {
    axios
      .get(`https://covid-jw9g.onrender.com/update/${username}/${password}`)
      .then((res) => console.log(res));
  }

  return (
    <div className="log" style={{ backgroundImage: `url(${backgroundImage})` }}>
      <div className="outlet">
        <form onSubmit={handleSubmit}>
          <div className="item">
            <h1>Login</h1>
            <label htmlFor="username">USERNAME:</label>
            <input
              type="text"
              id="username"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />

            <label htmlFor="password">PASSWORD:</label>
            <input
              type="password"
              id="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <button id="login-btn" type="submit">
              Login
            </button>

            <p>Don't have an account?</p>
            <Link to="/signup">
              <button id="signup-btn">Sign Up</button>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
