import GameObject from "./GameObject";

import  bird  from "../assets/bird.png";

function Bird() {
  return (
    <GameObject
      updateFunction={(currentState) => {
        return currentState;
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
      }}
    />
  );
};

export default Bird;
