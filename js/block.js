/*jshint esversion: 6 */
class Block {
  constructor(ctx, squareSize, initX, initY, keys, colX, rowY, grid) {
    this.ctx = ctx;
    this.squareSize = squareSize;
    this.type = true;

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
    //this.color = "Tomato";

    this.x = initX;
    this.y = initY;
    this.col = colX;
    this.row = rowY;
    this.gX = this.col.indexOf(this.x);
    this.gY = this.row.indexOf(this.y);
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

  fallDown() {
    this.y += 50;
    console.log(this);
  }
  moveLeft() {
    if (
      this.x > 0 &&
      this.grid[this.gY][this.gX - 1] === null &&
      this.type === true
    ) {
      this.x -= 50;
    }
  }
  moveRight() {
    if (
      this.x < 450 &&
      this.grid[this.gY][this.gX + 1] === null &&
      this.type === true
    ) {
      this.x += 50;
    }
  }

  setListeners() {
    document.addEventListener("keydown", e => {
      if (e.keyCode === 37) {
        this.moveLeft();
      } else if (e.keyCode === 39) {
        this.moveRight();
      } else if (e.keyCode === 40) {
        // this.moveDown();
      }
    });
    console.log("setListener");
  }
}
