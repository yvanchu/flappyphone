import { useState, useEffect, useContext } from "react";

function PhoneSensor() {
        let [sensorData, setSensorData] = useState({
                orientation:    { x: 0, y: 0, z: 0 },
                acceleration:   { x: 0, y: 0, z: 0 },
                accelerationGx: { x: 0, y: 0, z: 0 },
                gyroscope:      { x: 0, y: 0, z: 0 },
        });

        useEffect(() => {
                handlePermissions();
        }, []);

        const setOrientation = (x) => {
                setSensorData({
                        ...sensorData,
                        orientation: x,
                });
        }

        const setAcceleration = (x) => {
                setSensorData({
                        ...sensorData,
                        acceleration: x,
                });
        }

        const setAccelerationGx = (x) => {
                setSensorData({
                        ...sensorData,
                        accelerationGx: x,
                });
        }

        const setGyroscope = (x) => {
                setSensorData({
                        ...sensorData,
                        gyroscope: x,
                });
        }

        function handleOrientation(event) {
                setOrientation({ x: event.alpha, y: event.beta, z: event.gamma });
        }
        
        function handleMotion(event) {
                setAcceleration({
                        x: event.acceleration.x ?? sensorData.acceleration.x,
                        y: event.acceleration.y ?? sensorData.acceleration.y,
                        z: event.acceleration.z ?? sensorData.acceleration.z,
                });
                setAccelerationGx({
                        x: event.accelerationIncludingGravity.x ?? sensorData.accelerationGx.x,
                        y: event.accelerationIncludingGravity.y ?? sensorData.accelerationGx.y,
                        z: event.accelerationIncludingGravity.z ?? sensorData.accelerationGx.z,
                });
                setGyroscope({
                        x: event.rotationRate.alpha ?? sensorData.gyroscope.x,
                        y: event.rotationRate.beta ?? sensorData.gyroscope.y,
                        z: event.rotationRate.gamma ?? sensorData.gyroscope.z,
                });
        }
        
        const handlePermissions = () => {
                // Request permission for iOS 13+ devices
                if (
                        DeviceMotionEvent &&
                        typeof DeviceMotionEvent.requestPermission === "function"
                ) {
                        DeviceMotionEvent.requestPermission();
                }
        
                window.addEventListener("devicemotion", handleMotion);
                window.addEventListener("deviceorientation", handleOrientation);
        };

      return sensorData;
}

export default PhoneSensor;
