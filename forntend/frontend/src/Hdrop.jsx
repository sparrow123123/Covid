import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import "./Hdrop.css"; // Import CSS

function Hdrop() {
  const [hospitals, setHospitals] = useState([]);
  const [selectedHospital, setSelectedHospital] = useState("");

  const fetchHospitals = useCallback(() => {
    axios
      .get("https://covid-4-lhxq.onrender.com/hlocation")
      .then((res) => {
        console.log("Fetched Hospitals:", res.data);
        setHospitals(res.data);
      })
      .catch((err) => {
        console.error("Error fetching hospitals:", err);
      });
  }, []);

  useEffect(() => {
    fetchHospitals();
  }, [fetchHospitals]);

  return (
    <div className="hdrop-container">
      <h1>HOSPITAL</h1>

      <select
        className="hdrop-select"
        name="hlocation"
        id="hlocation"
        value={selectedHospital}
        onChange={(e) => setSelectedHospital(e.target.value)}
      >
        <option value="" disabled>
          Select a hospital
        </option>
        {hospitals.map((hospital) => (
          <option key={hospital.centreid} value={hospital.name}>
            {hospital.name}
          </option>
        ))}
      </select>

      <button
        className="hdrop-btn"
        onClick={() => {
          if (selectedHospital) {
            alert(`Searching for: ${selectedHospital}`);
          } else {
            alert("Please select a hospital first.");
          }
        }}
      >
        Search
      </button>
    </div>
  );
}

export default Hdrop;
