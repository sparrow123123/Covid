import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Bookin.css"; // Import the CSS file

function Bookin() {
  const [bookCentre, setBookCentre] = useState(null);
  const [id, setId] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchBooking() {
      try {
        const res = await axios.get("https://covid-jw9g.onrender.com/booking");
        if (res.data.length > 0) {
          setId(res.data[0].cid);
        }
      } catch (error) {
        console.error("Error fetching booking ID:", error);
      }
    }

    fetchBooking();
  }, []);

  useEffect(() => {
    if (id) {
      async function fetchDetails() {
        try {
          const res = await axios.get(
            `https://covid-jw9g.onrender.com/display/${id}`
          );
          if (res.data === "fail") {
            alert("No reservation found.");
          } else {
            setBookCentre(res.data[0]);
          }
        } catch (error) {
          console.error("Error fetching booking details:", error);
        }
      }

      fetchDetails();
    }
  }, [id]);

  async function sendMail() {
    if (!bookCentre) {
      alert("No booking details available.");
      return;
    }

    const email = "adhanush.eee2021@citchennai.net";
    const name = bookCentre.name;
    const address = bookCentre.address;

    try {
      const res = await axios.post(
        `https://covid-jw9g.onrender.com/mail/${email}/${name}/${address}`
      );
      alert("Email sent successfully!");
      console.log(res.data);
    } catch (error) {
      console.error("Error sending email:", error);
      alert("Failed to send email.");
    }
  }

  return (
    <div className="bookin">
      <h1>YOUR APPOINTMENT</h1>
      <br />
      <div className="bookout">
        {bookCentre ? (
          <div className="booktable">
            <h2>Name: {bookCentre.name}</h2>
            <h2>Location: {bookCentre.location}</h2>
            <h2>Address: {bookCentre.address}</h2>
            <h2>
              Time: {bookCentre.optime} AM - {bookCentre.cltime} PM
            </h2>

            <div className="bookbtns">
              <button onClick={() => navigate("/home")}>Back</button>
              <button onClick={sendMail}>Mail</button>
            </div>
          </div>
        ) : (
          <p>Loading booking details...</p>
        )}
      </div>
    </div>
  );
}

export default Bookin;
