import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import QRCodeStyling from "qr-code-styling";
import "./App.css";
import { setData, useData } from "./util/firebase";
import bird from "./assets/bird.png";

//TODO: QR code is super buggy

const qrCode = new QRCodeStyling({
  width: 300,
  height: 300,
  image: bird,
  dotsOptions: {
    color: "#4caf50",
    type: "rounded",
  },
  imageOptions: {
    crossOrigin: "anonymous",
    margin: 20,
  },
  data: `https://0204-165-124-85-12.ngrok-free.app/flappy/phone/`,
});

const Home = () => {
  const [inQueue, setInQueue] = useState(false);
  const [playerID, setPlayerID] = useState(localStorage.getItem("playerID"));
  const navigate = useNavigate();
  const ref = useRef(null);

  useEffect(() => {
    qrCode.append(ref.current);
    if (localStorage.getItem("playerID") === null) {
      localStorage.setItem("playerID", Math.floor(Math.random() * 1000000000));
    }
    setPlayerID(localStorage.getItem("playerID"));
  }, []);

  const [data, loading, error] = useData(`/players`);

  useEffect(() => {
    qrCode.update({
      data: `https://0204-165-124-85-12.ngrok-free.app/flappy/phone/${playerID}`,
    });
  }, [playerID]);

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
        <div ref={ref} />
      </header>
    </div>
  );
};

export default Home;
