import React, {useEffect, useState} from 'react';
import BatteryIcon from './BatteryIcon';
import {backendUrl} from "../../config";
import axios from "axios";

const BatteryStatus = () => {
    const [batteryLevel, setBatteryLevel] = useState(null);

    const droneIdentifier = "test1";

    useEffect(() => {
        const getBatteryLevel = async () => {
            try {
                //get the battery level of the drone
                const res = await axios.get(`${backendUrl}/battery/${droneIdentifier}`);
                console.log(res);
                setBatteryLevel(res.data.batteryLevel);
            } catch (err) {
                console.log(err);
            }
        };

        getBatteryLevel();

    }, []);

    return (
        <div>
            {batteryLevel !== null && (
                <>
                    <BatteryIcon percentage={batteryLevel} charging={false}/>
                    <div className={'batteryPercentage'}>
                        {batteryLevel}%
                    </div>
                </>
            )}
        </div>
    );
}

export default BatteryStatus;
