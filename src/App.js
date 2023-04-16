import { useState, useEffect, useContext } from "react";
import { setData, useData } from "./util/firebase";
import styled from "styled-components";
import { Game } from "./Game";
import { useParams } from "react-router";
import { useNavigate } from "react-router-dom";

import { Context } from "./components/Context";

import Sensor from "./components/Sensor";

import Yes from "./assets/yees.png";
import No from "./assets/nor.png";
import Ex from "./assets/how2.png";

import "./App.css";
import JoinFromPhone from "./JoinFromPhone";

const ALPHA_LOWER_BOUND = 300;
const ALPHA_UPPER_BOUND = 1010;
const AZ_LOWER_BOUND = 12;
const AZ_UPPER_BOUND = 69;

function App() {
  let context = useContext(Context);
  const { pid } = useParams();
  const [playerData, loading, error] = useData(`/players/${pid}`);
  const navigate = useNavigate();

  const [start, setStart] = useState(false);

  const [birdData, setBirdData] = useState({
    index: 0,
    photo: null,
  });

  useEffect(() => {
    if (pid) {
      setData(`/players/${pid}/score`, 0);
      setData(`/players/${pid}/flapCount`, 0);
      localStorage.setItem("playerID", pid);
    } else {
      const pid = localStorage.getItem("playerID");
      if (pid) {
        console.log("pid found");
        navigate(`/flappy/phone/${pid}`);
      } else {
        alert(
          "No player id found. Go to the home page on your laptop to play!"
        );
      }
    }
  }, [pid, navigate]);

  let [flaps, setFlaps] = useState(0);
  let [maxes, setMaxes] = useState({
    rot: 0,
    trans: 0,
  });

  let [cooldown, setCooldown] = useState(0);

  useEffect(() => {

    if (playerData) {
      console.log("f", playerData);
    }

    if(playerData && playerData.playerState === "gameOver"){
      context.setGameState(
        {
          ...context.gameState,
          isGameOver: true,
        }
      );
    } else if (playerData && playerData.playerState === "waiting-for-phone") {
      context.setGameState(
        {
          ...context.gameState,
          isGameOver: false,
        }
      );
    }

  }, [playerData]);

  useEffect(() => {
    if (playerData && playerData.flapCount > -1 && cooldown < 1) {
      if (
        context.gyroscope.x > ALPHA_LOWER_BOUND &&
        context.acceleration.z > AZ_LOWER_BOUND
      ) {
        if (!context.isFlapping && !context.gameState.isGameOver) {
          console.log("WEFJIODSJFIOJDIOSFJ");
          context.setIsFlapping(true);

          if (playerData.hasOwnProperty("hs")) {
            if (playerData.hs == playerData.flapCount) {
              setData(`/players/${pid}/hs`, playerData.flapCount + 1);
            }
          } else {
            setData(`/players/${pid}/hs`, playerData.flapCount + 1);
          }
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
  }, [context, playerData, flaps, maxes, pid]);

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
    <Wrapper>
      {loading ? (
        "Loading..."
      ) : start ? (
        <>
          {/* <h3>Sensor Values</h3>
            <Sensor fieldName={"gyroscope"} threshold={200} />
            <Sensor fieldName={"acceleration"} threshold={7} />
            <p>
              {flaps} |{" "}
              {playerData && playerData.flapCount ? playerData.flapCount : 0}
            </p>
            <p>{maxes.rot}</p>
            <p>{maxes.trans}</p> */}
          <h3>Hold your phone face-down.</h3>
          <Tray>
            <img src={No} width={window.innerWidth / 3} />
            <img src={Yes} width={window.innerWidth / 3} />
          </Tray>
          <h3>Flap your hand up and down to fly.</h3>
          <H5>Hold on tight!</H5>
          <img src = {Ex} width={window.innerWidth * 0.7} />
          <Button onClick={handlePermissions}>Reset Sensors</Button>
        </>
      ) : (
        <JoinFromPhone
          handlePermission={() => {setStart(true); handlePermissions();}}
          pid={pid}
          bird={birdData}
          updateBird={(x) => {
            setBirdData(x);
          }}
        />
      )}
      {/* <Game /> */}
    </Wrapper>
  );
}

export default App;

const Wrapper = styled.div`
  background: #000000;
  color: white;
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: "Russo One", sans-serif;
  overflow-y: auto;
`;

const Tray = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  width: 90%;
  margin-bottom: 20px;
`;

const H5 = styled.h5`
  margin-top: -8px;
  color: #ababab;
`;

const Button = styled.button`
  background: #ffffff;
  color: black;
  padding: 18px;
  border-radius: 8px;
  width: 65%;
  font-family: "Russo One"
  font-size: 14px;
`;
