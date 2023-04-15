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
                        <p>
                                <strong>{field}</strong>
                        </p>
                        {field && (
                        <p>    
                                x: {context[field].x.toFixed(2)}
                                y: {context[field].y.toFixed(2)}
                                z: {context[field].z.toFixed(2)}
                        </p>
                        )}
                </div>
        )
}

export default Sensor;
