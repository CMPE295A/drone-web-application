import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import DroneStatus  from "./components/drone/DroneStatus";
import Register from "./pages/Registration/Register";
import Navbar from "./components/navbar/Navbar";
import Location from "./components/drone/Location";
import Main from "./pages/Main"
import LeftBar from "./components/leftBar/LeftBar";
import Map from "./components/gps/Map";
const App = () => {

  return (
      <div>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Main/>}/>
              <Route path="/register" element={<Register/>}/>
              <Route path="/navbar" element={<Navbar/>}/>
              <Route path="/leftbar" element={<LeftBar/>}/>
              <Route path="/map" element={<Map/>}/>


          </Routes>
        </BrowserRouter>
      </div>
  );
}

export default App;
