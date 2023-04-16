import GameObject from "./GameObject";

import  bird  from "../assets/bird.png";

let PRINTCOUNT = 0;
const INIT_FALL_SPEED = 5;
const GRAVITY = 0.1;

function Bird(props) {
  return (
    <GameObject
      updateFunction={(currentState) => {
        if (props.gameState.isPlaying && !props.gameState.isGameOver) {
          for (let pipe = 0; pipe < props.gameState.pipeData.length; pipe++) {
            if (
              currentState.x + currentState.width > props.gameState.pipeData[pipe].x &&
              currentState.x < props.gameState.pipeData[pipe].x + props.gameState.pipeData[pipe].width &&
              currentState.y + currentState.height > props.gameState.pipeData[pipe].y &&
              currentState.y < props.gameState.pipeData[pipe].y + props.gameState.pipeData[pipe].height
            ) {
              console.log("props");
              props.setGameOver(true);
            }
          }
        }
        if (props.gameState.isPlaying && !props.gameState.isGameOver) {
          let nextState = {...currentState};
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
        image: bird,
        x: 100,
        y: 350,
        width: 50,
        height: 50,
        anchor: {
          x: 0,
          y: 0,
        },
        currSpeed: 5,
        count: 0,
      }}
    />
  );
};

export default Bird;
