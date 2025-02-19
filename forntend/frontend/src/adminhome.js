import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Admin.css";

function Adminhome() {
  const [search, setSearch] = useState("");
  const [location, setLocation] = useState("");
  const [address, setAddress] = useState("");
  const [openingTime, setOpeningTime] = useState("");
  const [closingTime, setClosingTime] = useState("");
  const [name, setName] = useState("");
  const [pincode, setPincode] = useState("");
  const [dosage, setDosage] = useState("");
  const [dosid, setDosid] = useState("");
  const [centres, setCentres] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchCentres();
  }, []);

  // Fetch all centres
  const fetchCentres = async () => {
    try {
      const res = await axios.get("https://covid-jw9g.onrender.com/home1");
      setCentres(res.data);
    } catch (err) {
      console.error("Error fetching centres:", err);
    }
  };

  // Search for a vaccination centre
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!search.trim()) {
      alert("Please enter a valid location.");
      return;
    }
    try {
      const res = await axios.post("https://covid-jw9g.onrender.com/home", {
        search,
      });
      if (res.data === "fail") {
        alert("Please enter another location.");
      } else {
        fetchCentres();
      }
    } catch (err) {
      console.error("Search error:", err);
    }
  };

  // Book a slot
  const bookSlot = async (id) => {
    try {
      await axios.get(`https://covid-jw9g.onrender.com/homeslot/${id}`);
      alert("Slot added successfully!");
      fetchCentres();
    } catch (err) {
      console.error("Error booking slot:", err);
    }
  };

  // Reset slots
  const resetSlot = async (id) => {
    try {
      await axios.get(`https://covid-jw9g.onrender.com/homereset/${id}`);
      alert("Slot reset successfully!");
      fetchCentres();
    } catch (err) {
      console.error("Error resetting slot:", err);
    }
  };

  // Add a new vaccination centre
  const addCentre = async () => {
    try {
      await axios.post(
        `https://covid-jw9g.onrender.com/homeadding/${name}/${address}/${pincode}/${closingTime}/${openingTime}/${location}/${dosage}`
      );
      alert("Centre added successfully!");
      fetchCentres();
    } catch (err) {
      console.error("Error adding centre:", err);
    }
  };

  // Remove a centre by ID
  const removeCentre = async (id) => {
    try {
      const res = await axios.delete(
        `https://covid-jw9g.onrender.com/homerem/${id}`
      );
      if (res.data === "success") {
        alert("Centre removed successfully!");
        fetchCentres();
      } else {
        alert("Centre ID not found.");
      }
    } catch (err) {
      console.error("Error removing centre:", err);
    }
  };

  // Add dosage
  const addDosage = async (id, dosid) => {
    try {
      const res = await axios.get(
        `https://covid-jw9g.onrender.com/dosadd/${id}/${dosid}`
      );
      if (res.data === "success") {
        alert("Dosage added successfully!");
        fetchCentres();
      }
    } catch (err) {
      console.error("Error adding dosage:", err);
    }
  };

  return (
    <div className="containera">
      <div id="quick">
        {/* <div className="navbar">
          <div className="navlist">
            <button
              onClick={() => {
                navigate("/login");
              }}
            >
              Logout
            </button>
          </div>
        </div> */}
        <h1>ADMIN PANEL</h1>

        <label htmlFor="search">Enter the location</label>
        <input
          type="text"
          id="search"
          placeholder="Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button id="s-btn" onClick={handleSubmit}>
          Search
        </button>
      </div>

      {/* Add Centre */}
      <div className="option">
        <div className="add">
          <h2>Add New Centre</h2>
          <div>
            <label>Name</label>
            <input
              type="text"
              placeholder="Hospital Name"
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div>
            <label>Location</label>
            <input
              type="text"
              placeholder="City"
              onChange={(e) => setLocation(e.target.value)}
            />
          </div>
          <div>
            <label>Address</label>
            <input
              type="text"
              placeholder="Street Address"
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>
          <div>
            <label>Pincode</label>
            <input
              type="number"
              placeholder="Pincode"
              onChange={(e) => setPincode(e.target.value)}
            />
          </div>
          <div>
            <label>Opening Time</label>
            <input
              type="number"
              placeholder="Opening time"
              onChange={(e) => setOpeningTime(e.target.value)}
            />
          </div>
          <div>
            <label>Closing Time</label>
            <input
              type="number"
              placeholder="Closing time"
              onChange={(e) => setClosingTime(e.target.value)}
            />
          </div>
          <div>
            <label>Dosage</label>
            <input
              type="number"
              placeholder="Dosage count"
              onChange={(e) => setDosage(e.target.value)}
            />
          </div>
          <button onClick={addCentre}>Add Centre</button>
        </div>

        {/* Remove Centre */}
        <div className="remove">
          <h3>Remove Centre</h3>
          <input
            type="number"
            placeholder="Enter Centre ID"
            onChange={(e) => setDosid(e.target.value)}
          />
          <button onClick={() => removeCentre(dosid)}>Remove</button>
        </div>
      </div>

      {/* Centre Table */}
      <h1>Vaccination Centres</h1>
      <table className="maintable">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Location</th>
            <th>Address</th>
            <th>Pincode</th>
            <th>Opening</th>
            <th>Closing</th>
            <th>Slots</th>
            <th>Dosages</th>
            <th>Book</th>
            <th>Reset</th>
          </tr>
        </thead>
        <tbody>
          {centres.map((centre) => (
            <tr key={centre.centreid}>
              <td>{centre.centreid}</td>
              <td>{centre.name}</td>
              <td>{centre.location}</td>
              <td>{centre.address}</td>
              <td>{centre.pincode}</td>
              <td>{centre.optime} AM</td>
              <td>{centre.cltime} PM</td>
              <td>{centre.slot}</td>
              <td>
                <input
                  type="number"
                  onChange={(e) => setDosid(e.target.value)}
                />
                <button onClick={() => addDosage(centre.centreid, dosid)}>
                  Add
                </button>
              </td>
              <td>
                <button onClick={() => bookSlot(centre.centreid)}>Book</button>
              </td>
              <td>
                <button onClick={() => resetSlot(centre.centreid)}>
                  Reset
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Adminhome;
