import { useEffect, useState, useContext } from 'react';
import DroneMetricsProp from './DroneMetricsProp';
import { backendUrl } from "../../config";
import axios from "axios";
import { SocketContext } from '../../contextApi/SocketContext';

const DroneMetrics = () => {
    const [altitudeLevel, setAltitudeLevel] = useState(null);
    const [speedLevel, setSpeedLevel] = useState(20);
    const [distance, setDistance] = useState(20);
    const [temperature, setTemperature] = useState(41);
    // const [error, setError] = useState(null);
    const socket = useContext(SocketContext); //access socket.io connection


    const droneIdentifier = "test1";

    useEffect(() => {

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

    useEffect(() => {

        //initial temperature level to display
        const getTemperatureLevel = async () => {
            try {
                //get the battery level of the drone
                const res = await axios.get(`${backendUrl}/temperature/${droneIdentifier}`);
                // console.log(res);
                setTemperature(res.data.temperature);
            } catch (err) {
                console.log(err);
                // setError('Failed to fetch temperature level');

            }
        };

        getTemperatureLevel();


        // real time update temperature level using web socket
        socket.on('temperatureUpdate', (data) => {
            // console.log(socket)
            // console.log(data);
            if (data.droneIdentifier === 'test1') {
                setTemperature(data.temperature);
            }
        });


    }, []);

    return (
        <div>
            {/* {error && <div>{error}</div>} */}
            <DroneMetricsProp altitude={altitudeLevel} speed={speedLevel} distance={distance} temperature={temperature} />
        </div>
    );
}

export default DroneMetrics;
