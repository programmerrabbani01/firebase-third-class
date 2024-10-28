import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./components/Auth/Login.jsx";
import Register from "./components/Auth/Register.jsx";
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase/auth.js";
import Home from "./components/Home/Home.jsx";

function App() {
  const [loggedIn, setLoggedIn] = useState(null);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setLoggedIn(user);
      console.log(user);
    });
  }, [setLoggedIn]);

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Register />} />
          <Route path="/home" element={<Home loggedIn={loggedIn} />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
