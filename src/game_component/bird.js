import GameObject from "./GameObject";
import { SETTING } from "./setting";
import bird from "../assets/bird.png";

import RedBird from '../assets/ActualRedBird.png';
import YellowBird from '../assets/ActualYellowBird.png';
import BlueBird from '../assets/ActualBlueBird.png';

const BIRDLIST = [RedBird, YellowBird, BlueBird];

let PRINTCOUNT = 0;
const INIT_FALL_SPEED = 3;
const GRAVITY = 0.1;

function Bird(props) {
  return (
    <GameObject
      updateFunction={(currentState) => {
        if (props.gameState.isPlaying && !props.gameState.isGameOver) {
          for (let i = 0; i < props.gameState.pipeData.length; i++) {
            let pipe = props.gameState.pipeData[i];
            let topPipeY = pipe.y - SETTING.pipe.height - SETTING.pipe.gap;

            //check top pipe
            if (
              currentState.x + 60 > pipe.x &&
              currentState.x + 10 < pipe.x + SETTING.pipe.width &&
              currentState.y + 60 > topPipeY &&
              currentState.y + 10 < topPipeY + SETTING.pipe.height
            ) {
              console.log("hit top pipe");
              props.setGameOver(true);
            }
            //check bottom pipe
            else if (
              currentState.x + 60 > pipe.x &&
              currentState.x + 10 < pipe.x + SETTING.pipe.width &&
              currentState.y + 60 > pipe.y &&
              currentState.y + 10 < pipe.y + SETTING.pipe.height
            ) {
              console.log("height: ", pipe.height);
              console.log("gap: ", SETTING.pipe.gap);
              console.log("top pipe y: " + topPipeY);
              console.log("bottom pipe y: " + pipe.y);
              console.log("bird x: " + currentState.x);
              console.log("bird y: " + currentState.y);
              console.log("hit bottom pipe");
              props.setGameOver(true);
            }
            // check if hit the ground
            else if (currentState.y + currentState.height > SETTING.ground.y) {
              console.log("hit ground");
              props.setGameOver(true);
            }
          }
          let nextState = { ...currentState };
          nextState.y -= currentState.currSpeed;
          nextState.currSpeed -= GRAVITY;

          if (currentState.count < props.count) {
            nextState.count = props.count;
            nextState.currSpeed = INIT_FALL_SPEED;
          }
          return nextState;
        } else {
          return currentState;
        }
      }}
      initObjData={{
        image: BIRDLIST[props.character ?? 0],
        x: 100,
        y: 350,
        width: 70,
        height: 70,
        anchor: {
          x: 0,
          y: 0,
        },
        currSpeed: INIT_FALL_SPEED,
        count: 0,
      }}
    />
  );
}

export default Bird;
