import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { ContextProvider } from "./components/Context";
import Leaderboard from "./flappyScreen/Leaderboard";
import Game from "./Game";
import { BrowserRouter, Routes, Route } from "react-router-dom";
ReactDOM.render(
  <BrowserRouter>
    <ContextProvider>
      <Routes>
        <Route path="/">
          <Route path="flappy/">
            <Route path="screen" element={<Game />} />
            <Route path="phone" element={<App />} />
          </Route>
          <Route path="leaderboard" element={<Leaderboard />} />
        </Route>
      </Routes>
    </ContextProvider>
  </BrowserRouter>,
  document.getElementById("root")
);
