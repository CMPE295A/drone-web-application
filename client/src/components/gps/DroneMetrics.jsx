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


    const droneIdentifier = "drone1";


    useEffect(() => {

        // //initial temperature level to display
        const getTemperatureLevel = async () => {
            try {
                //get the temperature level of the drone
                const res = await axios.get(`${backendUrl}/temperature/${droneIdentifier}`);
                // console.log(res);
                setTemperature(res.data.temperature);
            } catch (err) {
                console.log(err);
                // setError('Failed to fetch temperature level');

            }
        };

        //initial altitude/speed from DB
        const getGPSData = async () => {
            try {
                const res = await axios.get(`${backendUrl}/gps/${droneIdentifier}`);
                console.log('gps' + res.data);
                setAltitudeLevel(res.data.altitude);
                setSpeedLevel(res.data.speed);
            } catch (err) {
                console.log(err);
            }
        };

        getTemperatureLevel();
        getGPSData();


        // real time update temperature level using web socket
        socket.on('temperatureUpdate', (data) => {
            // console.log(socket)
            // console.log(data);
            if (data.droneIdentifier === 'drone1') {
                setTemperature(data.temperature);
            }
        });

        // real time update altitude/speed using web socket
        socket.on('gpsUpdate', (data) => {
            console.log('altitude/speed' + data);
            if (data.droneIdentifier === droneIdentifier) {
                setAltitudeLevel(data.altitude);
                setSpeedLevel(data.speed);
            }
        });


        // clean up the socket listeners when the component unmounts
        return () => {
            socket.off('temperatureUpdate');
            socket.off('gpsUpdate');
        };

    }, []);

    return (
        <div>
            {/* {error && <div>{error}</div>} */}
            <DroneMetricsProp altitude={altitudeLevel} speed={speedLevel} distance={distance} temperature={temperature} />
        </div>
    );
}

export default DroneMetrics;
