/*jshint esversion: 6 */
class Background {
  constructor(ctx, width, height) {
    this.ctx = ctx;
    this.image = new Image();
    this.image.src = "./img/background.png";
    this.width = 500;
    this.height = 750;
    this.posX = 0;
    this.posY = 0;
    // this.vx = 4.5;
  }

  draw() {
    this.ctx.drawImage(
      this.image,
      this.posX,
      this.posY,
      this.width,
      this.height
    );
  }

  move() {
    // this.posX -= this.vx;
    // if (this.posX <= -this.width) {
    //   this.posX = 0;
    // }
  }
}
