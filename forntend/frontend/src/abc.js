import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import image from "./assest/5382378.jpg";

function Abc() {
  const [value, setvalue] = useState("");
  const navigate = useNavigate();
  return (
    <div
      style={{
        backgroundImage: `url(${image})`,
        backgroundPosition: "center",
        backgroundSize: "cover",
      }}
    >
      <div className="first">
        <button
          style={{ marginLeft: "80%" }}
          id="abcbtn"
          onClick={() => {
            navigate("/login");
          }}
        >
          login
        </button>
        <button
          style={{ marginLeft: "0px" }}
          id="abcbtn"
          onClick={() => {
            navigate("/signup");
          }}
        >
          signup
        </button>
      </div>
    </div>
  );
}

export default Abc;
