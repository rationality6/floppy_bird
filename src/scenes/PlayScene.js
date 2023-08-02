import BaseScene from "./BaseScene";

export default class PlayScene extends BaseScene {
  constructor(config) {
    super("PlayScene", config);
    this.MANAGER = null;

    this.PIPE_HORIZONTAL_DISTANCE = 0;
    this.PIPE_DISTANCE_RANGE = [200, 250];

    this.pipes = null;

    this.scoreCount = 0;
    this.scoreText = null;
    this.gameOverState = false;
    this.bgStarted = false;
  }

  preload() {
    this.canvas = this.sys.game.canvas;

    this.pipes = this.physics.add.group();

    if (this.bgStarted === false) {
      this.bgStarted = true;
      let bgSound = new Audio("./assets/sounds/railgun_bgsound.mp3");
      bgSound.loop = true;
      bgSound.play();
    }
  }

  createBG() {
    this.add.image(0, 0, "skyBackground").setOrigin(0);
  }

  createPipes() {
    [...Array(3).keys()].forEach((i) => {
      this.PIPE_HORIZONTAL_DISTANCE += 700;
      const UPPER_PIPE = this.pipes
        .create(0, 0, "watermelonMonster")
        .setImmovable(true)
        .setOrigin(0, 1);

      const LOWER_PIPE = this.pipes
        .create(0, 0, "watermelonMonster")
        .setImmovable(true)
        .setOrigin(0, 0);

      this.placePipe(UPPER_PIPE, LOWER_PIPE);
    });

    this.pipes.setVelocityX(-300);
  }

  create(data) {
    this.createBG();
    this.createPipes();

    this.createManager();

    this.createColliders();

    this.handleInputs();
    this.setParticles();

    this.scoreText = this.add.text(50, 50, this.scoreCount, {
      fontSize: "50px",
      fill: "#fff",
    });

    const pauseButton = this.add.image(750, 550, "pause").setScale(3);
    pauseButton.setInteractive().on("pointerdown", () => {
      alert("pause");
    });
  }

  createColliders() {
    this.physics.add.collider(
      this.MANAGER,
      this.pipes,
      this.gameOver,
      null,
      this
    );
  }

  setParticles() {
    const particles = this.add.particles(0, 0, "manager", {
      speed: 10,
      scale: { start: 0.02, end: 0.02 },
      blendMode: "ADD",
    });

    particles.startFollow(this.MANAGER);
  }

  handleInputs() {
    this.input.on("pointerdown", this.flap, this);

    this.input.keyboard.on("keydown-SPACE", this.flap, this);

    const combo = this.input.keyboard.createCombo(
      [32, 32, 32, 32, 32, 32, 32, 32, 32],
      {
        resetOnMatch: true,
      }
    );

    this.input.keyboard.on("keycombomatch", (e) => {
      this.createMelons({ count: 4 });
    });
  }
  gameOver() {
    this.gameOverState = true;
    new Audio("./assets/sounds/round_end.wav").play();

    this.physics.pause();
    // this.scene.pause();

    this.MANAGER.setTint(0xf0000);

    const restartButton = this.add.image(700, 550, "restart").setScale(2);
    restartButton.setInteractive().on("pointerdown", () => {
      
      this.pipes = null;
      this.pipes = this.physics.add.group();
      this.PIPE_HORIZONTAL_DISTANCE = 0;
      this.createPipes();
      this.scoreCount = 0;

      this.scene.restart();
    });
  }

  update(time, delta) {
    this.checkGameStatus();
    this.recyclePipes();

    if (this.gameOverState == false) {
      this.scoreCount += 1;
      this.scoreText.setText(`Score: ${this.scoreCount}`);
    }
  }

  checkGameStatus() {
    if (this.MANAGER.y > this.config.height || this.MANAGER.y < 0) {
      if (this.gameOverState == false) {
        this.gameOver();
      }
    }
  }

  restartGame() {
    this.scene.restart();
  }

  flap() {
    new Audio("./assets/sounds/jump.mp3").play();
    this.MANAGER.body.velocity.y = -250;
  }

  createManager() {
    this.MANAGER = this.physics.add.sprite(50, 200, "manager");

    this.MANAGER.displayWidth = 50;
    this.MANAGER.displayHeight = 80;
    this.MANAGER.body.gravity.y = 700;
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

  createMelons({ count: count }) {
    [...Array(count)].forEach((i) => {
      let randomXposision = Math.round(Math.random() * 20) + 105;
      let melon = this.physics.add.sprite(randomXposision, 215, "slugger");
      melon.displayWidth = 90;
      melon.displayHeight = 90;

      melon.body.velocity.x = Math.round(Math.random() * 5) * 300;
      melon.body.velocity.y = 200;

      melon.setBounce(0.9, 0.9);
      this.physics.add.collider(melon, this.pipes, () => {
        new Audio("./assets/sounds/hit.mp3").play();
      });
    });
  }
}
