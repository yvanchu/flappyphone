import LFSR from "../util/lfsr";

export const SETTING = {
  initSeed: 0xabcd,
  bird: {
    x: 100,
    y: 350,
    width: 60,
    height: 60,
  },
  pipe: {
    width: 100,
    height: 800,
    gap: 200,
    distance: 375,
  },
  ground: {
    width: 30,
    height: 150,
    y: window.innerHeight - 100,
  },
};

export const NUM_PIPES =
  Math.floor(window.innerWidth / SETTING.pipe.distance) +
  1;
let init_ys = new Array(NUM_PIPES).fill(0);
let current = 0xcbad;
for (let i = 0; i < NUM_PIPES; i++) {
  init_ys[i] = 600 - (current % 400);
  current = LFSR(current);
}
console.log("window.innerWidth: ", window.innerWidth);
console.log("NUM_PIPES: ", NUM_PIPES);
export const INIT_PIPES_Y = init_ys;
