import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Home from "./home";

function Book() {
  const [bookcentre, setbookcentre] = useState([]);
  const [id, setid] = useState("");
  let navigate = useNavigate();

  async function select() {
    await axios.get(`http://localhost:8081/booking`).then((res) => {
      console.log(res.data[0].cid);
      setid(res.data[0].cid);
    });
  }
  useEffect(() => {
    display(id);
  }, [id]);

  select();
  async function display(centreid) {
    try {
      const res = await axios.get(`http://localhost:8081/display/${centreid}`);
      if (res.data === "fail") {
        alert("no reservation");
      } else {
        console.log(res.data[0]);
        setbookcentre(res.data[0]);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  }

  return (
    <div>
      <h2 id="name">Name: {bookcentre.name}</h2>
      <h2 id="location">location: {bookcentre.location}</h2>
      <h2 id="address">address: {bookcentre.address}</h2>
      <h2 id="time">
        time: {bookcentre.optime}AM - {bookcentre.cltime}PM
      </h2>
      <button
        onClick={() => {
          navigate("/adminhome");
        }}
      >
        {" "}
        hk
      </button>
    </div>
  );
}

export default Book;
