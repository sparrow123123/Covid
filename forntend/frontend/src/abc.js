import React from "react";
import { useNavigate } from "react-router-dom";
import image from "./assest/5382378.jpg";
import "./ABC.css"; // Import CSS

function Abc() {
  const navigate = useNavigate();

  return (
    <div className="abc-container" style={{ backgroundImage: `url(${image})` }}>
      <div className="first">
        <button id="abcbtn" onClick={() => navigate("/login")}>
          Login
        </button>
        <button id="abcbtn" onClick={() => navigate("/signup")}>
          Signup
        </button>
      </div>
    </div>
  );
}

export default Abc;
