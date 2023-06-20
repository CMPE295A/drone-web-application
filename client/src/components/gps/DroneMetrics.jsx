import { useEffect, useState, useContext } from 'react';
import DroneMetricsProp from './DroneMetricsProp';

const DroneMetrics = () => {
    const [altitudeLevel, setAltitudeLevel] = useState(null);
    const [speedLevel, setSpeedLevel] = useState(20);
    const [distance, setDistance] = useState(20);
    const [temperature, setTemperature] = useState(31);
    // const [error, setError] = useState(null);
    // const socket = useContext(SocketContext); //access socket.io connection


    const droneIdentifier = "test1";

    useEffect(() => {

        //initial battery level to display
        // const getDroneMetrics = async () => {
        //     try {
        //         //get the battery level of the drone
        //         const res = await axios.get(`${backendUrl}/gps/${droneIdentifier}`);
        //         // console.log(res);
        // setAltitudeLevel(res.data.altitudeLevel);
        // setSpeedLevel(res.data.speedLevel);
        // setDistance(res.data.distance);
        // setTemperature(res.data.temperature);
        //     } catch (err) {
        //         console.log(err);
        //         // setError('Failed to fetch drone metrics ');

        //     }
        // };
        setAltitudeLevel(100);

        // getDroneMetrics();



    }, []);


    return (
        <div>
            {/* {error && <div>{error}</div>} */}
            <DroneMetricsProp altitude={altitudeLevel} speed={speedLevel} distance={distance} temperature={temperature} />
        </div>
    );
}

export default DroneMetrics;
