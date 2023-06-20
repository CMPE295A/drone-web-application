import SpeedIcon from '@mui/icons-material/Speed';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import AcUnitIcon from '@mui/icons-material/AcUnit';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment';
import './telemetry.scss';

function DroneMetricsProp(props) {
    const { altitude, speed, distance, temperature } = props;
    let tempIcon;
    if (temperature < 0) {
        tempIcon = <AcUnitIcon />;
    } else if (temperature >= 0 && temperature < 30) {
        tempIcon = <WbSunnyIcon />;
    } else {
        tempIcon = <LocalFireDepartmentIcon style={{ color: 'red' }} />;
    }
    return (
        <div className='drone-stats-sidebar'>

            <div className='stat-item'>
                <div className="icon-with-number">
                    <ArrowUpwardIcon />
                    <span>{altitude ? altitude + ' m' : 'Loading...'}</span>
                </div>
            </div>

            <div className='stat-item'>
                <div className="icon-with-number">
                    <SpeedIcon />
                    <span>{speed ? speed + ' km/h' : 'Loading...'}</span>
                </div>
            </div>

            <div className='stat-item'>
                <div className="icon-with-number">
                    <LocationOnIcon />
                    <span>{distance ? distance + ' km' : 'Loading...'}</span>
                </div>
            </div>

            <div className='stat-item'>
                <div className="icon-with-number">
                    {tempIcon}
                    <span>{temperature ? temperature + ' °C' : 'Loading...'}</span>
                </div>
            </div>
        </div>
    );
}

export default DroneMetricsProp;
