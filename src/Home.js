import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./App.css";
import { setData, useData } from "./util/firebase";
import QRCode from "./components/QRCode";

import styled from "styled-components";

import Title from "./assets/logo.png";

const Home = () => {
  const [inQueue, setInQueue] = useState(false);
  const [playerID, setPlayerID] = useState(localStorage.getItem("playerID"));
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("playerID") === null) {
      localStorage.setItem("playerID", Math.floor(Math.random() * 1000000000));
    }
    setPlayerID(localStorage.getItem("playerID"));
  }, []);

  const [data, loading, error] = useData(`/players`);

  const joinQueue = () => {
    setData(`/players/${playerID}/playerState`, "waiting-for-phone");
    setInQueue(true);
  };

  useEffect(() => {
    if (
      data &&
      data[playerID] &&
      data[playerID]["playerState"] === "waiting-for-screen"
    ) {
      navigate(`/flappy/screen/${playerID}`);
    }
  }, [data, navigate, playerID]);

  return (
    <Background>
      <header className="App-header">
        {inQueue ? (
          <div>
            <h1>Scan with 📱 to join</h1>
            <h1>(Keep this tab open)</h1>
            <QRCode pid={playerID} />
            {/* <p>ID for Debugging: {playerID}</p> */}
          </div>
        ) : (
          <Entrance>
            <img
              src={Title}
              width={window.innerWidth * 0.5}
              alt="Flappy Phone"
            />
            <P>
              <ButtonHolder>
                <ButtonBack />
                <Button onClick={joinQueue}>ENTER</Button>
              </ButtonHolder>
              <Em>BE THE BIRD</Em>
            </P>
          </Entrance>
        )}
      </header>
    </Background>
  );
};

const Background = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: black;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Button = styled.button`
  position: absolute;
  top: 0;
  left: calc(50% - 100px);
  font-family: "Russo One";
  background: white;
  color: black;
  width: 200px;
  height: 64px;
  border-radius: 15px;
  transform: translate(-10px, -10px);
  transition: 0.1s ease-in;
  cursor: pointer;
  :hover {
    transform: translate(-5px, -5px);
  }
`;

const ButtonBack = styled.div`
  position: absolute;
  top: 0;
  left: calc(50% - 100px);
  width: 200px;
  height: 64px;
  background: #6a6a6a;
  border-radius: 15px;
`;

const ButtonHolder = styled.div``;

const P = styled.p`
  position: relative;
`;

const Entrance = styled.div`
  font-family: "Russo One";
  margin-top: -64px;
`;

const Em = styled.em`
  position: absolute;
  width: 200px;
  top: 92px;
  font-size: 24px;
  left: calc(50% - 90px);
`;

export default Home;
