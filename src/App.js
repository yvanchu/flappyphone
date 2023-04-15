import "./App.css";
import { useState } from "react";
import { setData } from "./util/firebase";

function App() {
  const [orientation, setOrientation] = useState({ x: 0, y: 0, z: 0 });
  const [acceleration, setAccleration] = useState({ x: 0, y: 0, z: 0 });
  const [accelerationGx, setAcclerationGx] = useState({ x: 0, y: 0, z: 0 });
  const [gyroscope, setGyroscope] = useState({ x: 0, y: 0, z: 0 });

  const setDataIfNotNull = (path, value) => {
    if (value !== null) {
      setData(path, value);
    }
  };

  function handleOrientation(event) {
    setOrientation({
      x: event.alpha ?? orientation.x,
      y: event.beta ?? orientation.y,
      z: event.gamma ?? orientation.z,
    });
    setData("/orientation", orientation);
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
    setData("/acceleration", acceleration);
    setData("/accelerationGx", accelerationGx);
    setData("/gyroscope", gyroscope);
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
      </header>
    </div>
  );
}

export default App;
