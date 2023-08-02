class PeoplepowerScene extends Phaser.Scene {
  constructor() {
    super("PeoplepowerScene");
  }

  preload() {
    this.load.image("flare", "assets/white-flare.png");
    this.load.image("yellow", "assets/yellow.png");
    this.load.image("peoplePower", "assets/people_power.png");
  }

  create() {

    this.cameras.main.setBackgroundColor("#ffffff");

    const navi = this.add.text(50, 50, "로고를 클릭해주세요", {
      fontSize: "20px",
      fill: "#000",
    });

    this.cameras.main.fadeIn(1000, 255, 255, 255);

    const peoplepowerLogo = this.add
      .image(0, 0, "peoplePower")
      .setOrigin(0)
      .setInteractive()
      .setVisible(true);

    Phaser.Display.Align.In.Center(
      peoplepowerLogo,
      this.add.zone(400, 300, 800, 600)
    );

    this.input.on(
      "pointerdown",
      function () {
        this.cameras.main.fadeIn(1000, 255, 255, 255);
        new Audio("./assets/sounds/people_power_japan_voice.mp3").play();
        navi.destroy();
      },
      this
    );
  }
}

export default PeoplepowerScene;
