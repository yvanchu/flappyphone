import { Stage } from '@pixi/react';
import { useState, useEffect } from 'react';
import Bird from "./game_component/bird";
import Pipes from './game_component/pipes';
import { useData, setData } from "./util/firebase";

export const Game = () => {
    const [gameState, setGameState] = useState({
        isPlaying: false,
        isGameOver: false,
        pipeData: [
            {x: 0, y: 0},
            {x: 0, y: 0},
            {x: 0, y: 0}
        ],
    })
    const [localCount, setLocalCount] = useState({
        value: 0
    });
    
    const [cloud_count, loading, error] = useData("/count");

    const setPipeData = (i, x, y) => {
        let currentPipeData = gameState.pipeData;
        currentPipeData[i] = {x: x, y: y};
        setGameState(gameState => ({
            ...gameState,
            pipeData: currentPipeData,
        }));
    }

    const handleFlap = () => {
        if (!gameState.isPlaying) {
            setGameState(gameState => ({
                ...gameState,
                isPlaying: true,
            }));
        }
        setLocalCount(localCount => ({
            value: localCount.value + 1
        }));
    };

    useEffect(() => {
        setData("/count", 0);

        window.addEventListener("keydown", (event) => {
            handleFlap();
        })
    }, []);

    useEffect(() => {
        if (cloud_count > localCount.value) {
            setLocalCount(localCount => ({
                value: cloud_count,
            }));
            handleFlap();
        }
    }, [cloud_count]);

  return (
    <Stage>
      <Bird count={localCount.value} gameState={gameState} />
      <Pipes gameState={gameState} setPipeData={(a, b, c) => setPipeData(a, b, c)} />
    </Stage>
  );
};

export default Game;
