import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { ContextProvider } from "./components/Context";
import Leaderboard from "./flappyScreen/Leaderboard";
import { BrowserRouter, Routes, Route } from "react-router-dom";
ReactDOM.render(
  <BrowserRouter>
    <Routes>
      <Route path="/">
        <ContextProvider>
          <Route path="flappy" element={<App />} />
        </ContextProvider>
        <Route path="leaderboard" element={<Leaderboard />} />
      </Route>
    </Routes>
  </BrowserRouter>,
  document.getElementById("root")
);
