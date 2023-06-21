import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { GoogleMap, Marker, LoadScript, InfoWindow } from "@react-google-maps/api";
import { backendUrl } from "../../config";
import './map.scss'

import droneIcon from "./droneIcon2.png";
import { SocketContext } from '../../contextApi/SocketContext';

const containerStyle = {
    width: "60%",
    height: "70vh",
};


function Map() {
    const [gpsData, setGpsData] = useState(null);
    const [showInfo, setShowInfo] = useState(false);
    const socket = useContext(SocketContext); //access socket.io connection
    const droneIdentifier = "test1";

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

        socket.on('locationUpdate', (data) => {
            // console.log(socket)
            // console.log(data);
            if (data.droneIdentifier === 'test1') {
                const { latitude, longitude } = data; // extract latitude and longitude from data
                const gps = { latitude, longitude }; // create a GPS object 
                // console.log(gps);
                setGpsData(gps);
            }
        });


        // console.log(gpsData);
        fetchGpsData();
    }, []);

    // event handler to toggle the visibility of the InfoWindow
    const handleMarkerClick = () => {
        setShowInfo(!showInfo);
    };
    return (
        <div >
            <div className="droneName">
                <h1>
                    {droneIdentifier}
                </h1>
            </div>

            <div className="map">
                <LoadScript googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAP_API_KEY}>
                    {gpsData && (
                        <>
                            {console.log("Rendering GoogleMap", gpsData)}
                            <GoogleMap
                                mapContainerStyle={containerStyle}
                                center={{ lat: gpsData.latitude, lng: gpsData.longitude }}
                                zoom={17}
                                mapTypeId="satellite"
                            >
                                {console.log("Rendering Marker", gpsData)}
                                {/* <Marker
                                    key={`${gpsData.latitude}-${gpsData.longitude}`}
                                    position={{ lat: gpsData.latitude, lng: gpsData.longitude }}
                                /> */}
                                <Marker
                                    position={{ lat: gpsData.latitude, lng: gpsData.longitude }} // set the position of the marker
                                    title="Drone location" // set the title of the marker
                                    icon={{
                                        url: droneIcon,
                                        scaledSize: new window.google.maps.Size(50, 50), // set the size of the icon
                                    }}
                                    animation={window.google.maps.Animation.BOUNCE} //BOUNCE or DROP animation 
                                    onClick={handleMarkerClick} // add an onClick event handler to the marker
                                >


                                    {showInfo && ( // render the InfoWindow only if showInfo is true
                                        <InfoWindow>
                                            <div>
                                                <h3>Drone location</h3>
                                                <p>Latitude: {gpsData.latitude}</p>
                                                <p>Longitude: {gpsData.longitude}</p>
                                            </div>
                                        </InfoWindow>
                                    )}
                                </Marker>

                            </GoogleMap>
                        </>
                    )}
                </LoadScript>
            </div>
        </div>
    );

}

export default Map;
