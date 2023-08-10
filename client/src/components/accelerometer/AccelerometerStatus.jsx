import { useEffect, useState, useContext } from 'react';
import { backendUrl } from "../../config";
import axios from "axios";
import { SocketContext } from '../../contextApi/SocketContext';
import './accelerometer.scss';
import accelIcon from './accelerometerIcon.png';

const AccelerometerStatus = () => {
    const [horizontal, setHorizontal] = useState();
    const [vertical, setVertical] = useState(2);
    const [lateral, setLateral] = useState(3);
    // const [error, setError] = useState(null);
    const socket = useContext(SocketContext); //access socket.io connection


    const droneIdentifier = "drone1";

    useEffect(() => {

        //initial Accelerometer level to display
        const getAccelerometer = async () => {
            try {
                //get the Accelerometer level of the drone
                const res = await axios.get(`${backendUrl}/accelerometer/${droneIdentifier}`);
                // console.log('Accelerometer ' + res.data);
                setHorizontal(res.data.horizontal);
                setVertical(res.data.vertical);
                setLateral(res.data.lateral);
            } catch (err) {
                console.log(err);
                // setError('Failed to fetch Accelerometer level');

            }
        };

        getAccelerometer();


        // real time update Accelerometer level using web socket
        // const socket = io(`${backendUrl}`);
        socket.on('accelerometerUpdate', (data) => {
            // console.log(socket)
            // console.log(data);
            if (data.droneIdentifier === 'drone1') {
                setHorizontal(data.horizontal);
                setVertical(data.vertical);
                setLateral(data.lateral);
            }
        });

        // return () => {
        //     socket.disconnect();
        // };

    }, []);


    return (
        <div>
            {/* {error && <div>{error}</div>} */}

            <img className='option' src={accelIcon} alt="accelerometer icon" style={{ width: '40px', height: '40px' }} />

            {/* <ExploreIcon /> */}
            <div className={'accelerometer'}>

                {/* <Link to={`/${droneIdentifier}/Accelerometer`} style={{ textDecoration: 'none' }}> */}
                <div>
                    {horizontal ? 'x: ' + horizontal.toFixed(2) : 'Loading...'}
                </div>

                <div>
                    {vertical ? 'y: ' + vertical.toFixed(2) : 'Loading...'}
                </div>

                <div>
                    {lateral ? 'z: ' + lateral.toFixed(2) : 'Loading...'}
                </div>
                {/* </Link> */}
            </div>


        </div >
    );
}

export default AccelerometerStatus;
