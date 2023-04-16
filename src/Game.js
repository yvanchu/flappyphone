import { Stage, Container, Sprite } from "@pixi/react";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import Bird from "./game_component/bird";
import Pipes from "./game_component/pipes";
import Ground from "./game_component/ground";
import { useData, setData } from "./util/firebase";
import bg from "./assets/bg.png";
import { SETTING, NUM_PIPES } from "./game_component/setting";

export const Game = () => {
  const [gameState, setGameState] = useState({
    isPlaying: false,
    isGameOver: false,
    seed: SETTING.initSeed,
    shouldGetNewSeed: true,
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
        <Stage width={window.innerWidth} height={window.innerHeight}>
          <Container>
            <Sprite
              image={bg}
              x={0}
              y={0}
              width={window.innerWidth}
              height={window.innerHeight}
            />
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
              setNewSeed={(x) => {
                setGameState((gameState) => ({
                  ...gameState,
                  seed: x,
                }));
              }}
              setShouldGetNewSeed={(x) => {
                setGameState((gameState) => ({
                  ...gameState,
                  shouldGetNewSeed: x,
                }));
              }}
              numPipes={NUM_PIPES}
              gameState={gameState}
              setPipeData={(a, b, c) => setPipeData(a, b, c)}
            />
            <Ground />
          </Container>
        </Stage>
      )}
    </>
  );
};

export default Game;
