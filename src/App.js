import "./App.css";
import { useState, useEffect, useContext } from "react";

import { Context } from "./components/Context";

import Sensor from "./components/Sensor";

function App() {
  let context = useContext(Context);

  function handleOrientation(event) {
    context.setOrientation({ x: event.alpha, y: event.beta, z: event.gamma });
  }

  function handleMotion(event) {
    context.setAcceleration({
      x: event.acceleration.x ?? context.acceleration.x,
      y: event.acceleration.y ?? context.acceleration.y,
      z: event.acceleration.z ?? context.acceleration.z,
    });
    context.setAccelerationGx({
      x: event.accelerationIncludingGravity.x ?? context.accelerationGx.x,
      y: event.accelerationIncludingGravity.y ?? context.accelerationGx.y,
      z: event.accelerationIncludingGravity.z ?? context.accelerationGx.z,
    });
    context.setGyroscope({
      x: event.rotationRate.alpha ?? context.gyroscope.x,
      y: event.rotationRate.beta ?? context.gyroscope.y,
      z: event.rotationRate.gamma ?? context.gyroscope.z,
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

  // display the values of the sensors on the screen rounded to 2 decimal places
  return (
    <div className="App">
      <header className="App-header">
        <p>
          <button onClick={handlePermissions}>Start</button>
        </p>
        <h3>Sensor Values</h3>
        <Sensor fieldName={"orientation"} />
        <Sensor fieldName={"acceleration"} />
        <Sensor fieldName={"accelerationGx"} />
      </header>
    </div>
  );
}

export default App;
