import "./App.css";
import { useEffect, useState } from "react";
import { setData, useData } from "./util/firebase";

function App() {
  const [orientation, setOrientation] = useState({ x: 0, y: 0, z: 0 });
  const [acceleration, setAccleration] = useState({ x: 0, y: 0, z: 0 });
  const [accelerationGx, setAcclerationGx] = useState({ x: 0, y: 0, z: 0 });
  const [gyroscope, setGyroscope] = useState({ x: 0, y: 0, z: 0 });
  const [count, setCount] = useState(0);

  const [cloud_count, loading, error] = useData("/count");

  useEffect(() => {
    setData("/count", count);
  }, [count]);

  useEffect(() => {
    const timer = count > 0 && setInterval(() => setCount(count - 1), 1000);
    return () => clearInterval(timer);
  }, [count]);

  function handleOrientation(event) {
    setOrientation({
      x: event.alpha ?? orientation.x,
      y: event.beta ?? orientation.y,
      z: event.gamma ?? orientation.z,
    });
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

    setCount(count + 1);
  };

  // display the values of the sensors on the screen rounded to 2 decimal places
  return (
    <div className="App">
      <header className="App-header">
        <p>
          <button onClick={handlePermissions}>Start</button>
          <p>local count: {count}</p>
          <p>server count: {cloud_count}</p>
        </p>
      </header>
    </div>
  );
}

export default App;
