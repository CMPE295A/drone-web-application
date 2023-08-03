import Navbar from "../components/navbar/Navbar";
import LeftBar from "./Homepage/LeftBar";
import Dashboard from "./Homepage/Dashboard";
import Footer from "../components/footer/Footer";
import './main.scss';

const Main = () => {
    return (
        <div>
            <Navbar />
            <div style={{ display: "flex" }}>
                <LeftBar />

                <div style={{ flex: 6 }}>
                    <Dashboard />
                </div>
            </div>

            <Footer />

        </div >
    )
}
export default Main;