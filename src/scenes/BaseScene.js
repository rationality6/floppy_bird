class BaseScene extends Phaser.Scene {
  constructor(key, config) {
    super(key);
    this.config = config

    this.screenCenter = [config.width / 2, config.height / 2];
  }

  create() {

  }

  createMenu(menu) {
    let lastMenuPositionY = 0;
    menu.forEach((menuItem) => {
      const menuPosition = [
        this.screenCenter[0],
        this.screenCenter[1] + lastMenuPositionY,
      ];
      menuItem.textGO = this.add
        .text(...menuPosition, menuItem.text, {
          fontSize: "32px",
          fill: "#000",
        })
        .setOrigin(0.5, 1);
      lastMenuPositionY += 42;
    });
    
  }
}

export default BaseScene;
