import "./leftBar.scss";
import BatteryStatus from "../battery/BatteryStatus";

const LeftBar = () => {


    return (
        <div className="leftBar">
            <div className="container">
                <div className="item">

                    <h3>connection</h3>
                    <BatteryStatus/>

                    <h3>altitude</h3>
                    <h3>speed</h3>
                </div>


            </div>
        </div>
    );
};

export default LeftBar;
