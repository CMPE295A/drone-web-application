import React, {useEffect, useState} from 'react';
import {backendUrl} from "../../config";
import axios from "axios";

const DroneStatus = () => {
    const [data, setData] = useState([]);


    useEffect(() => {
        axios.get(`${backendUrl}/drone/status`)
            .then((res) => {
                console.log(res.data); // check the data being returned
                setData(res.data);
            })
            .catch((err) => console.log(err)); // log any errors;
    }, []);

    return (
        <div>
            <h1>Drone test</h1>
            {data.map((drone) => (
                <div key={drone._id}>
                    <p>Name: {drone.droneIdentifier}</p>
                    <p>Status: {drone.status}</p>
                </div>
            ))}
        </div>
    );

};

export default DroneStatus;


