import { useState, useEffect } from 'react';
import './dashboard.scss';
import axios from 'axios';
import { backendUrl } from '../../config.js';
import { CircularProgress } from '@mui/material';
import DroneModal from "./DroneModal";
import { Button } from '@mui/material';
import { Link } from 'react-router-dom';
import { NavLink } from 'react-router-dom';

const Dashboard = () => {
  const token = localStorage.getItem('token');
  const [drones, setDrones] = useState([]);

  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const getDrones = async () => {
  }

  const fetchDrones = async () => {
    try {
      const response = await axios.get(`${backendUrl}/drone/status`)
      setDrones(response.data);
      // setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };


  useEffect(() => {
    fetchDrones();
  }, []);

  return (
    <>

      <div className='dashboard'>
        {/* {loading ? (
          <CircularProgress />
        ) : ( */}
        <>

          <div className="top">
            <h2 >Overview</h2>
            <div>
              <Button variant="contained" color="primary" onClick={handleOpenModal} style={{ margin: '20px 0' }}>
                Register Drone
              </Button>
              <DroneModal open={modalOpen} handleClose={handleCloseModal} handleAddedDrone={fetchDrones} />
            </div>
          </div>

          <div className='overview'>
            {/* <h3 className='tile-heading'>Drone Overview</h3> */}

            {drones.map(drone => (

              <Link to={`/${drone.droneIdentifier}`} key={drone._id} style={{ textDecoration: 'none' }}>
                <div className="drone-card">
                  <h3>{drone.droneIdentifier}</h3>
                  <p className="status-label">
                    Status: <span className={`status status--${drone.status}`}>{drone.status}</span>
                  </p>
                </div>
              </Link>
            ))}

          </div>
        </>
        {/* )} */}
      </div>
    </>
  );
};


export default Dashboard;

