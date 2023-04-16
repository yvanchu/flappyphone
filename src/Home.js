import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./App.css";
import { setData, useData } from "./util/firebase";
import QRCode from "./components/QRCode";

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
    <div className="App">
      <header className="App-header">
        {inQueue ? (
          <>
            <h1>Scan to join</h1>
            <QRCode pid={playerID} />
            <p>DEBUG: {playerID}</p>
          </>
        ) : (
          <>
            <h1>Flappy Phone</h1>
            <p>
              <button onClick={joinQueue}>Enter</button>
              <em>BE THE BIRD</em>
            </p>
          </>
        )}
      </header>
    </div>
  );
};

export default Home;
