import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import DroneStatus  from "./components/Drone/DroneStatus";
const App = () => {
  return (
      <div>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<DroneStatus/>}/>


          </Routes>
        </BrowserRouter>
      </div>
  );
}

export default App;
