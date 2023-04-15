import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import Leaderboard from "./flappyScreen/Leaderboard";
import { BrowserRouter, Routes, Route } from "react-router-dom";
ReactDOM.render(
  <BrowserRouter>
    <Routes>
      <Route path="/">
        <Route path="flappy" element={<App />} />
        <Route path="leaderboard" element={<Leaderboard />} />
      </Route>
    </Routes>
  </BrowserRouter>,
  document.getElementById("root")
);
