import logo from "./logo.svg";
import "./App.css";
import Login from "./login";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Signup from "./signup";
import Home from "./home";
import Adminhome from "./adminhome";
import Abc from "./abc";
import Bookin from "./bookin";
import Book from "./book";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />}></Route>
          <Route path="/home" element={<Home />}></Route>
          <Route path="/adminhome" element={<Adminhome />}></Route>
          <Route path="/" element={<Abc />}></Route>
          <Route path="/bookin" element={<Bookin></Bookin>}></Route>
          <Route path="/book" element={<Book></Book>}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
