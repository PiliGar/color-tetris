/*jshint esversion: 6 */
class Block {
  constructor(ctx, squareSize, initX, initY, grid) {
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

    this.x = initX;
    this.y = initY;
    this.grid = grid;

    this.setListeners();
  }

  draw() {
    this.ctx.save();
    this.ctx.fillStyle = this.color;
    this.ctx.fillRect(this.x, this.y, this.squareSize, this.squareSize);
    this.ctx.strokeStyle = this.color;
    this.ctx.strokeRect(this.x, this.y, this.squareSize, this.squareSize);
    this.ctx.restore();
  }

  moveDown() {
    this.y += 50;
  }

  newPos() {}
  update() {}

  setListeners() {
    document.addEventListener("keydown", e => {
      if (e.keyCode === 37) {
        console.log("LEFT pressed move left");
        this.moveLeft();
      } else if (e.keyCode === 38) {
        console.log("TOP pressed rotate");
      } else if (e.keyCode === 39) {
        console.log("RIGTH pressed move right");
      } else if (e.keyCode === 40) {
        console.log("DOWN pressed move down");
        this.moveDown();
      }
    });
    console.log("setListener");
  }
}
