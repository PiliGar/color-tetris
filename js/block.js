/*jshint esversion: 6 */
class Block {
  constructor(ctx, squareSize, posX, posY) {
    this.ctx = ctx;
    this.squareSize = squareSize;
    this.blockColors = [
      "MediumSlateBlue",
      "HotPink",
      "MediumSeaGreen",
      "DeepSkyBlue",
      "Tomato"
    ];
    this.color = this.blockColors[
      Math.floor(Math.random() * this.blockColors.length)
    ];
    this.posX = posX;
    this.posY = posY;

    this.setListeners();
  }

  draw() {
    this.ctx.fillStyle = this.color;
    this.ctx.fillRect(this.posX, this.posY, this.squareSize, this.squareSize);
    this.ctx.strokeStyle = this.color;
    this.ctx.strokeRect(this.posX, this.posY, this.squareSize, this.squareSize);
  }

  move() {}
  newPos() {}
  update() {}

  setListeners() {
    document.addEventListener("keydown", e => {
      if (e.keyCode === 37) {
        console.log("LEFT pressed move left");
      } else if (e.keyCode === 38) {
        console.log("TOP pressed rotate");
      } else if (e.keyCode === 39) {
        console.log("RIGTH pressed move right");
      } else if (e.keyCode === 40) {
        console.log("DOWN pressed move down");
      }
    });
    console.log("setListener");
  }
}
