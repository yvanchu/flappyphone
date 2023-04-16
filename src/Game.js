import { Stage } from '@pixi/react';
import Bird from "./game_component/bird";
import Pipes from './game_component/pipes';

export const Game = () => {
  return (
    <Stage>
        <Bird />
        <Pipes />
    </Stage>
  );
};
