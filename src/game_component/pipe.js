import GameObject from "./GameObject";

import pipeImg from "../assets/pipe.png";

function Pipe(props) {
        return (
                <GameObject
                        updateFunction={(currentState) => {
                                let nextX = currentState.x - 1;
                                if (nextX < -100) {
                                nextX = 600;
                                }

                                let nextState = {
                                ...currentState,
                                x: nextX,
                                };
                                
                                return nextState;
                        }}

                        initObjData={{
                                image: pipeImg,
                                x: 200 * props.index,
                                y: 600,
                                width: 50,
                                height: 200,
                                anchor: {
                                x: 1,
                                y: 1,
                                },
                        }}
                />
        )
}

export default Pipe;
