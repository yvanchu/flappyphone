import { Container } from "@pixi/react";

import { useState } from "react";
import LFSR from "../util/lfsr";

import Pipe from "./pipe";
import { SETTING } from "./setting";

function Pipes(props) {
        const [iterArr, setIterArr] = useState(new Array(props.numPipes).fill(0));

        return (
                <Container>
                        {
                                iterArr.map((e, i) => {
                                        return (
                                        <Container>
                                        <Pipe
                                                numPipes={props.numPipes}
                                                propagate={(x, y) => props.setPipeData(i, x, y)}
                                                setNewSeed={(x) => props.setNewSeed(x)}
                                                setShouldGetNewSeed={(x) => props.setShouldGetNewSeed(x)}
                                                gameState={props.gameState}
                                                index={i}
                                                isTop={true}
                                        />
                                        <Pipe
                                                numPipes={props.numPipes}
                                                propagate={(x, y) => props.setPipeData(i, x, y)}
                                                setNewSeed={(x) => props.setNewSeed(x)}
                                                setShouldGetNewSeed={(x) => props.setShouldGetNewSeed(x)}
                                                gameState={props.gameState}
                                                index={i}
                                                isTop={false}
                                        />

                                        </Container>
                                        )
                                })
                        }
                </Container>
        )
}

export default Pipes;