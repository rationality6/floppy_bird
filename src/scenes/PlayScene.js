export default class PlayScene extends Phaser.Scene {
  constructor(config) {
    super(config);
    this.MANAGER = null;

    this.PIPE_HORIZONTAL_DISTANCE = 0;

    this.PIPE_DISTANCE_RANGE = [150, 250];
    let PIPE_HORIZONTAL_DISTANCE_RANGE = [500, 600];

    this.pipes = null;
  }

  init(data) {}
  preload() {
    this.canvas = this.sys.game.canvas;

    this.load.image("skyBackground", "assets/sky.png");

    this.load.image("pipe", "assets/pipe.png");

    this.load.image("watermelonMonster", "assets/melon/melon.webp");
    this.load.image("slugger", "assets/melon/shot.webp");
    this.load.image("manager", "assets/melon/chat.webp");

    this.pipes = this.physics.add.group();
  }
  create(data) {
    this.add.image(0, 0, "skyBackground").setOrigin(0);

    this.MANAGER = this.physics.add.sprite(50, 200, "manager");

    this.MANAGER.displayWidth = 50;
    this.MANAGER.displayHeight = 80;
    this.MANAGER.body.gravity.y = 700;

    [...Array(3).keys()].forEach((i) => {
      this.PIPE_HORIZONTAL_DISTANCE += 500;
      const UPPER_PIPE = this.pipes.create(0, 0, "pipe").setOrigin(0, 1);
      const LOWER_PIPE = this.pipes.create(0, 0, "pipe").setOrigin(0, 0);

      this.placePipe(UPPER_PIPE, LOWER_PIPE);
    });

    this.pipes.setVelocityX(-300);

    let particles = this.add.particles(0, 0, "manager", {
      speed: 10,
      scale: { start: 0.02, end: 0.02 },
      blendMode: "ADD",
    });

    particles.startFollow(this.MANAGER);

    this.input.on("pointerdown", this.flap, this);

    this.input.keyboard.on("keydown-SPACE", this.flap);

    const combo = this.input.keyboard.createCombo([38, 38], {
      resetOnMatch: true,
    });

    this.input.keyboard.on("keycombomatch", (e) => {
      console.log(e);
      console.log("Konami Code entered!");
    });
  }
  update(time, delta) {
    if (this.MANAGER.y > this.sys.game.canvas.height || this.MANAGER.y < 0) {
      console.log("game over");
      this.restartGame();
    }

    this.recyclePipes();
  }

  flap() {
    this.MANAGER.body.velocity.y = -250;
  }

  placePipe(upper, lower) {
    let PIPE_DISTANCE = Phaser.Math.Between(...this.PIPE_DISTANCE_RANGE);
    let PIPE_POSITION = Phaser.Math.Between(
      0 + 20,
      this.sys.game.canvas.height - 20 - PIPE_DISTANCE
    );

    upper.x = this.PIPE_HORIZONTAL_DISTANCE;
    upper.y = PIPE_POSITION;

    lower.x = upper.x;
    lower.y = upper.y + PIPE_DISTANCE;
  }

  recyclePipes() {
    let tempPipes = [];
    this.pipes.getChildren().forEach((pipe) => {
      if (pipe.getBounds().right <= 0) {
        tempPipes.push(pipe);
        if (tempPipes.length === 2) {
          this.placePipe(...tempPipes);
        }
      }
    });
  }

  restartGame() {
    this.MANAGER.x = 50;
    this.MANAGER.y = 200;
  }
}
