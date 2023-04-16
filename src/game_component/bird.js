import GameObject from "./GameObject";
import { SETTING } from "./setting";
import  bird  from "../assets/bird.png";

let PRINTCOUNT = 0;
const INIT_FALL_SPEED = 5;
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
              currentState.x + currentState.width > pipe.x &&
              currentState.x < pipe.x + SETTING.pipe.width &&
              currentState.y + currentState.height > topPipeY &&
              currentState.y < topPipeY + SETTING.pipe.height
            ) {
              console.log("hit top pipe");
              props.setGameOver(true);
            }
            //check bottom pipe
            else if (
              currentState.x + currentState.width > pipe.x &&
              currentState.x < pipe.x + SETTING.pipe.width &&
              currentState.y + currentState.height > pipe.y &&
              currentState.y < pipe.y + SETTING.pipe.height
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
            else if (
              currentState.y + currentState.height > SETTING.ground.y
            ) {
              console.log("hit ground");
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
