import React from 'react';
import BatteryIcon from './BatteryIcon';

const BatteryStatus = () => {
    return (
        <div>
            <BatteryIcon percentage={64} charging={false} />
            <div className={'batteryPercentage'}>
                64%
            </div>
        </div>
    );
}

export default BatteryStatus;
