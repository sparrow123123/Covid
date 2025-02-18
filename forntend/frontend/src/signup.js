import axios from "axios";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function Signup() {
  const [email, setemail] = useState("");
  const [user, setuser] = useState("");
  const [pass, setpass] = useState("");
  let navigate = useNavigate();
  function handleSubmit(event) {
    event.preventDefault();
    axios
      .get("https://covid-jw9g.onrender.com//signup", { email, user, pass })
      .then((res) => {
        console.log(res);
        alert("account created");
        navigate("/");
      });
  }

  return (
    <div className="sign">
      <div className="outlet">
        <form onSubmit={handleSubmit}>
          <div className="item">
            <h1>Create Acount</h1>
            <label htmlFor="emailid">
              <b>Mail Id</b>
            </label>
            <br />
            <input
              type="email"
              id="emailid"
              placeholder="enter email"
              onChange={(e) => setemail(e.target.value)}
            ></input>
            <br></br>
            <br></br>

            <label htmlFor="username">
              <b>USERNAME</b>:{" "}
            </label>
            <br />
            <input
              type="text"
              id="username"
              name="username"
              placeholder="Username"
              onChange={(e) => setuser(e.target.value)}
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
              onChange={(e) => setpass(e.target.value)}
            ></input>
            <br></br>
            <button id="create-btn">Create Account</button>
            <button
              onClick={() => {
                navigate("/login");
              }}
              id="create-btn"
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Signup;
