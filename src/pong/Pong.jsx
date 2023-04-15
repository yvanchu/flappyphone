import { useEffect, useState } from "react";

import PhoneSensor from "../util/PhoneSensor";

function Pong() {
        const sensor = PhoneSensor();

        useEffect(() => {
                console.log(sensor);
        }, []);

        return (
                <div>
                        {sensor.acceleration.x}<br />
                        {sensor.acceleration.y}<br />
                        {sensor.acceleration.z}<br />
                        {sensor.gyroscope.x}<br />
                        {sensor.gyroscope.y}<br />
                        {sensor.gyroscope.z}
                </div>
        );
}

export default Pong;
