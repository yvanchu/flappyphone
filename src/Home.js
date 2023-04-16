// a home screen that takes in a name and has a purple play button
import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import QRCodeStyling from "qr-code-styling";
import "./App.css";
import { setData, useData } from "./util/firebase";
import bird from "./assets/bird.png";

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
  data: "https://0204-165-124-85-12.ngrok-free.app/flappy/phone",
});

const Home = () => {
  const [name, setName] = useState("");
  const [showQRCode, setShowQRCode] = useState(false);
  const [url, setURL] = useState("");
  const [phoneDetected, setPhoneDetected] = useState(false);
  const [playerID, setPlayerID] = useState(0);
  //TODO: set phone detected to true when phone is detected
  const navigate = useNavigate();
  const ref = useRef(null);

  const [data, loading, error] = useData(`/players`);

  useEffect(() => {
    qrCode.append(ref.current);
  }, []);

  const handleName = (e) => {
    setName(e.target.value);
  };

  const handlePlay = () => {
    // TODO: set name in context and database
    if (name !== "") {
      setShowQRCode(true);
      const id = Math.floor(Math.random() * 1000000000);
      setData(`/players/${id}/name`, name);
      setPlayerID(id);
      setURL(`https://0204-165-124-85-12.ngrok-free.app/flappy/phone/${id}`);
    }
  };

  useEffect(() => {
    if (data && playerID in data && "flapCount" in data[playerID]) {
      navigate(`/flappy/screen/${playerID}`);
    }
  });

  useEffect(() => {
    qrCode.update({
      data: url,
    });
  }, [url]);

  return (
    <div className="App">
      <header className="App-header">
        <p>
          <input
            type="text"
            placeholder="Enter your name"
            value={name}
            onChange={handleName}
          />
        </p>
        <p>
          <button onClick={handlePlay}>Play</button>
        </p>
        <div ref={ref} />
      </header>
    </div>
  );
};

export default Home;
