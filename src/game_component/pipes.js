import { Container } from "@pixi/react";

import Pipe from "./pipe";

function Pipes(props) {
        return (
                <Container>
                        <Pipe
                                propagate={(x, y) => props.setPipeData(0, x, y)}
                                gameState={props.gameState}
                                index={0}
                        />
                        <Pipe
                                propagate={(x,y) => props.setPipeData(1, x, y)}
                                gameState={props.gameState}
                                index={1}
                        />
                        <Pipe
                                propagate={(x,y) => props.setPipeData(2, x, y)}
                                gameState={props.gameState}
                                index={2}
                        />
                </Container>
        )
}

export default Pipes;