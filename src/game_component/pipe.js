import GameObject from "./GameObject";

import pipeImg from "../assets/pipe.png";
import { SETTING, NUM_PIPES, INIT_PIPES_Y } from "./setting";
import LFSR from "../util/lfsr";

function Pipe(props) {
  const x = (props.index + 1) * SETTING.pipe.distance;
  const y = INIT_PIPES_Y[props.index];
  return (
    <GameObject
      updateFunction={(currentState) => {
        props.propagate(currentState.x, currentState.y);
        if (props.gameState.isPlaying && !props.gameState.isGameOver) {
          let nextX = currentState.x - 2;
          let nextY = currentState.y;
          if (nextX + SETTING.pipe.width < 0) {
            nextX =
              (NUM_PIPES - 1) * (SETTING.pipe.distance + SETTING.pipe.width) +
              SETTING.pipe.distance;
            if (props.gameState.shouldGetNewSeed) {
              let current = props.gameState.seed;
              let next = LFSR(current);
              props.setNewSeed(next);
              props.setShouldGetNewSeed(false);
              let yOffest = next % 400;
              nextY = props.isTop
                ? 600 - SETTING.pipe.gap - yOffest
                : 600 - yOffest;
            } else {
              props.setShouldGetNewSeed(true);
              let yOffest = props.gameState.seed % 400;
              nextY = props.isTop
                ? 600 - SETTING.pipe.gap - yOffest
                : 600 - yOffest;
            }
          }

          let nextState = {
            ...currentState,
            x: nextX,
            y: nextY,
          };

          return nextState;
        } else {
          return currentState;
        }
      }}
      initObjData={{
        image: pipeImg,
        x: props.isTop ? x : x - SETTING.pipe.width,
        y: props.isTop ? y - SETTING.pipe.gap : y,
        width: SETTING.pipe.width,
        height: SETTING.pipe.height,
        rotation: props.isTop ? Math.PI : 0,
        anchor: {
          x: 0,
          y: 0,
        },
      }}
    />
  );
}

export default Pipe;
