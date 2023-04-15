import { useState, useEffect, useContext } from "react";
import styled from "styled-components";

import { Context } from "./components/Context";

import Sensor from "./components/Sensor";

import "./App.css";

function App() {
  let context = useContext(Context);

  let [flaps, setFlaps] = useState(0);

  useEffect(() => {
    if (context.gyroscope.x > 200 && context.acceleration.z > 8) {
      if (!context.isFlapping) {
        context.setIsFlapping(true);
        setFlaps(flaps + 1);
      }
    } else {
      context.setIsFlapping(false);
    }
  }, [context]);

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
        <Sensor fieldName={"gyroscope"} threshold={200} />
        <Sensor fieldName={"acceleration"} threshold={7} />
        <p>
          {flaps}
        </p>
      </header>
    </div>
  );
}

export default App;
