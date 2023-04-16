import GameObject from "./GameObject";

import  bird  from "../assets/bird.png";

function Bird(props) {
  return (
    <GameObject
      updateFunction={(currentState) => {
        if (props.gameState.isPlaying && !props.gameState.isGameOver) {

          let nextState = {...currentState};
          nextState.y -= currentState.currSpeed;
          nextState.currSpeed -= currentState.gravity;
          
          if (currentState.flaps < props.count) {
            nextState.flaps = props.count;
            nextState.currSpeed = currentState.initFallSpeed;
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
          x: 1,
          y: 1,
        },
        initFallSpeed: 5,
        gravity: 0.1,
        currSpeed: 5,
        flaps: 0,
      }}
    />
  );
};

export default Bird;
