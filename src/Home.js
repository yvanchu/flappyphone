// a home screen that takes in a name and has a purple play button
import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import QRCodeStyling from "qr-code-styling";
import "./App.css";
// reference the bird image
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
  data: "https://flappy-bird-clone-1.netlify.app/flappy/phone",
});

const Home = () => {
  const [name, setName] = useState("");
  const [showQRCode, setShowQRCode] = useState(false);
  const [url, setURL] = useState("");
  const [phoneDetected, setPhoneDetected] = useState(false);
  //TODO: set phone detected to true when phone is detected
  const navigate = useNavigate();
  const ref = useRef(null);

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
      setURL(
        `https://flappy-bird-clone-1.netlify.app/flappy/phone?name=${name}`
      );
    }
  };

  useEffect(() => {
    if (phoneDetected && showQRCode) {
      navigate("/flappy/screen");
    }
  }, [showQRCode, navigate, phoneDetected]);

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
