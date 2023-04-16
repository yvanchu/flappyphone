import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";
import App from "./App";
import { ContextProvider } from "./components/Context";
import Leaderboard from "./flappyScreen/Leaderboard";
import Game from "./Game";
import Home from "./Home";
import * as PIXI from 'pixi.js-legacy'
import { Application } from 'pixi.js';

// import { useApp } from '@pixi/react';
// const app = useApp();
// // Set the interaction resolution
// app.renderer.plugins.interaction.resolution = window.devicePixelRatio;
// Set the scale mode
PIXI.settings.SCALE_MODE = PIXI.SCALE_MODES.NEAREST;

ReactDOM.render(
  <BrowserRouter>
    <ContextProvider>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/flappy/">
          <Route path="screen/:pid" element={<Game />} />
          <Route path="phone/:pid?" element={<App />} />
          <Route path="flock/:pid?" element={<Leaderboard />} />
        </Route>
      </Routes>
    </ContextProvider>
  </BrowserRouter>,
  document.getElementById("root")
);
