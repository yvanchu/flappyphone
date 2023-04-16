import { BlurFilter } from "pixi.js";
import { Stage, Container, Sprite, Text, useTick } from "@pixi/react";
import { useMemo, useContext, useEffect, useState, useCallback } from "react";
import { Context } from "./components/Context";
// import { Bird } from "./game_component/bird";
// import { Pipe } from "./game_component/pipe";
import bird from "./assets/bird.png";
import pipeImg from "./assets/pipe.png";
import useKeypress from "react-use-keypress";
import { useData, setData } from "./util/firebase";

function collide(bird, pipe) {
  if (bird.x + bird.width >= pipe.x && bird.x <= pipe.x + pipe.width) {
    if (bird.y + bird.height >= pipe.y && bird.y <= pipe.y + pipe.height) {
      return true;
    }
  }
  return false;
}

function checkCollide(bird, pipes) {
  let isCollide = false;
  pipes.forEach((pipe, index) => {
    if (collide(bird, pipe)) {
      isCollide = true;
    }
  });
  return isCollide;
}

export const Game = () => {
  let context = useContext(Context);
  const pipes = [context.pipe1, context.pipe2, context.pipe3];
  let gameState = context.gameState;
  const [cloud_count, loading, error] = useData("/count");
  const [local_count, setLocalCount] = useState(0);

  const handleFlap = () => {
    console.log("You pressed the space key!");
    if (!gameState.isPlaying) {
      gameState.isPlaying = true;
      context.setGameState(gameState);
    }
    let bird = context.bird;
    bird.currSpeed = bird.initFallSpeed;
    context.setBird(bird);
  };

  useKeypress(" ", handleFlap);

  useEffect(() => {
    setData("/count", 0);
  }, []);

  useEffect(() => {
    if (cloud_count > local_count) {
      setLocalCount(cloud_count);
      if (!gameState.isPlaying) {
        gameState.isPlaying = true;
        context.setGameState(gameState);
      }
      let bird = context.bird;
      bird.currSpeed = bird.initFallSpeed;
      context.setBird(bird);
    }
  }, [cloud_count, local_count, context, gameState]);

  const Bird = () => {
    useTick((delta) => {
      if (gameState.isPlaying && !gameState.isGameOver) {
        let bird = context.bird;
        bird.y -= bird.currSpeed;
        bird.currSpeed -= bird.gravity;
        context.setBird(bird);
        if (checkCollide(context.bird, pipes)) {
          gameState.isGameOver = true;
          context.setGameState(gameState);
          console.log("game over!");
        }
      }
    });

    return (
      <Sprite
        image={bird}
        x={context.bird.x}
        y={context.bird.y}
        width={50}
        height={50}
        anchor={{ x: 1, y: 1 }}
      />
    );
  };

  const Pipes = () => {
    useTick((delta) => {
      if (gameState.isPlaying && !gameState.isGameOver) {
        pipes.forEach((pipe, index) => {
          pipe.x -= 1;
          if (pipe.x < -100) {
            pipe.x = 600;
          }
        });
        context.setPipe1(pipes[0]);
        context.setPipe2(pipes[1]);
        context.setPipe3(pipes[2]);
      }
    });
    return (
      <Container>
        {pipes.map((pipe, index) => {
          return (
            <Sprite
              image={pipeImg}
              x={pipe.x}
              y={pipe.y}
              height={pipe.height}
              width={pipe.width}
              anchor={{ x: 1, y: 1 }}
            />
          );
        })}
      </Container>
    );
  };

  return (
    <Stage>
      <Bird />
      <Pipes />
    </Stage>
  );
};

export default Game;
