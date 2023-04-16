import { BlurFilter } from 'pixi.js';
import { Stage, Container, Sprite, Text, useTick } from '@pixi/react';
import { useMemo, useContext } from 'react';
import { Context } from "./components/Context";
// import { Bird } from "./game_component/bird";
// import { Pipe } from "./game_component/pipe";
import  bird  from "./assets/bird.png"
import pipeImg from "./assets/pipe.png"

export const Game = () =>
{
  let context = useContext(Context);
  console.log("context", context);

    const Bird = () =>
    {
    useTick((delta) => {
        let bird = context.bird;
        // bird.x += 1;
        // context.setBird(bird);
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
    }

    const Pipes = () => {
        let pipes = [context.pipe1, context.pipe2, context.pipe3]
        useTick((delta) => {
            pipes.forEach((pipe, index) => {
                pipe.x -= 1;
                if(pipe.x < -100){
                    pipe.x = 600;
                }
            });
            context.setPipe1(pipes[0]);
            context.setPipe2(pipes[1]);
            context.setPipe3(pipes[2]);
        });
        return (
            <Container>
                {
                    pipes.map((pipe, index) => {
                        return (
                            <Sprite
                                image={pipeImg}
                                x={pipe.x}
                                y={pipe.y}
                                height={pipe.height}
                                width={pipe.width}
                                anchor={{ x: 1, y: 1 }}
                            />
                        )
                    })
                }
            </Container>
        );
    }

  return (
    <Stage>
        <Bird/>
        <Pipes/>
    </Stage>
  );
};
