import Phaser from "phaser";
import PlayScene from "./scenes/PlayScene";
import MenuScene from "./scenes/MenuScene";
import PreloadScene from "./scenes/PreloadScene";
import PeoplepowerScene from "./scenes/PeoplepowerScene";

const WIDTH = 800;
const HEIGHT = 600;

const BIRD_POSITION = {
  x: WIDTH * 0.1,
  y: HEIGHT / 2,
};

const SHARED_CONFIG = {
  width: WIDTH,
  height: HEIGHT,
  startPosition: BIRD_POSITION,
};

const config = {
  type: Phaser.AUTO,
  ...SHARED_CONFIG,
  physics: {
    default: "arcade",
    arcade: {
      debug: true,
    },
  },
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
  },
  backgroundColor: '#000000',
  scene: [
    new PreloadScene(SHARED_CONFIG),
    new MenuScene(SHARED_CONFIG),
    new PeoplepowerScene(SHARED_CONFIG),
    new PlayScene(SHARED_CONFIG)
  ],
};

const game = new Phaser.Game(config);
