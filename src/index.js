import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";
import App from "./App";
import { ContextProvider } from "./components/Context";
import Leaderboard from "./flappyScreen/Leaderboard";
import Game from "./Game";
import Home from "./Home";
ReactDOM.render(
  <BrowserRouter>
    <ContextProvider>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/flappy/">
          <Route path="screen/:pid" element={<Game />} />
          <Route path="phone/:pid" element={<App />} />
          <Route path="flock" element={<Leaderboard />} />
        </Route>
      </Routes>
    </ContextProvider>
  </BrowserRouter>,
  document.getElementById("root")
);
