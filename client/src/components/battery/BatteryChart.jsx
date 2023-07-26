import { useEffect, useState } from 'react';
import { backendUrl } from "../../config";
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, Legend } from 'recharts';
import axios from "axios";


const BatteryChart = () => {
    const droneIdentifier = "drone1";
    const [batteryData, setBatteryData] = useState([]);

    // drone's battery data
    useEffect(() => {
        const getBatteryData = async () => {
            try {
                //get the battery data of the drone
                const res = await axios.get(`${backendUrl}/battery/history/${droneIdentifier}?limit=30`);

                const startTime = new Date(res.data[0].updatedAt); //gets the timestamp of the first battery data 
                const convertedData = res.data.map(data => {
                    const currentTime = new Date(data.updatedAt);
                    //convert to ms to second
                    const differenceInSeconds = Math.floor((currentTime - startTime) / 1000); // 1000 ms per second
                    const minutes = Math.floor(differenceInSeconds / 60);
                    const seconds = differenceInSeconds % 60;
                    return {
                        ...data,
                        updatedAt: `${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`, // format as 'MM:SS'
                    }
                });

                setBatteryData(convertedData);
                // console.log(res.data);
                // console.log(convertedData)
            } catch (err) {
                console.log(err);
                // setError('Failed to fetch battery data');

            }
        };

        getBatteryData();
    }, []);



    return (
        <div className="mapContainer" >
            <div className="droneName" >
                <h2>
                    {droneIdentifier}
                </h2>
            </div>
            <div style={{
                padding: "30px",
            }}>
                <LineChart width={500} height={300} data={batteryData}>
                    <Line type="monotone" dataKey="batteryLevel" stroke="#8884d8" name="Battery Level (%)" />
                    <CartesianGrid stroke="#ccc" />
                    <XAxis dataKey="updatedAt" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                </LineChart>
            </div>
        </div>
    );
}

export default BatteryChart;
