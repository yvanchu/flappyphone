import React, { useState } from "react";
import { setData } from "./util/firebase";

const JoinFromPhone = ({ handlePermission, pid }) => {
  const [name, setName] = useState("");

  const startGame = () => {
    handlePermission();
    setData(`/players/${pid}/name`, name);
    setData(`/players/${pid}/playerState`, "waiting-for-screen");
  };

  return (
    <>
      <h1>You're In!</h1>
      <em>What's your name?</em>
      <input
        type="text"
        placeholder="Enter your name..."
        value={name}
        onChange={(e) => {
          setName(e.target.value);
        }}
      />
      <em>Pick your bird:</em>
      <em>Optional photo</em>
      <input type="file" />
      <button onClick={startGame}>Ready to Fly</button>
    </>
  );
};

export default JoinFromPhone;
