/*jshint esversion: 6 */
const Game = {
  canvas: undefined,
  ctx: undefined,
  width: undefined,
  height: undefined,
  framesCounter: 0,
  squareSize: 50,
  emptySpace: "white",

  initPosX: 200,
  initPosY: 0,

  playerKeys: {
    LEFT_KEY: 37,
    TOP_KEY: 38,
    RIGHT_KEY: 39,
    BUTTON_KEY: 40
  },

  score: 0,
  fps: 60,

  init: function() {
    this.canvas = document.getElementById("tetris-board");
    this.ctx = this.canvas.getContext("2d");
    this.width = this.canvas.getAttribute("width");
    this.height = this.canvas.getAttribute("height");
    this.start();
  },

  start: function() {
    this.reset();
    let past = 0;
    let delta = 0;
    function refresh(timestamp) {
      delta = timestamp - past;
      past = timestamp;
      let fps = 1000 / delta;

      Game.clear();
      Game.drawAll();
      Game.moveAll();

      window.requestAnimationFrame(refresh);
      //console.log(fps);
    }
    window.requestAnimationFrame(refresh);
  },

  reset: function() {
    this.background = new Background(this.ctx, this.width, this.height);
    this.block = new Block(
      this.ctx,
      this.squareSize,
      this.initPosX,
      this.initPosY
    );
  },

  clear: function() {
    this.ctx.clearRect(0, 0, this.width, this.height);
  },

  drawAll: function() {
    this.background.draw();
    this.block.draw(200, 0, "#5f9ea0");
  },

  moveAll: function() {}
};
