import styled from "styled-components";

import { useContext, useState, useEffect } from "react";

import { Context } from "./Context";

function Sensor(props) {
        let context = useContext(Context);

        const [field, setField] = useState(null);

        useEffect(() => {
                setField(props.fieldName);
        }, []);

        return (
                <div>
                        <p><strong>{field}</strong></p>
                        {field && (<>
                                <ColorizedDiv beeg={context[field].x > props.threshold}>
                                        x: {context[field].x.toFixed(2)}
                                </ColorizedDiv>
                                <ColorizedDiv beeg={context[field].y > props.threshold}>
                                        y: {context[field].y.toFixed(2)}
                                </ColorizedDiv>
                                <ColorizedDiv beeg={context[field].z > props.threshold}>
                                        z: {context[field].z.toFixed(2)}
                                </ColorizedDiv>
                        </>)}
                </div>
        )
}

export default Sensor;

const ColorizedDiv = styled.div`
        // background-color: ${props => (props.beeg) ? "red" : "transparent"};
        background-color: ${props => (props.beeg) ? "transparent" : "transparent"};
`;
