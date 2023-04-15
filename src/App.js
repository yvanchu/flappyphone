import { useState, useEffect, useContext } from "react";
import { setData, useData } from "./util/firebase";
import styled from "styled-components";
import { Game } from "./Game";

import { Context } from "./components/Context";

import Sensor from "./components/Sensor";

import "./App.css";

const ALPHA_LOWER_BOUND = 300;
const ALPHA_UPPER_BOUND = 1010;
const AZ_LOWER_BOUND = 12;
const AZ_UPPER_BOUND = 69;

function App() {
  let context = useContext(Context);

  let [flaps, setFlaps] = useState(0);
  let [maxes, setMaxes] = useState({
    rot: 0,
    trans: 0,
  });

  let [cooldown, setCooldown] = useState(0);
  
  const [cloud_count, loading, error] = useData("/count");

  useEffect(() => {
    if (cooldown < 1) {
      if (context.gyroscope.x > ALPHA_LOWER_BOUND && context.acceleration.z > AZ_LOWER_BOUND) {
        if (!context.isFlapping) {
          context.setIsFlapping(true);
          setData("/count", flaps + 1);
          setFlaps(flaps + 1);
        }
      } else {
        context.setIsFlapping(false);
      }
  
      if (context.gyroscope.x > maxes.rot) {
        setMaxes({
          ...maxes,
          rot: context.gyroscope.x,
        });
      }
      if (context.acceleration.z > maxes.trans) {
        setMaxes({
          ...maxes,
          trans: context.acceleration.z,
        });
      }
      setCooldown(2);
    } else {
      setCooldown(cooldown - 1);
    }
  }, [context]);

  useEffect(() => {
    const timer = flaps > 0 && setInterval(() => setFlaps(flaps - 1), 1000);
    return () => clearInterval(timer);
  }, [flaps]);

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
        {loading
        ? <>Loading...</>
        : <>
            <h3>Sensor Values</h3>
            <Sensor fieldName={"gyroscope"} threshold={200} />
            <Sensor fieldName={"acceleration"} threshold={7} />
            <p>
              {flaps} | {cloud_count}
            </p>
            <p>{maxes.rot}</p>
            <p>{maxes.trans}</p>
          </>
        }
      </header>
      <Game />
    </div>
  );
}

export default App;
