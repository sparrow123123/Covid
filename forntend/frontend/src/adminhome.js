import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Adminhome() {
  const [search, setsearch] = useState("");
  const [location, setlocation] = useState("");
  const [address, setaddress] = useState("");
  const [time, settime] = useState("");
  const [id, setid] = useState("");
  const [name, setname] = useState("");
  const [pincode, setpincode] = useState("");
  const [closingtime, setclosingtime] = useState("");
  const [dosage, setdosage] = useState("");
  const [dosid, setdosid] = useState("");

  const [centres, setcentres] = useState([]);
  const navigate = useNavigate();

  function handleSubmit(event) {
    event.preventDefault();

    axios.post("http://localhost:8081/home", { search }).then((res) => {
      if (res.data == "fail") {
        alert("Please enter another location");
        console.log(res);
      } else {
        console.log(search);
        console.log(res);

        let loaction = res.data[0].loaction;
        let address = res.data[0].address;
        let time = res.data[0].time;
        let slot = res.data[0].slot;

        getCentre();
      }
    });
  }
  useEffect(() => {
    getAll();
  }, []);
  function getAll() {
    axios
      .get("http://localhost:8081/home1")
      .then((res) => {
        setcentres(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }

  function getCentre() {
    axios
      .get("http://localhost:8081/home2/" + search)
      .then((res) => {
        setcentres(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }
  function slot(id) {
    axios
      .get(`http://localhost:8081/homeslot/${id}`)
      .then((res) => {
        console.log(res);
        alert("slot added");
        window.location.reload();
      })
      .catch((err) => {
        console.error(err);
      });
  }
  function reset(id) {
    axios
      .get(`http://localhost:8081/homereset/${id}`)
      .then((res) => {
        console.log(res);
        alert("slot reseted");
        window.location.reload();
      })
      .catch((err) => {
        console.error(err);
      });
  }

  // function add(address,loaction,time,name,pincode,closingtime,dosage){

  //           axios.post(`http://localhost:8081/homeadding/${address}/${loaction}/${time}/${name}/${pincode}/${closingtime}/${dosage}`)
  //           .then((res) => {
  //             console.log(address);
  //             console.log(res);
  //           })
  //           .catch((err) => {
  //             console.error(err);
  //             });

  //         console.log(address,loaction);
  // }

  function add() {
    const avab = "hello";
    axios
      .post(
        `http://localhost:8081/homeadding/${name}/${address}/${pincode}/${closingtime}/${time}/${location}/${dosage}`
      )
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
    window.location.href = "/adminhome";
  }

  function rem(id) {
    axios
      .delete(`http://localhost:8081/homerem/${id}`)
      .then((res) => {
        if (res.data === "success") {
          console.log("Delete successful:", res.data);
          window.location.reload();
          alert("data removed");
        } else {
          alert("ID not found");
        }
      })
      .catch((error) => {
        console.error("Error deleting resource:", error);
      });
  }
  function dosadd(id, dosid) {
    axios.get(`http://localhost:8081/dosadd/${id}/${dosid}`).then((res) => {
      if (res.data === "success") {
        alert("Dose added to the list");
        window.location.reload();
      }
    });
  }
  function checkst() {
    axios
      .get(`http://localhost:8081/homecheck`)
      .then((res) => {
        if (res.data === "true") {
        } else {
        }
      })
      .catch((err) => {
        console.error(err);
      });
  }

  return (
    <>
      <div className="containerd">
        <div id="quick">
          <div className="navbar">
            <div className="navlist">
              <button
                onClick={() => {
                  checkst();

                  navigate("/login");
                }}
              >
                logout
              </button>
            </div>
          </div>
          <h1>ADMIN</h1>

          <label htmlFor="seacrch">Enter the location</label>
          <input
            type="text"
            id="search"
            name="search"
            placeholder="Search..."
            onChange={(e) => setsearch(e.target.value)}
          />

          <button id="s-btn" onClick={handleSubmit}>
            search
          </button>
        </div>

        <div className="option">
          <div className="add">
            <h2>Add loaction</h2>
            <br></br>
            <div id="additem">
              <label htmlFor="name">
                <h3>Name</h3>
              </label>
              <input
                style={{ marginLeft: "80px" }}
                type="text"
                name="name"
                onChange={(e) => setname(e.target.value)}
                placeholder="Hospital Name"
              ></input>
              <br></br>
            </div>

            <div id="additem">
              <label htmlFor="location">
                {" "}
                <h3>Enter location</h3>
              </label>
              <input
                type="text"
                name="location"
                onChange={(e) => setlocation(e.target.value)}
                placeholder="eg.chennai"
              />
              <br></br>
              <label htmlFor="address">
                <h3>Enter Address </h3>
              </label>
              <input
                type=""
                name="address"
                onChange={(e) => setaddress(e.target.value)}
              />
              <br></br>
              <label htmlFor="pincode">
                <h3>Pincode</h3>
              </label>
              <input
                type="number"
                name="pincode"
                onChange={(e) => setpincode(e.target.value)}
              ></input>
              <br></br>
            </div>

            <div id="additem">
              <label htmlFor="openingtime">
                <h3>Opening Time </h3>
              </label>
              <input
                style={{ marginLeft: "9px" }}
                type="number"
                name="openingtime"
                onChange={(e) => settime(e.target.value)}
                placeholder="12am-12pm"
              />
              <br></br>
              <label htmlFor="closingtime">
                <h3>closing Time </h3>
              </label>
              <input
                type="number"
                name="closingtime"
                onChange={(e) => setclosingtime(e.target.value)}
              />
              <br></br>
            </div>

            <div id="additem">
              <label htmlFor="dosage">
                <h3>Enter dosage </h3>
              </label>
              <input
                style={{ marginLeft: "19px" }}
                type="number"
                name="dosage"
                onChange={(e) => setdosage(e.target.value)}
              />
              {/* <label htmlFor='specialist'><h3>domian </h3></label>
        <input style={{marginLeft:"19px"}} type='text' name='specialist'  /> */}

              <br></br>
            </div>
            <button
              onClick={() => {
                // add(address,location,time,name,pincode,closingtime,dosage);
                add();
                alert("data added");
                // window.location.reload();
              }}
            >
              Add Address
            </button>
          </div>
          <br></br>

          <div className="remove">
            <h3>REMOVE DATA</h3>
            <div id="remitem">
              <label htmlFor="id"></label>
              <input
                type="number"
                name="id"
                onChange={(e) => setid(e.target.value)}
                placeholder="ENTER ID"
              />

              <button
                onClick={() => {
                  rem(id);
                }}
              >
                Remove Data
              </button>
            </div>
          </div>

          <h1>Vaccination Centre</h1>
        </div>
        <table className="maintable">
          <thead>
            <tr>
              <th>id</th>
              <th>Name</th>
              <th>Location</th>
              <th>address</th>
              <th>Pincode</th>
              <th>Opening</th>
              <th>Closing</th>

              <th>slot</th>
              <th>Dosages</th>
              <th>book</th>
              <th>reset</th>
            </tr>
          </thead>

          <tbody>
            {centres.map((centre) => (
              <tr key={centre.centreid}>
                <td id="slot">{centre.centreid}</td>
                <td>{centre.name}</td>
                <td>{centre.location}</td>
                <td>{centre.address}</td>
                <td>{centre.pincode}</td>
                <td>{centre.optime}AM</td>
                <td>{centre.cltime}PM</td>

                <td>{centre.slot}</td>
                <td>
                  {centre.dosage}
                  <label htmlFor="doscount"></label>
                  <input
                    id="doscount"
                    type="number"
                    name="doscount"
                    onChange={(e) => setdosid(e.target.value)}
                  />
                  <button
                    id="dosbtn"
                    onClick={() => {
                      dosadd(centre.centreid, dosid);
                    }}
                  >
                    add
                  </button>
                </td>
                <td>
                  <button
                    id="bookbtn"
                    onClick={() => {
                      slot(centre.centreid);
                    }}
                  >
                    book
                  </button>
                </td>
                <td>
                  <button
                    id="resetbtn"
                    onClick={() => {
                      reset(centre.centreid);
                    }}
                  >
                    reset
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default Adminhome;
