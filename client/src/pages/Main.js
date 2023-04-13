import Navbar from "../components/navbar/Navbar";
import LeftBar from "../components/leftBar/LeftBar";
import Map from "../components/gps/Map";

const Main = () => {
    return (
        <div>
            <Navbar/>
            <div>
                <LeftBar/>
            </div>
            <Map/>
        </div>
    )
}
export default Main;