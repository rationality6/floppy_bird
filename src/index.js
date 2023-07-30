import Phaser from "phaser";
import PlayScene from "./scenes/PlayScene";

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
  scene: [new PlayScene(SHARED_CONFIG)],
};

const game = new Phaser.Game(config);

function createMelons({ self: self, count: count }) {
  [...Array(count)].forEach((i) => {
    let randomXposision = Math.round(Math.random() * 20) + 185;
    let melon = self.physics.add.sprite(
      randomXposision,
      235,
      "watermelonMonster"
    );
    melon.displayWidth = 90;
    melon.displayHeight = 90;

    melon.body.velocity.x = Math.round(Math.random() * 5) * 300;

    melon.setBounce(0.9, 0.9);
    melon.setCollideWorldBounds(true);
  });
}
