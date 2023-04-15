import { BlurFilter } from 'pixi.js';
import { Stage, Container, Sprite, Text } from '@pixi/react';
import { useMemo, useContext } from 'react';
import { Context } from "./components/Context";

export const MyComponent = () =>
{
  const blurFilter = useMemo(() => new BlurFilter(4), []);
  let context = useContext(Context);

  return (
    <Stage>
      <Sprite
        image="https://pixijs.io/pixi-react/img/bunny.png"
        x={400}
        y={270}
        anchor={{ x: 0.5, y: 0.5 }}
      />

      <Container x={400} y={330}>
        <Text text="Hello World" anchor={{ x: 0.5, y: 0.5 }} filters={[blurFilter]} />
      </Container>
    </Stage>
  );
};