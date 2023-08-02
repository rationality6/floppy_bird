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
    let poster = this.add.image(400, 0, "poster").setOrigin(0);
    poster.displayHeight = 650
    poster.displayWidth = 400

    this.add
      .text(50, 50, "청원 바로가기", {
        fontSize: "30px",
        fill: "#fff",
      })
      .setInteractive()
      .on("pointerdown", () => {
        window.open("https://petitions.theminjoo.kr/23175005A8KKNN2");
      });

    this.add
      .text(50, 150, "플러피수박 해보기", {
        fontSize: "30px",
        fill: "#fff",
      })
      .setInteractive()
      .on("pointerdown", () => {
        this.scene.start("PlayScene");
      });

    this.add
      .text(50, 350, "평산책방 가기", {
        fontSize: "20px",
        fill: "#fff",
      })
      .setInteractive()
      .on("pointerdown", () => {
        window.open("https://www.psbooks.kr/");
      });

    this.add
      .text(50, 400, "끌량 가기", {
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
