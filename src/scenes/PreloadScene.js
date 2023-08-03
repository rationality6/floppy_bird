import BaseScene from "./BaseScene";

class PreloadScene extends BaseScene {
  constructor(config) {
    super("PreloadScene", config);
  }

  preload() {
    this.load.image(
      "skyBackground",
      "https://cloudbucket22.s3.ap-northeast-2.amazonaws.com/sky.png"
    );

    this.load.image(
      "watermelonMonster",
      "https://cloudbucket22.s3.ap-northeast-2.amazonaws.com/watermelon.webp"
    );

    this.load.image(
      "slugger",
      "https://cloudbucket22.s3.ap-northeast-2.amazonaws.com/slugger.webp"
    );

    this.load.image(
      "manager",
      "https://cloudbucket22.s3.ap-northeast-2.amazonaws.com/manager.webp"
    );

    this.load.image("poster", "assets/melon/poster.webp");

    this.load.image("pause", "assets/pause.png");

    this.load.image("restart", "assets/back.png");

    this.load.spritesheet("bird", "assets/birdSprite.png", {
      frameWidth: 16,
      frameHeight: 16,
    });
  }

  create() {
    this.scene.start("MenuScene");
  }
}

export default PreloadScene;
