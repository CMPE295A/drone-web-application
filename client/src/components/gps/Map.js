import React, { useState, useEffect } from "react";
import axios from "axios";
import { GoogleMap, Marker, LoadScript } from "@react-google-maps/api";
import { backendUrl } from "../../config";

const containerStyle = {
    width: "100%",
    height: "500px",
};

const droneIdentifier = "test1";

function Map() {
    const [gpsData, setGpsData] = useState(null);

    // useEffect(() => {
    //     const intervalId = setInterval(async () => {
    //         try {
    //             const response = await axios.get(`${backendUrl}/gps/${droneIdentifier}`);
    //             const data = response.data;
    //             const { latitude, longitude, updatedAt } = data;
    //
    //             if (!gpsData || updatedAt > gpsData.updatedAt) {
    //                 console.log("updating map");
    //
    //
    //                 setGpsData(data);
    //                 console.log(gpsData?.updatedAt);
    //             }
    //         } catch (error) {
    //             console.log(error);
    //         }
    //     }, 5000);
    //
    //     return () => clearInterval(intervalId);
    // }, []);
    useEffect(() => {
        const fetchGpsData = async () => {
            try {
                const response = await axios.get(`${backendUrl}/gps/${droneIdentifier}`);
                const data = response.data;
                const { latitude, longitude, updatedAt } = data;

                if (!gpsData || updatedAt > gpsData.updatedAt) {
                    console.log("updating map");

                    setGpsData(data);
                }
            } catch (error) {
                console.log(error);
            }
        };

        fetchGpsData();
    }, [gpsData]);
    return (
        <div>
            <LoadScript googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAP_API_KEY}>
                {gpsData && (
                    <GoogleMap
                        mapContainerStyle={containerStyle}
                        center={{ lat: gpsData.latitude, lng: gpsData.longitude }}
                        zoom={15}
                    >
                        <Marker position={{ lat: gpsData.latitude, lng: gpsData.longitude }} />
                    </GoogleMap>
                )}
            </LoadScript>
        </div>
    );
}

export default Map;
