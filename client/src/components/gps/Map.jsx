import { useState, useEffect, useContext, useCallback } from "react";
import axios from "axios";
import { GoogleMap, Marker, LoadScript, InfoWindow, useLoadScript } from "@react-google-maps/api";
import { backendUrl } from "../../config";
import './map.scss'

import droneIcon from "./droneIcon2.png";
import { SocketContext } from '../../contextApi/SocketContext';
import { CircularProgress } from '@mui/material';

const containerStyle = {
    width: "70%",
    height: "70vh",
};


function Map() {
    const [gpsData, setGpsData] = useState(null);
    const [showInfo, setShowInfo] = useState(false);
    const socket = useContext(SocketContext); //access socket.io connection
    const droneIdentifier = "drone1";
    const { isLoaded, loadError } = useLoadScript({
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAP_API_KEY,
    });

    const fetchGpsData = async () => {
        try {
            const response = await axios.get(`${backendUrl}/gps/${droneIdentifier}`);
            const data = response.data;
            const { latitude, longitude, updatedAt } = data;

            // if (!gpsData || updatedAt > gpsData.updatedAt) {
            console.log("updating map");

            setGpsData(data);
            // }
        } catch (error) {
            console.log(error);
        }

    };
    useEffect(() => {
        if (isLoaded) { // when Google Maps is confirmed loaded
            fetchGpsData();
        }
    }, [isLoaded]); //fetch the GPS data 

    socket.on('locationUpdate', (data) => {
        if (data.droneIdentifier === 'drone1') {
            const { latitude, longitude } = data; // extract latitude and longitude from data
            const gps = { latitude, longitude }; // create a GPS object 
            // console.log(gps);
            setGpsData(gps);
        }
    });

    // event handler to toggle the visibility of the InfoWindow
    const handleMarkerClick = () => {
        setShowInfo(!showInfo);
    };


    const renderMap = () => {
        return (
            <div className="mapContainer" >
                <div className="droneName">
                    <h2>
                        {droneIdentifier}
                    </h2>
                </div>

                <div className="map">
                    {/* <LoadScript googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAP_API_KEY}> */}
                    {gpsData && (
                        <>
                            {console.log("Rendering GoogleMap", gpsData)}
                            <GoogleMap
                                mapContainerStyle={containerStyle}
                                center={{ lat: gpsData?.latitude, lng: gpsData?.longitude }}
                                zoom={17}
                                mapTypeId="satellite"
                            >
                                {console.log("Rendering Marker", gpsData)}
                                < Marker
                                    position={{ lat: gpsData?.latitude, lng: gpsData?.longitude }} // set the position of the marker
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
                    {/* </LoadScript> */}

                </div >
            </div >

        );
    }

    if (loadError) {
        return <div>Map cannot be loaded right now, sorry.</div>
    }

    return isLoaded ? renderMap() : <div>  <CircularProgress /> </div>


}

export default Map;
