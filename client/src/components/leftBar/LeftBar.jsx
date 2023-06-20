import "./leftBar.scss";
import BatteryStatus from "../battery/BatteryStatus";
import DroneMetrics from "../gps/DroneMetrics";
const LeftBar = () => {


    return (
        <div className="leftBar">
            <div className="container">
                <div className="item">

                    {/* <h3>connection</h3> */}
                    <BatteryStatus />
                    <DroneMetrics />
                    {/* <h3>altitude</h3> */}
                    {/* <h3>speed</h3> */}
                </div>


            </div>
        </div>
    );
};

export default LeftBar;
