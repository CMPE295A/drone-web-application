import React, { useEffect, useState, useContext } from 'react';
import BatteryIcon from './BatteryIcon';
import { backendUrl } from "../../config";
import axios from "axios";
// import io from 'socket.io-client';
import { SocketContext } from '../../contextApi/SocketContext';

const BatteryStatus = () => {
    const [batteryLevel, setBatteryLevel] = useState(null);
    // const [error, setError] = useState(null);
    const socket = useContext(SocketContext); //access socket.io connection


    const droneIdentifier = "test1";

    useEffect(() => {

        //initial battery level to display
        const getBatteryLevel = async () => {
            try {
                //get the battery level of the drone
                const res = await axios.get(`${backendUrl}/battery/${droneIdentifier}`);
                // console.log(res);
                setBatteryLevel(res.data.batteryLevel);
            } catch (err) {
                console.log(err);
                // setError('Failed to fetch battery level');

            }
        };

        getBatteryLevel();


        // real time update battery level using web socket
        // const socket = io(`${backendUrl}`);
        socket.on('batteryUpdate', (data) => {
            // console.log(socket)
            // console.log(data);
            if (data.droneIdentifier === 'test1') {
                setBatteryLevel(data.batteryLevel);
            }
        });

        // return () => {
        //     socket.disconnect();
        // };

    }, []);


    return (
        <div>
            {/* {error && <div>{error}</div>} */}

            {batteryLevel !== null && (
                <>
                    <BatteryIcon percentage={batteryLevel} charging={false} />
                    <div className={'batteryPercentage'}>
                        {batteryLevel}%
                    </div>
                </>
            )}
        </div>
    );
}

export default BatteryStatus;
