import { Container } from "@pixi/react";

import Pipe from "./pipe";

function Pipes() {
        return (
                <Container>
                        <Pipe index={0} />
                        <Pipe index={1} />
                        <Pipe index={2} />
                </Container>
        )
}

export default Pipes;