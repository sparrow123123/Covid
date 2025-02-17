import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import image from "./assest/1663.jpg";
function Login() {
  const [username, setusername] = useState("");
  const [password, setpassword] = useState("");
  const backgroundImage = 'url("path/to/your/image.jpg")';
  const navigate = useNavigate();
  function handleSubmit(event) {
    event.preventDefault();

    axios
      .post("https://covid-8-be8z.onrender.com/", { username, password })
      .then((res) => {
        if (res.data === "fail") {
          console.log(res.data);
          alert("Invalid username or password");
        } else {
          if (
            res.data[0].username === "admin" &&
            res.data[0].password === 12345
          ) {
            navigate("/adminhome");
          } else {
            update();

            navigate("/home");
          }
        }
      })
      .catch((err) => {
        console.log("fail");
      });
  }
  function update() {
    axios
      .get(`https://covid-8-be8z.onrender.com/update/${username}/${password}`)
      .then((res) => {
        console.log(res);
      });
  }

  return (
    <div
      style={{
        backgroundImage: `url(${image})`,
        backgroundPosition: "center",
        backgroundSize: "cover",
      }}
      className="log"
    >
      <div className="outlet">
        <form onSubmit={handleSubmit}>
          <div className="item">
            <h1>Login</h1>
            <label htmlFor="username">
              <b>USERNAME</b>:{" "}
            </label>
            <br />
            <input
              type="text"
              id="username"
              name="username"
              placeholder="Username"
              onChange={(e) => setusername(e.target.value)}
            />
            <br />
            <br></br>

            <label htmlFor="password">
              <b>PASSWORD:</b>{" "}
            </label>
            <br />
            <input
              type="number"
              id="password"
              placeholder="Password"
              onChange={(e) => setpassword(e.target.value)}
            ></input>

            <button id="login-btn" onClick={() => {}}>
              Login
            </button>
            <b>
              <p>Dont have a account?</p>
            </b>
            <Link to="/signup">
              <button id="search-btn">sign up</button>{" "}
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
