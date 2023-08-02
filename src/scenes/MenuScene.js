class MenuScene extends Phaser.Scene {
  constructor(config) {
    super("MenuScene");
    this.config = config;
  }

  preload() {
    this.setPointingSound();
  }

  setPointingSound() {
    this.input.on("pointerdown", () => {
      new Audio("./assets/sounds/jump.mp3").play();
    });
  }

  create() {
    this.add.image(0, 0, "skyBackground").setOrigin(0);

    this.add
      .text(50, 50, "Play", {
        fontSize: "50px",
        fill: "#fff",
      })
      .setInteractive()
      .on("pointerdown", () => {
        this.scene.start("PlayScene");
      });

    this.add
      .text(50, 250, "평산책방 가기", {
        fontSize: "20px",
        fill: "#fff",
      })
      .setInteractive()
      .on("pointerdown", () => {
        window.open("https://www.psbooks.kr/");
      });

    this.add
      .text(50, 300, "끌량 가기", {
        fontSize: "20px",
        fill: "#fff",
      })
      .setInteractive()
      .on("pointerdown", () => {
        window.open("https://www.clien.net/");
      });
  }
}

export default MenuScene;
