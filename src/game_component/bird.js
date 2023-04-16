import GameObject from "./GameObject";

import  bird  from "../assets/bird.png";

const INIT_FALL_SPEED = 5;
const GRAVITY = 0.1;

function Bird(props) {
  return (
    <GameObject
      updateFunction={(currentState) => {
        if (props.gameState.isPlaying && !props.gameState.isGameOver) {

          let nextState = {...currentState};
          nextState.y -= currentState.currSpeed;
          nextState.currSpeed -= GRAVITY;
          
          if (currentState.count < props.count) {
            nextState.count = props.count;
            nextState.currSpeed = INIT_FALL_SPEED;
          }

          let collided = nextState.y > 600;
          // console.log(props.gameState.pipeData[0].x);
          props.setGameOver(collided);
          
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
          x: 1,
          y: 1,
        },
        currSpeed: 5,
        count: 0,
      }}
    />
  );
};

export default Bird;
