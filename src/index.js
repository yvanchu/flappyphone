import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import Pong from "./pong/Pong";
import { ContextProvider } from "./components/Context";
import Leaderboard from "./flappyScreen/Leaderboard";
import { BrowserRouter, Routes, Route } from "react-router-dom";
ReactDOM.render(
  <BrowserRouter>
  <ContextProvider>
    <Routes>
      <Route path="/">
          <Route path="flappy" element={<App />} />
          <Route path="pong" element={<Pong />} />
        <Route path="leaderboard" element={<Leaderboard />} />
      </Route>
    </Routes>
    </ContextProvider>
  </BrowserRouter>,
  document.getElementById("root")
);
