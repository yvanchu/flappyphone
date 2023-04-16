import GameObject from "./GameObject";

import pipeImg from "../assets/pipe.png";

const MAX_X = 600;

function Pipe(props) {
        return (
                <GameObject
                        updateFunction={(currentState) => {
                                props.propagate(currentState.x, currentState.y);
                                if (props.gameState.isPlaying && !props.gameState.isGameOver) {
                                        let nextX = currentState.x - 1;
                                        if (nextX < 0) {
                                        nextX = MAX_X;
                                        }
        
                                        let nextState = {
                                        ...currentState,
                                        x: nextX,
                                        };
                                        
                                        return nextState;
                                } else {
                                        return currentState;
                                }
                        }}

                        initObjData={{
                                image: pipeImg,
                                x: (MAX_X / props.numPipes) * (props.index + 1),
                                y: 400,
                                width: 50,
                                height: 200,
                                anchor: {
                                x: 0,
                                y: 0,
                                },
                        }}
                />
        )
}

export default Pipe;
