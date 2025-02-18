import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "./header";
import image from "./assest/6471562.jpg";
import Hdrop from "./Hdrop";

function Home() {
  const [search, setsearch] = useState("");
  const [location, setlocation] = useState("");
  const [centres, setcentres] = useState([]);
  const [slotid, setslotid] = useState("");
  const [dropsearch, setdropsearch] = useState("");
  const [selectedValue, setSelectedValue] = useState("");
  const [searchany, setsearchany] = useState("");
  const [shany, setshany] = useState("");
  const [newdroplist, setnewdroplist] = useState([]);

  const navigate = useNavigate();

  async function searchmore(searchany, shany) {
    console.log(searchany, shany);
    try {
      const response = await axios.get(
        `https://covid-jw9g.onrender.com/s/${searchany}/${shany}`
      );
      return response.data;
    } catch (error) {
      console.error(error);
    }
  }

  function handleSubmit(event) {
    event.preventDefault();

    axios
      .post("https://covid-jw9g.onrender.com/home", { search })
      .then((res) => {
        if (res.data === "fail") {
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
    function getAll() {
      axios
        .get("https://covid-jw9g.onrender.com/home1")
        .then((res) => {
          setcentres(res.data);
        })
        .catch((err) => {
          console.error(err);
        });
    }
    getAll();
  }, []);

  function getCentre() {
    axios
      .get("https://covid-jw9g.onrender.com/home2/" + search)
      .then((res) => {
        setcentres(res.data);

        console.log(res.data);
        console.log(search);
      })
      .catch((err) => {
        console.error(err);
      });
  }
  function slot(id) {
    axios
      .get(`https://covid-jw9g.onrender.com/homeslot/${id}`)
      .then((res) => {
        console.log(res);
        alert("slot added");
        window.location.reload();
      })
      .catch((err) => {
        console.error(err);
      });
  }
  function searchdrop(area) {
    const loaction = document.getElementById(area).innerHTML;
    console.log(loaction);
    document.getElementById("dropsearch").value = loaction;
  }
  function searchdropany(area) {
    const loaction = document.getElementById(area).innerHTML;
    console.log(loaction);
    document.getElementById("dropsearchany").value = loaction;
  }

  function drop(input) {
    console.log("fello");
    console.log(input);
    axios
      .get(`https://covid-jw9g.onrender.com/home2/${input}`)
      .then((res) => {
        setcentres(res.data);

        console.log(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }
  function checkst() {
    axios
      .get(`https://covid-jw9g.onrender.com/homecheck`)
      .then((res) => {
        if (res.data === "true") {
        } else {
        }
      })
      .catch((err) => {
        console.error(err);
      });
  }

  function alter(id) {
    axios.get(`https://covid-jw9g.onrender.com/homealter/${id}`).then((res) => {
      console.log(res);
    });
  }

  function sendid(id) {
    axios.post(`https://covid-jw9g.onrender.com/sendid/${id}`).then((res) => {
      console.log(res);
    });
  }

  function findnew() {
    const area = document.getElementById("locations").innerHTML;
    const val = area.console.log(val);
  }

  //   function dop(){
  //     useEffect(()=>{
  //         function newdrop(){
  //             axios.get('https://covid-jw9g.onrender.com//newdrop/').then((result)=>{
  //                 console.log(result)
  //             })
  //         }

  //        },[])
  //   }

  function newdrop() {
    axios.get("https://covid-jw9g.onrender.com/newdrop/").then((result) => {
      // console.log(result)
      setnewdroplist(result.data);
    });
    console.log(newdroplist);
  }

  function help() {
    const val = document.getElementById("dp");

    const addr = val.value;
    console.log(addr);
    // axios.get(`https://covid-jw9g.onrender.com//dphelp/${a}`).then((res) => {
    //   setcentres(res.data);
    // });
  }

  return (
    <>
      <div
        style={{
          backgroundImage: `url(${image})`,
          backgroundPosition: "center",
          backgroundSize: "cover",
        }}
        className="container"
      >
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

            <button
              onClick={() => {
                navigate("/bookin");
              }}
            >
              Appoinment
            </button>
          </div>
        </div>

        <div className="contmain">
          <Hdrop></Hdrop>
          <h2 id="locathead">HOSPITAL</h2>
          <label htmlFor="seacrch"></label>
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
          <h2>LOACTION</h2>

          <div className="dropdown">
            <input type="text" id="dropsearch"></input>
            <button
              id="s-btn"
              onClick={() => {
                const inputBox = document.querySelector("#dropsearch");
                const inputValue = inputBox.value;
                console.log("Input box value:", inputValue);
                setdropsearch(inputValue);
                drop(inputValue);
              }}
            >
              search
            </button>
            <div className="dropdown-content">
              <button
                id="chennai"
                onClick={() => {
                  searchdrop("chennai");
                }}
              >
                chennai
              </button>
              <button
                id="cuddalore"
                onClick={() => {
                  searchdrop("cuddalore");
                }}
              >
                cuddalor
              </button>
              <button
                id="tambaram"
                onClick={() => {
                  searchdrop("tambaram");
                }}
              >
                tambaram
              </button>
              <button
                id="chromepet"
                onClick={() => {
                  searchdrop("chromepet");
                }}
              >
                chromepet
              </button>
              <button
                id="vandalur"
                onClick={() => {
                  searchdrop("vandalur");
                }}
              >
                vandalur
              </button>
              <button
                id="kundrathur"
                onClick={() => {
                  searchdrop("kundrathur");
                }}
              >
                kundrathur
              </button>
              <button
                id="theni"
                onClick={() => {
                  searchdrop("theni");
                }}
              >
                theni
              </button>
              <button
                id="chengalpattu"
                onClick={() => {
                  searchdrop("chengalpattu");
                }}
              >
                chengalpattu
              </button>
            </div>
          </div>
          {/* <button onClick={newdrop}></button> */}

          {/* <input type='text' id='dropsearchvalue'  ></input> */}
          <div className="dropdown">
            {/* <input type='text' id='dropsearchany'  ></input> */}
            {/* <button id='s-btn' onClick={()=>{
        const inputBx = document.querySelector('#dropsearchany');
        const inputval = document.querySelector('#dropsearchvalue');
        const inputValu = inputBx.value;
        const inputVal= inputval.value;
        console.log('Input box value:', inputValu);
        setsearchany(inputValu);
        setshany(inputVal)
        searchmore(searchany,shany)
        

      }} >search</button> */}
            <div className="dropdown-content">
              <button
                id="centreid"
                onClick={() => {
                  searchdropany("centreid");
                }}
              >
                centreid
              </button>
              <button
                id="pincode"
                onClick={() => {
                  searchdropany("pincode");
                }}
              >
                pincode
              </button>
              <button
                id="name"
                onClick={() => {
                  searchdropany("name");
                }}
              >
                name
              </button>
            </div>
          </div>

          {/* <form onSubmit={findnew} >
  <label htmlFor='locations'>loaction</label>
    <select name= 'locations' id = 'locations'>
        <option value="chennai">chennai</option>
        <option value="cuddalore">cuddalore</option>
        
    </select>
  </form> */}

          {/* <div className="dp">
            <label htmlFor="dp">name:</label>
            <select id="dp" name="dp">
              {newdroplist.map((vv) => {
                return (
                  <option key={vv.loaction} value={vv.loaction}>
                    {vv.loaction}
                  </option>
                );
              })}
            </select>
          </div> */}

          {/* <button onClick={help}>searcj</button> */}
        </div>

        <h1>Vaccination Centre</h1>
        <table>
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
              <th>book</th>
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
                  <button
                    id="bk"
                    onClick={() => {
                      slot(centre.centreid);
                      alter(centre.centreid);

                      sendid(centre.centreid);
                      //    navigate("/book")
                    }}
                  >
                    book
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

export default Home;
