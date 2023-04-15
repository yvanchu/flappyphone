import "./App.css";
import { useState, useEffect } from "react";

function App() {
  const [orientation, setOrientation] = useState({ x: 0, y: 0, z: 0 });
  const [acceleration, setAccleration] = useState({ x: 0, y: 0, z: 0 });
  const [accelerationGx, setAcclerationGx] = useState({ x: 0, y: 0, z: 0 });
  const [gyroscope, setGyroscope] = useState({ x: 0, y: 0, z: 0 });

  function handleOrientation(event) {
    setOrientation({ x: event.alpha, y: event.beta, z: event.gamma });
  }

  function handleMotion(event) {
    setAccleration({
      x: event.acceleration.x ?? acceleration.x,
      y: event.acceleration.y ?? acceleration.y,
      z: event.acceleration.z ?? acceleration.z,
    });
    setAcclerationGx({
      x: event.accelerationIncludingGravity.x ?? accelerationGx.x,
      y: event.accelerationIncludingGravity.y ?? accelerationGx.y,
      z: event.accelerationIncludingGravity.z ?? accelerationGx.z,
    });
    setGyroscope({
      x: event.rotationRate.alpha ?? gyroscope.x,
      y: event.rotationRate.beta ?? gyroscope.y,
      z: event.rotationRate.gamma ?? gyroscope.z,
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
        <p>
          <strong>Orientation</strong>
        </p>
        <p>
          x: {orientation.x.toFixed(2)} y: {orientation.y.toFixed(2)} z:{" "}
          {orientation.z.toFixed(2)}
        </p>
        <p>
          <strong>Acceleration</strong>
        </p>
        <p>
          x: {acceleration.x.toFixed(2)} y: {acceleration.y.toFixed(2)} z:{" "}
          {acceleration.z.toFixed(2)}
        </p>
        <p>
          <strong>Acceleration Including Gravity</strong>
        </p>
        <p>
          x: {accelerationGx.x.toFixed(2)} y: {accelerationGx.y.toFixed(2)} z:{" "}
          {accelerationGx.z.toFixed(2)}
        </p>
      </header>
    </div>
  );
}

export default App;
