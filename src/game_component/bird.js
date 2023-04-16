
import { Stage, Container, Sprite, Text, useTick } from '@pixi/react';
import { useMemo, useContext, useEffect, useState, useReducer } from 'react';
import { Context } from "../components/Context";
import  bird  from "../assets/bird.png"

export const Bird = ({birdContext}) =>
{
    const reducer = (_, { data }) => data;
    const [x, setX] = useState(100);
    const [y, setY] = useState(100);
    const [motion, update] = useReducer(reducer);
    let context = useContext(Context);
    // console.log("context", context);

  useTick((delta) => {
    setX(x+1);
    // const i = (iter.current += 0.05 * delta);

    // update({
    //   type: 'update',
    //   data: {
    //     x: Math.sin(i) * 100,
    //     y: Math.sin(i / 1.5) * 100,
    //     rotation: Math.sin(i) * Math.PI,
    //     anchor: Math.sin(i / 2),
    //   },
    // });
  });
  
  return (
    <Sprite
        image={bird}
        x={birdContext.x}
        y={birdContext.y}
        width={50}
        height={50}
        anchor={{ x: 1, y: 1 }}
    />
  );
};