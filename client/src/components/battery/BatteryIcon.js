import React from 'react';
import BatteryFullIcon from '@mui/icons-material/BatteryFull';
import BatteryAlertIcon from '@mui/icons-material/BatteryAlert';
import BatteryChargingFullIcon from '@mui/icons-material/BatteryChargingFull';
import Battery20Icon from '@mui/icons-material/Battery20';
import Battery30Icon from '@mui/icons-material/Battery30';
import Battery50Icon from '@mui/icons-material/Battery50';
import Battery80Icon from '@mui/icons-material/Battery80';
import Battery90Icon from '@mui/icons-material/Battery90';
import './batteryIcon.scss';

function BatteryIcon(props) {
    const {percentage, charging} = props;

    let batteryIcon;
    if (percentage > 90) {
        batteryIcon = <BatteryFullIcon style={{color: 'green'}}/>;
    } else if (percentage > 80) {
        batteryIcon = <Battery90Icon style={{color: 'green'}}/>;
    } else if (percentage > 50) {
        batteryIcon = <Battery80Icon style={{color: 'green'}}/>;
    } else if (percentage > 30) {
        batteryIcon = <Battery50Icon style={{color: 'orange'}}/>;
    } else if (percentage > 20) {
        batteryIcon = <Battery30Icon style={{color: 'orange'}}/>;
    } else if (percentage <= 20) {
        batteryIcon = <Battery20Icon style={{color: 'red'}}/>;
    } else {
        batteryIcon = <BatteryAlertIcon/>;
    }

    if (charging) {
        return (
            <div className={'horizontal-battery-icon'}>
                <BatteryChargingFullIcon/>

            </div>
        );
    }

    return (
        <div className={'horizontal-battery-icon'}>
            {batteryIcon}
        </div>
    );
}

export default BatteryIcon;
