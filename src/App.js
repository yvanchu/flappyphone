import { useState, useEffect, useContext } from "react";
import { setData, useData } from "./util/firebase";
import styled from "styled-components";
import { Game } from "./Game";
import { useParams } from "react-router";

import { Context } from "./components/Context";

import Sensor from "./components/Sensor";

import "./App.css";

const ALPHA_LOWER_BOUND = 300;
const ALPHA_UPPER_BOUND = 1010;
const AZ_LOWER_BOUND = 12;
const AZ_UPPER_BOUND = 69;

function App() {
  let context = useContext(Context);
  const { pid } = useParams();
  const [playerData, loading, error] = useData(`/players/${pid}`);

  useEffect(() => {
    if (pid) {
      setData(`/players/${pid}/score`, 0);
      setData(`/players/${pid}/flapCount`, 0);
    } else {
      alert("No player id found. Go to the home page on your laptop to play!");
    }
  }, [pid]);

  let [flaps, setFlaps] = useState(0);
  let [maxes, setMaxes] = useState({
    rot: 0,
    trans: 0,
  });

  let [cooldown, setCooldown] = useState(0);

  useEffect(() => {
    if (playerData && playerData.flapCount > -1 && cooldown < 1) {
      if (
        context.gyroscope.x > ALPHA_LOWER_BOUND &&
        context.acceleration.z > AZ_LOWER_BOUND
      ) {
        if (!context.isFlapping) {
          context.setIsFlapping(true);
          setData(`/players/${pid}/flapCount`, playerData.flapCount + 1);
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
  }, [context, playerData, cooldown, flaps, maxes, pid]);

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
        (
        {loading ? (
          "Loading..."
        ) : (
          <>
            <h3>Sensor Values</h3>
            <Sensor fieldName={"gyroscope"} threshold={200} />
            <Sensor fieldName={"acceleration"} threshold={7} />
            <p>
              {flaps} |{" "}
              {playerData && playerData.flapCount ? playerData.flapCount : 0}
            </p>
            <p>{maxes.rot}</p>
            <p>{maxes.trans}</p>
          </>
        )}
        )
      </header>
      <Game />
    </div>
  );
}

export default App;
