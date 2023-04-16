import { Container, Sprite } from "@pixi/react";

import { useState } from "react";

import ground from "../assets/ground.png";
import { SETTING } from "./setting";


const count = Math.floor(window.innerWidth / SETTING.ground.width) + 1;
function Ground(props) {
        const [iterArr, setIterArr] = useState(new Array(count).fill(0));

        return (
                <Container>
                        {
                                iterArr.map((e, i) => {
                                        return (
                                        <Sprite 
                                                image={ground}
                                                x={i * SETTING.ground.width}
                                                y={SETTING.ground.y}
                                                width={SETTING.ground.width}
                                                height={SETTING.ground.height}
                                        />
                                    )
                                })
                        }
                </Container>
        )
}

export default Ground;