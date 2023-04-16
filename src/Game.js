import { Stage } from "@pixi/react";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import Bird from "./game_component/bird";
import Pipes from "./game_component/pipes";
import { useData, setData } from "./util/firebase";

const NUM_PIPES = 3;

export const Game = () => {
  const [gameState, setGameState] = useState({
    isPlaying: false,
    isGameOver: false,
    pipeData: new Array(NUM_PIPES).fill({ x: 0, y: 0, width: 50, height: 200 }),
  });
  const [localCount, setLocalCount] = useState(0);

  const navigate = useNavigate();
  const { pid } = useParams();
  const [playerData, loading, error] = useData(`/players/${pid}`);
  useEffect(() => {
    //TODO: this doesn't trigger when url doesn't include pid, why?
    if (!pid) {
      navigate("flappy/flock");
    }
  }, [pid, navigate]);

  const setPipeData = (i, x, y) => {
    let currentPipeData = gameState.pipeData;
    currentPipeData[i] = {
      ...currentPipeData[i],
      x: x,
      y: y,
    };
    setGameState((gameState) => ({
      ...gameState,
      pipeData: currentPipeData,
    }));
  };

  const handleFlap = () => {
    if (!gameState.isPlaying) {
      setGameState((gameState) => ({
        ...gameState,
        isPlaying: true,
      }));
    }
  };

  useEffect(() => {
    setData(`/players/${pid}/flapCount`, 0);

    window.addEventListener("keydown", (event) => {
      if (event.key === " ") {
        handleFlap();
      }
    });
  }, []);

  useEffect(() => {
    if (playerData && playerData.flapCount > localCount) {
      setLocalCount(playerData.flapCount);
      handleFlap();
    }
  }, [playerData, localCount]);

  useEffect(() => {
    console.log(gameState);
  }, [gameState.gameOver]);

  return (
    <>
      {loading ? (
        <p>loading</p>
      ) : (
        <Stage>
          <Bird
            setGameOver={(x) => {
              setGameState((gameState) => ({
                ...gameState,
                isGameOver: true,
              }));
            }}
            count={playerData.flapCount}
            gameState={gameState}
          />
          <Pipes
            numPipes={NUM_PIPES}
            gameState={gameState}
            setPipeData={(a, b, c) => setPipeData(a, b, c)}
          />
        </Stage>
      )}
    </>
  );
};

export default Game;
