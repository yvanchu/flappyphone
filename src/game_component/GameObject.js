import { useState } from 'react';

import { Sprite, useTick } from '@pixi/react';

function GameObject(props) {
  let [objData, setObjData] = useState(props.initObjData);

  useTick(() => {
    setObjData(objData => props.updateFunction(objData));
  })

  return (
    <Sprite
      image={objData.image}
      x={objData.x}
      y={objData.y}
      height={objData.height}
      width={objData.width}
      anchor={{ x: objData.anchor.x, y: objData.anchor.y }}
    />
  );
};

export default GameObject;
