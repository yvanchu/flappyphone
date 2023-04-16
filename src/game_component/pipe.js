
import { Stage, Container, Sprite, Text } from '@pixi/react';
import { useMemo, useContext } from 'react';
import { Context } from "../components/Context";
import pipe from "../assets/pipe.png"

export const Pipe = () =>
{
  let context = useContext(Context);

  return (
    <Sprite
        image={pipe}
        x={200}
        y={600}
        height={200}
        width={50}
        anchor={{ x: 1, y: 1 }}
      />
  );
};