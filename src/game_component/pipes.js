import { Container } from "@pixi/react";

import { useState } from "react";

import Pipe from "./pipe";

function Pipes(props) {
        const [iterArr, setIterArr] = useState(new Array(props.numPipes).fill(0));

        return (
                <Container>
                        {
                                iterArr.map((e, i) => {
                                        return <Pipe
                                                numPipes={props.numPipes}
                                                propagate={(x, y) => props.setPipeData(i, x, y)}
                                                gameState={props.gameState}
                                                index={i}
                                        />
                                })
                        }
                </Container>
        )
}

export default Pipes;