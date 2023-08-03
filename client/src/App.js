import React from 'react';
import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
  Navigate
} from "react-router-dom";
import Register from "./pages/Register/Register";
import Navbar from "./components/navbar/Navbar";
import Main from "./pages/Main"
import LeftBar from "./components/leftBar/LeftBar";
import Map from "./components/gps/Map";
import Login from "./pages/Login/Login";
import Footer from "./components/footer/Footer";
import { useContext } from "react";
import { AuthContext } from "./contextApi/AuthContext";
import BatteryChart from './components/battery/BatteryChart';


const App = () => {

  const Layout = () => {

    return (

      <div>
        <Navbar />
        <div style={{ display: "flex" }}>
          <LeftBar />

          {/* 1/3 space for leftbar and 2/3 space for outlet */}
          <div style={{ flex: 6 }}>
            {/* nested routes inside root route */}
            <Outlet />
            <Footer />
          </div>
        </div>

        {/* <Footer /> */}

      </div>

    );
  };


  //client-sidew auth
  const ProtectedRoute = ({ children }) => {
    const { currentUser } = useContext(AuthContext);
    // console.log(currentUser);
    if (!currentUser) {
      // console.log('Not CURRENT USER: ' + currentUser);
      return <Navigate to="/login" />;
    }


    return children;
  }

  //define the routes
  const router = createBrowserRouter([
    {
      //root route
      path: "/",
      element: (
        <ProtectedRoute>
          <Layout />
        </ProtectedRoute>
      ),
      //nested routes
      children: [
        {
          path: "/drone1",
          element: <Map />,
        },

        {
          path: "/drone1/battery",
          element: <BatteryChart />,
        },

      ],
    },
    {
      path: "/dashboard",
      element: (
        <ProtectedRoute>
          <Main />
        </ProtectedRoute>
      ),
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/register",
      element: <Register />,
    },
  ]);

  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );


}

export default App;
